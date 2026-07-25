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
 * Ukiyoe_Flat_01 — 웜 와시(washi) 페이퍼 위 **흙빛 flat 색면** + 굵은 **스미(먹) 먹선 컨투어**의
 * 일본 목판화(우키요에) 페인트 패밀리(1:1 고유 family, KAN-039). 차분·전통·평면.
 *
 * ⚠️ 저대비 리스크 패밀리 — 대비 계약을 정직하게 지킨다.
 *   흙빛 뮤트 톤은 중간 명도라 색면 위 라벨 대비가 리스크다. 그래서 **채움(node.fill)은 전부
 *   밝은 뮤트 틴트**(pale indigo/ochre/clay/sage/plum)로만 쓰고, **채도 높은 흙빛 원톤**
 *   (indigo #2E4A6B · ochre #C99A3B · clay-red #B5533E · sage #6E7F5B · plum #7A5A6B)은
 *   `palette`(스와치·라벨 없는 외부 요소)에만 둔다. 모든 라벨은 스미 먹(#211C18) 단색 —
 *   각 밝은 틴트 fill 위 실측 8.8:1 이상, 페이퍼 위 13.2:1(auditVizContrast 게이트 통과).
 *   측정치는 넉넉하지만 흙빛 뮤트 무드는 시각적으로 medium-contrast이므로 contrastIntent 는
 *   보수적으로 **aa**(과대주장 금지). CI 감사는 over-claim을 하드 실패시키므로 aa로 정직 선언한다.
 *
 * 시그니처(장식·텍스트 무영향): UkiyoeFlatNode가 스미 먹선을 1.5px 오프셋 복제한 굵은 컨투어
 * (data-viz-ukiyoe, aria-hidden, 텍스트 없음)를 실 도형 뒤에 깔아 목판 특유의 두툼한 윤곽·미세
 * 레지스트레이션을 준다. 라벨(children)은 데코 밖에서 렌더 → 텍스트를 절대 건드리지 않는다.
 */

const SUMI = '#211C18'; // 스미(먹) 근블랙 잉크 — 모든 라인/윤곽/라벨(페이퍼 위 13.2:1)
const PAPER = '#ECE3CE'; // 웜 와시 페이퍼 캔버스
const OUTLINE = 1.75; // 굵은 목판 먹선 컨투어

// 채움 = 밝은 뮤트 흙빛 틴트(전부 스미 라벨과 ≥8.8:1). 채도 높은 원톤은 palette 에만.
const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: SUMI,
  keylineWidth: OUTLINE,
  tagColor: SUMI,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'ukiyoe-flat-01',

  canvas: {
    bg: PAPER,
    grid: '#E2D8BF', // 미세 와시 그리드
    gridUnit: 8,
  },

  // 채도 높은 흙빛 원톤 램프 — 스와치/링/도트 등 라벨 없는 외부 요소 전용(면 위 텍스트 없음).
  palette: {
    p1: '#2E4A6B', // 인디고(아이(藍))
    p2: '#C99A3B', // 오커(황토)
    p3: '#B5533E', // 클레이 레드(붉은 흙)
    p4: '#6E7F5B', // 세이지(쑥빛)
    p5: '#7A5A6B', // 플럼(자줏빛)
    p6: SUMI, // 스미 먹
    p7: '#D8C9A8', // 웜 페이퍼 액센트
    p8: PAPER, // 와시 페이퍼
  },

  // 제네릭 도형 채움 = 페일 샌드 틴트, 윤곽 = 스미 먹선.
  shape: {
    fill: '#E7DCC0',
    stroke: SUMI,
    strokeWidth: OUTLINE,
  },

  // kind별 밝은 뮤트 흙빛 틴트 채움 + 스미 먹선 윤곽 + 스미 먹 라벨(각 fill 위 실측 ≥8.8:1).
  node: {
    person: node('#E3B9A6', 'user'), // 페일 클레이 — 스미 9.45:1
    external: node('#E7DCC0', 'arrowOut', { dashed: true }), // 페일 샌드 — 스미 12.38:1
    container: node('#B9C4CE', 'stackedRect'), // 페일 인디고 — 스미 9.53:1
    database: node('#C4CDAF', 'cylinder'), // 페일 세이지 — 스미 10.21:1
    queue: node('#E4CF9E', 'bars'), // 페일 오커 — 스미 11.03:1
    decision: node('#CBB6C0', 'diamond'), // 페일 플럼 — 스미 8.84:1
    process: node('#CBD3DC', 'process'), // 페일 스카이-인디고 — 스미 11.17:1
  },

  // 스미 먹선 커넥터 + 소형 화살촉.
  edge: {
    stroke: SUMI,
    width: OUTLINE,
    dashPattern: '',
    cornerRadius: 4,
    marker: {
      size: 8,
      arrow: SUMI,
      diamond: SUMI,
      circle: SUMI,
      cross: SUMI,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(46,74,107,0.08)', labelColor: SUMI },
    l2: { borderWidth: 1.5, bgTint: 'rgba(46,74,107,0.05)', labelColor: SUMI },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: SUMI },
  },

  // 뮤트 클레이 레드 대시 경계(비텍스트 장식). 라벨은 스미 먹.
  boundary: {
    stroke: '#A85841',
    width: 1.5,
    dashPattern: '5 4',
    radius: 3,
    labelColor: SUMI,
  },

  typography: {
    titleFont: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 600,
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

const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-sumi': SUMI, // 오프셋 먹선 컨투어 잉크
};

/**
 * dusk — 플럼×세이지 우세의 황혼 colorway(더 어둑한 와시 페이퍼 + 뮤트 자줏/쑥빛 틴트).
 * ink 를 넘기지 않아 keyline/edge/boundary/shape.stroke/tagColor 는 base 스미 그대로 보존 —
 * 채움만 갈아끼운 색 스킴 변형. 각 dusk 틴트도 스미 라벨과 ≥8.8:1(실측 검증).
 */
const duskFoundations = makeVizColorway(foundations, {
  name: 'ukiyoe-flat-01-dusk',
  canvas: { bg: '#E1D8C8', grid: '#D6CCBB' },
  nodeFills: {
    person: '#CBB6C0', // 페일 플럼 — 스미 8.84:1
    external: '#DDD3C4', // 더스크 샌드 — 스미 11.41:1
    container: '#C4CDAF', // 페일 세이지 — 스미 10.21:1
    database: '#B6C4C0', // 더스티 블루-세이지 — 스미 9.36:1
    queue: '#D3BCC6', // 뮤트 모브 — 스미 9.47:1
    decision: '#C9CFB4', // 페일 세이지-2 — 스미 10.50:1
    process: '#C6BECF', // 더스티 라일락 — 스미 9.38:1
  },
  palette: {
    p1: '#7A5A6B', // 플럼(우세)
    p2: '#6E7F5B', // 세이지
    p4: '#5A6B82', // 더스크 인디고
    p8: '#E1D8C8', // 더스크 와시
  },
});

const DUSK_EXT: Record<string, string> = {
  '--bbangto-viz-ext-sumi': SUMI,
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Indigo × Ochre (Woodblock)',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'dusk',
    label: 'Dusk (Plum × Sage)',
    foundations: duskFoundations,
    extendedFoundations: DUSK_EXT,
  },
];

const CONTOUR_BOOST = 1; // 스미 컨투어 덧선 굵기 가산

/**
 * 우키요에 노드 — 실 도형 뒤에 스미 먹선을 1.5px 오프셋 복제한 **굵은 목판 컨투어**를 깐다
 * (data-viz-ukiyoe, aria-hidden, 텍스트 없음 — 순수 장식·정보 인코딩 아님). 두툼한 윤곽과 미세
 * 레지스트레이션 오프셋이 목판화 특유의 손맛을 준다. 라벨(children)은 데코 밖에서 렌더.
 */
function UkiyoeFlatNode({ children, strokeWidth, ...rest }: NodeProps) {
  const base = typeof strokeWidth === 'number' ? strokeWidth : OUTLINE;
  return (
    <>
      {/* (1) 시그니처 — 오프셋 스미 먹선 컨투어(장식, aria-hidden, 텍스트 없음). */}
      <Node
        {...rest}
        id={undefined}
        x={rest.x + 1.5}
        y={rest.y + 1.5}
        fill="none"
        stroke={vvar('ext', 'sumi')}
        strokeWidth={base + CONTOUR_BOOST}
        data-viz-ukiyoe=""
        aria-hidden="true"
      />
      {/* (2) 실 도형 — 흙빛 flat 색면 + 스미 먹선(contract 기본). */}
      <Node {...rest} strokeWidth={strokeWidth} />
      {/* 라벨(children)은 데코 밖(위)에서 렌더 — 오프셋 컨투어가 텍스트를 건드리지 않는다. */}
      {children}
    </>
  );
}
UkiyoeFlatNode.displayName = 'UkiyoeFlatNode';

/** 타입 태그 — 스미 먹 라벨(장식 미적용). */
function UkiyoeTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
UkiyoeTag.displayName = 'UkiyoeTag';

/** 흐름선 라벨 — 와시 페이퍼 칩 배경 + 스미 먹(색면 위 가독성). */
function UkiyoeEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
UkiyoeEdgeLabel.displayName = 'UkiyoeEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: UkiyoeFlatNode,
  Tag: UkiyoeTag,
  EdgeLabel: UkiyoeEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'UkiyoeFlatShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '웜 와시 페이퍼 위 흙빛 flat 색면 + 굵은 스미 먹선 컨투어. 미세 오프셋 레지스트레이션이 목판 손맛을 준다(장식). 그림자 없음.',
    dos: [
      '도형은 뮤트 흙빛 flat 단색 채움',
      '윤곽은 굵은 스미 먹선(1.75px) + 오프셋 컨투어',
      '색면은 절제된 흙빛 톤으로 차분하게',
    ],
    donts: [
      '그라디언트/블러/드롭섀도 금지(평면 목판 무드 상실)',
      '오프셋 컨투어에 정보 인코딩 금지(순수 장식)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '채움은 밝은 뮤트 흙빛 틴트(인디고·오커·클레이·세이지·플럼의 페일 톤)만 사용한다. 채도 높은 흙빛 원톤은 palette 스와치(라벨 없는 외부 요소)에만 둔다.',
    dos: [
      '채도 높은 흙빛 원톤은 팔레트 스와치/링/도트 등 외부 요소에만',
      '면 위 텍스트는 스미 먹 단색',
      'colorway 전환은 흙빛 쌍 교체로(default 인디고×오커 / dusk 플럼×세이지)',
    ],
    donts: [
      '채도 높은 흙빛 원톤을 채움으로 금지(중간 명도 → 라벨 저대비)',
      '색면 위 흙빛/저대비 텍스트 금지',
      '색 단독으로 의미 인코딩 금지(라벨·형태 병기)',
    ],
  },
  typography: {
    summary:
      '전통 명조(Mincho/세리프) 타이틀 + mono 수치. 모든 라벨은 스미 먹 단색으로 밝은 색면 위 고대비.',
    dos: ['타이틀은 명조 계열 세리프', '수치·값은 mono', '라벨은 스미 먹으로 대비 확보'],
    donts: ['라벨에 오프셋 컨투어 장식 적용 금지(가독성)', '흙빛 색면 톤 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 스미 먹 — 밝은 흙빛 틴트 fill 위 실측 8.8:1 이상, 페이퍼 위 13.2:1(auditVizContrast 게이트). 흙빛 뮤트 무드는 시각적으로 medium-contrast이므로 contrastIntent는 보수적으로 aa로 선언한다(과대주장 금지). 오프셋 컨투어는 aria-hidden 장식으로 텍스트 미적용.',
    dos: [
      '라벨은 스미 먹(밝은 틴트 fill 위 ≥4.5:1)',
      '채움 fill 신규 추가 시 스미 라벨과 4.5:1 실측 검증',
      '값 인코딩은 색뿐 아니라 라벨·형태로 병기',
    ],
    donts: [
      '채도 높은 흙빛 원톤을 라벨 배경(채움)으로 금지(대비 미달)',
      '오프셋 컨투어로 의미 구분 금지(장식 한정)',
      'aaa 과대주장 금지(뮤트 패밀리 — aa 정직 선언)',
    ],
  },
};

export const ukiyoeFlat01VizStyleGuide: VisualizationStyleGuide = {
  name: 'ukiyoe-flat-01',
  description:
    'Ukiyo-e woodblock paint family — warm washi paper ground, earthy muted flat color planes (light indigo/ochre/clay/sage/plum tints) contoured by a bold sumi-ink outline with a subtle registration offset (decorative, shape-only), saturated earth tones reserved for palette swatches, sumi-ink labels for honest AA contrast on the light tints.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { UkiyoeFlatShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '우키요에 목판 모티프 — 웜 와시 페이퍼 위 흙빛 flat 색면 + 굵은 스미 먹선 컨투어(미세 오프셋 레지스트레이션 장식), 스미 먹 라벨. 채도 높은 흙빛 원톤은 팔레트에만.',
    components: {
      Node: {
        description:
          '도형은 밝은 뮤트 흙빛 틴트 flat 면으로 채워지고 굵은 스미 먹선으로 윤곽진다. UkiyoeFlatNode가 스미 먹선을 1.5px 오프셋 복제한 굵은 컨투어(aria-hidden, 텍스트 없음)를 뒤에 깔아 목판 손맛을 준다 — 라벨은 데코 밖.',
        specs: [
          'fill = 밝은 뮤트 흙빛 틴트',
          'keyline 1.75px 스미 먹선',
          '오프셋 컨투어: +1.5,+1.5 스미 덧선(data-viz-ukiyoe, 장식)',
        ],
      },
      Tag: {
        description: '타입 태그는 스미 먹 라벨 — 오프셋 컨투어 장식 미적용(가독성).',
        specs: ['스미 먹 단색', '10px', '밝은 틴트 fill 위 ≥4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 와시 페이퍼 칩 배경 + 스미 먹으로 색면 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '스미 먹 단색'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Ukiyoe_Flat_01',
    family: 'viz-ukiyoe-flat',
    summary:
      '웜 와시 페이퍼 + 흙빛 뮤트 flat 색면 + 굵은 스미 먹선 컨투어의 일본 목판화(우키요에) 인포그래픽 페인트 — 차분·전통·평면.',
    tags: ['muted', 'flat', 'textured', 'retro', 'light'],
    mood: { formality: 3, energy: 2, warmth: 4, density: 2, ornament: 3 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'bold',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'medium',
    },
    domains: ['editorial', 'creative-agency', 'marketing', 'portfolio'],
    useWhen: [
      '에디토리얼·포트폴리오 인포그래픽을 우키요에(목판화)의 흙빛 flat 색면 + 스미 먹선 무드로 낼 때 쓴다.',
      '차분하고 전통적인 아날로그 인상을 절제된 흙빛 뮤트 팔레트로 주고 싶을 때 쓴다.',
      '크리에이티브 에이전시·마케팅 비주얼에서 일본 목판화풍의 차별적 감성이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F2를 쓴다).',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(이 가이드는 라이트 전용).',
      '고채도·고에너지 팝 임팩트가 필요할 때 피한다(뮤트 흙빛 절제 무드).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'ink-line-duotone-01'],
  },
};
