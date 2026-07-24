/**
 * StyleGuideMeta — style guide "채택(adoption)" 메타데이터 레이어.
 *
 * bbangto-ui를 소비하는 AI가 catalog에서 style guide를 **직접 코드 전수 검토 없이** 고를 수 있도록,
 * 각 style guide의 "언제/어디에 쓰는가"를 기계가독(machine-readable) 형태로 선언한다.
 * 통제 어휘(controlled vocabulary)를 const union으로 강제해 51종+ 저작 간 일관성을 유지한다.
 *
 * SSOT = 각 StyleGuide 객체의 `meta` 필드. 이를 `catalog.manifest.json`으로 투영해 AI가 파일
 * 하나만 읽고 후보를 좁힌다. 자세한 전략은 style-guide-catalog 패키지의 METADATA_STRATEGY.md 참고.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 통제 어휘 (controlled vocabulary) — const union = SSOT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * UI style guide 패밀리. `style-guide-catalog.md`의 "패밀리" 컬럼을 기계 union으로 편입.
 * viz 패밀리는 `style-classification.md`의 F1~F7을 채택.
 * `family`는 **단일 primary 분류자**이며, 혼합 스타일의 부차 성격은 `tags`가 담당한다.
 */
export const STYLE_FAMILIES = [
  // UI 패밀리 (style-guide-catalog.md)
  'structural-raw', //        구조/raw — 네오브루탈리즘 등 날것·각진 구조
  'depth-material', //        깊이/material — 글래스/뉴모피즘/클레이 등 물성·입체
  'flat-systematic', //       평면/체계 — 플랫·미니멀·그리드 체계
  'typographic-editorial', // 타이포/편집 — 타이포 주도·편집 레이아웃
  'nostalgia', //             노스탤지어 — Y2K/바포웨이브/레트로/리소 등 회고
  'expressive-energetic', //  표현/에너지 — 맥시멀·콜라주·카와이 등 고에너지
  'tech-dark', //             테크/다크 — 사이버펑크/터미널/글리치 등 다크 테크
  'refined-luxury', //        정제/럭셔리 — 아르데코/스칸디/다크럭스 등 절제·고급
  // viz 패밀리 (style-classification.md — F1~F7)
  'viz-editorial-accent', //     F1
  'viz-corporate-schematic', //  F2
  'viz-flat-pop', //             F3
  'viz-marker-sketchnote', //    F4
  'viz-ink-line-duotone', //     F5
  'viz-iso-colorblock', //       F6
  'viz-neon-gradient-dark', //   F7
  // viz 확장 패밀리 (KAN-019 §4-d — UI 카탈로그 트리아지 기반 P1 5종)
  'viz-swiss-systematic', //     Swiss_Systematic_01 (KAN-029)
  'viz-terminal-ascii', //       Terminal_Ascii_01 (KAN-030)
  'viz-bauhaus-geometric', //    Bauhaus_Geometric_01 (KAN-031)
  'viz-print-ink', //            Print/Ink family — Riso#32 · Halftone · Glitch 오정합 계열 (KAN-037)
  'viz-hud-telemetry', //        Hud_Telemetry_01 (KAN-033)
  'viz-soft-puffy', //           Soft/Puffy family — Neumorphic·Clay·Kawaii 소프트/퍼피 계열 (KAN-038)
] as const;
export type StyleFamily = (typeof STYLE_FAMILIES)[number];

/**
 * `StyleFamily` union → 사람용 라벨. 위 인라인 주석의 라벨을 기계가독 SSOT로 승격한 것.
 * UI는 `style-guide-catalog.md` 트렌드 표의 한국어 패밀리 라벨, viz는 F1~F7 코드.
 * (KAN-025 트렌드 표 자동생성이 소비 — 새 family 추가 시 이 Record가 컴파일에서 커버를 강제한다.)
 */
export const STYLE_FAMILY_LABELS: Record<StyleFamily, string> = {
  // UI
  'structural-raw': '구조/raw',
  'depth-material': '깊이/material',
  'flat-systematic': '평면/체계',
  'typographic-editorial': '타이포/편집',
  nostalgia: '노스탤지어',
  'expressive-energetic': '표현/에너지',
  'tech-dark': '테크/다크',
  'refined-luxury': '정제/럭셔리',
  // viz (F1~F7)
  'viz-editorial-accent': 'F1 Editorial Accent',
  'viz-corporate-schematic': 'F2 Corporate Schematic',
  'viz-flat-pop': 'F3 Flat Pop',
  'viz-marker-sketchnote': 'F4 Marker Sketchnote',
  'viz-ink-line-duotone': 'F5 Ink Line Duotone',
  'viz-iso-colorblock': 'F6 Iso Colorblock',
  'viz-neon-gradient-dark': 'F7 Neon Gradient Dark',
  // viz 확장 (KAN-019 §4-d)
  'viz-swiss-systematic': 'Swiss Systematic',
  'viz-terminal-ascii': 'Terminal ASCII',
  'viz-bauhaus-geometric': 'Bauhaus Geometric',
  'viz-print-ink': 'Print Ink',
  'viz-hud-telemetry': 'HUD Telemetry',
  'viz-soft-puffy': 'Soft Puffy',
};

/** 도메인/프로덕트 유형 적합성. AI가 "무엇을 만드는가"로 후보를 좁히는 1차 필터. */
export const DOMAINS = [
  'saas',
  'dev-tools',
  'fintech',
  'dashboard',
  'ecommerce',
  'marketing',
  'portfolio',
  'editorial',
  'blog',
  'docs',
  'landing',
  'gaming',
  'entertainment',
  'social',
  'kids',
  'education',
  'healthcare',
  'luxury',
  'creative-agency',
  'crypto-web3',
] as const;
export type Domain = (typeof DOMAINS)[number];

/** 통제 태그 어휘. family 외 부차 성격·시각 키워드. 복수 부여 가능. */
export const TAGS = [
  // 색/명도
  'dark',
  'light',
  'high-contrast',
  'muted',
  'vivid',
  'pastel',
  'monochrome',
  'neon',
  'gradient',
  // 형태/질감
  'sharp',
  'rounded',
  'geometric',
  'organic',
  'textured',
  'glossy',
  'flat',
  'depth',
  'glass',
  'grainy',
  // 타이포/레이아웃
  'typographic',
  'serif',
  'mono',
  'grid',
  'asymmetric',
  'dense',
  'airy',
  // 무드
  'playful',
  'serious',
  'minimal',
  'maximal',
  'retro',
  'futuristic',
  'luxurious',
  'raw',
  'technical',
  'hand-drawn',
  // 모션
  'animated',
  'kinetic',
  'static',
] as const;
export type Tag = (typeof TAGS)[number];

/** 시각 특성 — coarse enum. 정밀 hex/토큰 대신 "채택 판단에 충분한 조도"로 요약. */
export interface StyleCharacteristics {
  readonly cornerRadius: 'sharp' | 'soft' | 'round';
  readonly borderWeight: 'none' | 'thin' | 'bold';
  readonly shadow: 'none' | 'soft' | 'hard' | 'glow';
  readonly density: 'airy' | 'balanced' | 'dense';
  readonly motion: 'still' | 'subtle' | 'kinetic';
  readonly colorScheme: 'light' | 'dark' | 'both';
  readonly contrast: 'low' | 'medium' | 'high';
}

/**
 * 무드 축 — 1~5 순서형 척도. 앵커 예시는 METADATA_STRATEGY.md에 규정(저자별 편차 억제).
 * 예) formality 1=낙서/키치, 3=편집적, 5=기업/포멀.
 */
export interface StyleMood {
  /** 격식: 1 캐주얼/키치 ↔ 5 기업/포멀 */
  readonly formality: 1 | 2 | 3 | 4 | 5;
  /** 에너지: 1 차분/정적 ↔ 5 강렬/시끄러움 */
  readonly energy: 1 | 2 | 3 | 4 | 5;
  /** 온도감: 1 차가움 ↔ 5 따뜻함 */
  readonly warmth: 1 | 2 | 3 | 4 | 5;
  /** 밀도: 1 여백 넉넉 ↔ 5 조밀/꽉참 */
  readonly density: 1 | 2 | 3 | 4 | 5;
  /** 장식성: 1 미니멀 ↔ 5 맥시멀/장식적 */
  readonly ornament: 1 | 2 | 3 | 4 | 5;
}

/**
 * 접근성 자세 — **설계 의도(advisory)** 이지 측정된 WCAG 보장이 아니다.
 * 팔레트 토큰에서 실측 대비를 계산해 대조하는 자동 검증은 후속 카드로 분리한다.
 */
export interface StyleAccessibility {
  /** 대비 설계 의도(측정 보장 아님). */
  readonly contrastIntent: 'low' | 'aa' | 'aaa';
  /** 색각 이상 고려 여부(의도 선언). */
  readonly colorblindConsidered: boolean;
  /** 모션 사용이 많은가(설계 사실). prefers-reduced-motion 유의 대상. */
  readonly motionHeavy: boolean;
  /** 다크 우선 설계인가(설계 사실). */
  readonly darkFirst: boolean;
}

/**
 * 채택 메타데이터. **저작 필드**(의도)만 담는다.
 * `completeness`/`metaStatus` 같은 파생값은 저작하지 않고 매니페스트 생성기가 계산한다.
 */
export interface StyleGuideMeta {
  /** 표시명 (PascalCase_NN). catalog.md 표시명. */
  readonly displayName: string;
  /** catalog.md 트렌드 인덱스(#). */
  readonly trendIndex?: number;
  /** 단일 primary 패밀리. */
  readonly family: StyleFamily;
  /** 카탈로그 우선순위. */
  readonly priority?: 'P1' | 'P2' | 'P3';
  /** 핵심 모티프 한 줄 — 채택 관점(description보다 "언제 쓰나"에 가깝게). */
  readonly summary: string;
  /** 통제 태그(복수). */
  readonly tags: readonly Tag[];
  /** 무드 축(1~5). */
  readonly mood: StyleMood;
  /** 시각 특성(coarse enum). */
  readonly characteristics: StyleCharacteristics;
  /** 적합 도메인(복수). */
  readonly domains: readonly Domain[];
  /** 적합 시나리오 — LLM용 근거. 짧은 명령형 문장 ≤5개. */
  readonly useWhen: readonly string[];
  /** 안티패턴 — LLM용 근거. 짧은 명령형 문장 ≤5개. */
  readonly avoidWhen: readonly string[];
  /** 접근성 설계 의도(advisory). */
  readonly accessibility: StyleAccessibility;
  /** 대체/인접 style guide 슬러그(name). 생성기가 존재·중복·self-ref를 검증. */
  readonly related?: readonly string[];
}
