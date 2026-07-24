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
 * Glitch_Duotone_01 — 정적 채널 오프셋 듀오톤(마젠타/시안 오정합 colorsep).
 * 근거: viz-print-ink family(KAN-037) — 리소#32의 미스레지 아이디어를 **두 채널**로 확장.
 * RGB-split 인쇄 오정합(static misregistration)을 도형 뒤 두 장식 유령으로 구현한다.
 *
 * 두 유령 채널은 모두 **장식**이며 텍스트엔 절대 걸지 않는다(가독성·접근성):
 *  - 마젠타 채널: GlitchNode가 도형을 +1.6px 오프셋한 반투명 마젠타 복제를 뒤에 깐다
 *    (data-viz-glitch-chan="magenta", aria-hidden, 텍스트 없음 — 순수 채널 시프트 장식).
 *  - 시안 채널: 같은 도형을 -1.6px 반대로 오프셋한 반투명 시안 복제를 뒤에 깐다
 *    (data-viz-glitch-chan="cyan", aria-hidden, 텍스트 없음).
 *  - 두 채널이 겹치는 영역은 multiply(모티프 CSS, 채널 그룹에만 스코프)로 오버프린트되어
 *    블루퍼플이 배어난다 — 라벨/텍스트엔 이 속성이 없어 영향 0.
 *  - 실 도형(다크 잉크 윤곽 + 반투명 워시 채움)과 라벨(children)은 오프셋 밖에서 렌더 →
 *    미스레지가 텍스트를 절대 이동/왜곡하지 않는다.
 *
 * 접근성: 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)과 라인 잉크(shape/edge
 * stroke)는 다크 잉크로, 라이트 쿨 페이퍼 및 반투명 워시 합성 표면 위에서도 4.5:1 이상
 * (auditVizContrast worst-case 게이트). 마젠타·시안은 캔버스 대비 저대비라 라인/텍스트 잉크로
 * 쓰지 않고 오직 채움 워시·유령 채널 장식에만 쓴다.
 */

const PAPER = '#F2EFF2'; // 매우 밝은 쿨 페이퍼 그라운드(듀오톤 인쇄 지면)
const INK = '#16141C'; // 니어블랙 쿨 잉크 — 라인/윤곽/전 라벨(페이퍼 대비 ~15.99:1)

// 채움 = 채널 반투명 워시(마젠타/시안/오버프린트 퍼플). 낮은 알파로 합성 표면을 밝게 유지 → 다크 잉크 안전.
const WASH = {
  magenta: 'rgba(214,40,140,0.20)',
  magentaStrong: 'rgba(214,40,140,0.26)',
  cyan: 'rgba(0,150,190,0.18)',
  cyanStrong: 'rgba(0,150,190,0.24)',
  cyanFaint: 'rgba(0,150,190,0.13)',
  over: 'rgba(120,50,160,0.22)', // 마젠타×시안 오버프린트가 배어난 블루퍼플
  overSoft: 'rgba(120,50,160,0.16)',
} as const;

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK,
  keylineWidth: 1.5,
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'glitch-duotone-01',

  canvas: {
    bg: PAPER,
    grid: '#E4DEE8', // 미세 쿨 페이퍼 그리드
    gridUnit: 8,
  },

  // 채널 램프 — 마젠타 + 시안 + 오버프린트 퍼플 + 다크 잉크 + 페이퍼 틴트.
  palette: {
    p1: '#D6288C', // 마젠타 채널
    p2: '#0096BE', // 시안 채널
    p3: '#7832A0', // 오버프린트 퍼플(마젠타×시안)
    p4: '#E24D9B', // 라이트 마젠타
    p5: '#33B2CE', // 라이트 시안
    p6: '#B0416F', // 뮤트 마젠타
    p7: INK, // 다크 잉크
    p8: '#E9E2ED', // 페일 쿨 페이퍼
  },

  // 제네릭 도형 채움 = 마젠타 워시, 윤곽 = 다크 잉크.
  shape: {
    fill: WASH.magenta,
    stroke: INK,
    strokeWidth: 1.5,
  },

  // kind별 채널 워시 채움(반투명) + 다크 잉크 윤곽 + 다크 잉크 라벨.
  node: {
    person: node(WASH.magenta, 'user'),
    external: node(WASH.cyan, 'arrowOut', { dashed: true }),
    container: node(WASH.over, 'stackedRect'),
    database: node(WASH.cyanStrong, 'cylinder'),
    queue: node(WASH.magentaStrong, 'bars'),
    decision: node(WASH.overSoft, 'diamond'),
    process: node(WASH.cyanFaint, 'process'),
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
    l1: { borderWidth: 2, bgTint: 'rgba(214,40,140,0.08)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(0,150,190,0.05)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 뮤트 마젠타 대시 경계(비텍스트 장식; 라벨은 다크 잉크).
  boundary: {
    stroke: '#B0416F',
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

// 확장 토큰 — 두 유령 채널 색 + 오프셋 거리. 래퍼가 채널색을 var에서 읽는다(리소 DEFAULT_EXT 선례).
// 오프셋 거리는 문서/설정 패리티용(실 transform은 결정론적으로 하드코딩; SVG transform 속성은 var() 미해석).
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-chan-magenta': 'rgba(214,40,140,0.55)', // 마젠타 유령 채널(+오프셋)
  '--bbangto-viz-ext-chan-cyan': 'rgba(0,150,190,0.55)', // 시안 유령 채널(-오프셋)
  '--bbangto-viz-ext-offset': '1.6', // 채널 오프셋 거리(px)
};

/** redblue — 레드×블루 colorsep colorway(쿨 블루 페이퍼 + 다크 잉크). */
const redblueFoundations = makeVizColorway(foundations, {
  name: 'glitch-duotone-01-redblue',
  canvas: { bg: '#EEF0F6', grid: '#DEE2EE' },
  ink: '#141019', // 니어블랙 잉크(쿨 블루 페이퍼 대비 ~16.5:1) — 라인/윤곽/전 라벨
  tagColor: '#141019', // 노드 태그도 동일 다크 잉크로 정렬
  shape: { fill: 'rgba(210,45,55,0.20)' },
  nodeFills: {
    person: 'rgba(210,45,55,0.20)', // 레드
    external: 'rgba(40,90,200,0.18)', // 블루
    container: 'rgba(120,55,150,0.22)', // 오버프린트 퍼플
    database: 'rgba(40,90,200,0.24)', // 블루
    queue: 'rgba(210,45,55,0.26)', // 레드
    decision: 'rgba(120,55,150,0.16)', // 오버프린트 소프트
    process: 'rgba(40,90,200,0.13)', // 블루 페인트
  },
  c4Tints: ['rgba(210,45,55,0.08)', 'rgba(40,90,200,0.05)', 'transparent'],
  palette: {
    p1: '#D62839', // 레드 채널
    p2: '#2A5AC8', // 블루 채널
    p3: '#7A3796', // 오버프린트 퍼플(레드×블루)
    p4: '#E2596A',
    p5: '#5B84D8',
    p6: '#A64457',
    p8: '#E4E7F0',
  },
});

const REDBLUE_EXT: Record<string, string> = {
  '--bbangto-viz-ext-chan-magenta': 'rgba(210,45,55,0.55)', // 레드 유령 채널(+오프셋)
  '--bbangto-viz-ext-chan-cyan': 'rgba(40,90,200,0.55)', // 블루 유령 채널(-오프셋)
  '--bbangto-viz-ext-offset': '1.6',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Magenta × Cyan Colorsep',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'redblue',
    label: 'Red × Blue Colorsep',
    foundations: redblueFoundations,
    extendedFoundations: REDBLUE_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-glitch-duotone-01';
// 오버프린트 = 두 유령 채널이 겹칠 때 multiply로 배어남(채널 그룹에만 스코프 → 텍스트/도형 무영향).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="glitch-duotone-01"] [data-viz-glitch-chan] {
  mix-blend-mode: multiply;
}
`;

/**
 * 글리치 노드 — 실 도형 뒤에 두 장식 유령 채널을 깐다:
 *  (1) 마젠타 채널: +1.6px 오프셋 반투명 마젠타 복제(aria-hidden, 텍스트 없음).
 *  (2) 시안 채널: -1.6px 반대 오프셋 반투명 시안 복제(aria-hidden, 텍스트 없음).
 * 두 채널은 multiply(모티프 CSS)로 겹침색을 오버프린트한다. 실 도형(다크 잉크)과 라벨(children)은
 * 오프셋 밖에서 렌더 → 미스레지가 텍스트를 절대 이동/왜곡하지 않는다(가독성·접근성).
 */
function GlitchNode({ children, ...rest }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const fill = rest.fill ?? vvar('shape', 'fill');
  return (
    <>
      {/* (1) 마젠타 유령 채널 — +오프셋 복제(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-glitch-chan="magenta" aria-hidden="true" transform="translate(1.6, 0)">
        <Node {...rest} fill={vvar('ext', 'chanMagenta')} stroke="none" strokeWidth={0} />
      </g>
      {/* (2) 시안 유령 채널 — 반대(-)오프셋 복제(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-glitch-chan="cyan" aria-hidden="true" transform="translate(-1.6, 0)">
        <Node {...rest} fill={vvar('ext', 'chanCyan')} stroke="none" strokeWidth={0} />
      </g>
      {/* (3) 실 도형 — 다크 잉크 윤곽 + 워시 채움. 오프셋 없음. 라벨은 아래(밖)에서 렌더. */}
      <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 1.5} />
      {children}
    </>
  );
}
GlitchNode.displayName = 'GlitchNode';

/** 글리치 태그 — 다크 잉크 라벨(오프셋/블렌드 미적용). */
function GlitchTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
GlitchTag.displayName = 'GlitchTag';

/** 흐름선 라벨 — 페이퍼 칩 배경 + 다크 잉크(듀오톤 표면 위 가독성). */
function GlitchEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
GlitchEdgeLabel.displayName = 'GlitchEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: GlitchNode,
  Tag: GlitchTag,
  EdgeLabel: GlitchEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'GlitchDuotoneShowcase' });

/** 쇼케이스 — 모티프 CSS(채널 multiply 오버프린트)를 주입한 뒤 공용 씬 렌더. */
function GlitchShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
GlitchShowcase.displayName = 'GlitchDuotoneShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '밝은 쿨 페이퍼 그라운드 위 채널 반투명 워시 채움 + 실 도형 뒤 두 유령 채널(마젠타 +1.6px / 시안 -1.6px)의 정적 오정합(colorsep). 겹침은 multiply로 오버프린트.',
    dos: [
      '채움은 채널 반투명 워시(마젠타/시안/오버프린트 퍼플)',
      '유령 채널은 도형에만 — 오프셋 방향은 채널당 반대(±)로 고정',
      '윤곽은 다크 잉크 라인 + 소형 화살촉',
    ],
    donts: [
      '깔끔한 솔리드 벡터 채움 금지(듀오톤 인쇄 무드 상실)',
      '유령 오프셋에 정보 인코딩 금지(순수 장식 채널 시프트)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '두 인쇄 채널(마젠타 + 시안, redblue preset은 레드×블루) + 겹침 오버프린트 퍼플. 채널색은 워시·유령 장식 전용이며 라인/텍스트엔 쓰지 않는다.',
    dos: [
      '채널은 2색(마젠타×시안)으로 절제, 겹침에서 퍼플이 배어남',
      'colorway 전환은 채널 쌍 교체로(default 마젠타×시안 / redblue 레드×블루)',
      '라인·텍스트 잉크는 항상 다크 잉크',
    ],
    donts: [
      '마젠타·시안을 라인/텍스트 잉크로 금지(페이퍼 대비 미달)',
      '채널 3색+ 남용 금지(colorsep 절제 상실)',
    ],
  },
  typography: {
    summary:
      '그로테스크 산세리프(에디토리얼) 타이틀 + mono 수치. 모든 라벨은 다크 잉크로 채널 오프셋·오버프린트 표면 위에서도 고대비.',
    dos: ['타이틀은 그로테스크 산세리프', '수치·값은 mono', '라벨은 다크 잉크로 대비 확보'],
    donts: ['라벨에 채널 오프셋/블렌드 적용 금지(가독성)', '채널색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 다크 잉크 — 워시가 합성한 worst-case 표면 위에서도 4.5:1 이상(auditVizContrast 게이트). 채널 오프셋·multiply 오버프린트는 전부 [data-viz-glitch-chan] 스코프 장식으로 텍스트에 미적용. 값 인코딩은 채널색이 아니라 라벨·글리프·형태로 병기(색각 이상 안전).',
    dos: [
      '라벨은 다크 잉크(합성 표면 위 ≥4.5:1)',
      '채널 오프셋/multiply는 유령 그룹에만 — 텍스트 제외',
      '값 인코딩은 색뿐 아니라 라벨/글리프/형태로 병기',
    ],
    donts: [
      '마젠타·시안·채널색을 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '유령 오프셋 방향으로 의미 구분 금지(장식 한정)',
      '오버프린트 겹침색 위 저대비 라벨 금지',
    ],
  },
};

export const glitchDuotone01VizStyleGuide: VisualizationStyleGuide = {
  name: 'glitch-duotone-01',
  description:
    'Static channel-offset duotone — light cool paper ground, translucent channel washes, and a decorative RGB-split misregistration: two aria-hidden ghost channels (magenta offset +1.6px, cyan offset -1.6px) behind the real dark-ink shape, overlapping via multiply overprint. Labels render unshifted for AA contrast; magenta/cyan are decoration only, never line or text ink.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { GlitchDuotoneShowcase: GlitchShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '글리치 듀오톤 모티프 — 밝은 쿨 페이퍼 위 채널 워시 + 실 도형 뒤 두 유령 채널(마젠타 +1.6px / 시안 -1.6px) 정적 오정합, multiply 오버프린트, 다크 잉크 라벨(오프셋 밖).',
    components: {
      Node: {
        description:
          '도형은 반투명 채널 워시로 채워진다. GlitchNode가 실 도형 뒤에 두 장식 유령 채널(마젠타 +1.6px, 시안 -1.6px, 둘 다 aria-hidden·텍스트 없음)을 깔고 multiply로 겹침색을 오버프린트한다 — 라벨은 오프셋 밖에서 렌더.',
        specs: [
          'fill = 채널 반투명 워시(rgba)',
          'ghost: [data-viz-glitch-chan="magenta"] translate(1.6,0) / ="cyan" translate(-1.6,0)',
          'mix-blend-mode: multiply ([data-viz-glitch-chan] 스코프), 채널색 = var(--bbangto-viz-ext-chan-*)',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 잉크 라벨 — 채널 오프셋/블렌드 미적용(가독성).',
        specs: ['다크 잉크', '10px', '워시 표면 위 ≥4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 페이퍼 칩 배경 + 다크 잉크로 듀오톤 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '다크 잉크'],
      },
    },
    example: GlitchShowcase as React.FC,
  },
  meta: {
    displayName: 'Glitch_Duotone_01',
    family: 'viz-print-ink',
    summary:
      '밝은 쿨 페이퍼 + 마젠타/시안 채널 반투명 워시 + RGB-split 미스레지(두 유령 채널) multiply 오버프린트의 정적 듀오톤 인쇄 인포그래픽 페인트.',
    tags: ['light', 'vivid', 'high-contrast', 'retro', 'textured'],
    mood: { formality: 2, energy: 3, warmth: 2, density: 2, ornament: 3 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['editorial', 'blog', 'creative-agency', 'marketing'],
    useWhen: [
      '에디토리얼·블로그 인포그래픽을 듀오톤 인쇄 오정합(마젠타×시안 colorsep)의 트렌디한 무드로 낼 때 쓴다.',
      '정적 RGB-split 미스레지로 레트로·아날로그 인쇄 질감을 주고 싶을 때 쓴다.',
      '크리에이티브 에이전시·마케팅 비주얼에서 차별적 채널 시프트 감성이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F2/Swiss를 쓴다).',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(F7을 쓴다).',
      '저채도 절제·색 안정성이 우선인 대규모 데이터 차트에 피한다(고채도 채널 워시).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['riso-print-01', 'terminal-ascii-01'],
  },
};
