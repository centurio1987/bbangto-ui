/**
 * selectVizTypes — 유형 축 채택 메타(`VizTypeMeta`) 기반 유형 스코어링·랭킹 helper (KAN-020).
 *
 * style-guide-catalog/select.ts를 유형 축으로 미러링. AI 소비자가 dataShape/category/primitives/tags/priority로
 * 후보를 좁혀 상위 N shortlist를 받고, 각 후보의 useWhen/avoidWhen으로 최종 판단한다(역할 분리).
 *
 * 스코어링 = soft-weighted(기본 `match: 'any'`): 지정한 criterion만 가중 합산해 [0,1] 정규화 → 상위 N.
 * criteria 불일치로 항목이 탈락하지 않으므로 meta 있는 유형은 항상 후보에 남는다(shortlist 붕괴 방지).
 *
 * **`'any'`의 함정(상류 리포트 I4).** soft-weighted 합산은 **criterion을 더할수록 정답이 내려갈 수 있다** —
 * 새 축을 지정하면 그 축에 해당하지 않는 후보도 분모만 늘어난 채 남고, 축별 가중치 차이 때문에
 * "한 축을 완전히 만족한 후보"끼리도 순위가 갈린다(예: `dataShape`(1) 매치가 `tags`(0.75) 매치를 이긴다).
 * 실제로 `{dataShape:['relationship'], tags:['matrix']}`는 격자 유형을 20위권 아래로 밀어냈다.
 * **"지정한 축을 전부 만족하는 것만"이 의도라면 `match: 'all'`을 쓴다** — 결과가 비면 "그런 유형은 없다"가 답이다.
 *
 * 동점 처리도 같은 이유로 보강했다: `score↓ → 매칭 축 수↓ → precision↓ → priority↑ → id↑`.
 * precision은 "후보가 선언한 값 중 요청과 겹치는 비율"이라, 축을 넓게 선언한 유형이 recall만으로
 * 앞서던 편향을 상쇄한다(id 오름차순 tie-break가 VT-1xx를 구조적으로 앞세우던 문제, 리포트 I4 재현 2).
 */
import type {
  VizTypeMeta,
  VizTypeRegistryEntry,
  VizTypeCategory,
  VizDataShape,
  VizPrimitive,
  VizTypeTag,
  VizStructuralTrait,
} from './types';

/** priority 리터럴('P1'|'P2'|'P3'). */
type Priority = NonNullable<VizTypeMeta['priority']>;

/** criterion별 가중치. 지정 criterion만 스코어에 기여한다. */
export interface VizCriterionWeights {
  readonly category: number;
  readonly priority: number;
  readonly dataShape: number;
  readonly structuralTraits: number;
  readonly primitives: number;
  readonly tags: number;
}

/** 지정 criterion 결합 방식. */
export type VizTypeMatchMode =
  /** 기본. soft-weighted 합산 — 불일치로 탈락하지 않는다(shortlist 비붕괴). */
  | 'any'
  /** 하드 필터 — 지정한 criterion **전부**에서 부분점수>0인 후보만 남긴다. 결과가 빌 수 있다. */
  | 'all';

/** 스코어링 입력 criteria. 지정한 필드만 랭킹에 반영된다. */
export interface VizTypeSelectionCriteria {
  readonly category?: VizTypeCategory | readonly VizTypeCategory[];
  readonly priority?: Priority | readonly Priority[];
  readonly dataShape?: readonly VizDataShape[];
  /** 구조 술어(분기·순환·계층 등). `dataShape`와 직교하므로 함께 지정할수록 판별력이 커진다. */
  readonly structuralTraits?: readonly VizStructuralTrait[];
  readonly primitives?: readonly VizPrimitive[];
  readonly tags?: readonly VizTypeTag[];
  /**
   * 지정 criterion 결합 방식(기본 `'any'`). `'all'`은 하드 필터라 meta 없는 pending은 항상 제외된다
   * (`includePending`보다 우선). 구체적으로 물었는데 답이 아래로 밀린다면 이 옵션이다.
   */
  readonly match?: VizTypeMatchMode;
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
  /** [0,1] 정규화 점수(= 가중 recall). */
  readonly score: number;
  /** explain:true일 때만. 지정한 criterion 키만 담는다(미지정 키 생략). */
  readonly breakdown?: Readonly<Partial<Record<keyof VizCriterionWeights, number>>>;
  /** explain:true일 때만. 부분점수>0인 지정 축의 개수(= 얼마나 많은 축을 실제로 만족했나). */
  readonly matchedCriteria?: number;
  /** explain:true일 때만. 가중 precision — 후보가 선언한 값 중 요청과 겹치는 비율. */
  readonly precision?: number;
}

/** criterion 기본 가중치. */
export const DEFAULT_VIZ_WEIGHTS: VizCriterionWeights = {
  category: 1,
  priority: 0.5,
  dataShape: 1,
  structuralTraits: 1,
  primitives: 0.75,
  tags: 0.75,
};

type CriterionKey = keyof VizCriterionWeights;
const CRITERION_KEYS: readonly CriterionKey[] = [
  'category',
  'priority',
  'dataShape',
  'structuralTraits',
  'primitives',
  'tags',
];

const PRIORITY_RANK: Record<Priority, number> = { P1: 0, P2: 1, P3: 2 };

function asArray<V>(v: V | readonly V[] | undefined): readonly V[] {
  return v == null ? [] : Array.isArray(v) ? v : ([v] as readonly V[]);
}

/** 요청 집합에 대한 recall = |요청 ∩ 보유| / |요청|. 요청 빈 배열은 호출 전에 걸러진다. */
function recall(requested: readonly string[], owned: readonly string[] | undefined): number {
  return intersect(requested, owned) / requested.length;
}

/**
 * 보유 집합에 대한 precision = |요청 ∩ 보유| / |보유|.
 * "후보가 선언한 값 중 요청과 겹치는 비율" — 축을 넓게 선언한 유형이 recall만으로 앞서는 편향을 상쇄한다.
 * 보유가 비면(선언 없음) 0.
 */
function precisionOf(requested: readonly string[], owned: readonly string[] | undefined): number {
  const n = owned?.length ?? 0;
  return n === 0 ? 0 : intersect(requested, owned) / n;
}

function intersect(requested: readonly string[], owned: readonly string[] | undefined): number {
  const have = new Set(owned ?? []);
  let hit = 0;
  for (const r of requested) if (have.has(r)) hit += 1;
  return hit;
}

/** criterion 하나에 대한 (recall, precision) 쌍. 스칼라 축은 보유가 1개라 둘이 같다. */
type CriterionScore = { readonly recall: number; readonly precision: number };

function scoreCriterion(
  key: CriterionKey,
  meta: VizTypeMeta,
  criteria: VizTypeSelectionCriteria,
): CriterionScore {
  switch (key) {
    case 'category': {
      const hit = asArray(criteria.category).includes(meta.category) ? 1 : 0;
      return { recall: hit, precision: hit };
    }
    case 'priority': {
      const hit =
        meta.priority != null && asArray(criteria.priority).includes(meta.priority) ? 1 : 0;
      return { recall: hit, precision: hit };
    }
    case 'dataShape':
      return {
        recall: recall(criteria.dataShape!, meta.dataShape),
        precision: precisionOf(criteria.dataShape!, meta.dataShape),
      };
    case 'structuralTraits':
      return {
        recall: recall(criteria.structuralTraits!, meta.structuralTraits),
        precision: precisionOf(criteria.structuralTraits!, meta.structuralTraits),
      };
    case 'primitives':
      return {
        recall: recall(criteria.primitives!, meta.primitives),
        precision: precisionOf(criteria.primitives!, meta.primitives),
      };
    case 'tags':
      return {
        recall: recall(criteria.tags!, meta.tags),
        precision: precisionOf(criteria.tags!, meta.tags),
      };
  }
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
    case 'structuralTraits':
      return (criteria.structuralTraits?.length ?? 0) > 0;
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
 *
 * 정렬: `score↓ → 매칭 축 수↓ → precision↓ → priority(P1<P2<P3, 없으면 뒤)↑ → id↑`.
 * 마지막 tie-break가 여전히 `id`라 결과는 완전히 결정적이다.
 *
 * @example 구체적으로 묻기 — 지정한 축을 전부 만족하는 유형만
 * ```ts
 * selectVizTypes(vizTypeRegistry, {
 *   dataShape: ['process'],
 *   structuralTraits: ['branching'],   // 분기가 있다 → Flowchart ○ / ProcessSteps ×
 *   match: 'all',
 * });
 * ```
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
  const hardFilter = criteria.match === 'all' && specified.length > 0;

  interface Ranked extends VizTypeSelectionResult {
    readonly _matched: number;
    readonly _precision: number;
  }
  const scored: Ranked[] = [];
  const pending: VizTypeSelectionResult[] = [];

  for (const entry of registry) {
    if (!entry.meta) {
      // 'all'은 하드 필터라 meta 없는 pending은 어떤 축도 만족할 수 없다 → includePending보다 우선한다.
      if (criteria.includePending && !hardFilter) pending.push({ id: entry.id, entry, score: 0 });
      continue;
    }
    const parts: Partial<Record<CriterionKey, number>> = {};
    let matched = 0;
    let precAcc = 0;
    for (const k of specified) {
      const s = scoreCriterion(k, entry.meta, criteria);
      parts[k] = s.recall;
      if (s.recall > 0) matched += 1;
      precAcc += weights[k] * s.precision;
    }
    if (hardFilter && matched < specified.length) continue;

    // 지정 criterion 없음 또는 가중치 합 0 → 중립 1점.
    let score: number;
    if (specified.length === 0 || totalW === 0) {
      score = 1;
    } else {
      const acc = specified.reduce((s, k) => s + weights[k] * (parts[k] ?? 0), 0);
      score = acc / totalW;
    }
    const precision = totalW === 0 ? 0 : precAcc / totalW;
    const base: VizTypeSelectionResult = criteria.explain
      ? { id: entry.id, entry, score, breakdown: parts, matchedCriteria: matched, precision }
      : { id: entry.id, entry, score };
    scored.push({ ...base, _matched: matched, _precision: precision });
  }

  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    if (a._matched !== b._matched) return b._matched - a._matched;
    if (a._precision !== b._precision) return b._precision - a._precision;
    const pr = priorityRank(a.entry.meta) - priorityRank(b.entry.meta);
    if (pr !== 0) return pr;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });

  // pending은 id 오름차순으로 뒤에 append(모두 0점).
  pending.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const ordered: VizTypeSelectionResult[] = scored
    .map(({ _matched, _precision, ...rest }) => {
      void _matched;
      void _precision;
      return rest;
    })
    .concat(pending);

  const rawLimit = criteria.limit ?? 5;
  const limit = Number.isFinite(rawLimit) ? Math.max(0, Math.floor(rawLimit)) : ordered.length;
  return ordered.slice(0, limit);
}
