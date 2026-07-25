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
 * Halftone_Print_01 — CMYK 망점(halftone-dot) 프린트(웜 페이퍼 + K 망점 스크린 + CMYK 잉크 워시).
 * 근거: viz-style-expansion.md Print/Ink family(웜 페이퍼 그라운드 + CMYK 반투명 워시 채움 +
 * 망점 톤 스크린 오버레이). 코믹/인쇄 인포그래픽 무드. 같은 family(viz-print-ink)의 Riso#32와 형제.
 *
 * 시그니처 = **망점 스크린**: SVG `<pattern>`(작은 K 원들)을 **도형에만** 톤 텍스처로 덧씌운다.
 * 텍스트/라벨엔 절대 걸지 않는다(가독성·접근성):
 *  - 망점 오버레이: HalftonePrintNode가 실 도형 위에 같은 도형을 `url(#dots)` 패턴으로 채운
 *    장식 그룹(`data-viz-halftone`, aria-hidden, 텍스트 없음)을 덧댄다. 패턴 사이 여백으로
 *    아래 워시가 배어나 톤이 형성된다(정보 인코딩 아님 — 순수 인쇄 질감 장식).
 *  - 오버프린트: `mix-blend-mode: multiply` 모티프 CSS를 `[data-viz-part="shape"]`에만 스코프
 *    (텍스트/라벨엔 이 속성이 없어 영향 0). CMYK 반투명 워시가 겹치면 배어나는 인쇄 합성.
 *  - 라벨(children)은 망점 그룹 밖에서 렌더 → 망점이 텍스트를 절대 왜곡하지 않는다.
 *
 * 접근성: 모든 라인/라벨 잉크는 near-black K(#141414) — 웜 페이퍼 대비 ~16.8:1, CMYK 워시가
 * 합성한 worst-case 표면 위에서도 ≥11.4:1(auditVizContrast 게이트, aaa 7:1 상회). CMYK 팔레트는
 * 스와치 전용이며 옐로/라이트 시안은 라인/텍스트 잉크로 절대 쓰지 않는다(저대비).
 */

const PAPER = '#F7F4EC'; // 웜 페이퍼 화이트 캔버스
const K = '#141414'; // near-black K 잉크 — 모든 라인/윤곽/텍스트 라벨(페이퍼 대비 16.76:1)

// CMYK 잉크 색(스와치 전용 — 라인/텍스트 잉크로 쓰지 않음).
const CYAN = '#0E9FC4';
const MAGENTA = '#D6187E';
const YELLOW = '#F4C20D';

// 채움 = CMYK 잉크 반투명 워시. 낮은 알파로 합성 표면을 밝게 유지 → K 라벨 안전(aaa).
const WASH = {
  cyan: 'rgba(14,159,196,0.16)',
  cyanStrong: 'rgba(14,159,196,0.22)',
  cyanFaint: 'rgba(14,159,196,0.10)',
  magenta: 'rgba(214,24,126,0.14)',
  magentaStrong: 'rgba(214,24,126,0.20)',
  yellow: 'rgba(244,194,13,0.22)',
  yellowFaint: 'rgba(244,194,13,0.14)',
  key: 'rgba(20,20,20,0.10)', // K 그레이 톤(뉴트럴)
} as const;

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: K,
  keylineWidth: 1.5,
  tagColor: K,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'halftone-print-01',

  canvas: {
    bg: PAPER,
    grid: '#E9E3D3', // 미세 페이퍼 그리드
    gridUnit: 8,
  },

  // CMYK 잉크 램프 — 시안/마젠타/옐로/키 + 오버프린트 배어남(시안×마젠타=블루, 마젠타×옐로=레드,
  // 시안×옐로=그린) + 페일 페이퍼 틴트.
  palette: {
    p1: CYAN, // 시안 C
    p2: MAGENTA, // 마젠타 M
    p3: YELLOW, // 옐로 Y
    p4: K, // 키 K
    p5: '#5B3E9B', // 오버프린트 블루(C×M)
    p6: '#E8552B', // 오버프린트 레드(M×Y)
    p7: '#3D9A54', // 오버프린트 그린(C×Y)
    p8: '#EDE7D6', // 페일 페이퍼 틴트
  },

  // 제네릭 도형 채움 = 시안 워시, 윤곽 = K 잉크.
  shape: {
    fill: WASH.cyan,
    stroke: K,
    strokeWidth: 1.5,
  },

  // kind별 CMYK 잉크 워시 채움(반투명) + K 잉크 윤곽 + K 잉크 라벨.
  node: {
    person: node(WASH.cyan, 'user'),
    external: node(WASH.yellow, 'arrowOut', { dashed: true }),
    container: node(WASH.magenta, 'stackedRect'),
    database: node(WASH.cyanStrong, 'cylinder'),
    queue: node(WASH.magentaStrong, 'bars'),
    decision: node(WASH.key, 'diamond'),
    process: node(WASH.yellowFaint, 'process'),
  },

  // K 잉크 라인 + 소형 화살촉.
  edge: {
    stroke: K,
    width: 1.5,
    dashPattern: '',
    cornerRadius: 2,
    marker: {
      size: 7,
      arrow: K,
      diamond: K,
      circle: K,
      cross: K,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(14,159,196,0.08)', labelColor: K },
    l2: { borderWidth: 1.5, bgTint: 'rgba(214,24,126,0.05)', labelColor: K },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: K },
  },

  // CMYK 잉크 대시 경계(비텍스트 장식 — 시안).
  boundary: {
    stroke: '#0E7C9B', // 다크 시안 경계선(페이퍼 대비 4.37:1, 비텍스트)
    width: 1.5,
    dashPattern: '5 4',
    radius: 2,
    labelColor: K,
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

// 쇼케이스 표면용 미세 망점 텍스처(6×6 타일 단일 K 도트, 6% 알파) — 데이터 URI, 결정론적(PRNG 없음).
// 도형 위 실 망점 스크린은 HalftonePrintNode wrapper가 SVG <pattern>으로 별도 적용한다.
const HALFTONE_URI =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><circle cx='1.5' cy='1.5' r='1' fill='%23141414' fill-opacity='0.06'/></svg>\")";

const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-halftone': HALFTONE_URI,
  '--bbangto-viz-ext-dot-ink': 'rgba(20,20,20,0.5)', // K 망점 스크린 잉크(도형 오버레이)
};

/** duotone — 시안×마젠타 2색 워시(옐로 제거) + K 키 라인. */
const duotoneFoundations = makeVizColorway(foundations, {
  name: 'halftone-print-01-duotone',
  // ink 미지정 → 라인/윤곽/경계는 base K 유지(듀오톤은 워시만 2색으로 축소).
  shape: { fill: WASH.magenta },
  nodeFills: {
    person: 'rgba(214,24,126,0.16)', // 마젠타 리드로 스와치 유니크
    external: 'rgba(14,159,196,0.16)',
    container: 'rgba(214,24,126,0.20)',
    database: 'rgba(14,159,196,0.22)',
    queue: 'rgba(214,24,126,0.24)',
    decision: 'rgba(14,159,196,0.10)',
    process: 'rgba(214,24,126,0.12)',
  },
  palette: {
    p1: MAGENTA, // 마젠타 리드
    p2: CYAN,
    p3: '#5B3E9B', // 오버프린트 블루(C×M)
    p5: '#7A2E6E',
    p6: '#B5486B',
    p7: '#2A7D9A',
  },
});

const DUOTONE_EXT: Record<string, string> = {
  '--bbangto-viz-ext-halftone': HALFTONE_URI,
  '--bbangto-viz-ext-dot-ink': 'rgba(70,10,45,0.5)', // 마젠타-블랙 망점 스크린 잉크
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'CMYK Halftone',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'duotone',
    label: 'Cyan × Magenta Duotone',
    foundations: duotoneFoundations,
    extendedFoundations: DUOTONE_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-halftone-print-01';
// 오버프린트 = 도형 shape에만 multiply(텍스트 무영향). 쇼케이스 표면엔 페이퍼 유지 + 망점 오버레이.
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="halftone-print-01"] [data-viz-part="shape"] {
  mix-blend-mode: multiply;
}
[data-bbangto-viz-style-guide="halftone-print-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: var(--bbangto-viz-ext-halftone) !important;
  background-repeat: repeat !important;
}
`;

/**
 * 망점 노드 — (1) 실 도형(CMYK 반투명 워시 채움 + K 잉크 윤곽) 위에
 * (2) 같은 도형을 K 망점 `<pattern>`으로 채운 장식 오버레이(`data-viz-halftone`, aria-hidden)를 덧댄다.
 * 패턴 원 사이 여백으로 아래 워시가 배어나 톤 스크린이 형성된다. 라벨(children)은 오버레이 밖에서
 * 렌더 → 망점이 텍스트를 절대 왜곡하지 않는다. id는 Provider defsPrefix + useId로 유일(riso 선례와 동형).
 */
function HalftonePrintNode({ children, ...rest }: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const pid = `${prefix}-halftone-dots-${uid}`;
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const fill = rest.fill ?? vvar('shape', 'fill');
  return (
    <>
      <defs>
        {/* 망점 스크린 — 15° 회전 K 도트 격자(patternUnits=userSpaceOnUse, 결정론적). */}
        <pattern
          id={pid}
          patternUnits="userSpaceOnUse"
          width={4}
          height={4}
          patternTransform="rotate(15)"
        >
          <circle cx={2} cy={2} r={0.9} fill={vvar('ext', 'dotInk')} />
        </pattern>
      </defs>
      {/* (1) 실 도형 — CMYK 워시 채움 + K 잉크 윤곽. */}
      <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 1.5} />
      {/* (2) 망점 오버레이 — 같은 도형을 K 망점 패턴으로 채워 도형 위에만 톤(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-halftone="" aria-hidden="true">
        <Node {...rest} fill={`url(#${pid})`} stroke="none" strokeWidth={0} />
      </g>
      {children}
    </>
  );
}
HalftonePrintNode.displayName = 'HalftonePrintNode';

/** 망점 태그 — K 잉크 라벨(망점 미적용). */
function HalftonePrintTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
HalftonePrintTag.displayName = 'HalftonePrintTag';

/** 흐름선 라벨 — 페이퍼 칩 배경 + K 잉크(망점 위 가독성). */
function HalftonePrintEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
HalftonePrintEdgeLabel.displayName = 'HalftonePrintEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: HalftonePrintNode,
  Tag: HalftonePrintTag,
  EdgeLabel: HalftonePrintEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'HalftonePrintShowcase' });

/** 쇼케이스 — 모티프 CSS(오버프린트 multiply + 망점 그라운드)를 주입한 뒤 공용 씬 렌더. */
function HalftonePrintShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
HalftonePrintShowcase.displayName = 'HalftonePrintShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '웜 페이퍼 그라운드 위 CMYK 잉크 반투명 워시 채움 + 오버프린트(multiply). K 망점 스크린은 도형에만 덧대는 결정론적 장식(15° 회전 도트 격자).',
    dos: [
      '채움은 CMYK 잉크 반투명 워시(멀티플라이로 겹침색이 배어남)',
      '망점 스크린은 도형에만 — 결정론적 도트 격자(<pattern>)',
      '윤곽은 near-black K 잉크 라인 + 소형 화살촉',
    ],
    donts: [
      '깔끔한 솔리드 벡터 채움 금지(인쇄 톤 무드 상실)',
      '망점에 정보 인코딩 금지(순수 인쇄 질감 장식)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      'CMYK 4색(시안·마젠타·옐로·키) 잉크 워시. 겹침에서 오버프린트 색이 배어나는 인쇄 특유의 합성. duotone preset은 시안×마젠타 2색으로 축소.',
    dos: [
      'CMYK 워시는 반투명으로 얹어 오버프린트 배어남을 살림',
      'colorway 전환은 잉크 세트 교체로(default 풀 CMYK / duotone 시안×마젠타)',
      '라인/텍스트는 K 잉크로 통일',
    ],
    donts: [
      '옐로·라이트 시안을 라인/텍스트 잉크로 금지(페이퍼 대비 미달)',
      'CMYK 4색을 라벨 색으로 남용 금지(저대비)',
    ],
  },
  typography: {
    summary:
      '그로테스크 산세리프(에디토리얼) 타이틀 + mono 수치. 모든 라벨은 near-black K 잉크로 망점·오버프린트 표면 위에서도 고대비.',
    dos: ['타이틀은 그로테스크 산세리프', '수치·값은 mono', '라벨은 K 잉크로 대비 확보'],
    donts: ['라벨에 망점 패턴 적용 금지(가독성)', 'CMYK 잉크 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 near-black K — CMYK 워시가 합성한 worst-case 표면 위에서도 11:1 이상(auditVizContrast 게이트, aaa 7:1 상회). 망점·multiply는 전부 [data-viz-part="shape"] 스코프 장식으로 텍스트에 미적용.',
    dos: [
      '라벨은 K 잉크(합성 표면 위 ≥7:1)',
      '망점/multiply는 도형에만 — 텍스트 제외',
      '값 인코딩은 색뿐 아니라 라벨/형태로 병기',
    ],
    donts: [
      '옐로·CMYK 잉크를 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '망점 스크린으로 의미 구분 금지(장식 한정)',
      '오버프린트 겹침색 위 저대비 라벨 금지',
    ],
  },
};

export const halftonePrint01VizStyleGuide: VisualizationStyleGuide = {
  name: 'halftone-print-01',
  description:
    'CMYK halftone print — warm paper ground, translucent CMYK ink washes with multiply overprint (2-ink overlap reads as a 3rd color), a deterministic K halftone dot screen (SVG <pattern>) overlaid on shapes only, near-black K ink for all lines and labels for AAA contrast on composited surfaces.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { HalftonePrintShowcase: HalftonePrintShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '망점 프린트 모티프 — 웜 페이퍼 위 CMYK 잉크 워시 + multiply 오버프린트, K 망점 스크린(도형 한정 장식), near-black K 잉크 라벨.',
    components: {
      Node: {
        description:
          '도형은 반투명 CMYK 잉크 워시로 채워지고 오버프린트(multiply)로 겹침색이 배어난다. HalftonePrintNode가 같은 도형을 K 망점 <pattern>으로 채운 오버레이(aria-hidden)를 도형 위에만 덧댄다 — 라벨은 오버레이 밖.',
        specs: [
          'fill = CMYK 잉크 반투명 워시(rgba)',
          'mix-blend-mode: multiply ([data-viz-part="shape"] 스코프)',
          'halftone <pattern id=<prefix>-halftone-dots-<uid>>, 15° 회전 K 도트 격자',
        ],
      },
      Tag: {
        description: '타입 태그는 K 잉크 라벨 — 망점 미적용(가독성).',
        specs: ['K 잉크', '10px', '오버프린트 표면 위 ≥7:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 페이퍼 칩 배경 + K 잉크로 망점 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', 'K 잉크'],
      },
    },
    example: HalftonePrintShowcase as React.FC,
  },
  meta: {
    displayName: 'Halftone_Print_01',
    family: 'viz-print-ink',
    summary:
      '웜 페이퍼 + CMYK 잉크 워시 multiply 오버프린트 + K 망점 스크린의 코믹/인쇄 에디토리얼 인포그래픽 페인트.',
    tags: ['textured', 'retro', 'vivid', 'light', 'high-contrast'],
    mood: { formality: 2, energy: 4, warmth: 3, density: 2, ornament: 3 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['editorial', 'blog', 'creative-agency', 'marketing', 'entertainment'],
    useWhen: [
      '에디토리얼·블로그 인포그래픽을 코믹/인쇄 망점(웜 페이퍼 + CMYK 오버프린트)의 트렌디한 무드로 낼 때 쓴다.',
      'CMYK 4색 잉크로 레트로 인쇄 질감(망점 스크린)을 주고 싶을 때 쓴다.',
      '크리에이티브 에이전시·마케팅 비주얼에서 차별적 인쇄 감성이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F5/F2를 쓴다).',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(F7을 쓴다).',
      '색각 안정성·저채도 절제가 우선인 대규모 데이터 차트에 피한다(고채도 CMYK 잉크).',
    ],
    accessibility: {
      contrastIntent: 'aaa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['riso-print-01', 'colorful-flat-01'],
  },
};
