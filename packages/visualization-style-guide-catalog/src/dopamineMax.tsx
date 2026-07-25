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
 * Dopamine_Max_01 — 맥시멀 도파민 인포그래픽(고채도 색 충돌 + 오버랩 블렌드).
 * 근거: KAN-039 P2 1:1 family(viz-dopamine-max). Riso_Print_01의 반투명 워시 + mix-blend-mode
 * 모티프를 계승하되, "오버프린트 겹침"이 아니라 "서로 부딪히는 고채도 색이 오프셋 오버랩으로
 * 블렌드"하는 요란·즐거운 무드로 변주한다.
 *
 * 두 데코 모두 **장식**이며 텍스트엔 절대 걸지 않는다(가독성·접근성):
 *  - 색 충돌 오버랩: DopamineMaxNode가 실 도형 뒤에 서로 다른 고채도 워시의
 *    **오프셋 복제 유령 도형** 2개를 깐다(aria-hidden, 텍스트 없음). 이 유령 그룹에만
 *    `mix-blend-mode: multiply`를 `[data-viz-dopamine-clash]` 스코프로 걸어 겹침에서
 *    색이 배어난다 — 이 오버랩 블렌드가 곧 모티프다. 실 도형·라벨은 오프셋 없이 정위치 렌더.
 *
 * 접근성: 캔버스는 밝은 근백색(near-white) 그라운드이고 모든 잉크/라벨은 근블랙 다크 잉크다.
 * 고채도 색은 **오직 `palette` 스와치와 반투명 채움 워시·장식**에만 쓴다 — 채움 워시는 낮은
 * 알파라 밝은 그라운드 위에서 밝게 합성되어 다크 라벨이 4.5:1 이상을 유지한다(auditVizContrast
 * over-claim 게이트: tagColor/c4/boundary 라벨 vs 합성 표면). 고채도 솔리드 hue는 라인/텍스트
 * 잉크로 쓰지 않는다(밝은 그라운드 대비 미달 위험 회피).
 */

const INK = '#141019'; // 근블랙 다크 잉크 — 라인/윤곽/모든 텍스트 라벨(밝은 그라운드 대비 ~18:1)
const GROUND = '#FBFAFF'; // 밝은 근백색 그라운드(다크 라벨이 안전하게 통과하도록 밝게 유지)

// 채움 = 고채도 반투명 워시. 낮은 알파로 밝은 그라운드 위에서 밝게 합성 → 다크 라벨 안전.
// (고채도 솔리드는 palette에만; 여기선 절대 라인/텍스트로 쓰지 않는다.)
const WASH = {
  pink: 'rgba(255,45,120,0.20)', // 핫핑크
  pinkFaint: 'rgba(255,45,120,0.14)',
  blue: 'rgba(40,110,255,0.18)', // 일렉트릭 블루
  lime: 'rgba(120,220,40,0.20)', // 라임
  orange: 'rgba(255,120,20,0.20)', // 오렌지
  violet: 'rgba(150,60,240,0.18)', // 바이올렛
  cyan: 'rgba(0,190,220,0.18)', // 시안
} as const;

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK,
  keylineWidth: 1,
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'dopamine-max-01',

  canvas: {
    bg: GROUND,
    grid: '#EFEBF7', // 미세 라일락 그리드
    gridUnit: 8,
  },

  // 도파민 하이 새트 램프 — 솔리드 고채도 hue(스와치 전용, 게이트 비대상).
  palette: {
    p1: '#FF2D78', // 핫핑크
    p2: '#286EFF', // 일렉트릭 블루
    p3: '#78DC28', // 라임
    p4: '#FF7814', // 오렌지
    p5: '#963CF0', // 바이올렛
    p6: '#00BEDC', // 시안
    p7: INK, // 다크 잉크
    p8: '#FFE1EC', // 페일 팝 핑크 틴트
  },

  // 제네릭 도형 채움 = 핑크 워시, 윤곽 = 다크 잉크.
  shape: {
    fill: WASH.pink,
    stroke: INK,
    strokeWidth: 1,
  },

  // kind별 고채도 반투명 워시 채움 + 다크 잉크 윤곽 + 다크 잉크 라벨.
  node: {
    person: node(WASH.pink, 'user'),
    external: node(WASH.blue, 'arrowOut', { dashed: true }),
    container: node(WASH.violet, 'stackedRect'),
    database: node(WASH.cyan, 'cylinder'),
    queue: node(WASH.lime, 'bars'),
    decision: node(WASH.orange, 'diamond'),
    process: node(WASH.pinkFaint, 'process'),
  },

  // 다크 잉크 라인 + 소형 화살촉.
  edge: {
    stroke: INK,
    width: 1.5,
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
    l1: { borderWidth: 2, bgTint: 'rgba(255,45,120,0.07)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(40,110,255,0.05)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 고채도 대시 경계(비텍스트 장식).
  boundary: {
    stroke: '#963CF0', // 바이올렛 경계선
    width: 1.5,
    dashPattern: '5 4',
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

// 도파민 버스트 배경 — 밝은 그라운드를 유지하는 저알파 멀티-hue 방사형(장식, 텍스트 무영향).
const BURST_URI =
  'radial-gradient(120px 120px at 12% 16%, rgba(255,45,120,0.12), transparent 70%),' +
  'radial-gradient(140px 140px at 88% 22%, rgba(40,110,255,0.12), transparent 70%),' +
  'radial-gradient(160px 160px at 62% 92%, rgba(120,220,40,0.12), transparent 70%)';

const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-clash-a': 'rgba(255,45,120,0.28)', // 클래시 유령 A 워시(핑크)
  '--bbangto-viz-ext-clash-b': 'rgba(40,110,255,0.26)', // 클래시 유령 B 워시(블루)
  '--bbangto-viz-ext-burst': BURST_URI,
};

/** citrus — 오렌지×바이올렛×시안 주도 colorway(웜 근백색 그라운드, 다크 잉크 유지). */
const citrusFoundations = makeVizColorway(foundations, {
  name: 'dopamine-max-01-citrus',
  canvas: { bg: '#FFFDF7', grid: '#F3ECDA' },
  shape: { fill: WASH.orange },
  nodeFills: {
    person: WASH.orange,
    external: WASH.cyan,
    container: WASH.violet,
    database: WASH.orange,
    queue: WASH.cyan,
    decision: WASH.violet,
    process: WASH.lime,
  },
  palette: {
    p1: '#FF7814', // 오렌지
    p2: '#963CF0', // 바이올렛
    p3: '#00BEDC', // 시안
    p4: '#FF2D78', // 핑크
    p5: '#78DC28', // 라임
  },
});

const CITRUS_EXT: Record<string, string> = {
  '--bbangto-viz-ext-clash-a': 'rgba(255,120,20,0.28)', // 클래시 유령 A 워시(오렌지)
  '--bbangto-viz-ext-clash-b': 'rgba(150,60,240,0.26)', // 클래시 유령 B 워시(바이올렛)
  '--bbangto-viz-ext-burst':
    'radial-gradient(120px 120px at 14% 18%, rgba(255,120,20,0.12), transparent 70%),' +
    'radial-gradient(140px 140px at 86% 24%, rgba(150,60,240,0.12), transparent 70%),' +
    'radial-gradient(160px 160px at 60% 90%, rgba(0,190,220,0.12), transparent 70%)',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Pink × Blue × Lime Clash',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'citrus',
    label: 'Orange × Violet × Cyan Clash',
    foundations: citrusFoundations,
    extendedFoundations: CITRUS_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-dopamine-max-01';
// 오버랩 블렌드 = 클래시 유령 그룹에만 multiply(텍스트 무영향). 쇼케이스 표면엔 밝은 그라운드
// 유지 + 저알파 도파민 버스트 오버레이(다크 라벨 가독성 보존).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="dopamine-max-01"] [data-viz-dopamine-clash] {
  mix-blend-mode: multiply;
}
[data-bbangto-viz-style-guide="dopamine-max-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: var(--bbangto-viz-ext-burst) !important;
}
`;

/**
 * 도파민 노드 — 실 도형 뒤에 서로 다른 고채도 워시의 **오프셋 복제 유령 도형** 2개(aria-hidden,
 * 텍스트 없음)를 깐다. 유령 그룹엔 `[data-viz-dopamine-clash]` 스코프 multiply가 걸려 겹침에서
 * 색이 배어난다(오버랩 블렌드 = 모티프). 실 도형은 오프셋 없이 정위치, 라벨(children)은
 * 유령 그룹 밖에서 렌더 → 색 충돌·블렌드가 텍스트를 절대 왜곡하지 않는다.
 */
function DopamineMaxNode({ children, ...rest }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const fill = rest.fill ?? vvar('shape', 'fill');
  return (
    <>
      {/* (1) 클래시 유령 A — 고채도 워시 오프셋 복제(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-dopamine-clash="" aria-hidden="true" transform="translate(-6, 5)">
        <Node {...rest} fill={vvar('ext', 'clashA')} stroke="none" strokeWidth={0} />
      </g>
      {/* (2) 클래시 유령 B — 다른 고채도 워시로 반대 방향 오프셋 → 겹침 블렌드. */}
      <g data-viz-dopamine-clash="" aria-hidden="true" transform="translate(7, -4)">
        <Node {...rest} fill={vvar('ext', 'clashB')} stroke="none" strokeWidth={0} />
      </g>
      {/* (3) 실 도형 — 오프셋 없음. 라벨(children)은 아래(클래시 밖)에서 정위치 렌더. */}
      <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 1} />
      {children}
    </>
  );
}
DopamineMaxNode.displayName = 'DopamineMaxNode';

/** 도파민 태그 — 다크 잉크 라벨(색 충돌/블렌드 미적용). */
function DopamineMaxTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
DopamineMaxTag.displayName = 'DopamineMaxTag';

/** 흐름선 라벨 — 근백색 칩 배경 + 다크 잉크(버스트 위에서도 또렷). */
function DopamineMaxEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
DopamineMaxEdgeLabel.displayName = 'DopamineMaxEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: DopamineMaxNode,
  Tag: DopamineMaxTag,
  EdgeLabel: DopamineMaxEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'DopamineMaxShowcase' });

/** 쇼케이스 — 모티프 CSS(클래시 블렌드 + 도파민 버스트 그라운드)를 주입한 뒤 공용 씬 렌더. */
function DopamineMaxShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
DopamineMaxShowcase.displayName = 'DopamineMaxShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '밝은 근백색 그라운드 위 고채도 반투명 워시 채움 + 오프셋 복제 유령 도형의 오버랩 블렌드(multiply). 색이 부딪히고 겹쳐 배어나는 요란·즐거운 맥시멀 무드.',
    dos: [
      '채움은 고채도 반투명 워시(오프셋 오버랩으로 색이 배어남)',
      '색 충돌 오버랩은 유령 도형에만 — 실 도형·라벨은 정위치',
      '윤곽은 다크 잉크 라인 + 소형 화살촉',
    ],
    donts: [
      '깔끔한 단색 솔리드 채움 금지(도파민 오버랩 무드 상실)',
      '유령 오프셋에 정보 인코딩 금지(순수 장식)',
      '다크 그라운드 전환 금지(이 가이드는 밝은 라이트 전용)',
    ],
  },
  color: {
    summary:
      '핫핑크·블루·라임·오렌지·바이올렛·시안의 클래시. 고채도 hue는 스와치·워시·장식에만; 라인/텍스트 잉크는 항상 다크 잉크로 고정해 가독성을 지킨다.',
    dos: [
      '고채도 hue는 palette 스와치와 반투명 워시·유령 장식에 한정',
      '오버랩 겹침색은 multiply로 자연히 형성',
      'colorway 전환은 hue 트리오 교체로(default 핑크×블루×라임 / citrus 오렌지×바이올렛×시안)',
    ],
    donts: [
      '고채도 솔리드 hue를 라인/텍스트 잉크로 금지(밝은 그라운드 대비 미달 위험)',
      '워시 알파를 과하게 올려 라벨 대비를 떨어뜨리지 말 것',
    ],
  },
  typography: {
    summary:
      '그로테스크 산세리프 타이틀 + mono 수치. 모든 라벨은 다크 잉크로 밝은 그라운드·버스트 위에서도 고대비.',
    dos: ['타이틀은 그로테스크 산세리프', '수치·값은 mono', '라벨은 다크 잉크로 대비 확보'],
    donts: ['라벨에 색 충돌/블렌드 적용 금지(가독성)', '고채도 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 다크 잉크 — 반투명 워시가 밝은 그라운드 위에 합성한 표면에서도 4.5:1 이상(auditVizContrast 게이트). 오버랩 블렌드·유령 오프셋은 전부 [data-viz-dopamine-clash] 스코프 장식으로 텍스트에 미적용. 색각(colorblind) 관점에서 hue 다수 인코딩은 위험하므로 값 구분은 색뿐 아니라 라벨/형태로 병기한다.',
    dos: [
      '라벨은 다크 잉크(합성 표면 위 ≥4.5:1)',
      '블렌드/유령 오프셋은 장식 유령에만 — 텍스트 제외',
      '값 인코딩은 색뿐 아니라 라벨/형태로 병기(색각 안전)',
    ],
    donts: [
      '고채도 색을 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '유령 오프셋·색 충돌로 의미 구분 금지(장식 한정)',
      'hue만으로 카테고리 구분 금지(색각 이상 시 붕괴)',
    ],
  },
};

export const dopamineMax01VizStyleGuide: VisualizationStyleGuide = {
  name: 'dopamine-max-01',
  description:
    'Maximalist dopamine infographic — bright near-white ground, clashing high-saturation translucent washes (hot pink, electric blue, lime, orange, violet, cyan) that overlap and blend via offset ghost duplicates with mix-blend-mode (clash = the motif), dark-ink lines and labels for AA contrast; saturated solids live in the palette only.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { DopamineMaxShowcase: DopamineMaxShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '도파민 맥시멀 모티프 — 밝은 그라운드 위 고채도 워시 채움 + 오프셋 유령 도형의 오버랩 블렌드(multiply, 도형 장식 한정), 다크 잉크 라인/라벨.',
    components: {
      Node: {
        description:
          '도형은 고채도 반투명 워시로 채워지고, DopamineMaxNode가 서로 다른 워시의 오프셋 복제 유령 도형 2개(aria-hidden)를 뒤에 깔아 [data-viz-dopamine-clash] 스코프 multiply로 겹침색을 배어나게 한다. 실 도형·라벨은 오프셋 없이 정위치.',
        specs: [
          'fill = 고채도 반투명 워시(rgba)',
          'mix-blend-mode: multiply ([data-viz-dopamine-clash] 스코프)',
          '오프셋 유령 도형 2개(translate) + 실 도형(오프셋 0)',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 잉크 라벨 — 색 충돌/블렌드 미적용(가독성).',
        specs: ['다크 잉크', '10px', '합성 표면 위 ≥4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 근백색 칩 배경 + 다크 잉크로 버스트 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '다크 잉크'],
      },
    },
    example: DopamineMaxShowcase as React.FC,
  },
  meta: {
    displayName: 'Dopamine_Max_01',
    family: 'viz-dopamine-max',
    priority: 'P2',
    summary:
      '밝은 근백색 위 고채도 색 충돌·오프셋 오버랩 블렌드의 맥시멀 도파민 인포그래픽 — 요란·즐겁되 다크 잉크 라벨로 가독성 유지.',
    tags: ['vivid', 'maximal', 'playful', 'high-contrast'],
    mood: { formality: 1, energy: 5, warmth: 3, density: 4, ornament: 5 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'dense',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['marketing', 'creative-agency', 'entertainment', 'social', 'landing'],
    useWhen: [
      '요란하고 즐거운 도파민 무드로 고채도 색이 부딪히는 맥시멀 인포그래픽을 낼 때 쓴다.',
      '마케팅·엔터·소셜 비주얼에서 강렬한 에너지와 시선 강탈이 필요할 때 쓴다.',
      '색 충돌·오버랩 감성을 주되 라벨 가독성(AA)은 지키고 싶을 때 쓴다.',
    ],
    avoidWhen: [
      '격식·절제가 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F2/Swiss를 쓴다).',
      '색각 안정성·저채도가 우선인 대규모 데이터 차트에 피한다(고채도 hue 다수).',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(F7을 쓴다).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: false,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'neon-gradient-dark-01'],
  },
};
