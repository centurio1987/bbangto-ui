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
 * DarkLuxe_01 — 순수 블랙 그라운드 + 얇은 골드 헤어라인 룰 + 큰 세리프 디스플레이 페이스의
 * 다크 럭셔리 에디토리얼 페인트(KAN-039, 고유 family `viz-darkluxe`).
 *
 * 무드: 미니멀·절제·값비싼. 기하 프레임(ArtDeco 계열)이 아니라 **얇은 골드 헤어라인 룰**과
 * **큰 세리프 타이틀**이 시그니처다. 도형은 니어블랙 솔리드로 채우고 크림/아이보리 라벨을 얹는다.
 *
 * 데코레이션 1종: **골드 헤어라인 룰**. DarkLuxeNode가 노드 박스 위/아래로 얇은 골드 <line>을
 * 형제로 그린다(`<g data-viz-darkluxe-rule aria-hidden="true">`, 텍스트 없음, 순수 장식).
 * 지오메트리 불변 — x/y/width로 좌표만 계산한다. 코어/headless 무변경(이 파일 안에서만 산다).
 *
 * 접근성: 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 웜 크림으로
 * 니어블랙 표면 위 ≥13:1 — 전부 AAA(≥7) 실측. 골드 헤어라인 잉크는 블랙 대비 8.16:1(텍스트 ≥4.5,
 * 비텍스트 ≥3 모두 충족). 헤어라인 룰은 aria-hidden 장식이라 의미를 색만으로 인코딩하지 않는다.
 */

const BLACK = '#0A0A0A'; // 순수/니어 블랙 그라운드
const GOLD = '#C6A15B'; // 골드 헤어라인 — 라인/윤곽/엣지 잉크(블랙 대비 8.16:1)
const CREAM = '#EDE3CE'; // 웜 크림/아이보리 — 모든 텍스트 라벨(니어블랙 위 ≥13:1)
const BRONZE = '#8C6D34'; // 브론즈 — 경계선(비텍스트 장식, 블랙 대비 4.10:1)
const CHARCOAL = '#1A1A1A'; // 차콜 — 그리드/보조
const HAIR = 1; // 헤어라인 1px

// kind별 니어블랙 솔리드 채움 + 골드 헤어라인 키라인 + 크림 라벨. 크림은 전 채움 위 ≥13:1(AAA).
const node = (fill: string, glyph: string, dashed?: boolean) => ({
  fill,
  keyline: GOLD,
  keylineWidth: HAIR,
  tagColor: CREAM,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'darkluxe-01',

  canvas: {
    bg: BLACK,
    grid: CHARCOAL, // 미세 차콜 그리드(거의 안 보이는 절제)
    gridUnit: 8,
  },

  // 골드 주도 + 크림/브론즈 보조 램프. 전부 파싱 가능한 hex.
  palette: {
    p1: GOLD,
    p2: CREAM,
    p3: BRONZE,
    p4: '#D9BE87', // 라이트 골드
    p5: '#5E4A22', // 딥 브론즈
    p6: '#A88748', // 뮤트 골드
    p7: CHARCOAL,
    p8: '#26211A', // 웜 차콜
  },

  // 제네릭 도형 = 니어블랙 솔리드 채움 + 골드 헤어라인 1px.
  shape: {
    fill: '#141414',
    stroke: GOLD,
    strokeWidth: HAIR,
  },

  node: {
    person: node('#151515', 'user'),
    external: node('#101010', 'arrowOut', true),
    container: node('#1A1A1A', 'stackedRect'),
    database: node('#161616', 'cylinder'),
    queue: node('#1C1712', 'bars'),
    decision: node('#121212', 'diamond'),
    process: node('#181818', 'process'),
  },

  // 골드 헤어라인 커넥터 — 직각(cornerRadius 0), 소형 화살촉.
  edge: {
    stroke: GOLD,
    width: HAIR,
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
    l1: { borderWidth: 2, bgTint: 'rgba(198,161,91,0.10)', labelColor: CREAM },
    l2: { borderWidth: 1.5, bgTint: 'rgba(198,161,91,0.06)', labelColor: CREAM },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: CREAM },
  },

  // 브론즈 파인 대시 경계(비텍스트 장식).
  boundary: {
    stroke: BRONZE,
    width: 1,
    dashPattern: '2 6',
    radius: 0,
    labelColor: CREAM,
  },

  typography: {
    // 큰 세리프 디스플레이 = 시그니처. 스택 말미 'serif' 폴백은 룩의 핵심.
    titleFont: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 500,
    sizes: {
      title: '18px', // 큰 세리프 타이틀
      label: '12px',
      tag: '10px',
      mono: '11px',
    },
  },

  iconStyle: 'line',

  spacing: {
    nodePad: 14,
    laneGap: 28,
  },

  motion: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// ext 변수 — 헤어라인 룰 색·크림 라벨·브론즈 액센트. preset마다 전량 재정의해
// colorway 전환 시 헤어라인/라벨/액센트가 함께 교체된다.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-hairline': GOLD,
  '--bbangto-viz-ext-label': CREAM,
  '--bbangto-viz-ext-accent': BRONZE,
};

const MGOLD = '#B99154'; // 뮤트 골드(웜 니어블랙 대비 6.75:1)
const OXBLOOD = '#6E2230'; // 옥스블러드 액센트(비텍스트 장식 — 텍스트/라인 잉크로 미사용)

/** oxblood — 웜 니어블랙 그라운드 + 뮤트 골드 잉크 + 옥스블러드 액센트 colorway. */
const oxbloodFoundations = makeVizColorway(foundations, {
  name: 'darkluxe-01-oxblood',
  canvas: { bg: '#120A0A', grid: '#241414' },
  ink: MGOLD, // shape/edge/boundary/keyline/marker 잉크
  shape: { fill: '#1A1010' },
  // c4 라벨은 크림 유지(ink로 덮이지 않게 명시) — AAA 라벨 대비 보전.
  c4LabelColor: CREAM,
  nodeFills: {
    person: '#1A1010',
    external: '#140C0C',
    container: '#211414',
    database: '#1C1212',
    queue: '#241A14',
    decision: '#170E0E',
    process: '#1E1414',
  },
  palette: {
    p1: MGOLD,
    p2: CREAM,
    p3: OXBLOOD,
    p4: '#D9BE87',
    p5: '#4A1E26',
    p6: '#8C3A46',
    p8: '#241414',
  },
});

const OXBLOOD_EXT: Record<string, string> = {
  '--bbangto-viz-ext-hairline': MGOLD,
  '--bbangto-viz-ext-label': CREAM,
  '--bbangto-viz-ext-accent': OXBLOOD,
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Black × Gold Hairline',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'oxblood',
    label: 'Oxblood × Muted Gold',
    foundations: oxbloodFoundations,
    extendedFoundations: OXBLOOD_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-darkluxe-01';
// 쇼케이스 그라운드는 순수 블랙 유지(인라인 vvar bg보다 우선하도록 !important — 가이드 name 스코프라 오염 없음).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="darkluxe-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
}
`;

/**
 * DarkLuxe 노드 — 노드 박스 위/아래로 얇은 골드 헤어라인 룰(<line>)을 형제로 그린다(NEW 데코).
 * 지오메트리 불변: x/y/width로 좌표만 계산해 aria-hidden 그룹(텍스트 없음)에 방출한다.
 * 헤어라인 색은 ext-hairline 토큰 → colorway 전환에 반응한다. 라벨(children)은 룰 밖에서 렌더.
 */
function DarkLuxeNode({ children, ...props }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const { x, y, width, height } = props;
  const ruleStyle: React.CSSProperties = {
    stroke: vvar('ext', 'hairline'),
    strokeWidth: 1,
  };
  return (
    <>
      {/* 골드 헤어라인 룰 — 상단/하단 언더라인 장식(aria-hidden, 텍스트 없음). */}
      <g data-viz-darkluxe-rule="" aria-hidden="true">
        <line x1={x} y1={y - 7} x2={x + width} y2={y - 7} style={ruleStyle} />
        <line x1={x} y1={y + height + 7} x2={x + width} y2={y + height + 7} style={ruleStyle} />
      </g>
      <Node {...props} strokeWidth={props.strokeWidth ?? HAIR} />
      {children}
    </>
  );
}
DarkLuxeNode.displayName = 'DarkLuxeNode';

/** 타입 태그 — 웜 크림 라벨(니어블랙 위 ≥13:1). */
function DarkLuxeTag(props: TagProps) {
  return <Tag {...props} fill={vvar('ext', 'label')} fontSize={props.fontSize ?? 10} />;
}
DarkLuxeTag.displayName = 'DarkLuxeTag';

/** 흐름선 라벨 — 블랙 칩 배경 + 크림 텍스트(헤어라인 위에서도 또렷). */
function DarkLuxeEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fill={vvar('ext', 'label')} padding={4} />;
}
DarkLuxeEdgeLabel.displayName = 'DarkLuxeEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: DarkLuxeNode,
  Tag: DarkLuxeTag,
  EdgeLabel: DarkLuxeEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'DarkLuxeShowcaseBase' });

/** 쇼케이스 — 모티프 CSS(순수 블랙 그라운드)를 주입한 뒤 공용 씬을 렌더. */
function DarkLuxeShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
DarkLuxeShowcase.displayName = 'DarkLuxeShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '순수 블랙 그라운드 + 니어블랙 솔리드 채움 + 골드 헤어라인 1px 라인워크. 노드는 상/하단 얇은 골드 헤어라인 룰로 감싼다(에디토리얼 시그니처). 그림자·글로우 없음.',
    dos: [
      '도형 윤곽·엣지는 골드 헤어라인 1px 고정',
      '노드는 상/하단 골드 헤어라인 룰로 프레이밍',
      '채움은 니어블랙 솔리드로 절제',
    ],
    donts: [
      '그림자·글로우·베벨 금지(미니멀 럭셔리 상실)',
      '두꺼운 보더·기하 프레임 금지(헤어라인 아이덴티티)',
      '라이트 그라운드 전환 금지(이 가이드는 다크 전용)',
    ],
  },
  color: {
    summary:
      '순수 블랙 + 골드 헤어라인 + 웜 크림 라벨 + 브론즈 액센트. 절제된 2~3색 럭셔리 팔레트. colorway 전환은 잉크/액센트 교체로(default 골드 / oxblood 뮤트골드×옥스블러드).',
    dos: [
      '기본 잉크/엣지는 골드 한 색으로',
      '액센트는 브론즈/옥스블러드 한 색으로만',
      'colorway 전환은 ext-hairline/accent 토큰 교체로',
    ],
    donts: [
      '고채도 유채색 남발 금지(럭셔리 절제 상실)',
      '옥스블러드를 텍스트/라인 잉크로 사용 금지(니어블랙 위 저대비)',
    ],
  },
  typography: {
    summary:
      '큰 세리프 디스플레이(Playfair Display 계열) 타이틀이 시그니처 — 편집적 럭셔리. 라벨은 웜 크림, 수치는 mono. 넉넉한 자간·여백으로 값비싼 무드.',
    dos: ['타이틀은 큰 세리프(18px+)', '라벨·캡션은 웜 크림', '수치·값은 mono'],
    donts: ['타이틀에 산세리프/두꺼운 웨이트 금지(세리프 시그니처)', '골드 색 텍스트 남용 금지(대비 흔들림)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 웜 크림 — 니어블랙 표면 위 ≥13:1로 전부 AAA(≥7) 실측(auditVizContrast 게이트). 골드 헤어라인은 블랙 대비 8.16:1. 헤어라인 룰은 aria-hidden 순수 장식이라 의미를 색만으로 인코딩하지 않는다.',
    dos: [
      '텍스트는 웜 크림(니어블랙 위 ≥7:1, AAA)',
      '골드 헤어라인은 라인/윤곽 전용(≥4.5:1 텍스트급 대비)',
      '상태 의미는 라벨/형태로도 병기(색 단독 금지)',
    ],
    donts: [
      '골드/옥스블러드 색으로 본문 라벨 표기 금지(대비 흔들림)',
      '헤어라인 룰을 의미 인코딩 수단으로 오용 금지(순수 데코)',
      '니어블랙보다 밝은 면 위에 크림 라벨 얹기 금지(대비 저하)',
    ],
  },
};

export const darkluxe01VizStyleGuide: VisualizationStyleGuide = {
  name: 'darkluxe-01',
  description:
    'Dark luxury editorial paint — pure black ground, near-black solid fills, thin gold hairline linework framed by wrapper-drawn hairline rules, a large serif display face, warm cream labels for AAA contrast, no shadow or glow.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { DarkLuxeShowcase: DarkLuxeShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '다크 럭셔리 모티프 — 순수 블랙 위 니어블랙 솔리드 도형을 얇은 골드 헤어라인 룰로 프레이밍하고, 골드 헤어라인 라인워크와 큰 세리프 타이틀을 얹는다. 라벨은 웜 크림.',
    components: {
      Node: {
        description:
          '니어블랙 솔리드 채움 + 골드 헤어라인 1px 도형을 DarkLuxeNode가 감싼다 — 박스 상/하단에 얇은 골드 헤어라인 룰 <line>을 형제로 그린다(지오메트리 불변, aria-hidden 장식). 헤어라인 색은 ext-hairline 토큰.',
        specs: ['니어블랙 솔리드 fill + 골드 1px 라인', 'hairline rule 2줄(data-viz-darkluxe-rule, ext-hairline 색)', 'shadow/glow 없음'],
      },
      Tag: {
        description: '타입 태그는 웜 크림 라벨 — 니어블랙 면 위 ≥13:1(AAA)로 안정.',
        specs: ['웜 크림(ext-label)', '10px', '니어블랙 위 ≥13:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 블랙 칩 + 웜 크림 텍스트로 헤어라인과 분리.',
        specs: ['bg = canvas.bg 칩', '패딩 4px', '웜 크림'],
      },
    },
    example: DarkLuxeShowcase as React.FC,
  },
  meta: {
    displayName: 'DarkLuxe_01',
    family: 'viz-darkluxe',
    summary:
      '순수 블랙 그라운드 + 골드 헤어라인 룰·라인워크 + 큰 세리프 디스플레이의 미니멀 다크 럭셔리 에디토리얼 인포그래픽 페인트.',
    tags: ['dark', 'luxurious', 'serif', 'typographic', 'high-contrast', 'minimal'],
    mood: { formality: 5, energy: 2, warmth: 3, density: 2, ornament: 2 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'airy',
      motion: 'still',
      colorScheme: 'dark',
      contrast: 'high',
    },
    domains: ['luxury', 'editorial', 'portfolio', 'marketing'],
    useWhen: [
      '럭셔리 브랜드·에디토리얼 인포그래픽을 순수 블랙 + 골드 헤어라인의 값비싼 무드로 낼 때 쓴다.',
      '큰 세리프 타이틀과 절제된 헤어라인으로 미니멀·고급 감성을 원하는 포트폴리오/마케팅 비주얼에 쓴다.',
      '다크 그라운드에서 격식 높은 편집적 도식을 조립할 때 쓴다.',
    ],
    avoidWhen: [
      '밝고 활기찬 대중적 무드나 라이트 배경이 필요할 때 피한다(이 가이드는 다크 전용).',
      '풍부한 다색 데이터 인코딩이 필요한 고밀도 차트에 피한다(절제된 골드/크림 2~3색).',
      '캐주얼·키치·손그림 감성이 목표일 때 피한다(격식·미니멀 지향).',
    ],
    accessibility: {
      contrastIntent: 'aaa',
      colorblindConsidered: false,
      motionHeavy: false,
      darkFirst: true,
    },
    related: ['ink-line-duotone-01', 'corporate-schematic-01'],
  },
};
