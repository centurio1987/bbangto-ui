/**
 * foundation 채택 매니페스트 생성기 — `foundationCatalog`를 색인(`foundation.manifest.json`, 후보를 고를 때
 * 읽는 표)과 항목별 상세(`manifest/<slug>.json`)로 투영한다 (KAN-035, 두 층은 KAN-064). 스타일 축
 * (style-guide-catalog/manifest.ts)·유형 축(visualization typeMeta/manifest.ts)의 동형 생성기를 foundation 축으로
 * 미러링한 것.
 *
 * SSOT = `foundationCatalog`(slug 정체성) + `foundationMetaRegistry`(authored 메타). `buildFoundationManifest`는:
 *  - `colorScheme`을 `semantic.background.base` 실효 휘도로 **파생**(저작 아님),
 *  - `baseTextContrast`를 `foreground.base` vs `background.base` 실측(`tokens/contrast.ts` 재사용)으로 **파생**,
 *  - authored 항목의 `accessibility.contrastIntent` over-claim(선언 > 실측)을 **hard-fail**,
 *  - `related` 참조 정합성(존재·self-ref·중복)을 검증,
 *  - slug 오름차순으로 결정적 정렬한다.
 * 순수 데이터(렌더 없음)라 Node에서 안전 실행. 최신성은 manifest.test.ts 바이트 동기 테스트가 강제.
 */
import type { BbangtoFoundation, FoundationMeta, FoundationColorScheme } from '@centurio1987/bbangto-ui-tokens';
import {
  parseColor,
  compositeOver,
  relativeLuminance,
  contrastRatio,
  CONTRAST_THRESHOLDS,
} from '@centurio1987/bbangto-ui-tokens';

/** 매니페스트 1행. `meta`가 있으면 metaStatus='authored'(rich), 없으면 'pending'(thin). */
export interface FoundationManifestEntry {
  readonly slug: string;
  /** Title Case 라벨(slug 파생). */
  readonly label: string;
  /** 파생 — base 표면 스킴('dark'는 현재 amber-dark뿐). */
  readonly colorScheme: FoundationColorScheme;
  /** 파생 — base 텍스트 실측 대비(foreground.base on background.base, 소수 2자리). */
  readonly baseTextContrast: number;
  /** 'pending'은 "아직 백필 안 됨"이지 "해당 없음"이 아니다(계약, 후속 KAN-041). */
  readonly metaStatus: 'authored' | 'pending';
  /** 저작된 경우에만 존재. AI가 채택 판단에 쓰는 기계가독 필드. */
  readonly meta?: FoundationMeta;
}

/** catalog.json 1행({id,label,file}) — 소비 호환용 얇은 목록. 생성물(이 생성기가 emit). */
export interface FoundationCatalogEntry {
  readonly id: string;
  readonly label: string;
  readonly file: string;
}

/** slug(kebab) → Title Case 라벨. 예: 'amber-dark' → 'Amber Dark'. */
export function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => (w.length === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ');
}

/**
 * base 표면 스킴 파생. 기준 토큰 = `semantic.background.base`. 알파가 있으면 흰 페이지 위 실효색으로 합성 후
 * 상대 휘도 계산. 경계값 0.5(≥ light, < dark). 파싱 불가는 데이터 무결성 위반이라 throw.
 */
export function deriveColorScheme(backgroundBase: string): FoundationColorScheme {
  const parsed = parseColor(backgroundBase);
  if (!parsed) throw new Error(`[foundation-manifest] background.base 파싱 불가: "${backgroundBase}"`);
  const effective =
    parsed.a < 1 ? compositeOver(parsed, { r: 255, g: 255, b: 255, a: 1 }) : parsed;
  return relativeLuminance(effective) >= 0.5 ? 'light' : 'dark';
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * `foundationCatalog`와 authored registry를 결정적 매니페스트로 변환한다(slug 오름차순·고정 키 순서).
 * registry 키가 catalog에 없으면(phantom) throw, authored의 over-claim·related 위반도 throw.
 */
export function buildFoundationManifest(
  foundationCatalog: Readonly<Record<string, BbangtoFoundation>>,
  registry: Readonly<Record<string, FoundationMeta>>,
): FoundationManifestEntry[] {
  const slugs = Object.keys(foundationCatalog);
  const slugSet = new Set(slugs);

  // phantom registry 키(catalog에 없는 slug 저작) 방지.
  for (const key of Object.keys(registry)) {
    if (!slugSet.has(key)) {
      throw new Error(`[foundation-manifest] registry slug "${key}" not in foundationCatalog`);
    }
  }

  const entries: FoundationManifestEntry[] = slugs.map((slug) => {
    const f = foundationCatalog[slug];
    const bg = f.semantic.background.base;
    const fg = f.semantic.foreground.base;
    const colorScheme = deriveColorScheme(bg);
    const ratio = contrastRatio(fg, bg);
    if (ratio == null) {
      throw new Error(`[foundation-manifest] "${slug}": base 텍스트 대비 계산 불가(fg=${fg}, bg=${bg})`);
    }
    const baseTextContrast = round2(ratio);

    const meta = registry[slug];
    if (meta) {
      // over-claim: 선언 의도가 실측 base 텍스트 대비보다 높으면 hard-fail(KAN-024 패턴, base 쌍 한정).
      const threshold = CONTRAST_THRESHOLDS[meta.accessibility.contrastIntent];
      if (baseTextContrast + 1e-6 < threshold) {
        throw new Error(
          `[foundation-manifest] "${slug}": contrastIntent '${meta.accessibility.contrastIntent}'(≥${threshold}) over-claim — 실측 baseTextContrast=${baseTextContrast}`,
        );
      }
      // related 정합성(존재·self-ref·중복).
      if (meta.related) {
        const seen = new Set<string>();
        for (const r of meta.related) {
          if (r === slug) throw new Error(`[foundation-manifest] "${slug}": related self-reference`);
          if (seen.has(r)) throw new Error(`[foundation-manifest] "${slug}": duplicate related "${r}"`);
          if (!slugSet.has(r)) throw new Error(`[foundation-manifest] "${slug}": related "${r}" not in catalog`);
          seen.add(r);
        }
      }
    }

    // 고정 키 순서. undefined 값(meta)은 JSON.stringify가 생략 → thin/rich가 명확히 구분된다.
    const entry = {
      slug,
      label: slugToLabel(slug),
      colorScheme,
      baseTextContrast,
      metaStatus: (meta ? 'authored' : 'pending') as FoundationManifestEntry['metaStatus'],
      meta,
    };
    return entry as FoundationManifestEntry;
  });

  entries.sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  return entries;
}

/** 매니페스트 전체 배열을 결정적 JSON 문자열로 직렬화(2-space indent + 말미 개행). 색인 파일은 `serializeFoundationManifestIndex`. */
export function serializeFoundationManifest(entries: readonly FoundationManifestEntry[]): string {
  return JSON.stringify(entries, null, 2) + '\n';
}

/**
 * 색인 열 — 후보를 고를 때 쓰는 필드만 싣는다. 고른 뒤 읽는 근거(useWhen·avoidWhen·mood·accessibility·related)와
 * label·baseTextContrast 는 항목별 상세 파일에 있다. `displayName` 은 메타가 없으면 label 로 채운다.
 */
export const FOUNDATION_MANIFEST_INDEX_COLUMNS = [
  'slug',
  'displayName',
  'colorScheme',
  'summary',
  'tags',
  'domains',
  'metaStatus',
] as const;

export type FoundationManifestIndexColumn = (typeof FOUNDATION_MANIFEST_INDEX_COLUMNS)[number];

/** 색인 파일(`foundation.manifest.json`) 모양. 행의 값 순서는 `columns` 를 따른다. pending 행의 메타 열은 null. */
export interface FoundationManifestIndex {
  readonly axis: 'foundation';
  /** 항목 상세 파일 자리(패키지 루트 기준). `{slug}` 를 행의 slug 값으로 바꾼다. */
  readonly detail: 'manifest/{slug}.json';
  readonly columns: readonly FoundationManifestIndexColumn[];
  readonly rows: readonly (readonly unknown[])[];
}

/** 매니페스트(정렬된 항목 배열)를 색인으로 줄인다. 순서는 입력 순서 그대로다. */
export function buildFoundationManifestIndex(
  entries: readonly FoundationManifestEntry[],
): FoundationManifestIndex {
  return {
    axis: 'foundation',
    detail: 'manifest/{slug}.json',
    columns: FOUNDATION_MANIFEST_INDEX_COLUMNS,
    rows: entries.map((e) => [
      e.slug,
      e.meta?.displayName ?? e.label,
      e.colorScheme,
      e.meta?.summary ?? null,
      e.meta?.tags ?? null,
      e.meta?.domains ?? null,
      e.metaStatus,
    ]),
  };
}

/** 색인을 결정적 JSON 문자열로 직렬화한다 — 머리 필드는 한 줄씩, 행은 한 줄에 하나(+ 말미 개행). */
export function serializeFoundationManifestIndex(index: FoundationManifestIndex): string {
  const head = (['axis', 'detail', 'columns'] as const)
    .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(index[k])}`)
    .join(',\n');
  const rows = index.rows.map((r) => `    ${JSON.stringify(r)}`).join(',\n');
  return `{\n${head},\n  "rows": [\n${rows}\n  ]\n}\n`;
}

/** 항목 하나의 상세를 결정적 JSON 문자열로 직렬화(2-space indent + 말미 개행). */
export function serializeFoundationManifestEntry(entry: FoundationManifestEntry): string {
  return JSON.stringify(entry, null, 2) + '\n';
}

/**
 * catalog.json({id,label,file}) 파생 — `foundationCatalog` 키에서 생성한다(생성물 격하, KAN-035).
 * catalog.json이 SSOT에서 파생되므로 amber 누락 같은 이중-SSOT drift가 구조적으로 불가능해진다.
 */
export function buildCatalogList(
  foundationCatalog: Readonly<Record<string, BbangtoFoundation>>,
): FoundationCatalogEntry[] {
  return Object.keys(foundationCatalog)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    .map((id) => ({ id, label: slugToLabel(id), file: id }));
}

/** catalog.json 직렬화(2-space indent + 말미 개행). */
export function serializeCatalogList(entries: readonly FoundationCatalogEntry[]): string {
  return JSON.stringify(entries, null, 2) + '\n';
}
