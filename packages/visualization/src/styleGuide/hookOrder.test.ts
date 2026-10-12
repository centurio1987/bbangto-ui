import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// KAN-075 — `useVizFoundation()` 은 같은 함수의 어떤 `return` 보다도 먼저 부른다.
//
// 템플릿은 「data 가 없으면 children 만 그린다」 분기로 일찍 돌아가는 일이 많다. 그 분기 뒤에서 훅을 부르면 data 가
// 없다가 생길 때 훅 개수가 바뀌어 React 가 오류를 낸다. 이 저장소에는 eslint 훅 규칙이 없어서, 글자색을 면으로 고르려고
// 훅을 넣다가 세 곳(BusinessModelCanvas·Iceberg·SwotMatrix)에서 실제로 그렇게 됐다. 소스에서 그 꼴을 찾는다.

const SRC = join(__dirname, '..');
const FN_START = /^(export )?function \w+|^export const \w+ = React\.forwardRef|^function \w+/;

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return tsxFiles(p);
    return name.endsWith('.tsx') && !name.includes('.test.') ? [p] : [];
  });
}

function lateHooks(): string[] {
  const out: string[] = [];
  for (const file of tsxFiles(SRC)) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      // 부르는 자리만 본다 — 훅을 정의하는 줄(`export function useVizFoundation()`)은 뺀다
      if (!line.includes('useVizFoundation()') || FN_START.test(line)) return;
      for (let j = i - 1; j >= 0 && !FN_START.test(lines[j]!); j--) {
        if (/^\s*return\b/.test(lines[j]!)) {
          out.push(`${relative(SRC, file)}:${i + 1} 훅이 ${j + 1}행 return 뒤에 있다`);
          break;
        }
      }
    });
  }
  return out;
}

describe('useVizFoundation 은 return 보다 먼저 (KAN-075)', () => {
  it('훅을 부르는 파일을 찾는다', () => {
    const n = tsxFiles(SRC).filter((f) => readFileSync(f, 'utf8').includes('useVizFoundation()')).length;
    expect(n).toBeGreaterThan(10);
  });

  it('조건부 return 뒤에서 훅을 부르지 않는다', () => {
    expect(lateHooks()).toEqual([]);
  });
});
