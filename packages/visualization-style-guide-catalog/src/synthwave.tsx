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
 * Synthwave_01 — 80s 레트로퓨처 신스웨이브 페인트(다크 전용, KAN-039 · 고유 family viz-synthwave).
 * 딥 퍼플/네이비 그라운드 + 네온 마젠타·시안 + 원근 퍼스펙티브 그리드 + CRT 스캔라인.
 *
 * 새 데코레이션: **CRT 스캔라인 + 퍼스펙티브 그리드**. 둘 다 **순수 장식**이며 텍스트엔 절대 걸지 않는다.
 *  - 노드 스캔라인: SynthwaveNode wrapper가 노드 bbox 위에 4px 피치 수평 라인 그룹
 *    (data-viz-synth, aria-hidden, 텍스트 없음)을 형제로 깐다 — 지오메트리 불변, 정보 인코딩 아님.
 *  - 쇼케이스 그리드/스캔라인: 스타일 가이드 name 스코프 MOTIF_CSS가 [data-viz-showcase] 표면에
 *    repeating-linear-gradient 레이어(스캔라인 3px 피치 + 네온 그리드 40px)로 주입한다(hudTelemetry 선례).
 *  - 글로우: 절제된 CSS drop-shadow 1겹을 [data-viz-synth-glow] 노드 그룹에만 건다(SVG defs 불필요).
 *
 * 접근성(다크 우선): 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 니어화이트
 * (#F2ECFF)로 딥 퍼플 그라운드·다크 솔리드 노드 fill 위에서 ≥10.6:1(auditVizContrast 게이트).
 * shape/edge 잉크는 네온 시안이라 그라운드 대비 11.60:1(≥4.5 텍스트·≥3 비텍스트) 확보. node fill은
 * 전부 **불투명 딥 퍼플/인디고 솔리드**라 니어화이트 라벨이 안전하다(반투명 fill의 흰 배경 합성 이슈 회피).
 */

const CYAN = '#28E0F0'; // 네온 시안 — 기본 잉크/엣지(딥 퍼플 대비 11.60:1)
const MAGENTA = '#FF3D9A'; // 네온 마젠타 — 팔레트 리드 + 경계선/글로우
const LABEL = '#F2ECFF'; // 니어화이트 라벨(다크 fill/그라운드 위 ≥10.6:1)
const HAIR = 1;

// 모든 kind = 불투명 딥 퍼플/인디고 솔리드 fill + 시안 헤어라인 + 니어화이트 라벨.
const node = (fill: string, glyph: string, dashed?: boolean) => ({
  fill,
  keyline: CYAN,
  keylineWidth: HAIR,
  tagColor: LABEL,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'synthwave-01',

  canvas: {
    bg: '#160B2E', // 딥 신스 퍼플/네이비 그라운드
    grid: '#2A1B4E',
    gridUnit: 8,
  },

  // 네온 마젠타·시안·바이올렛·선셋 오렌지 리드 + 니어화이트 보조. 전부 파싱 가능한 hex.
  palette: {
    p1: MAGENTA, // 네온 마젠타
    p2: CYAN, // 네온 시안
    p3: '#9B5DE5', // 바이올렛
    p4: '#FF8A3D', // 선셋 오렌지
    p5: LABEL, // 니어화이트
    p6: '#7B2FE0', // 딥 퍼플
    p7: '#FF6EC7', // 핫 핑크
    p8: '#4DE0FF', // 라이트 시안
  },

  // 제네릭 도형 기본 paint = 딥 퍼플 솔리드 + 시안 헤어라인(계약 스타일시트가 바인딩).
  shape: {
    fill: '#3A1D6E',
    stroke: CYAN,
    strokeWidth: HAIR,
  },

  node: {
    person: node('#3A1D6E', 'user'),
    external: node('#2A1550', 'arrowOut', true),
    container: node('#42207A', 'stackedRect'),
    database: node('#241245', 'cylinder'),
    queue: node('#4A1A5E', 'bars'),
    decision: node('#331A66', 'diamond'),
    process: node('#1E2A6B', 'process'),
  },

  // 시안 커넥터 — 직각(cornerRadius 0), 소형 삼각 마커.
  edge: {
    stroke: CYAN,
    width: HAIR,
    dashPattern: '',
    cornerRadius: 0,
    marker: {
      size: 6,
      arrow: CYAN,
      diamond: CYAN,
      circle: CYAN,
      cross: CYAN,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(255,255,255,0.05)', labelColor: LABEL },
    l2: { borderWidth: 1.5, bgTint: 'rgba(255,255,255,0.03)', labelColor: LABEL },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: LABEL },
  },

  // 네온 마젠타 대시 경계(비텍스트 장식).
  boundary: {
    stroke: MAGENTA,
    width: 1,
    dashPattern: '4 4',
    radius: 0,
    labelColor: LABEL,
  },

  typography: {
    titleFont: "'Orbitron', 'Helvetica Neue', Arial, sans-serif",
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

// ext 변수 — 글로우 색·노드 스캔라인 색·쇼케이스 스캔라인·퍼스펙티브 그리드 색.
// preset마다 전량 재정의해 colorway 전환 시 글로우/스캔라인/그리드가 함께 교체된다.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-glow': MAGENTA,
  '--bbangto-viz-ext-scanline-node': 'rgba(40,224,240,0.28)', // 노드 위 시안 스캔라인
  '--bbangto-viz-ext-scanline': 'rgba(40,224,240,0.05)', // 쇼케이스 CRT 스캔라인(저대비)
  '--bbangto-viz-ext-grid': 'rgba(255,61,154,0.16)', // 네온 마젠타 퍼스펙티브 그리드
};

/** sunset — 선셋 오렌지/바이올렛 리드 colorway(따뜻한 다크 퍼플 그라운드, 잉크만 오렌지로 교체). */
const SUNSET_INK = '#FF9E4D'; // 네온 선셋 오렌지(따뜻한 다크 퍼플 대비 8.54:1)
const sunsetFoundations = makeVizColorway(foundations, {
  name: 'synthwave-01-sunset',
  canvas: { bg: '#2A0E2E', grid: '#3E1840' },
  ink: SUNSET_INK, // keyline/edge/boundary/shape.stroke/marker 일괄(비텍스트)
  c4LabelColor: LABEL, // 라벨은 니어화이트 유지(ink가 c4 라벨을 오렌지로 덮지 않게 명시)
  nodeFills: {
    person: '#5A1A3E',
    external: '#3E1230',
    container: '#5E1A44',
    database: '#3A1228',
    queue: '#5A1636',
    decision: '#4A1A3E',
    process: '#3E1A46',
  },
  palette: {
    p1: '#FF8A3D', // 선셋 오렌지 리드
    p2: '#FF5DA2', // 핫 마젠타
    p3: '#9B5DE5', // 바이올렛
    p4: '#FFC24D', // 앰버
    p7: '#FF7E4F',
    p8: '#C77DFF',
  },
});

const SUNSET_EXT: Record<string, string> = {
  '--bbangto-viz-ext-glow': '#FF8A3D',
  '--bbangto-viz-ext-scanline-node': 'rgba(255,158,77,0.28)',
  '--bbangto-viz-ext-scanline': 'rgba(255,158,77,0.05)',
  '--bbangto-viz-ext-grid': 'rgba(155,93,229,0.18)', // 바이올렛 그리드
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Neon Magenta × Cyan',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'sunset',
    label: 'Sunset Orange × Violet',
    foundations: sunsetFoundations,
    extendedFoundations: SUNSET_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-synthwave-01';
// 글로우 = 절제된 drop-shadow(SVG defs 불필요). 쇼케이스 표면 = CRT 스캔라인(3px 피치) +
// 네온 퍼스펙티브 그리드(수직/수평 40px) 레이어. 전부 name 스코프라 타 가이드 오염 없음
// (!important는 쇼케이스 인라인 bg를 이기기 위함). 텍스트엔 어떤 데코도 얹지 않는다.
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="synthwave-01"] [data-viz-synth-glow] {
  filter: drop-shadow(0 0 5px var(--bbangto-viz-ext-glow));
}
[data-bbangto-viz-style-guide="synthwave-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image:
    repeating-linear-gradient(
      0deg,
      var(--bbangto-viz-ext-scanline) 0,
      var(--bbangto-viz-ext-scanline) 1px,
      transparent 1px,
      transparent 3px
    ),
    repeating-linear-gradient(
      90deg,
      var(--bbangto-viz-ext-grid) 0,
      var(--bbangto-viz-ext-grid) 1px,
      transparent 1px,
      transparent 40px
    ),
    repeating-linear-gradient(
      0deg,
      var(--bbangto-viz-ext-grid) 0,
      var(--bbangto-viz-ext-grid) 1px,
      transparent 1px,
      transparent 40px
    ) !important;
}
`;

/**
 * CRT 스캔라인 오버레이 — 노드 bbox 위 4px 피치 수평 라인 그룹(NEW 데코레이션).
 * 지오메트리 불변: x/y/width/height로 라인 y좌표만 계산해 형제 <line>으로 방출한다.
 * aria-hidden + 텍스트 없음(순수 장식). stroke는 ext-scanline-node 토큰 → colorway 전환에 반응한다.
 */
function scanlineOverlay(x: number, y: number, w: number, h: number): React.ReactNode {
  const pitch = 4;
  const lines: React.ReactNode[] = [];
  for (let ly = Math.ceil(y) + pitch; ly < y + h; ly += pitch) {
    lines.push(
      <line
        key={ly}
        x1={x}
        y1={ly}
        x2={x + w}
        y2={ly}
        style={{ stroke: vvar('ext', 'scanline-node'), strokeWidth: 1 }}
      />,
    );
  }
  return (
    <g data-viz-synth="" aria-hidden="true">
      {lines}
    </g>
  );
}

/**
 * 신스웨이브 노드 — Node에 모든 prop을 그대로 전달하고, 그룹 안에 CRT 스캔라인 오버레이를
 * 추가로 렌더한다(데코레이션). data-viz-synth-glow로 그룹에 절제된 네온 글로우를 건다.
 * 라벨(children)은 스캔라인 그룹 밖에서 렌더 → 스캔라인이 텍스트를 절대 덮지 않는다.
 */
function SynthwaveNode({ children, ...props }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return (
    <Node {...props} data-viz-synth-glow="">
      {scanlineOverlay(props.x, props.y, props.width, props.height)}
      {children}
    </Node>
  );
}
SynthwaveNode.displayName = 'SynthwaveNode';

/** 타입 태그 — 니어화이트 라벨(스캔라인/글로우 미적용, 다크 fill 위 대비 안정). */
function SynthwaveTag(props: TagProps) {
  return <Tag {...props} fill={LABEL} fontSize={props.fontSize ?? 10} />;
}
SynthwaveTag.displayName = 'SynthwaveTag';

/** 흐름선 라벨 — 다크 캔버스 칩 + 니어화이트 텍스트(그리드/스캔라인 위 판독성). */
function SynthwaveEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fill={LABEL} padding={4} />;
}
SynthwaveEdgeLabel.displayName = 'SynthwaveEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: SynthwaveNode,
  Tag: SynthwaveTag,
  EdgeLabel: SynthwaveEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'SynthwaveShowcaseBase' });

/** 쇼케이스 — 모티프 CSS(스캔라인 + 퍼스펙티브 그리드 그라운드 + 글로우)를 주입한 뒤 공용 씬 렌더. */
function SynthwaveShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
SynthwaveShowcase.displayName = 'SynthwaveShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '딥 퍼플/네이비 그라운드 + 네온 시안 헤어라인 + 불투명 딥 퍼플/인디고 솔리드 노드 fill. 노드는 4px 피치 CRT 스캔라인으로 덮이고, 쇼케이스 표면엔 네온 퍼스펙티브 그리드 + CRT 스캔라인이 깔린다. 글로우는 절제(drop-shadow 5px).',
    dos: [
      '그라운드는 딥 퍼플/네이비 고정(다크 전용)',
      '도형 윤곽은 네온 시안 1px 라인',
      '스캔라인/그리드는 저대비 오버레이 장식으로만',
    ],
    donts: [
      '라이트 그라운드 전환 금지(이 가이드는 다크 전용)',
      '글로우 중첩·고강도 블러 금지',
      '스캔라인/그리드를 텍스트 위에 얹기 금지(판독성)',
    ],
  },
  color: {
    summary:
      '네온 마젠타 + 시안 리드(default) / 선셋 오렌지 + 바이올렛 리드(sunset). 노드 fill은 어두운 채도로 낮춰 니어화이트 라벨을 안전하게 받친다. 글로우/스캔라인/그리드 색은 ext 토큰으로만 → colorway 전환이 일괄 반영된다.',
    dos: [
      '기본 잉크/엣지는 네온 시안(sunset은 오렌지)',
      '강조 액센트는 마젠타/바이올렛 한 색으로 절제',
      'colorway 전환은 ext-glow/scanline/grid 토큰 교체로',
    ],
    donts: [
      '노드 fill을 밝은 네온으로 채우기 금지(니어화이트 라벨 대비 붕괴)',
      '고채도 네온을 텍스트 색으로 사용 금지(대비 불안정)',
    ],
  },
  typography: {
    summary:
      '레트로퓨처 디스플레이 타이틀 + mono 수치. 모든 라벨은 니어화이트로 딥 퍼플 그라운드·다크 노드 fill 위에서 ≥10.6:1.',
    dos: ['라벨·수치는 니어화이트', '강조는 크기·굵기로', '수치는 mono로 정렬'],
    donts: ['네온 마젠타/시안 색 텍스트 금지(대비 흔들림)', '라벨을 스캔라인/글로우 위에 겹쳐 판독성 저하 금지'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 니어화이트(#F2ECFF) — 딥 퍼플 그라운드(#160B2E) 대비 16.24:1, 다크 솔리드 노드 fill 위 ≥10.6:1(auditVizContrast 게이트). node fill은 전부 불투명 솔리드라 라벨 대비가 canvas 무관하게 안정적이다. CRT 스캔라인·퍼스펙티브 그리드·글로우는 전부 순수 장식이라 텍스트에 얹지 않는다.',
    dos: [
      '텍스트는 니어화이트(다크 표면 위 ≥4.5:1)',
      '스캔라인·그리드·글로우는 저대비·비상호작용 장식으로 유지',
      '값 인코딩은 색뿐 아니라 라벨/형태로 병기',
    ],
    donts: [
      '텍스트를 스캔라인/그리드/글로우 위에 직접 얹기 금지',
      '네온 색 텍스트로 본문 라벨 표기 금지(대비 미달)',
      '스캔라인 오버레이를 의미 인코딩 수단으로 오용 금지(순수 데코)',
    ],
  },
};

export const synthwave01VizStyleGuide: VisualizationStyleGuide = {
  name: 'synthwave-01',
  description:
    'Synthwave paint — deep purple/navy ground, neon magenta + cyan ink, opaque deep-indigo node fills, receding perspective grid and CRT scanlines injected as name-scoped motif CSS (shape/showcase only), restrained neon glow, near-white labels for AA contrast on dark surfaces.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { SynthwaveShowcase: SynthwaveShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '신스웨이브 모티프 — 딥 퍼플 그라운드 위 네온 시안 라인 도형을 CRT 스캔라인으로 덮고, 쇼케이스 표면엔 네온 퍼스펙티브 그리드 + 스캔라인을 깐다. 글로우는 절제, 라벨은 니어화이트.',
    components: {
      Node: {
        description:
          '불투명 딥 퍼플/인디고 솔리드 fill + 네온 시안 라인 도형을 SynthwaveNode wrapper가 감싼다 — bbox 위에 4px 피치 CRT 스캔라인 그룹(data-viz-synth, aria-hidden)을 형제로 깔고(지오메트리 불변), 그룹에 절제된 네온 글로우를 건다.',
        specs: [
          '불투명 딥 퍼플 fill + 시안 1px 라인',
          'CRT 스캔라인 4px 피치(data-viz-synth, ext-scanline-node 색)',
          'glow drop-shadow 5px([data-viz-synth-glow])',
        ],
      },
      Tag: {
        description: '타입 태그는 니어화이트 라벨 — 다크 fill 위 대비가 안정적이다(스캔라인/글로우 미적용).',
        specs: ['니어화이트', '10px', '다크 fill 위 ≥10.6:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 다크 캔버스 칩 + 니어화이트 텍스트 — 그리드/스캔라인 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '패딩 4px', '니어화이트'],
      },
    },
    example: SynthwaveShowcase as React.FC,
  },
  meta: {
    displayName: 'Synthwave_01',
    family: 'viz-synthwave',
    summary:
      '딥 퍼플/네이비 그라운드 + 네온 마젠타·시안 + 원근 퍼스펙티브 그리드·CRT 스캔라인·절제된 글로우의 80s 레트로퓨처 신스웨이브 데이터 시각화 페인트.',
    tags: ['dark', 'neon', 'vivid', 'retro', 'futuristic', 'gradient'],
    mood: { formality: 2, energy: 5, warmth: 3, density: 3, ornament: 4 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'glow',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'dark',
      contrast: 'high',
    },
    domains: ['gaming', 'entertainment', 'crypto-web3', 'marketing', 'dashboard'],
    useWhen: [
      '게이밍·엔터테인먼트·크립토처럼 80s 레트로퓨처 네온 무드가 필요한 노드/차트/다이어그램에 쓴다.',
      '다크 테마 대시보드·데모 화면을 퍼스펙티브 그리드 + CRT 스캔라인으로 강렬하게 부각할 때 쓴다.',
      '네온 마젠타·시안(또는 선셋 오렌지·바이올렛)으로 에너지 넘치는 임팩트를 줄 때 쓴다.',
    ],
    avoidWhen: [
      '라이트 배경·인쇄 지향 문서형 차트가 필요할 때 피한다(다크 전용).',
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(고에너지 네온).',
      '저채도 절제와 색각 안정성이 우선인 대규모 데이터 차트에 피한다.',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: false,
      motionHeavy: false,
      darkFirst: true,
    },
    related: ['neon-gradient-dark-01', 'hud-telemetry-01'],
  },
};
