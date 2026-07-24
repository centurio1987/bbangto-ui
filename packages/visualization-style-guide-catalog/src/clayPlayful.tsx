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
 * Clay_Playful_01 — 파스텔 퍼피 클레이(claymorphism). 웜 크림 그라운드 위 파스텔 솔리드
 * 도형을 두툼하게 굴리고, 안쪽 그림자(inner shadow)로 소프트하게 모델링해 "찰흙"처럼 보이게 한다.
 * 근거: KAN-038 viz-soft-puffy family — Neumorphic·Clay·Kawaii 소프트/퍼피 계열. 키즈·교육·플레이풀 무드.
 *
 * 시그니처(inset) 데코는 **장식**이며 텍스트엔 절대 걸지 않는다(가독성·접근성):
 *  - inset(inner shadow): ClayNode가 <defs><filter>(feOffset+feGaussianBlur+feComposite operator="out"
 *    으로 알파를 반전 → 도형 안쪽에만 그림자)를 도형 그룹([data-viz-clay])에만 적용한다.
 *    라벨(children)은 필터 그룹 밖에서 렌더 → inset이 텍스트를 절대 왜곡·저대비화하지 않는다.
 *  - outer puff: 같은 필터에서 SourceAlpha를 블러·오프셋한 소프트 드롭을 도형 뒤에 깔아 퍼피한 부피감을 준다.
 *  - 결정론적(PRNG·feTurbulence 없음) — id만 Provider defsPrefix + useId로 유일.
 *
 * 접근성: 파스텔 fill은 전부 **밝은 고휘도 솔리드**라, 위에 얹는 라벨/태그는 웜 다크 클레이 잉크
 * (#3E3138)로 4.5:1을 크게 상회한다(default 8.6~9.9:1, sky 9.2~10.2:1 — auditVizContrast 게이트).
 * shape/edge 잉크도 크림 캔버스 대비 ≥4.5(텍스트)·≥3(비텍스트). inset/outer puff는 전부
 * [data-viz-clay] 도형 그룹 스코프 장식으로 텍스트에 미적용. contrastIntent는 정직하게 'aa'.
 */

const CREAM = '#FBF4EC'; // 웜 오프화이트 크림 캔버스
const INK = '#3E3138'; // 웜 다크 클레이 잉크 — 모든 라벨/윤곽/엣지(크림 대비 11.32:1)

// 파스텔 솔리드 채움 — 전부 밝은 고휘도라 다크 잉크 라벨과 대비 ≥8.6:1(각 kind 검증 완료).
const PASTEL = {
  pink: '#F7CEDD', // 파스텔 핑크
  blue: '#BFE3F2', // 파스텔 블루
  lilac: '#DDD3F0', // 파스텔 라일락
  mint: '#C9EAD3', // 파스텔 민트
  peach: '#FAD9BE', // 파스텔 피치
  yellow: '#F6E7A8', // 파스텔 옐로
  periwinkle: '#CBD8F5', // 파스텔 페리윙클
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
  name: 'clay-playful-01',

  canvas: {
    bg: CREAM,
    grid: '#F0E7DA', // 미세 크림 그리드(거의 안 보이는 웜 톤)
    gridUnit: 8,
  },

  // 캔디 톤 파스텔 램프 — 채도만 살짝 올린 액센트(차트/인포그래픽 색), 잉크는 p7.
  palette: {
    p1: '#EB6F92', // 캔디 핑크
    p2: '#6FB3E0', // 캔디 블루
    p3: '#8FD9A8', // 캔디 민트
    p4: '#F5B971', // 캔디 피치
    p5: '#B79CE8', // 캔디 라일락
    p6: '#F2D06B', // 캔디 옐로
    p7: INK, // 다크 클레이 잉크
    p8: '#F5EDE2', // 페일 크림
  },

  // 제네릭 도형 채움 = 파스텔 페리윙클, 윤곽 = 다크 잉크(얇은 키라인).
  shape: {
    fill: '#D9E7F5',
    stroke: INK,
    strokeWidth: 1.5,
  },

  // kind별 파스텔 솔리드 채움 + 다크 잉크 얇은 윤곽 + 다크 잉크 라벨.
  node: {
    person: node(PASTEL.pink, 'user'),
    external: node(PASTEL.blue, 'arrowOut', { dashed: true }),
    container: node(PASTEL.lilac, 'stackedRect'),
    database: node(PASTEL.mint, 'cylinder'),
    queue: node(PASTEL.peach, 'bars'),
    decision: node(PASTEL.yellow, 'diamond'),
    process: node(PASTEL.periwinkle, 'process'),
  },

  // 두툼하게 굴린 커넥터 + 소형 화살촉(다크 잉크).
  edge: {
    stroke: INK,
    width: 2,
    dashPattern: '',
    cornerRadius: 10,
    marker: {
      size: 8,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(62,49,56,0.06)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(62,49,56,0.04)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 두툼하게 굴린 소프트 경계(비텍스트 장식은 뮤트 모브).
  boundary: {
    stroke: '#C99BC0', // 뮤트 모브 경계선(비텍스트 장식)
    width: 1.5,
    dashPattern: '2 6',
    radius: 18, // 퍼피 라운딩
    labelColor: INK,
  },

  typography: {
    // 둥글둥글한 플레이풀 산세리프 스택 — 값/수치는 mono로 가독성 유지.
    titleFont: "'Baloo 2', 'Quicksand', 'Nunito', 'Helvetica Neue', Arial, sans-serif",
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

  // 넉넉한 여백 — 퍼피 도형이 숨 쉴 공간.
  spacing: {
    nodePad: 16,
    laneGap: 28,
  },

  motion: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// 기본(웜 클레이) 확장 변수 — inset(내부 그림자) + outer puff(외부 소프트 드롭) 색.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-inset-shadow': 'rgba(62,49,56,0.42)', // 웜 클레이 inner shadow
  '--bbangto-viz-ext-outer-puff': 'rgba(180,150,165,0.35)', // 소프트 웜 outer drop
};

const SKY_BG = '#EEF3F8'; // 쿨 오프화이트
const SKY_INK = '#2A3340'; // 쿨 다크 슬레이트 잉크(쿨 크림 대비 11.43:1)

/** sky — 쿨 파스텔 블루 리드 colorway(쿨 오프화이트 + 쿨 슬레이트 잉크). */
const skyFoundations = makeVizColorway(foundations, {
  name: 'clay-playful-01-sky',
  canvas: { bg: SKY_BG, grid: '#E1E9F2' },
  ink: SKY_INK, // keyline/edge/boundary/shape/c4 라벨 일괄
  tagColor: SKY_INK,
  shape: { fill: '#CFE0F0' },
  nodeFills: {
    person: '#CFE6F5', // 페일 블루
    external: '#D6DEF5', // 페리윙클
    container: '#DAD9F2', // 페일 인디고
    database: '#CDEAE6', // 페일 틸
    queue: '#C9E7F2', // 페일 스카이
    decision: '#DDE7F3', // 페일 스틸블루
    process: '#C7E4EE', // 페일 아쿠아
  },
  palette: {
    p1: '#5B8DBE', // 스틸 블루
    p2: '#6FB3E0',
    p3: '#5FBFC0', // 틸
    p5: '#8CA0D8', // 페리윙클
    p7: SKY_INK,
    p8: '#E4EDF6',
  },
  c4LabelColor: SKY_INK,
  c4Tints: ['rgba(42,51,64,0.06)', 'rgba(42,51,64,0.04)', 'transparent'],
  boundaryLabelColor: SKY_INK,
});

const SKY_EXT: Record<string, string> = {
  '--bbangto-viz-ext-inset-shadow': 'rgba(42,51,64,0.40)', // 쿨 슬레이트 inner shadow
  '--bbangto-viz-ext-outer-puff': 'rgba(140,160,185,0.35)', // 소프트 쿨 outer drop
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Warm Pastel Clay',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'sky',
    label: 'Cool Sky Clay',
    foundations: skyFoundations,
    extendedFoundations: SKY_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-clay-playful-01';
// 쇼케이스 패널을 퍼피한 클레이 판처럼 — 두툼한 라운딩 + 소프트 inset/outer 그림자(비텍스트 장식).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="clay-playful-01"] [data-viz-showcase] {
  border-radius: 28px;
  box-shadow:
    inset 0 2px 6px var(--bbangto-viz-ext-inset-shadow),
    0 8px 20px var(--bbangto-viz-ext-outer-puff);
}
`;

/**
 * 클레이 노드 — inset(inner shadow) + outer puff를 <defs><filter>로 도형 그룹([data-viz-clay])에만
 * 적용한다. inner shadow는 feOffset+feGaussianBlur+feComposite operator="out"으로 알파를 반전해
 * 도형 안쪽에만 그림자를 남기는 표준 inset 레시피(결정론적, PRNG 없음). 라벨(children)은 필터 그룹
 * 밖에서 렌더 → inset·puff가 텍스트를 절대 왜곡하지 않는다. id는 Provider defsPrefix + useId로 유일.
 * flood-color는 style로 지정해 CSS 변수(--bbangto-viz-ext-*)를 해석하게 한다.
 */
function ClayNode({ children, ...rest }: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const fid = `${prefix}-clay-inset-${uid}`;
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const fill = rest.fill ?? vvar('shape', 'fill');
  return (
    <>
      <defs>
        <filter
          id={fid}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          filterUnits="objectBoundingBox"
        >
          {/* (a) outer puff — SourceAlpha 블러·오프셋 소프트 드롭(도형 뒤 부피감). */}
          <feGaussianBlur in="SourceAlpha" stdDeviation={3} result="outBlur" />
          <feOffset in="outBlur" dx={0} dy={2} result="outOff" />
          <feFlood style={{ floodColor: vvar('ext', 'outerPuff'), floodOpacity: 1 }} result="outColor" />
          <feComposite in="outColor" in2="outOff" operator="in" result="outShadow" />

          {/* (b) inset(inner shadow) — 알파 반전으로 도형 안쪽에만 그림자. */}
          <feOffset in="SourceAlpha" dx={0} dy={3} result="inOff" />
          <feGaussianBlur in="inOff" stdDeviation={3} result="inBlur" />
          <feComposite in="SourceAlpha" in2="inBlur" operator="out" result="inInverse" />
          <feFlood style={{ floodColor: vvar('ext', 'insetShadow'), floodOpacity: 1 }} result="inColor" />
          <feComposite in="inColor" in2="inInverse" operator="in" result="inShadowRaw" />
          <feComponentTransfer in="inShadowRaw" result="inShadow">
            <feFuncA type="linear" slope={0.85} />
          </feComponentTransfer>

          {/* 합성: outer puff(뒤) → 실 도형 → inner shadow(위, 도형 안쪽 한정). */}
          <feMerge>
            <feMergeNode in="outShadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="inShadow" />
          </feMerge>
        </filter>
      </defs>
      {/* inset/puff 필터를 도형 그룹에만. 라벨은 아래(필터 밖)에서 렌더 → 왜곡·저대비화 0. */}
      <g data-viz-clay="" filter={`url(#${fid})`}>
        <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 1.5} />
      </g>
      {children}
    </>
  );
}
ClayNode.displayName = 'ClayNode';

/** 클레이 태그 — 다크 잉크 라벨(inset/puff 미적용). */
function ClayTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
ClayTag.displayName = 'ClayTag';

/** 흐름선 라벨 — 크림 칩 배경 + 다크 잉크(파스텔 위 또렷). */
function ClayEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
ClayEdgeLabel.displayName = 'ClayEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: ClayNode,
  Tag: ClayTag,
  EdgeLabel: ClayEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'ClayPlayfulShowcase' });

/** 쇼케이스 — 퍼피 클레이 패널 모티프 CSS를 주입한 뒤 공용 씬 렌더. */
function ClayShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
ClayShowcase.displayName = 'ClayPlayfulShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '웜 크림 그라운드 위 파스텔 솔리드 도형을 두툼하게 굴리고, inset(inner shadow)로 소프트하게 모델링. outer puff 드롭이 부피감을 더한다. inset/puff는 결정론적 SVG 필터(도형 한정 장식).',
    dos: [
      '채움은 밝은 파스텔 솔리드(고휘도) — 다크 잉크 라벨과 고대비',
      'inset/outer puff는 도형 그룹([data-viz-clay])에만 — 결정론적',
      '두툼한 라운딩 + 넉넉한 여백으로 퍼피한 부피감',
    ],
    donts: [
      '진한/저휘도 파스텔 금지(다크 잉크 라벨 대비 미달 위험)',
      'inset를 텍스트에 적용 금지(가독성)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '파스텔 멀티 컬러(default: 핑크·블루·라일락·민트·피치·옐로·페리윙클) 또는 쿨 스카이 리드(sky). 모든 kind는 밝은 솔리드로 다크 잉크 라벨과 ≥8.6:1.',
    dos: [
      '파스텔은 밝게 유지(각 kind별 다크 잉크 대비 ≥4.5 검증)',
      'colorway 전환은 파스텔 팔레트 교체로(default 멀티 / sky 쿨 블루)',
      '액센트 팔레트(p1~p6)는 채도만 살짝 올린 캔디 톤',
    ],
    donts: [
      '파스텔을 라인/텍스트 잉크로 금지(저대비)',
      '유사 휘도 파스텔만으로 kind 구분 금지(글리프·태그 병기)',
    ],
  },
  typography: {
    summary:
      '둥글둥글한 플레이풀 산세리프(Baloo/Quicksand 계열) 타이틀 + mono 수치. 모든 라벨은 다크 잉크로 파스텔·크림 위에서 고대비.',
    dos: ['타이틀은 둥근 산세리프', '수치·값은 mono', '라벨은 다크 잉크로 대비 확보'],
    donts: ['라벨에 inset/puff 필터 적용 금지(가독성)', '파스텔 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 다크 클레이 잉크 — 밝은 파스텔·크림 위에서 4.5:1을 크게 상회(default 8.6~9.9:1, sky 9.2~10.2:1; auditVizContrast 게이트). inset·outer puff는 전부 [data-viz-clay] 도형 그룹 스코프 장식으로 텍스트에 미적용.',
    dos: [
      '라벨은 다크 잉크(파스텔 솔리드 위 ≥4.5:1)',
      'inset/puff는 도형에만 — 텍스트 제외',
      'kind는 색뿐 아니라 글리프·태그 라벨로 병기(색각 이상 대비)',
    ],
    donts: [
      '파스텔·저채도 색을 텍스트/라인 잉크로 사용 금지(대비 미달)',
      'inset 깊이로 의미 구분 금지(순수 장식)',
      '유사 휘도 파스텔만으로 시맨틱 인코딩 금지',
    ],
  },
};

export const clayPlayful01VizStyleGuide: VisualizationStyleGuide = {
  name: 'clay-playful-01',
  description:
    'Pastel puffy claymorphism — warm cream ground, chunky rounded pastel-solid shapes modeled with a deterministic SVG inset (inner shadow) plus a soft outer puff drop (shape-scoped decoration), dark warm-clay ink labels for AA contrast on every light pastel fill. Kids/education/playful mood.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { ClayPlayfulShowcase: ClayShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '파스텔 퍼피 클레이 모티프 — 웜 크림 위 파스텔 솔리드 도형을 두툼하게 굴리고 inset(inner shadow)로 모델링, outer puff로 부피감(도형 한정 장식), 다크 잉크 라벨.',
    components: {
      Node: {
        description:
          '도형은 밝은 파스텔 솔리드로 채워지고 ClayNode가 inset(inner shadow)와 outer puff를 <defs><filter>로 도형 그룹([data-viz-clay])에만 적용한다. inner shadow는 알파 반전(feComposite operator="out")으로 도형 안쪽에만 남고, 라벨은 필터 밖에서 렌더.',
        specs: [
          'fill = 파스텔 솔리드(hex)',
          'inset filter url(#<prefix>-clay-inset-<uid>) — feOffset+feGaussianBlur+feComposite out',
          'outer puff = SourceAlpha 블러·오프셋 드롭, flood-color = --bbangto-viz-ext-*',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 잉크 라벨 — inset/puff 미적용(가독성).',
        specs: ['다크 잉크', '10px', '파스텔 솔리드 위 ≥4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 크림 칩 배경 + 다크 잉크로 파스텔 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '다크 잉크'],
      },
    },
    example: ClayShowcase as React.FC,
  },
  meta: {
    displayName: 'Clay_Playful_01',
    family: 'viz-soft-puffy',
    summary:
      '웜 크림 + 파스텔 솔리드 도형을 inset(inner shadow)·outer puff로 모델링한 퍼피 클레이(claymorphism) 인포그래픽. 키즈·교육·플레이풀.',
    tags: ['pastel', 'rounded', 'playful', 'depth', 'light'],
    mood: { formality: 1, energy: 3, warmth: 4, density: 2, ornament: 3 },
    characteristics: {
      cornerRadius: 'round',
      borderWeight: 'thin',
      shadow: 'soft',
      density: 'airy',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'medium',
    },
    domains: ['kids', 'education', 'marketing', 'landing'],
    useWhen: [
      '키즈·교육 인포그래픽을 파스텔 퍼피 클레이(부드러운 찰흙) 무드로 낼 때 쓴다.',
      '두툼하게 굴린 소프트 도형(inset 모델링)으로 친근·플레이풀한 인상을 줄 때 쓴다.',
      '마케팅·랜딩 비주얼에서 밝고 다정한 파스텔 감성이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F2/Swiss를 쓴다).',
      '다크 그라운드·하이테크 무드가 필요할 때 피한다(F7/HUD를 쓴다).',
      '고밀도 데이터 차트에서 강한 색 구분이 필요할 때 피한다(유사 휘도 파스텔).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'kawaii-pastel-01'],
  },
};
