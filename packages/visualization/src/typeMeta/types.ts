/**
 * VizTypeMeta — visualization **유형(what) 축** 채택 메타데이터 레이어 (KAN-020).
 *
 * bbangto-ui를 소비하는 AI가 "어떤 상황에 어떤 시각화 컴포넌트(패턴/템플릿)를 쓸지"를 코드/문서 전수 검토
 * 없이 프로그래밍적으로 질의할 수 있도록, 각 유형의 "언제/무슨 데이터에 쓰는가"를 기계가독 형태로 선언한다.
 * 스타일(paint) 축의 `StyleGuideMeta`(tokens)를 **유형 축으로 미러링**한 것으로, 통제 어휘(const union)를
 * SSOT로 강제해 87 유형 저작 간 일관성을 유지한다.
 *
 * SSOT 계보: 사람용 문서 `visualization-type-inventory.md`(VT-### 90행)의 행별 "정의·대표용도·프리미티브·
 * 데이터형태"를 코드 메타로 승격한 것. registry가 코드 SSOT, `type.manifest.json`이 그 투영(파일 읽기용).
 * 전략은 `TYPE_METADATA_STRATEGY.md` 참고.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 통제 어휘 (controlled vocabulary) — const union = SSOT
// ─────────────────────────────────────────────────────────────────────────────

/** 유형 카테고리. inventory §5 대역 A~G를 기계 union으로 편입(1유형=1 primary 카테고리). */
export const VIZ_TYPE_CATEGORIES = [
  'engineering', //           A. 엔지니어링/소프트웨어 다이어그램 (VT-1xx)
  'process-flow', //          B. 프로세스·플로우 (VT-2xx)
  'hierarchy-relation', //    C. 계층·관계 (VT-3xx)
  'time', //                  D. 시간축 (VT-4xx)
  'data-chart', //            E. 데이터 차트 (VT-5xx)
  'infographic-editorial', // F. 인포그래픽/에디토리얼 레이아웃 (VT-6xx)
  'concept-framework', //     G. 개념 프레임워크 (VT-7xx)
] as const;
export type VizTypeCategory = (typeof VIZ_TYPE_CATEGORIES)[number];

export const VIZ_TYPE_CATEGORY_LABELS: Record<VizTypeCategory, string> = {
  engineering: 'A. 엔지니어링/소프트웨어',
  'process-flow': 'B. 프로세스·플로우',
  'hierarchy-relation': 'C. 계층·관계',
  time: 'D. 시간축',
  'data-chart': 'E. 데이터 차트',
  'infographic-editorial': 'F. 인포그래픽/에디토리얼',
  'concept-framework': 'G. 개념 프레임워크',
};

/**
 * 데이터 형태 — AI가 "가진 데이터가 무엇인가"로 후보를 좁히는 1차 축.
 * 차트형은 FT Visual Vocabulary 9범주를, 다이어그램/프레임워크형은 구조 형태를 편입한다.
 */
export const VIZ_DATA_SHAPES = [
  // FT Visual Vocabulary (차트)
  'magnitude', //        크기/양 비교
  'ranking', //          순위
  'part-to-whole', //    구성비
  'change-over-time', // 시계열 변화
  'correlation', //      상관
  'distribution', //     분포
  'flow', //             흐름/이동량
  'spatial', //          공간/지리
  'deviation', //        기준 대비 편차
  // 구조형 (다이어그램/프레임워크)
  'hierarchy', //        계층/트리
  'network', //          관계망(비계층)
  'process', //          절차/공정
  'temporal', //         시간순 이벤트/상호작용
  'comparison', //       항목 대비
  'relationship', //     엔터티 관계 구조
  'concept', //          개념/프레임워크 정리
] as const;
export type VizDataShape = (typeof VIZ_DATA_SHAPES)[number];

/**
 * 구조 프리미티브 — inventory "프리미티브" 컬럼을 통제 union으로 편입.
 * 유형이 어떤 원자 구성으로 렌더되는지(교차 검색·유사 유형 발견용).
 */
export const VIZ_PRIMITIVES = [
  'node',
  'edge',
  'lane',
  'axis',
  'radial',
  'grid',
  'area',
  'tree',
  'band',
  'leader',
  'mockup',
  'geo',
  'icon-unit',
  'port',
  'lifeline',
  'boundary',
] as const;
export type VizPrimitive = (typeof VIZ_PRIMITIVES)[number];

/**
 * 통제 태그 — 카테고리/데이터형태 외 부차 성격. inventory tags 컬럼을 정규화한 **고정 union**.
 * 확장은 이 union 편집으로만(컴파일 게이트) — free string 금지(스타일 축 TAGS와 동형 정책).
 */
export const VIZ_TYPE_TAGS = [
  'chart',
  'framework',
  'infographic',
  'diagram',
  'standard', //  사양/표준(UML·C4·BPMN 등) 유래
  'time',
  'geo',
  'radial',
  'matrix',
  'editorial',
] as const;
export type VizTypeTag = (typeof VIZ_TYPE_TAGS)[number];

// ─────────────────────────────────────────────────────────────────────────────
// 메타 / 레지스트리 엔트리
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 유형 채택 메타데이터. **저작 필드**(의도)만 담는다.
 * `metaStatus`/`completeness` 같은 파생값은 저작하지 않고 매니페스트 생성기가 계산한다.
 */
export interface VizTypeMeta {
  /** primary 카테고리(단일). */
  readonly category: VizTypeCategory;
  /** 한 줄 정의(inventory "한 줄 정의" 컬럼). */
  readonly summary: string;
  /** 가진 데이터 형태(복수). */
  readonly dataShape: readonly VizDataShape[];
  /** 구조 프리미티브(복수). */
  readonly primitives: readonly VizPrimitive[];
  /** 별칭(복수). */
  readonly aliases: readonly string[];
  /** 적합 시나리오 — LLM용 근거. 짧은 명령형 문장 ≤5개(렌더 형태·variant도 여기 명시). */
  readonly useWhen: readonly string[];
  /** 안티패턴/데이터 불일치 — LLM용 근거. 짧은 명령형 문장 ≤5개. */
  readonly avoidWhen: readonly string[];
  /** 카탈로그 우선순위(inventory P 컬럼; ✅ 구현분은 대개 생략). */
  readonly priority?: 'P1' | 'P2' | 'P3';
  /** 통제 태그(복수). */
  readonly tags: readonly VizTypeTag[];
  /** 관련/대체 유형의 VT id(복수). 생성기가 존재·self-ref·중복을 검증. */
  readonly related?: readonly string[];
}

/**
 * 레지스트리 1행 = 채택된 VT 유형 하나. `id/name/exportNames/kind`는 항상 존재하는 **슬롯 정체성**,
 * `meta`는 저작된 경우에만 붙는 rich 레이어(파일럿만; 나머지는 pending).
 * `exportNames`는 실제 배럴 export 문자열(≥1) — 컴포넌트를 import하지 않는다(순수 데이터).
 */
export interface VizTypeRegistryEntry {
  /** inventory SSOT id — 'VT-101' 형식. */
  readonly id: string;
  /** canonical 유형명. */
  readonly name: string;
  /** 이 유형을 렌더하는 실제 배럴 export(≥1). 다-export 유형은 복수. */
  readonly exportNames: readonly string[];
  /** 코드 위계. */
  readonly kind: 'template' | 'pattern';
  /** 모드 힌트 — 1 export가 여러 VT/모드를 담당할 때(예: Cycle → 'flywheel'). */
  readonly variant?: string;
  /** 저작된 채택 메타(파일럿만). */
  readonly meta?: VizTypeMeta;
}
