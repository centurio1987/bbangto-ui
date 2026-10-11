import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// KAN-075 — 글자는 그 글자가 놓인 면의 글자색(`vvar('on', …)`)을 쓴다. 도형·연결선 색, 팔레트 색, 캔버스 바탕색을
// 바로 칠하지 않는다.
//
// 면 위 글자색은 가이드가 바라는 글자색(`on.ink`)을 먼저 보고 대비까지 지킨다. 템플릿이 `vvar('shape', 'stroke')`·
// `vvar('edge', 'stroke')`·`vvar('palette', …)`·`vvar('canvas', 'bg')` 를 글자에 바로 칠하면 그 길을 건너뛰어, 지침 문장이 「라벨은 크림」인 가이드에서 문장이
// 금지한 골드·네온이 칠해졌다. 이 검사는 소스에서 `<text>` 와 글자 부품의 fill 을 읽어 그 꼴을 찾는다. 같은 파일에서
// `const` 로 만든 이름을 거쳐 칠하는 것도 따라간다.
//
// 예외는 하나다. 사용자가 면 색(fill·bgFill·headFill 등)을 직접 넘긴 갈래는 그 면을 계산할 수 없어 연결선 색으로
// 둔다. 그 갈래는 기본 면의 글자색과 함께 삼항으로 적히므로(`x === undefined ? vvar('on', …) : vvar('edge', …)`),
// 한 식 안에 면의 글자색 — `vvar('on'` 이나 그 자리에서 고른 `pickOnInk(` (같은 파일 `const` 를 거친 것 포함) — 이
// 함께 있으면 예외로 본다.

const SRC = join(__dirname, '..');
const NOT_INK = /vvar\('(shape|edge)', 'stroke'\)|vvar\('palette',|vvar\('canvas', 'bg'\)/;

/**
 * 면의 글자색이 아닌 색을 일부러 쓰는 글자와 그 사유. `파일:이름` 으로 적는다.
 * - StatNumber 증감: 오르내림을 팔레트 두 색으로 가른 의미 색이다. 부호(+ · −)를 함께 쓰고, 가이드가 `on.ink` 를 적었거나
 *   그 색이 밑 면에서 4.5:1 에 못 미치면 숫자와 같은 글자색이 된다 — 문장이 글자색을 정한 가이드에서는 의미 색을 안 쓴다.
 */
const MEANING_COLORS = new Set(['atoms/StatNumber.tsx:deltaFill']);

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return tsxFiles(p);
    return name.endsWith('.tsx') && !name.includes('.test.') && !name.includes('.stories.') ? [p] : [];
  });
}

/**
 * 글자를 그리는 여는 태그의 fill 식 — `style={{ … fill: X … }}` 또는 `fill={X}`. `<text>` 와 글자 부품(Tag·EdgeLabel·
 * StatNumber·NodeLabel)을 본다. 글자 부품의 `fill` prop 은 글자색이다.
 */
function textFills(source: string): Array<{ line: number; expr: string }> {
  const out: Array<{ line: number; expr: string }> = [];
  const re = /<(?:text|Tag|EdgeLabel|StatNumber|NodeLabel)\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    // 여는 태그 끝: 중괄호 깊이 0 에서 만나는 첫 `>`
    let depth = 0;
    let end = m.index;
    for (let i = m.index; i < source.length; i++) {
      const ch = source[i];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      else if (ch === '>' && depth === 0) {
        end = i;
        break;
      }
    }
    const tag = source.slice(m.index, end);
    const fill = /style=\{\{[^]*?\bfill:\s*|\bfill=\{/.exec(tag);
    if (fill) out.push({ line: source.slice(0, m.index).split('\n').length, expr: exprAt(tag, fill.index + fill[0].length) });
  }
  return out;
}

/** `start` 부터 식 하나 — 괄호 깊이 0 에서 만나는 `,`·`}`·`)` 앞까지. 괄호 안 쉼표(`vvar('edge', 'stroke')`)에서 끊지 않는다. */
function exprAt(text: string, start: number): string {
  let depth = 0;
  let quote = '';
  for (let i = start; i < text.length; i++) {
    const ch = text[i]!;
    if (quote) {
      if (ch === quote) quote = '';
    } else if (ch === "'" || ch === '"' || ch === '`') quote = ch;
    else if (ch === '(' || ch === '{' || ch === '[') depth++;
    else if (depth > 0 && (ch === ')' || ch === '}' || ch === ']')) depth--;
    else if (depth === 0 && (ch === ',' || ch === '}' || ch === ')')) return text.slice(start, i).trim();
  }
  return text.slice(start).trim();
}

/** 같은 파일의 `const 이름 = 식;` — 식 하나를 돌려준다(여러 번 정의되면 전부 이어 붙인다). */
function constExpr(source: string, name: string): string {
  const re = new RegExp(`const ${name}\\s*=\\s*([^;]+);`, 'g');
  return Array.from(source.matchAll(re), (x) => x[1]).join(' | ');
}

/** 식에 면의 글자색이 들어 있는가 — 바로 쓴 것이든 같은 파일 `const` 이름을 거친 것이든. */
function hasSurfaceInk(source: string, expr: string): boolean {
  const isInk = (e: string) => e.includes("vvar('on'") || e.includes('pickOnInk(');
  if (isInk(expr)) return true;
  return Array.from(expr.matchAll(/\b[A-Za-z_$][\w$]*\b/g), (x) => x[0]).some((name) => isInk(constExpr(source, name)));
}

function violations(): string[] {
  const out: string[] = [];
  for (const file of tsxFiles(SRC)) {
    const source = readFileSync(file, 'utf8');
    for (const { line, expr } of textFills(source)) {
      const ident = /^[A-Za-z_$][\w$]*$/.test(expr) ? expr : null;
      const resolved = ident ? constExpr(source, ident) : expr;
      if (!NOT_INK.test(resolved)) continue;
      if (ident && MEANING_COLORS.has(`${relative(SRC, file)}:${ident}`)) continue;
      if (hasSurfaceInk(source, resolved)) continue; // 사용자가 넘긴 면의 갈래
      out.push(`${relative(SRC, file)}:${line} fill: ${expr}${ident ? ` (= ${resolved.trim()})` : ''}`);
    }
  }
  return out;
}

describe('글자색은 면의 on 변수 (KAN-075)', () => {
  it('<text> 를 찾는다', () => {
    const total = tsxFiles(SRC).reduce((n, f) => n + textFills(readFileSync(f, 'utf8')).length, 0);
    expect(total).toBeGreaterThan(100);
  });

  it('<text> 에 도형·연결선·팔레트 색과 캔버스 바탕색을 바로 칠하지 않는다', () => {
    expect(violations()).toEqual([]);
  });
});
