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

/**
 * Editorial_Data_01 — FT식 에디토리얼 데이터(세리프 디스플레이 + 헤어라인 컬럼 rule).
 * 근거: viz 확장 P2 1:1 단독 family(viz-editorial-data). 웜 페이퍼 그라운드 위에 세리프
 * 디스플레이 서체 + 얇은 헤어라인 컬럼 rule을 얹는 절제된 인쇄 에디토리얼 무드
 * (Financial Times 데이터 저널리즘 룩). 절제·고대비·라이트 전용.
 *
 * 시그니처 = **헤어라인 컬럼 rule**: EditorialDataNode가 실 카드(라이트 웜 fill + 차콜
 * 1px 헤어라인) 옆에 카드 박스 기준 상단 top rule + 좌측 컬럼 rule을 얇은 `<line>`으로
 * 덧그린다(`[data-viz-editorial-rule]`, aria-hidden, 텍스트 없음 — 순수 장식). FT의 헤어라인
 * 컬럼 시그니처다. 라벨(children)은 rule 그룹 밖에서 정상 렌더 → 장식이 텍스트를 건드리지 않는다.
 *
 * 접근성: 모든 라인/라벨 잉크는 차콜(#26221E) — 웜 페이퍼(#FFF1E5) 대비 14.26:1. 라이트
 * 웜 카드 fill(화이트~옅은 크림) 위 태그도 전부 ≥12.9:1(aaa 7:1 상회). 헤어라인 rule은
 * aria-hidden 장식이라 정보 인코딩이 아니며, 시맨틱은 라벨/형태로 병기한다.
 */

const PAPER = '#FFF1E5'; // 웜 FT 페이퍼 캔버스
const CHARCOAL = '#26221E'; // 차콜 잉크 — 라인/윤곽/헤어라인 rule/모든 텍스트 라벨(페이퍼 대비 14.26:1)
const HAIRLINE = 1; // 헤어라인 굵기 1px — 이 가이드의 서명 라인 웨이트
const RULE_GAP = 6; // 카드 박스 바깥 헤어라인 rule 오프셋(px)

// kind별 카드 fill = 화이트/옅은 웜 틴트(에디토리얼 카드), 라벨 = 차콜(전부 ≥12.9:1).
const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: CHARCOAL,
  keylineWidth: HAIRLINE,
  tagColor: CHARCOAL,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'editorial-data-01',

  canvas: {
    bg: PAPER,
    grid: '#F3E3D3', // 미세 웜 페이퍼 그리드
    gridUnit: 8,
  },

  // 에디토리얼 액센트 램프 — 클라렛/틸/테라코타/세이지 등 절제된 인쇄 색조(스와치 전용).
  palette: {
    p1: '#990F3D', // 클라렛(에디토리얼 리드 액센트)
    p2: '#0F5499', // 딥 틸 블루
    p3: '#B4623B', // 테라코타
    p4: '#4B6858', // 세이지 그린
    p5: '#7A6A8A', // 뮤트 플럼
    p6: '#A8842B', // 오커 골드
    p7: CHARCOAL, // 차콜 잉크
    p8: '#FBEFE0', // 페일 페이퍼 틴트
  },

  // 제네릭 도형 = 화이트 카드 + 차콜 헤어라인.
  shape: {
    fill: '#FFFFFF',
    stroke: CHARCOAL,
    strokeWidth: HAIRLINE,
  },

  // kind별 라이트 웜 카드 fill + 차콜 헤어라인 윤곽 + 차콜 라벨.
  node: {
    person: node('#FFFFFF', 'user'),
    external: node('#F5E9DA', 'arrowOut', { dashed: true }),
    container: node('#FCF4EA', 'stackedRect'),
    database: node('#F7EEE0', 'cylinder'),
    queue: node('#FBEEDB', 'bars'),
    decision: node('#F3E7D5', 'diamond'),
    process: node('#FFF8F0', 'process'),
  },

  // 차콜 헤어라인 커넥터 + 소형 화살촉.
  edge: {
    stroke: CHARCOAL,
    width: HAIRLINE,
    dashPattern: '',
    cornerRadius: 2,
    marker: {
      size: 6,
      arrow: CHARCOAL,
      diamond: CHARCOAL,
      circle: CHARCOAL,
      cross: CHARCOAL,
    },
  },

  c4: {
    l1: { borderWidth: 1.5, bgTint: 'rgba(38,34,30,0.04)', labelColor: CHARCOAL },
    l2: { borderWidth: 1, bgTint: 'rgba(38,34,30,0.025)', labelColor: CHARCOAL },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: CHARCOAL },
  },

  // 차콜 헤어라인 대시 경계(섹션 구획 — 비텍스트 장식).
  boundary: {
    stroke: CHARCOAL,
    width: HAIRLINE,
    dashPattern: '4 4',
    radius: 2,
    labelColor: CHARCOAL,
  },

  typography: {
    // 세리프 디스플레이 = 이 가이드의 핵심 시그니처.
    titleFont: "'Georgia', 'Times New Roman', serif",
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

const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-rule': CHARCOAL, // 헤어라인 컬럼 rule 잉크(장식 — 텍스트 아님)
};

/**
 * mono — 쿨 화이트 그라운드 + 쿨 차콜 잉크 모노크롬 colorway.
 * (색만 교체 — 헤어라인/세리프/스페이싱 등 비색상 토큰은 base와 deep-equal.)
 */
const MONO_INK = '#23252A'; // 쿨 차콜(쿨 화이트 대비 14.29:1)
const monoFoundations = makeVizColorway(foundations, {
  name: 'editorial-data-01-mono',
  canvas: { bg: '#F7F7F4', grid: '#E8E8E4' },
  ink: MONO_INK, // keyline/edge/boundary/shape/c4 라벨 일괄 쿨 차콜
  tagColor: MONO_INK,
  boundaryLabelColor: MONO_INK,
  c4LabelColor: MONO_INK,
  shape: { fill: '#FCFCFB' },
  nodeFills: {
    person: '#FCFCFB',
    external: '#ECEDEE',
    container: '#F4F5F5',
    database: '#EDEEF0',
    queue: '#E9EAEC',
    decision: '#F1F2F2',
    process: '#FAFAFA',
  },
  palette: {
    p1: '#2E5A88', // 쿨 슬레이트 블루 리드
    p2: '#4A4E57',
    p3: '#6B7078',
    p8: '#EDEEEF',
  },
});

const MONO_EXT: Record<string, string> = {
  '--bbangto-viz-ext-rule': MONO_INK,
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'FT Pink Cream',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'mono',
    label: 'Cool White Mono',
    foundations: monoFoundations,
    extendedFoundations: MONO_EXT,
  },
];

/**
 * 에디토리얼 노드 — 실 카드(라이트 웜 fill + 차콜 1px 헤어라인) 옆에
 * 카드 박스 기준 상단 top rule + 좌측 컬럼 rule을 얇은 `<line>`으로 덧그린다.
 * rule 그룹은 `[data-viz-editorial-rule]` aria-hidden 장식(텍스트 없음)이라 접근성 트리
 * 밖이며, 라벨(children)은 rule 그룹 밖에서 정상 렌더된다 — FT 헤어라인 컬럼 시그니처.
 */
function EditorialDataNode({ children, ...rest }: NodeProps) {
  const { x, y, width, height } = rest;
  const fill = rest.fill ?? vvar('shape', 'fill');
  const ruleStyle: React.CSSProperties = {
    stroke: vvar('ext', 'rule'),
    strokeWidth: HAIRLINE,
    fill: 'none',
  };
  return (
    <>
      {/* 실 카드 — 라이트 웜 fill + 차콜 헤어라인 윤곽. */}
      <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? HAIRLINE} />
      {/* FT 헤어라인 컬럼 rule — 상단 top rule + 좌측 컬럼 rule(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-editorial-rule="" aria-hidden="true">
        <line
          x1={x - RULE_GAP}
          y1={y - RULE_GAP}
          x2={x + width}
          y2={y - RULE_GAP}
          style={ruleStyle}
        />
        <line
          x1={x - RULE_GAP}
          y1={y - RULE_GAP}
          x2={x - RULE_GAP}
          y2={y + height}
          style={ruleStyle}
        />
      </g>
      {children}
    </>
  );
}
EditorialDataNode.displayName = 'EditorialDataNode';

/** 에디토리얼 태그 — 차콜 라벨(헤어라인 미적용). */
function EditorialDataTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
EditorialDataTag.displayName = 'EditorialDataTag';

/** 흐름선 라벨 — 페이퍼 칩 배경 + 차콜(헤어라인 위 또렷). */
function EditorialDataEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
EditorialDataEdgeLabel.displayName = 'EditorialDataEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: EditorialDataNode,
  Tag: EditorialDataTag,
  EdgeLabel: EditorialDataEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'EditorialDataShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '웜 페이퍼 그라운드 위 화이트/옅은 크림 카드 + 차콜 1px 헤어라인. 카드마다 상단 top rule + 좌측 컬럼 rule을 얇게 덧대는 FT식 에디토리얼 헤어라인 시그니처.',
    dos: [
      '카드는 라이트 웜 fill + 차콜 1px 헤어라인 윤곽',
      '헤어라인 컬럼 rule은 카드 박스 밖 장식(top + 좌측)',
      '커넥터는 차콜 헤어라인 + 소형 화살촉',
    ],
    donts: [
      '그림자/그라디언트/입체 금지(플랫 인쇄 무드 유지)',
      '헤어라인에 정보 인코딩 금지(순수 컬럼 장식)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '차콜 잉크(라인/텍스트) + 웜 페이퍼. 액센트는 클라렛/틸/테라코타 등 절제된 인쇄 색조를 스와치로만. mono preset은 쿨 화이트 + 쿨 차콜 모노크롬.',
    dos: [
      '라인·텍스트는 전부 차콜 잉크로 통일',
      '액센트 색조는 절제(스와치·강조 한정)',
      'colorway 전환은 그라운드/잉크 교체로(default 웜 페이퍼 / mono 쿨 화이트)',
    ],
    donts: [
      '고채도 솔리드 카드 채움 금지(에디토리얼 절제 상실)',
      '액센트 색조를 본문 텍스트 색으로 전용 금지',
    ],
  },
  typography: {
    summary:
      '세리프 디스플레이(Georgia 계열) 타이틀 + mono 수치가 시그니처. 세리프 헤드라인과 mono 피겨의 대비가 데이터 저널리즘 인상을 만든다.',
    dos: ['타이틀·헤드라인은 세리프 디스플레이', '수치·값·주석은 mono', '라벨은 차콜로 고대비 확보'],
    donts: ['타이틀에 산세리프 전용 금지(세리프 시그니처 상실)', '헤어라인 rule 위 저대비 텍스트 금지'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 차콜 — 웜 페이퍼·라이트 카드 위 전부 12.9:1 이상(auditVizContrast 게이트, aaa 7:1 상회). 헤어라인 rule은 aria-hidden 장식이라 텍스트/시맨틱과 무관.',
    dos: [
      '라벨은 차콜 잉크(라이트 표면 위 ≥7:1)',
      '헤어라인 rule은 장식 — 정보는 라벨/형태로 병기',
      '커넥터·경계선도 페이퍼 대비 3:1 이상 확보',
    ],
    donts: [
      '옅은 액센트 색조를 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '헤어라인 컬럼 rule로 의미 구분 금지(장식 한정)',
      '라이트 카드 위 흰 텍스트 금지(저대비)',
    ],
  },
};

export const editorialData01VizStyleGuide: VisualizationStyleGuide = {
  name: 'editorial-data-01',
  description:
    'FT-style editorial data — warm paper ground, a serif display typeface plus thin hairline column rules (a top + left rule bracket on each card, decorative and aria-hidden), charcoal ink for all lines and labels, restrained accent hues for AAA contrast on light surfaces.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { EditorialDataShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '에디토리얼 데이터 모티프 — 웜 페이퍼 위 세리프 디스플레이 + 헤어라인 컬럼 rule(카드 박스 밖 top + 좌측 장식), 차콜 잉크 라벨.',
    components: {
      Node: {
        description:
          '카드는 라이트 웜 fill + 차콜 1px 헤어라인 윤곽. EditorialDataNode가 카드 박스 기준 상단 top rule + 좌측 컬럼 rule을 얇은 line으로 덧그린다(aria-hidden) — 라벨은 rule 밖. FT 헤어라인 컬럼 시그니처.',
        specs: [
          'fill = 라이트 웜 카드(화이트~옅은 크림 hex)',
          'keyline 1px 차콜 헤어라인',
          'hairline rule [data-viz-editorial-rule], top + 좌측(장식, aria-hidden)',
        ],
      },
      Tag: {
        description: '타입 태그는 차콜 라벨 — 헤어라인 미적용(가독성).',
        specs: ['차콜 잉크', '10px', '라이트 카드 위 ≥7:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 페이퍼 칩 배경 + 차콜로 헤어라인 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '차콜 잉크'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Editorial_Data_01',
    family: 'viz-editorial-data',
    summary:
      '웜 페이퍼 + 세리프 디스플레이 + 헤어라인 컬럼 rule의 FT식 에디토리얼 데이터 인포그래픽 — 절제·고대비·라이트 전용.',
    tags: ['serif', 'typographic', 'minimal', 'light', 'high-contrast', 'airy'],
    mood: { formality: 4, energy: 2, warmth: 3, density: 2, ornament: 1 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'airy',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['editorial', 'blog', 'fintech', 'docs', 'dashboard'],
    useWhen: [
      '데이터 저널리즘·에디토리얼 인포그래픽을 FT식 세리프 + 헤어라인 컬럼 룩으로 낼 때 쓴다.',
      '웜 페이퍼 위 세리프 디스플레이의 절제된 인쇄 에디토리얼 무드가 필요할 때 쓴다.',
      '핀테크·리서치 리포트에서 고대비·저장식의 정갈한 데이터 도식이 필요할 때 쓴다.',
      '헤어라인 rule로 정보 위계를 조용히 구획하고 싶을 때 쓴다.',
    ],
    avoidWhen: [
      '고채도 플랫 팝·다색 시맨틱 채움이 목표일 때 피한다(F3를 쓴다).',
      '손그림·마커 스케치의 친근한 무드가 목표일 때 피한다(F4를 쓴다).',
      '다크 그라운드·네온 그라디언트의 임팩트가 필요할 때 피한다(F7을 쓴다).',
    ],
    accessibility: {
      contrastIntent: 'aaa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['ink-line-duotone-01', 'corporate-schematic-01'],
  },
};
