import { describe, it, expect } from 'vitest';
import type { StyleGuideMeta } from '@centurio1987/bbangto-ui-tokens';
import { styleGuideCatalog } from './index';
import { selectStyleGuides, type SelectableEntry } from './select';

// ─────────────────────────────────────────────────────────────────────────────
// fixture helper — 통제어휘를 부분 지정한 meta를 캐스팅으로 구성(테스트 edge 제어용).
// ─────────────────────────────────────────────────────────────────────────────
function entry(name: string, meta?: Partial<StyleGuideMeta>): SelectableEntry {
  return { name, meta: meta as StyleGuideMeta | undefined };
}

const baseMood = { formality: 3, energy: 3, warmth: 3, density: 3, ornament: 3 } as const;
const baseChar = {
  cornerRadius: 'soft',
  borderWeight: 'thin',
  shadow: 'none',
  density: 'balanced',
  motion: 'still',
  colorScheme: 'light',
  contrast: 'medium',
} as const;

describe('selectStyleGuides — 실제 카탈로그 (§6 소비 흐름)', () => {
  it('§6 대표 쿼리: cyberpunk-hud-01이 1.0점 최고점 그룹에 든다', () => {
    const res = selectStyleGuides(styleGuideCatalog, {
      domains: ['gaming'],
      characteristics: { colorScheme: 'dark' },
      mood: { energy: { min: 4 } },
      limit: styleGuideCatalog.length, // 전체를 받아 만점 그룹 확인(동점 P1이 tie-break상 위일 수 있음)
    });
    const cyber = res.find((r) => r.name === 'cyberpunk-hud-01');
    expect(cyber).toBeDefined();
    expect(cyber!.score).toBeCloseTo(1, 10);
    // 최고점(1.0) 그룹 = 다크·게이밍·energy≥4를 모두 만족하는 후보. cyberpunk가 그 안에 있다.
    const topScore = res[0].score;
    expect(topScore).toBeCloseTo(1, 10);
    const perfect = res.filter((r) => r.score === topScore).map((r) => r.name);
    expect(perfect).toContain('cyberpunk-hud-01');
  });

  it('sharpened 쿼리(energy:5): cyberpunk-hud-01이 유일 1위(energy 변별)', () => {
    const res = selectStyleGuides(styleGuideCatalog, {
      domains: ['gaming'],
      characteristics: { colorScheme: 'dark' },
      mood: { energy: 5 },
    });
    expect(res[0].name).toBe('cyberpunk-hud-01');
    // energy 4인 경쟁자(radiant-glow/glitch)는 mood 근접 0.75라 1위와 벌어진다.
    expect(res[0].score).toBeGreaterThan(res[1].score);
  });

  it('다축(family+tags): family 매치 + 태그 recall이 함께 상위를 만든다', () => {
    const res = selectStyleGuides(styleGuideCatalog, {
      family: 'tech-dark',
      tags: ['neon', 'dark'],
    });
    // 최상위는 tech-dark이면서 neon·dark 태그를 가진 항목.
    expect(res[0].entry.meta?.family).toBe('tech-dark');
    expect(res[0].score).toBeGreaterThan(0.9);
  });

  it('단일 필드(family-only): 최상위가 요청 family를 가진다', () => {
    const res = selectStyleGuides(styleGuideCatalog, { family: 'flat-systematic' });
    expect(res[0].entry.meta?.family).toBe('flat-systematic');
    expect(res[0].score).toBeCloseTo(1, 10);
  });

  it('빈 criteria: 전부 1점, 결정적·안정 정렬(중립 랭킹)', () => {
    const a = selectStyleGuides(styleGuideCatalog, {});
    const b = selectStyleGuides(styleGuideCatalog, {});
    expect(a.every((r) => r.score === 1)).toBe(true);
    expect(a.map((r) => r.name)).toEqual(b.map((r) => r.name)); // 안정
    expect(a).toHaveLength(5); // 기본 limit
  });
});

describe('selectStyleGuides — limit 엣지', () => {
  const cat = styleGuideCatalog;
  it('기본 5, 커스텀 3', () => {
    expect(selectStyleGuides(cat)).toHaveLength(5);
    expect(selectStyleGuides(cat, { limit: 3 })).toHaveLength(3);
  });
  it('limit:0 → 빈 배열', () => {
    expect(selectStyleGuides(cat, { limit: 0 })).toEqual([]);
  });
  it('음수 limit → 빈 배열', () => {
    expect(selectStyleGuides(cat, { limit: -3 })).toEqual([]);
  });
  it('limit > 카탈로그 크기 → 전체', () => {
    const res = selectStyleGuides(cat, { limit: 9999 });
    expect(res).toHaveLength(cat.length);
  });
  it('빈 카탈로그 → 빈 배열(throw 없음)', () => {
    expect(selectStyleGuides([], { family: 'tech-dark' })).toEqual([]);
  });
});

describe('selectStyleGuides — 부분점수 (fixture)', () => {
  it('domains recall: 4중 2 요청 → 0.5', () => {
    const e = entry('x', { domains: ['saas', 'dashboard'] });
    const res = selectStyleGuides([e], {
      domains: ['saas', 'dashboard', 'fintech', 'docs'],
    });
    expect(res[0].score).toBeCloseTo(0.5, 10);
  });

  it('domains 여분 보유는 무감점(recall-only, precision 없음)', () => {
    const few = entry('few', { domains: ['saas'] });
    const many = entry('many', { domains: ['saas', 'blog', 'gaming', 'luxury'] });
    const res = selectStyleGuides([few, many], { domains: ['saas'] });
    // 둘 다 요청 도메인 100% 커버 → 동점 1.0.
    expect(res.every((r) => r.score === 1)).toBe(true);
  });

  it('tags recall 부분점수', () => {
    const e = entry('x', { tags: ['dark', 'neon'] });
    const res = selectStyleGuides([e], { tags: ['dark', 'neon', 'grid', 'serif'] });
    expect(res[0].score).toBeCloseTo(0.5, 10);
  });

  it('characteristics 등가 + colorScheme dark가 meta both를 매치', () => {
    const both = entry('both', { characteristics: { ...baseChar, colorScheme: 'both' } });
    const light = entry('light', { characteristics: { ...baseChar, colorScheme: 'light' } });
    const res = selectStyleGuides([both, light], {
      characteristics: { colorScheme: 'dark' },
    });
    const b = res.find((r) => r.name === 'both')!;
    const l = res.find((r) => r.name === 'light')!;
    expect(b.score).toBeCloseTo(1, 10); // both가 dark 요청을 만족
    expect(l.score).toBeCloseTo(0, 10); // light는 dark 아님
  });

  it('mood 근접(ideal) 척도', () => {
    const e5 = entry('e5', { mood: { ...baseMood, energy: 5 } });
    const e3 = entry('e3', { mood: { ...baseMood, energy: 3 } });
    const res = selectStyleGuides([e5, e3], { mood: { energy: 5 } });
    expect(res.find((r) => r.name === 'e5')!.score).toBeCloseTo(1, 10);
    expect(res.find((r) => r.name === 'e3')!.score).toBeCloseTo(1 - 2 / 4, 10); // 0.5
  });

  it('mood band(min/max): 경계 포함=1, 밖은 graded 초과 감점', () => {
    const inside = entry('in', { mood: { ...baseMood, energy: 4 } });
    const boundary = entry('bd', { mood: { ...baseMood, energy: 3 } });
    const outside = entry('out', { mood: { ...baseMood, energy: 1 } });
    const res = selectStyleGuides([inside, boundary, outside], {
      mood: { energy: { min: 3, max: 5 } },
    });
    expect(res.find((r) => r.name === 'in')!.score).toBeCloseTo(1, 10);
    expect(res.find((r) => r.name === 'bd')!.score).toBeCloseTo(1, 10); // 경계 포함
    expect(res.find((r) => r.name === 'out')!.score).toBeCloseTo(1 - 2 / 4, 10); // 3-1=2 초과 → 0.5
  });

  it('mood-only 쿼리 동작(다른 criterion 없이)', () => {
    const e = entry('x', { mood: { ...baseMood, warmth: 5 } });
    const res = selectStyleGuides([e], { mood: { warmth: 5 } });
    expect(res[0].score).toBeCloseTo(1, 10);
  });
});

describe('selectStyleGuides — 입력 검증/sanitize', () => {
  it('weights 전부 0 → 중립 fallback(1점)', () => {
    const e = entry('x', { domains: ['docs'] });
    const res = selectStyleGuides([e], {
      domains: ['saas'], // 불일치라도
      weights: { domains: 0 },
    });
    expect(res[0].score).toBeCloseTo(1, 10);
  });

  it('음수/NaN weight → 0으로 clamp', () => {
    const hit = entry('hit', { domains: ['saas'], tags: ['dark'] });
    const res = selectStyleGuides([hit], {
      domains: ['saas'],
      tags: ['serif'], // 불일치
      weights: { tags: -5 }, // tags 무력화 → domains만 기여
    });
    expect(res[0].score).toBeCloseTo(1, 10); // domains 100%, tags 가중치 0
  });

  it('빈 배열 criterion은 무제약으로 무시', () => {
    const e = entry('x', { domains: ['docs'] });
    const withEmpty = selectStyleGuides([e], { domains: [] });
    const none = selectStyleGuides([e], {});
    expect(withEmpty[0].score).toBe(none[0].score); // 둘 다 중립 1
    expect(withEmpty[0].score).toBe(1);
  });
});

describe('selectStyleGuides — 정렬/결정성', () => {
  it('weights 오버라이드가 정렬을 바꾼다', () => {
    const a = entry('a', { family: 'tech-dark', tags: ['neon'] });
    const b = entry('b', { family: 'flat-systematic', tags: ['neon', 'grid'] });
    // family=tech-dark 요청 + tags=[neon,grid]. 기본 가중치: family 1, tags 0.75.
    const def = selectStyleGuides([a, b], { family: 'tech-dark', tags: ['neon', 'grid'] });
    // a: family1*1 + tags0.5*0.75 = 1.375 / 1.75 = 0.7857; b: family0 + tags1*0.75 = 0.75/1.75=0.4286
    expect(def[0].name).toBe('a');
    // tags 가중치를 크게 → b(tags 100%)가 역전
    const weighted = selectStyleGuides([a, b], {
      family: 'tech-dark',
      tags: ['neon', 'grid'],
      weights: { tags: 10 },
    });
    expect(weighted[0].name).toBe('b');
  });

  it('동점 tie-break: priority → trendIndex → name', () => {
    // 모두 criteria 없이 1.0 동점 → priority asc, trendIndex asc, name asc.
    const p2 = entry('zzz-p2', { priority: 'P2', trendIndex: 1 });
    const p1hi = entry('mmm-p1-hi', { priority: 'P1', trendIndex: 9 });
    const p1lo = entry('aaa-p1-lo', { priority: 'P1', trendIndex: 2 });
    const res = selectStyleGuides([p2, p1hi, p1lo], {}, );
    expect(res.map((r) => r.name)).toEqual(['aaa-p1-lo', 'mmm-p1-hi', 'zzz-p2']);
  });

  it('name asc 최종 tie-break(priority·trendIndex 동일)', () => {
    const b = entry('b', { priority: 'P1', trendIndex: 1 });
    const a = entry('a', { priority: 'P1', trendIndex: 1 });
    const res = selectStyleGuides([b, a], {});
    expect(res.map((r) => r.name)).toEqual(['a', 'b']);
  });
});

describe('selectStyleGuides — pending(meta 부재) 처리', () => {
  it('기본은 pending 제외', () => {
    const authored = entry('has', { family: 'tech-dark' });
    const pending = entry('none');
    const res = selectStyleGuides([authored, pending], { family: 'tech-dark' });
    expect(res.map((r) => r.name)).toEqual(['has']);
  });

  it('includePending:true → 0점으로 뒤에 append(name순)', () => {
    const authored = entry('has', { family: 'tech-dark' });
    const pB = entry('pending-b');
    const pA = entry('pending-a');
    const res = selectStyleGuides([authored, pB, pA], {
      family: 'tech-dark',
      includePending: true,
    });
    expect(res[0].name).toBe('has');
    expect(res.slice(1).map((r) => r.name)).toEqual(['pending-a', 'pending-b']);
    expect(res.slice(1).every((r) => r.score === 0)).toBe(true);
  });
});

describe('selectStyleGuides — explain/breakdown', () => {
  it('explain:true → breakdown이 지정 criterion 키만 포함', () => {
    const e = entry('x', { family: 'tech-dark', domains: ['gaming'] });
    const res = selectStyleGuides([e], {
      family: 'tech-dark',
      domains: ['gaming'],
      explain: true,
    });
    expect(res[0].breakdown).toBeDefined();
    expect(Object.keys(res[0].breakdown!).sort()).toEqual(['domains', 'family']);
    expect(res[0].breakdown!.family).toBeCloseTo(1, 10);
    expect(res[0].breakdown!.domains).toBeCloseTo(1, 10);
  });

  it('explain:false(기본) → result에 breakdown 키 부재', () => {
    const e = entry('x', { family: 'tech-dark' });
    const res = selectStyleGuides([e], { family: 'tech-dark' });
    expect('breakdown' in res[0]).toBe(false);
  });
});

describe('selectStyleGuides — generic 재사용', () => {
  it('viz-shaped fixture({name,meta})에도 동일 동작(패키지 import 없이)', () => {
    const vizLike = [
      entry('neon-like', {
        family: 'viz-neon-gradient-dark',
        characteristics: { ...baseChar, colorScheme: 'dark' },
        mood: { ...baseMood, energy: 5 },
        tags: ['dark', 'neon'],
      }),
      entry('flat-like', {
        family: 'viz-flat-pop',
        characteristics: { ...baseChar, colorScheme: 'light' },
        mood: { ...baseMood, energy: 3 },
        tags: ['vivid', 'flat'],
      }),
    ];
    const res = selectStyleGuides(vizLike, {
      characteristics: { colorScheme: 'dark' },
      mood: { energy: 5 },
      tags: ['neon'],
    });
    expect(res[0].name).toBe('neon-like');
  });
});
