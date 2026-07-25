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
 * Hud_Telemetry_01 — 딥 틸다크 그라운드 + 네온 시안 라인 위에 얹은 헤드업 디스플레이(HUD)
 * 텔레메트리 페인트(Tier B). 근거: viz-style-expansion.md §4-d.
 *
 * 새 데코레이션 1종: **corner-bracket frame**. Node를 감싸 노드 bbox 4모서리에 ⌐¬ 형태의
 * L 브래킷 <path>를 형제로 그린다(지오메트리 불변, 순수 데코레이션). 코어/headless 무변경 —
 * 이 파일 안에서만 산다. 글로우/스캔라인은 F7(neon) 인프라 재사용: SVG <defs> 없이
 * CSS drop-shadow + repeating-linear-gradient 스캔라인을 스타일 가이드 name 스코프로 주입한다.
 */

const CYAN = '#22D3EE'; // 네온 시안 — 기본 잉크/엣지
const AMBER = '#FBBF24'; // 앰버 — 경보 강조
const WHITE = '#FFFFFF'; // 라벨(면 없는 라인 위 순백)
const HAIR = 1;

// 모든 kind는 UNFILLED(fill:'none') + 시안 헤어라인. tag는 순백(캔버스 위 ~18:1).
const node = (glyph: string, dashed?: boolean) => ({
  fill: 'none',
  keyline: CYAN,
  keylineWidth: HAIR,
  tagColor: WHITE,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'hud-telemetry-01',

  canvas: {
    bg: '#07131A',
    grid: '#0E2A38',
    gridUnit: 8,
  },

  // 시안 주도 + 앰버 경보 + 화이트/틸 보조. 전부 파싱 가능한 hex.
  palette: {
    p1: CYAN,
    p2: AMBER,
    p3: '#67E8F9',
    p4: '#0E7490',
    p5: '#A5F3FC',
    p6: WHITE,
    p7: '#38BDF8',
    p8: '#155E75',
  },

  // 제네릭 도형 기본 paint = 무채움 + 시안 헤어라인(계약 스타일시트가 바인딩).
  shape: {
    fill: 'none',
    stroke: CYAN,
    strokeWidth: HAIR,
  },

  node: {
    person: node('user'),
    external: node('arrowOut', true),
    container: node('stackedRect'),
    database: node('cylinder'),
    queue: node('bars'),
    decision: node('diamond'),
    process: node('process'),
  },

  // 시안 커넥터 — 직각(cornerRadius 0), 작은 삼각 마커.
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
    l1: { borderWidth: 2, bgTint: 'rgba(34,211,238,0.06)', labelColor: WHITE },
    l2: { borderWidth: 1.5, bgTint: 'rgba(34,211,238,0.04)', labelColor: WHITE },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: WHITE },
  },

  boundary: {
    stroke: CYAN,
    width: 1,
    dashPattern: '2 4',
    radius: 0,
    labelColor: WHITE,
  },

  typography: {
    titleFont: "'JetBrains Mono', 'Courier New', monospace",
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

// ext 변수 — corner-bracket 색·글로우·스캔라인·경보색. preset마다 전량 재정의해
// colorway 전환 시 브래킷/글로우/스캔라인이 함께 교체된다.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-glow': CYAN,
  '--bbangto-viz-ext-bracket': CYAN,
  '--bbangto-viz-ext-scanline': 'rgba(34,211,238,0.06)',
  '--bbangto-viz-ext-alert': AMBER,
};

/** amber — 앰버 경보 주도 colorway(딥 틸다크 그라운드 유지, 잉크만 앰버로 교체). */
const amberFoundations = makeVizColorway(foundations, {
  name: 'hud-telemetry-01-amber',
  ink: AMBER,
  palette: { p1: AMBER, p2: CYAN, p4: '#B45309', p7: '#F59E0B', p8: '#78350F' },
});

const AMBER_EXT: Record<string, string> = {
  '--bbangto-viz-ext-glow': AMBER,
  '--bbangto-viz-ext-bracket': AMBER,
  '--bbangto-viz-ext-scanline': 'rgba(251,191,36,0.06)',
  '--bbangto-viz-ext-alert': CYAN,
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Neon Cyan HUD',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'amber',
    label: 'Amber Alert HUD',
    foundations: amberFoundations,
    extendedFoundations: AMBER_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-hud-telemetry-01';
// 글로우 = 절제된 drop-shadow(SVG defs 불필요). 스캔라인 = 저대비 repeating-linear-gradient.
// 전부 스타일 가이드 name 스코프라 다른 가이드를 오염시키지 않는다(!important는 인라인 bg를 이기기 위함).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="hud-telemetry-01"] [data-viz-hud-glow] {
  filter: drop-shadow(0 0 4px var(--bbangto-viz-ext-glow));
}
[data-bbangto-viz-style-guide="hud-telemetry-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: repeating-linear-gradient(
    to bottom,
    var(--bbangto-viz-ext-scanline) 0,
    var(--bbangto-viz-ext-scanline) 1px,
    transparent 1px,
    transparent 3px
  ) !important;
}
`;

/**
 * corner-bracket frame — 노드 bbox 4모서리에 ⌐¬ 형태 L 브래킷을 그린다(NEW 데코레이션).
 * 지오메트리 불변: x/y/width/height로 path만 계산해 형제 <path>로 방출한다.
 * 각 브래킷은 fill:none + ext-bracket 색 stroke → colorway 전환에 반응한다.
 */
function cornerBrackets(x: number, y: number, w: number, h: number): React.ReactNode[] {
  const len = Math.max(6, Math.min(14, w * 0.25, h * 0.25));
  const style: React.CSSProperties = {
    fill: 'none',
    stroke: vvar('ext', 'bracket'),
    strokeWidth: 1.5,
    strokeLinejoin: 'miter',
  };
  return [
    <path key="tl" data-viz-hud-bracket="tl" d={`M ${x} ${y + len} L ${x} ${y} L ${x + len} ${y}`} style={style} />,
    <path key="tr" data-viz-hud-bracket="tr" d={`M ${x + w - len} ${y} L ${x + w} ${y} L ${x + w} ${y + len}`} style={style} />,
    <path key="br" data-viz-hud-bracket="br" d={`M ${x + w} ${y + h - len} L ${x + w} ${y + h} L ${x + w - len} ${y + h}`} style={style} />,
    <path key="bl" data-viz-hud-bracket="bl" d={`M ${x + len} ${y + h} L ${x} ${y + h} L ${x} ${y + h - len}`} style={style} />,
  ];
}

/**
 * corner-bracket wrapper — Node에 모든 prop을 그대로 전달하고, 그룹 안에 4모서리 브래킷을
 * 추가로 렌더한다(데코레이션). data-viz-hud-glow로 그룹에 절제된 글로우를 건다.
 */
function HudNode({ children, ...props }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return (
    <Node {...props} data-viz-hud-glow="">
      {cornerBrackets(props.x, props.y, props.width, props.height)}
      {children}
    </Node>
  );
}
HudNode.displayName = 'HudNode';

/** 타입 태그 — 라인 위 순백 mono 라벨(면이 없어 텍스트 대비 안정). */
function HudTag(props: TagProps) {
  return <Tag {...props} fill={WHITE} fontSize={props.fontSize ?? 10} />;
}
HudTag.displayName = 'HudTag';

/** 흐름선 라벨 — 다크 캔버스 칩 + 순백 mono 텍스트(수치 판독용). */
function HudEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fill={WHITE} padding={4} />;
}
HudEdgeLabel.displayName = 'HudEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: HudNode,
  Tag: HudTag,
  EdgeLabel: HudEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'HudTelemetryShowcaseBase' });

/** 쇼케이스 — 모티프 CSS(스캔라인 그라운드 + 글로우)를 주입한 뒤 공용 씬을 렌더. */
function HudTelemetryShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
HudTelemetryShowcase.displayName = 'HudTelemetryShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '딥 틸다크 그라운드 + 네온 시안 헤어라인 라인워크. 도형은 무채움(fill:none)이고 4모서리 corner-bracket 프레임으로 감싼다. 글로우는 절제(drop-shadow 4px), 스캔라인은 저대비 오버레이.',
    dos: ['도형은 무채움 + 시안 1px 라인', '노드는 corner-bracket 프레임으로 감싼다', '글로우는 drop-shadow 1겹만'],
    donts: ['도형에 솔리드/그라디언트 채움 금지(라인 아이덴티티)', '글로우 중첩·고강도 블러 금지', '라이트 그라운드 전환 금지(다크 전용)'],
  },
  color: {
    summary: '시안 주도 + 앰버 경보(alert) + 순백 라벨. corner-bracket·글로우·스캔라인 색은 ext 토큰으로만 → colorway 전환이 일괄 반영된다.',
    dos: ['기본 잉크/엣지는 시안', '경보/피크는 앰버 한 색으로만', 'colorway 전환은 ext-bracket/glow/scanline 토큰 교체로'],
    donts: ['시안·앰버 외 임의 유채색 남발 금지', '경보색을 일반 상태에 사용 금지'],
  },
  typography: {
    summary: '전면 mono(JetBrains Mono) — 라벨·수치 모두 순백 고정(딥다크 대비 ~18:1). 텔레메트리 수치는 mono로 정렬.',
    dos: ['라벨·수치는 순백 mono', '강조는 크기·굵기로'],
    donts: ['시안/앰버 색 텍스트 금지(라인 위 대비 흔들림)', '라벨을 글로우/스캔라인 위에 겹쳐 판독성 저하 금지'],
  },
  accessibility: {
    summary:
      '모든 라벨/태그/경계 텍스트는 순백 — 딥 틸다크(#07131A) 대비 ~18:1(≥ aa). 글로우/스캔라인은 순수 데코레이션이라 텍스트에 얹지 않는다. corner-bracket은 형태 프레이밍 보조일 뿐 의미를 색만으로 인코딩하지 않는다.',
    dos: [
      '텍스트는 순백(라인/캔버스 위 4.5:1 이상)',
      '글로우·스캔라인은 저대비·비상호작용으로 유지',
      '상태 의미는 라벨/형태로도 병기(색 단독 금지)',
    ],
    donts: [
      '텍스트를 글로우/스캔라인 위에 직접 얹기 금지',
      '시안/앰버 색 텍스트로 본문 라벨 표기 금지(대비 불안정)',
      'corner-bracket을 의미 인코딩 수단으로 오용 금지(순수 데코)',
    ],
  },
};

export const hudTelemetry01VizStyleGuide: VisualizationStyleGuide = {
  name: 'hud-telemetry-01',
  description:
    'HUD telemetry paint — deep teal-dark ground, neon cyan hairline linework, unfilled nodes framed by wrapper-drawn corner brackets, amber alert accent, restrained CSS glow + scanline overlay.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { HudTelemetryShowcase: HudTelemetryShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      'HUD 텔레메트리 모티프 — 무채움 시안 라인 도형을 4모서리 corner-bracket 프레임으로 감싸고, 절제된 글로우와 저대비 스캔라인을 얹는다. 라벨은 순백 mono.',
    components: {
      Node: {
        description:
          '무채움(fill:none) 시안 라인 도형을 corner-bracket wrapper가 감싼다 — bbox 4모서리에 ⌐¬ L 브래킷 <path>를 형제로 그리고(지오메트리 불변), 그룹에 절제된 글로우를 건다.',
        specs: ['fill:none + 시안 1px 라인', 'corner-bracket 4개(data-viz-hud-bracket, ext-bracket 색)', 'glow drop-shadow 4px'],
      },
      Tag: {
        description: '타입 태그는 라인 위 순백 mono 라벨 — 면이 없어 텍스트 대비가 안정적이다.',
        specs: ['순백 mono', '10px', '캔버스 위 ~18:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 다크 캔버스 칩 + 순백 mono 텍스트 — 수치 판독용.',
        specs: ['bg = canvas.bg', '패딩 4px', '순백 mono'],
      },
    },
    example: HudTelemetryShowcase as React.FC,
  },
  meta: {
    displayName: 'Hud_Telemetry_01',
    family: 'viz-hud-telemetry',
    summary:
      '딥 틸다크 그라운드 + 네온 시안 라인 + corner-bracket 프레임·앰버 경보·절제된 글로우/스캔라인의 헤드업 디스플레이형 텔레메트리 페인트.',
    tags: ['dark', 'neon', 'technical', 'sharp', 'mono', 'futuristic'],
    mood: { formality: 4, energy: 3, warmth: 1, density: 3, ornament: 2 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'glow',
      density: 'balanced',
      motion: 'subtle',
      colorScheme: 'dark',
      contrast: 'high',
    },
    domains: ['dashboard', 'dev-tools', 'gaming', 'crypto-web3'],
    useWhen: [
      '실시간 대시보드·텔레메트리 화면을 HUD(헤드업 디스플레이) 무드로 조립할 때 쓴다.',
      '개발 도구·게이밍·크립토처럼 하이테크 다크 계기판 감성이 필요한 노드/차트에 쓴다.',
      '무채움 시안 라인 + corner-bracket 프레임으로 절제된 테크니컬 도식을 원할 때 쓴다.',
    ],
    avoidWhen: [
      '라이트 배경·인쇄 지향 문서형 차트가 필요할 때 피한다(다크 전용).',
      '솔리드/그라디언트 채움 도형의 풍부한 색 인코딩이 필요할 때 피한다(라인 아이덴티티).',
      '따뜻하고 친근한 손그림 무드가 목표일 때 피한다.',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: false,
      motionHeavy: false,
      darkFirst: true,
    },
    related: ['neon-gradient-dark-01', 'terminal-ascii-01'],
  },
};
