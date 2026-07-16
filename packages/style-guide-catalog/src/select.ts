/**
 * selectStyleGuides — 채택 메타데이터(`StyleGuideMeta`) 기반 style guide 스코어링·랭킹 helper.
 *
 * METADATA_STRATEGY.md §6 소비 흐름 2단계("domains/mood/tags/characteristics로 후보 필터·랭크")를
 * 순수 함수로 구현한다. AI 소비자는 상위 N shortlist를 받아 useWhen/avoidWhen으로 최종 판단한다
 * (역할 분리 §3). 입력은 `{name, meta?}` 최소 구조(duck-typing)라 UI StyleGuide·viz
 * VisualizationStyleGuide·ManifestEntry 모두에 generic하게 동작한다.
 *
 * 스코어링 = soft-weighted(하드 필터 아님): 지정한 criterion만 가중 합산해 [0,1] 정규화 → 상위 N.
 * criteria 불일치로 항목이 탈락하지 않으므로 meta 있는 항목은 항상 후보에 남는다(shortlist 붕괴 방지).
 */
import type {
  StyleGuideMeta,
  StyleFamily,
  Domain,
  Tag,
  StyleCharacteristics,
  StyleMood,
} from '@centurio1987/bbangto-ui-tokens';

/** priority 리터럴('P1'|'P2'|'P3'). */
type Priority = NonNullable<StyleGuideMeta['priority']>;

/** 스코어링 최소 입력. UI StyleGuide·viz StyleGuide·ManifestEntry가 모두 구조적으로 만족. */
export interface SelectableEntry {
  readonly name: string;
  readonly meta?: StyleGuideMeta;
}

/** mood 축(1~5 순서형) 제약: 숫자=ideal 목표, 객체=목표 band(min/max) 또는 ideal. */
export type MoodConstraint =
  | number
  | { readonly ideal?: number; readonly min?: number; readonly max?: number };

/** criterion별 가중치. 지정 criterion만 스코어에 기여한다. */
export interface CriterionWeights {
  readonly family: number;
  readonly priority: number;
  readonly domains: number;
  readonly tags: number;
  readonly characteristics: number;
  readonly mood: number;
}

/** 스코어링 입력 criteria. 지정한 필드만 랭킹에 반영된다. */
export interface StyleSelectionCriteria {
  readonly family?: StyleFamily | readonly StyleFamily[];
  readonly priority?: Priority | readonly Priority[];
  readonly domains?: readonly Domain[];
  readonly tags?: readonly Tag[];
  readonly characteristics?: Partial<StyleCharacteristics>;
  readonly mood?: Partial<Record<keyof StyleMood, MoodConstraint>>;
  /** 반환 개수(기본 5). <0→0, 소수→floor, >카탈로그 크기→전체. */
  readonly limit?: number;
  /** criterion별 가중치 오버라이드(기본 DEFAULT_WEIGHTS). 비유한·음수는 0으로 clamp. */
  readonly weights?: Partial<CriterionWeights>;
  /** meta 없는(pending) 항목을 0점으로 포함할지. 기본 false(제외). */
  readonly includePending?: boolean;
  /** 결과에 criterion별 breakdown 부착 여부. 기본 false. */
  readonly explain?: boolean;
}

/** 스코어링 결과 1건. */
export interface SelectionResult<T extends SelectableEntry = SelectableEntry> {
  readonly name: string;
  /** 원본 엔트리 참조(generic·ergonomic). */
  readonly entry: T;
  /** [0,1] 정규화 점수. */
  readonly score: number;
  /** explain:true일 때만. 지정한 criterion 키만 담는다(미지정 키 생략). */
  readonly breakdown?: Readonly<Partial<Record<keyof CriterionWeights, number>>>;
}

/** criterion 기본 가중치. */
export const DEFAULT_WEIGHTS: CriterionWeights = {
  family: 1,
  priority: 0.5,
  domains: 1,
  tags: 0.75,
  characteristics: 1,
  mood: 1,
};

type CriterionKey = keyof CriterionWeights;
const CRITERION_KEYS: readonly CriterionKey[] = [
  'family',
  'priority',
  'domains',
  'tags',
  'characteristics',
  'mood',
];

const PRIORITY_RANK: Record<Priority, number> = { P1: 0, P2: 1, P3: 2 };

function asArray<V>(v: V | readonly V[] | undefined): readonly V[] {
  return v == null ? [] : Array.isArray(v) ? v : ([v] as readonly V[]);
}

/** 요청 집합에 대한 recall = |요청 ∩ 보유| / |요청|. 요청 빈 배열은 호출 전에 걸러진다. */
function recall(requested: readonly string[], owned: readonly string[] | undefined): number {
  const have = new Set(owned ?? []);
  let hit = 0;
  for (const r of requested) if (have.has(r)) hit += 1;
  return hit / requested.length;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/** mood 한 축의 근접도 [0,1]. */
function moodAxisScore(actual: number, c: MoodConstraint): number {
  if (typeof c === 'number') return clamp01(1 - Math.abs(actual - c) / 4);
  if (c.ideal != null) return clamp01(1 - Math.abs(actual - c.ideal) / 4);
  const min = c.min ?? -Infinity;
  const max = c.max ?? Infinity;
  if (actual >= min && actual <= max) return 1;
  const overshoot = actual < min ? min - actual : actual - max;
  return clamp01(1 - overshoot / 4);
}

/** characteristics 한 필드 매치(colorScheme는 'both'가 light/dark 요청을 모두 만족). */
function charFieldScore(
  key: keyof StyleCharacteristics,
  requested: string,
  meta: StyleCharacteristics | undefined,
): number {
  const actual = meta?.[key];
  if (actual === requested) return 1;
  if (key === 'colorScheme' && actual === 'both' && (requested === 'light' || requested === 'dark')) {
    return 1;
  }
  return 0;
}

/** 지정한 criterion 목록 + criterion별 부분점수를 계산. */
function partialScores(
  meta: StyleGuideMeta,
  criteria: StyleSelectionCriteria,
  specified: readonly CriterionKey[],
): Partial<Record<CriterionKey, number>> {
  const out: Partial<Record<CriterionKey, number>> = {};
  for (const key of specified) {
    switch (key) {
      case 'family': {
        const set = asArray(criteria.family);
        out.family = set.includes(meta.family) ? 1 : 0;
        break;
      }
      case 'priority': {
        const set = asArray(criteria.priority);
        out.priority = meta.priority != null && set.includes(meta.priority) ? 1 : 0;
        break;
      }
      case 'domains':
        out.domains = recall(criteria.domains!, meta.domains);
        break;
      case 'tags':
        out.tags = recall(criteria.tags!, meta.tags);
        break;
      case 'characteristics': {
        const req = criteria.characteristics!;
        const keys = Object.keys(req) as (keyof StyleCharacteristics)[];
        const sum = keys.reduce(
          (acc, k) => acc + charFieldScore(k, req[k] as string, meta.characteristics),
          0,
        );
        out.characteristics = keys.length ? sum / keys.length : 0;
        break;
      }
      case 'mood': {
        const req = criteria.mood!;
        const axes = Object.keys(req) as (keyof StyleMood)[];
        const sum = axes.reduce(
          (acc, a) => acc + moodAxisScore(meta.mood[a], req[a] as MoodConstraint),
          0,
        );
        out.mood = axes.length ? sum / axes.length : 0;
        break;
      }
    }
  }
  return out;
}

/** criterion이 실제 제약을 담는지(빈 배열·빈 객체는 무제약으로 무시). */
function isSpecified(key: CriterionKey, criteria: StyleSelectionCriteria): boolean {
  switch (key) {
    case 'family':
      return asArray(criteria.family).length > 0;
    case 'priority':
      return asArray(criteria.priority).length > 0;
    case 'domains':
      return (criteria.domains?.length ?? 0) > 0;
    case 'tags':
      return (criteria.tags?.length ?? 0) > 0;
    case 'characteristics':
      return Object.keys(criteria.characteristics ?? {}).length > 0;
    case 'mood':
      return Object.keys(criteria.mood ?? {}).length > 0;
  }
}

function sanitizeWeight(w: number | undefined, fallback: number): number {
  const v = w ?? fallback;
  return Number.isFinite(v) && v > 0 ? v : 0;
}

function priorityRank(meta: StyleGuideMeta | undefined): number {
  const p = meta?.priority;
  return p != null ? PRIORITY_RANK[p] : 3;
}

/**
 * criteria로 카탈로그를 스코어링·랭킹해 상위 N을 반환한다(결정적).
 * 정렬: score↓ → priority(P1<P2<P3, 없으면 뒤)↑ → trendIndex↑(없으면 뒤) → name↑.
 */
export function selectStyleGuides<T extends SelectableEntry>(
  catalog: readonly T[],
  criteria: StyleSelectionCriteria = {},
): SelectionResult<T>[] {
  const specified = CRITERION_KEYS.filter((k) => isSpecified(k, criteria));
  const weights: Record<CriterionKey, number> = {} as Record<CriterionKey, number>;
  for (const k of CRITERION_KEYS) weights[k] = sanitizeWeight(criteria.weights?.[k], DEFAULT_WEIGHTS[k]);
  const totalW = specified.reduce((acc, k) => acc + weights[k], 0);

  const scored: SelectionResult<T>[] = [];
  const pending: SelectionResult<T>[] = [];

  for (const entry of catalog) {
    if (!entry.meta) {
      if (criteria.includePending) pending.push({ name: entry.name, entry, score: 0 });
      continue;
    }
    const parts = partialScores(entry.meta, criteria, specified);
    // 지정 criterion 없음 또는 가중치 합 0 → 중립 1점.
    let score: number;
    if (specified.length === 0 || totalW === 0) {
      score = 1;
    } else {
      const acc = specified.reduce((s, k) => s + weights[k] * (parts[k] ?? 0), 0);
      score = acc / totalW;
    }
    const result: SelectionResult<T> = criteria.explain
      ? { name: entry.name, entry, score, breakdown: parts }
      : { name: entry.name, entry, score };
    scored.push(result);
  }

  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    const pr = priorityRank(a.entry.meta) - priorityRank(b.entry.meta);
    if (pr !== 0) return pr;
    const ta = a.entry.meta?.trendIndex ?? Infinity;
    const tb = b.entry.meta?.trendIndex ?? Infinity;
    if (ta !== tb) return ta - tb;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  // pending은 name 오름차순으로 뒤에 append(모두 0점).
  pending.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const ordered = scored.concat(pending);

  const rawLimit = criteria.limit ?? 5;
  const limit = Number.isFinite(rawLimit) ? Math.max(0, Math.floor(rawLimit)) : ordered.length;
  return ordered.slice(0, limit);
}
