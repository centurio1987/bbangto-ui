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
 * Iso_Color_Block_01 — F6 색블록 **페인트 패밀리**.
 * 근거: F6 Iso_ColorBlock 배정(style-classification.md — 무채도 단일 계열 램프 + 면별 3단
 * 플랫 명암, 샤프 프리즘).
 *
 * ⚠️ 스코프: 이것은 **페인트 패밀리**다 — 진짜 iso 투영(projection)·depth-sort·iso 커넥터가
 * 아니다. 분류 문서(line 167/246-247)의 "스타일 가이드는 paint만 정의, iso는 별도 geometry
 * 트랙" 원칙에 따른다. 색블록의 3단 면 음영은 headless `Node`의 `cube` 케이스가 이미 제공
 * (front/top 12%/right 24% 플랫 오버레이)하므로 새 geometry 없이 구현한다. 진짜 iso 투영은
 * 별도 geometry-트랙(`@centurio1987/bbangto-ui-visualization`의 `IsoPrism`/`IsometricScene` +
 * `geometry/isometric.ts`)으로 KAN-028에서 구현됨 — 이 색블록 페인트를 그 iso geometry 위에
 * 합성 가능(paint/geometry 직교).
 */

const BLOCK_INK = '#2B3138'; // 블록 윤곽(중립 잉크)
const TAG_INK = '#1F2830'; // 라벨/태그(면 위 4.5:1)
const EDGE_INK = '#3A4149'; // 커넥터(계열과 분리된 중립 — 역할 분리)
const ACCENT = '#D98E5A'; // 강조 1색(테라코타)
const OUTLINE = 1.5;

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: BLOCK_INK,
  keylineWidth: OUTLINE,
  tagColor: TAG_INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'iso-color-block-01',

  canvas: {
    bg: '#F4F1EA',
    grid: '#E4E0D5',
    gridUnit: 8,
  },

  // 단일 계열(더스티 블루) 램프 — 모두 라이트 톤(다크 잉크 라벨 4.5:1 보장). p5=강조 accent.
  palette: {
    p1: '#9FB8CE',
    p2: '#7E9BB8',
    p3: '#B6C8DA',
    p4: '#C9D6E2',
    p5: ACCENT,
    p6: '#5A6B7C',
    p7: BLOCK_INK,
    p8: '#E3EBF2',
  },

  // 제네릭 박스가 cube로 승격될 때의 기본 면색(솔리드) — 무채움 아님.
  shape: {
    fill: '#AEC4D8',
    stroke: BLOCK_INK,
    strokeWidth: OUTLINE,
  },

  // kind별 단일 계열 라이트 톤 — cube 승격 시 면별 3단 음영이 얹힌다.
  node: {
    person: node('#AEC4D8', 'user'),
    external: node('#C3D2E0', 'arrowOut', { dashed: true }),
    container: node('#9FB8CE', 'stackedRect'),
    database: node('#B6C8DA', 'cylinder'),
    queue: node('#C9D6E2', 'bars'),
    decision: node('#A8BFD4', 'diamond'),
    process: node('#BCCDDD', 'process'),
  },

  // 커넥터는 계열과 분리된 중립 잉크(역할 분리).
  edge: {
    stroke: EDGE_INK,
    width: 1.5,
    dashPattern: '',
    cornerRadius: 0,
    marker: {
      size: 7,
      arrow: EDGE_INK,
      diamond: EDGE_INK,
      circle: EDGE_INK,
      cross: EDGE_INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(43,49,56,0.05)', labelColor: BLOCK_INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(43,49,56,0.03)', labelColor: BLOCK_INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: BLOCK_INK },
  },

  boundary: {
    stroke: '#8A9098',
    width: 1.5,
    dashPattern: '',
    radius: 0,
    labelColor: EDGE_INK,
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

/** clay — 웜 클레이 단일 계열 colorway(더스티 블루 → 테라코타 계열). 다크 잉크·중립 커넥터 유지. */
const clayFoundations = makeVizColorway(foundations, {
  name: 'iso-color-block-01-clay',
  canvas: { bg: '#F3EEE8', grid: '#E4DCD1' },
  shape: { fill: '#E0B49A' },
  nodeFills: {
    person: '#E0B49A',
    external: '#EBCBB6',
    container: '#D8A588',
    database: '#E4BDA4',
    queue: '#EFD3C0',
    decision: '#DDAF93',
    process: '#E7C4AC',
  },
  palette: { p1: '#D8A588', p2: '#C08E6E', p3: '#E4BDA4', p4: '#EFD3C0', p6: '#8A6A54', p8: '#F2E4D8' },
});

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Dusty Blue Blocks',
    foundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': ACCENT },
  },
  {
    key: 'clay',
    label: 'Warm Clay Blocks',
    foundations: clayFoundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': '#6D97C0' },
  },
];

/**
 * 색블록 승격 — 제네릭 박스(rect/rounded/미지정)만 `cube`로 렌더해 면별 3단 플랫 음영을
 * 얻는다(Node cube 케이스 재사용, 새 geometry 0). 의미 도형(stadium/diamond/cylinder/hexagon
 * 등)은 통과해 다이어그램 시맨틱을 보존한다. 텍스트 skew/투영 없음.
 */
function IsoNode(props: NodeProps) {
  const promote = props.shape === undefined || props.shape === 'rect' || props.shape === 'rounded';
  return <Node {...props} shape={promote ? 'cube' : props.shape} />;
}
IsoNode.displayName = 'IsoNode';

/** 태그 — 면 위 다크 잉크 칩. */
function IsoTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
IsoTag.displayName = 'IsoTag';

function IsoEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} fontSize={10} />;
}
IsoEdgeLabel.displayName = 'IsoEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: IsoNode,
  Tag: IsoTag,
  EdgeLabel: IsoEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'IsoColorBlockShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '라이트 뉴트럴 그라운드 위 단일 계열 색블록 + 면별 3단 플랫 음영(그라디언트 없음), 샤프 프리즘. 페인트 패밀리이며 진짜 iso 투영은 아니다.',
    dos: ['블록 면은 솔리드 단일 계열', '음영은 3단 플랫(면색 위 오버레이)', '모서리는 샤프(radius 0)'],
    donts: ['면에 그라디언트 금지', '진짜 iso 투영/depth-sort를 이 가이드에 기대 금지(후속 geometry 트랙)'],
  },
  color: {
    summary: '단일 계열 램프(더스티 블루/웜 클레이) + 계열과 분리된 중립 커넥터 잉크 + accent 1색.',
    dos: ['면색은 한 계열의 라이트~미드 톤', '커넥터/경계는 중립 잉크로 역할 분리', '강조는 accent 한 색'],
    donts: ['면 계열에 이질적 유채색 혼입 금지', '커넥터를 면 계열색으로 물들이기 금지'],
  },
  typography: {
    summary: '클린 산세리프 — 블록 라벨은 면 위 다크 잉크. 텍스트는 평면 유지(skew/투영 금지).',
    dos: ['라벨은 다크 잉크로 면 대비 확보', '수치는 mono'],
    donts: ['라벨에 skew/투영 적용 금지(가독성)', '면색과 유사한 저대비 텍스트 금지'],
  },
  accessibility: {
    summary:
      '면색은 라이트 톤으로, 다크 잉크 라벨이 모든 면 위 4.5:1 이상. cube 3단 면 음영은 형태 인식 보조일 뿐 색만으로 의미를 구분하지 않는다.',
    dos: [
      '라벨/태그는 다크 잉크(면 위 4.5:1)',
      'cube 면 음영은 입체 보조 — 의미는 라벨/형태로도 병기',
      '텍스트는 평면 유지(skew/투영 미적용)',
    ],
    donts: [
      '면색만으로 카테고리 의미 인코딩 금지(라벨 병기)',
      '텍스트에 투영/skew 적용 금지',
      '저대비 톤온톤 라벨 금지',
    ],
  },
};

export const isoColorBlock01VizStyleGuide: VisualizationStyleGuide = {
  name: 'iso-color-block-01',
  description:
    'F6 color-block paint family — muted single color-family blocks with per-face 3-tone flat shading (via Node cube reuse), sharp prisms, neutral connectors. Paint only — NOT true isometric projection/depth-sort (separate geometry track).',
  foundations,
  extendedFoundations: { '--bbangto-viz-ext-accent': ACCENT },
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { IsoColorBlockShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '색블록 모티프 — 제네릭 박스를 cube 3단 면 음영으로 승격, 단일 계열 램프, 중립 커넥터. 페인트 패밀리(진짜 iso 투영 아님).',
    components: {
      Node: {
        description:
          '제네릭 박스는 cube로 승격돼 front/top/right 3단 플랫 면 음영을 얻는다 — 색블록 아이덴티티. 의미 도형은 통과(시맨틱 보존).',
        specs: ['rect/rounded/미지정 → cube', '면별 3단 플랫 음영(그라디언트 없음)', 'radius 0 샤프'],
      },
      Tag: {
        description: '타입 태그는 면 위 다크 잉크 칩 — 4.5:1 확보.',
        specs: ['다크 잉크', '10px', '면 위 대비 4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 중립 잉크 캡션 — 면 계열과 분리.',
        specs: ['중립 잉크', '10px', '역할 분리'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Iso_Color_Block_01',
    family: 'viz-iso-colorblock',
    summary:
      '무채도 단일 계열 색블록 + 면별 3단 플랫 음영(cube 재사용)의 페인트 패밀리 — 샤프 프리즘, 중립 커넥터. 진짜 iso 투영은 아니다(별도 트랙).',
    tags: ['geometric', 'depth', 'muted', 'flat', 'sharp', 'light'],
    mood: { formality: 3, energy: 2, warmth: 2, density: 2, ornament: 2 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'medium',
    },
    domains: ['saas', 'dashboard', 'dev-tools', 'landing', 'marketing'],
    useWhen: [
      '시스템 구성요소를 무채도 단일 계열 색블록(입체 면 음영)으로 정갈하게 보여줄 때 쓴다.',
      '아이소메트릭 인포그래픽 무드의 플랫 색블록 다이어그램이 필요할 때 쓴다(진짜 투영 없이).',
      '차분한 단일 계열 팔레트 + 중립 커넥터의 절제된 구조 도식을 원할 때 쓴다.',
    ],
    avoidWhen: [
      '진짜 아이소메트릭 투영·depth-sort·iso 커넥터가 필요할 때 피한다(별도 geometry 트랙 대상).',
      '다색 고채도 시맨틱 채움이 필요할 때 피한다(F3를 쓴다).',
      '손그림 친근함이 목표일 때 피한다(F4를 쓴다).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'corporate-schematic-01'],
  },
};
