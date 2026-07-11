/**
 * Visualization(다이어그램/인포그래픽) 디자인 시스템의 토큰 레이어.
 * core의 StyleGuideTokens/FoundationPreset(types.ts)과 동형 구조를 가지되,
 * foundation의 시맨틱이 UI 컴포넌트가 아니라 시각화(canvas/palette/node/edge)다.
 * React 의존 없음 — VisualizationStyleGuide(React 레이어)는 visualization 패키지에 있다.
 */

/** 시각화 노드의 시맨틱 종류. 스타일 가이드가 종류별 paint를 결정한다. */
export type VizNodeSemanticKind =
  | 'person'
  | 'external'
  | 'container'
  | 'database'
  | 'queue'
  | 'decision'
  | 'process';

/** 시맨틱 노드 종류 하나의 paint 스펙. */
export interface VizNodeSemanticStyle {
  fill: string;
  keyline: string;
  keylineWidth: number;
  tagColor: string;
  dashed?: boolean;
  glyph: string;
}

/**
 * Visualization foundation — 시각화 시스템의 디자인 토큰 전체.
 * `visualizationFoundationToStyleObject`로 --bbangto-viz-* CSS 변수로 평탄화된다.
 */
export interface VisualizationFoundation {
  readonly name: string;

  readonly canvas: {
    readonly bg: string;
    readonly grid: string;
    readonly gridUnit: number;
  };

  readonly palette: {
    readonly p1: string;
    readonly p2: string;
    readonly p3: string;
    readonly p4: string;
    readonly p5: string;
    readonly p6: string;
    readonly p7: string;
    readonly p8: string;
  };

  /** 시맨틱 kind가 지정되지 않은 일반 도형(Node atom 기본값)의 paint. 계약 스타일시트가 바인딩한다. */
  readonly shape: {
    readonly fill: string;
    readonly stroke: string;
    readonly strokeWidth: number;
  };

  readonly node: Record<VizNodeSemanticKind, VizNodeSemanticStyle>;

  readonly edge: {
    readonly stroke: string;
    readonly width: number;
    readonly dashPattern: string;
    readonly cornerRadius: number;
    readonly marker: {
      readonly size: number;
      readonly arrow: string;
      readonly diamond: string;
      readonly circle: string;
      readonly cross: string;
    };
  };

  readonly c4: {
    readonly l1: { readonly borderWidth: number; readonly bgTint: string; readonly labelColor: string };
    readonly l2: { readonly borderWidth: number; readonly bgTint: string; readonly labelColor: string };
    readonly l3: { readonly borderWidth: number; readonly bgTint: string; readonly labelColor: string };
  };

  readonly boundary: {
    readonly stroke: string;
    readonly width: number;
    readonly dashPattern: string;
    readonly radius: number;
    readonly labelColor: string;
  };

  readonly typography: {
    readonly titleFont: string;
    readonly monoFont: string;
    readonly titleWeight: number;
    readonly sizes: {
      readonly title: string;
      readonly label: string;
      readonly tag: string;
      readonly mono: string;
    };
  };

  readonly iconStyle: 'fill' | 'line';

  readonly spacing: {
    readonly nodePad: number;
    readonly laneGap: number;
  };

  readonly motion: {
    readonly duration: string;
    readonly easing: string;
  };
}

/**
 * 하나의 VisualizationStyleGuide(모티프) 위에서 기호선택 가능한 색 스킴 변형.
 * FoundationPreset(core)과 동형 — 모티프는 공유하고 foundation 색만 갈아끼운다.
 */
export interface VizFoundationPreset {
  /** 안정 id: 'default' | 'whiteprint' ... (data-bbangto-viz-foundation 값). */
  readonly key: string;
  /** 표시명. */
  readonly label: string;
  /** 이 preset의 완성된 visualization foundation. */
  readonly foundations: VisualizationFoundation;
  /** 선택. preset별 --bbangto-viz-ext-* 확장 CSS 변수. */
  readonly extendedFoundations?: Record<string, string>;
}

/**
 * VisualizationStyleGuide의 토큰 레이어. StyleGuideTokens(core용)와 동형 구조.
 * 첫 preset의 foundations는 base foundations와 동일 객체를 참조해 drift를 방지한다.
 */
export interface VisualizationStyleGuideTokens {
  readonly name: string;
  readonly description?: string;
  /** 필수. visualization foundation 토큰 (CSS 변수로 주입된다). */
  readonly foundations: VisualizationFoundation;
  /** 선택. visual motif 구현을 위한 확장 CSS 변수. --bbangto-viz-ext-* 네임스페이스 권장. */
  readonly extendedFoundations?: Record<string, string>;
  /** 선택. 기호선택 가능한 색 스킴 목록. 없으면 foundations 단일 사용. */
  readonly foundationPresets?: readonly VizFoundationPreset[];
  /** 선택. 기본 preset key. 미지정 시 foundationPresets[0].key. */
  readonly defaultFoundationKey?: string;
  /** 선택. 사용 가이드라인 (구조화 JSON). */
  readonly guidelines?: Record<string, Record<string, unknown>>;
}
