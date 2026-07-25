import { useId } from 'react';
import type {
  VisualizationFoundation,
  VizFoundationPreset,
} from '@centurio1987/bbangto-ui-tokens';
import {
  Node,
  Tag,
  EdgeLabel,
  useVizDefsPrefix,
  type NodeProps,
  type TagProps,
  type EdgeLabelProps,
  type VisualizationStyleGuide,
  type VizWrapperComponents,
} from '@centurio1987/bbangto-ui-visualization';
import { makeVizColorway } from './_foundation';
import { makeVizShowcase } from './_showcase';

/**
 * Marker_Sketchnote_01 — 손그림 마커 스케치노트 페인트.
 * 근거: F4 Marker_Sketchnote 배정 16장(style-classification.md — 진짜 지터 잉크 + 손글씨 +
 * 앰버 하이라이트 + 화이트보드/페이퍼 그라운드).
 *
 * "seeded 지터"는 wrapper(RoughNode)가 <defs><filter>에 feTurbulence(고정 seed) +
 * feDisplacementMap을 주입해 도형 윤곽을 결정론적으로 러프하게 변형한다 — PRNG 코드 0.
 * 필터는 **도형 그룹에만** 적용하고 라벨/텍스트엔 걸지 않는다(가독성·접근성).
 * 손글씨는 cursive로 끝나는 font-family 문자열(에셋 미번들 — 호스트 앱이 웹폰트 공급 가정).
 */

const INK = '#2A2A28';
const MARK = 2;
const AMBER = '#F2C230';

const node = (glyph: string, opts?: { dashed?: boolean }) => ({
  fill: 'none',
  keyline: INK,
  keylineWidth: MARK,
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'marker-sketchnote-01',

  canvas: {
    bg: '#FCFBF7',
    grid: '#E7E3D6',
    gridUnit: 8,
  },

  // 잉크 + 마커 하이라이트(앰버) + 보조 마커색 램프.
  palette: {
    p1: INK,
    p2: '#E4572E',
    p3: '#2E7DA8',
    p4: '#4C9A5B',
    p5: AMBER,
    p6: '#8A5A44',
    p7: '#6B6B66',
    p8: '#FBE8AE',
  },

  // 무채움(cross-hatch 무드) — 채움 대신 러프 잉크 윤곽 + 앰버 하이라이트.
  shape: {
    fill: 'none',
    stroke: INK,
    strokeWidth: MARK,
  },

  node: {
    person: node('user'),
    external: node('arrowOut', { dashed: true }),
    container: node('stackedRect'),
    database: node('cylinder'),
    queue: node('bars'),
    decision: node('diamond'),
    process: node('process'),
  },

  edge: {
    stroke: INK,
    width: MARK,
    dashPattern: '',
    cornerRadius: 6,
    marker: {
      size: 8,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2.5, bgTint: 'rgba(242,194,48,0.10)', labelColor: INK },
    l2: { borderWidth: 2, bgTint: 'rgba(242,194,48,0.06)', labelColor: INK },
    l3: { borderWidth: 1.5, bgTint: 'transparent', labelColor: INK },
  },

  // 손그림 대시 경계.
  boundary: {
    stroke: INK,
    width: 1.5,
    dashPattern: '3 4',
    radius: 6,
    labelColor: INK,
  },

  typography: {
    // 손글씨 스택 — cursive 폴백(에셋 미번들). 값/수치는 mono로 가독성 유지.
    titleFont: "'Caveat', 'Gaegu', 'Comic Sans MS', cursive",
    monoFont: "'Courier New', monospace",
    titleWeight: 700,
    sizes: {
      title: '16px',
      label: '13px',
      tag: '11px',
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

/** darkboard — 칠판(다크 그라운드) + 초크 잉크 colorway. */
const darkboardFoundations = makeVizColorway(foundations, {
  name: 'marker-sketchnote-01-darkboard',
  canvas: { bg: '#202826', grid: '#313B38' },
  ink: '#F3EFE4',
  tagColor: '#F3EFE4',
  palette: {
    p1: '#F3EFE4',
    p2: AMBER,
    p3: '#7FC8D6',
    p4: '#A6D98C',
    p5: AMBER,
    p6: '#D9B48F',
    p7: '#B8B4A8',
    p8: '#3A4744',
  },
  boundaryLabelColor: '#F3EFE4',
  c4Tints: ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.04)', 'transparent'],
});

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Paper + Ink Marker',
    foundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': AMBER },
  },
  {
    key: 'darkboard',
    label: 'Chalk on Darkboard',
    foundations: darkboardFoundations,
    extendedFoundations: { '--bbangto-viz-ext-accent': AMBER },
  },
];

/**
 * 손그림 지터 — <defs><filter>(feTurbulence 고정 seed + feDisplacementMap)를 노드 옆에
 * 주입하고 도형 그룹에만 적용한다. id는 Provider defsPrefix + useId로 유일(NeonNode와 동형).
 * 텍스트(NodeLabel/Tag)는 이 그룹 밖이라 왜곡되지 않는다.
 */
function RoughNode(props: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const fid = `${prefix}-rough-${uid}`;
  return (
    <>
      <defs>
        <filter id={fid} x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={2} seed={7} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${fid})`} data-viz-rough="">
        <Node {...props} fill={props.fill ?? 'none'} strokeWidth={props.strokeWidth ?? MARK} />
      </g>
    </>
  );
}
RoughNode.displayName = 'RoughNode';

/** 마커 태그 — 손글씨 라벨(러프 필터 미적용). */
function RoughTag(props: TagProps) {
  return <Tag {...props} fontSize={11} />;
}
RoughTag.displayName = 'RoughTag';

/** 흐름선 라벨 — 배경 칩 없이 잉크 캡션. */
function RoughEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill="none" fontSize={12} />;
}
RoughEdgeLabel.displayName = 'RoughEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: RoughNode,
  Tag: RoughTag,
  EdgeLabel: RoughEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'MarkerSketchnoteShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary: '페이퍼/화이트보드 그라운드 위 러프 마커 잉크 2px. 지터는 feTurbulence 고정 seed로 결정론적.',
    dos: ['도형 윤곽은 러프 마커 잉크', '보조 그리드는 저대비 닷', '하이라이트는 앰버 한 색만'],
    donts: ['깔끔한 벡터 라인 금지(F5를 쓴다)', '고채도 솔리드 채움 금지(무채움 + 하이라이트)'],
  },
  color: {
    summary: '단일 잉크 + 앰버 하이라이트. 채움 없음(cross-hatch 무드).',
    dos: ['한 가지 잉크로 통일', '강조는 앰버 하이라이트로'],
    donts: ['다색 잉크 남용 금지', '하이라이트 위 흰 텍스트 금지'],
  },
  typography: {
    summary: '제목/라벨은 손글씨(cursive) — 친근한 스케치노트 무드. 수치·값은 mono로 가독성 유지.',
    dos: ['제목·라벨은 손글씨 스택', '핵심 수치는 mono 병기'],
    donts: ['긴 본문에 손글씨 남용 금지(가독성)', '손글씨 폰트에 의미 인코딩 의존 금지'],
  },
  accessibility: {
    summary:
      '잉크는 캔버스 대비 확보(페이퍼 위 13:1, 칠판 위 초크 12:1 — 모두 ≥4.5). 러프 필터는 도형에만, 텍스트엔 미적용.',
    dos: [
      'rough/displacement 필터는 도형에만 적용(라벨/텍스트 제외)',
      'cursive는 장식 라벨 한정 — 핵심 정보는 명확히 표기',
      '값 인코딩은 색만이 아니라 텍스트로도 병기',
    ],
    donts: [
      '텍스트에 지터 필터 적용 금지(가독성 저하)',
      '앰버 하이라이트(#F2C230) 위 흰 텍스트 금지(대비 미달)',
      '색만으로 의미 구분 금지',
    ],
  },
};

export const markerSketchnote01VizStyleGuide: VisualizationStyleGuide = {
  name: 'marker-sketchnote-01',
  description:
    'Hand-drawn marker sketchnote paint — rough marker ink outlines via wrapper-injected feTurbulence/feDisplacementMap (fixed seed, deterministic), amber highlight, handwriting labels, paper or darkboard ground.',
  foundations,
  extendedFoundations: { '--bbangto-viz-ext-accent': AMBER },
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { MarkerSketchnoteShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '러프 마커 잉크 모티프 — feTurbulence 지터 윤곽, 무채움, 앰버 하이라이트, 손글씨 라벨. 필터는 도형 한정.',
    components: {
      Node: {
        description:
          '도형은 wrapper가 주입한 <filter>(feTurbulence 고정 seed + feDisplacementMap)로 러프하게 변형된 잉크 윤곽만 — 손그림 인상. 필터는 도형 그룹에만.',
        specs: ['fill: none', 'keyline 2px 마커 잉크', 'filter: url(#<prefix>-rough-<uid>), seed 고정'],
      },
      Tag: {
        description: '타입 태그는 손글씨 라벨 — 러프 필터 미적용(가독성).',
        specs: ['손글씨 스택', '11px', '잉크 상속'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 배경 칩 없이 잉크 캡션.',
        specs: ['bg 없음', '12px', '잉크'],
      },
    },
    example: Showcase,
  },
  meta: {
    displayName: 'Marker_Sketchnote_01',
    family: 'viz-marker-sketchnote',
    summary:
      '러프 마커 잉크 윤곽(feTurbulence 지터) + 앰버 하이라이트 + 손글씨 라벨의 친근한 스케치노트 다이어그램 — 페이퍼/칠판 그라운드.',
    tags: ['hand-drawn', 'playful', 'textured', 'light', 'organic', 'muted'],
    mood: { formality: 1, energy: 3, warmth: 4, density: 2, ornament: 3 },
    characteristics: {
      cornerRadius: 'soft',
      borderWeight: 'bold',
      shadow: 'none',
      density: 'balanced',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['education', 'marketing', 'blog', 'creative-agency', 'social'],
    useWhen: [
      '워크숍·강의·브레인스토밍 도식을 친근한 손그림 스케치노트로 그릴 때 쓴다.',
      '개념 설명·아이디어 맵을 마커 잉크 + 앰버 하이라이트의 캐주얼 무드로 전달할 때 쓴다.',
      '화이트보드/칠판 느낌의 비격식 다이어그램이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '정밀·격식이 필요한 기업 리포트·기술 명세 도식일 때 피한다(F5/F2를 쓴다).',
      '다색 시맨틱 채움 차트가 필요할 때 피한다(F3를 쓴다).',
      '긴 본문 가독성이 최우선일 때 손글씨 남용을 피한다.',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: true,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['ink-line-duotone-01', 'colorful-flat-01'],
  },
};
