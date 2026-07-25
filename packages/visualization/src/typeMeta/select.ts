/**
 * selectVizTypes — 유형 축 채택 메타(`VizTypeMeta`) 기반 유형 스코어링·랭킹 helper (KAN-020).
 *
 * style-guide-catalog/select.ts를 유형 축으로 미러링. AI 소비자가 dataShape/category/primitives/tags/priority로
 * 후보를 좁혀 상위 N shortlist를 받고, 각 후보의 useWhen/avoidWhen으로 최종 판단한다(역할 분리).
 *
 * 스코어링 = soft-weighted(하드 필터 아님): 지정한 criterion만 가중 합산해 [0,1] 정규화 → 상위 N.
 * criteria 불일치로 항목이 탈락하지 않으므로 meta 있는 유형은 항상 후보에 남는다(shortlist 붕괴 방지).
 */
import type {
  VizTypeMeta,
  VizTypeRegistryEntry,
  VizTypeCategory,
  VizDataShape,
  VizPrimitive,
  VizTypeTag,
} from './types';

/** priority 리터럴('P1'|'P2'|'P3'). */
type Priority = NonNullable<VizTypeMeta['priority']>;

/** criterion별 가중치. 지정 criterion만 스코어에 기여한다. */
export interface VizCriterionWeights {
  readonly category: number;
  readonly priority: number;
  readonly dataShape: number;
  readonly primitives: number;
  readonly tags: number;
}

/** 스코어링 입력 criteria. 지정한 필드만 랭킹에 반영된다. */
export interface VizTypeSelectionCriteria {
  readonly category?: VizTypeCategory | readonly VizTypeCategory[];
  readonly priority?: Priority | readonly Priority[];
  readonly dataShape?: readonly VizDataShape[];
  readonly primitives?: readonly VizPrimitive[];
  readonly tags?: readonly VizTypeTag[];
  /** 반환 개수(기본 5). <0→0, 소수→floor, >레지스트리 크기→전체. */
  readonly limit?: number;
  /** criterion별 가중치 오버라이드(기본 DEFAULT_VIZ_WEIGHTS). 비유한·음수는 0으로 clamp. */
  readonly weights?: Partial<VizCriterionWeights>;
  /** meta 없는(pending) 유형을 0점으로 포함할지. 기본 false(제외). */
  readonly includePending?: boolean;
  /** 결과에 criterion별 breakdown 부착 여부. 기본 false. */
  readonly explain?: boolean;
}

/** 스코어링 결과 1건. */
export interface VizTypeSelectionResult {
  readonly id: string;
  /** 원본 엔트리 참조. */
  readonly entry: VizTypeRegistryEntry;
  /** [0,1] 정규화 점수. */
  readonly score: number;
  /** explain:true일 때만. 지정한 criterion 키만 담는다(미지정 키 생략). */
  readonly breakdown?: Readonly<Partial<Record<keyof VizCriterionWeights, number>>>;
}

/** criterion 기본 가중치. */
export const DEFAULT_VIZ_WEIGHTS: VizCriterionWeights = {
  category: 1,
  priority: 0.5,
  dataShape: 1,
  primitives: 0.75,
  tags: 0.75,
};

type CriterionKey = keyof VizCriterionWeights;
const CRITERION_KEYS: readonly CriterionKey[] = [
  'category',
  'priority',
  'dataShape',
  'primitives',
  'tags',
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

/** 지정한 criterion 목록 + criterion별 부분점수를 계산. */
function partialScores(
  meta: VizTypeMeta,
  criteria: VizTypeSelectionCriteria,
  specified: readonly CriterionKey[],
): Partial<Record<CriterionKey, number>> {
  const out: Partial<Record<CriterionKey, number>> = {};
  for (const key of specified) {
    switch (key) {
      case 'category': {
        const set = asArray(criteria.category);
        out.category = set.includes(meta.category) ? 1 : 0;
        break;
      }
      case 'priority': {
        const set = asArray(criteria.priority);
        out.priority = meta.priority != null && set.includes(meta.priority) ? 1 : 0;
        break;
      }
      case 'dataShape':
        out.dataShape = recall(criteria.dataShape!, meta.dataShape);
        break;
      case 'primitives':
        out.primitives = recall(criteria.primitives!, meta.primitives);
        break;
      case 'tags':
        out.tags = recall(criteria.tags!, meta.tags);
        break;
    }
  }
  return out;
}

/** criterion이 실제 제약을 담는지(빈 배열은 무제약으로 무시). */
function isSpecified(key: CriterionKey, criteria: VizTypeSelectionCriteria): boolean {
  switch (key) {
    case 'category':
      return asArray(criteria.category).length > 0;
    case 'priority':
      return asArray(criteria.priority).length > 0;
    case 'dataShape':
      return (criteria.dataShape?.length ?? 0) > 0;
    case 'primitives':
      return (criteria.primitives?.length ?? 0) > 0;
    case 'tags':
      return (criteria.tags?.length ?? 0) > 0;
  }
}

function sanitizeWeight(w: number | undefined, fallback: number): number {
  const v = w ?? fallback;
  return Number.isFinite(v) && v > 0 ? v : 0;
}

function priorityRank(meta: VizTypeMeta | undefined): number {
  const p = meta?.priority;
  return p != null ? PRIORITY_RANK[p] : 3;
}

/**
 * criteria로 레지스트리를 스코어링·랭킹해 상위 N을 반환한다(결정적).
 * 정렬: score↓ → priority(P1<P2<P3, 없으면 뒤)↑ → id↑.
 */
export function selectVizTypes(
  registry: readonly VizTypeRegistryEntry[],
  criteria: VizTypeSelectionCriteria = {},
): VizTypeSelectionResult[] {
  const specified = CRITERION_KEYS.filter((k) => isSpecified(k, criteria));
  const weights: Record<CriterionKey, number> = {} as Record<CriterionKey, number>;
  for (const k of CRITERION_KEYS) {
    weights[k] = sanitizeWeight(criteria.weights?.[k], DEFAULT_VIZ_WEIGHTS[k]);
  }
  const totalW = specified.reduce((acc, k) => acc + weights[k], 0);

  const scored: VizTypeSelectionResult[] = [];
  const pending: VizTypeSelectionResult[] = [];

  for (const entry of registry) {
    if (!entry.meta) {
      if (criteria.includePending) pending.push({ id: entry.id, entry, score: 0 });
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
    const result: VizTypeSelectionResult = criteria.explain
      ? { id: entry.id, entry, score, breakdown: parts }
      : { id: entry.id, entry, score };
    scored.push(result);
  }

  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    const pr = priorityRank(a.entry.meta) - priorityRank(b.entry.meta);
    if (pr !== 0) return pr;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });

  // pending은 id 오름차순으로 뒤에 append(모두 0점).
  pending.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const ordered = scored.concat(pending);

  const rawLimit = criteria.limit ?? 5;
  const limit = Number.isFinite(rawLimit) ? Math.max(0, Math.floor(rawLimit)) : ordered.length;
  return ordered.slice(0, limit);
}
