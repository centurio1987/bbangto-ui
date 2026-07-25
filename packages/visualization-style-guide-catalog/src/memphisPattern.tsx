import React, { useId } from 'react';
import type {
  VisualizationFoundation,
  VizFoundationPreset,
} from '@centurio1987/bbangto-ui-tokens';
import {
  Node,
  Tag,
  EdgeLabel,
  vvar,
  useVizDefsPrefix,
  type NodeProps,
  type TagProps,
  type EdgeLabelProps,
  type VisualizationStyleGuide,
  type VizWrapperComponents,
} from '@centurio1987/bbangto-ui-visualization';
import { makeVizColorway } from './_foundation';
import { makeVizShowcase } from './_showcase';
import { useVizMotifStyle } from './_motif';

/**
 * Memphis_Pattern_01 — 80s 멤피스 포스트모던 패턴(지그재그·도트·스퀴글 테라조 콘페티 + 하드 오프셋 섀도).
 * 근거: viz-style-expansion.md P2 1:1 family(라이트 오프화이트 그라운드 + 볼드 프라이머리×파스텔
 * 클래시 플랫 + 흩뿌린 멤피스 모티프 콘페티 + 비블러 하드 오프셋 섀도). 1:1 고유 family(viz-memphis-pattern).
 *
 * 시그니처 = **멤피스 콘페티**: SVG `<pattern>`(작은 지그재그·도트·스퀴글)을 **도형에만** 장식 텍스처로
 * 덧씌운다. 텍스트/라벨엔 절대 걸지 않는다(가독성·접근성) — HalftonePrintNode 선례와 동형:
 *  - 콘페티 오버레이: MemphisPatternNode가 실 도형 위에 같은 도형을 `url(#confetti)` 패턴으로 채운
 *    장식 그룹(`data-viz-memphis`, aria-hidden, 텍스트 없음)을 덧댄다. 패턴 사이 여백으로 아래 플랫
 *    채움이 배어나 콘페티가 흩뿌려진 톤이 형성된다(정보 인코딩 아님 — 순수 멤피스 질감 장식).
 *  - 하드 오프셋 섀도: MemphisPatternNode가 실 도형 앞에 같은 도형을 4px 오프셋한 비블러 복제
 *    섀도(`data-viz-memphis-shadow`, aria-hidden)를 뒤에 깐다(멤피스 특유의 하드 그림자, 정보 아님).
 *  - 라벨(children)은 콘페티/섀도 그룹 밖에서 렌더 → 패턴이 텍스트를 절대 왜곡하지 않는다.
 *
 * 접근성: 모든 라인/윤곽/라벨 잉크는 near-black `#191624` — 라이트 오프화이트 그라운드 대비 16.61:1.
 * 노드 플랫 채움(코럴/시안/옐로/민트/라일락/크림)은 전부 다크 잉크 라벨 대비 6.19:1 이상(aa 4.5 상회,
 * auditVizContrast 게이트). 볼드 프라이머리는 스와치·채움에만 쓰고 라인/텍스트 잉크로는 near-black 통일.
 */

const CANVAS = '#FAF7F0'; // 라이트 오프화이트 그라운드
const INK = '#191624'; // near-black 잉크 — 모든 라인/윤곽/텍스트 라벨(그라운드 대비 16.61:1)

// 멤피스 볼드 플랫(다크 라벨이 얹히도록 밝게 유지 — 각 색 vs 잉크 ≥6.19:1).
const CYAN = '#5BC8E8'; // 시안 (9.20:1)
const CORAL = '#F58BA0'; // 코럴 (7.69:1)
const YELLOW = '#F6D24B'; // 옐로 (12.05:1)
const MINT = '#8FD9B6'; // 민트 (10.81:1)
const LILAC = '#C9A9E9'; // 라일락 (8.75:1)
const CREAM = '#FBEFD6'; // 크림 (15.59:1)
const PALE_PINK = '#F0B7D2'; // 페일 핑크 (10.50:1)

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK,
  keylineWidth: 1.8,
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'memphis-pattern-01',

  canvas: {
    bg: CANVAS,
    grid: '#EDE7DA', // 미세 오프화이트 그리드
    gridUnit: 8,
  },

  // 멤피스 볼드 프라이머리 + 파스텔 램프(스와치 — 라인/텍스트 잉크로 쓰지 않음).
  palette: {
    p1: '#F04E8C', // 핫 핑크
    p2: '#2AA8D4', // 시안
    p3: '#F6C324', // 옐로
    p4: '#F5768F', // 코럴
    p5: '#57C79A', // 민트
    p6: '#A879D6', // 라일락
    p7: INK, // near-black 잉크
    p8: CREAM, // 크림
  },

  // 제네릭 도형 채움 = 시안 플랫, 윤곽 = 잉크 볼드 라인.
  shape: {
    fill: CYAN,
    stroke: INK,
    strokeWidth: 1.8,
  },

  // kind별 멤피스 플랫 채움(솔리드) + 잉크 볼드 윤곽 + 다크 잉크 라벨.
  node: {
    person: node(CORAL, 'user'),
    external: node(CYAN, 'arrowOut', { dashed: true }),
    container: node(LILAC, 'stackedRect'),
    database: node(MINT, 'cylinder'),
    queue: node(YELLOW, 'bars'),
    decision: node(CREAM, 'diamond'),
    process: node(PALE_PINK, 'process'),
  },

  // 잉크 볼드 라인 + 소형 화살촉.
  edge: {
    stroke: INK,
    width: 1.8,
    dashPattern: '',
    cornerRadius: 2,
    marker: {
      size: 8,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(91,200,232,0.10)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(245,139,160,0.08)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 멤피스 딥 핑크 대시 경계(비텍스트 장식).
  boundary: {
    stroke: '#D14D8B', // 딥 핑크 경계선(그라운드 대비 3.81:1, 비텍스트)
    width: 1.8,
    dashPattern: '6 4',
    radius: 2,
    labelColor: INK,
  },

  typography: {
    titleFont: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 700,
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

// 쇼케이스 표면용 흩뿌린 멤피스 콘페티 텍스처(48×48 타일 — 지그재그·스퀴글·도트, 저알파) —
// 데이터 URI, 결정론적(PRNG 없음). 도형 위 실 콘페티 스크린은 MemphisPatternNode wrapper가 별도 적용한다.
const CONFETTI_BG_DEFAULT =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g fill='none' stroke='%23191624' stroke-opacity='0.10' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 11 L11 6 L16 11 L21 6'/><path d='M28 36 q4 -6 8 0 t8 0'/></g><circle cx='38' cy='11' r='2.4' fill='%23F5768F' fill-opacity='0.18'/><circle cx='11' cy='38' r='1.8' fill='%235BC8E8' fill-opacity='0.20'/></svg>\")";

const CONFETTI_BG_NEON =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g fill='none' stroke='%23191624' stroke-opacity='0.10' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 11 L11 6 L16 11 L21 6'/><path d='M28 36 q4 -6 8 0 t8 0'/></g><circle cx='38' cy='11' r='2.4' fill='%235BC8E8' fill-opacity='0.22'/><circle cx='11' cy='38' r='1.8' fill='%23F5768F' fill-opacity='0.20'/></svg>\")";

const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-confetti-bg': CONFETTI_BG_DEFAULT,
  '--bbangto-viz-ext-confetti-a': INK, // 콘페티 지그재그·도트(다크)
  '--bbangto-viz-ext-confetti-b': '#E23E7B', // 콘페티 스퀴글·도트(마젠타 팝)
  '--bbangto-viz-ext-shadow': '#2A2440', // 하드 오프셋 섀도(다크 인디고)
};

/** neon — 시안/코럴 리드 colorway(쿨 오프화이트 그라운드 + near-black 잉크 유지). */
const neonFoundations = makeVizColorway(foundations, {
  name: 'memphis-pattern-01-neon',
  // ink 미지정 → 라인/윤곽/경계/라벨은 base near-black 잉크 유지(멤피스는 라이트 전용, 잉크 불변).
  canvas: { bg: '#F3F8FB', grid: '#E1EDF3' },
  shape: { fill: CYAN },
  nodeFills: {
    person: CYAN, // 시안 리드
    external: CORAL, // 코럴 리드
    container: '#3FB6DB', // 시안 스트롱 (7.55:1)
    database: '#F26D88', // 코럴 스트롱 (6.19:1)
    queue: '#7FD6EE', // 페일 시안 (10.80:1)
    decision: CREAM,
    process: '#F5A9BE', // 페일 코럴 (9.56:1)
  },
  palette: {
    p1: '#12A5D8', // 시안 리드
    p2: '#F0507A', // 코럴 리드
    p3: '#7FD6EE',
    p4: '#F5768F',
    p6: '#3FB6DB',
    p8: '#E7F4FB',
  },
});

const NEON_EXT: Record<string, string> = {
  '--bbangto-viz-ext-confetti-bg': CONFETTI_BG_NEON,
  '--bbangto-viz-ext-confetti-a': INK,
  '--bbangto-viz-ext-confetti-b': '#12A5D8', // 시안 팝
  '--bbangto-viz-ext-shadow': '#123A4D', // 하드 오프셋 섀도(다크 틸)
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Memphis Confetti',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'neon',
    label: 'Cyan × Coral Neon',
    foundations: neonFoundations,
    extendedFoundations: NEON_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-memphis-pattern-01';
// 쇼케이스 표면엔 그라운드 유지 + 흩뿌린 멤피스 콘페티 오버레이(텍스트 무영향).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="memphis-pattern-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: var(--bbangto-viz-ext-confetti-bg) !important;
  background-repeat: repeat !important;
}
`;

/**
 * 멤피스 노드 — (1) 하드 오프셋 섀도(4px 비블러 복제, aria-hidden) 위에
 * (2) 실 도형(멤피스 플랫 솔리드 채움 + 잉크 볼드 윤곽), 그 위에
 * (3) 같은 도형을 멤피스 콘페티 `<pattern>`(지그재그·도트·스퀴글)으로 채운 장식 오버레이
 * (`data-viz-memphis`, aria-hidden)를 덧댄다. 라벨(children)은 오버레이 밖에서 렌더 → 콘페티가
 * 텍스트를 절대 왜곡하지 않는다. id는 Provider defsPrefix + useId로 유일(halftone/riso 선례와 동형).
 */
function MemphisPatternNode({ children, ...rest }: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const pid = `${prefix}-memphis-confetti-${uid}`;
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const fill = rest.fill ?? vvar('shape', 'fill');
  return (
    <>
      <defs>
        {/* 멤피스 콘페티 — 지그재그·도트·스퀴글 흩뿌림(patternUnits=userSpaceOnUse, 결정론적). */}
        <pattern
          id={pid}
          patternUnits="userSpaceOnUse"
          width={26}
          height={26}
          patternTransform="rotate(6)"
        >
          <circle cx={5} cy={6} r={2.2} fill={vvar('ext', 'confettiA')} />
          <circle cx={19} cy={18} r={1.6} fill={vvar('ext', 'confettiB')} />
          <path
            d="M2 20 L6 16 L10 20 L14 16"
            fill="none"
            stroke={vvar('ext', 'confettiA')}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 6 q3 -4 6 0 t6 0"
            fill="none"
            stroke={vvar('ext', 'confettiB')}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      {/* (1) 하드 오프셋 섀도 — 비블러 복제(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-memphis-shadow="" aria-hidden="true" transform="translate(4, 4)">
        <Node {...rest} fill={vvar('ext', 'shadow')} stroke="none" strokeWidth={0} />
      </g>
      {/* (2) 실 도형 — 멤피스 플랫 솔리드 채움 + 잉크 볼드 윤곽. */}
      <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 1.8} />
      {/* (3) 콘페티 오버레이 — 같은 도형을 멤피스 <pattern>으로 채워 도형 위에만(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-memphis="" aria-hidden="true">
        <Node {...rest} fill={`url(#${pid})`} stroke="none" strokeWidth={0} />
      </g>
      {children}
    </>
  );
}
MemphisPatternNode.displayName = 'MemphisPatternNode';

/** 멤피스 태그 — 다크 잉크 라벨(콘페티/섀도 미적용). */
function MemphisPatternTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
MemphisPatternTag.displayName = 'MemphisPatternTag';

/** 흐름선 라벨 — 그라운드 칩 배경 + 다크 잉크(콘페티 위 가독성). */
function MemphisPatternEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
MemphisPatternEdgeLabel.displayName = 'MemphisPatternEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: MemphisPatternNode,
  Tag: MemphisPatternTag,
  EdgeLabel: MemphisPatternEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'MemphisPatternShowcase' });

/** 쇼케이스 — 모티프 CSS(콘페티 그라운드)를 주입한 뒤 공용 씬 렌더. */
function MemphisPatternShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
MemphisPatternShowcase.displayName = 'MemphisPatternShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '라이트 오프화이트 그라운드 위 멤피스 볼드 플랫 솔리드 채움 + 하드(비블러) 오프셋 섀도. 지그재그·도트·스퀴글 콘페티는 도형에만 덧대는 결정론적 장식(<pattern>).',
    dos: [
      '채움은 볼드 프라이머리×파스텔 클래시 솔리드 플랫',
      '섀도는 하드 오프셋(비블러) 복제 — 4px',
      '콘페티는 도형에만 — 결정론적 지그재그·도트·스퀴글(<pattern>)',
    ],
    donts: [
      '소프트 블러 섀도 금지(멤피스 하드 그림자 무드 상실)',
      '콘페티에 정보 인코딩 금지(순수 멤피스 질감 장식)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '80s 멤피스 볼드 프라이머리(시안·코럴·옐로) × 파스텔(민트·라일락·크림) 클래시. neon preset은 시안×코럴 리드로 축소.',
    dos: [
      '볼드 프라이머리와 파스텔을 대담하게 클래시',
      'colorway 전환은 리드 색 교체로(default 멀티컬러 / neon 시안×코럴)',
      '라인/텍스트는 near-black 잉크로 통일',
    ],
    donts: [
      '볼드 플랫을 라인/텍스트 잉크로 금지(near-black 잉크만)',
      '저채도 뮤트 팔레트로 순화 금지(멤피스 활기 상실)',
    ],
  },
  typography: {
    summary:
      '그로테스크 산세리프(볼드) 타이틀 + mono 수치. 모든 라벨은 near-black 잉크로 콘페티·플랫 채움 위에서도 고대비.',
    dos: ['타이틀은 볼드 그로테스크 산세리프', '수치·값은 mono', '라벨은 near-black 잉크로 대비 확보'],
    donts: ['라벨에 콘페티 패턴 적용 금지(가독성)', '볼드 플랫 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 near-black 잉크 — 볼드 플랫 채움(각 색 ≥6.19:1)·라이트 그라운드(16.61:1) 위에서 4.5:1 이상(auditVizContrast 게이트, aa 상회). 콘페티·하드 섀도는 전부 [data-viz-memphis*] aria-hidden 장식으로 텍스트에 미적용.',
    dos: [
      '라벨은 near-black 잉크(플랫 채움 위 ≥4.5:1)',
      '콘페티/하드 섀도는 도형에만 — 텍스트 제외(aria-hidden)',
      '값 인코딩은 색뿐 아니라 라벨/형태로 병기',
    ],
    donts: [
      '볼드 플랫·경계 색을 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '콘페티 패턴으로 의미 구분 금지(장식 한정)',
      '하드 섀도 오프셋으로 정보 인코딩 금지(장식 한정)',
    ],
  },
};

export const memphisPattern01VizStyleGuide: VisualizationStyleGuide = {
  name: 'memphis-pattern-01',
  description:
    '80s Memphis postmodern pattern — light off-white ground, bold primary × pastel clash solid flats, scattered zigzag/dot/squiggle terrazzo confetti (SVG <pattern>) overlaid on shapes only, and a hard (non-blurred) offset shadow, with near-black ink for all lines and labels for AA contrast on the flat fills.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { MemphisPatternShowcase: MemphisPatternShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '멤피스 패턴 모티프 — 라이트 그라운드 위 볼드 플랫 클래시 + 하드 오프셋 섀도, 지그재그·도트·스퀴글 콘페티(도형 한정 장식), near-black 잉크 라벨.',
    components: {
      Node: {
        description:
          '도형은 멤피스 볼드 플랫 솔리드로 채워지고 뒤에 하드(비블러) 오프셋 섀도가 깔린다. MemphisPatternNode가 같은 도형을 지그재그·도트·스퀴글 <pattern>으로 채운 콘페티 오버레이(aria-hidden)를 도형 위에만 덧댄다 — 라벨은 오버레이 밖.',
        specs: [
          'fill = 멤피스 볼드 플랫(솔리드 hex)',
          'hard offset shadow 4px (data-viz-memphis-shadow, aria-hidden)',
          'confetti <pattern id=<prefix>-memphis-confetti-<uid>>, 지그재그·도트·스퀴글',
        ],
      },
      Tag: {
        description: '타입 태그는 near-black 잉크 라벨 — 콘페티/섀도 미적용(가독성).',
        specs: ['near-black 잉크', '10px', '플랫 채움 위 ≥4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 그라운드 칩 배경 + near-black 잉크로 콘페티 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', 'near-black 잉크'],
      },
    },
    example: MemphisPatternShowcase as React.FC,
  },
  meta: {
    displayName: 'Memphis_Pattern_01',
    family: 'viz-memphis-pattern',
    summary:
      '라이트 그라운드 + 볼드 프라이머리×파스텔 클래시 플랫 + 지그재그·도트·스퀴글 콘페티 + 하드 오프셋 섀도의 80s 멤피스 포스트모던 인포그래픽 페인트.',
    tags: ['playful', 'geometric', 'vivid', 'retro', 'high-contrast'],
    mood: { formality: 1, energy: 5, warmth: 3, density: 4, ornament: 5 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'bold',
      shadow: 'hard',
      density: 'dense',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['marketing', 'entertainment', 'kids', 'creative-agency'],
    useWhen: [
      '마케팅·엔터테인먼트 인포그래픽을 80s 멤피스(볼드 플랫 + 콘페티 + 하드 섀도)의 활기찬 무드로 낼 때 쓴다.',
      '지그재그·도트·스퀴글 콘페티와 하드 오프셋 섀도로 레트로 포스트모던 감성을 주고 싶을 때 쓴다.',
      '키즈·크리에이티브 에이전시 비주얼에서 대담하고 장난스러운 인상이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F2/Swiss를 쓴다).',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(F7을 쓴다).',
      '저채도 절제·미니멀 톤이 우선일 때 피한다(고채도 볼드 클래시).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'bauhaus-geometric-01'],
  },
};
