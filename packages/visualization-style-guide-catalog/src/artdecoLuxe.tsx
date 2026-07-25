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
 * ArtDeco_Luxe_01 — 니어블랙(또는 딥그린) 그라운드 + 골드 대칭 라인 프레임의 아르데코 럭셔리 페인트.
 * 근거: KAN-039 P2 1:1 단일 family(viz-artdeco-luxe). 절제·격식·기하 대칭이 아이덴티티.
 *
 * 새 데코레이션 1종: **golden symmetric frame** (ArtDecoLuxeNode wrapper). HudNode의 corner-bracket
 * 선례를 확장 — bbox에서 순수 지오메트리로 계산한 **stepped(지구라트) 코너 4개 + 내부 대칭 라인 프레임**을
 * 형제 <path>로 그린다. 4모서리는 두 축 모두에 대해 mirror-symmetric(dx/dy 부호만 뒤집어 생성).
 * 프레임 그룹은 `<g data-viz-artdeco-frame aria-hidden="true">`로 텍스트를 담지 않는 순수 장식이며,
 * 라벨(children)은 프레임 밖에서 정상 렌더된다. 지오메트리 불변 — 코어/headless 무변경, 이 파일 안에서만 산다.
 *
 * 접근성(다크 우선): 라인/엣지 골드(#CBA253)는 니어블랙 대비 8.13:1·딥그린 대비 7.53:1(≥4.5). 모든
 * 노드 fill은 다크 솔리드(니어블랙 틴트·딥그린)이고 라벨은 크림(#EFE6D0) → 다크 fill 위 11.4~14.9:1(≥4.5).
 * 프레임/플루팅은 순수 장식이라 텍스트에 얹지 않는다.
 */

const BLACK = '#0E0E0C'; // 니어블랙 그라운드(웜)
const GOLD = '#CBA253'; // 골드 — 라인/엣지/프레임 잉크(니어블랙 대비 8.13:1)
const GOLD_LT = '#D8B45E'; // 라이트 골드 — 코너 액센트
const CREAM = '#EFE6D0'; // 크림 — 모든 텍스트 라벨(다크 fill 위 ≥11:1)

// 모든 kind는 다크 솔리드 fill + 골드 헤어라인 윤곽 + 크림 라벨. glyph는 라인 아이콘.
const node = (fill: string, glyph: string, dashed?: boolean) => ({
  fill,
  keyline: GOLD,
  keylineWidth: 1,
  tagColor: CREAM,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'artdeco-luxe-01',

  canvas: {
    bg: BLACK,
    grid: '#1C1A14', // 저대비 웜 그리드
    gridUnit: 8,
  },

  // 골드 주도 + 딥그린/브론즈/크림/아이보리 보조. 전부 파싱 가능한 hex.
  palette: {
    p1: GOLD, // 골드
    p2: '#12281E', // 딥그린
    p3: CREAM, // 크림
    p4: '#9C7A3C', // 브론즈
    p5: '#F5EFE0', // 아이보리
    p6: GOLD_LT, // 라이트 골드
    p7: BLACK, // 니어블랙
    p8: '#1E4D38', // 뮤트 그린
  },

  // 제네릭 도형 기본 = 골드 헤어라인 + 절제된 골드 워시(멀티플라이 아님, 낮은 알파).
  shape: {
    fill: 'rgba(203,162,83,0.10)',
    stroke: GOLD,
    strokeWidth: 1,
  },

  // kind별 다크 솔리드 fill(니어블랙 틴트·딥그린) + 골드 윤곽 + 크림 라벨.
  node: {
    person: node('#12281E', 'user'),
    external: node('#1A1A16', 'arrowOut', true),
    container: node('#171712', 'stackedRect'),
    database: node('#0F231B', 'cylinder'),
    queue: node('#20201A', 'bars'),
    decision: node('#14140F', 'diamond'),
    process: node('#1B2A22', 'process'),
  },

  // 골드 커넥터 — 샤프(cornerRadius 0), 소형 마커.
  edge: {
    stroke: GOLD,
    width: 1,
    dashPattern: '',
    cornerRadius: 0,
    marker: {
      size: 6,
      arrow: GOLD,
      diamond: GOLD,
      circle: GOLD,
      cross: GOLD,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(203,162,83,0.10)', labelColor: CREAM },
    l2: { borderWidth: 1.5, bgTint: 'rgba(203,162,83,0.06)', labelColor: CREAM },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: CREAM },
  },

  boundary: {
    stroke: GOLD,
    width: 1,
    dashPattern: '2 4',
    radius: 0,
    labelColor: CREAM,
  },

  typography: {
    titleFont: "'Cormorant Garamond', 'Playfair Display', 'Didot', Georgia, serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 700,
    sizes: {
      title: '16px',
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

// ext 변수 — 프레임/코너 액센트/플루팅 색. preset마다 재정의해 colorway 전환에 함께 반응한다.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-frame': GOLD,
  '--bbangto-viz-ext-frame-accent': GOLD_LT,
  '--bbangto-viz-ext-flute': 'rgba(203,162,83,0.08)', // 저대비 골드 수직 플루팅(그라운드 장식)
};

/** emerald — 딥그린 그라운드 + 골드 프레임 colorway(골드 아이덴티티 유지, 그라운드/노드 틴트만 그린으로). */
const emeraldFoundations = makeVizColorway(foundations, {
  name: 'artdeco-luxe-01-emerald',
  canvas: { bg: '#0C1A14', grid: '#153025' },
  ink: GOLD, // keyline/edge/boundary/shape.stroke/marker 골드 유지
  tagColor: CREAM,
  c4LabelColor: CREAM,
  boundaryLabelColor: CREAM,
  nodeFills: {
    person: '#123024',
    external: '#0F1F18',
    container: '#14261D',
    database: '#0E241A',
    queue: '#173026',
    decision: '#0F1E17',
    process: '#12241C',
  },
  palette: {
    p2: '#0F2A1F',
    p7: '#0C1A14',
    p8: '#1F5A40',
  },
});

const EMERALD_EXT: Record<string, string> = {
  '--bbangto-viz-ext-frame': GOLD,
  '--bbangto-viz-ext-frame-accent': GOLD_LT,
  '--bbangto-viz-ext-flute': 'rgba(203,162,83,0.07)',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Black + Gold',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'emerald',
    label: 'Deep Green + Gold',
    foundations: emeraldFoundations,
    extendedFoundations: EMERALD_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-artdeco-luxe-01';
// 쇼케이스 그라운드 = 다크 캔버스 + 저대비 골드 수직 플루팅(아르데코). 순수 배경 장식이라 텍스트 무영향.
// (!important는 인라인 bg(vvar canvas.bg)를 이기기 위함 — 가이드 name 스코프라 오염 없음.)
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="artdeco-luxe-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent 21px,
    var(--bbangto-viz-ext-flute) 21px,
    var(--bbangto-viz-ext-flute) 22px
  ) !important;
}
`;

/**
 * golden symmetric frame — 노드 bbox에서 stepped(지구라트) 코너 4개 + 내부 대칭 라인 프레임을 그린다.
 * 4모서리는 부호(dx/dy)만 뒤집어 두 축 모두에 대해 mirror-symmetric으로 생성 → 아르데코 대칭.
 * 지오메트리 불변: x/y/width/height로 path d만 계산해 형제 <path>로 방출한다(순수 데코, 텍스트 없음).
 */
function artDecoFrame(x: number, y: number, w: number, h: number): React.ReactNode[] {
  const s = Math.max(4, Math.min(7, w * 0.06, h * 0.06)); // 스텝(계단) 단위
  const arm = Math.max(14, Math.min(26, w * 0.22, h * 0.28)); // 코너 팔 길이
  const pad = Math.max(4, Math.min(7, w * 0.06, h * 0.08)); // 내부 프레임 인셋

  const frameStyle: React.CSSProperties = {
    fill: 'none',
    stroke: vvar('ext', 'frame'),
    strokeWidth: 1,
    strokeLinejoin: 'miter',
  };
  const accentStyle: React.CSSProperties = {
    fill: 'none',
    stroke: vvar('ext', 'frameAccent'),
    strokeWidth: 1.5,
    strokeLinejoin: 'miter',
    strokeLinecap: 'square',
  };

  // stepped 코너 — 코너점(cx,cy)에서 내부 방향(dx,dy)으로 2단 계단을 이룬다.
  const corner = (cx: number, cy: number, dx: number, dy: number): string =>
    `M ${cx} ${cy + dy * arm}` +
    ` L ${cx} ${cy + dy * 2 * s}` +
    ` L ${cx + dx * s} ${cy + dy * 2 * s}` +
    ` L ${cx + dx * s} ${cy + dy * s}` +
    ` L ${cx + dx * 2 * s} ${cy + dy * s}` +
    ` L ${cx + dx * 2 * s} ${cy}` +
    ` L ${cx + dx * arm} ${cy}`;

  const ix = x + pad;
  const iy = y + pad;
  const iw = w - 2 * pad;
  const ih = h - 2 * pad;

  return [
    // 내부 대칭 라인 프레임(inset 사각형) — 아르데코 더블룰.
    <path
      key="frame"
      data-viz-artdeco-part="frame"
      d={`M ${ix} ${iy} H ${ix + iw} V ${iy + ih} H ${ix} Z`}
      style={frameStyle}
    />,
    // 4모서리 stepped 코너(mirror-symmetric) — 부호만 뒤집어 생성.
    <path key="tl" data-viz-artdeco-part="corner-tl" d={corner(x, y, 1, 1)} style={accentStyle} />,
    <path key="tr" data-viz-artdeco-part="corner-tr" d={corner(x + w, y, -1, 1)} style={accentStyle} />,
    <path key="br" data-viz-artdeco-part="corner-br" d={corner(x + w, y + h, -1, -1)} style={accentStyle} />,
    <path key="bl" data-viz-artdeco-part="corner-bl" d={corner(x, y + h, 1, -1)} style={accentStyle} />,
  ];
}

/**
 * golden symmetric frame wrapper — Node에 모든 prop을 그대로 전달하고, 프레임 그룹(장식)을
 * 형제로 추가한다. 프레임 그룹은 aria-hidden + 텍스트 없음(순수 데코). 라벨(children)은 프레임 밖.
 */
function ArtDecoLuxeNode({ children, ...props }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return (
    <Node {...props}>
      <g data-viz-artdeco-frame="" aria-hidden="true">
        {artDecoFrame(props.x, props.y, props.width, props.height)}
      </g>
      {children}
    </Node>
  );
}
ArtDecoLuxeNode.displayName = 'ArtDecoLuxeNode';

/** 타입 태그 — 다크 그라운드 위 크림 라벨(프레임/플루팅 미적용, 대비 안정). */
function ArtDecoLuxeTag(props: TagProps) {
  return <Tag {...props} fill={CREAM} fontSize={props.fontSize ?? 10} />;
}
ArtDecoLuxeTag.displayName = 'ArtDecoLuxeTag';

/** 흐름선 라벨 — 다크 캔버스 칩 + 크림 텍스트(수치 판독용). */
function ArtDecoLuxeEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fill={CREAM} padding={4} />;
}
ArtDecoLuxeEdgeLabel.displayName = 'ArtDecoLuxeEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: ArtDecoLuxeNode,
  Tag: ArtDecoLuxeTag,
  EdgeLabel: ArtDecoLuxeEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'ArtDecoLuxeShowcaseBase' });

/** 쇼케이스 — 모티프 CSS(다크 그라운드 + 골드 플루팅)를 주입한 뒤 공용 씬을 렌더. */
function ArtDecoLuxeShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
ArtDecoLuxeShowcase.displayName = 'ArtDecoLuxeShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '니어블랙(또는 딥그린) 그라운드 + 골드 1px 헤어라인 라인워크. 노드는 stepped 코너 4개 + 내부 대칭 라인 프레임(golden symmetric frame)으로 감싼다. 그림자 없음, 배경 골드 플루팅은 저대비 장식.',
    dos: [
      '노드는 golden symmetric frame으로 감싼다(stepped 코너 + 내부 프레임)',
      '윤곽/엣지는 골드 1px 헤어라인',
      '그라운드는 니어블랙 또는 딥그린 다크만',
    ],
    donts: [
      '프레임을 비대칭으로 깨뜨리기 금지(아르데코 대칭 아이덴티티)',
      '그림자/글로우 추가 금지(shadow:none)',
      '라이트 그라운드 전환 금지(다크 전용)',
    ],
  },
  color: {
    summary:
      '골드(#CBA253) 주도 + 딥그린/브론즈 보조 + 크림/아이보리 라벨. 프레임·코너 액센트·플루팅 색은 ext 토큰으로만 → colorway 전환이 일괄 반영된다.',
    dos: [
      '라인/엣지/프레임은 골드 한 색으로 통일',
      '노드 fill은 다크 솔리드(니어블랙 틴트·딥그린)',
      'colorway 전환은 ext-frame/frame-accent/flute 토큰 교체로',
    ],
    donts: ['골드/딥그린 외 임의 유채색 남발 금지', '밝은 fill로 크림 라벨 대비 붕괴 금지'],
  },
  typography: {
    summary:
      '격식 있는 세리프 디스플레이 타이틀 + mono 수치. 모든 라벨은 크림 — 다크 그라운드 대비 ≥11:1로 고대비.',
    dos: ['타이틀은 세리프 디스플레이', '수치·값은 mono', '라벨은 크림으로 대비 확보'],
    donts: ['골드 색 텍스트로 본문 라벨 표기 금지(면 위 대비 흔들림)', '라벨을 플루팅/프레임 위에 겹쳐 판독성 저하 금지'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 크림 — 다크 노드 fill·틴트 위 ≥11:1(auditVizContrast 게이트, contrastIntent aa). 라인/엣지 골드는 니어블랙 8.13:1·딥그린 7.53:1(≥4.5). golden symmetric frame과 골드 플루팅은 순수 장식이라 텍스트에 얹지 않으며, 의미를 색만으로 인코딩하지 않는다(형태/글리프 병기).',
    dos: [
      '텍스트는 크림(다크 표면 위 ≥4.5:1)',
      '프레임·플루팅은 저대비·비상호작용 장식으로 유지',
      '상태 의미는 라벨/형태로도 병기(색 단독 금지)',
    ],
    donts: [
      '텍스트를 프레임/플루팅 위에 직접 얹기 금지',
      '골드 색 텍스트로 본문 라벨 표기 금지(대비 불안정)',
      'golden symmetric frame을 의미 인코딩 수단으로 오용 금지(순수 데코)',
    ],
  },
};

export const artdecoLuxe01VizStyleGuide: VisualizationStyleGuide = {
  name: 'artdeco-luxe-01',
  description:
    'Art Deco luxe paint — near-black (or deep-green) ground, gold hairline linework, nodes framed by a wrapper-drawn golden symmetric frame (stepped ziggurat corners + inner mirror-symmetric line frame), dark solid node fills with cream labels, faint gold vertical fluting ground, no shadow.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { ArtDecoLuxeShowcase: ArtDecoLuxeShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '아르데코 럭셔리 모티프 — 다크 그라운드 위 골드 라인 도형을 stepped 코너 + 내부 대칭 라인 프레임으로 감싸고, 배경엔 저대비 골드 플루팅을 얹는다. 라벨은 크림.',
    components: {
      Node: {
        description:
          '다크 솔리드 골드 라인 도형을 golden symmetric frame wrapper가 감싼다 — bbox에서 stepped 코너 4개(부호만 뒤집은 mirror-symmetric)와 내부 대칭 라인 프레임을 형제 <path>로 그린다(지오메트리 불변, aria-hidden 장식).',
        specs: [
          '다크 솔리드 fill + 골드 1px 라인',
          'stepped 코너 4개 + 내부 프레임(data-viz-artdeco-frame, ext-frame/frame-accent 색)',
          'shadow: none',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 그라운드 위 크림 라벨 — 프레임/플루팅 미적용으로 대비가 안정적이다.',
        specs: ['크림 라벨', '10px', '다크 표면 위 ≥11:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 다크 캔버스 칩 + 크림 텍스트 — 수치 판독용.',
        specs: ['bg = canvas.bg', '패딩 4px', '크림'],
      },
    },
    example: ArtDecoLuxeShowcase as React.FC,
  },
  meta: {
    displayName: 'ArtDeco_Luxe_01',
    family: 'viz-artdeco-luxe',
    summary:
      '니어블랙/딥그린 그라운드 + 골드 대칭 라인 프레임(stepped 코너)·격식 세리프·플루팅의 아르데코 럭셔리 데이터 시각화 페인트.',
    tags: ['dark', 'luxurious', 'geometric', 'high-contrast', 'serif'],
    mood: { formality: 5, energy: 2, warmth: 3, density: 3, ornament: 4 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'dark',
      contrast: 'high',
    },
    domains: ['luxury', 'marketing', 'portfolio', 'editorial'],
    useWhen: [
      '럭셔리 브랜드·프리미엄 마케팅 비주얼에 아르데코 격식과 골드 대칭 프레임 무드를 줄 때 쓴다.',
      '포트폴리오·에디토리얼에서 절제되고 포멀한 다크 럭스 도식이 필요할 때 쓴다.',
      '골드 라인 + stepped 대칭 프레임으로 기하학적 고급감을 원할 때 쓴다.',
    ],
    avoidWhen: [
      '라이트 배경·인쇄 지향 문서형 차트가 필요할 때 피한다(다크 전용).',
      '캐주얼·플레이풀·손그림 무드가 목표일 때 피한다(격식 5).',
      '다색 채움으로 풍부한 색 인코딩이 필요할 때 피한다(골드 모노 라인 아이덴티티).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: true,
    },
    related: ['hud-telemetry-01', 'corporate-schematic-01'],
  },
};
