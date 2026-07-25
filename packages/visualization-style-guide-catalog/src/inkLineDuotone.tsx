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
 * Ink_Line_Duotone_01 — 지터 없는 균일 모노라인 + 블랙/블루 잉크 듀오톤.
 * 근거: F5 Ink_Line_Duotone 배정 6장(style-classification.md — system hand-drawn_01/02/04,
 * system isometric_04, system minimal_07, mermaid isometric_01).
 * 클린 벡터 1.75px, 무채움(강조만 라이트 블루 틴트), 모노 태그 — 기술 에디토리얼 무드.
 */

const INK = '#111111';
const BLUE = '#2B44E0';
const LINE = 1.75;

const node = (glyph: string, opts?: { fill?: string; dashed?: boolean }) => ({
  fill: opts?.fill ?? 'none',
  keyline: INK,
  keylineWidth: LINE,
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'ink-line-duotone-01',

  canvas: {
    bg: '#FFFFFF',
    grid: '#EFEFEF',
    gridUnit: 8,
  },

  // 블랙+블루 2잉크 + 그레이 램프. p8은 강조 틴트(라이트 블루).
  palette: {
    p1: '#2B44E0',
    p2: '#111111',
    p3: '#3355DD',
    p4: '#6E6E76',
    p5: '#A5A6B0',
    p6: '#52525E',
    p7: '#23232B',
    p8: '#D6E4F7',
  },

  shape: {
    fill: 'none',
    stroke: INK,
    strokeWidth: LINE,
  },

  // 채움 없음 기본 — 강조 컨테이너만 라이트 블루 틴트.
  node: {
    person: node('user'),
    external: node('arrowOut', { dashed: true }),
    container: node('stackedRect', { fill: '#D6E4F7' }),
    database: node('cylinder'),
    queue: node('bars'),
    decision: node('diamond'),
    process: node('process'),
  },

  // 커넥터는 블루 잉크 — 도형(블랙)과의 2잉크 분리가 이 가이드의 시그니처.
  edge: {
    stroke: BLUE,
    width: LINE,
    dashPattern: '',
    cornerRadius: 2,
    marker: {
      size: 7,
      arrow: BLUE,
      diamond: BLUE,
      circle: BLUE,
      cross: BLUE,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(43,68,224,0.05)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(43,68,224,0.03)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 도트 리더선 무드의 경계 — 블루 잉크 점선.
  boundary: {
    stroke: BLUE,
    width: 1,
    dashPattern: '2 5',
    radius: 2,
    labelColor: BLUE,
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

/** slate — 그레이 잉크 + 퍼플 엣지 colorway (관측: mermaid isometric_01 퍼플 단일 액센트). */
const slateFoundations = makeVizColorway(foundations, {
  name: 'ink-line-duotone-01-slate',
  canvas: { bg: '#ECEDF1', grid: '#DFE0E6' },
  ink: '#33333B',
  tagColor: '#33333B',
  edge: { stroke: '#6B3FD1' },
  nodeFills: { container: '#E4DCF6' },
  palette: { p1: '#6B3FD1', p3: '#8A5CF0', p8: '#E4DCF6' },
  boundaryLabelColor: '#6B3FD1',
  c4Tints: ['rgba(107,63,209,0.05)', 'rgba(107,63,209,0.03)', 'transparent'],
});

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Black Ink + Cobalt Edge',
    foundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': BLUE },
  },
  {
    key: 'slate',
    label: 'Slate Ink + Violet Edge',
    foundations: slateFoundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': '#6B3FD1' },
  },
];

/** 균일 1.75px 모노라인 강제 — 명시 fill이 없으면 무채움 라인 문법을 지킨다. */
function InkNode(props: NodeProps) {
  return <Node {...props} fill={props.fill ?? 'none'} strokeWidth={props.strokeWidth ?? LINE} />;
}
InkNode.displayName = 'InkNode';

/** 대괄호 mono 칩 — 기술 주석 문법. */
function InkTag(props: TagProps) {
  return <Tag {...props} label={`[${props.label.toLowerCase()}]`} fontSize={9} />;
}
InkTag.displayName = 'InkTag';

function InkEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill="none" fontSize={10} />;
}
InkEdgeLabel.displayName = 'InkEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: InkNode,
  Tag: InkTag,
  EdgeLabel: InkEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'InkLineDuotoneShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary: '흰 캔버스 위 균일 1.75px 클린 벡터 모노라인. 지터/브러시 질감 금지 — F4(마커 스케치)와의 경계.',
    dos: ['모든 선은 균일 굵기(1.75px)', '도형은 무채움 기본', '보조선은 도트/대시로'],
    donts: ['손그림 지터·러프 텍스처 금지', '굵기 혼용 금지(강조는 색으로)'],
  },
  color: {
    summary: '블랙(도형 잉크) + 블루(커넥터 잉크) 2잉크 듀오톤. 채움은 라이트 틴트 1색만.',
    dos: ['도형은 블랙, 흐름(엣지·경계)은 블루로 역할 분리', '강조 채움은 p8 틴트 한 곳만'],
    donts: ['제3의 유채색 도입 금지', '솔리드 고채도 채움 금지'],
  },
  typography: {
    summary: '본문 산세리프 + 태그/주석은 모노스페이스 — 기술 문서 각주 문법.',
    dos: ['태그는 [container] 대괄호 mono', '주석·수치는 mono 11px'],
    donts: ['장식 서체 금지', '태그에 본문 서체 혼용 금지'],
  },
  accessibility: {
    summary: '두 잉크 모두 캔버스 대비 확보 — 블랙 18.9:1, 블루 7.0:1(≥4.5). 색만으로 역할 구분하지 않는다.',
    dos: ['잉크 역할(도형/흐름)은 색과 함께 형태(실선/점선)로도 구분', '값 인코딩은 텍스트 병기'],
    donts: ['라이트 틴트(#D6E4F7) 위 흰 텍스트 금지', '캔버스 대비 3:1 미만 보조선에 의미 부여 금지'],
  },
};

export const inkLineDuotone01VizStyleGuide: VisualizationStyleGuide = {
  name: 'ink-line-duotone-01',
  description:
    'Clean uniform monoline duotone — black shape ink + cobalt connector ink, unfilled shapes, mono annotations.',
  foundations,
  extendedFoundations: { '--bbangto-viz-ext-accent': BLUE },
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { InkLineDuotoneShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '2잉크 모노라인 모티프 — 블랙 도형 윤곽과 블루 흐름선의 역할 분리, 균일 1.75px, 도트 리더선, 모노 각주.',
    components: {
      Node: {
        description: '도형은 블랙 잉크 1.75px 균일 윤곽선만 — 지터 없는 클린 벡터가 기술 일러스트 인상을 만든다.',
        specs: ['fill: none (강조만 p8 틴트)', 'keyline 1.75px 균일', 'radius 0~2px'],
      },
      Tag: {
        description: '타입 태그는 소문자 대괄호 mono — 코드 주석 문법.',
        specs: ['[person] 형식', 'mono 9px', '엣지 잉크(블루) 상속'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 배경 칩 없이 블루 잉크 mono 캡션.',
        specs: ['bg 없음', 'mono 10px', '블루 잉크'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Ink_Line_Duotone_01',
    family: 'viz-ink-line-duotone',
    summary:
      '지터 없는 균일 1.75px 모노라인 + 블랙/블루 2잉크 듀오톤 — 채움 없는 클린 벡터의 기술 에디토리얼 다이어그램.',
    tags: ['light', 'technical', 'minimal', 'mono', 'flat', 'geometric', 'sharp'],
    mood: { formality: 4, energy: 2, warmth: 1, density: 2, ornament: 1 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'balanced',
      motion: 'subtle',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['dev-tools', 'docs', 'saas', 'editorial'],
    useWhen: [
      '아키텍처·시스템 다이어그램을 채움 없는 클린 라인 일러스트로 그릴 때 쓴다.',
      '기술 문서·개발자 도구의 노드/흐름 도식에 절제된 2잉크 듀오톤이 필요할 때 쓴다.',
      '도형(블랙)과 흐름(블루)을 색 + 형태로 역할 분리해 읽히게 하고 싶을 때 쓴다.',
      '인쇄물처럼 가볍고 정갈한 블루프린트 인상을 원할 때 쓴다.',
    ],
    avoidWhen: [
      '카테고리가 많아 다색 시맨틱 채움이 필요한 차트일 때 피한다(F3를 쓴다).',
      '손그림 지터·마커 스케치의 친근한 무드가 목표일 때 피한다(F4를 쓴다).',
      '다크 배경·네온 그라디언트의 임팩트가 필요할 때 피한다(F7을 쓴다).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['blueprint-technical-01', 'minimal-line-01'],
  },
};
