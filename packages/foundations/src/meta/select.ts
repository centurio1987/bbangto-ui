/**
 * selectFoundations — foundation 채택 메타 기반 스코어링·랭킹 helper (KAN-035).
 *
 * style-guide-catalog/select.ts·visualization selectVizTypes를 foundation 축으로 미러링. AI 소비자가
 * colorScheme/domains/tags/mood로 후보를 좁혀 상위 N shortlist를 받고, 각 후보의 useWhen/avoidWhen으로 최종 판단.
 *
 * 스코어링 = soft-weighted(하드 필터 아님): 지정 criterion만 가중 합산해 [0,1] 정규화 → 상위 N.
 * criteria 불일치로 항목이 탈락하지 않으므로 meta 있는 foundation은 항상 후보에 남는다(shortlist 붕괴 방지).
 */
import type {
  Domain,
  Tag,
  StyleMood,
  FoundationColorScheme,
} from '@centurio1987/bbangto-ui-tokens';
import type { FoundationManifestEntry } from './manifest';

/** criterion별 가중치. 지정 criterion만 스코어에 기여한다. */
export interface FoundationCriterionWeights {
  readonly colorScheme: number;
  readonly domains: number;
  readonly tags: number;
  readonly mood: number;
}

/** 스코어링 입력 criteria. 지정한 필드만 랭킹에 반영된다. */
export interface FoundationSelectionCriteria {
  readonly colorScheme?: FoundationColorScheme;
  readonly domains?: readonly Domain[];
  readonly tags?: readonly Tag[];
  /** 무드 근접(지정한 축만). 각 축 |요청-보유|/4로 정규화 후 1-평균거리. */
  readonly mood?: Partial<StyleMood>;
  /** 반환 개수(기본 5). <0→0, 소수→floor, >엔트리 수→전체. */
  readonly limit?: number;
  /** criterion별 가중치 오버라이드. 비유한·음수는 0으로 clamp. */
  readonly weights?: Partial<FoundationCriterionWeights>;
  /** meta 없는(pending) foundation을 0점으로 포함할지. 기본 false(제외). */
  readonly includePending?: boolean;
  /** 결과에 criterion별 breakdown 부착 여부. 기본 false. */
  readonly explain?: boolean;
}

/** 스코어링 결과 1건. */
export interface FoundationSelectionResult {
  readonly slug: string;
  readonly entry: FoundationManifestEntry;
  /** [0,1] 정규화 점수. */
  readonly score: number;
  /** explain:true일 때만. 지정한 criterion 키만 담는다. */
  readonly breakdown?: Readonly<Partial<Record<keyof FoundationCriterionWeights, number>>>;
}

/** criterion 기본 가중치. */
export const DEFAULT_FOUNDATION_WEIGHTS: FoundationCriterionWeights = {
  colorScheme: 1,
  domains: 1,
  tags: 0.75,
  mood: 0.75,
};

type CriterionKey = keyof FoundationCriterionWeights;
const CRITERION_KEYS: readonly CriterionKey[] = ['colorScheme', 'domains', 'tags', 'mood'];
const MOOD_AXES: readonly (keyof StyleMood)[] = [
  'formality',
  'energy',
  'warmth',
  'density',
  'ornament',
];

/** 요청 집합에 대한 recall = |요청 ∩ 보유| / |요청|. 요청 빈 배열은 호출 전에 걸러진다. */
function recall(requested: readonly string[], owned: readonly string[] | undefined): number {
  const have = new Set(owned ?? []);
  let hit = 0;
  for (const r of requested) if (have.has(r)) hit += 1;
  return hit / requested.length;
}

/** 무드 근접: 지정 축만 |요청-보유|/4 정규화 후 1-평균거리(0~1). */
function moodProximity(mood: Partial<StyleMood>, owned: StyleMood): number {
  const keys = MOOD_AXES.filter((k) => mood[k] != null);
  if (keys.length === 0) return 0;
  let acc = 0;
  for (const k of keys) acc += Math.abs((mood[k] as number) - owned[k]) / 4;
  return 1 - acc / keys.length;
}

function isSpecified(key: CriterionKey, c: FoundationSelectionCriteria): boolean {
  switch (key) {
    case 'colorScheme':
      return c.colorScheme != null;
    case 'domains':
      return (c.domains?.length ?? 0) > 0;
    case 'tags':
      return (c.tags?.length ?? 0) > 0;
    case 'mood':
      return c.mood != null && MOOD_AXES.some((k) => c.mood?.[k] != null);
  }
}

function partialScores(
  entry: FoundationManifestEntry,
  c: FoundationSelectionCriteria,
  specified: readonly CriterionKey[],
): Partial<Record<CriterionKey, number>> {
  const meta = entry.meta!;
  const out: Partial<Record<CriterionKey, number>> = {};
  for (const key of specified) {
    switch (key) {
      case 'colorScheme':
        out.colorScheme = entry.colorScheme === c.colorScheme ? 1 : 0;
        break;
      case 'domains':
        out.domains = recall(c.domains!, meta.domains);
        break;
      case 'tags':
        out.tags = recall(c.tags!, meta.tags);
        break;
      case 'mood':
        out.mood = moodProximity(c.mood!, meta.mood);
        break;
    }
  }
  return out;
}

function sanitizeWeight(w: number | undefined, fallback: number): number {
  const v = w ?? fallback;
  return Number.isFinite(v) && v > 0 ? v : 0;
}

/**
 * criteria로 매니페스트를 스코어링·랭킹해 상위 N을 반환한다(결정적).
 * 정렬: score↓ → slug↑. pending(meta 없음)은 includePending일 때만 0점으로 뒤에 append.
 */
export function selectFoundations(
  manifest: readonly FoundationManifestEntry[],
  criteria: FoundationSelectionCriteria = {},
): FoundationSelectionResult[] {
  const specified = CRITERION_KEYS.filter((k) => isSpecified(k, criteria));
  const weights: Record<CriterionKey, number> = {} as Record<CriterionKey, number>;
  for (const k of CRITERION_KEYS) {
    weights[k] = sanitizeWeight(criteria.weights?.[k], DEFAULT_FOUNDATION_WEIGHTS[k]);
  }
  const totalW = specified.reduce((acc, k) => acc + weights[k], 0);

  const scored: FoundationSelectionResult[] = [];
  const pending: FoundationSelectionResult[] = [];

  for (const entry of manifest) {
    if (!entry.meta) {
      if (criteria.includePending) pending.push({ slug: entry.slug, entry, score: 0 });
      continue;
    }
    const parts = partialScores(entry, criteria, specified);
    let score: number;
    if (specified.length === 0 || totalW === 0) {
      score = 1; // 지정 criterion 없음 → 중립 1점(안정 정렬).
    } else {
      const acc = specified.reduce((s, k) => s + weights[k] * (parts[k] ?? 0), 0);
      score = acc / totalW;
    }
    const result: FoundationSelectionResult = criteria.explain
      ? { slug: entry.slug, entry, score, breakdown: parts }
      : { slug: entry.slug, entry, score };
    scored.push(result);
  }

  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
  });
  pending.sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  const ordered = scored.concat(pending);

  const rawLimit = criteria.limit ?? 5;
  const limit = Number.isFinite(rawLimit) ? Math.max(0, Math.floor(rawLimit)) : ordered.length;
  return ordered.slice(0, limit);
}
