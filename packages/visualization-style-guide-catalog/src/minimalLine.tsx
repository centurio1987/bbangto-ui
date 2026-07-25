import type {
  VisualizationFoundation,
  VizFoundationPreset,
} from '@centurio1987/bbangto-ui-tokens';
import {
  Node,
  Tag,
  EdgeLabel,
  type NodeProps,
  type TagProps,
  type EdgeLabelProps,
  type VisualizationStyleGuide,
  type VizWrapperComponents,
} from '@centurio1987/bbangto-ui-visualization';
import { makeVizColorway } from './_foundation';
import { makeVizShowcase } from './_showcase';

/**
 * Minimal_Line_01 — 모노크롬 잉크 라인아트.
 * 근거: F1 Editorial_Accent 배정 16장(style-classification.md — 구 "minimal 폴더 23장" 분류를 대체).
 * warm off-white 캔버스, 1.25px hairline, 무채움 도형, 절제된 coral 단일 액센트.
 * F1 서브모드: (a) 모노라인 라인아트 = default/slate, (b) 솔리드 레드 블록 = editorial preset.
 */

const INK = '#1A1A1A';
const HAIRLINE = 1.25;

const node = (glyph: string, dashed?: boolean) => ({
  fill: 'none',
  keyline: INK,
  keylineWidth: HAIRLINE,
  tagColor: INK,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'minimal-line-01',

  canvas: {
    bg: '#F4F2EC',
    grid: '#E7E4DC',
    gridUnit: 8,
  },

  // 근-모노크롬 램프 + coral 단일 액센트(p1) — 관측 최빈 액센트 #E8663C.
  palette: {
    p1: '#E8663C',
    p2: '#1A1A1A',
    p3: '#55534E',
    p4: '#8A8A86',
    p5: '#B5B2AA',
    p6: '#6E6C66',
    p7: '#3A3833',
    p8: '#D8D5CD',
  },

  shape: {
    fill: 'none',
    stroke: INK,
    strokeWidth: HAIRLINE,
  },

  node: {
    person: node('user'),
    external: node('arrowOut', true),
    container: node('stackedRect'),
    database: node('cylinder'),
    queue: node('bars'),
    decision: node('diamond'),
    process: node('process'),
  },

  edge: {
    stroke: INK,
    width: HAIRLINE,
    dashPattern: '',
    cornerRadius: 2,
    marker: {
      size: 7,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(26,26,26,0.04)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(26,26,26,0.02)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  boundary: {
    stroke: '#8A8A86',
    width: 1,
    dashPattern: '4 4',
    radius: 2,
    labelColor: '#55534E',
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

  iconStyle: 'line',

  spacing: {
    nodePad: 12,
    laneGap: 24,
  },

  motion: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/** slate — cool grey 배경 + cobalt 액센트 colorway (관측: mermaid minimal_07/09, system minimal_02). */
const slateFoundations = makeVizColorway(foundations, {
  name: 'minimal-line-01-slate',
  canvas: { bg: '#EDEFF3', grid: '#DEE2EA' },
  ink: '#16181D',
  tagColor: '#16181D',
  palette: { p1: '#2C5BF2', p3: '#4A5261', p4: '#818A9B', p5: '#AEB6C4', p8: '#D3D9E3' },
  boundaryLabelColor: '#4A5261',
  c4Tints: ['rgba(22,24,29,0.04)', 'rgba(22,24,29,0.02)', 'transparent'],
});

/**
 * editorial — F1 최빈 서브모드(b) 솔리드 레드 블록 색 스킴
 * (관측: infographic_minimal_01/04/05, mermaid_minimal_04 — style-classification.md).
 * red #E8321F 위 텍스트는 잉크 4.07·흰색 4.28로 4.5:1 미달 → 도형 fill은 red로 채우지 않고,
 * 레드 블록은 p1/ext-accent를 통해 Statistics 등 그래픽 요소(≥3:1 대형 그래픽)로만 흐른다.
 */
const editorialFoundations = makeVizColorway(foundations, {
  name: 'minimal-line-01-editorial',
  canvas: { bg: '#F0ECE2', grid: '#E3DECF' },
  palette: { p1: '#E8321F', p8: '#DAD4C4' },
});

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Warm Ivory + Coral',
    foundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': '#E8663C' },
  },
  {
    key: 'slate',
    label: 'Cool Slate + Cobalt',
    foundations: slateFoundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': '#2C5BF2' },
  },
  {
    key: 'editorial',
    label: 'Editorial Red Blocks',
    foundations: editorialFoundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': '#E8321F' },
  },
];

/** hairline 강제 + 무채움 — 명시 fill이 와도 라인아트 문법을 지킨다. */
function MinimalNode(props: NodeProps) {
  return <Node {...props} fill={props.fill === 'none' || props.fill == null ? 'none' : props.fill} strokeWidth={props.strokeWidth ?? HAIRLINE} />;
}
MinimalNode.displayName = 'MinimalNode';

function MinimalTag(props: TagProps) {
  return <Tag {...props} label={`· ${props.label.toLowerCase()}`} fontSize={9} />;
}
MinimalTag.displayName = 'MinimalTag';

function MinimalEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill="none" fontSize={10} />;
}
MinimalEdgeLabel.displayName = 'MinimalEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: MinimalNode,
  Tag: MinimalTag,
  EdgeLabel: MinimalEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'MinimalLineShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary: 'warm off-white 캔버스 위 1.25px hairline 라인아트. 도형은 무채움.',
    dos: ['도형은 fill 없이 윤곽선만', '여백을 정보의 일부로 사용', '직교(orthogonal) 라우팅 우선'],
    donts: ['그림자/그라디언트 금지', '2px 초과 스트로크 금지'],
  },
  color: {
    summary: '모노크롬 램프 + 단일 액센트(coral/cobalt/editorial red). 액센트는 강조 1곳에만.',
    dos: ['액센트는 화면당 한 계열만', '위계는 색이 아니라 굵기·크기로'],
    donts: ['다색 팔레트 동시 사용 금지', '저대비 회색(#9AA0A6급) 캡션 금지 — 캡션도 4.5:1'],
  },
  typography: {
    summary: '산세리프 대비 위계 — 초대형 수치와 미세 캡션의 극단 대비.',
    dos: ['수치는 크게, 캡션은 작게(단 11px 이상)', '좌측 정렬 우선'],
    donts: ['장식 서체 금지'],
  },
  accessibility: {
    summary: 'hairline이라도 의미선은 3:1, 텍스트는 4.5:1 대비 확보.',
    dos: [
      '의미 전달선은 잉크 단색',
      '값 인코딩은 텍스트 병기',
      'editorial 레드 위 텍스트가 불가피하면 다크 레드 #B3271A(흰 텍스트 4.5:1 이상)로 전환',
    ],
    donts: [
      '장식선과 의미선의 대비 혼용 금지',
      'editorial 레드 블록(#E8321F) 위 텍스트 금지 — 잉크 4.07·흰색 4.28로 미달, 그래픽 전용(≥3:1)',
    ],
  },
};

export const minimalLine01VizStyleGuide: VisualizationStyleGuide = {
  name: 'minimal-line-01',
  description:
    'Monochrome ink line-art — warm ivory canvas, 1.25px hairlines, unfilled shapes, one restrained accent.',
  foundations,
  extendedFoundations: { '--bbangto-viz-ext-accent': '#E8663C' },
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { MinimalLineShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '모노크롬 라인아트 모티프 — hairline 윤곽, 무채움 도형, 넉넉한 여백, 절제된 단일 액센트.',
    components: {
      Node: {
        description: '모든 도형은 1.25px 잉크 윤곽선만으로 그려져 기술 문서의 정갈한 도식 인상을 만든다.',
        specs: ['fill: none', 'keyline 1.25px', 'radius 0~2px'],
      },
      Tag: {
        description: '타입 태그는 소문자 + 중점(·) 접두 — 각주 문법.',
        specs: ['· person 형식', 'mono 9px', '잉크 단색'],
      },
      EdgeLabel: {
        description: '연결선 라벨은 배경 칩 없이 미세 캡션으로만.',
        specs: ['bg 없음', 'mono 10px', '잉크 단색'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Minimal_Line_01',
    family: 'viz-editorial-accent',
    summary:
      '웜 아이보리 캔버스 위 1.25px 헤어라인 라인아트 다이어그램 — 무채움 도형·넉넉한 여백·절제된 단일 액센트로 노드/플로우/차트를 정갈하게.',
    tags: ['light', 'minimal', 'monochrome', 'flat', 'airy', 'typographic', 'muted'],
    mood: { formality: 3, energy: 2, warmth: 4, density: 2, ornament: 1 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'airy',
      motion: 'subtle',
      colorScheme: 'light',
      contrast: 'medium',
    },
    domains: ['docs', 'dev-tools', 'editorial', 'saas', 'dashboard'],
    useWhen: [
      '기술 문서·아키텍처 도식을 정갈한 라인아트로 담백하게 표현할 때 쓴다.',
      '노드·플로우 다이어그램에서 색보다 굵기·여백으로 위계를 세우고 싶을 때 쓴다.',
      '에디토리얼 데이터 저널리즘처럼 초대형 수치와 미세 캡션의 대비를 살릴 때 쓴다.',
      '단일 액센트로 강조를 절제하며 인쇄물 같은 정적 인상이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '카테고리가 많아 다색 인코딩으로 계열을 구분해야 하는 차트에는 피한다.',
      '다크 대시보드·네온 강조 등 강렬한 시각 임팩트가 필요할 때 피한다.',
      '면 채움·그라디언트로 볼륨감을 줘야 하는 인포그래픽에는 피한다.',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['ink-line-duotone-01', 'blueprint-technical-01'],
  },
};
