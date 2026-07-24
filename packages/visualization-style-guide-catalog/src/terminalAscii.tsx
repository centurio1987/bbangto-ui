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
 * Terminal_Ascii_01 — 다크 콘솔 모노스페이스 전면 + 포스포 그린 잉크의 TUI 페인트.
 * 근거: viz-style-expansion.md §4-d(Terminal_Ascii_01, Tier A, dark).
 *
 * 핵심 아이덴티티: 노드는 **무채움**(fill:'none') + 그린 1px 박스 키라인, 라벨은 mono.
 * titleFont === monoFont(JetBrains Mono) — 전면 모노. 커서 블록은 장식(정보 아님).
 * edge는 직각(cornerRadius 0)·그린·마커 최소로 박스드로잉 뉘앙스를 낸다.
 * 스캔라인/포스포 글로우 모티프는 wrapper가 문서 스코프 <style>로 1회 주입한다.
 */

const GREEN = '#3DDC84'; // 포스포 그린 잉크(primary)
const AMBER = '#F2C94C'; // 빈티지 CRT 앰버(secondary / amber colorway ink)
const HAIR = 1;

// 무채움 라인 전용 노드 — fill 'none', 그린 1px 박스, tagColor = 잉크(캔버스 위 mono 라벨).
const node = (glyph: string, dashed?: boolean) => ({
  fill: 'none',
  keyline: GREEN,
  keylineWidth: HAIR,
  tagColor: GREEN,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'terminal-ascii-01',

  canvas: {
    bg: '#0B0F0A',
    grid: '#12301C',
    gridUnit: 8,
  },

  // 그린 램프 + 보조 시안/앰버 액센트. p1 = 포스포 그린(잉크).
  palette: {
    p1: '#3DDC84',
    p2: '#54C7F0',
    p3: '#F2C94C',
    p4: '#2FA968',
    p5: '#7FF5B4',
    p6: '#1E7A48',
    p7: '#D6FFE8',
    p8: '#12301C',
  },

  // 제네릭 도형도 무채움 라인(콘솔 박스) — 그린 1px 키라인.
  shape: {
    fill: 'none',
    stroke: GREEN,
    strokeWidth: HAIR,
  },

  // 전 kind 무채움 — 종류 구분은 glyph + mono 라벨로(모노크롬이라 색 구분 없음).
  node: {
    person: node('user'),
    external: node('arrowOut', true),
    container: node('stackedRect'),
    database: node('cylinder'),
    queue: node('bars'),
    decision: node('diamond'),
    process: node('process'),
  },

  // 직각 그린 커넥터 — cornerRadius 0(박스드로잉), 마커 최소.
  edge: {
    stroke: GREEN,
    width: HAIR,
    dashPattern: '',
    cornerRadius: 0,
    marker: {
      size: 5,
      arrow: GREEN,
      diamond: GREEN,
      circle: GREEN,
      cross: GREEN,
    },
  },

  c4: {
    l1: { borderWidth: 1.5, bgTint: 'rgba(61,220,132,0.05)', labelColor: GREEN },
    l2: { borderWidth: 1, bgTint: 'rgba(61,220,132,0.03)', labelColor: GREEN },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: GREEN },
  },

  boundary: {
    stroke: GREEN,
    width: HAIR,
    dashPattern: '2 2',
    radius: 0,
    labelColor: GREEN,
  },

  // titleFont === monoFont — 전면 모노스페이스(Terminal 시그니처).
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

/** amber — 빈티지 CRT 앰버 모노크롬 colorway(웜 near-black 그라운드 + 앰버 잉크 전면). */
const amberFoundations = makeVizColorway(foundations, {
  name: 'terminal-ascii-01-amber',
  canvas: { bg: '#0D0B04', grid: '#2A2410' },
  ink: AMBER,
  tagColor: AMBER,
  boundaryLabelColor: AMBER,
  c4Tints: ['rgba(242,201,76,0.05)', 'rgba(242,201,76,0.03)', 'transparent'],
  palette: {
    p1: '#F2C94C',
    p2: '#E8A23A',
    p3: '#FFE08A',
    p4: '#C98A2A',
    p5: '#FFF0B8',
    p6: '#8A6414',
    p7: '#FFF6D8',
    p8: '#2A2410',
  },
});

// 커서 블록/글로우/스캔라인 ext 토큰 — preset마다 재정의해 모티프 CSS가 잉크색을 따라간다.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-cursor': '#3DDC84',
  '--bbangto-viz-ext-glow': 'rgba(61,220,132,0.6)',
  '--bbangto-viz-ext-scanline': 'rgba(61,220,132,0.06)',
};

const AMBER_EXT: Record<string, string> = {
  '--bbangto-viz-ext-cursor': '#F2C94C',
  '--bbangto-viz-ext-glow': 'rgba(242,201,76,0.55)',
  '--bbangto-viz-ext-scanline': 'rgba(242,201,76,0.06)',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  // 카탈로그 불변식: 첫 preset의 foundations는 base foundations와 동일 객체 참조.
  {
    key: 'default',
    label: 'Phosphor Green',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'amber',
    label: 'Amber CRT (Monochrome)',
    foundations: amberFoundations,
    extendedFoundations: AMBER_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-terminal-ascii-01';
// 스캔라인은 쇼케이스 배경 위 저대비 오버레이(장식), 커서 블록엔 포스포 글로우.
// 반드시 가이드 name 스코프로 작성해 다른 스타일 가이드를 오염시키지 않는다.
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="terminal-ascii-01"] [data-viz-showcase] {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    var(--bbangto-viz-ext-scanline) 3px,
    var(--bbangto-viz-ext-scanline) 4px
  ) !important;
}
[data-bbangto-viz-style-guide="terminal-ascii-01"] [data-viz-terminal-cursor] {
  filter: drop-shadow(0 0 3px var(--bbangto-viz-ext-glow));
}
`;

/**
 * 무채움 그린 박스 + 우하단 커서 블록(장식). 모티프 CSS(스캔라인 + 커서 글로우)를
 * 문서 스코프로 1회 주입한다 — 쇼케이스가 TerminalNode를 렌더하면 스캔라인도 함께 적용된다.
 */
function TerminalNode(props: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const size = 6;
  const cx = props.x + props.width - size - 4;
  const cy = props.y + props.height - size - 4;
  return (
    <>
      <Node {...props} fill="none" strokeWidth={props.strokeWidth ?? HAIR} />
      <rect
        x={cx}
        y={cy}
        width={size}
        height={size}
        style={{ fill: vvar('ext', 'cursor') }}
        data-viz-terminal-cursor=""
      />
    </>
  );
}
TerminalNode.displayName = 'TerminalNode';

/** 타입 태그 — 쉘 프롬프트 mono 표기(> type). 캔버스 위 잉크 단색. */
function TerminalTag(props: TagProps) {
  return <Tag {...props} label={`> ${props.label}`} fontSize={10} />;
}
TerminalTag.displayName = 'TerminalTag';

/** 흐름선 라벨 — 다크 캔버스 칩 위 mono 캡션. */
function TerminalEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} padding={4} />;
}
TerminalEdgeLabel.displayName = 'TerminalEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: TerminalNode,
  Tag: TerminalTag,
  EdgeLabel: TerminalEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'TerminalAsciiShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '다크 콘솔 그라운드 위 무채움 그린 1px 박스 + 직각 커넥터(cornerRadius 0). 커서 블록·스캔라인은 장식이며 정보를 인코딩하지 않는다.',
    dos: ['노드는 무채움 라인(fill:none)', '모서리는 샤프(radius 0)', '커넥터는 직각 박스드로잉 뉘앙스'],
    donts: ['면 채움/그라디언트 금지(라인 전용)', '라운드 코너 금지', '스캔라인에 의미 부여 금지'],
  },
  color: {
    summary:
      '단일 잉크 모노크롬 — default는 포스포 그린, amber는 빈티지 CRT 앰버. 시안/앰버는 팔레트 액센트로만.',
    dos: ['잉크는 스트로크·라벨·마커 전용 단색', 'colorway 전환으로 그린↔앰버 모노크롬 교체', '액센트는 팔레트 범위에서만'],
    donts: ['잉크 외 유채색을 노드 채움으로 사용 금지', '저채도 톤온톤(그린 위 딤 그린) 금지'],
  },
  typography: {
    summary: 'titleFont === monoFont(JetBrains Mono) — 제목·라벨·수치 전면 모노스페이스. 태그는 쉘 프롬프트(> type) 문법.',
    dos: ['모든 텍스트는 mono', '태그는 프롬프트 표기(> type)', '제목은 700 weight'],
    donts: ['산세리프/세리프 혼용 금지(전면 모노 유지)', '11px 미만 본문 금지'],
  },
  accessibility: {
    summary:
      '그린 #3DDC84 on #0B0F0A ≈ 10.8:1, 앰버 #F2C94C on #0D0B04 ≈ 12.4:1 — 모든 라벨 표면에서 AAA(≥7). 모노크롬이라 색으로 종류를 구분하지 않고 glyph/라벨로 인코딩한다.',
    dos: [
      '라벨-표면 대비 7:1 이상 유지(AAA)',
      '노드 종류는 glyph·mono 라벨로 구분(색 아님)',
      '커서 글로우/스캔라인은 opacity 낮게(정보면 비간섭)',
    ],
    donts: [
      '색(단일 잉크)만으로 카테고리 의미 인코딩 금지',
      '저채도 톤온톤 라벨 금지(대비 급락)',
      '스캔라인/글로우로 텍스트 가독성 저해 금지',
    ],
  },
};

export const terminalAscii01VizStyleGuide: VisualizationStyleGuide = {
  name: 'terminal-ascii-01',
  description:
    'Dark-console TUI paint — full monospace (titleFont = JetBrains Mono), phosphor-green ink, unfilled 1px box nodes, orthogonal box-drawing edges, decorative cursor block + scanline. Amber CRT monochrome colorway.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { TerminalAsciiShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '터미널/TUI 모티프 — 무채움 그린 박스, 직각 박스드로잉 커넥터, 전면 모노스페이스 라벨, 우하단 커서 블록(포스포 글로우) + 스캔라인 오버레이.',
    components: {
      Node: {
        description:
          '노드는 무채움 그린 1px 박스로 그려지고 우하단에 커서 블록(장식)을 두른다 — 콘솔 프롬프트 인상.',
        specs: ['fill: none, keyline 1px 그린', '커서 블록 6px(우하단, ext-cursor)', 'radius 0 샤프'],
      },
      Tag: {
        description: '타입 태그는 쉘 프롬프트 mono 표기(> type) — 캔버스 위 잉크 단색.',
        specs: ['> type 프롬프트 표기', 'JetBrains Mono 10px', '잉크 단색'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 다크 캔버스 칩 위 mono 캡션 — 커넥터와 분리.',
        specs: ['bg = canvas.bg', '패딩 4px', 'mono'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Terminal_Ascii_01',
    family: 'viz-terminal-ascii',
    summary:
      '다크 콘솔 그라운드 위 전면 모노스페이스 + 포스포 그린 무채움 박스·직각 커넥터·커서 블록의 TUI/터미널풍 데이터 시각화 페인트(앰버 CRT 모노크롬 colorway 포함).',
    tags: ['dark', 'mono', 'technical', 'sharp', 'monochrome', 'neon'],
    mood: { formality: 3, energy: 2, warmth: 2, density: 3, ornament: 1 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'glow',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'dark',
      contrast: 'high',
    },
    domains: ['dev-tools', 'docs', 'saas', 'crypto-web3'],
    useWhen: [
      '개발자 도구·CLI/TUI 무드의 다크 콘솔풍 다이어그램/차트가 필요할 때 쓴다.',
      '전면 모노스페이스 + 포스포 그린(또는 앰버 CRT) 모노크롬 아이덴티티를 원할 때 쓴다.',
      '기술 문서·crypto/web3에서 절제된 터미널 심미가 어울릴 때 쓴다.',
    ],
    avoidWhen: [
      '라이트 배경·인쇄 지향 문서형 차트가 필요할 때 피한다(이 가이드는 다크 전용).',
      '노드 종류를 다색 시맨틱 채움으로 구분해야 할 때 피한다(모노크롬 라인 전용).',
      '따뜻한 손그림 친근함이 목표일 때 피한다.',
    ],
    accessibility: {
      contrastIntent: 'aaa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: true,
    },
    related: ['blueprint-technical-01', 'ink-line-duotone-01'],
  },
};
