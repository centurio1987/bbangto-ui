import type {
  VisualizationFoundation,
  VizFoundationPreset,
} from '@centurio1987/bbangto-ui-tokens';
import {
  Node,
  Tag,
  EdgeLabel,
  vvar,
  type NodeProps,
  type TagProps,
  type EdgeLabelProps,
  type VisualizationStyleGuide,
  type VizWrapperComponents,
} from '@centurio1987/bbangto-ui-visualization';
import { makeVizShowcase } from './_showcase';

/**
 * Blueprint_Technical_01 — 기존 diagram 패키지의 blueprintTheme 시각 언어를
 * visualization 스타일 가이드로 승격한 preset. foundations 값은 blueprintTheme verbatim.
 */

const KEYLINE = '#111111';
const KEYLINE_WIDTH = 2.5;

const foundations: VisualizationFoundation = {
  name: 'blueprint-technical-01',

  canvas: {
    bg: '#F9F8F6',
    grid: '#E5E2DC',
    gridUnit: 8,
  },

  palette: {
    p1: '#EE7B4D',
    p2: '#C5B6EE',
    p3: '#F0C5DA',
    p4: '#E7E058',
    p5: '#A6C6E2',
    p6: '#87B79A',
    p7: '#A98C7E',
    p8: '#9CAFE7',
  },

  // 일반 도형 기본 paint — 구 Node atom 리터럴 기본값(white/#111111/2.5)과 동일(시각 무회귀).
  shape: {
    fill: '#FFFFFF',
    stroke: KEYLINE,
    strokeWidth: KEYLINE_WIDTH,
  },

  node: {
    person: { fill: '#C5B6EE', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'user' },
    external: { fill: '#EE7B4D', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, dashed: true, glyph: 'arrowOut' },
    container: { fill: '#87B79A', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'stackedRect' },
    database: { fill: '#A6C6E2', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'cylinder' },
    queue: { fill: '#E7E058', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'bars' },
    decision: { fill: '#F0C5DA', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'diamond' },
    process: { fill: '#9CAFE7', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'process' },
  },

  edge: {
    stroke: KEYLINE,
    width: 2.5,
    dashPattern: '',
    cornerRadius: 4,
    marker: {
      size: 8,
      arrow: KEYLINE,
      diamond: KEYLINE,
      circle: KEYLINE,
      cross: KEYLINE,
    },
  },

  c4: {
    l1: { borderWidth: 3, bgTint: 'rgba(0,0,0,0.04)', labelColor: KEYLINE },
    l2: { borderWidth: 2, bgTint: 'rgba(0,0,0,0.02)', labelColor: KEYLINE },
    l3: { borderWidth: 1.4, bgTint: 'transparent', labelColor: KEYLINE },
  },

  boundary: {
    stroke: KEYLINE,
    width: 1.5,
    dashPattern: '8 6',
    radius: 8,
    labelColor: '#555555',
  },

  typography: {
    titleFont: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 700,
    sizes: {
      title: '14px',
      label: '12px',
      tag: '10px',
      mono: '11px',
    },
  },

  iconStyle: 'fill',

  spacing: {
    nodePad: 12,
    laneGap: 24,
  },

  motion: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/** whiteprint — 잉크/종이를 반전한 딥 네이비 색 스킴(색 외 토큰은 base와 동일). */
const WHITE_INK = '#EAF1FF';

const whiteprintFoundations: VisualizationFoundation = {
  ...foundations,
  name: 'blueprint-technical-01-whiteprint',
  canvas: { ...foundations.canvas, bg: '#152238', grid: '#243550' },
  shape: { ...foundations.shape, stroke: WHITE_INK },
  node: Object.fromEntries(
    Object.entries(foundations.node).map(([kind, style]) => [
      kind,
      { ...style, keyline: WHITE_INK, tagColor: KEYLINE },
    ]),
  ) as VisualizationFoundation['node'],
  edge: {
    ...foundations.edge,
    stroke: WHITE_INK,
    marker: { ...foundations.edge.marker, arrow: WHITE_INK, diamond: WHITE_INK, circle: WHITE_INK, cross: WHITE_INK },
  },
  c4: {
    l1: { ...foundations.c4.l1, bgTint: 'rgba(255,255,255,0.06)', labelColor: WHITE_INK },
    l2: { ...foundations.c4.l2, bgTint: 'rgba(255,255,255,0.03)', labelColor: WHITE_INK },
    l3: { ...foundations.c4.l3, labelColor: WHITE_INK },
  },
  boundary: { ...foundations.boundary, stroke: WHITE_INK, labelColor: '#B9C6DE' },
};

const whiteprintExt: Record<string, string> = {
  '--bbangto-viz-ext-ghost': '#5C6E8E',
  '--bbangto-viz-ext-ghost-dash': '3 3',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  // 카탈로그 불변식: 첫 preset의 foundations는 base foundations와 동일 객체 참조.
  {
    key: 'default',
    label: 'Paper',
    foundations,
    extendedFoundations: {
      '--bbangto-viz-ext-ghost': '#8B857B',
      '--bbangto-viz-ext-ghost-dash': '3 3',
    },
  },
  {
    key: 'whiteprint',
    label: 'Whiteprint (Inverted Navy)',
    foundations: whiteprintFoundations,
    extendedFoundations: whiteprintExt,
  },
];

const extendedFoundations: Record<string, string> = {
  '--bbangto-viz-ext-ghost': '#8B857B',
  '--bbangto-viz-ext-ghost-dash': '3 3',
};

/** 제도(drafting) 고스트 — 본 도형 뒤에 점선 오프셋 윤곽을 겹쳐 청사진 인상을 만든다. */
function BlueprintNode(props: NodeProps) {
  return (
    <>
      <Node
        {...props}
        id={undefined}
        x={props.x + 4}
        y={props.y + 4}
        fill="none"
        stroke={vvar('ext', 'ghost')}
        strokeWidth={1}
        strokeDasharray="3 3"
        data-viz-wrapper-ghost=""
      />
      <Node {...props} />
    </>
  );
}
BlueprintNode.displayName = 'BlueprintNode';

function BlueprintTag(props: TagProps) {
  return <Tag {...props} label={`[${props.label.toUpperCase()}]`} />;
}
BlueprintTag.displayName = 'BlueprintTag';

function BlueprintEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'grid')} />;
}
BlueprintEdgeLabel.displayName = 'BlueprintEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: BlueprintNode,
  Tag: BlueprintTag,
  EdgeLabel: BlueprintEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'BlueprintTechnicalShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary: '따뜻한 종이 캔버스 위 굵은 2.5px keyline. 면은 파스텔 시맨틱 채움.',
    dos: ['시맨틱 kind별 파스텔 fill 사용', '8px 그리드 단위 정렬', 'mono 폰트 태그 [type] 표기'],
    donts: ['그라디언트/광택 금지', 'keyline 두께 임의 변경 금지'],
  },
  color: {
    summary: '잉크(#111111) 단일 스트로크 + p1~p8 파스텔 팔레트.',
    dos: ['잉크는 스트로크·텍스트 전용', '팔레트는 시맨틱 kind 구분 전용'],
    donts: ['잉크를 면 채움으로 사용 금지', '팔레트 색을 텍스트에 사용 금지'],
  },
  typography: {
    summary: 'Helvetica 제목 + JetBrains Mono 태그/수치.',
    dos: ['태그·수치·기간은 mono', '제목은 700 이상'],
    donts: ['본문 크기 11px 미만 금지'],
  },
  accessibility: {
    summary: '비텍스트 요소 3:1, 텍스트 4.5:1 대비 준수.',
    dos: ['라벨-캔버스 대비 4.5:1 이상 유지', '값 인코딩(크기/아크)은 텍스트 병기'],
    donts: ['색 단독으로 의미 구분 금지', 'whiteprint에서 저대비 파스텔 텍스트 금지'],
  },
};

export const blueprintTechnical01VizStyleGuide: VisualizationStyleGuide = {
  name: 'blueprint-technical-01',
  description:
    'Precision drafting look — warm paper canvas, bold 2.5px keylines, pastel semantic fills, mono tags. Promoted from the original blueprint theme.',
  foundations,
  extendedFoundations,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { BlueprintTechnicalShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '정밀 제도(drafting) 모티프 — 굵은 잉크 keyline, 점선 고스트 오프셋, 종이 질감 캔버스, mono 태그.',
    components: {
      Node: {
        description: '본 도형 뒤에 3px 점선 고스트 윤곽이 겹쳐 설계 도면의 초안선을 연상시킨다.',
        specs: ['keyline 2.5px #111111', '고스트: +4,+4 오프셋, 1px dashed', 'radius 8px 이하'],
      },
      Tag: {
        description: '타입 태그는 대괄호 mono 대문자 — 도면 주기(annotation) 문법.',
        specs: ['[PERSON] 형식', 'JetBrains Mono 10px', '잉크 단색'],
      },
      EdgeLabel: {
        description: '연결선 라벨은 그리드 톤 배경 칩 위 mono 텍스트.',
        specs: ['bg = canvas.grid', 'mono 11px', '패딩 3px'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Blueprint_Technical_01',
    family: 'viz-corporate-schematic',
    summary:
      '따뜻한 종이 캔버스 위 굵은 잉크 keyline + 노드 종류별 파스텔 시맨틱 채움 + mono 태그의 정밀 제도(drafting)풍 아키텍처/플로우 다이어그램.',
    tags: ['light', 'pastel', 'flat', 'geometric', 'technical', 'mono', 'grid'],
    mood: { formality: 4, energy: 2, warmth: 3, density: 3, ornament: 2 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'bold',
      shadow: 'none',
      density: 'balanced',
      motion: 'subtle',
      colorScheme: 'both',
      contrast: 'high',
    },
    domains: ['dev-tools', 'docs', 'saas', 'dashboard', 'education'],
    useWhen: [
      '아키텍처·C4·UML·플로우 다이어그램을 정밀 제도(drafting)풍으로 그릴 때 쓴다.',
      '노드 종류(person·container·database 등)를 파스텔 시맨틱 색으로 구분하고 싶을 때 쓴다.',
      '기술 문서·개발자 도구에서 진지하고 또렷한 도식이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '고채도 플랫 팝·마케팅 인포그래픽처럼 강렬한 임팩트가 필요할 때 피한다.',
      '채움 없는 순수 라인 듀오톤 미니멀 도식이 목표일 때 피한다.',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['corporate-schematic-01', 'ink-line-duotone-01'],
  },
};
