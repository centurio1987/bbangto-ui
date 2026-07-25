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
 * Bento_Stat_01 — 벤토 타일 모듈(모듈형 라운드 stat 카드) viz 스타일 가이드.
 * 근거: viz 확장 P2 1:1 단일 family(KAN-039). 대시보드형 벤토 그리드 무드 —
 * 라이트 뉴트럴 표면 위 넉넉히 라운드된 타일 카드 + 절제된 액센트, 다크 슬레이트 잉크.
 *
 * 새 데코레이션 1종: **bento tile frame**(BentoStatNode wrapper). Node 박스(x/y/w/h)에서
 * 파생한 라운드 카드 아웃라인(frame)과 소형 액센트 코너 칩(chip)을 형제 <g>로 그린다
 * (`[data-viz-bento-tile]`, aria-hidden, 텍스트 없음 — 순수 장식/지오메트리 불변). 실 Node와
 * 라벨(children)은 데코 밖에서 정상 렌더 → 접근성/가독성에 영향 0. hudTelemetry의 코너 브래킷
 * 선례(node bbox → path 계산)와 동형이며, 코어/headless는 무변경(이 파일 안에서만 산다).
 *
 * 접근성: 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 다크 슬레이트 잉크로
 * 라이트 뉴트럴/타일 표면 위 ≥12:1(auditVizContrast 게이트 — AAA 7:1 여유 통과). shape/edge 잉크도
 * 캔버스 대비 ≥13:1(텍스트 4.5·비텍스트 3 상회). 타일 frame/chip은 전부 aria-hidden 장식이라
 * 정보를 색만으로 인코딩하지 않는다(형태·라벨 병기).
 */

const INK = '#1F2430'; // 다크 슬레이트 잉크 — 라인/윤곽/모든 텍스트 라벨(라이트 뉴트럴 대비 ≥13:1)
const ACCENT = '#4C6EF5'; // 인디고 액센트 — 코너 칩/강조(비텍스트 장식)
const CANVAS = '#F1F3F6'; // 라이트 뉴트럴 캔버스
const KEYLINE = 1.5; // thin 보더

// kind별 라이트 타일 표면(솔리드) + 슬레이트 잉크 윤곽 + 다크 잉크 라벨.
// 모든 fill은 아주 밝아 다크 잉크 라벨이 AAA(≥7:1)로 안전(worst 13.45:1).
const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK,
  keylineWidth: KEYLINE,
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'bento-stat-01',

  canvas: {
    bg: CANVAS,
    grid: '#E3E7EE', // 미세 뉴트럴 그리드
    gridUnit: 8,
  },

  // 뉴트럴 슬레이트 램프 + 인디고 단일 액센트(p1). 전부 파싱 가능한 hex.
  palette: {
    p1: ACCENT, // 인디고 액센트
    p2: INK, // 다크 슬레이트 잉크
    p3: '#3B4252', // 슬레이트
    p4: '#5A6478', // 미드 슬레이트
    p5: '#8A93A6', // 라이트 슬레이트
    p6: '#B7BECC', // 페일 슬레이트
    p7: '#EEF1F5', // 타일 표면
    p8: '#FFFFFF', // 화이트 타일
  },

  // 제네릭 도형 = 화이트 타일 채움 + 슬레이트 잉크 윤곽.
  shape: {
    fill: '#FFFFFF',
    stroke: INK,
    strokeWidth: KEYLINE,
  },

  // kind별 라이트 타일 표면 + 슬레이트 잉크 윤곽 + 다크 잉크 라벨.
  node: {
    person: node('#FFFFFF', 'user'),
    external: node('#EDF0F5', 'arrowOut', { dashed: true }),
    container: node('#F5F7FA', 'stackedRect'),
    database: node('#E9EFFB', 'cylinder'),
    queue: node('#F3F5F8', 'bars'),
    decision: node('#EDF0F5', 'diamond'),
    process: node('#F5F7FA', 'process'),
  },

  // 슬레이트 잉크 커넥터 — 넉넉한 라운드 코너(라운드 타일 무드) + 소형 화살촉.
  edge: {
    stroke: INK,
    width: KEYLINE,
    dashPattern: '',
    cornerRadius: 8,
    marker: {
      size: 7,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(31,36,48,0.05)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(31,36,48,0.03)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 라운드 타일 경계 — 큰 radius(rounded tiles).
  boundary: {
    stroke: INK,
    width: 1,
    dashPattern: '2 5',
    radius: 16,
    labelColor: INK,
  },

  typography: {
    titleFont: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 700,
    sizes: {
      title: '15px',
      label: '12px',
      tag: '10px',
      mono: '11px',
    },
  },

  iconStyle: 'line',

  // 넉넉한 spacing — 모듈형 벤토 그리드의 여백.
  spacing: {
    nodePad: 16,
    laneGap: 32,
  },

  motion: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// ext 변수 — 타일 frame stroke/fill + 액센트 코너 칩 색. preset마다 재정의해
// colorway 전환 시 타일 아웃라인/칩이 함께 교체된다.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-accent': ACCENT,
  '--bbangto-viz-ext-tile-stroke': '#D8DDE6', // 서브틀 카드 아웃라인(비텍스트 장식)
  '--bbangto-viz-ext-tile-fill': 'none',
};

/** slate — 쿨 슬레이트/블루 주도 colorway(쿨 라이트 뉴트럴 + 스틸 블루 액센트). */
const slateFoundations = makeVizColorway(foundations, {
  name: 'bento-stat-01-slate',
  canvas: { bg: '#ECEFF4', grid: '#DCE1EA' },
  ink: '#1C2333', // 쿨 다크 슬레이트 잉크(쿨 캔버스 대비 13.62:1)
  tagColor: '#1C2333',
  boundaryLabelColor: '#1C2333',
  shape: { fill: '#F5F8FD' },
  nodeFills: {
    person: '#F5F8FD',
    external: '#E6ECF6',
    container: '#EFF3FA',
    database: '#E2ECFB',
    queue: '#EDF1F8',
    decision: '#E6ECF6',
    process: '#EFF3FA',
  },
  c4Tints: ['rgba(28,35,51,0.05)', 'rgba(28,35,51,0.03)', 'transparent'],
  palette: { p1: '#3D5A80', p3: '#39435A', p5: '#8791A6', p7: '#E7ECF4', p8: '#F5F8FD' },
});

const SLATE_EXT: Record<string, string> = {
  '--bbangto-viz-ext-accent': '#3D5A80',
  '--bbangto-viz-ext-tile-stroke': '#CBD4E2',
  '--bbangto-viz-ext-tile-fill': 'none',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Neutral + Indigo',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'slate',
    label: 'Cool Slate + Steel',
    foundations: slateFoundations,
    extendedFoundations: SLATE_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-bento-stat-01';
// 타일 frame에 절제된 소프트 섀도(드롭섀도 1겹)를 걸어 벤토 카드 입체를 준다. 순수 장식 —
// 스타일 가이드 name 스코프라 다른 가이드 오염 없음(텍스트엔 미적용).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="bento-stat-01"] [data-viz-bento-frame] {
  filter: drop-shadow(0 1px 2px rgba(31,36,48,0.10));
}
`;

/**
 * bento tile frame — 노드 bbox에서 파생한 (1) 라운드 카드 아웃라인(frame) +
 * (2) 소형 액센트 코너 칩(chip)을 그린다(NEW 데코레이션). 지오메트리 불변: x/y/w/h로
 * rect/좌표만 계산해 형제 요소로 방출한다. frame은 ext-tile-stroke, chip은 ext-accent 색이라
 * colorway 전환에 반응한다.
 */
function bentoTile(x: number, y: number, w: number, h: number): React.ReactNode[] {
  const pad = 6; // 타일 카드가 노드 박스를 감싸는 여백
  const chipW = 14;
  const chipH = 6;
  return [
    // (1) 라운드 카드 아웃라인 — 노드 박스보다 살짝 큰 라운드 rect(카드 프레이밍).
    <rect
      key="frame"
      data-viz-bento-frame=""
      x={x - pad}
      y={y - pad}
      width={w + pad * 2}
      height={h + pad * 2}
      rx={14}
      ry={14}
      style={{
        fill: vvar('ext', 'tileFill'),
        stroke: vvar('ext', 'tileStroke'),
        strokeWidth: 1.25,
      }}
    />,
    // (2) 액센트 코너 칩 — 우상단 소형 라운드 인디케이터(대시보드 stat 모듈 힌트).
    <rect
      key="chip"
      data-viz-bento-chip=""
      x={x + w - chipW - 8}
      y={y + 8}
      width={chipW}
      height={chipH}
      rx={3}
      ry={3}
      style={{ fill: vvar('ext', 'accent'), stroke: 'none' }}
    />,
  ];
}

/**
 * 벤토 노드 — 라운드 타일 frame + 액센트 코너 칩(장식, aria-hidden, 텍스트 없음)을 형제 <g>로
 * 먼저 깔고(카드 배경), 그 위에 실 Node + 라벨(children)을 렌더한다. 데코는 지오메트리에서만
 * 파생하고 텍스트를 절대 가리거나 왜곡하지 않는다.
 */
function BentoStatNode({ children, ...rest }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return (
    <>
      <g data-viz-bento-tile="" aria-hidden="true">
        {bentoTile(rest.x, rest.y, rest.width, rest.height)}
      </g>
      <Node {...rest}>{children}</Node>
    </>
  );
}
BentoStatNode.displayName = 'BentoStatNode';

/** 타입 태그 — 다크 슬레이트 잉크 라벨(타일 표면 위 ≥12:1). */
function BentoStatTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
BentoStatTag.displayName = 'BentoStatTag';

/** 흐름선 라벨 — 캔버스 칩 배경 + 다크 잉크(타일 사이에서 또렷). */
function BentoStatEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
BentoStatEdgeLabel.displayName = 'BentoStatEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: BentoStatNode,
  Tag: BentoStatTag,
  EdgeLabel: BentoStatEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'BentoStatShowcaseBase' });

/** 쇼케이스 — 타일 섀도 모티프 CSS를 주입한 뒤 공용 씬을 렌더. */
function BentoStatShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
BentoStatShowcase.displayName = 'BentoStatShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '라이트 뉴트럴 캔버스 위 라운드 타일 카드(모듈형 벤토 그리드). 각 노드는 라운드 frame + 액센트 코너 칩으로 타일화되고, 절제된 소프트 섀도로 살짝 떠 보인다. 넉넉한 spacing으로 모듈 사이 여백을 확보한다.',
    dos: [
      '도형은 라이트 타일 표면 + 슬레이트 잉크 1.5px 윤곽',
      '노드는 라운드 카드 frame으로 타일화(큰 radius)',
      '섀도는 소프트하게 1겹만(카드 부양감)',
    ],
    donts: [
      '샤프 각·두꺼운 보더로 벤토 무드 상실 금지',
      '진한/다중 그림자로 무거운 입체 금지(소프트 유지)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '뉴트럴 슬레이트 램프 + 단일 액센트(default 인디고 / slate 스틸 블루). 액센트는 코너 칩·강조 그래픽에만 흐르고, 타일 표면은 라이트 뉴트럴로 유지한다.',
    dos: [
      '타일 표면은 화이트/아주 라이트 틴트',
      '액센트는 코너 칩·강조 1곳에만 절제',
      'colorway 전환은 ext-accent/tile-stroke 토큰 교체로',
    ],
    donts: [
      '타일 표면을 고채도 색으로 채우기 금지(다크 라벨 대비 흔들림)',
      '다색 팔레트 남발 금지(모듈형 정돈감 상실)',
    ],
  },
  typography: {
    summary:
      '모던 그로테스크 산세리프(Inter) 타이틀 + mono 수치. 대시보드 stat 카드의 큰 값과 작은 라벨 위계. 모든 라벨은 다크 슬레이트 잉크로 라이트 타일 위 고대비.',
    dos: ['타이틀은 그로테스크 산세리프', '수치·값은 mono로 정렬', '라벨은 다크 슬레이트 잉크'],
    donts: ['장식 서체 금지(모던 대시보드 톤)', '액센트 색 텍스트 금지(칩은 장식 전용)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 다크 슬레이트 잉크 — 라이트 뉴트럴/타일 표면 위 ≥12:1(auditVizContrast 게이트, AAA 7:1 여유 통과). 타일 frame/chip·소프트 섀도는 전부 aria-hidden 장식이라 텍스트에 얹지 않고, 의미를 색만으로 인코딩하지 않는다.',
    dos: [
      '라벨은 다크 슬레이트 잉크(타일 위 ≥7:1)',
      '타일 frame/chip은 지오메트리 파생 장식(aria-hidden)',
      '값 인코딩은 색뿐 아니라 라벨/형태로 병기',
    ],
    donts: [
      '액센트 칩으로 의미를 색 단독 인코딩 금지(순수 장식)',
      '타일 표면을 저대비 중간 톤으로 채워 다크 라벨 대비 저하 금지',
      '라벨을 코너 칩/섀도 위에 겹쳐 판독성 저하 금지',
    ],
  },
};

export const bentoStat01VizStyleGuide: VisualizationStyleGuide = {
  name: 'bento-stat-01',
  description:
    'Bento tile modules — light neutral canvas, generously rounded stat tile cards framed by wrapper-drawn card outlines with an accent corner chip, dark slate ink linework and labels, restrained soft shadow. Clean, modern, dashboard-forward.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { BentoStatShowcase: BentoStatShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '벤토 타일 모티프 — 라이트 뉴트럴 위 라운드 타일 카드로 노드를 프레이밍(카드 frame + 액센트 코너 칩)하고, 소프트 섀도로 살짝 부양시킨다. 라벨은 다크 슬레이트 잉크.',
    components: {
      Node: {
        description:
          '노드는 라이트 타일 표면 + 슬레이트 잉크 윤곽 도형을 BentoStatNode wrapper가 라운드 카드 frame으로 감싼다 — 노드 bbox에서 파생한 라운드 rect(frame)와 우상단 액센트 칩(chip)을 형제 <g>(aria-hidden)로 그리고 소프트 섀도를 건다. 라벨은 데코 밖.',
        specs: [
          '라이트 타일 fill + 슬레이트 잉크 1.5px',
          'bento frame(data-viz-bento-frame, rx 14) + 액센트 칩(data-viz-bento-chip)',
          'soft drop-shadow 1겹(frame 한정)',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 슬레이트 잉크 라벨 — 타일 표면 위 고대비.',
        specs: ['다크 슬레이트 잉크', '10px', '타일 표면 위 ≥12:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 캔버스 칩 배경 + 다크 잉크로 타일 사이에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '다크 슬레이트 잉크'],
      },
    },
    example: BentoStatShowcase as React.FC,
  },
  meta: {
    displayName: 'Bento_Stat_01',
    family: 'viz-bento-stat',
    summary:
      '라이트 뉴트럴 위 라운드 타일 카드로 노드를 모듈화한 벤토 대시보드형 인포그래픽 — 소프트 섀도·액센트 코너 칩·다크 슬레이트 잉크 라벨.',
    tags: ['grid', 'minimal', 'flat', 'rounded', 'light'],
    mood: { formality: 3, energy: 2, warmth: 2, density: 2, ornament: 2 },
    characteristics: {
      cornerRadius: 'round',
      borderWeight: 'thin',
      shadow: 'soft',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['saas', 'dashboard', 'dev-tools', 'fintech'],
    useWhen: [
      '대시보드·SaaS 지표 화면을 모듈형 벤토 타일 카드로 정돈해 낼 때 쓴다.',
      '라운드 타일 + 라이트 뉴트럴의 깔끔하고 모던한 대시보드 무드가 필요할 때 쓴다.',
      'stat 카드·KPI 모듈을 절제된 액센트로 강조하며 레이아웃 주도로 구성할 때 쓴다.',
    ],
    avoidWhen: [
      '다크 그라운드·네온 하이테크 계기판 무드가 필요할 때 피한다(HUD/네온 계열을 쓴다).',
      '손그림·아날로그 인쇄 질감이 목표일 때 피한다(마커/리소 계열을 쓴다).',
      '고채도 면 채움으로 강렬한 색 인코딩이 필요한 인포그래픽에 피한다(라이트 뉴트럴 표면).',
    ],
    accessibility: {
      contrastIntent: 'aaa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['minimal-line-01', 'blueprint-technical-01'],
  },
};
