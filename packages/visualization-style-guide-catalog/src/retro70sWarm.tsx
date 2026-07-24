import React, { useId } from 'react';
import type {
  VisualizationFoundation,
  VizFoundationPreset,
} from '@centurio1987/bbangto-ui-tokens';
import {
  Node,
  Tag,
  EdgeLabel,
  vvar,
  useVizDefsPrefix,
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
 * Retro70s_Warm_01 — 70년대 웜 어스톤(머스터드/테라코타/번트오렌지/아보카도 올리브) + 미세 그레인.
 * 근거: KAN-039 P2 1:1 단일 family(viz-retro70s-warm). 웜 크림 그라운드 위 어스톤 팔레트 +
 * 결정론적 그레인으로 코지·아날로그·따뜻한 무드를 낸다.
 *
 * 접근성 핵심(어스톤은 중간톤 → 라벨 대비 위험):
 *  - 도형 채움은 **밝은 웜 틴트**(pale mustard/terracotta/olive)만 쓴다. 진한 어스톤(머스터드
 *    #D9A441 등)은 대비가 낮아(크림 대비 1.8~4.1) 라인/텍스트 잉크로 못 쓰므로 **palette 스와치**
 *    에만 둔다(게이트 비대상).
 *  - 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)과 라인(shape/edge.stroke)은
 *    다크 웜 브라운 잉크 #3A2A16 — 웜 크림 대비 11.25:1(텍스트 ≥4.5·비텍스트 ≥3 게이트 통과).
 *  - 밝은 웜 틴트 채움 위 다크 브라운 라벨은 8.8~10.1:1(auditVizContrast over-claim 게이트 통과).
 *
 * 그레인은 **장식**이며 텍스트엔 절대 걸지 않는다:
 *  - Retro70sWarmNode가 <defs><filter>(feTurbulence 고정 seed=7)를 도형 그룹에만 적용한다
 *    (risoPrint 선례 재사용). 라벨(children)은 필터 밖에서 렌더 → 왜곡 0.
 *  - 쇼케이스 표면엔 결정론적 그레인 오버레이(background-image, [data-viz-showcase] 스코프).
 */

const CREAM = '#F3E7CE'; // 웜 크림 캔버스
const INK = '#3A2A16'; // 다크 웜 브라운 잉크 — 라인/윤곽/모든 텍스트 라벨(크림 대비 11.25:1)

// 밝은 웜 틴트 채움 — 다크 브라운 라벨이 ≥8.8:1로 안전(솔리드 hex).
const TINT = {
  mustard: '#EBD9A6', // 페일 머스터드
  peach: '#F2D7BE', // 페일 피치
  sand: '#E8D8BE', // 웜 샌드
  terracotta: '#EEC7AE', // 페일 테라코타
  olive: '#D9DBB0', // 페일 올리브
  tan: '#EAD3B4', // 웜 탄
  linen: '#E5DCC0', // 라이트 웜 리넨
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
  name: 'retro70s-warm-01',

  canvas: {
    bg: CREAM,
    grid: '#E6D8B8', // 미세 웜 그리드
    gridUnit: 8,
  },

  // 진한 70s 어스톤 램프 — 스와치 전용(대비 낮아 라인/텍스트엔 미사용).
  palette: {
    p1: '#D9A441', // 머스터드
    p2: '#C4633E', // 테라코타
    p3: '#B4531F', // 번트 오렌지
    p4: '#7A7A3A', // 아보카도 올리브
    p5: '#6E7B34', // 딥 아보카도
    p6: '#C98A3B', // 웜 오커
    p7: INK, // 다크 브라운 잉크
    p8: '#EFE3C6', // 페일 크림
  },

  // 제네릭 도형 = 머스터드 워시 채움, 윤곽 = 브라운 잉크.
  shape: {
    fill: 'rgba(217,164,65,0.20)', // 머스터드 반투명 워시(장식)
    stroke: INK,
    strokeWidth: 1.5,
  },

  // kind별 밝은 웜 틴트 채움 + 브라운 잉크 윤곽 + 다크 브라운 라벨.
  node: {
    person: node(TINT.mustard, 'user'),
    external: node(TINT.peach, 'arrowOut', { dashed: true }),
    container: node(TINT.sand, 'stackedRect'),
    database: node(TINT.terracotta, 'cylinder'),
    queue: node(TINT.olive, 'bars'),
    decision: node(TINT.tan, 'diamond'),
    process: node(TINT.linen, 'process'),
  },

  // 브라운 잉크 라인 + 소형 화살촉.
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
    l1: { borderWidth: 2, bgTint: 'rgba(217,164,65,0.10)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(196,99,62,0.07)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 뮤트 테라코타 대시 경계(비텍스트 장식, 크림 대비 4.08:1 ≥3).
  boundary: {
    stroke: '#B4531F',
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

// 저주파 그레인 오버레이(feTurbulence 고정 seed=7) — 쇼케이스 표면용 데이터 URI(결정론).
// 도형 위 실 그레인은 Retro70sWarmNode가 SVG 필터로 별도 적용한다.
const GRAIN_URI =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='rg'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.23 0 0 0 0 0.16 0 0 0 0 0.09 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23rg)'/></svg>\")";

const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-grain': GRAIN_URI,
  '--bbangto-viz-ext-earth-a': '#D9A441', // 머스터드
  '--bbangto-viz-ext-earth-b': '#C4633E', // 테라코타
};

/** avocado — 올리브/그린 주도의 웜 어스톤 colorway(올리브 크림 그라운드 + 다크 올리브 잉크). */
const avocadoFoundations = makeVizColorway(foundations, {
  name: 'retro70s-warm-01-avocado',
  canvas: { bg: '#ECE8C8', grid: '#DDDCB4' },
  ink: '#2E2A14', // 다크 올리브 브라운 잉크(올리브 크림 대비 11.63:1)
  shape: { fill: 'rgba(122,122,58,0.20)' },
  nodeFills: {
    person: '#D9DBB0',
    external: '#DEE0BC',
    container: '#D3D8AE',
    database: '#E2DEB6',
    queue: '#CDD4A4',
    decision: '#DBDCB2',
    process: '#E0DEBE',
  },
  c4Tints: ['rgba(122,122,58,0.10)', 'rgba(122,122,58,0.07)', 'transparent'],
  palette: {
    p1: '#7A7A3A', // 올리브
    p2: '#6E7B34', // 아보카도
    p3: '#556B2F', // 모스
    p4: '#C9A227', // 머스터드
    p6: '#9AA85A', // 세이지
  },
});

const AVOCADO_EXT: Record<string, string> = {
  '--bbangto-viz-ext-grain': GRAIN_URI,
  '--bbangto-viz-ext-earth-a': '#7A7A3A', // 올리브
  '--bbangto-viz-ext-earth-b': '#6E7B34', // 아보카도
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Mustard × Terracotta',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'avocado',
    label: 'Olive × Avocado',
    foundations: avocadoFoundations,
    extendedFoundations: AVOCADO_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-retro70s-warm-01';
// 그레인 = 도형 필터(Node) + 쇼케이스 표면 오버레이(background-image). 텍스트엔 미적용.
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="retro70s-warm-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: var(--bbangto-viz-ext-grain) !important;
  background-repeat: repeat !important;
}
`;

/**
 * 레트로 노드 — 그레인 필터(feTurbulence 고정 seed=7)를 도형 그룹에만 적용한다.
 * 라벨(children)은 필터 그룹 밖에서 렌더 → 그레인이 텍스트를 절대 왜곡하지 않는다.
 * id는 Provider defsPrefix + useId로 유일(risoPrint 선례와 동형).
 */
function Retro70sWarmNode({ children, ...rest }: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const gid = `${prefix}-retro-grain-${uid}`;
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const fill = rest.fill ?? vvar('shape', 'fill');
  return (
    <>
      <defs>
        <filter id={gid} x="-8%" y="-8%" width="116%" height="116%" filterUnits="objectBoundingBox">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            seed={7}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
            result="grain"
          />
          <feComposite in="grain" in2="SourceGraphic" operator="in" result="grainClip" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="grainClip" />
          </feMerge>
        </filter>
      </defs>
      {/* 실 도형 — 그레인 필터를 도형 그룹에만. 라벨은 아래(필터 밖)에서 렌더. */}
      <g data-viz-retro-grain="" filter={`url(#${gid})`}>
        <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 1.5} />
      </g>
      {children}
    </>
  );
}
Retro70sWarmNode.displayName = 'Retro70sWarmNode';

/** 레트로 태그 — 다크 브라운 라벨(그레인 미적용). */
function Retro70sWarmTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
Retro70sWarmTag.displayName = 'Retro70sWarmTag';

/** 흐름선 라벨 — 크림 칩 배경 + 다크 브라운 잉크(그레인 위 가독성). */
function Retro70sWarmEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
Retro70sWarmEdgeLabel.displayName = 'Retro70sWarmEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: Retro70sWarmNode,
  Tag: Retro70sWarmTag,
  EdgeLabel: Retro70sWarmEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'Retro70sWarmShowcase' });

/** 쇼케이스 — 모티프 CSS(그레인 그라운드)를 주입한 뒤 공용 씬 렌더. */
function Retro70sWarmShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
Retro70sWarmShowcase.displayName = 'Retro70sWarmShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '웜 크림 그라운드 위 밝은 웜 틴트 채움 + 다크 브라운 윤곽. 미세 저주파 그레인은 결정론적 장식(feTurbulence seed 고정, 도형 한정).',
    dos: [
      '채움은 밝은 웜 틴트(pale mustard/terracotta/olive) — 다크 라벨 대비 확보',
      '그레인은 도형에만 — 결정론적 seed 고정',
      '윤곽은 다크 웜 브라운 잉크 라인 + 소형 화살촉',
    ],
    donts: [
      '진한 어스톤을 도형 채움으로 금지(중간톤이라 라벨 대비 미달)',
      '그레인에 정보 인코딩 금지(순수 장식)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '70s 어스톤(머스터드·테라코타·번트오렌지·아보카도 올리브)은 palette 스와치 전용. 실제 라인/텍스트/채움은 다크 브라운 잉크 + 밝은 웜 틴트로 고대비 유지.',
    dos: [
      '어스톤 원색은 스와치·강조 인용에만 절제',
      'colorway 전환은 어스 계열 교체로(default 머스터드×테라코타 / avocado 올리브×아보카도)',
      '값 강조는 형태·라벨과 병기(색 단독 의존 금지)',
    ],
    donts: [
      '머스터드/테라코타를 라인/텍스트 잉크로 금지(크림 대비 1.8~3.3:1 미달)',
      '중간톤 어스 채움 위 저대비 라벨 금지',
    ],
  },
  typography: {
    summary:
      '그로테스크 산세리프 타이틀 + mono 수치. 모든 라벨은 다크 웜 브라운 잉크로 웜 틴트 표면 위에서도 고대비.',
    dos: ['타이틀은 그로테스크 산세리프', '수치·값은 mono', '라벨은 다크 브라운 잉크로 대비 확보'],
    donts: ['라벨에 그레인 필터 적용 금지(가독성)', '어스톤 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 다크 브라운 잉크 — 밝은 웜 틴트 표면 위 8.8~10.1:1, 크림 캔버스 위 11.25:1(auditVizContrast 게이트). shape/edge 잉크는 크림 대비 ≥4.5(텍스트)·≥3(비텍스트). 그레인은 [data-viz-retro-grain] 도형 그룹 장식으로 텍스트에 미적용.',
    dos: [
      '라벨은 다크 브라운 잉크(웜 틴트 표면 위 ≥4.5:1)',
      '그레인은 도형에만 — 텍스트 제외',
      '값 인코딩은 색뿐 아니라 라벨/형태로 병기',
    ],
    donts: [
      '진한 어스톤을 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '그레인 위 저대비 라벨 금지',
      '색만으로 의미 구분 금지(색각 이상 고려)',
    ],
  },
};

export const retro70sWarm01VizStyleGuide: VisualizationStyleGuide = {
  name: 'retro70s-warm-01',
  description:
    'Warm 1970s earth-tone infographic paint — mustard, terracotta, burnt-orange and avocado-olive on a warm cream ground with a fine deterministic feTurbulence grain (shape-only, seed fixed). Node fills stay light warm tints so dark warm-brown ink labels pass AA; the saturated earth tones live in the palette swatches only. Cozy, analog, warm.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { Retro70sWarmShowcase: Retro70sWarmShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '레트로 70s 웜 모티프 — 웜 크림 위 밝은 어스 틴트 채움 + 다크 브라운 윤곽/라벨, 결정론적 미세 그레인(도형 한정 장식).',
    components: {
      Node: {
        description:
          '도형은 밝은 웜 틴트로 채워지고 다크 브라운 잉크로 윤곽된다. Retro70sWarmNode가 그레인 필터(feTurbulence seed 고정)를 도형 그룹에만 적용 — 라벨은 필터 밖.',
        specs: [
          'fill = 밝은 웜 틴트(pale mustard/terracotta/olive)',
          'stroke = 다크 웜 브라운 잉크 #3A2A16 (1.5px)',
          'grain filter url(#<prefix>-retro-grain-<uid>), feTurbulence seed 고정',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 브라운 라벨 — 그레인 미적용(가독성).',
        specs: ['다크 브라운 잉크', '10px', '웜 틴트 표면 위 ≥4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 크림 칩 배경 + 다크 브라운 잉크로 그레인 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '다크 브라운 잉크'],
      },
    },
    example: Retro70sWarmShowcase as React.FC,
  },
  meta: {
    displayName: 'Retro70s_Warm_01',
    family: 'viz-retro70s-warm',
    priority: 'P2',
    summary:
      '웜 크림 + 70s 어스톤(머스터드·테라코타·아보카도 올리브)·미세 그레인의 코지·아날로그 레트로 인포그래픽 페인트. 밝은 틴트 채움 + 다크 브라운 잉크로 AA 대비.',
    tags: ['retro', 'grainy', 'textured', 'muted', 'light'],
    mood: { formality: 2, energy: 2, warmth: 5, density: 3, ornament: 3 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['editorial', 'blog', 'marketing', 'creative-agency', 'portfolio'],
    useWhen: [
      '에디토리얼·블로그 인포그래픽을 70s 웜 어스톤(머스터드·테라코타·아보카도)의 코지·아날로그 무드로 낼 때 쓴다.',
      '미세 그레인으로 레트로 인쇄 질감을 주되 라벨 가독성(AA)을 지켜야 할 때 쓴다.',
      '마케팅·크리에이티브 비주얼에서 따뜻한 노스탤지어 감성이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F2/Swiss를 쓴다).',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(F7을 쓴다).',
      '고채도 대비·쿨 팔레트가 필요한 대시보드에 피한다(웜 어스톤 저채도 무드).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['marker-sketchnote-01', 'colorful-flat-01'],
  },
};
