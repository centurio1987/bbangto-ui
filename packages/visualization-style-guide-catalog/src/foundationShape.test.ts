import { describe, it, expect } from 'vitest';
import { baseVisualizationFoundation } from '@centurio1987/bbangto-ui-visualization';
import { vizStyleGuideCatalog } from './index';

/**
 * 가이드 foundation 의 모양은 base foundation 과 같다 (KAN-069).
 *
 * 가이드는 노드 스타일을 작은 함수로 만들어 펼쳐 넣는 일이 많다. 그렇게 들어간 값은 TypeScript 의 초과 속성 검사를
 * 거치지 않아서, 타입에서 지운 토큰이 가이드 객체에 조용히 남는다. 그 값은 아무 데서도 안 읽히는데 가이드 저자는
 * 그것이 그림을 바꾼다고 믿게 된다. 그래서 키 경로를 base 와 직접 견준다.
 * 타입의 선택 필드(`on` 과 그 아래 전부, `typography.labelFont`)는 base 에 없어도 된다.
 */
const OPTIONAL_PREFIXES = ['on', 'typography.labelFont'];

function keyPaths(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const p = prefix ? `${prefix}.${k}` : k;
    return v !== null && typeof v === 'object' && !Array.isArray(v)
      ? [p, ...keyPaths(v as Record<string, unknown>, p)]
      : [p];
  });
}

const isOptional = (p: string) => OPTIONAL_PREFIXES.some((o) => p === o || p.startsWith(`${o}.`));
const baseKeys = new Set(keyPaths(baseVisualizationFoundation as unknown as Record<string, unknown>));

const foundationsOf = () =>
  vizStyleGuideCatalog.flatMap((g) => [
    { where: `${g.name}`, f: g.foundations },
    ...(g.foundationPresets ?? []).map((p) => ({ where: `${g.name}#${p.key}`, f: p.foundations })),
  ]);

describe('가이드 foundation 모양 (KAN-069)', () => {
  it('base 에 없는 키를 갖지 않는다', () => {
    const extra = foundationsOf().flatMap(({ where, f }) =>
      keyPaths(f as unknown as Record<string, unknown>)
        .filter((p) => !baseKeys.has(p) && !isOptional(p))
        .map((p) => `${where}: ${p}`),
    );
    expect(extra).toEqual([]);
  });

  it('base 의 키를 빠뜨리지 않는다', () => {
    const missing = foundationsOf().flatMap(({ where, f }) => {
      const have = new Set(keyPaths(f as unknown as Record<string, unknown>));
      return [...baseKeys].filter((p) => !have.has(p)).map((p) => `${where}: ${p}`);
    });
    expect(missing).toEqual([]);
  });
});
