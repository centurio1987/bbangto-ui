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
import { makeVizColorway } from './_foundation';
import { makeVizShowcase } from './_showcase';

/**
 * Colorful_Flat_01 — 고채도 flat 다색 + 두꺼운 navy 아웃라인.
 * 근거: F3 Flat_Pop 배정 6장(style-classification.md — 구 "colorful 폴더 23장" 분류를 대체,
 * 아키타입 mermaid_colorful_07). 채운 도형 라벨은 잉크 단색(4.5:1 확보 위해 fill은 밝은 톤 보정).
 * 관측 6장 중 2장이 다크 그라운드(벤토/캔디 차트 UI) → bento-dark preset이 커버.
 */

const NAVY = '#1B2A4A';
const THICK = 3;

const node = (fill: string, glyph: string, dashed?: boolean) => ({
  fill,
  keyline: NAVY,
  keylineWidth: THICK,
  tagColor: NAVY,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'colorful-flat-01',

  canvas: {
    bg: '#FDF8F1',
    grid: '#F3E9DC',
    gridUnit: 8,
  },

  // 고채도 flat 팔레트 — ring/dot 등 외부 라벨 요소 전용(면 위 텍스트 없음).
  palette: {
    p1: '#E8443B',
    p2: '#F5B841',
    p3: '#1FB6A6',
    p4: '#3FBF6F',
    p5: '#D9418C',
    p6: '#6C3FBF',
    p7: '#F08A5B',
    p8: '#2E73B8',
  },

  shape: {
    fill: '#FFFFFF',
    stroke: NAVY,
    strokeWidth: THICK,
  },

  // navy 텍스트 4.5:1 확보를 위해 시맨틱 fill은 밝은 파스텔-스트롱 톤.
  node: {
    person: node('#F7C868', 'user'),
    external: node('#F4A97F', 'arrowOut', true),
    container: node('#9FE0BE', 'stackedRect'),
    database: node('#A3D4EE', 'cylinder'),
    queue: node('#F6E9A0', 'bars'),
    decision: node('#F5B8D0', 'diamond'),
    process: node('#B7C9F4', 'process'),
  },

  edge: {
    stroke: NAVY,
    width: THICK,
    dashPattern: '',
    cornerRadius: 8,
    marker: {
      size: 9,
      arrow: NAVY,
      diamond: NAVY,
      circle: NAVY,
      cross: NAVY,
    },
  },

  c4: {
    l1: { borderWidth: 3.5, bgTint: 'rgba(27,42,74,0.05)', labelColor: NAVY },
    l2: { borderWidth: 2.5, bgTint: 'rgba(27,42,74,0.03)', labelColor: NAVY },
    l3: { borderWidth: 1.8, bgTint: 'transparent', labelColor: NAVY },
  },

  boundary: {
    stroke: NAVY,
    width: 2,
    dashPattern: '10 6',
    radius: 12,
    labelColor: '#44547A',
  },

  typography: {
    titleFont: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 800,
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

/** candy — 마젠타/퍼플 듀오톤 colorway (관측: mermaid colorful_03 퍼플 듀오톤). */
const candyFoundations = makeVizColorway(foundations, {
  name: 'colorful-flat-01-candy',
  canvas: { bg: '#FBF3FA', grid: '#F0E2EF' },
  ink: '#3A2140',
  tagColor: '#3A2140',
  nodeFills: {
    person: '#F0C4EC',
    external: '#F5B8D0',
    container: '#D6C2F2',
    database: '#C4CDF6',
    queue: '#F6DFA8',
    decision: '#F4BBE0',
    process: '#CBB8F0',
  },
  palette: { p1: '#D9418C', p2: '#6C3FBF', p3: '#B0338F', p4: '#8A4FD8', p7: '#E06AAE', p8: '#5B3FA8' },
  boundaryLabelColor: '#5F4270',
  c4Tints: ['rgba(58,33,64,0.05)', 'rgba(58,33,64,0.03)', 'transparent'],
});

/**
 * bento-dark — 블랙 그라운드 + 피치/오렌지 램프 colorway
 * (관측: infographic_colorful_05 벤토 스탯 모자이크 — style-classification.md F3).
 * 램프 위 텍스트는 다크 브라운(#241505) 단일 잉크 — 전 kind 4.5:1 실측(6.49~12.11).
 */
const bentoDarkFoundations = makeVizColorway(foundations, {
  name: 'colorful-flat-01-bento-dark',
  canvas: { bg: '#121212', grid: '#242018' },
  ink: '#F4E8D8',
  tagColor: '#241505',
  shape: { fill: '#1E1912' },
  nodeFills: {
    person: '#E8823C',
    external: '#F2A65A',
    container: '#F5C77E',
    database: '#E8975A',
    queue: '#F7D08A',
    decision: '#EFA06B',
    process: '#F3B26B',
  },
  palette: { p1: '#E8823C', p2: '#F2A65A', p5: '#D9622A', p7: '#F5C77E', p8: '#3A2E20' },
  boundaryLabelColor: '#E8C9A8',
  c4Tints: ['rgba(244,232,216,0.06)', 'rgba(244,232,216,0.04)', 'transparent'],
});

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Warm Pop',
    foundations,
    extendedFoundations: { '--bbangto-viz-ext-offset-shadow': '#1B2A4A' },
  },
  {
    key: 'candy',
    label: 'Candy (Magenta/Purple)',
    foundations: candyFoundations,
    extendedFoundations: { '--bbangto-viz-ext-offset-shadow': '#3A2140' },
  },
  {
    key: 'bento-dark',
    label: 'Bento Dark (Black + Peach)',
    foundations: bentoDarkFoundations,
    extendedFoundations: { '--bbangto-viz-ext-offset-shadow': '#F4E8D8' },
  },
];

/** faux-3D 오프셋 솔리드 섀도 — 본 도형 뒤에 잉크색 오프셋 실루엣(관측: colorful_07). */
function ColorfulNode(props: NodeProps) {
  return (
    <>
      <Node
        {...props}
        id={undefined}
        x={props.x + 5}
        y={props.y + 5}
        fill={vvar('ext', 'offsetShadow')}
        stroke="none"
        strokeWidth={0}
        data-viz-wrapper-shadow=""
      />
      <Node {...props} />
    </>
  );
}
ColorfulNode.displayName = 'ColorfulNode';

function ColorfulTag(props: TagProps) {
  return <Tag {...props} label={props.label.toUpperCase()} fontSize={10} />;
}
ColorfulTag.displayName = 'ColorfulTag';

function ColorfulEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'grid')} padding={5} />;
}
ColorfulEdgeLabel.displayName = 'ColorfulEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: ColorfulNode,
  Tag: ColorfulTag,
  EdgeLabel: ColorfulEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'ColorfulFlatShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary: '크림 캔버스 위 두꺼운 navy 아웃라인 + 밝은 flat 채움. 오프셋 솔리드 섀도로 faux-3D.',
    dos: ['도형은 flat 단색 채움', '아웃라인 3px navy 유지', '오프셋 섀도는 잉크 단색'],
    donts: ['그라디언트/블러 섀도 금지', '아웃라인 없는 채움 도형 금지'],
  },
  color: {
    summary: '시맨틱 kind별 밝은 파스텔-스트롱 fill + 고채도 p1~p8(외부 라벨 요소 전용).',
    dos: ['면 위 텍스트는 navy 잉크', '고채도 팔레트는 링/도트 등 외부 라벨 요소에만'],
    donts: ['채도 높은 fill 위 흰 텍스트 금지(4.5:1 미달)', '색 단독 의미 구분 금지'],
  },
  typography: {
    summary: '두꺼운(800) 산세리프 제목 — 팝 인상.',
    dos: ['제목 800, 라벨 700', '수치는 mono'],
    donts: ['얇은 웨이트(400 미만) 제목 금지'],
  },
  accessibility: {
    summary: '모든 fill은 해당 colorway 잉크와 4.5:1 이상이 되도록 밝기 보정되어 있다.',
    dos: [
      'fill 신규 추가 시 잉크 대비 4.5:1 검증',
      '값 인코딩 텍스트 병기',
      'bento-dark에서는 램프 fill 위 텍스트를 다크 브라운(#241505)으로',
    ],
    donts: ['amber/teal 원색 위 흰 텍스트 금지', 'bento-dark 램프 fill 위 크림/흰 텍스트 금지'],
  },
};

export const colorfulFlat01VizStyleGuide: VisualizationStyleGuide = {
  name: 'colorful-flat-01',
  description:
    'Saturated flat pop — cream canvas, thick navy keylines, bright semantic fills, offset solid shadows.',
  foundations,
  extendedFoundations: { '--bbangto-viz-ext-offset-shadow': '#1B2A4A' },
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { ColorfulFlatShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '컬러풀 flat 팝 모티프 — 두꺼운 navy 아웃라인, 밝은 flat 채움, 잉크색 오프셋 솔리드 섀도, 큰 radius.',
    components: {
      Node: {
        description: '본 도형 뒤 +5,+5 잉크색 실루엣이 flat 일러스트의 faux-3D 입체감을 만든다.',
        specs: ['keyline 3px navy', '오프셋 섀도: +5,+5 잉크 단색', 'radius 8~12px'],
      },
      Tag: {
        description: '타입 태그는 대문자 — 포스터 헤드라인 문법.',
        specs: ['PERSON 형식', 'mono 10px', 'navy 단색'],
      },
      EdgeLabel: {
        description: '연결선 라벨은 그리드 톤 칩 + 넉넉한 패딩.',
        specs: ['bg = canvas.grid', '패딩 5px', 'navy 단색'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Colorful_Flat_01',
    family: 'viz-flat-pop',
    summary:
      '고채도 flat 채움 + 두꺼운 navy 아웃라인 + 오프셋 솔리드 섀도의 팝 다이어그램 — 밝고 친근한 인포그래픽·차트에 쓴다.',
    tags: ['vivid', 'flat', 'rounded', 'playful', 'high-contrast', 'depth'],
    mood: { formality: 2, energy: 4, warmth: 4, density: 3, ornament: 3 },
    characteristics: {
      cornerRadius: 'round',
      borderWeight: 'bold',
      shadow: 'hard',
      density: 'balanced',
      motion: 'subtle',
      colorScheme: 'both',
      contrast: 'high',
    },
    domains: ['marketing', 'education', 'entertainment', 'creative-agency', 'social'],
    useWhen: [
      '발표·마케팅용 인포그래픽이나 통계 차트에서 강한 시선 임팩트가 필요할 때 쓴다.',
      '노드·플로우 다이어그램을 밝고 친근한 팝 인상으로 표현하고 싶을 때 쓴다.',
      '카테고리 구분을 고채도 색과 두꺼운 아웃라인으로 또렷하게 나누고 싶을 때 쓴다.',
    ],
    avoidWhen: [
      '기업 아키텍처·기술 스키매틱처럼 절제되고 중립적인 도식이 필요할 때 피한다.',
      '데이터 밀도가 매우 높아 두꺼운 아웃라인·오프셋 섀도가 시각적 잡음이 될 때 피한다.',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
  },
};
