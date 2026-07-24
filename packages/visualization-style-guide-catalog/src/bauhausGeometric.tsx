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
 * Bauhaus_Geometric_01 — 웜 페이퍼 위 3원색(빨강/노랑/파랑) + 두꺼운 블랙 아웃라인 +
 * 하드 솔리드 오프셋 섀도의 **기하학 페인트 패밀리**(viz-style-expansion.md §4-d, Tier A).
 * 근거: UI 카탈로그 트리아지 P1 — 데수타일/바우하우스 조형의 3원색·기하 도형·각진 구조.
 *
 * ⚠️ 대비 계약: 순수 3원색 위 라벨 4.5:1이 이 패밀리의 리스크다. 관측 실측(WCAG):
 *   - 노랑 #F5C518 → 다크 잉크 라벨 10.68:1
 *   - 파랑 #1E4FCE → 흰 라벨 6.85:1
 *   - 빨강 #E63A27 은 흰·검 어느 라벨도 4.5 미달(4.20/4.14) → **채움만** #D13120 로 살짝 낮춰
 *     흰 라벨 5.03:1 확보(팔레트 p1 은 아이덴티티용 순수 #E63A27 유지 — 라벨 없는 링/도트 전용).
 * 하드 섀도는 본 도형 뒤 +5,+5 잉크 실루엣(장식 — geometry 시맨틱 불변).
 */

const INK = '#1A1A1A'; // 블랙 잉크(아웃라인/커넥터/라벨) — 페이퍼 위 15:1
const WHITE = '#FFFFFF';
const OUTLINE = 2.5; // 두꺼운 블랙 아웃라인

// 채움 전용 색(라벨 대비 보정판). 팔레트 스와치는 순수 3원색을 별도 유지한다.
const RED = '#D13120'; // 흰 라벨 5.03:1 (순수 #E63A27 은 4.2 미달)
const YELLOW = '#F5C518'; // 다크 잉크 라벨 10.68:1
const BLUE = '#1E4FCE'; // 흰 라벨 6.85:1
const ORANGE = '#EE7A1E'; // 보조색 — 다크 잉크 라벨 6.16:1
const GREEN = '#2E9E5B'; // 보조색 — 다크 잉크 라벨 5.10:1

const node = (fill: string, tagColor: string, glyph: string, dashed?: boolean) => ({
  fill,
  keyline: INK,
  keylineWidth: OUTLINE,
  tagColor,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'bauhaus-geometric-01',

  canvas: {
    bg: '#F3EFE4', // 웜 페이퍼
    grid: '#E6E0D0',
    gridUnit: 8,
  },

  // 3원색 + 블랙/화이트 + 보조색(orange/green) + 페이퍼 틴트. 라벨 없는 링/도트 등 외부 요소 전용.
  palette: {
    p1: '#E63A27', // 순수 레드(아이덴티티)
    p2: '#F5C518', // 옐로
    p3: '#1E4FCE', // 블루
    p4: '#1A1A1A', // 블랙
    p5: '#FFFFFF', // 화이트
    p6: '#EE7A1E', // 보조 오렌지
    p7: '#2E9E5B', // 보조 그린
    p8: '#E8E1D0', // 웜 샌드 틴트
  },

  shape: {
    fill: '#FFFFFF',
    stroke: INK,
    strokeWidth: OUTLINE,
  },

  // kind별 채움: 3원색 우세 + 보조색으로 종류 구분. 각 fill 위 tagColor 라벨은 실측 4.5:1 이상.
  node: {
    person: node(RED, WHITE, 'user'), // 흰 라벨 5.03
    external: node(WHITE, INK, 'arrowOut', true), // 다크 라벨 17.40 (dashed)
    container: node(BLUE, WHITE, 'stackedRect'), // 흰 라벨 6.85
    database: node(YELLOW, INK, 'cylinder'), // 다크 라벨 10.68
    queue: node(ORANGE, INK, 'bars'), // 다크 라벨 6.16
    decision: node(GREEN, INK, 'diamond'), // 다크 라벨 5.10
    process: node(BLUE, WHITE, 'process'), // 흰 라벨 6.85
  },

  // 커넥터: 직각(cornerRadius 0), 두꺼운 블랙, 작은 삼각 마커.
  edge: {
    stroke: INK,
    width: 2.5,
    dashPattern: '',
    cornerRadius: 0,
    marker: {
      size: 9,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 3, bgTint: 'rgba(26,26,26,0.06)', labelColor: INK },
    l2: { borderWidth: 2, bgTint: 'rgba(26,26,26,0.04)', labelColor: INK },
    l3: { borderWidth: 1.5, bgTint: 'transparent', labelColor: INK },
  },

  boundary: {
    stroke: INK,
    width: 2,
    dashPattern: '',
    radius: 0,
    labelColor: INK,
  },

  typography: {
    titleFont: "'Futura', 'Century Gothic', 'Helvetica Neue', Arial, sans-serif",
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

/**
 * bold — 화이트 그라운드 + 순수 블랙(#000000) 잉크 colorway. 채움은 유지(각 kind 의 base
 * tagColor 대비 불변), 그라운드/잉크만 갈아끼워 더 강한 대비·포스터 인상. tagColor 를 넘기지
 * 않아 kind별 라벨색(흰/다크)이 base 그대로 보존된다.
 */
const boldFoundations = makeVizColorway(foundations, {
  name: 'bauhaus-geometric-01-bold',
  canvas: { bg: '#FFFFFF', grid: '#ECECEC' },
  ink: '#000000',
  shape: { fill: '#FFFFFF' },
  palette: { p4: '#000000', p8: '#EDEDED' },
});

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Primary Paper',
    foundations,
    extendedFoundations: { '--bbangto-viz-ext-offset-shadow': INK },
  },
  {
    key: 'bold',
    label: 'Bold (White Ground)',
    foundations: boldFoundations,
    extendedFoundations: { '--bbangto-viz-ext-offset-shadow': '#000000' },
  },
];

/** 하드 솔리드 오프셋 섀도 — 본 도형 뒤 +5,+5 잉크 실루엣(장식). geometry 시맨틱 불변. */
function BauhausNode(props: NodeProps) {
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
BauhausNode.displayName = 'BauhausNode';

/** 타입 태그 — 대문자(바우하우스 포스터 헤드라인 문법). */
function BauhausTag(props: TagProps) {
  return <Tag {...props} label={props.label.toUpperCase()} fontSize={10} />;
}
BauhausTag.displayName = 'BauhausTag';

/** 흐름선 라벨 — 페이퍼 그리드 톤 칩 + 넉넉한 패딩. */
function BauhausEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'grid')} padding={5} />;
}
BauhausEdgeLabel.displayName = 'BauhausEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: BauhausNode,
  Tag: BauhausTag,
  EdgeLabel: BauhausEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'BauhausGeometricShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '웜 페이퍼 위 두꺼운 블랙 아웃라인(2.5px) + 3원색 flat 채움 + 하드 솔리드 오프셋 섀도. 모서리는 샤프(radius 0).',
    dos: ['도형은 flat 단색 채움', '아웃라인은 두꺼운 블랙(2.5px)', '오프셋 섀도는 잉크 단색(+5,+5)'],
    donts: ['그라디언트/블러 섀도 금지', '아웃라인 없는 채움 도형 금지', '둥근 모서리 금지(radius 0 유지)'],
  },
  color: {
    summary:
      '3원색(빨강/노랑/파랑) 우세 + 블랙/화이트 + 보조색(오렌지/그린). 순수 레드 채움은 라벨 대비를 위해 살짝 낮춘 톤을 쓴다.',
    dos: [
      '카테고리는 3원색으로 또렷하게 구분',
      '순수 레드 아이덴티티는 팔레트 스와치(외부 라벨 요소)로만',
      '채움 위 라벨은 그 fill이 4.5:1을 주는 색(노랑↔다크, 파랑↔흰)으로',
    ],
    donts: ['순수 #E63A27 채움 위 라벨 금지(흰/검 모두 4.5 미달)', '색 단독으로 의미 인코딩 금지(라벨 병기)'],
  },
  typography: {
    summary: '기하학 산세리프(Futura 계열) — 두꺼운(800) 제목, 타입 태그는 대문자 포스터 문법.',
    dos: ['제목 800, 태그 대문자', '수치는 mono'],
    donts: ['얇은 웨이트(400 미만) 제목 금지', '장식 세리프 금지'],
  },
  accessibility: {
    summary:
      '모든 채움 kind의 라벨(tagColor)은 해당 fill 위 4.5:1 이상(노랑/오렌지/그린↔다크 잉크, 빨강/파랑↔흰). 순수 레드는 채움에서 배제해 대비를 보장한다. 색만으로 의미를 구분하지 않고 형태·라벨을 병기한다.',
    dos: [
      '채움 fill 신규 추가 시 라벨색과 4.5:1 검증',
      '값/카테고리는 라벨·기하 도형으로도 병기',
      '하드 오프셋 섀도는 장식 — 의미 인코딩에 쓰지 않음',
    ],
    donts: [
      '순수 3원색 채움 위 저대비 라벨 금지(특히 빨강)',
      '색 단독 의미 구분 금지',
      '섀도로 카테고리 구분 금지',
    ],
  },
};

export const bauhausGeometric01VizStyleGuide: VisualizationStyleGuide = {
  name: 'bauhaus-geometric-01',
  description:
    'Bauhaus geometric paint family — warm paper ground, thick black keylines, primary-color flat fills (red/yellow/blue) with per-fill contrast-safe labels, hard solid offset shadows, sharp right-angle edges.',
  foundations,
  extendedFoundations: { '--bbangto-viz-ext-offset-shadow': INK },
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { BauhausGeometricShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '바우하우스 기하 모티프 — 두꺼운 블랙 아웃라인, 3원색 flat 채움, 하드 솔리드 오프셋 섀도, 샤프 직각. 채움 위 라벨은 fill별 4.5:1을 주는 색으로 고정.',
    components: {
      Node: {
        description:
          '본 도형 뒤 +5,+5 잉크 실루엣이 바우하우스 특유의 하드 오프셋 입체감을 만든다. 채움은 3원색·보조색 flat.',
        specs: ['keyline 2.5px 블랙', '오프셋 섀도: +5,+5 잉크 단색', 'radius 0 샤프'],
      },
      Tag: {
        description: '타입 태그는 대문자 — 바우하우스 포스터 헤드라인 문법.',
        specs: ['PERSON 형식', 'mono 10px', 'fill별 4.5:1 라벨색'],
      },
      EdgeLabel: {
        description: '연결선 라벨은 페이퍼 그리드 톤 칩 + 넉넉한 패딩.',
        specs: ['bg = canvas.grid', '패딩 5px', '다크 잉크'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Bauhaus_Geometric_01',
    family: 'viz-bauhaus-geometric',
    summary:
      '3원색 flat 채움 + 두꺼운 블랙 아웃라인 + 하드 솔리드 오프셋 섀도의 기하 다이어그램 — 교육·에디토리얼·마케팅의 강한 조형 인상에 쓴다.',
    tags: ['geometric', 'vivid', 'sharp', 'high-contrast', 'flat', 'light'],
    mood: { formality: 3, energy: 4, warmth: 3, density: 3, ornament: 3 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'bold',
      shadow: 'hard',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['education', 'editorial', 'marketing', 'creative-agency'],
    useWhen: [
      '3원색·기하 도형의 강한 조형 인상으로 개념·구조를 또렷하게 보여줄 때 쓴다.',
      '교육·에디토리얼·마케팅용 인포그래픽에서 바우하우스/데수타일 무드가 필요할 때 쓴다.',
      '두꺼운 아웃라인과 하드 오프셋 섀도로 포스터형 다이어그램을 만들 때 쓴다.',
    ],
    avoidWhen: [
      '기업 아키텍처·기술 스키매틱처럼 절제되고 중립적인 도식이 필요할 때 피한다.',
      '데이터 밀도가 매우 높아 두꺼운 아웃라인·오프셋 섀도가 시각적 잡음이 될 때 피한다.',
      '순수 3원색을 라벨 배경으로 강제해야 하는 요구가 있을 때 피한다(대비 미달 리스크).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01'],
  },
};
