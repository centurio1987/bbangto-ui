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
 * Riso_Print_01 — 리소그래프 프린트 페인트(웜 크림 + 스팟 잉크 오버프린트).
 * 근거: viz-style-expansion.md §4-d Riso(웜 크림 그라운드 + 스팟 잉크 2~3색 multiply 오버프린트 +
 * 미세 미스레지 오프셋 + 저주파 그레인). UI#29 Risograph_Print + 아웃라이어 근거.
 *
 * 세 데코 모두 **장식**이며 텍스트엔 절대 걸지 않는다(가독성·접근성):
 *  - 오버프린트: `mix-blend-mode: multiply` 모티프 CSS를 `[data-viz-part="shape"]`에만 스코프
 *    (텍스트/라벨엔 이 속성이 없어 영향 0). 반투명 잉크 워시 fill이 겹치면 3색이 배어난다.
 *  - 미스레지: RisoNode가 스팟 잉크 1색을 1.5px 오프셋 **복제 유령 도형**으로 뒤에 깐다
 *    (aria-hidden, 정보 인코딩 아님 — 순수 채널 시프트 장식).
 *  - 그레인: RisoNode가 <defs><filter>(feTurbulence 고정 seed=7)를 도형 그룹에만 적용한다
 *    (marker-sketchnote 선례 재사용). 라벨(children)은 필터 밖에서 렌더 → 왜곡 0.
 *
 * 접근성: 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 다크 잉크로
 * 오버프린트 합성 표면 위에서도 4.5:1 이상(auditVizContrast worst-case 게이트). shape/edge 잉크는
 * 진한 블루/틸이라 크림 캔버스 대비 ≥4.5(텍스트)·≥3(비텍스트) 확보 — 형광 핑크는 캔버스 대비
 * ~2.8:1이라 라인/텍스트 잉크로 쓰지 않고 오직 채움 워시·장식에만 쓴다.
 */

const CREAM = '#F4EFE0'; // 웜 크림 캔버스
const INK_BLUE = '#1E5AA8'; // 진한 스팟 블루 — 라인/윤곽 잉크(크림 대비 5.93:1)
const INK_LABEL = '#182234'; // 다크 잉크 — 모든 텍스트 라벨(오버프린트 표면 위 ≥9.6:1)

// 채움 = 잉크 반투명(멀티플라이) 워시. 낮은 알파로 합성 표면을 밝게 유지 → 다크 라벨 안전.
const WASH = {
  pink: 'rgba(255,77,109,0.22)',
  pinkStrong: 'rgba(255,77,109,0.26)',
  blue: 'rgba(30,90,168,0.24)',
  blueSoft: 'rgba(30,90,168,0.18)',
  blueFaint: 'rgba(30,90,168,0.14)',
  over: 'rgba(124,58,150,0.22)', // 핑크×블루 오버프린트가 배어난 퍼플
  overSoft: 'rgba(124,58,150,0.18)',
} as const;

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK_BLUE,
  keylineWidth: 1.5,
  tagColor: INK_LABEL,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'riso-print-01',

  canvas: {
    bg: CREAM,
    grid: '#E7E0CC', // 미세 크림 그리드
    gridUnit: 8,
  },

  // 스팟 잉크 램프 — 형광 핑크 + 블루 + 오버프린트 퍼플 + 옵션 옐로/오렌지의 잉크 톤.
  palette: {
    p1: '#FF4D6D', // 형광 핑크
    p2: '#1E5AA8', // 블루
    p3: '#7C3A96', // 오버프린트 퍼플(핑크×블루)
    p4: '#E0562E', // 스팟 오렌지
    p5: '#F2C744', // 스팟 옐로
    p6: '#B5486B', // 뮤트 마젠타
    p7: INK_LABEL, // 다크 잉크
    p8: '#F9E8C9', // 페일 옐로 크림
  },

  // 제네릭 도형 채움 = 핑크 워시, 윤곽 = 블루 잉크.
  shape: {
    fill: WASH.pink,
    stroke: INK_BLUE,
    strokeWidth: 1.5,
  },

  // kind별 잉크 워시 채움(반투명 멀티플라이) + 블루 잉크 윤곽 + 다크 잉크 라벨.
  node: {
    person: node(WASH.pink, 'user'),
    external: node(WASH.blueSoft, 'arrowOut', { dashed: true }),
    container: node(WASH.over, 'stackedRect'),
    database: node(WASH.blue, 'cylinder'),
    queue: node(WASH.pinkStrong, 'bars'),
    decision: node(WASH.overSoft, 'diamond'),
    process: node(WASH.blueFaint, 'process'),
  },

  // 스팟 잉크 라인 + 소형 화살촉(블루 잉크).
  edge: {
    stroke: INK_BLUE,
    width: 1.5,
    dashPattern: '',
    cornerRadius: 2,
    marker: {
      size: 7,
      arrow: INK_BLUE,
      diamond: INK_BLUE,
      circle: INK_BLUE,
      cross: INK_BLUE,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(30,90,168,0.08)', labelColor: INK_LABEL },
    l2: { borderWidth: 1.5, bgTint: 'rgba(30,90,168,0.05)', labelColor: INK_LABEL },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK_LABEL },
  },

  // 스팟 잉크 대시 경계.
  boundary: {
    stroke: '#C24E70', // 뮤트 핑크 경계선(비텍스트 장식)
    width: 1.5,
    dashPattern: '5 4',
    radius: 2,
    labelColor: INK_LABEL,
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

// 저주파 그레인 오버레이(feTurbulence 고정 seed=7) — 쇼케이스 표면용 데이터 URI.
// 결정론적(PRNG 없음). 도형 위 실 그레인은 RisoNode wrapper가 SVG 필터로 별도 적용한다.
const GRAIN_URI =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='rg'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23rg)'/></svg>\")";

const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-grain': GRAIN_URI,
  '--bbangto-viz-ext-misreg': 'rgba(255,77,109,0.55)', // 미스레지 유령 잉크(핑크)
  '--bbangto-viz-ext-spot-a': '#FF4D6D',
  '--bbangto-viz-ext-spot-b': '#1E5AA8',
};

/** teal — 블루×틸 오버프린트 colorway(쿨 크림 그라운드 + 다크 틸 잉크). */
const tealFoundations = makeVizColorway(foundations, {
  name: 'riso-print-01-teal',
  canvas: { bg: '#EEF2EC', grid: '#DCE6DE' },
  ink: '#0E4A4E', // 다크 틸 잉크(쿨 크림 대비 8.80:1) — keyline/edge/boundary/shape/c4 라벨
  shape: { fill: 'rgba(20,120,120,0.22)' },
  nodeFills: {
    person: 'rgba(20,120,120,0.22)',
    external: 'rgba(30,90,168,0.18)',
    container: 'rgba(14,90,110,0.22)',
    database: 'rgba(30,90,168,0.24)',
    queue: 'rgba(20,120,120,0.26)',
    decision: 'rgba(20,110,140,0.18)',
    process: 'rgba(30,90,168,0.14)',
  },
  palette: {
    p1: '#1EA39A',
    p2: '#1E5AA8',
    p3: '#0E5A6E',
    p4: '#2EC4B6',
    p6: '#2A7D74',
    p8: '#DDEFE9',
  },
});

const TEAL_EXT: Record<string, string> = {
  '--bbangto-viz-ext-grain': GRAIN_URI,
  '--bbangto-viz-ext-misreg': 'rgba(20,120,120,0.55)', // 미스레지 유령 잉크(틸)
  '--bbangto-viz-ext-spot-a': '#1EA39A',
  '--bbangto-viz-ext-spot-b': '#1E5AA8',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Pink × Blue Overprint',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'teal',
    label: 'Blue × Teal Overprint',
    foundations: tealFoundations,
    extendedFoundations: TEAL_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-riso-print-01';
// 오버프린트 = 도형 shape에만 multiply(텍스트 무영향). 쇼케이스 표면엔 크림 유지 + 그레인 오버레이.
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="riso-print-01"] [data-viz-part="shape"] {
  mix-blend-mode: multiply;
}
[data-bbangto-viz-style-guide="riso-print-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: var(--bbangto-viz-ext-grain) !important;
  background-repeat: repeat !important;
}
`;

/**
 * 리소 노드 — (1) 미스레지 유령 도형(스팟 잉크 1.5px 오프셋, aria-hidden) +
 * (2) 그레인 필터(feTurbulence 고정 seed=7)를 도형 그룹에만 적용한 실 도형.
 * 라벨(children)은 필터 그룹 밖에서 렌더 → 그레인·미스레지가 텍스트를 절대 왜곡하지 않는다.
 * id는 Provider defsPrefix + useId로 유일(marker/neon 선례와 동형).
 */
function RisoNode({ children, ...rest }: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const gid = `${prefix}-riso-grain-${uid}`;
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
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0"
            result="grain"
          />
          <feComposite in="grain" in2="SourceGraphic" operator="in" result="grainClip" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="grainClip" />
          </feMerge>
        </filter>
      </defs>
      {/* (1) 미스레지 유령 — 스팟 잉크 오프셋 복제(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-riso-misreg="" aria-hidden="true" transform="translate(1.5, -1.5)">
        <Node {...rest} fill={vvar('ext', 'misreg')} stroke="none" strokeWidth={0} />
      </g>
      {/* (2) 실 도형 — 그레인 필터를 도형 그룹에만. 라벨은 아래(필터 밖)에서 렌더. */}
      <g data-viz-riso-grain="" filter={`url(#${gid})`}>
        <Node {...rest} fill={fill} strokeWidth={rest.strokeWidth ?? 1.5} />
      </g>
      {children}
    </>
  );
}
RisoNode.displayName = 'RisoNode';

/** 리소 태그 — 다크 잉크 라벨(그레인/미스레지 미적용). */
function RisoTag(props: TagProps) {
  return <Tag {...props} fontSize={10} />;
}
RisoTag.displayName = 'RisoTag';

/** 흐름선 라벨 — 크림 칩 배경 + 다크 잉크(그레인 위 가독성). */
function RisoEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fontSize={11} />;
}
RisoEdgeLabel.displayName = 'RisoEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: RisoNode,
  Tag: RisoTag,
  EdgeLabel: RisoEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'RisoPrintShowcase' });

/** 쇼케이스 — 모티프 CSS(오버프린트 multiply + 그레인 그라운드)를 주입한 뒤 공용 씬 렌더. */
function RisoShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
RisoShowcase.displayName = 'RisoPrintShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '웜 크림 그라운드 위 스팟 잉크 반투명 워시 채움 + 오버프린트(multiply). 미세 미스레지(1.5px) + 저주파 그레인은 결정론적 장식(feTurbulence seed 고정).',
    dos: [
      '채움은 잉크 반투명 워시(멀티플라이로 겹침색이 배어남)',
      '그레인/미스레지는 도형에만 — 결정론적 seed 고정',
      '윤곽은 진한 스팟 잉크 라인 + 소형 화살촉',
    ],
    donts: [
      '깔끔한 솔리드 벡터 채움 금지(오버프린트 무드 상실)',
      '미스레지에 정보 인코딩 금지(순수 장식 오프셋)',
      '다크 그라운드 전환 금지(이 가이드는 라이트 전용)',
    ],
  },
  color: {
    summary:
      '스팟 잉크 2~3색(형광 핑크 + 블루 + 오버프린트 퍼플, teal preset은 블루×틸). 겹침에서 3색이 배어나는 리소 특유의 오버프린트.',
    dos: [
      '스팟 잉크는 2~3색으로 절제',
      '오버프린트 겹침색은 multiply로 자연히 형성',
      'colorway 전환은 잉크 쌍 교체로(default 핑크×블루 / teal 블루×틸)',
    ],
    donts: [
      '형광 핑크를 라인/텍스트 잉크로 금지(크림 대비 ~2.8:1 미달)',
      '스팟 잉크 4색+ 남용 금지(리소 절제 상실)',
    ],
  },
  typography: {
    summary:
      '그로테스크 산세리프(에디토리얼) 타이틀 + mono 수치. 모든 라벨은 다크 잉크로 오버프린트 표면 위에서도 고대비.',
    dos: ['타이틀은 그로테스크 산세리프', '수치·값은 mono', '라벨은 다크 잉크로 대비 확보'],
    donts: ['라벨에 그레인/미스레지 필터 적용 금지(가독성)', '스팟 잉크 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 다크 잉크 — 오버프린트가 합성한 worst-case 표면 위에서도 4.5:1 이상(auditVizContrast 게이트). 그레인·미스레지·multiply는 전부 [data-viz-part="shape"] 스코프 장식으로 텍스트에 미적용.',
    dos: [
      '라벨은 다크 잉크(합성 표면 위 ≥4.5:1)',
      '그레인/multiply/미스레지는 도형에만 — 텍스트 제외',
      '값 인코딩은 색뿐 아니라 라벨/형태로 병기',
    ],
    donts: [
      '형광 핑크·스팟 잉크를 텍스트/라인 잉크로 사용 금지(대비 미달)',
      '미스레지 오프셋으로 의미 구분 금지(장식 한정)',
      '오버프린트 겹침색 위 저대비 라벨 금지',
    ],
  },
};

export const risoPrint01VizStyleGuide: VisualizationStyleGuide = {
  name: 'riso-print-01',
  description:
    'Risograph print paint — warm cream ground, translucent spot-ink washes with multiply overprint (2-ink overlap reads as a 3rd color), decorative misregistration offset and deterministic low-frequency feTurbulence grain (shape-only, seed fixed), dark-ink labels for AA contrast on composited surfaces.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { RisoPrintShowcase: RisoShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '리소 프린트 모티프 — 웜 크림 위 스팟 잉크 워시 + multiply 오버프린트, 결정론적 그레인 + 미세 미스레지(도형 한정 장식), 다크 잉크 라벨.',
    components: {
      Node: {
        description:
          '도형은 반투명 잉크 워시로 채워지고 오버프린트(multiply)로 겹침색이 배어난다. RisoNode가 미스레지 유령 도형(1.5px 오프셋, aria-hidden)과 그레인 필터(feTurbulence seed 고정)를 도형 그룹에만 적용 — 라벨은 필터 밖.',
        specs: [
          'fill = 잉크 반투명 워시(rgba)',
          'mix-blend-mode: multiply ([data-viz-part="shape"] 스코프)',
          'grain filter url(#<prefix>-riso-grain-<uid>), seed 고정 + 미스레지 1.5px',
        ],
      },
      Tag: {
        description: '타입 태그는 다크 잉크 라벨 — 그레인/미스레지 미적용(가독성).',
        specs: ['다크 잉크', '10px', '오버프린트 표면 위 ≥4.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 크림 칩 배경 + 다크 잉크로 그레인 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '다크 잉크'],
      },
    },
    example: RisoShowcase as React.FC,
  },
  meta: {
    displayName: 'Riso_Print_01',
    family: 'viz-riso-print',
    summary:
      '웜 크림 + 스팟 잉크 2~3색 multiply 오버프린트·미세 미스레지·저주파 그레인의 리소그래프 에디토리얼 인포그래픽 페인트.',
    tags: ['grainy', 'textured', 'retro', 'vivid', 'light'],
    mood: { formality: 2, energy: 3, warmth: 4, density: 2, ornament: 3 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['editorial', 'blog', 'creative-agency', 'marketing'],
    useWhen: [
      '에디토리얼·블로그 인포그래픽을 리소 프린트(웜 크림 + 스팟 잉크 오버프린트)의 트렌디한 무드로 낼 때 쓴다.',
      '2~3색 스팟 잉크로 레트로·아날로그 인쇄 질감(그레인·미스레지)을 주고 싶을 때 쓴다.',
      '크리에이티브 에이전시·마케팅 비주얼에서 차별적 인쇄 감성이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다(F5/F2를 쓴다).',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(F7을 쓴다).',
      '색각 안정성·저채도 절제가 우선인 대규모 데이터 차트에 피한다(고채도 스팟 잉크).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'marker-sketchnote-01'],
  },
};
