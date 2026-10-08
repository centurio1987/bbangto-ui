/**
 * Visualization catalog manifest 생성기 — viz style guide 배열을 색인(`catalog.manifest.json`, 후보를
 * 고를 때 읽는 표)과 항목별 상세(`manifest/<name>.json`)로 투영한다(KAN-064). UI(style-guide-catalog)의
 * 동형 생성기를 국소 복제한 것으로, 로직은 동일하며 `VisualizationStyleGuide`도 `CatalogEntryLike`를
 * 구조적으로 만족한다. 색인 열에서만 UI 와 갈린다(viz 메타에는 priority 가 없다).
 *
 * 복제 이유(KAN-021): UI 생성기를 tokens로 이관하지 않고 여기 두어 KAN-018 커밋 코드를
 * 건드리지 않는다(회귀 표면 0). 복제본 drift는 이 패키지 manifest.test.ts의 재생성 동기
 * 테스트가 바이트 단위로 가드한다. SSOT는 각 VisualizationStyleGuide 객체의 `meta` 필드다.
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

/** 매니페스트 전체 배열을 결정적 JSON 문자열로 직렬화(2-space indent + 말미 개행). 색인 파일은 `serializeManifestIndex`. */
export function serializeManifest(entries: readonly ManifestEntry[]): string {
  return JSON.stringify(entries, null, 2) + '\n';
}

/**
 * 색인 열 — 후보를 고를 때 쓰는 필드만 싣는다. 고른 뒤 읽는 근거(useWhen·avoidWhen·mood·characteristics·
 * accessibility·related)와 completeness·description 은 항목별 상세 파일에 있다.
 */
export const MANIFEST_INDEX_COLUMNS = [
  'name',
  'displayName',
  'family',
  'summary',
  'tags',
  'domains',
  'metaStatus',
] as const;

export type ManifestIndexColumn = (typeof MANIFEST_INDEX_COLUMNS)[number];

/** 색인 파일(`catalog.manifest.json`) 모양. 행의 값 순서는 `columns` 를 따른다. pending 행의 메타 열은 null. */
export interface ManifestIndex {
  readonly axis: 'viz-style-guide';
  /** 항목 상세 파일 자리(패키지 루트 기준). `{name}` 을 행의 name 값으로 바꾼다. */
  readonly detail: 'manifest/{name}.json';
  readonly columns: readonly ManifestIndexColumn[];
  readonly rows: readonly (readonly unknown[])[];
}

/** 매니페스트(정렬된 항목 배열)를 색인으로 줄인다. 순서는 입력 순서 그대로다. */
export function buildManifestIndex(entries: readonly ManifestEntry[]): ManifestIndex {
  return {
    axis: 'viz-style-guide',
    detail: 'manifest/{name}.json',
    columns: MANIFEST_INDEX_COLUMNS,
    rows: entries.map((e) => [
      e.name,
      e.meta?.displayName ?? null,
      e.meta?.family ?? null,
      e.meta?.summary ?? null,
      e.meta?.tags ?? null,
      e.meta?.domains ?? null,
      e.metaStatus,
    ]),
  };
}

/** 색인을 결정적 JSON 문자열로 직렬화한다 — 머리 필드는 한 줄씩, 행은 한 줄에 하나(+ 말미 개행). */
export function serializeManifestIndex(index: ManifestIndex): string {
  const head = (['axis', 'detail', 'columns'] as const)
    .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(index[k])}`)
    .join(',\n');
  const rows = index.rows.map((r) => `    ${JSON.stringify(r)}`).join(',\n');
  return `{\n${head},\n  "rows": [\n${rows}\n  ]\n}\n`;
}

/** 항목 하나의 상세를 결정적 JSON 문자열로 직렬화(2-space indent + 말미 개행). */
export function serializeManifestEntry(entry: ManifestEntry): string {
  return JSON.stringify(entry, null, 2) + '\n';
}
