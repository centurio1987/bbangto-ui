import { describe, it, expect } from 'vitest';
import type { StyleGuideMeta } from '@centurio1987/bbangto-ui-tokens';
// parity 대상: UI style-guide-catalog의 helper(devDep, test 전용). 국소 복제본과 동작 일치 검증.
import { selectStyleGuides as uiSelectStyleGuides } from '@centurio1987/bbangto-ui-style-guide-catalog';
import { vizStyleGuideCatalog } from './index';
import { selectStyleGuides, type SelectableEntry, type StyleSelectionCriteria } from './select';

function entry(name: string, meta?: Partial<StyleGuideMeta>): SelectableEntry {
  return { name, meta: meta as StyleGuideMeta | undefined };
}

describe('selectStyleGuides (viz) — 실제 viz 카탈로그', () => {
  it('다크·고에너지 쿼리 → neon-gradient-dark-01이 상위', () => {
    const res = selectStyleGuides(vizStyleGuideCatalog, {
      characteristics: { colorScheme: 'dark' },
      mood: { energy: { min: 4 } },
      tags: ['neon'],
      limit: 3,
    });
    expect(res[0].name).toBe('neon-gradient-dark-01');
    expect(res[0].score).toBeGreaterThan(0.9);
  });

  it('viz family 필터: 최상위가 요청 viz family를 가진다', () => {
    const res = selectStyleGuides(vizStyleGuideCatalog, {
      family: 'viz-corporate-schematic',
    });
    expect(res[0].entry.meta?.family).toBe('viz-corporate-schematic');
    expect(res[0].score).toBeCloseTo(1, 10);
  });

  it('빈 criteria: 전부 1점, 결정적·안정 정렬', () => {
    const a = selectStyleGuides(vizStyleGuideCatalog, {});
    const b = selectStyleGuides(vizStyleGuideCatalog, {});
    expect(a.every((r) => r.score === 1)).toBe(true);
    expect(a.map((r) => r.name)).toEqual(b.map((r) => r.name));
  });
});

describe('selectStyleGuides (viz) — UI helper와 parity (복제 drift 가드)', () => {
  // 공유 fixture: 임의 카탈로그 + 다양한 criteria 조합을 양쪽 helper에 통과시켜 결과 동일성 검증.
  const cat: SelectableEntry[] = [
    entry('a', {
      family: 'viz-neon-gradient-dark',
      priority: 'P1',
      trendIndex: 2,
      domains: ['dashboard', 'gaming'],
      tags: ['dark', 'neon', 'gradient'],
      characteristics: {
        cornerRadius: 'soft',
        borderWeight: 'thin',
        shadow: 'glow',
        density: 'dense',
        motion: 'kinetic',
        colorScheme: 'dark',
        contrast: 'high',
      },
      mood: { formality: 3, energy: 5, warmth: 2, density: 4, ornament: 4 },
    }),
    entry('b', {
      family: 'viz-flat-pop',
      priority: 'P2',
      trendIndex: 1,
      domains: ['marketing', 'education'],
      tags: ['vivid', 'flat'],
      characteristics: {
        cornerRadius: 'round',
        borderWeight: 'bold',
        shadow: 'hard',
        density: 'balanced',
        motion: 'still',
        colorScheme: 'light',
        contrast: 'medium',
      },
      mood: { formality: 2, energy: 3, warmth: 4, density: 2, ornament: 3 },
    }),
    entry('c-pending'), // meta 없음
  ];

  const cases: StyleSelectionCriteria[] = [
    {},
    { family: 'viz-neon-gradient-dark' },
    { domains: ['gaming', 'dashboard', 'saas'], tags: ['neon', 'dark'] },
    { characteristics: { colorScheme: 'dark' }, mood: { energy: { min: 4 } } },
    { mood: { energy: 3, warmth: 4 }, weights: { mood: 2 }, explain: true },
    { family: 'viz-flat-pop', includePending: true, limit: 10 },
    { domains: [], tags: [], weights: { domains: -1 } }, // sanitize 경로
  ];

  const strip = (rs: ReturnType<typeof selectStyleGuides>) =>
    rs.map((r) => ({ name: r.name, score: r.score, breakdown: r.breakdown }));

  it.each(cases.map((c, i) => [i, c] as const))(
    'case %i: viz 복제본과 UI helper 결과가 deep-equal',
    (_i, criteria) => {
      const mine = strip(selectStyleGuides(cat, criteria));
      const ui = strip(uiSelectStyleGuides(cat, criteria));
      expect(mine).toEqual(ui);
    },
  );
});
