/**
 * lookup.test.ts — exportName → VT 유형 역방향 조회 계약 (KAN-043 / 상류 I6).
 *
 * 리포트가 든 사고를 그대로 단정한다: `Statistics`를 이름으로 조회하면 id 순으로 VT-513 Waffle이 먼저
 * 잡히지만 **실제 기본 렌더는 `mode="cards"` = VT-601**이다. `defaultVizTypeForExport`는 그 둘을 가른다.
 */
import { describe, it, expect } from 'vitest';
import { vizTypeRegistry } from './registry';
import { vizTypesForExport, defaultVizTypeForExport, vizTypeForVariant } from './lookup';

describe('exportName → 유형 역방향 조회', () => {
  it('1:N export는 모든 유형을 id 순으로 돌려준다', () => {
    expect(vizTypesForExport(vizTypeRegistry, 'Statistics').map((e) => e.id)).toEqual([
      'VT-513',
      'VT-514',
      'VT-601',
    ]);
    expect(vizTypesForExport(vizTypeRegistry, 'Cycle').map((e) => e.id)).toEqual([
      'VT-203',
      'VT-405',
      'VT-708',
    ]);
  });

  it('기본 렌더 유형은 id 첫 항목이 아니라 isDefault가 정한다(리포트 I6의 어긋남)', () => {
    const first = vizTypesForExport(vizTypeRegistry, 'Statistics')[0];
    const dflt = defaultVizTypeForExport(vizTypeRegistry, 'Statistics');
    expect(first.id).toBe('VT-513'); // 이름만 보고 고르면 Waffle이 잡힌다
    expect(dflt?.id).toBe('VT-601'); // 실제로 그려지는 것은 cards = Statistical Infographic
    expect(dflt?.id).not.toBe(first.id);
  });

  it('Cycle·Hierarchy도 같은 구조 — 기본은 ring / tree', () => {
    expect(defaultVizTypeForExport(vizTypeRegistry, 'Cycle')?.id).toBe('VT-203');
    expect(defaultVizTypeForExport(vizTypeRegistry, 'Hierarchy')?.id).toBe('VT-303');
  });

  it('변주 선언이 없는 단일 유형 export는 그 유형이 곧 기본이다', () => {
    expect(defaultVizTypeForExport(vizTypeRegistry, 'Flowchart')?.id).toBe('VT-201');
    expect(defaultVizTypeForExport(vizTypeRegistry, 'ProcessSteps')?.id).toBe('VT-202');
  });

  it('prop 값으로 유형을 찾는다 — 리포트가 물은 "waffle을 어디에 넣나"의 답', () => {
    const waffle = vizTypeForVariant(vizTypeRegistry, 'Statistics', 'waffle');
    expect(waffle?.id).toBe('VT-513');
    expect(waffle?.variants?.find((v) => v.value === 'waffle')?.prop).toBe('mode');
    // 리포트가 "레지스트리에서 빠졌다"고 지적한 mosaic도 이제 청구된다.
    expect(vizTypeForVariant(vizTypeRegistry, 'Statistics', 'mosaic')?.id).toBe('VT-601');
    // 리포트가 놓친 orbit도 함께 편입했다.
    expect(vizTypeForVariant(vizTypeRegistry, 'Cycle', 'orbit')?.id).toBe('VT-203');
  });

  it('없는 export/값은 undefined', () => {
    expect(vizTypesForExport(vizTypeRegistry, 'NotAComponent')).toEqual([]);
    expect(defaultVizTypeForExport(vizTypeRegistry, 'NotAComponent')).toBeUndefined();
    expect(vizTypeForVariant(vizTypeRegistry, 'Statistics', 'nope')).toBeUndefined();
  });
});
