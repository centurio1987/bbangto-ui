/**
 * jsdocSource — 컴포넌트 소스에서 JSDoc 자리를 찾고 태그를 갈아끼우는 **파일 조작 레이어** (KAN-043 / 상류 I2).
 *
 * 생성기(`scripts/genTypeJsdoc.ts`)와 최신성 게이트(`jsdoc.test.ts`)가 **같은 함수를 공유**해야 둘이 어긋나지 않는다.
 * 그래서 스크립트가 아니라 `src/`에 둔다(rootDir 제약). 어느 배럴에서도 export하지 않으므로 번들에 들어가지 않는다.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { isGeneratedTagLine } from './jsdocTags';

const srcDir = dirname(dirname(fileURLToPath(import.meta.url)));

/**
 * 배럴(`templates/index.ts`·`patterns/index.ts`)을 정적 파싱해 exportName → 소스 파일 경로를 만든다.
 * 파일명 규약(`<Export>.tsx`)에 기대지 않는다 — ArchiMate 4종처럼 한 파일이 여러 export를 내는 경우가 있다.
 */
export function buildExportFileMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const rel of ['templates', 'patterns']) {
    const text = readFileSync(join(srcDir, rel, 'index.ts'), 'utf8');
    for (const raw of text.split('\n')) {
      const line = raw.trim();
      if (line.startsWith('export type')) continue;
      const m = /^export \{([^}]*)\} from '\.\/([^']+)';$/.exec(line);
      if (!m) continue;
      for (const part of m[1].split(',')) {
        const n = part.trim();
        if (!n) continue;
        const name = n.includes(' as ') ? n.split(' as ').pop()!.trim() : n;
        map.set(name, join(srcDir, rel, `${m[2]}.tsx`));
      }
    }
  }
  return map;
}

/** `export function <name>(`·`export const <name> =` 선언 줄의 인덱스. 없으면 -1. */
export function findDeclarationLine(lines: readonly string[], name: string): number {
  const patterns = [
    new RegExp(`^export function ${name}\\b`),
    new RegExp(`^export const ${name}\\b`),
  ];
  return lines.findIndex((l) => patterns.some((p) => p.test(l)));
}

/** 선언 바로 위 JSDoc 블록의 본문 줄(선행 ` * ` 제거). 블록이 없으면 빈 배열. */
export function jsdocBodyAbove(source: string, name: string): string[] {
  const lines = source.split('\n');
  const declIdx = findDeclarationLine(lines, name);
  if (declIdx < 0) return [];
  let end = declIdx - 1;
  while (end >= 0 && lines[end].trim() === '') end -= 1;
  if (end < 0 || lines[end].trim() !== '*/') return [];
  let start = end;
  while (start >= 0 && !lines[start].trim().startsWith('/**')) start -= 1;
  if (start < 0) return [];
  return lines.slice(start + 1, end).map((l) => l.replace(/^\s*\*\s?/, '').trimEnd());
}

/**
 * 선언 위 JSDoc을 갱신한 파일 내용을 돌려준다(순수 함수).
 * 기존 생성 태그 줄만 걷어내고 사람이 쓴 산문은 보존한다 — 재실행해도 결과가 같다(멱등).
 */
export function applyTags(source: string, name: string, tags: readonly string[]): string {
  if (tags.length === 0) return source;
  const lines = source.split('\n');
  const declIdx = findDeclarationLine(lines, name);
  if (declIdx < 0) throw new Error(`[gen:type-jsdoc] 선언을 찾지 못함: ${name}`);

  let blockEnd = declIdx - 1;
  while (blockEnd >= 0 && lines[blockEnd].trim() === '') blockEnd -= 1;
  const hasBlock = blockEnd >= 0 && lines[blockEnd].trim() === '*/';

  const tagLines = tags.map((t) => ` * ${t}`);

  if (!hasBlock) {
    const block = ['/**', ...tagLines, ' */'];
    return [...lines.slice(0, declIdx), ...block, ...lines.slice(declIdx)].join('\n');
  }

  let blockStart = blockEnd;
  while (blockStart >= 0 && !lines[blockStart].trim().startsWith('/**')) blockStart -= 1;
  if (blockStart < 0) throw new Error(`[gen:type-jsdoc] JSDoc 시작을 찾지 못함: ${name}`);

  const prose = lines.slice(blockStart + 1, blockEnd).filter((l) => !isGeneratedTagLine(l));
  while (prose.length && prose[prose.length - 1].trim() === '*') prose.pop();
  const separator = prose.length ? [' *'] : [];

  const rebuilt = [lines[blockStart], ...prose, ...separator, ...tagLines, lines[blockEnd]];
  return [...lines.slice(0, blockStart), ...rebuilt, ...lines.slice(blockEnd + 1)].join('\n');
}
