/**
 * Visualization(다이어그램/인포그래픽) 디자인 시스템의 토큰 레이어.
 * core의 StyleGuideTokens/FoundationPreset(types.ts)과 동형 구조를 가지되,
 * foundation의 시맨틱이 UI 컴포넌트가 아니라 시각화(canvas/palette/node/edge)다.
 * React 의존 없음 — VisualizationStyleGuide(React 레이어)는 visualization 패키지에 있다.
 */

import type { StyleGuideMeta } from './styleGuideMeta';

/** 시각화 노드의 시맨틱 종류. 스타일 가이드가 종류별 paint를 결정한다. */
export type VizNodeSemanticKind =
  | 'person'
  | 'external'
  | 'container'
  | 'database'
  | 'queue'
  | 'decision'
  | 'process';

/**
 * 시맨틱 노드 종류 하나의 paint 스펙. 노드 위 글자색은 여기 두지 않는다 — `fill` 면마다 계산한
 * `--bbangto-viz-on-node-*` 를 쓰고, 정하려면 `VisualizationFoundation.on.node` 에 적는다.
 */
export interface VizNodeSemanticStyle {
  fill: string;
  keyline: string;
  keylineWidth: number;
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
    /** 격자 한 칸(px). `GridLayer` 의 기본 간격이다 — `gridUnit` prop 이 덮는다. */
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
    /**
     * 연결선의 기본 대시(SVG `stroke-dasharray` 값, 예: `'4 4'`). 빈 문자열은 실선이다.
     * 계약 스타일시트가 연결선(`Edge` 와 템플릿이 직접 그린 관계선)에만 건다 — 축선·눈금처럼 같은 edge 채널을 쓰는
     * 구조선은 실선으로 남는다. UML·BPMN 같은 표준 표기법 템플릿의 연결선도 이 값을 따르지 않는다(표기법에서
     * 실선과 대시가 서로 다른 관계를 뜻한다. 선 모양을 정하지 않는 C4 는 따른다). `Edge` 의 `strokeDasharray` prop 이 이 값을 덮는다.
     */
    readonly dashPattern: string;
    readonly cornerRadius: number;
    readonly marker: {
      /** 화살촉 크기(px). `Canvas` 가 그리는 마커의 기본 크기다 — `Canvas` 의 `markerSize` prop 이 덮는다. */
      readonly size: number;
      readonly arrow: string;
      readonly diamond: string;
      readonly circle: string;
      readonly cross: string;
    };
  };

  /**
   * C4 상자(`C4Box`)의 수준별 면과 테두리. `borderWidth` 는 테두리 두께, `bgTint` 는 면 색이다.
   * 상자 위 글자색은 여기 두지 않는다 — `bgTint` 면마다 계산한 `--bbangto-viz-on-c4-*` 를 쓰고, 정하려면 `on.c4` 에 적는다.
   */
  readonly c4: {
    readonly l1: { readonly borderWidth: number; readonly bgTint: string };
    readonly l2: { readonly borderWidth: number; readonly bgTint: string };
    readonly l3: { readonly borderWidth: number; readonly bgTint: string };
  };

  /**
   * 경계(`Boundary`)의 선과 라벨. 두께·대시·모서리 반지름은 `Boundary` 의 기본값이고 `strokeWidth`·`dashPattern`·`radius`
   * prop 이 덮는다. 대시는 계약 스타일시트가 건다(빈 문자열은 실선). 경계는 관계선이 아니라 표준 표기 템플릿 안에서도 이 값을 따른다.
   */
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
    /**
     * 라벨류(경계·레인·엣지 라벨·태그 등) 기본 서체. 선택 필드다.
     * 지정하면 라벨 문자열의 스크립트와 무관하게 이 서체를 쓰고, 지정하지 않으면
     * 비ASCII 라벨은 `titleFont`, 라틴 라벨은 `monoFont`로 해석한다
     * (`@centurio1987/bbangto-ui-visualization`의 `resolveLabelFont`).
     * 기존 스타일가이드를 깨지 않으려 required가 아니라 optional로 둔다.
     */
    readonly labelFont?: string;
  };

  /**
   * 면 위 글자색. 선택 필드다.
   * 면 토큰(팔레트·shape.fill·canvas.bg·c4 bgTint·node fill)마다 그 위에 쓸 글자색을
   * `--bbangto-viz-on-*` CSS 변수로 낸다(예: `palette.p1` 위 글자 → `--bbangto-viz-on-palette-p1`).
   * 적지 않은 자리는 visualization 패키지가 계산한다. 가이드 글자색 넷(`edge.stroke` →
   * `shape.stroke` → `boundary.labelColor` → `canvas.bg`) 중 처음으로 면과 4.5:1 을 넘는 것을
   * 쓰고, 넘는 것이 없으면 검정·흰색 중 대비가 큰 쪽을 쓴다. 반투명 면(알파 < 1 · `none`)은 `canvas.bg` 위에
   * 합성한 면과, 거기에 검정 5%(레인 띠 정도의 음영)를 얹은 면 두 곳에서 모두 넘는 색을 고른다. 두 곳을 다
   * 넘는 색이 없으면 `canvas.bg` 위 면에서 대비가 큰 검정·흰색이다.
   * 면마다 적은 값은 계산값을 이긴다 — 대비는 적은 쪽이 책임진다.
   *
   * `ink` 는 가이드가 바라는 글자색 하나다(KAN-075). 계산 후보 넷보다 먼저 보고, 면 위에서 4.5:1 을 넘으면
   * (반투명 면은 위 두 곳 모두에서) 그 색을 쓰고 못 넘으면 계산 후보로 넘어간다. 그래서 대비는 계산이 지킨다.
   * 우선순위는 면마다 적은 값 → `ink` → 계산 후보 넷이다. 지침 문장이 「라벨은 크림」처럼 글자색을 이름으로
   * 정한 가이드가 쓴다 — 연결선 색이 먼저 뽑혀 문장이 금지한 색이 칠해지는 것을 막는다. 카탈로그 가이드라면
   * 그 문장과 색을 `textInk.test.ts` 의 표에도 넣는다(기계는 문장을 못 읽어 표 밖은 못 잡는다).
   */
  readonly on?: {
    readonly ink?: string;
    readonly palette?: Partial<Record<'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8', string>>;
    readonly shape?: { readonly fill?: string };
    readonly canvas?: { readonly bg?: string };
    readonly c4?: {
      readonly l1?: { readonly bgTint?: string };
      readonly l2?: { readonly bgTint?: string };
      readonly l3?: { readonly bgTint?: string };
    };
    readonly node?: Partial<Record<VizNodeSemanticKind, { readonly fill?: string }>>;
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
  /** 선택. AI 채택(adoption)용 기계가독 메타데이터. UI catalog와 공통 스키마. */
  readonly meta?: StyleGuideMeta;
}
