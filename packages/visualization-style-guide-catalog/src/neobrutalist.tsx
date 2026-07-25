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
 * Neobrutalist_01 — 크림/페이퍼 그라운드 위 두꺼운 잉크 아웃라인 + 하드(블러 없는) 오프셋 섀도의
 * 날것(raw) 네오브루탈리즘 페인트(KAN-039, 고유 1:1 family `viz-neobrutalist`).
 * 근거: UI 카탈로그 네오브루탈리즘 조형(두꺼운 검정 아웃라인·하드 오프셋 섀도·샤프 직각·골드 액센트)을
 * viz 도식 어휘로 이식. Bauhaus_Geometric_01(하드 오프셋 섀도)·Riso_Print_01(장식 유령 도형 wrapper)의 선례를 잇는다.
 *
 * 시그니처 = **NeobrutalistNode**가 본 도형 뒤에 근블랙 실루엣을 +5,+5 오프셋(순수 SVG transform, 블러 없음)으로
 * 깔아 하드 섀도 입체감을 만든다. 섀도는 `<g data-viz-neobrutal-shadow aria-hidden>` 장식(텍스트 없음, 정보 인코딩
 * 아님)이고, 실 도형의 두꺼운 아웃라인·라벨은 그 위에 그린다. 라벨(children)은 섀도/도형 밖에서 렌더 →
 * 그림자가 텍스트를 절대 덮지 않는다(가독성).
 *
 * 접근성: 채움은 전부 밝은 flat 컬러라 근블랙 라벨(node.tagColor / c4.labelColor / boundary.labelColor)이
 * 실측 7:1 이상(coral 채움 7.94:1이 worst-case)이라 contrastIntent='aaa' 정직 선언(auditVizContrast 하드게이트 통과).
 * 아웃라인/엣지 잉크(#141210)는 크림 캔버스 대비 ~16:1이라 텍스트 4.5·비텍스트 3 기준을 넉넉히 넘는다.
 * 하드 섀도는 순수 장식(형태 강조)일 뿐 색만으로 의미를 인코딩하지 않는다.
 */

const INK = '#141210'; // 근블랙 잉크 — 아웃라인/엣지/경계/라벨/섀도(크림 대비 ~16:1)
const OUTLINE = 3; // 두꺼운 네오브루탈 아웃라인

// 밝은 flat 채움 — 전부 근블랙 라벨 대비 7:1 이상(AAA). 채도는 높되 명도를 확보한다.
const GOLD = '#F2C230'; // 골드 액센트 (라벨 11.15:1)
const CREAM = '#FBF6E9'; // 페일 크림 (17.32:1)
const CORAL = '#F58C7B'; // 코랄 (7.94:1 — worst-case)
const SKY = '#A9D3E8'; // 스카이 (11.72:1)
const MINT = '#B8E0C8'; // 민트 (12.93:1)
const LILAC = '#D9C7EF'; // 라일락 (11.89:1)
const PALE_GOLD = '#F5D77E'; // 페일 골드 (13.26:1)

// 채움 위 라벨은 언제나 근블랙(INK) — 밝은 flat 채움에서 고대비.
const node = (fill: string, glyph: string, dashed?: boolean) => ({
  fill,
  keyline: INK,
  keylineWidth: OUTLINE,
  tagColor: INK,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'neobrutalist-01',

  canvas: {
    bg: '#F5EEDD', // 크림/페이퍼 그라운드
    grid: '#E7DFC8', // 미세 크림 그리드
    gridUnit: 8,
  },

  // 골드 액센트 + 밝은 flat 컬러 램프 + 근블랙/크림. 전부 파싱 가능한 hex.
  palette: {
    p1: GOLD,
    p2: CORAL,
    p3: SKY,
    p4: MINT,
    p5: LILAC,
    p6: CREAM,
    p7: INK,
    p8: '#E9DFC4', // 웜 샌드 틴트
  },

  // 제네릭 도형 = 크림 채움 + 두꺼운 근블랙 아웃라인.
  shape: {
    fill: CREAM,
    stroke: INK,
    strokeWidth: OUTLINE,
  },

  // kind별 flat 채움(밝은 컬러) + 두꺼운 근블랙 아웃라인 + 근블랙 라벨.
  node: {
    person: node(GOLD, 'user'),
    external: node(CREAM, 'arrowOut', true),
    container: node(SKY, 'stackedRect'),
    database: node(MINT, 'cylinder'),
    queue: node(CORAL, 'bars'),
    decision: node(LILAC, 'diamond'),
    process: node(PALE_GOLD, 'process'),
  },

  // 커넥터 = 두꺼운 근블랙 라인, 샤프 직각(cornerRadius 0), 각진 화살촉.
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
    l1: { borderWidth: 3, bgTint: 'rgba(20,18,16,0.08)', labelColor: INK },
    l2: { borderWidth: 2, bgTint: 'rgba(20,18,16,0.05)', labelColor: INK },
    l3: { borderWidth: 1.5, bgTint: 'transparent', labelColor: INK },
  },

  // 두꺼운 근블랙 경계 프레임 — 샤프 직각(radius 0), 대시 없음.
  boundary: {
    stroke: INK,
    width: 2,
    dashPattern: '',
    radius: 0,
    labelColor: INK,
  },

  typography: {
    titleFont: "'Space Grotesk', 'Archivo', 'Helvetica Neue', Arial, sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 800,
    sizes: {
      title: '15px',
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

// ext 토큰 — 하드 오프셋 섀도 잉크. preset마다 재정의해 colorway 전환 시 섀도 톤이 함께 바뀐다.
// (vvar('ext','shadowInk') → --bbangto-viz-ext-shadow-ink)
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-shadow-ink': INK,
};

/**
 * bold — 액센트 주도(코랄/스카이) colorway. 잉크(아웃라인/엣지/경계/라벨)는 근블랙 유지(네오브루탈 아이덴티티),
 * 그라운드를 페일 크림으로 밝히고 채움을 코랄/스카이 우세로 재배치한다. ink를 넘기지 않아 모든 라벨이 근블랙으로
 * 보존된다(대비 불변 — 채움 집합이 동일해 worst-case 여전히 coral 7.94:1). 섀도는 순수 블랙으로 더 강하게.
 */
const boldFoundations = makeVizColorway(foundations, {
  name: 'neobrutalist-01-bold',
  canvas: { bg: '#FBF6E9', grid: '#EDE4CE' },
  shape: { fill: '#FFFFFF' },
  nodeFills: {
    person: CORAL,
    container: SKY,
    database: LILAC,
    queue: GOLD,
    decision: MINT,
    process: CORAL,
  },
  palette: {
    p1: CORAL,
    p2: SKY,
    p6: '#FFFFFF',
  },
});

const BOLD_EXT: Record<string, string> = {
  '--bbangto-viz-ext-shadow-ink': '#000000',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Gold on Cream',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'bold',
    label: 'Coral × Sky (Bold)',
    foundations: boldFoundations,
    extendedFoundations: BOLD_EXT,
  },
];

/**
 * 네오브루탈 노드 — (1) 본 도형 뒤 +5,+5 근블랙 실루엣을 하드(블러 없는) 오프셋 섀도로 깐다
 * (`<g data-viz-neobrutal-shadow aria-hidden>` 장식, transform 오프셋, 텍스트 없음, id 없음 — 시맨틱 불변),
 * (2) 두꺼운 아웃라인의 실 도형을 그 위에, (3) 라벨(children)은 섀도/도형 밖에서 렌더 →
 * 그림자가 텍스트를 절대 덮지 않는다. 섀도 색은 ext 토큰(shadowInk)이라 colorway 전환에 반응한다.
 */
function NeobrutalistNode({ children, ...rest }: NodeProps) {
  return (
    <>
      {/* (1) 하드 오프셋 섀도 — 근블랙 실루엣(장식, aria-hidden, 텍스트 없음, transform 오프셋). */}
      <g data-viz-neobrutal-shadow="" aria-hidden="true" transform="translate(5, 5)">
        <Node
          {...rest}
          id={undefined}
          fill={vvar('ext', 'shadowInk')}
          stroke="none"
          strokeWidth={0}
        />
      </g>
      {/* (2) 실 도형 — 두꺼운 근블랙 아웃라인(계약 시트가 shape.stroke/strokeWidth 공급). */}
      <Node {...rest} />
      {/* (3) 라벨(children)은 섀도/도형 밖 — 그림자가 텍스트를 덮지 않음. */}
      {children}
    </>
  );
}
NeobrutalistNode.displayName = 'NeobrutalistNode';

/** 타입 태그 — 대문자(네오브루탈 포스터 헤드라인 문법), 근블랙 라벨. */
function NeobrutalistTag(props: TagProps) {
  return <Tag {...props} label={props.label.toUpperCase()} fontSize={10} />;
}
NeobrutalistTag.displayName = 'NeobrutalistTag';

/** 흐름선 라벨 — 크림 칩 배경 + 근블랙 텍스트(하드 섀도 위에서도 또렷). */
function NeobrutalistEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} padding={5} />;
}
NeobrutalistEdgeLabel.displayName = 'NeobrutalistEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: NeobrutalistNode,
  Tag: NeobrutalistTag,
  EdgeLabel: NeobrutalistEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'NeobrutalistShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '크림/페이퍼 그라운드 위 두꺼운 근블랙 아웃라인(3px) + 밝은 flat 채움 + 하드(블러 없는) 오프셋 섀도(+5,+5). 모서리는 샤프(radius 0).',
    dos: [
      '도형은 flat 단색 채움 + 두꺼운 근블랙 아웃라인',
      '섀도는 근블랙 단색 실루엣(+5,+5, 블러 없음)',
      '모서리·직각을 유지(radius 0)',
    ],
    donts: [
      '블러/그라디언트 섀도 금지(네오브루탈 무드 상실)',
      '아웃라인 없는 채움 도형 금지',
      '둥근 모서리 금지(radius 0 유지)',
    ],
  },
  color: {
    summary:
      '골드 액센트 주도 + 밝은 flat 컬러(코랄/스카이/민트/라일락) + 근블랙 잉크. 채움은 전부 명도가 높아 근블랙 라벨이 고대비. colorway 전환(default 골드↔bold 코랄)은 잉크를 근블랙으로 고정한 채 채움/그라운드만 교체한다.',
    dos: [
      '카테고리는 밝은 flat 컬러로 또렷하게 구분',
      '아웃라인/엣지/라벨 잉크는 근블랙으로 고정',
      'colorway 전환은 채움·그라운드 교체로(잉크는 근블랙 유지)',
    ],
    donts: [
      '채도만 높고 어두운 채움 위 근블랙 라벨 금지(대비 미달)',
      '색 단독으로 의미 인코딩 금지(라벨·형태 병기)',
    ],
  },
  typography: {
    summary:
      '기하학 그로테스크 산세리프(굵은 800 타이틀) + mono 수치. 타입 태그는 대문자 포스터 문법. 모든 라벨은 근블랙으로 밝은 채움 위 고대비.',
    dos: ['타이틀 800, 태그 대문자', '수치·값은 mono', '라벨은 근블랙으로 대비 확보'],
    donts: ['얇은 웨이트(400 미만) 타이틀 금지', '밝은 채움 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 근블랙 — 밝은 flat 채움/틴트/캔버스 위 실측 7:1 이상(worst-case 코랄 채움 7.94:1)이라 AAA. 아웃라인/엣지 잉크는 크림 대비 ~16:1. 하드 오프셋 섀도는 순수 장식(형태 강조)이라 텍스트에 얹지 않고 색만으로 의미를 인코딩하지 않는다.',
    dos: [
      '라벨은 근블랙(밝은 채움 위 ≥7:1)',
      '하드 섀도는 장식 — 의미 인코딩에 쓰지 않음',
      '값/카테고리는 라벨·형태로도 병기',
    ],
    donts: [
      '어두운 채움 도입 시 근블랙 라벨 대비 재검증 없이 사용 금지',
      '오프셋 섀도로 카테고리 구분 금지(장식 한정)',
      '색 단독 의미 구분 금지',
    ],
  },
};

export const neobrutalist01VizStyleGuide: VisualizationStyleGuide = {
  name: 'neobrutalist-01',
  description:
    'Neobrutalist paint — cream/paper ground, thick near-black ink outlines, bright flat fills (gold accent led), hard non-blurred offset shadow silhouettes rendered behind each shape, sharp right-angle corners, near-black labels for AAA contrast on light fills.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { NeobrutalistShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '네오브루탈 모티프 — 크림 그라운드 위 두꺼운 근블랙 아웃라인 + 밝은 flat 채움, 본 도형 뒤 하드(블러 없는) 오프셋 섀도, 샤프 직각. 라벨은 근블랙 대문자로 고대비.',
    components: {
      Node: {
        description:
          '본 도형 뒤 +5,+5 근블랙 실루엣이 네오브루탈 특유의 하드 오프셋 입체감을 만든다(블러 없음). NeobrutalistNode가 섀도(aria-hidden 장식, 텍스트 없음)를 transform 오프셋으로 깔고, 두꺼운 아웃라인의 실 도형을 그 위에, 라벨은 섀도/도형 밖에 그린다.',
        specs: [
          'keyline 3px 근블랙',
          '하드 오프셋 섀도: +5,+5 근블랙 단색(data-viz-neobrutal-shadow, ext-shadow-ink)',
          'radius 0 샤프',
        ],
      },
      Tag: {
        description: '타입 태그는 대문자 — 네오브루탈 포스터 헤드라인 문법, 근블랙 라벨.',
        specs: ['PERSON 형식', 'mono 10px', 'fill별 ≥7:1 근블랙 라벨'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 크림 칩 배경 + 근블랙 텍스트 — 하드 섀도 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '패딩 5px', '근블랙'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Neobrutalist_01',
    family: 'viz-neobrutalist',
    summary:
      '크림/페이퍼 위 두꺼운 근블랙 아웃라인 + 밝은 flat 채움 + 하드 오프셋 섀도 + 골드 액센트의 날것 네오브루탈 다이어그램 — 강한 조형 인상이 필요한 에디토리얼·마케팅·크리에이티브에 쓴다.',
    tags: ['raw', 'sharp', 'high-contrast', 'vivid', 'geometric'],
    mood: { formality: 2, energy: 4, warmth: 3, density: 3, ornament: 3 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'bold',
      shadow: 'hard',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['editorial', 'marketing', 'creative-agency', 'portfolio'],
    useWhen: [
      '두꺼운 아웃라인·하드 오프셋 섀도의 날것 네오브루탈 무드로 강한 조형 인상을 줄 때 쓴다.',
      '에디토리얼·마케팅·포트폴리오 인포그래픽에서 각지고 개성 있는 도식이 필요할 때 쓴다.',
      '골드 액센트 + 밝은 flat 컬러로 눈에 띄는 포스터형 다이어그램을 만들 때 쓴다.',
    ],
    avoidWhen: [
      '기업 아키텍처·기술 스키매틱처럼 절제되고 중립적인 도식이 필요할 때 피한다.',
      '데이터 밀도가 매우 높아 두꺼운 아웃라인·오프셋 섀도가 시각적 잡음이 될 때 피한다.',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(라이트 전용).',
    ],
    accessibility: {
      contrastIntent: 'aaa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['bauhaus-geometric-01', 'colorful-flat-01'],
  },
};
