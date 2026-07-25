/**
 * select.test.ts — selectFoundations 스코어링·랭킹 계약 (KAN-035, 외부검토 #11: 구체 fixture + 기대 순위).
 *
 * soft-weighted 비붕괴, colorScheme/domains/tags/mood 재랭크, pending이 authored를 부당히 이기지 않음,
 * 빈 criteria 시 안정·결정적 정렬을 구체 fixture로 고정한다.
 */
import { describe, it, expect } from 'vitest';
import type { FoundationMeta } from '@centurio1987/bbangto-ui-tokens';
import type { FoundationManifestEntry } from './manifest';
import { selectFoundations } from './select';

function mk(
  slug: string,
  colorScheme: 'light' | 'dark',
  meta?: FoundationMeta,
): FoundationManifestEntry {
  return {
    slug,
    label: slug,
    colorScheme,
    baseTextContrast: 18,
    metaStatus: meta ? 'authored' : 'pending',
    meta,
  };
}
function meta(over: Partial<FoundationMeta>): FoundationMeta {
  return {
    displayName: 'x',
    summary: 's',
    tags: [],
    mood: { formality: 3, energy: 3, warmth: 3, density: 3, ornament: 3 },
    domains: [],
    useWhen: ['u'],
    avoidWhen: ['a'],
    accessibility: { contrastIntent: 'aa', colorblindConsidered: false, darkFirst: false },
    ...over,
  };
}

const d1 = mk('d1', 'dark', meta({ domains: ['fintech', 'dashboard'], tags: ['dark', 'vivid'] }));
const l1 = mk('l1', 'light', meta({ domains: ['dev-tools', 'saas'], tags: ['light', 'technical', 'mono'] }));
const l2 = mk('l2', 'light', meta({ domains: ['saas', 'editorial'], tags: ['light', 'minimal'] }));
const p1 = mk('p1', 'light'); // pending
const manifest = [l2, d1, p1, l1]; // 입력 순서 임의 → 결정성 확인용

const slugsOf = (r: ReturnType<typeof selectFoundations>) => r.map((x) => x.slug);

describe('selectFoundations — 재랭크', () => {
  it('colorScheme:dark → 다크가 1위(score 1), 나머지 0점', () => {
    const r = selectFoundations(manifest, { colorScheme: 'dark' });
    expect(r[0].slug).toBe('d1');
    expect(r[0].score).toBe(1);
    expect(slugsOf(r)).not.toContain('p1'); // pending 기본 제외
    expect(r.filter((x) => x.slug !== 'd1').every((x) => x.score === 0)).toBe(true);
  });

  it('domains:[dev-tools] → l1 1위', () => {
    const r = selectFoundations(manifest, { domains: ['dev-tools'] });
    expect(r[0].slug).toBe('l1');
    expect(r[0].score).toBe(1);
  });

  it('tags:[light,minimal] → recall 순 l2 > l1 > d1', () => {
    const r = selectFoundations(manifest, { tags: ['light', 'minimal'] });
    expect(slugsOf(r)).toEqual(['l2', 'l1', 'd1']);
    expect(r[0].score).toBe(1); // l2: 2/2
    expect(r[1].score).toBeCloseTo(0.5); // l1: 1/2
  });
});

describe('selectFoundations — 안정성·pending', () => {
  it('빈 criteria → 전원 중립 1점, slug 오름차순 안정 정렬(pending 제외)', () => {
    const r = selectFoundations(manifest, {});
    expect(slugsOf(r)).toEqual(['d1', 'l1', 'l2']);
    expect(r.every((x) => x.score === 1)).toBe(true);
  });

  it('includePending → pending은 0점으로 authored 뒤에 append', () => {
    const r = selectFoundations(manifest, { includePending: true });
    expect(slugsOf(r)).toEqual(['d1', 'l1', 'l2', 'p1']);
    expect(r[r.length - 1].slug).toBe('p1');
    expect(r[r.length - 1].score).toBe(0);
  });

  it('pending은 어떤 criteria에서도 authored를 이기지 못한다', () => {
    const r = selectFoundations(manifest, { colorScheme: 'light', includePending: true });
    // l1,l2(score1) → d1(score0, authored) → p1(pending, 마지막)
    expect(slugsOf(r)).toEqual(['l1', 'l2', 'd1', 'p1']);
    const pIdx = r.findIndex((x) => x.slug === 'p1');
    expect(pIdx).toBe(r.length - 1);
  });

  it('limit 적용·explain breakdown', () => {
    expect(selectFoundations(manifest, { limit: 2 }).length).toBe(2);
    const r = selectFoundations(manifest, { domains: ['saas'], explain: true });
    expect(r[0].breakdown).toBeDefined();
    expect(Object.keys(r[0].breakdown!)).toContain('domains');
  });
});

// KAN-041 보강 — mood 근접·복합 criteria 가중합·weights 오버라이드의 구체 기대치.
describe('selectFoundations — mood 근접(KAN-041)', () => {
  const calm = mk(
    'calm',
    'light',
    meta({ mood: { formality: 1, energy: 1, warmth: 1, density: 1, ornament: 1 }, tags: ['minimal'] }),
  );
  const loud = mk(
    'loud',
    'light',
    meta({ mood: { formality: 5, energy: 5, warmth: 5, density: 5, ornament: 5 }, tags: ['maximal'] }),
  );
  const moodManifest = [loud, calm]; // 입력 순서 임의

  it('mood {energy:5,ornament:5} → loud 근접 1위(proximity 1), calm 최하(proximity 0)', () => {
    const r = selectFoundations(moodManifest, { mood: { energy: 5, ornament: 5 } });
    expect(slugsOf(r)).toEqual(['loud', 'calm']);
    expect(r[0].score).toBe(1); // |5-5|/4 평균 = 0 → 1
    expect(r[1].score).toBe(0); // |5-1|/4 = 1 평균 → 0
  });

  it('mood는 지정 축만 반영 — 중간값 요청은 부분 근접으로 랭크', () => {
    const r = selectFoundations(moodManifest, { mood: { energy: 3 } });
    // |3-1|/4=0.5 → calm 0.5 ; |3-5|/4=0.5 → loud 0.5 ; 동점 → slug 오름차순
    expect(slugsOf(r)).toEqual(['calm', 'loud']);
    expect(r[0].score).toBeCloseTo(0.5);
    expect(r[1].score).toBeCloseTo(0.5);
  });
});

describe('selectFoundations — 복합 criteria 가중합(KAN-041)', () => {
  it('colorScheme+domains+tags 동시 → 가중 정규화 순위 l2 > l1 > d1', () => {
    const r = selectFoundations(manifest, {
      colorScheme: 'light',
      domains: ['saas'],
      tags: ['minimal'],
    });
    expect(slugsOf(r)).toEqual(['l2', 'l1', 'd1']);
    expect(r[0].score).toBe(1); // l2: (1·1 + 1·1 + 0.75·1)/2.75 = 1
    expect(r[1].score).toBeCloseTo(2 / 2.75); // l1: tags 0 → (1+1+0)/2.75 ≈ 0.727
    expect(r[2].score).toBe(0); // d1: 전 criterion 0
  });

  it('weights.tags=0 → tags 기여 소거, domains만으로 l1·l2 동점(slug 정렬)', () => {
    const r = selectFoundations(manifest, {
      domains: ['saas'],
      tags: ['minimal'],
      weights: { tags: 0 },
    });
    expect(slugsOf(r)).toEqual(['l1', 'l2', 'd1']);
    expect(r[0].score).toBe(1); // l1: domains saas 적중, tags 무시
    expect(r[1].score).toBe(1); // l2: 동일 → 동점, slug 오름차순으로 l1 먼저
    expect(r[2].score).toBe(0); // d1: saas 없음
  });
});
