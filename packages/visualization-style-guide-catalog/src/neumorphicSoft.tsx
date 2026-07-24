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
 * Neumorphic_Soft_01 — 동일 톤 소프트 압출(뉴모피즘).
 * 근거: viz-soft-puffy family(KAN-038). 도형이 표면과 **같은 톤**으로 채워지고 오직
 * 듀얼 소프트 섀도(좌상 하이라이트 + 우하 다크 섀도)로 눌러 짜낸 듯 떠오른다.
 *
 * 뉴모피즘은 본질적으로 저대비(도형색 = 배경색)라 게이트를 위해 다음처럼 **적응**한다:
 *  - 캔버스/도형 채움 = 소프트 쿨 라이트 그레이(#E8ECF2 계열, 동일 톤). 형태는 섀도로만 읽힌다.
 *  - 대비는 **잉크(라벨/윤곽)** 가 담당한다: shape.stroke / edge.stroke / 모든 라벨(node.tagColor,
 *    c4.labelColor, boundary.labelColor)을 다크 슬레이트 잉크(#2A3340)로 둔다 → 라이트 표면 대비 ~10:1
 *    (텍스트 ≥4.5·비텍스트 ≥3 게이트, auditVizContrast over-claim 게이트 모두 통과).
 *  - 윤곽선은 잉크색이 진하되 strokeWidth는 얇게(1px) 유지 → 게이트는 stroke **색 대비** 만 보고
 *    폭은 보지 않으므로, 얇은 다크 선으로 게이트를 만족하면서도 뉴모피즘 특유의 "테두리 억제"를 지킨다.
 *
 * 듀얼 섀도 압출 = NeumorphNode wrapper: <defs><filter>가 (좌상)라이트 하이라이트 +
 * (우하)다크 섀도 두 겹을 feMerge로 원본과 합성해 **도형 그룹에만**(data-viz-neumorph) 적용한다.
 * 라벨(children)은 필터 밖에서 렌더 → 섀도가 텍스트를 절대 흐리지 않는다(가독성·접근성).
 * 섀도색은 extendedFoundations 변수(shadowLight/shadowDark)에서 읽는다(colorway 전환에 반응).
 * id는 Provider defsPrefix + useId로 유일(riso/neon 선례와 동형).
 */

const SURFACE = '#E8ECF2'; // 소프트 쿨 라이트 그레이 — 캔버스·도형 동일 톤
const INK = '#2A3340'; // 다크 슬레이트 잉크 — 윤곽/엣지/모든 라벨(라이트 표면 대비 ~10.8:1)

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK,
  keylineWidth: 1, // 얇은 잉크 윤곽 — 뉴모피즘은 테두리를 억제(색만 진하고 폭은 최소)
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'neumorphic-soft-01',

  canvas: {
    bg: SURFACE,
    grid: '#DCE2EB', // 미세 쿨 그레이 그리드
    gridUnit: 8,
  },

  // 소프트 그레이 톤 램프 + 섀도/하이라이트 톤 + 슬레이트 잉크.
  palette: {
    p1: '#C6CEDA', // 쿨 그레이 액센트
    p2: '#AEB9CC', // 다크 섀도 톤(우하)
    p3: '#8B97AB', // 미드 슬레이트
    p4: '#2A3340', // 슬레이트 잉크
    p5: '#6B7686', // 딤 슬레이트
    p6: '#D4DAE4', // 페일 쿨 그레이
    p7: INK, // 잉크
    p8: '#F3F5F9', // 니어 화이트 서피스
  },

  // 제네릭 도형 채움 = 표면 동일 톤, 윤곽 = 얇은 슬레이트 잉크.
  shape: {
    fill: SURFACE,
    stroke: INK,
    strokeWidth: 1, // 얇게(뉴모피즘 테두리 억제) — 대비 게이트는 stroke 색만 검사
  },

  // kind별 채움은 전부 표면과 근접한 동일 톤(쿨 라이트 그레이) — 형태는 섀도로 읽힌다.
  // 라벨은 다크 잉크라 어떤 톤 위에서도 ≥9.7:1.
  node: {
    person: node(SURFACE, 'user'),
    external: node('#E3E8EF', 'arrowOut', { dashed: true }),
    container: node('#ECEFF4', 'stackedRect'),
    database: node('#E5EAF0', 'cylinder'),
    queue: node('#EAEEF3', 'bars'),
    decision: node('#E1E6EE', 'diamond'),
    process: node(SURFACE, 'process'),
  },

  // 소프트 잉크 라인 1px + 소형 화살촉. 커넥터는 라운드 코너로 부드럽게.
  edge: {
    stroke: INK,
    width: 1,
    dashPattern: '',
    cornerRadius: 8,
    marker: {
      size: 6,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(42,51,64,0.06)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(42,51,64,0.04)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 얇은 점선 + 소프트 라운드 컨테이너(뉴모피즘 라운딩). stroke는 잉크색이나 폭이 얇아 억제된다.
  boundary: {
    stroke: INK,
    width: 1.5,
    dashPattern: '2 6',
    radius: 16,
    labelColor: INK,
  },

  typography: {
    titleFont: "'Nunito', 'Quicksand', 'Helvetica Neue', Arial, sans-serif",
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

  spacing: {
    nodePad: 14,
    laneGap: 28,
  },

  motion: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// 듀얼 섀도 톤 — 좌상 하이라이트(라이트) + 우하 섀도(다크). preset마다 재정의해 colorway에 반응.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-shadow-light': '#FFFFFF', // 좌상 하이라이트
  '--bbangto-viz-ext-shadow-dark': '#AEB9CC', // 우하 다크 섀도(쿨 그레이)
};

/** warm — 웜 그레이 표면 + 웜 슬레이트 잉크 colorway. */
const warmFoundations = makeVizColorway(foundations, {
  name: 'neumorphic-soft-01-warm',
  canvas: { bg: '#EFEAE4', grid: '#E1D9CF' },
  ink: '#3A322C', // 웜 다크 슬레이트 잉크(웜 표면 대비 10.50:1) — 윤곽/엣지/boundary/c4/shape
  tagColor: '#3A322C',
  shape: { fill: '#EFEAE4' },
  nodeFills: {
    person: '#EFEAE4',
    external: '#EAE3DA',
    container: '#F3EFEA',
    database: '#ECE6DE',
    queue: '#F0EBE4',
    decision: '#E8E1D7',
    process: '#EFEAE4',
  },
  boundaryLabelColor: '#3A322C',
  c4LabelColor: '#3A322C',
  c4Tints: ['rgba(58,50,44,0.06)', 'rgba(58,50,44,0.04)', 'transparent'],
  palette: {
    p1: '#D8CDBF', // 웜 그레이 액센트
    p2: '#C7B7A2', // 웜 다크 섀도 톤
    p3: '#9E8E7C', // 웜 미드
    p4: '#3A322C', // 웜 잉크
    p6: '#E4DACC', // 웜 페일
    p8: '#F7F3EE', // 웜 니어 화이트
  },
});

const WARM_EXT: Record<string, string> = {
  '--bbangto-viz-ext-shadow-light': '#FFFDFA', // 웜 하이라이트
  '--bbangto-viz-ext-shadow-dark': '#CBBBA6', // 웜 다크 섀도
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Cool Gray Surface',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'warm',
    label: 'Warm Gray Surface',
    foundations: warmFoundations,
    extendedFoundations: WARM_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-neumorphic-soft-01';
// 쇼케이스 표면은 소프트 그레이 그라운드. 쇼케이스 내부 도형은 CSS 듀얼 드롭섀도로 압출감을
// 준다(쇼케이스는 wrapper Node가 아닌 코어 Person/Container/Database 노드를 쓰므로 SVG 필터가
// 없다 → 여기서 CSS로 보강). wrapper NeumorphNode는 쇼케이스 밖이라 SVG 필터만 적용돼 중복 없음.
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="neumorphic-soft-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
}
[data-bbangto-viz-style-guide="neumorphic-soft-01"] [data-viz-showcase] [data-viz-part="shape"] {
  filter:
    drop-shadow(-2px -2px 3px var(--bbangto-viz-ext-shadow-light))
    drop-shadow(2px 2px 3px var(--bbangto-viz-ext-shadow-dark));
}
`;

/**
 * 뉴모프 노드 — 듀얼 소프트 섀도(좌상 라이트 하이라이트 + 우하 다크 섀도)를 SVG <filter>로
 * **도형 그룹에만** 적용한 실 도형. 섀도는 feOffset+feGaussianBlur+feFlood+feComposite 2겹을
 * feMerge로 원본 아래에 깐다(장식, 정보 인코딩 아님). 섀도색은 ext 토큰(shadowLight/shadowDark).
 * 라벨(children)은 필터 그룹 밖에서 렌더 → 섀도가 텍스트를 절대 흐리지 않는다.
 * id는 Provider defsPrefix + useId로 유일(riso/neon 선례와 동형).
 */
function NeumorphNode({ children, ...rest }: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const fid = `${prefix}-neumorph-${uid}`;
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const fill = rest.fill ?? vvar('shape', 'fill');
  return (
    <>
      <defs>
        <filter id={fid} x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
          {/* (1) 우하 다크 섀도 — SourceAlpha를 오프셋·블러 후 다크 톤으로 채운다. */}
          <feOffset in="SourceAlpha" dx="3" dy="3" result="dOff" />
          <feGaussianBlur in="dOff" stdDeviation="4" result="dBlur" />
          <feFlood floodOpacity="0.55" style={{ floodColor: vvar('ext', 'shadowDark') }} result="dCol" />
          <feComposite in="dCol" in2="dBlur" operator="in" result="dShadow" />
          {/* (2) 좌상 라이트 하이라이트 — 반대 방향 오프셋·블러 후 라이트 톤으로 채운다. */}
          <feOffset in="SourceAlpha" dx="-3" dy="-3" result="lOff" />
          <feGaussianBlur in="lOff" stdDeviation="4" result="lBlur" />
          <feFlood floodOpacity="0.9" style={{ floodColor: vvar('ext', 'shadowLight') }} result="lCol" />
          <feComposite in="lCol" in2="lBlur" operator="in" result="lShadow" />
          {/* (3) 합성: 라이트 → 다크 섀도 위에 원본 도형. */}
          <feMerge>
            <feMergeNode in="lShadow" />
            <feMergeNode in="dShadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* 실 도형 — 듀얼 섀도 필터를 도형 그룹에만. 라벨은 아래(필터 밖)에서 렌더. */}
      <g data-viz-neumorph="" filter={`url(#${fid})`}>
        <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 1} />
      </g>
      {children}
    </>
  );
}
NeumorphNode.displayName = 'NeumorphNode';

/** 뉴모프 태그 — 다크 잉크 라벨(섀도 미적용, 필터 밖). */
function NeumorphTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
NeumorphTag.displayName = 'NeumorphTag';

/** 흐름선 라벨 — 표면 톤 칩 배경 + 다크 잉크(가독성). */
function NeumorphEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
NeumorphEdgeLabel.displayName = 'NeumorphEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: NeumorphNode,
  Tag: NeumorphTag,
  EdgeLabel: NeumorphEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'NeumorphicSoftShowcaseBase' });

/** 쇼케이스 — 모티프 CSS(소프트 그레이 그라운드 + 듀얼 드롭섀도 압출)를 주입한 뒤 공용 씬 렌더. */
function NeumorphicSoftShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
NeumorphicSoftShowcase.displayName = 'NeumorphicSoftShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '소프트 쿨 라이트 그레이 표면 위에 표면과 동일 톤으로 채운 도형을 얹고, 좌상 라이트 하이라이트 + 우하 다크 섀도의 듀얼 소프트 섀도로 눌러 짜낸 듯 압출한다. 섀도는 도형 그룹에만 적용되는 장식.',
    dos: [
      '도형 채움은 표면과 같은(또는 근접한) 소프트 톤 — 형태는 섀도로만 읽히게',
      '듀얼 섀도는 반대 방향 2겹(라이트 좌상 + 다크 우하)으로 압출감을 만든다',
      '코너는 넉넉히 라운드(소프트 무드) 유지',
    ],
    donts: [
      '고채도·고대비 솔리드 채움 금지(뉴모피즘 무드 상실)',
      '섀도에 정보 인코딩 금지(순수 압출 장식)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '표면·도형은 저채도 그레이 동일 톤. 섀도는 하이라이트(니어 화이트) + 다크(쿨/웜 그레이) 쌍. colorway는 쿨(default)·웜(warm) 표면 톤 교체로 전환.',
    dos: [
      '색은 그레이 스케일 절제 — 강조는 섀도 깊이와 라벨로',
      'colorway 전환은 표면 톤 + 섀도 쌍 교체로(default 쿨 / warm 웜)',
      '섀도 하이라이트/다크는 ext 토큰으로만 지정(colorway 반응)',
    ],
    donts: [
      '고채도 액센트 남용 금지(뉴모피즘 절제 상실)',
      '섀도 톤을 표면과 무관한 색으로 금지(압출 착시 붕괴)',
    ],
  },
  typography: {
    summary:
      '소프트 라운드 산세리프(Nunito/Quicksand) 타이틀 + mono 수치. 모든 라벨은 다크 슬레이트 잉크로 라이트 표면 위 고대비(~10:1).',
    dos: ['타이틀은 소프트 라운드 산세리프', '수치·값은 mono', '라벨은 다크 슬레이트 잉크로 대비 확보'],
    donts: ['라벨에 섀도 필터 적용 금지(가독성)', '저대비 그레이 텍스트 금지(표면과 융화되어 사라짐)'],
  },
  accessibility: {
    summary:
      '뉴모피즘은 도형색=배경색이라 본질적 저대비다. 이를 정직하게 **contrastIntent: aa**로 선언하고, 대비 담당을 잉크로 분리한다: 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)과 윤곽(shape/edge.stroke)은 다크 슬레이트 잉크로 라이트 표면 대비 ~10:1(텍스트 ≥4.5·비텍스트 ≥3, auditVizContrast 게이트 통과). 윤곽선은 색이 진하되 폭을 1px로 억제해 뉴모피즘 무드와 게이트를 동시에 만족한다. 듀얼 섀도는 [data-viz-neumorph] 도형 그룹에만 적용되는 장식으로 텍스트에 미적용.',
    dos: [
      '라벨·윤곽은 다크 슬레이트 잉크(라이트 표면 대비 ≥4.5:1)',
      '윤곽선은 얇게(1px) — 색 대비로 게이트, 폭으로 무드 억제',
      '값·상태 인코딩은 색이 아니라 라벨/형태/섀도로 병기',
    ],
    donts: [
      '표면과 융화되는 저대비 그레이를 텍스트/윤곽에 사용 금지(대비 미달)',
      '섀도 깊이로만 의미 구분 금지(장식 한정 — 라벨 병기)',
      'aaa 과대주장 금지(뉴모피즘은 저대비 무드 — aa로 정직하게 선언)',
    ],
  },
};

export const neumorphicSoft01VizStyleGuide: VisualizationStyleGuide = {
  name: 'neumorphic-soft-01',
  description:
    'Neumorphic soft extrusion — a same-tone soft cool-gray surface where shapes read via a dual soft shadow (light highlight top-left + dark shadow bottom-right) injected as an SVG filter on the shape group only; thin dark-slate ink strokes and labels carry the contrast (AA) while borders stay visually subtle. Warm-gray colorway swaps surface tone and ink together.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { NeumorphicSoftShowcase: NeumorphicSoftShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '뉴모픽 소프트 모티프 — 소프트 그레이 표면 위 동일 톤 도형을 듀얼 소프트 섀도(라이트 좌상 + 다크 우하)로 압출, 얇은 다크 잉크 윤곽·라벨.',
    components: {
      Node: {
        description:
          '도형은 표면과 같은 톤으로 채워지고, NeumorphNode가 듀얼 섀도 SVG 필터(feMerge로 라이트 하이라이트 + 다크 섀도 2겹을 원본과 합성)를 도형 그룹에만 적용해 압출감을 만든다 — 라벨은 필터 밖.',
        specs: [
          'fill = 표면 동일 톤(소프트 그레이)',
          'filter url(#<prefix>-neumorph-<uid>) — 도형 그룹(data-viz-neumorph)에만',
          'dual shadow: light(-3,-3) + dark(3,3), 색 = ext shadowLight/shadowDark',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 슬레이트 잉크 라벨 — 섀도 미적용(가독성).',
        specs: ['다크 슬레이트 잉크', '10px', '라이트 표면 위 ≥4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 표면 톤 칩 배경 + 다크 잉크로 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '다크 슬레이트 잉크'],
      },
    },
    example: NeumorphicSoftShowcase as React.FC,
  },
  meta: {
    displayName: 'Neumorphic_Soft_01',
    family: 'viz-soft-puffy',
    summary:
      '소프트 그레이 동일 톤 표면 + 듀얼 소프트 섀도 압출·얇은 다크 잉크 윤곽/라벨의 차분한 뉴모픽 인포그래픽 페인트.',
    tags: ['light', 'muted', 'rounded', 'depth', 'minimal'],
    mood: { formality: 3, energy: 1, warmth: 2, density: 2, ornament: 3 },
    characteristics: {
      cornerRadius: 'round',
      borderWeight: 'thin',
      shadow: 'soft',
      density: 'airy',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'medium',
    },
    domains: ['dashboard', 'saas', 'fintech', 'portfolio', 'healthcare'],
    useWhen: [
      '차분하고 촉각적인 소프트 UI 무드로 대시보드·설정 화면 다이어그램을 낼 때 쓴다.',
      '저채도 그레이 톤에 은은한 압출감(듀얼 섀도)을 주고 싶을 때 쓴다.',
      '핀테크·헬스케어처럼 절제되고 프리미엄한 소프트 인상이 필요한 도식에 쓴다.',
    ],
    avoidWhen: [
      '고대비·저시력 접근성이 최우선인 도식일 때 피한다(뉴모피즘은 저대비 무드 — F2/F5를 쓴다).',
      '강한 시각적 임팩트·활기가 필요할 때 피한다(F3/F7을 쓴다).',
      '흑백 인쇄·플랫 벡터 출력이 목표일 때 피한다(섀도 압출이 소실).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['iso-color-block-01', 'clay-playful-01'],
  },
};
