/**
 * Catalog manifest 생성기 — style guide 배열을 AI가 파일 하나로 읽는 압축 매니페스트로 투영한다.
 *
 * SSOT는 각 StyleGuide 객체의 `meta` 필드다. `buildManifest`는 이를 병합하고, 객체 구조에서
 * `completeness`를 계산하며(렌더 없이 구조만 읽음 → Node 실행 안전), 결정적으로 정렬한다.
 * 자세한 전략은 METADATA_STRATEGY.md 참고.
 */
import type { StyleGuideMeta } from '@centurio1987/bbangto-ui-tokens';

/** 매니페스트 생성기가 객체 구조에서 계산하는 완성도 플래그(저작 대상 아님). */
export interface ManifestCompleteness {
  /** wrapperComponents가 1개 이상 있는가. */
  readonly hasWrappers: boolean;
  /** patterns(쇼케이스)가 1개 이상 있는가. */
  readonly hasPatterns: boolean;
  /** 선택 가능한 색 스킴 수(foundationPresets.length, 없으면 1). */
  readonly foundationPresetCount: number;
  /** visualMotif 문서가 있는가. */
  readonly hasVisualMotif: boolean;
}

/** 매니페스트 1행. `meta`가 있으면 metaStatus='authored'(rich), 없으면 'pending'(thin). */
export interface ManifestEntry {
  readonly name: string;
  readonly description?: string;
  /** 'pending'은 "아직 백필 안 됨"이지 "해당 없음"이 아니다(계약). */
  readonly metaStatus: 'authored' | 'pending';
  readonly completeness: ManifestCompleteness;
  /** 저작된 경우에만 존재. AI가 채택 판단에 쓰는 기계가독 필드. */
  readonly meta?: StyleGuideMeta;
}

/**
 * 매니페스트 생성기가 필요로 하는 최소 구조. UI(StyleGuide)와 viz(VisualizationStyleGuide)가
 * 모두 구조적으로 만족한다. 컴포넌트 함수는 참조만 하고 호출(렌더)하지 않는다.
 */
export interface CatalogEntryLike {
  readonly name: string;
  readonly description?: string;
  readonly meta?: StyleGuideMeta;
  readonly wrapperComponents?: Record<string, unknown>;
  readonly patterns?: Record<string, unknown>;
  readonly visualMotif?: unknown;
  readonly foundationPresets?: readonly unknown[];
}

function countKeys(o?: Record<string, unknown>): number {
  return o ? Object.keys(o).length : 0;
}

/**
 * 카탈로그 배열을 결정적(name 오름차순·고정 키 순서) 매니페스트로 변환한다.
 * `meta.related`의 참조 정합성(존재·self-ref·중복)을 검증하고 위반 시 throw한다.
 */
export function buildManifest(catalog: readonly CatalogEntryLike[]): ManifestEntry[] {
  const names = new Set(catalog.map((c) => c.name));

  const entries: ManifestEntry[] = catalog.map((sg) => {
    if (sg.meta?.related) {
      const seen = new Set<string>();
      for (const r of sg.meta.related) {
        if (r === sg.name) throw new Error(`[manifest] "${sg.name}": related self-reference`);
        if (seen.has(r)) throw new Error(`[manifest] "${sg.name}": duplicate related "${r}"`);
        if (!names.has(r)) throw new Error(`[manifest] "${sg.name}": related "${r}" not in catalog`);
        seen.add(r);
      }
    }

    const completeness: ManifestCompleteness = {
      hasWrappers: countKeys(sg.wrapperComponents) > 0,
      hasPatterns: countKeys(sg.patterns) > 0,
      foundationPresetCount: sg.foundationPresets?.length ?? 1,
      hasVisualMotif: !!sg.visualMotif,
    };

    // 고정 키 순서. undefined 값은 JSON.stringify가 생략 → thin/rich가 명확히 구분된다.
    const entry = {
      name: sg.name,
      description: sg.description,
      metaStatus: (sg.meta ? 'authored' : 'pending') as ManifestEntry['metaStatus'],
      completeness,
      meta: sg.meta,
    };
    return entry as ManifestEntry;
  });

  entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  return entries;
}

/** 매니페스트를 결정적 JSON 문자열로 직렬화(2-space indent + 말미 개행). */
export function serializeManifest(entries: readonly ManifestEntry[]): string {
  return JSON.stringify(entries, null, 2) + '\n';
}
