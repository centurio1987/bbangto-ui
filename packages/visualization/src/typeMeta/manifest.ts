/**
 * 유형 축 매니페스트 생성기 — 레지스트리를 AI가 파일 하나로 읽는 압축 매니페스트로 투영한다 (KAN-020).
 *
 * style-guide-catalog/manifest.ts의 동형 생성기를 유형 축으로 미러링한 것. SSOT는 `vizTypeRegistry`의 각
 * 엔트리다. `buildTypeManifest`는 `related` 참조 정합성을 authored 전체에 대해 검증하고, 완성도를 구조에서
 * 계산하며(렌더 없이 데이터만 → Node 실행 안전), id 오름차순으로 결정적 정렬한다.
 */
import type { VizTypeMeta, VizTypeRegistryEntry, VizTypeVariant } from './types';

/** 매니페스트 생성기가 구조에서 계산하는 완성도 플래그(저작 대상 아님). */
export interface VizTypeManifestCompleteness {
  /** exportNames 개수(항상). */
  readonly exportCount: number;
  /** 렌더 변주(`variants`) 보유 여부. */
  readonly hasVariant: boolean;
  /** useWhen 문장 수(meta 없으면 0). */
  readonly useWhenCount: number;
  /** primitives 개수(meta 없으면 0). */
  readonly primitiveCount: number;
}

/** 매니페스트 1행. `meta`가 있으면 metaStatus='authored'(rich), 없으면 'pending'(thin). */
export interface VizTypeManifestEntry {
  readonly id: string;
  readonly name: string;
  readonly kind: 'template' | 'pattern';
  readonly exportNames: readonly string[];
  /**
   * 렌더 변주. `{ prop, value }` 쌍이라 소비자가 값을 **어느 prop에** 넣을지 알 수 있다
   * (KAN-043 / 상류 I6 — 이전 스키마는 값만 담은 `variant?: string`이었다).
   */
  readonly variants?: readonly VizTypeVariant[];
  /** 'pending'은 "아직 백필 안 됨"이지 "해당 없음"이 아니다(계약). */
  readonly metaStatus: 'authored' | 'pending';
  readonly completeness: VizTypeManifestCompleteness;
  /** 저작된 경우에만 존재. AI가 채택 판단에 쓰는 기계가독 필드. */
  readonly meta?: VizTypeMeta;
}

/**
 * 레지스트리를 결정적(id 오름차순·고정 키 순서) 매니페스트로 변환한다.
 * `meta.related`의 참조 정합성(존재·self-ref·중복)을 authored 전체에 대해 검증하고 위반 시 throw한다.
 */
export function buildTypeManifest(
  registry: readonly VizTypeRegistryEntry[],
): VizTypeManifestEntry[] {
  const ids = new Set(registry.map((e) => e.id));

  const entries: VizTypeManifestEntry[] = registry.map((e) => {
    if (e.meta?.related) {
      const seen = new Set<string>();
      for (const r of e.meta.related) {
        if (r === e.id) throw new Error(`[type-manifest] "${e.id}": related self-reference`);
        if (seen.has(r)) throw new Error(`[type-manifest] "${e.id}": duplicate related "${r}"`);
        if (!ids.has(r)) throw new Error(`[type-manifest] "${e.id}": related "${r}" not in registry`);
        seen.add(r);
      }
    }

    const completeness: VizTypeManifestCompleteness = {
      exportCount: e.exportNames.length,
      hasVariant: (e.variants?.length ?? 0) > 0,
      useWhenCount: e.meta?.useWhen.length ?? 0,
      primitiveCount: e.meta?.primitives.length ?? 0,
    };

    // 고정 키 순서. undefined 값(variants·meta)은 JSON.stringify가 생략 → thin/rich가 명확히 구분된다.
    const entry = {
      id: e.id,
      name: e.name,
      kind: e.kind,
      exportNames: e.exportNames,
      variants: e.variants,
      metaStatus: (e.meta ? 'authored' : 'pending') as VizTypeManifestEntry['metaStatus'],
      completeness,
      meta: e.meta,
    };
    return entry as VizTypeManifestEntry;
  });

  entries.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return entries;
}

/** 매니페스트를 결정적 JSON 문자열로 직렬화(2-space indent + 말미 개행). */
export function serializeTypeManifest(entries: readonly VizTypeManifestEntry[]): string {
  return JSON.stringify(entries, null, 2) + '\n';
}
