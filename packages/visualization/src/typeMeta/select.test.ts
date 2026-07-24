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

describe('selectVizTypes — 결정성·explain', () => {
  it('tie-break: 동점은 id 오름차순(priority 동일 시)', () => {
    const r = selectVizTypes(vizTypeRegistry, { dataShape: ['process'], limit: 10 });
    const tied = r.filter((x) => x.score === 1).map((x) => x.id);
    expect(tied).toEqual([...tied].sort());
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
