/**
 * select.test.ts — selectVizTypes 스코어링·랭킹 계약 (KAN-020 → KAN-040 backfill).
 *
 * style-guide-catalog/select.ts에서 시맨틱을 계승: soft-weighted(하드필터 아님), 배열 criteria는 recall
 * 부분매치, includePending 기본 false, limit은 scored+pending concat 후 적용, tie-break score↓→priority↑→id↑.
 * KAN-040으로 전량 backfill되어 레지스트리 87종이 모두 authored(pending 0) — soft-weighted 비붕괴·recall
 * 부분매치 등 시맨틱은 실 레지스트리에서 검증하고, pending 전용 경로(includePending)는 합성 픽스처로 지킨다.
 */
import { describe, it, expect } from 'vitest';
import { selectVizTypes } from './select';
import { vizTypeRegistry } from './registry';
import type { VizTypeRegistryEntry } from './types';

/** KAN-040 이후 authored = 레지스트리 전량(pending 0). */
const AUTHORED = vizTypeRegistry.length; // 87

describe('selectVizTypes — 기본 동작', () => {
  it('criteria 없으면 authored 전체를 중립 스코어(1)로 반환(기본 limit 5)', () => {
    const r = selectVizTypes(vizTypeRegistry);
    expect(r.length).toBe(5); // 기본 limit
    for (const x of r) expect(x.score).toBe(1);
  });

  it('전량 authored — 모든 유형이 후보로 남고 결과는 모두 meta 보유(soft-weighted)', () => {
    const r = selectVizTypes(vizTypeRegistry, { category: ['data-chart'], limit: 100 });
    expect(r.length).toBe(AUTHORED); // 87 — criteria 불일치로도 탈락하지 않음
    for (const x of r) expect(x.entry.meta).toBeDefined();
  });

  it('실 레지스트리에 pending 0 — includePending은 결과를 바꾸지 않는다(KAN-040)', () => {
    const withPending = selectVizTypes(vizTypeRegistry, {
      category: ['data-chart'],
      includePending: true,
      limit: 1000,
    });
    const withoutPending = selectVizTypes(vizTypeRegistry, {
      category: ['data-chart'],
      limit: 1000,
    });
    expect(withPending.length).toBe(vizTypeRegistry.length); // 87
    expect(withPending.map((x) => x.id)).toEqual(withoutPending.map((x) => x.id));
    for (const x of withPending) expect(x.entry.meta).toBeDefined();
  });

  it('includePending 계약(합성 픽스처) — pending을 0점으로 뒤에 append', () => {
    const authored: VizTypeRegistryEntry = {
      id: 'VT-901',
      name: 'Authored Fixture',
      kind: 'template',
      exportNames: ['FixtureA'],
      meta: {
        category: 'data-chart',
        summary: 'fixture',
        dataShape: ['magnitude'],
        primitives: ['axis'],
        aliases: [],
        useWhen: ['use it'],
        avoidWhen: ['avoid it'],
        tags: ['chart'],
      },
    };
    const pending: VizTypeRegistryEntry = {
      id: 'VT-902',
      name: 'Pending Fixture',
      kind: 'template',
      exportNames: ['FixtureB'],
    };
    const fixture = [authored, pending];

    // 기본(false): pending 제외 → authored 1건만
    const excluded = selectVizTypes(fixture, { category: ['data-chart'], limit: 100 });
    expect(excluded.map((x) => x.id)).toEqual(['VT-901']);

    // true: pending을 0점으로 뒤에 append
    const included = selectVizTypes(fixture, {
      category: ['data-chart'],
      includePending: true,
      limit: 100,
    });
    expect(included.map((x) => x.id)).toEqual(['VT-901', 'VT-902']);
    expect(included[0].score).toBe(1);
    expect(included[1].score).toBe(0);
    expect(included[1].entry.meta).toBeUndefined();
  });
});

describe('selectVizTypes — 스코어링', () => {
  it('category 매치가 최상위로 랭크된다(data-chart → VT-501 BarChart)', () => {
    const r = selectVizTypes(vizTypeRegistry, { category: ['data-chart'] });
    expect(r[0].id).toBe('VT-501');
    expect(r[0].score).toBe(1);
  });

  it('dataShape process → 공정형 유형이 만점(부분매치 recall) — 만점 집합 = process 보유 전체', () => {
    const r = selectVizTypes(vizTypeRegistry, { dataShape: ['process'], limit: 100 });
    const perfect = new Set(r.filter((x) => x.score === 1).map((x) => x.id));
    // 만점 집합은 meta.dataShape에 process를 포함한 유형과 정확히 일치한다(레지스트리에서 파생).
    const expected = new Set(
      vizTypeRegistry.filter((e) => e.meta?.dataShape.includes('process')).map((e) => e.id),
    );
    expect(perfect).toEqual(expected);
    // 대표 공정형(파일럿)들이 만점에 포함된다.
    for (const id of ['VT-108', 'VT-202', 'VT-203']) expect(perfect.has(id)).toBe(true);
  });

  it('soft-weighted 비붕괴 — 대부분 불일치여도 후보는 전량 잔존(0점 포함)', () => {
    const r = selectVizTypes(vizTypeRegistry, { primitives: ['geo'], limit: 100 });
    expect(r.length).toBe(AUTHORED); // 탈락 없음(하드필터 아님)
    // geo 프리미티브 보유 유형은 >0, 나머지는 0 — 둘 다 결과에 남는다.
    expect(r.some((x) => x.score > 0)).toBe(true);
    expect(r.some((x) => x.score === 0)).toBe(true);
  });

  it('limit은 concat 후 적용된다', () => {
    const r = selectVizTypes(vizTypeRegistry, {
      category: ['data-chart'],
      includePending: true,
      limit: 3,
    });
    expect(r.length).toBe(3);
    expect(r[0].id).toBe('VT-501');
  });
});

describe('selectVizTypes — 구체성 (상류 I4)', () => {
  it("match:'all' — 지정한 모든 축에 걸린 후보만 남는다(하드 필터)", () => {
    // 상류 재현: relationship + matrix. 'any'에서는 matrix 태그 유형이 20위권 아래로 밀렸다.
    const any = selectVizTypes(vizTypeRegistry, {
      dataShape: ['relationship'],
      tags: ['matrix'],
      limit: 100,
    });
    const all = selectVizTypes(vizTypeRegistry, {
      dataShape: ['relationship'],
      tags: ['matrix'],
      match: 'all',
      limit: 100,
    });
    expect(any.length).toBeGreaterThan(all.length); // 'any'는 비붕괴(전량 잔존)
    // 'all'은 두 축을 모두 만족하는 후보만 — 하나도 없으면 빈 배열이 정답이다("그런 유형은 없다").
    for (const x of all) {
      expect(x.entry.meta!.dataShape).toContain('relationship');
      expect(x.entry.meta!.tags).toContain('matrix');
    }
  });

  it("match:'all' — matrix 태그만 요구하면 matrix 보유 유형 전체와 정확히 일치한다", () => {
    const all = selectVizTypes(vizTypeRegistry, { tags: ['matrix'], match: 'all', limit: 100 });
    const expected = vizTypeRegistry
      .filter((e) => e.meta?.tags.includes('matrix'))
      .map((e) => e.id)
      .sort();
    expect(all.map((x) => x.id).sort()).toEqual(expected);
    expect(all.length).toBeGreaterThanOrEqual(3); // VT-512 · VT-702 · VT-703
  });

  it("match 기본값은 'any' — 지정하지 않으면 현행(soft-weighted) 동작", () => {
    const implicit = selectVizTypes(vizTypeRegistry, { tags: ['matrix'], limit: 100 });
    const explicit = selectVizTypes(vizTypeRegistry, { tags: ['matrix'], match: 'any', limit: 100 });
    expect(implicit.map((x) => x.id)).toEqual(explicit.map((x) => x.id));
    expect(implicit.length).toBe(AUTHORED); // 하드필터가 아니다
  });

  it('structuralTraits 축이 분기 유무를 가른다 — branching 질의에서 VT-201이 VT-202를 앞선다', () => {
    const r = selectVizTypes(vizTypeRegistry, {
      dataShape: ['process'],
      structuralTraits: ['branching'],
      limit: 100,
    });
    const rank = (id: string) => r.findIndex((x) => x.id === id);
    expect(rank('VT-201')).toBeGreaterThanOrEqual(0);
    expect(rank('VT-201')).toBeLessThan(rank('VT-202'));
    // 상류가 실제로 저지른 오선택: ProcessSteps는 분기 질의에서 만점을 받지 못한다.
    const processSteps = r.find((x) => x.id === 'VT-202')!;
    expect(processSteps.score).toBeLessThan(1);
  });

  it("match:'all' + structuralTraits — 분기형 절차 유형만 남는다", () => {
    const r = selectVizTypes(vizTypeRegistry, {
      dataShape: ['process'],
      structuralTraits: ['branching'],
      match: 'all',
      limit: 100,
    });
    expect(r.map((x) => x.id)).toContain('VT-201');
    expect(r.map((x) => x.id)).not.toContain('VT-202');
    for (const x of r) expect(x.entry.meta!.structuralTraits).toContain('branching');
  });

  it('explain breakdown에 structuralTraits 키가 담긴다', () => {
    const r = selectVizTypes(vizTypeRegistry, {
      structuralTraits: ['cyclic'],
      explain: true,
      limit: 3,
    });
    expect(Object.keys(r[0].breakdown!)).toEqual(['structuralTraits']);
  });

  it('동점 tie-break에 precision이 들어간다 — 선언 축이 요청과 정확히 겹치는 후보가 앞선다', () => {
    // dataShape:['process','flow'] → 0.5 동점 구간. VT-201(['process'])은 precision 1.0,
    // VT-108(['process','temporal'])은 0.5 → 리포트가 지적한 "id 오름차순 때문에 VT-1xx가 항상 앞" 이 깨진다.
    const r = selectVizTypes(vizTypeRegistry, { dataShape: ['process', 'flow'], limit: 100 });
    const rank = (id: string) => r.findIndex((x) => x.id === id);
    expect(rank('VT-201')).toBeLessThan(rank('VT-108'));
    expect(rank('VT-202')).toBeLessThan(rank('VT-113'));
  });
});

describe('selectVizTypes — 결정성·explain', () => {
  it('tie-break: 동점·동precision은 id 오름차순(priority 동일 시)', () => {
    const r = selectVizTypes(vizTypeRegistry, { dataShape: ['process'], limit: 100 });
    // 같은 (score, precision) 그룹 안에서는 id가 오름차순이어야 한다.
    const key = (x: (typeof r)[number]) => {
      const owned = x.entry.meta!.dataShape;
      const hit = owned.filter((d) => d === 'process').length;
      return `${x.score}|${hit / owned.length}`;
    };
    const groups = new Map<string, string[]>();
    for (const x of r) {
      const k = key(x);
      groups.set(k, [...(groups.get(k) ?? []), x.id]);
    }
    for (const ids of groups.values()) expect(ids).toEqual([...ids].sort());
  });

  it('두 번 호출해도 동일 순서(결정적)', () => {
    const a = selectVizTypes(vizTypeRegistry, { dataShape: ['process'], limit: 10 });
    const b = selectVizTypes(vizTypeRegistry, { dataShape: ['process'], limit: 10 });
    expect(a.map((x) => x.id)).toEqual(b.map((x) => x.id));
  });

  it('explain:true → 지정 criterion 키만 breakdown에 담긴다', () => {
    const r = selectVizTypes(vizTypeRegistry, { category: ['data-chart'], explain: true });
    expect(r[0].breakdown).toBeDefined();
    expect(Object.keys(r[0].breakdown!)).toEqual(['category']);
  });

  it('explain 미지정 → breakdown 없음', () => {
    const r = selectVizTypes(vizTypeRegistry, { category: ['data-chart'] });
    expect(r[0].breakdown).toBeUndefined();
  });
});
