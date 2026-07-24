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
 * Swiss_Systematic_01 — International Typographic Style(스위스 시스템) 다이어그램 언어.
 * 근거: viz-style-expansion.md §4-d(Tier A) — 8px 모듈러 그리드, 순백 캔버스 + 헤어라인
 * 그리드, 잉크(#111) 1px, 단일 레드 액센트(#E1000F).
 *
 * 핵심 규칙(Isotype): 위계는 **색이 아니라 위치·크기·굵기**로 세운다. 대부분의 노드는
 * 무채움(fill:'none') + 1px 잉크 헤어라인 키라인이고, 단 하나의 강조 kind(decision)만
 * 레드 면 채움 + 라이트 라벨을 쓴다. 팔레트는 무채도 그레이 램프(#111→#BDBDBD)에
 * p5=레드 하나만 얹는다. 커넥터는 직교(orthogonal) 1px + 소형 삼각 화살촉, 코너 radius 0.
 */

const INK = '#111111'; // 잉크(키라인·엣지·라벨)
const ACCENT = '#E1000F'; // 단일 레드 액센트(강조 kind 면 채움)
const HAIRLINE = 1;

/** 무채움 라인 노드 — 1px 잉크 키라인, 잉크 라벨. 위계는 위치·크기·굵기로. */
const lineNode = (glyph: string, dashed?: boolean) => ({
  fill: 'none',
  keyline: INK,
  keylineWidth: HAIRLINE,
  tagColor: INK,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

/** 단일 강조 kind — 레드 면 채움 + 라이트(흰) 라벨(레드 위 흰색 ≈ 4.99:1, AA 통과·AAA 미달). */
const accentNode = (glyph: string) => ({
  fill: ACCENT,
  keyline: INK,
  keylineWidth: HAIRLINE,
  tagColor: '#FFFFFF',
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'swiss-systematic-01',

  canvas: {
    bg: '#FFFFFF',
    grid: '#E6E6E6',
    gridUnit: 8, // 8px 모듈러 그리드
  },

  // 무채도 그레이 램프(#111 → #BDBDBD) + p5 = 단일 레드 액센트. 색은 위계가 아니라 강조 1점.
  palette: {
    p1: '#111111',
    p2: '#2E2E2E',
    p3: '#4D4D4D',
    p4: '#707070',
    p5: ACCENT,
    p6: '#8C8C8C',
    p7: '#A6A6A6',
    p8: '#BDBDBD',
  },

  // 제네릭 박스 기본은 무채움 헤어라인(라인 문법). 강조만 레드.
  shape: {
    fill: 'none',
    stroke: INK,
    strokeWidth: HAIRLINE,
  },

  node: {
    person: lineNode('user'),
    external: lineNode('arrowOut', true),
    container: lineNode('stackedRect'),
    database: lineNode('cylinder'),
    queue: lineNode('bars'),
    decision: accentNode('diamond'), // 단 하나의 레드 강조 kind
    process: lineNode('process'),
  },

  // 직교 1px + 소형 삼각 화살촉, 코너 radius 0(샤프).
  edge: {
    stroke: INK,
    width: HAIRLINE,
    dashPattern: '',
    cornerRadius: 0,
    marker: {
      size: 6,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(17,17,17,0.05)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(17,17,17,0.03)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 존 경계는 샤프(radius 0) 중립 그레이 헤어라인 — 그리드와 정렬.
  boundary: {
    stroke: '#8C8C8C',
    width: 1,
    dashPattern: '',
    radius: 0,
    labelColor: '#333333',
  },

  typography: {
    // 그로테스크(Helvetica) — 위계는 굵기(700)로, 별도 mono 강조 없음(mono는 문자열만 유지).
    titleFont: "'Helvetica Neue', Helvetica, 'Arial', sans-serif",
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

/**
 * ink — 순수 잉크 모노 colorway(엄격 International Typographic). 잉크를 순흑(#000)으로 심화하고
 * 레드 액센트를 제거해(decision 면 = 잉크, p5 = 잉크) "색이 아니라 위치·크기·굵기"의 원칙을
 * 극단까지 밀어붙인다. 비색상 토큰(그리드·타이포·간격·1px 헤어라인)은 base와 deep-equal.
 */
const inkMonoFoundations = makeVizColorway(foundations, {
  name: 'swiss-systematic-01-ink',
  ink: '#000000',
  nodeFills: { decision: '#000000' }, // 강조 면도 순흑(레드 제거) — 흰 라벨 21:1
  palette: { p1: '#000000', p5: '#000000' },
});

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Achromatic + Red',
    foundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': ACCENT },
  },
  {
    key: 'ink',
    label: 'Ink Mono (No Accent)',
    foundations: inkMonoFoundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': '#000000' },
  },
];

/**
 * 스위스 노드 — 제네릭 박스(미지정/rect/rounded)를 **샤프 rect**로 정렬하고 무채움 헤어라인을
 * 강제한다(라운드 없음, 그리드 각). 의미 도형(stadium/diamond/cylinder 등)은 통과해 시맨틱 보존.
 * 명시 fill(레드 강조)은 그대로 흘려보낸다.
 */
function SwissNode(props: NodeProps) {
  const sharpen =
    props.shape === undefined || props.shape === 'rect' || props.shape === 'rounded';
  const fill = props.fill === 'none' || props.fill == null ? 'none' : props.fill;
  return (
    <Node
      {...props}
      shape={sharpen ? 'rect' : props.shape}
      fill={fill}
      strokeWidth={props.strokeWidth ?? HAIRLINE}
    />
  );
}
SwissNode.displayName = 'SwissNode';

/** 타입 태그 — 대문자 그로테스크 캡션(시스템 라벨 문법). */
function SwissTag(props: TagProps) {
  return <Tag {...props} label={props.label.toUpperCase()} fontSize={9} />;
}
SwissTag.displayName = 'SwissTag';

/** 커넥터 라벨 — 캔버스 톤 칩으로 선을 끊고 얹히는 소형 캡션. */
function SwissEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} fontSize={10} padding={4} />;
}
SwissEdgeLabel.displayName = 'SwissEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: SwissNode,
  Tag: SwissTag,
  EdgeLabel: SwissEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'SwissSystematicShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '순백 캔버스 위 8px 모듈러 그리드 + 1px 잉크 헤어라인. 도형은 무채움, 커넥터는 직교(코너 radius 0), 소형 삼각 화살촉.',
    dos: ['도형은 fill 없이 1px 잉크 윤곽선만', '커넥터는 직교 라우팅 + 코너 radius 0', '요소는 8px 그리드에 정렬'],
    donts: ['그림자/그라디언트 금지', '라운드 코너/유기적 곡선 금지', '1px 초과 헤어라인 금지'],
  },
  color: {
    summary:
      '무채도 그레이 램프 + 단일 레드 액센트(#E1000F) 하나. 위계는 색이 아니라 위치·크기·굵기로 세운다(Isotype 규칙).',
    dos: ['강조는 화면당 레드 1점(decision 면)에만', '나머지는 전부 무채도 잉크/그레이', '위계는 크기·굵기·위치로'],
    donts: ['다색 유채 인코딩 금지', '레드를 강조 이상으로 남발 금지', '색만으로 카테고리 구분 금지(위치·라벨 병기)'],
  },
  typography: {
    summary:
      '그로테스크(Helvetica) 단일 계열 — 위계는 굵기(700)와 크기로만. 라벨은 좌측 정렬 지향, 별도 mono 강조 없음.',
    dos: ['위계는 weight/size로', '라벨은 좌측 정렬 지향', '수치는 mono 문자열 유지(강조 아님)'],
    donts: ['장식 서체/이탤릭 남용 금지', '중앙 정렬로 축을 흐리기 금지'],
  },
  accessibility: {
    summary:
      '잉크(#111)는 캔버스 대비 ~18:1, 엣지도 3:1 이상. 레드 강조 면 위 라벨은 흰색(≈4.99:1, AA). 색만으로 의미를 구분하지 않는다.',
    dos: [
      '라인 노드 라벨은 잉크(캔버스 위 4.5:1 이상)',
      '레드 강조 면 위 라벨은 흰색으로 4.5:1 확보(AA)',
      '의미는 색이 아니라 위치·크기·형태로도 병기',
    ],
    donts: [
      '레드 면 위 잉크/그레이 텍스트 금지(대비 미달)',
      '레드를 AAA(7:1) 대비로 오선언 금지 — 흰색 위 레드 면은 ≈4.99로 AA',
      '저대비 톤온톤 그레이 라벨 금지(캡션도 4.5:1)',
    ],
  },
};

export const swissSystematic01VizStyleGuide: VisualizationStyleGuide = {
  name: 'swiss-systematic-01',
  description:
    'International Typographic (Swiss) systematic diagram language — pure white canvas, 8px modular grid, 1px ink hairlines, unfilled shapes, orthogonal connectors, and a single red accent. Hierarchy by position/size/weight, not color.',
  foundations,
  extendedFoundations: { '--bbangto-viz-ext-accent': ACCENT },
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { SwissSystematicShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '스위스 시스템 모티프 — 8px 그리드 정렬, 무채움 1px 헤어라인 도형(샤프 rect), 직교 커넥터, 단일 레드 강조. 위계는 색이 아니라 위치·크기·굵기.',
    components: {
      Node: {
        description:
          '제네릭 박스는 샤프 rect로 정렬되고 무채움 1px 잉크 헤어라인으로 그려진다. 의미 도형은 통과(시맨틱 보존), 명시 레드 fill은 그대로 흐른다.',
        specs: ['rect/rounded/미지정 → 샤프 rect', 'fill: none · keyline 1px', '레드 강조 면만 예외'],
      },
      Tag: {
        description: '타입 태그는 대문자 그로테스크 캡션 — 시스템 라벨 문법.',
        specs: ['UPPERCASE', '9px', '잉크 단색'],
      },
      EdgeLabel: {
        description: '커넥터 라벨은 캔버스 톤 칩으로 선을 끊고 얹힌다 — 소형 캡션.',
        specs: ['bg = canvas.bg', '패딩 4px', '10px'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Swiss_Systematic_01',
    family: 'viz-swiss-systematic',
    summary:
      '순백 캔버스·8px 모듈러 그리드·1px 잉크 헤어라인·무채움 도형·직교 커넥터·단일 레드 액센트의 스위스 시스템 다이어그램 — 위계는 색이 아니라 위치·크기·굵기로.',
    tags: ['grid', 'sharp', 'monochrome', 'technical', 'typographic', 'light'],
    mood: { formality: 5, energy: 2, warmth: 1, density: 3, ornament: 1 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['dashboard', 'editorial', 'docs', 'fintech'],
    useWhen: [
      '엄격한 그리드·무채도 잉크·단일 레드 액센트의 스위스 시스템 도식이 필요할 때 쓴다.',
      '위계를 색이 아니라 위치·크기·굵기로 세우고 싶을 때 쓴다(Isotype 규칙).',
      '핀테크·에디토리얼·기술 문서의 정갈하고 포멀한 구조 도식을 원할 때 쓴다.',
      '직교 커넥터·샤프 코너의 기술적/타이포그래픽 인상이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '다색 고채도 시맨틱 인코딩으로 카테고리를 구분해야 할 때 피한다.',
      '손그림·화이트보드의 친근한 스케치 무드가 목표일 때 피한다.',
      '네온·그라디언트·다크 임팩트가 핵심일 때 피한다.',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['minimal-line-01', 'corporate-schematic-01'],
  },
};
