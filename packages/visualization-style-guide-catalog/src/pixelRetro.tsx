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
 * Pixel_Retro_01 — 8비트 픽셀 아트 페인트(정수 그리드 + 하드 스퀘어 픽셀 도트).
 * 근거: 레트로 콘솔/픽셀 아트 무드(정수 픽셀 그리드 위 하드 엣지 청키 블록 + 스퀘어 픽셀 도트
 * 스크린 + 픽셀 폰트). 신규 지오메트리 없음 — 픽셀 질감은 오직 **스퀘어 <pattern> 오버레이 +
 * 하드 플랫 채움 + crispEdges(안티에일리어싱 제거)**로만 낸다. 각자 고유 family(viz-pixel-retro).
 *
 * 시그니처 = **스퀘어 픽셀 도트 스크린**: SVG `<pattern>`(작은 정사각형 셀, `shape-rendering=crispEdges`
 * 로 하드 엣지)을 **도형에만** 픽셀 질감으로 덧씌운다. 텍스트/라벨엔 절대 걸지 않는다(가독성·접근성):
 *  - 픽셀 오버레이: PixelRetroNode가 실 도형 위에 같은 도형을 `url(#pixel)` 패턴으로 채운
 *    장식 그룹(`data-viz-pixel`, aria-hidden, 텍스트 없음)을 덧댄다. 셀 사이 여백으로 아래 플랫
 *    채움이 배어나 픽셀 그리드 질감이 형성된다(정보 인코딩 아님 — 순수 레트로 질감 장식).
 *  - crispEdges: 모티프 CSS가 `[data-viz-part="shape"]`에만 `shape-rendering: crispEdges`를 스코프
 *    (텍스트/라벨엔 이 속성이 없어 영향 0). 곡선/모서리의 안티에일리어싱이 제거돼 하드 픽셀 무드.
 *  - 라벨(children)은 픽셀 그룹 밖에서 렌더 → 픽셀 스크린이 텍스트를 절대 왜곡하지 않는다.
 *
 * 접근성: 라이트 레트로 그라운드(파치먼트) + near-black 픽셀 잉크. 모든 라인/윤곽/라벨 잉크는
 * near-black 인디고(#1A1A2E) — 파치먼트 대비 ~13.6:1, 하드 플랫 채움 위 라벨도 전부 ≥7:1
 * (auditVizContrast 게이트, aa 4.5 상회). 하이채도 팔레트는 스와치·외곽 라벨 요소 전용이며
 * 면 위 텍스트로 쓰지 않는다.
 */

const PARCHMENT = '#E8E6D8'; // 라이트 레트로 파치먼트 그라운드
const INK = '#1A1A2E'; // near-black 인디고 잉크 — 모든 라인/윤곽/텍스트 라벨(파치먼트 대비 13.60:1)

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK,
  keylineWidth: 2, // 청키 픽셀 아웃라인(bold)
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'pixel-retro-01',

  canvas: {
    bg: PARCHMENT,
    grid: '#D8D5C4', // 미세 파치먼트 그리드
    gridUnit: 8, // 정수 픽셀 유닛(8px 정수 그리드)
  },

  // 레트로 콘솔 팔레트(PICO-8 무드) — ring/dot 등 외곽 라벨 요소·스와치 전용(면 위 텍스트 없음).
  palette: {
    p1: '#FF4D6D', // 레트로 레드
    p2: '#FFCE5C', // 레트로 골드
    p3: '#29ADB2', // 레트로 틸
    p4: '#3FBF6F', // 레트로 그린
    p5: '#7A5CE0', // 레트로 퍼플
    p6: '#F08A5B', // 레트로 오렌지
    p7: '#2E73B8', // 레트로 블루
    p8: INK, // 픽셀 잉크
  },

  // 제네릭 도형 채움 = 골드 플랫, 윤곽 = 픽셀 잉크.
  shape: {
    fill: '#FFCE5C',
    stroke: INK,
    strokeWidth: 2,
  },

  // kind별 하드 플랫 레트로 채움(솔리드 hex) + 픽셀 잉크 청키 윤곽 + 픽셀 잉크 라벨.
  node: {
    person: node('#FFCE5C', 'user'), // 골드
    external: node('#79D3E0', 'arrowOut', { dashed: true }), // 라이트 시안
    container: node('#FF9E7A', 'stackedRect'), // 코랄
    database: node('#8FDC8A', 'cylinder'), // 라이트 그린
    queue: node('#C79BF0', 'bars'), // 라이트 퍼플
    decision: node('#FFE873', 'diamond'), // 라이트 옐로
    process: node('#A9BBDD', 'process'), // 페리윙클
  },

  // 픽셀 잉크 라인 + 소형 화살촉. 하드 엣지(cornerRadius 0).
  edge: {
    stroke: INK,
    width: 2,
    dashPattern: '',
    cornerRadius: 0,
    marker: {
      size: 7,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(61,44,141,0.10)', labelColor: INK },
    l2: { borderWidth: 2, bgTint: 'rgba(61,44,141,0.06)', labelColor: INK },
    l3: { borderWidth: 2, bgTint: 'transparent', labelColor: INK },
  },

  // 레트로 인디고 대시 경계(비텍스트 장식).
  boundary: {
    stroke: '#3D2C8D', // 레트로 인디고 경계선(파치먼트 대비 8.61:1, 비텍스트)
    width: 2,
    dashPattern: '4 4',
    radius: 0, // 하드 픽셀 모서리
    labelColor: INK,
  },

  typography: {
    titleFont: "'Press Start 2P', 'VT323', 'Courier New', monospace", // 픽셀 폰트
    monoFont: "'VT323', 'JetBrains Mono', 'Courier New', monospace",
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
    duration: '120ms',
    easing: 'steps(4, end)', // 스텝 이징 — 픽셀 무드(연속 곡선 아님)
  },
};

// 쇼케이스 표면용 스퀘어 픽셀 그리드 텍스처(8×8 타일 체커보드 정사각 셀, 5% 알파) — 데이터 URI,
// 결정론적(PRNG 없음). shape-rendering=crispEdges로 하드 엣지. 도형 위 실 픽셀 스크린은
// PixelRetroNode wrapper가 SVG <pattern>으로 별도 적용한다.
const PIXEL_URI =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'><rect x='0' y='0' width='4' height='4' fill='%231A1A2E' fill-opacity='0.05'/><rect x='4' y='4' width='4' height='4' fill='%231A1A2E' fill-opacity='0.05'/></svg>\")";

const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-pixel': PIXEL_URI,
  '--bbangto-viz-ext-pixel-ink': 'rgba(26,26,46,0.28)', // 스퀘어 픽셀 도트 잉크(도형 오버레이)
};

/** gameboy — DMG 그린 스케일 colorway(라이트 페아 그린 그라운드 + 다크 그린 잉크). */
const gameboyFoundations = makeVizColorway(foundations, {
  name: 'pixel-retro-01-gameboy',
  canvas: { bg: '#C7D89C', grid: '#B5C88C' },
  ink: '#0F380F', // DMG 최암부 그린 잉크(라이트 페아 그린 대비 8.62:1) — keyline/edge/boundary/shape/c4 라벨
  tagColor: '#0F380F',
  shape: { fill: '#C4D88C' },
  nodeFills: {
    person: '#C4D88C',
    external: '#B8CE7E',
    container: '#D2E29C',
    database: '#AEC873',
    queue: '#DCE8AE',
    decision: '#CADF94',
    process: '#B0C67A',
  },
  palette: {
    p1: '#9BBC0F', // DMG 라이트 그린
    p2: '#8BAC0F',
    p3: '#306230',
    p5: '#5A7A2E',
    p6: '#C4D88C',
    p7: '#7E9C1E',
    p8: '#DCE8AE',
  },
});

const GAMEBOY_EXT: Record<string, string> = {
  '--bbangto-viz-ext-pixel':
    "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'><rect x='0' y='0' width='4' height='4' fill='%230F380F' fill-opacity='0.06'/><rect x='4' y='4' width='4' height='4' fill='%230F380F' fill-opacity='0.06'/></svg>\")",
  '--bbangto-viz-ext-pixel-ink': 'rgba(15,56,15,0.32)', // DMG 그린 스퀘어 픽셀 도트 잉크
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'PICO Console',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'gameboy',
    label: 'DMG Green Scale',
    foundations: gameboyFoundations,
    extendedFoundations: GAMEBOY_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-pixel-retro-01';
// crispEdges = 도형 shape에만(텍스트 무영향) → 안티에일리어싱 제거로 하드 픽셀 무드.
// 쇼케이스 표면엔 파치먼트 유지 + 스퀘어 픽셀 그리드 오버레이.
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="pixel-retro-01"] [data-viz-part="shape"] {
  shape-rendering: crispEdges;
}
[data-bbangto-viz-style-guide="pixel-retro-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: var(--bbangto-viz-ext-pixel) !important;
  background-repeat: repeat !important;
}
`;

/**
 * 픽셀 노드 — (1) 실 도형(하드 플랫 레트로 채움 + 픽셀 잉크 청키 윤곽) 위에
 * (2) 같은 도형을 스퀘어 픽셀 `<pattern>`(정사각 셀, crispEdges)으로 채운 장식 오버레이
 * (`data-viz-pixel`, aria-hidden)를 덧댄다. 정사각 셀 사이 여백으로 아래 플랫 채움이 배어나
 * 픽셀 그리드 질감이 형성된다. 라벨(children)은 오버레이 밖에서 렌더 → 픽셀이 텍스트를 절대
 * 왜곡하지 않는다. id는 Provider defsPrefix + useId로 유일(halftone/riso 선례와 동형).
 */
function PixelRetroNode({ children, ...rest }: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const pid = `${prefix}-pixel-cells-${uid}`;
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const fill = rest.fill ?? vvar('shape', 'fill');
  return (
    <>
      <defs>
        {/* 스퀘어 픽셀 스크린 — 4×4 정수 그리드 위 2×2 정사각 셀(patternUnits=userSpaceOnUse,
            shape-rendering=crispEdges로 하드 엣지, 결정론적). 원형 도트 아님 = 안티에일리어싱 없는 픽셀. */}
        <pattern
          id={pid}
          patternUnits="userSpaceOnUse"
          width={4}
          height={4}
          shapeRendering="crispEdges"
        >
          <rect
            x={1}
            y={1}
            width={2}
            height={2}
            fill={vvar('ext', 'pixelInk')}
            shapeRendering="crispEdges"
          />
        </pattern>
      </defs>
      {/* (1) 실 도형 — 하드 플랫 레트로 채움 + 픽셀 잉크 청키 윤곽. */}
      <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 2} />
      {/* (2) 픽셀 오버레이 — 같은 도형을 스퀘어 픽셀 패턴으로 채워 도형 위에만 질감
          (장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-pixel="" aria-hidden="true">
        <Node {...rest} fill={`url(#${pid})`} stroke="none" strokeWidth={0} />
      </g>
      {children}
    </>
  );
}
PixelRetroNode.displayName = 'PixelRetroNode';

/** 픽셀 태그 — 픽셀 잉크 라벨(픽셀 스크린 미적용). */
function PixelRetroTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
PixelRetroTag.displayName = 'PixelRetroTag';

/** 흐름선 라벨 — 파치먼트 칩 배경 + 픽셀 잉크(픽셀 위 가독성). */
function PixelRetroEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
PixelRetroEdgeLabel.displayName = 'PixelRetroEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: PixelRetroNode,
  Tag: PixelRetroTag,
  EdgeLabel: PixelRetroEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'PixelRetroShowcase' });

/** 쇼케이스 — 모티프 CSS(crispEdges + 픽셀 그리드 그라운드)를 주입한 뒤 공용 씬 렌더. */
function PixelRetroShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
PixelRetroShowcase.displayName = 'PixelRetroShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '라이트 레트로 파치먼트 그라운드 위 하드 플랫 레트로 채움 + 청키 픽셀 잉크 윤곽. 스퀘어 픽셀 도트 스크린은 도형에만 덧대는 결정론적 장식(4×4 정수 그리드 위 2×2 정사각 셀). crispEdges로 안티에일리어싱 제거.',
    dos: [
      '채움은 하드 플랫 솔리드 레트로 색(그라디언트·워시 아님)',
      '픽셀 스크린은 도형에만 — 결정론적 정사각 셀 격자(<pattern>, crispEdges)',
      '윤곽은 청키 픽셀 잉크 라인(bold) + 소형 화살촉, 하드 모서리(radius 0)',
    ],
    donts: [
      '부드러운 안티에일리어싱 곡선·소프트 섀도 금지(픽셀 무드 상실)',
      '픽셀 스크린에 정보 인코딩 금지(순수 레트로 질감 장식)',
      '픽셀 스크린을 텍스트/라벨에 적용 금지(가독성)',
    ],
  },
  color: {
    summary:
      '레트로 콘솔 하이채도 팔레트(PICO 무드). 하드 플랫 채움은 near-black 픽셀 잉크 라벨이 ≥7:1로 얹히도록 밝은 톤. gameboy preset은 DMG 그린 스케일로 축소.',
    dos: [
      '채움은 밝은 하드 플랫 레트로 색으로 라벨 대비 확보',
      'colorway 전환은 콘솔 팔레트 교체로(default PICO / gameboy DMG 그린 스케일)',
      '라인/텍스트는 픽셀 잉크(near-black)로 통일',
    ],
    donts: [
      '고채도 콘솔 색을 라인/텍스트 잉크로 금지(대비 불안정)',
      '한 화면에 팔레트 8색을 무분별 남용 금지(레트로 절제 상실)',
    ],
  },
  typography: {
    summary:
      '픽셀/mono 폰트(레트로 콘솔) 타이틀 + mono 수치. 모든 라벨은 near-black 픽셀 잉크로 플랫 채움·픽셀 스크린 표면 위에서도 고대비(≥7:1).',
    dos: ['타이틀은 픽셀·mono 폰트', '수치·값은 mono', '라벨은 픽셀 잉크로 대비 확보'],
    donts: ['라벨에 픽셀 <pattern> 적용 금지(가독성)', '고채도 콘솔 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 near-black 픽셀 잉크 — 하드 플랫 채움 위에서도 7:1 이상(auditVizContrast 게이트, aa 4.5 상회). 픽셀 스크린·crispEdges는 전부 [data-viz-part="shape"] 스코프 장식으로 텍스트에 미적용.',
    dos: [
      '라벨은 픽셀 잉크(플랫 채움 위 ≥7:1)',
      '픽셀 스크린/crispEdges는 도형에만 — 텍스트 제외',
      '값 인코딩은 색뿐 아니라 라벨/형태(glyph)로 병기',
    ],
    donts: [
      '고채도 콘솔 색을 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '픽셀 스크린으로 의미 구분 금지(장식 한정)',
      '하드 플랫 채움 위 저채도 저대비 라벨 금지',
    ],
  },
};

export const pixelRetro01VizStyleGuide: VisualizationStyleGuide = {
  name: 'pixel-retro-01',
  description:
    '8-bit pixel-art paint — light retro parchment ground, hard flat retro console fills with chunky pixel-ink outlines on an 8px integer grid, a deterministic square-pixel dot screen (SVG <pattern>, crispEdges) overlaid on shapes only, crispEdges shape-rendering to drop anti-aliasing, near-black ink for all lines and labels for AA-plus contrast on flat fills. No new geometry — the pixel feel comes from a square pattern overlay plus hard flat fills.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { PixelRetroShowcase: PixelRetroShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '픽셀 레트로 모티프 — 라이트 파치먼트 위 하드 플랫 레트로 채움 + 청키 픽셀 잉크 윤곽, 스퀘어 픽셀 도트 스크린(도형 한정 장식, crispEdges), near-black 픽셀 잉크 라벨.',
    components: {
      Node: {
        description:
          '도형은 하드 플랫 솔리드 레트로 색으로 채워지고 청키 픽셀 잉크로 윤곽된다. PixelRetroNode가 같은 도형을 스퀘어 픽셀 <pattern>(정사각 셀, crispEdges)으로 채운 오버레이(aria-hidden)를 도형 위에만 덧댄다 — 라벨은 오버레이 밖.',
        specs: [
          'fill = 하드 플랫 솔리드 레트로 색(hex)',
          'shape-rendering: crispEdges ([data-viz-part="shape"] 스코프)',
          'pixel <pattern id=<prefix>-pixel-cells-<uid>>, 4×4 정수 그리드 위 2×2 정사각 셀',
        ],
      },
      Tag: {
        description: '타입 태그는 픽셀 잉크 라벨 — 픽셀 스크린 미적용(가독성).',
        specs: ['픽셀 잉크(near-black)', '10px', '플랫 채움 위 ≥7:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 파치먼트 칩 배경 + 픽셀 잉크로 픽셀 스크린 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '픽셀 잉크'],
      },
    },
    example: PixelRetroShowcase as React.FC,
  },
  meta: {
    displayName: 'Pixel_Retro_01',
    family: 'viz-pixel-retro',
    summary:
      '라이트 파치먼트 + 하드 플랫 레트로 채움 + 청키 픽셀 잉크 윤곽 + 스퀘어 픽셀 도트 스크린(정수 그리드)의 8비트 픽셀 아트 인포그래픽 페인트.',
    tags: ['retro', 'geometric', 'vivid', 'high-contrast', 'sharp'],
    mood: { formality: 1, energy: 4, warmth: 3, density: 4, ornament: 3 },
    characteristics: {
      cornerRadius: 'sharp',
      borderWeight: 'bold',
      shadow: 'none',
      density: 'dense',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['gaming', 'entertainment', 'dev-tools', 'marketing'],
    useWhen: [
      '게이밍·엔터테인먼트 인포그래픽을 8비트 픽셀 아트(정수 그리드 + 스퀘어 픽셀 도트)의 레트로 콘솔 무드로 낼 때 쓴다.',
      '레트로 픽셀 질감(하드 플랫 채움 + crispEdges)으로 노스탤지어 무드를 주고 싶을 때 쓴다.',
      'dev-tools·마케팅 비주얼에서 차별적 레트로 게임 감성이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F2/Swiss를 쓴다).',
      '부드러운 곡선·소프트 섀도의 우아한 무드가 필요할 때 피한다(Soft/Puffy를 쓴다).',
      '색각 안정성·저채도 절제가 우선인 대규모 데이터 차트에 피한다(고채도 콘솔 팔레트).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'terminal-ascii-01'],
  },
};
