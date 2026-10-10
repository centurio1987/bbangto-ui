/**
 * tokenUsage.test.ts — 선언한 viz 토큰은 모두 그림 코드가 읽는다 (KAN-069).
 *
 * `VisualizationFoundation` 의 잎(토큰 경로의 끝 값)을 그림 코드가 안 읽으면, 스타일 가이드가 그 값을 적어도
 * 그림이 바뀌지 않는다. 선언과 동작이 조용히 어긋나는 것이다(2026-10-10 확인 당시 잎 86개 중 36개).
 * 이 검사는 base foundation 의 잎마다 viz 소스에 읽는 자리가 있는지 본다. 새 토큰을 선언만 하고 잇지 않으면 빨개진다.
 *
 * 읽는 자리로 세는 것은 셋이다.
 * - `vvar('a', 'b')` 호출. 문자열이 아닌 조각(`vvar('c4', level, 'bgTint')`)은 어느 조각과도 맞는다.
 * - `--bbangto-viz-a-b` 이름을 그대로 쓴 곳(계약 스타일시트 등).
 * - `foundation.a.b`·`f.a.b` 접근(`useVizFoundation()` 결과와 onInk 의 관례 이름). `f.c4[l].bgTint` 처럼 대괄호 조각도 맞는다.
 *   템플릿 데이터의 `data.boundary.width` 같은 우연한 일치를 거르려고 접두 이름을 둘로 묶었다.
 * 주석은 지우고 센다 — 주석에 적힌 예시는 읽는 자리가 아니다.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { describe, it, expect } from 'vitest';
import { baseVisualizationFoundation } from './base';

const srcRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

/** 선언만 하는 파일 — 여기 있는 이름은 읽는 자리가 아니다. */
const DECLARATION_FILES = new Set(['tokens/base.ts', 'tokens/types.ts']);

/** 잎 목록에서 뺄 것. `name` 은 foundation 을 가리키는 이름표라 그림에 쓰일 값이 아니다. */
const NOT_A_TOKEN = new Set(['name']);

function leafPaths(obj: Record<string, unknown>, prefix: string[] = []): string[][] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v !== null && typeof v === 'object'
      ? leafPaths(v as Record<string, unknown>, [...prefix, k])
      : [[...prefix, k]],
  );
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return sourceFiles(p);
    if (!/\.tsx?$/.test(e.name) || /\.test\.tsx?$/.test(e.name)) return [];
    return DECLARATION_FILES.has(relative(srcRoot, p)) ? [] : [p];
  });
}

const stripComments = (s: string): string =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\w])\/\/[^\n]*/g, '$1');

/** `vvar(` 호출마다 인자 조각을 낸다. 문자열 조각은 그 값, 아닌 조각은 null(어느 조각과도 맞음). */
function vvarCalls(src: string): (string | null)[][] {
  const calls: (string | null)[][] = [];
  const re = /(?<![\w$])vvar\(/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    let depth = 1;
    let i = m.index + m[0].length;
    const start = i;
    const cuts: number[] = [];
    for (; i < src.length && depth > 0; i++) {
      const ch = src[i];
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;
      else if (ch === ',' && depth === 1) cuts.push(i);
    }
    const body = src.slice(start, i - 1);
    const bounds = [start - 1, ...cuts, i - 1];
    const args = bounds.slice(0, -1).map((b, j) => src.slice(b + 1, bounds[j + 1]).trim());
    if (body.trim() === '' || args.some((a) => a.startsWith('...'))) continue;
    calls.push(args.map((a) => (/^'[^']*'$/.test(a) ? a.slice(1, -1) : null)));
  }
  return calls;
}

const kebab = (s: string): string => s.replace(/([A-Z])/g, '-$1').toLowerCase();
const escape = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const sources = sourceFiles(srcRoot).map((p) => stripComments(readFileSync(p, 'utf8')));
const allCalls = sources.flatMap(vvarCalls);

function isRead(path: string[]): boolean {
  const viaVvar = allCalls.some(
    (args) => args.length === path.length && args.every((a, i) => a === null || a === path[i]),
  );
  if (viaVvar) return true;

  const cssName = new RegExp(`--bbangto-viz-${path.map(kebab).join('-')}(?![\\w-])`);
  const [head, ...rest] = path;
  const access = new RegExp(
    `(?<![\\w$.])(?:foundation|f)\\.${escape(head)}` +
      rest.map((seg) => `(?:\\.${escape(seg)}|\\[[^\\]]+\\])`).join('') +
      '(?![\\w$])',
  );
  return sources.some((s) => cssName.test(s) || access.test(s));
}

describe('viz 토큰 사용 (KAN-069)', () => {
  const leaves = leafPaths(baseVisualizationFoundation as unknown as Record<string, unknown>).filter(
    (p) => !NOT_A_TOKEN.has(p.join('.')),
  );

  it('잎을 빠짐없이 펼친다', () => {
    expect(leaves.length).toBeGreaterThan(40);
    expect(leaves.map((p) => p.join('.'))).toContain('boundary.dashPattern');
  });

  it('선언한 잎은 모두 그림 코드가 읽는다', () => {
    const unread = leaves.filter((p) => !isRead(p)).map((p) => p.join('.'));
    expect(unread).toEqual([]);
  });

  it('읽는 자리 판정이 셋 다 동작한다', () => {
    // vvar 문자열 조각 · vvar 변수 조각 · CSS 이름 · foundation 접근 · onInk 의 f[l] 접근
    expect(isRead(['shape', 'stroke'])).toBe(true);
    expect(isRead(['c4', 'l2', 'bgTint'])).toBe(true);
    expect(isRead(['shape', 'strokeWidth'])).toBe(true);
    expect(isRead(['edge', 'cornerRadius'])).toBe(true);
    expect(isRead(['palette', 'p5'])).toBe(true);
    // 템플릿 데이터의 `data.boundary.x` 같은 우연한 일치는 세지 않는다
    expect(isRead(['boundary', 'x'])).toBe(false);
  });
});
