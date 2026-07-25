import React from 'react';
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
import { useVizMotifStyle } from './_motif';

/**
 * Kawaii_Pastel_01 — 파스텔 라이트 그라운드 + 소프트/퍼피 도형 위에 얹은 귀여운
 * **마스코트 글리프** 데코레이션(Tier B, viz-soft-puffy family). 근거: KAN-038.
 *
 * 새 데코레이션 1종: **mascot glyph**. KawaiiNode가 노드 bbox(x/y/width/height)로부터
 * 작은 카와이 얼굴(눈 두 점 + 미소 아크 + 볼터치 + 반짝임)을 계산해 우상단 코너에
 * `<g data-viz-kawaii-mascot>`(aria-hidden) 형제 데코로 그린다. HudNode의 corner-bracket과
 * 동형(지오메트리 불변, 순수 장식). 코어/headless 무변경 — 이 파일 안에서만 산다.
 * 글리프 안에는 **텍스트가 없다**. 라벨(children)은 실 Node 안에서 정상 렌더 → 데코의 영향 0.
 *
 * 소프트 퍼피 무드: 라운드 코너 + 소프트 드롭섀도(파스텔 스티커 느낌)는 CSS 모티프로
 * `[data-viz-part="shape"]`에만 스코프(텍스트 무영향). 쇼케이스 표면엔 은은한 파스텔 폴카닷.
 *
 * 접근성(aa): 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 소프트
 * 다크 플럼 잉크(#43303C)로 라이트 파스텔 위에서 9:1 이상(auditVizContrast 게이트 통과).
 * 마스코트/폴카닷/드롭섀도는 전부 데코라 텍스트에 얹지 않는다.
 */

const INK = '#43303C'; // 소프트 다크 플럼 잉크 — 라인/윤곽 + 모든 텍스트 라벨(파스텔 위 ≥9:1)

// kind별 파스텔 솔리드 채움 + 다크 플럼 윤곽 + 다크 플럼 태그. 전부 라이트 → 다크 라벨 안전.
const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK,
  keylineWidth: 1.5,
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'kawaii-pastel-01',

  canvas: {
    bg: '#FFF1F6', // 파스텔 핑크 그라운드
    grid: '#FBE0EC', // 미세 파스텔 핑크 그리드
    gridUnit: 8,
  },

  // 파스텔 램프(핑크·블루·라일락·민트·피치·옐로) + 다크 잉크. 스와치는 조금 더 채도를 준다.
  palette: {
    p1: '#FF9EC4', // 파스텔 핑크
    p2: '#8FB8FF', // 파스텔 블루
    p3: '#B9A3FF', // 파스텔 라일락
    p4: '#6FD8B4', // 파스텔 민트
    p5: '#FFC38A', // 파스텔 피치
    p6: '#FFE066', // 파스텔 옐로
    p7: INK, // 다크 플럼 잉크
    p8: '#FFF6FA', // 페일 핑크
  },

  // 제네릭 도형 채움 = 파스텔 핑크, 윤곽 = 다크 플럼 잉크.
  shape: {
    fill: '#FFD3E2',
    stroke: INK,
    strokeWidth: 1.5,
  },

  // kind별 파스텔 솔리드 채움 + 다크 플럼 윤곽 + 다크 플럼 라벨.
  node: {
    person: node('#FFD3E2', 'user'), // 파스텔 핑크
    external: node('#CFE4FF', 'arrowOut', { dashed: true }), // 파스텔 블루
    container: node('#E7DBFF', 'stackedRect'), // 파스텔 라일락
    database: node('#C7F2E1', 'cylinder'), // 파스텔 민트
    queue: node('#FFE1C2', 'bars'), // 파스텔 피치
    decision: node('#FFF2B4', 'diamond'), // 파스텔 옐로
    process: node('#D9EEDA', 'process'), // 파스텔 그린
  },

  // 다크 플럼 커넥터 — 둥근 코너 라우팅 + 작은 화살촉.
  edge: {
    stroke: INK,
    width: 1.5,
    dashPattern: '',
    cornerRadius: 8,
    marker: {
      size: 8,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(67,48,60,0.06)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(67,48,60,0.04)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 둥근 다크 플럼 대시 경계.
  boundary: {
    stroke: INK,
    width: 1.5,
    dashPattern: '5 4',
    radius: 12,
    labelColor: INK,
  },

  typography: {
    titleFont: "'Baloo 2', 'Quicksand', 'Nunito', 'Segoe UI', sans-serif",
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

  // 살짝 통통 튀는 이징(카와이 무드). 색 아님 → colorway 간 deep-equal 유지.
  motion: {
    duration: '220ms',
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// ext 변수 — 마스코트 잉크/볼터치·소프트 퍼피 섀도. preset마다 재정의해 colorway 전환 시
// 볼터치 톤이 함께 바뀐다(default 핑크볼 / mint 민트볼). 마스코트/섀도는 순수 데코.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-mascot': INK, // 마스코트 눈/미소 잉크
  '--bbangto-viz-ext-cheek': 'rgba(255,138,178,0.55)', // 핑크 볼터치 + 폴카닷
  '--bbangto-viz-ext-puff': 'rgba(67,48,60,0.16)', // 소프트 퍼피 드롭섀도
};

/** mint — 파스텔 민트/블루 주도 colorway(잉크/라벨은 다크 플럼 유지, 파스텔 그라운드만 민트로). */
const mintFoundations = makeVizColorway(foundations, {
  name: 'kawaii-pastel-01-mint',
  canvas: { bg: '#E9FBF4', grid: '#CFF0E4' },
  shape: { fill: '#C7F2E1' },
  nodeFills: {
    person: '#C7F2E1', // 파스텔 민트
    external: '#CFE4FF', // 파스텔 블루
    container: '#D3EFEA', // 소프트 틸
    database: '#BEE7FF', // 파스텔 스카이
    queue: '#DFF3D6', // 파스텔 그린
    decision: '#EAF7C4', // 파스텔 라임
    process: '#D8ECF7', // 파스텔 아쿠아
  },
  palette: {
    p1: '#5FD6B0', // 민트
    p2: '#8FB8FF', // 블루
    p3: '#7FD0E8', // 아쿠아
    p4: '#A9E5C6', // 소프트 그린
    p5: '#BFE8F5', // 페일 스카이
    p8: '#EFFCF7', // 페일 민트
  },
});

const MINT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-mascot': INK,
  '--bbangto-viz-ext-cheek': 'rgba(95,214,176,0.5)', // 민트 볼터치 + 폴카닷
  '--bbangto-viz-ext-puff': 'rgba(67,48,60,0.16)',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Pastel Pink',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'mint',
    label: 'Pastel Mint',
    foundations: mintFoundations,
    extendedFoundations: MINT_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-kawaii-pastel-01';
// 소프트 퍼피 = 절제된 드롭섀도(도형에만). 쇼케이스 표면엔 은은한 파스텔 폴카닷.
// 전부 스타일 가이드 name 스코프라 다른 가이드를 오염시키지 않는다(!important는 인라인 bg를 이기기 위함).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="kawaii-pastel-01"] [data-viz-part="shape"] {
  filter: drop-shadow(0 1.5px 1.5px var(--bbangto-viz-ext-puff));
}
[data-bbangto-viz-style-guide="kawaii-pastel-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: radial-gradient(var(--bbangto-viz-ext-cheek) 1.5px, transparent 1.6px) !important;
  background-size: 18px 18px !important;
}
`;

const clamp = (min: number, val: number, max: number): number =>
  Math.max(min, Math.min(max, val));

/**
 * mascot glyph — 노드 bbox 우상단 코너에 작은 카와이 얼굴을 그린다(NEW 데코레이션).
 * 지오메트리 불변: x/y/width/height로 눈(점 2개)·미소 아크·볼터치·반짝임 좌표만 계산한다.
 * 눈/미소는 ext-mascot 잉크, 볼터치/반짝임은 ext-cheek → colorway 전환에 반응한다.
 * 텍스트는 전혀 없다(라벨과 분리 — 가독성/접근성).
 */
function mascotFace(x: number, y: number, w: number, h: number): React.ReactNode[] {
  const s = clamp(12, Math.min(w * 0.34, h * 0.5), 20);
  const cx = x + w - s * 0.78; // 우상단 코너 클러스터(중앙 라벨과 겹치지 않게)
  const cy = y + s * 0.82;
  const face = vvar('ext', 'mascot');
  const cheek = vvar('ext', 'cheek');
  const eyeR = Math.max(1.3, s * 0.1);
  const eyeDx = s * 0.24;
  const eyeY = cy - s * 0.05;
  const cheekR = s * 0.12;
  const cheekY = cy + s * 0.12;
  const cheekDx = s * 0.36;
  const smileW = Math.max(1.2, s * 0.08);
  const smile = `M ${cx - s * 0.17} ${cy + s * 0.05} Q ${cx} ${cy + s * 0.24} ${cx + s * 0.17} ${cy + s * 0.05}`;
  const spR = s * 0.2;
  const sx = cx - s * 0.98; // 얼굴 옆 작은 반짝임
  const sy = cy + s * 0.22;
  const sparkle = `M ${sx} ${sy - spR} L ${sx + spR * 0.3} ${sy - spR * 0.3} L ${sx + spR} ${sy} L ${sx + spR * 0.3} ${sy + spR * 0.3} L ${sx} ${sy + spR} L ${sx - spR * 0.3} ${sy + spR * 0.3} L ${sx - spR} ${sy} L ${sx - spR * 0.3} ${sy - spR * 0.3} Z`;
  return [
    <circle key="cheek-l" cx={cx - cheekDx} cy={cheekY} r={cheekR} style={{ fill: cheek, stroke: 'none' }} />,
    <circle key="cheek-r" cx={cx + cheekDx} cy={cheekY} r={cheekR} style={{ fill: cheek, stroke: 'none' }} />,
    <circle key="eye-l" cx={cx - eyeDx} cy={eyeY} r={eyeR} style={{ fill: face, stroke: 'none' }} />,
    <circle key="eye-r" cx={cx + eyeDx} cy={eyeY} r={eyeR} style={{ fill: face, stroke: 'none' }} />,
    <path key="smile" d={smile} style={{ fill: 'none', stroke: face, strokeWidth: smileW, strokeLinecap: 'round' }} />,
    <path key="sparkle" d={sparkle} style={{ fill: cheek, stroke: 'none' }} />,
  ];
}

/**
 * mascot wrapper — 실 Node를 그대로 렌더(라벨=children은 Node 안에서 정상 렌더)하고,
 * 그 형제로 aria-hidden 마스코트 글리프 그룹을 추가한다(데코레이션, 텍스트 없음).
 * 소프트 퍼피 섀도/폴카닷 모티프 CSS를 1회 주입한다.
 */
function KawaiiNode({ children, ...rest }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return (
    <>
      <Node {...rest}>{children}</Node>
      <g data-viz-kawaii-mascot="" aria-hidden="true">
        {mascotFace(rest.x, rest.y, rest.width, rest.height)}
      </g>
    </>
  );
}
KawaiiNode.displayName = 'KawaiiNode';

/** 타입 태그 — 다크 플럼 라벨(마스코트/섀도 미적용, 파스텔 위 ≥9:1). */
function KawaiiTag(props: TagProps) {
  return <Tag {...props} fontSize={props.fontSize ?? 10} />;
}
KawaiiTag.displayName = 'KawaiiTag';

/** 흐름선 라벨 — 파스텔 칩 배경 + 다크 플럼 텍스트(폴카닷 위에서도 또렷). */
function KawaiiEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={props.fontSize ?? 11} />;
}
KawaiiEdgeLabel.displayName = 'KawaiiEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: KawaiiNode,
  Tag: KawaiiTag,
  EdgeLabel: KawaiiEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'KawaiiPastelShowcaseBase' });

/** 쇼케이스 — 모티프 CSS(소프트 퍼피 섀도 + 파스텔 폴카닷)를 주입한 뒤 공용 씬 렌더. */
function KawaiiPastelShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
KawaiiPastelShowcase.displayName = 'KawaiiPastelShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '파스텔 라이트 그라운드 위 파스텔 솔리드 채움 + 둥근 코너 도형. 소프트 퍼피 드롭섀도(도형 한정)와 파스텔 폴카닷 표면이 통통하고 다정한 무드를 만든다. 마스코트 글리프는 노드 우상단 코너에 얹는 순수 장식.',
    dos: [
      '채움은 라이트 파스텔 솔리드(핑크/블루/민트/라일락/피치/옐로)',
      '코너는 둥글게, 섀도는 절제된 소프트 1겹만',
      '마스코트 글리프는 노드 코너 데코로만 — 라벨을 가리지 않게',
    ],
    donts: [
      '고채도·다크 그라운드 전환 금지(이 가이드는 라이트 파스텔 전용)',
      '섀도 중첩·강한 블러 금지(퍼피 무드 상실)',
      '마스코트에 텍스트/의미 인코딩 금지(순수 장식)',
    ],
  },
  color: {
    summary:
      '라이트 파스텔 램프(핑크 주도 default / 민트·블루 주도 mint) + 소프트 다크 플럼 잉크. 라벨·라인은 언제나 다크 플럼으로 파스텔 위 고대비.',
    dos: [
      '파스텔은 라이트 톤으로 유지(다크 잉크 대비 확보)',
      'colorway 전환은 파스텔 그라운드·채움 교체로(default 핑크 / mint 민트·블루)',
      '볼터치/폴카닷은 ext-cheek 토큰으로 colorway와 함께 리틴트',
    ],
    donts: [
      '파스텔을 라인/텍스트 잉크로 금지(라이트라 저대비)',
      '한 화면에 유채색 남발 금지(파스텔 절제)',
    ],
  },
  typography: {
    summary:
      '둥근 산세리프(카와이 친화) 타이틀 + mono 수치. 모든 라벨은 다크 플럼 잉크로 파스텔·폴카닷 표면 위에서도 또렷.',
    dos: ['타이틀은 둥근 산세리프', '수치·값은 mono', '라벨은 다크 플럼으로 대비 확보'],
    donts: ['라벨에 마스코트/섀도 데코 적용 금지(가독성)', '파스텔 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 소프트 다크 플럼(#43303C) — 라이트 파스텔 위에서 9:1 이상(auditVizContrast aa 게이트). 마스코트 글리프·폴카닷·드롭섀도는 전부 데코라 텍스트에 얹지 않으며(글리프는 aria-hidden + 텍스트 없음), 의미를 색만으로 인코딩하지 않는다.',
    dos: [
      '라벨은 다크 플럼(파스텔 위 ≥4.5:1)',
      '마스코트/폴카닷/섀도는 도형·표면 장식으로만 — 텍스트 제외',
      '값 인코딩은 색뿐 아니라 라벨/형태로 병기',
    ],
    donts: [
      '파스텔 색을 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '마스코트 글리프로 의미 구분 금지(순수 장식, aria-hidden)',
      '유사 파스텔 채움만으로 상태 구분 금지(색각 이상 취약 — 라벨 병기)',
    ],
  },
};

export const kawaiiPastel01VizStyleGuide: VisualizationStyleGuide = {
  name: 'kawaii-pastel-01',
  description:
    'Kawaii pastel — light pastel ground, pastel-solid rounded nodes, soft puffy drop-shadow (shape-only) and pastel polka-dot surface, plus a signature wrapper-drawn kawaii mascot glyph (dot eyes + smile arc + cheeks + sparkle) on each node corner; dark plum ink labels for AA contrast on light pastels.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { KawaiiPastelShowcase: KawaiiPastelShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '카와이 파스텔 모티프 — 라이트 파스텔 채움 + 둥근 코너 도형에 소프트 퍼피 섀도·파스텔 폴카닷을 얹고, 노드 코너에 마스코트 글리프(눈+미소+볼터치+반짝임)를 장식으로 그린다. 라벨은 다크 플럼 잉크.',
    components: {
      Node: {
        description:
          '파스텔 솔리드 둥근 도형을 KawaiiNode가 감싼다 — bbox 우상단 코너에 작은 카와이 얼굴(눈 두 점·미소 아크·볼터치·반짝임)을 aria-hidden 형제 그룹으로 그리고(지오메트리 불변, 텍스트 없음), 도형엔 소프트 퍼피 드롭섀도를 건다. 라벨은 데코 밖에서 렌더.',
        specs: [
          'fill = 라이트 파스텔 솔리드(hex)',
          'mascot glyph(data-viz-kawaii-mascot, aria-hidden, ext-mascot/cheek 색)',
          'soft drop-shadow ([data-viz-part="shape"] 스코프, ext-puff)',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 플럼 라벨 — 마스코트/섀도 미적용(가독성).',
        specs: ['다크 플럼', '10px', '파스텔 표면 위 ≥9:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 파스텔 칩 배경 + 다크 플럼 텍스트로 폴카닷 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '다크 플럼'],
      },
    },
    example: KawaiiPastelShowcase as React.FC,
  },
  meta: {
    displayName: 'Kawaii_Pastel_01',
    family: 'viz-soft-puffy',
    summary:
      '라이트 파스텔 + 둥근 소프트 퍼피 도형 + 노드 코너 마스코트 글리프(눈·미소·볼터치)·파스텔 폴카닷의 귀엽고 다정한 키즈/에듀 인포그래픽 페인트.',
    tags: ['pastel', 'playful', 'rounded', 'light'],
    mood: { formality: 1, energy: 3, warmth: 5, density: 2, ornament: 4 },
    characteristics: {
      cornerRadius: 'round',
      borderWeight: 'thin',
      shadow: 'soft',
      density: 'balanced',
      motion: 'subtle',
      colorScheme: 'light',
      contrast: 'medium',
    },
    domains: ['kids', 'education', 'entertainment'],
    useWhen: [
      '키즈·교육·엔터테인먼트용 인포그래픽을 파스텔의 귀엽고 다정한 무드로 낼 때 쓴다.',
      '마스코트 캐릭터 감성(작은 얼굴 글리프)으로 친근함을 더하고 싶을 때 쓴다.',
      '소프트 퍼피(둥근 코너 + 부드러운 섀도) 스티커 룩의 라이트 차트가 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F2/Swiss를 쓴다).',
      '다크·하이테크·시리어스 무드가 필요할 때 피한다(F7/HUD를 쓴다).',
      '색각 이상 안정성이 최우선인 대규모 데이터 차트에 피한다(유사 파스텔 — 라벨 병기 전제).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: false,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'clay-playful-01'],
  },
};
