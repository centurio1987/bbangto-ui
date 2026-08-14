/**
 * exportName ↔ VT 유형 역방향 조회 helper (KAN-043 / 상류 I6).
 *
 * `vizTypeRegistry`는 "유형 → export" 방향이라, 소비자가 손에 든 **컴포넌트 이름에서** 채택 근거로 가는 길이 없었다.
 * 특히 1 export가 여러 유형을 겸하는 경우(`Statistics`·`Cycle`·`Hierarchy`) 이름으로 조회하면 id 순으로
 * **기본 렌더가 아닌 유형**이 먼저 잡혀, 소비자가 자기가 받을 그림과 다른 유형의 근거를 읽는 사고가 났다
 * (리포트 I6: `Statistics` 조회 → VT-513 Waffle이 먼저, 실제 기본은 `mode="cards"` = VT-601).
 *
 * 순수 데이터 조회다 — 컴포넌트를 import하지 않는다.
 */
import type { VizTypeRegistryEntry } from './types';

/** 이 export를 렌더 주체로 삼는 모든 유형(등록 순서 유지). */
export function vizTypesForExport(
  registry: readonly VizTypeRegistryEntry[],
  exportName: string,
): VizTypeRegistryEntry[] {
  return registry.filter((e) => e.exportNames.includes(exportName));
}

/**
 * 이 export를 **prop 없이** 렌더했을 때 나오는 유형.
 *  - 변주가 여럿이면 `variants[].isDefault`가 정답이다.
 *  - 변주 선언이 아예 없는 단일 유형 export면 그 유형이 곧 기본이다.
 *  - 둘 다 아니면 undefined(레지스트리 저작 누락 — `variantCoverage.test.ts`가 잡는다).
 */
export function defaultVizTypeForExport(
  registry: readonly VizTypeRegistryEntry[],
  exportName: string,
): VizTypeRegistryEntry | undefined {
  const candidates = vizTypesForExport(registry, exportName);
  const flagged = candidates.find((e) => (e.variants ?? []).some((v) => v.isDefault));
  if (flagged) return flagged;
  return candidates.length === 1 && (candidates[0].variants?.length ?? 0) === 0
    ? candidates[0]
    : undefined;
}

/** 특정 prop 값으로 렌더했을 때 나오는 유형(예: `Statistics` + `mode="waffle"` → VT-513). */
export function vizTypeForVariant(
  registry: readonly VizTypeRegistryEntry[],
  exportName: string,
  value: string,
  prop = 'mode',
): VizTypeRegistryEntry | undefined {
  return vizTypesForExport(registry, exportName).find((e) =>
    (e.variants ?? []).some((v) => v.prop === prop && v.value === value),
  );
}
