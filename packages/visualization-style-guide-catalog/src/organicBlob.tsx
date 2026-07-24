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
 * Organic_Blob_01 — 자연광 그라운드 위에 얹은 바이오모픽(생체 유기) 블롭 페인트(Tier B).
 * 근거: KAN-039 P2 1:1 family(viz-organic-blob). 차분하고 친근한 유기적 무드.
 *
 * 새 도형(NEW blob shape) 1종: **OrganicBlobNode wrapper**. 노드 bbox(x/y/w/h)로부터
 * 부드러운 유기 닫힌 곡선(cubic-bezier "blob" — 살짝 비대칭인 라운드 초타원 wobble)을 계산해
 * 실제 <Node> 뒤에 `<g data-viz-blob aria-hidden="true">` 데코레이션으로 깐다. HUD corner-bracket
 * 선례(hudTelemetry)와 동형 — 지오메트리 불변, 코어/headless 무변경, 이 파일 안에서만 산다.
 *
 * 결정론(determinism): blob 곡선은 **고정 wobble 배열 + 노드 id 길이 seed**로만 만들어진다.
 * Math.random/Date.now 없음 → 같은 노드 박스는 항상 같은 `d`를 낸다(SSR-안전, 스냅샷 안정).
 *
 * 접근성: 모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 딥 그린-차콜
 * 잉크(#2C352C)로 소프트 라이트 fill·틴트 위에서 ≥8.2:1(auditVizContrast 게이트). shape/edge
 * 잉크는 크림 그라운드 대비 ≥11:1(텍스트 4.5·비텍스트 3 초과). blob은 순수 장식(aria-hidden,
 * 텍스트 없음)이라 실제 <Node>의 라벨은 blob 그룹 밖에서 렌더 → 판독성에 영향 0.
 */

const CREAM = '#F1EFE6'; // 따뜻한 오프화이트 자연광 그라운드
const INK = '#2C352C'; // 딥 그린-차콜 잉크 — 라인/윤곽/모든 라벨(크림 대비 11.03:1)

// 소프트 유기 라이트 틴트 — 전부 다크 잉크 라벨을 얹기에 충분히 밝다(각 ≥8.5:1 vs INK).
const TINT = {
  sage: '#CFE0C8',
  clay: '#EAD3C2',
  sky: '#C9DDE8',
  peach: '#F2D9C4',
  lilac: '#DAD0EA',
  softSage: '#D8E4CF',
  pale: '#E4E7DA',
} as const;

const node = (fill: string, glyph: string, opts?: { dashed?: boolean }) => ({
  fill,
  keyline: INK,
  keylineWidth: 1.25,
  tagColor: INK,
  ...(opts?.dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'organic-blob-01',

  canvas: {
    bg: CREAM,
    grid: '#E4E1D4', // 미세 웜 그리드
    gridUnit: 8,
  },

  // 소프트 유기 팔레트 — 세이지/클레이/스카이/피치/라일락의 자연 톤 + 잉크.
  palette: {
    p1: '#7FA968', // 세이지 그린(스냅샷 대표색)
    p2: '#D8A07C', // 클레이
    p3: '#8FB8CE', // 스카이
    p4: '#E7B98F', // 피치
    p5: '#B49BD1', // 라일락
    p6: INK, // 딥 그린-차콜 잉크
    p7: '#A7C08F', // 라이트 세이지
    p8: '#EAD3C2', // 페일 클레이
  },

  // 제네릭 도형 채움 = 세이지 틴트, 윤곽 = 딥 잉크(얇은 선).
  shape: {
    fill: TINT.sage,
    stroke: INK,
    strokeWidth: 1.25,
  },

  // kind별 소프트 유기 틴트 채움 + 잉크 윤곽 + 다크 잉크 라벨.
  node: {
    person: node(TINT.sage, 'user'),
    external: node(TINT.clay, 'arrowOut', { dashed: true }),
    container: node(TINT.sky, 'stackedRect'),
    database: node(TINT.peach, 'cylinder'),
    queue: node(TINT.lilac, 'bars'),
    decision: node(TINT.softSage, 'diamond'),
    process: node(TINT.pale, 'process'),
  },

  // 유기적 라운드 커넥터(cornerRadius 12) + 소형 화살촉(잉크).
  edge: {
    stroke: INK,
    width: 1.25,
    dashPattern: '',
    cornerRadius: 12,
    marker: {
      size: 7,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(127,169,104,0.10)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(127,169,104,0.06)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 소프트 라운드 대시 경계(유기적).
  boundary: {
    stroke: INK,
    width: 1.25,
    dashPattern: '4 4',
    radius: 16,
    labelColor: INK,
  },

  typography: {
    titleFont: "'Quicksand', 'Nunito', 'Segoe UI', sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 600,
    sizes: {
      title: '15px',
      label: '12px',
      tag: '10px',
      mono: '11px',
    },
  },

  iconStyle: 'fill',

  spacing: {
    nodePad: 14,
    laneGap: 28,
  },

  motion: {
    duration: '240ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// ext 변수 — 유기 그라운드(쇼케이스 백드롭 blob 그라디언트) + blob 기본 채움(노드 fill 미지정 시).
// preset마다 전량 재정의해 colorway 전환 시 그라운드/blob 채움이 함께 교체된다.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-ground':
    'radial-gradient(150px 130px at 16% 20%, rgba(207,224,200,0.55), transparent 62%), ' +
    'radial-gradient(170px 140px at 84% 28%, rgba(242,217,196,0.50), transparent 62%), ' +
    'radial-gradient(190px 160px at 60% 90%, rgba(201,221,232,0.50), transparent 62%)',
  '--bbangto-viz-ext-blob': TINT.sage,
};

/** sage — 세이지 그린 주도 colorway(페일 세이지 그라운드 + 다크 그린 잉크). */
const sageFoundations = makeVizColorway(foundations, {
  name: 'organic-blob-01-sage',
  canvas: { bg: '#EAF0E4', grid: '#DBE4D2' },
  ink: '#243528', // 다크 그린 잉크(페일 세이지 대비 11.20:1) — keyline/edge/boundary/shape/c4 라벨
  shape: { fill: '#CFE0C8' },
  nodeFills: {
    person: '#CFE0C8',
    external: '#D8E4CF',
    container: '#C6DCC0',
    database: '#DDE9D3',
    queue: '#C0D6C4',
    decision: '#E0EAD8',
    process: '#D2E2CE',
  },
  palette: {
    p1: '#5E8C52',
    p2: '#7FA968',
    p3: '#A7C08F',
    p4: '#88AE6E',
    p7: '#6E9A5C',
  },
});

const SAGE_EXT: Record<string, string> = {
  '--bbangto-viz-ext-ground':
    'radial-gradient(150px 130px at 16% 20%, rgba(198,220,192,0.60), transparent 62%), ' +
    'radial-gradient(170px 140px at 84% 28%, rgba(216,228,207,0.52), transparent 62%), ' +
    'radial-gradient(190px 160px at 60% 90%, rgba(210,226,206,0.52), transparent 62%)',
  '--bbangto-viz-ext-blob': '#C6DCC0',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Multi-tint Blobs',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'sage',
    label: 'Sage-led Blobs',
    foundations: sageFoundations,
    extendedFoundations: SAGE_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-organic-blob-01';
// 유기 그라운드 = 저채도 소프트 blob 그라디언트 오버레이(쇼케이스 표면). 스타일 가이드 name 스코프라
// 다른 가이드를 오염시키지 않는다(!important는 인라인 bg를 이기기 위함).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="organic-blob-01"] [data-viz-showcase] {
  background-color: var(--bbangto-viz-canvas-bg) !important;
  background-image: var(--bbangto-viz-ext-ground) !important;
  background-repeat: no-repeat !important;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// blob 지오메트리 — 노드 bbox → 부드러운 유기 닫힌 cubic-bezier 곡선(결정론)
// ─────────────────────────────────────────────────────────────────────────────

const BLOB_N = 10; // 곡선 제어점 수(고정 → 결정론적 구조)
// 고정 wobble 배열(Math.random 없음). seed는 위상만 회전시켜 노드마다 안정적 비대칭을 준다.
const BLOB_WOBBLE = [1.0, 0.9, 1.07, 0.93, 1.05, 0.88, 1.08, 0.92, 1.04, 0.95];
const BLOB_SCALE = 1.1; // 노드 박스를 살짝 감싸도록 확대(유기적 wrapper 느낌)
const BLOB_K = 0.16; // Catmull-Rom → cubic bezier 접선 계수(부드러움)

/**
 * 노드 bbox와 seed로 부드러운 유기 blob path를 만든다. BLOB_N개 점을 타원 둘레에 두고
 * 고정 wobble로 반경을 흔든 뒤, Catmull-Rom → 닫힌 cubic-bezier(C)로 이어 붙인다.
 * 순수 함수 + 고정 상수 → 결정론적(같은 인자 → 같은 문자열).
 */
function blobPath(x: number, y: number, w: number, h: number, seed: number): string {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = (w / 2) * BLOB_SCALE;
  const ry = (h / 2) * BLOB_SCALE;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < BLOB_N; i++) {
    const ang = (Math.PI * 2 * i) / BLOB_N - Math.PI / 2;
    const wob = BLOB_WOBBLE[(i + seed) % BLOB_N];
    pts.push([cx + Math.cos(ang) * rx * wob, cy + Math.sin(ang) * ry * wob]);
  }
  const f = (n: number): string => n.toFixed(2);
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])} `;
  for (let i = 0; i < BLOB_N; i++) {
    const p0 = pts[(i - 1 + BLOB_N) % BLOB_N];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % BLOB_N];
    const p3 = pts[(i + 2) % BLOB_N];
    const c1x = p1[0] + (p2[0] - p0[0]) * BLOB_K;
    const c1y = p1[1] + (p2[1] - p0[1]) * BLOB_K;
    const c2x = p2[0] - (p3[0] - p1[0]) * BLOB_K;
    const c2y = p2[1] - (p3[1] - p1[1]) * BLOB_K;
    d += `C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])} `;
  }
  return `${d}Z`;
}

/**
 * OrganicBlobNode — 실제 <Node> 뒤에 유기 blob <path>를 데코레이션으로 깐다(NEW shape).
 * 지오메트리 불변: x/y/width/height로 blob path만 계산해 형제 <g>로 방출한다. blob은
 * aria-hidden 순수 장식(텍스트 없음)이고, 실제 <Node>는 그대로 렌더 → 라벨·node-count 게이트 유지.
 * seed = 노드 id 길이(고정) → 같은 노드는 항상 같은 blob(결정론).
 */
function OrganicBlobNode({ children, ...rest }: NodeProps) {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  const seed = (rest.id?.length ?? 0) % BLOB_N;
  const fill = rest.fill ?? vvar('ext', 'blob');
  const d = blobPath(rest.x, rest.y, rest.width, rest.height, seed);
  return (
    <>
      {/* 유기 blob 데코레이션 — 실제 노드 뒤(장식, aria-hidden, 텍스트 없음). */}
      <g data-viz-blob="" aria-hidden="true">
        <path
          data-viz-blob-path=""
          d={d}
          style={{ fill, stroke: vvar('shape', 'stroke'), strokeWidth: 1.5, strokeLinejoin: 'round' }}
        />
      </g>
      {/* 실제 노드 — blob 위에 렌더되어 라벨(children)이 blob 밖에서 또렷하게 보인다. */}
      <Node {...rest}>{children}</Node>
    </>
  );
}
OrganicBlobNode.displayName = 'OrganicBlobNode';

/** 타입 태그 — 다크 잉크 라벨(blob 데코 미적용). */
function OrganicBlobTag(props: TagProps) {
  return <Tag {...props} fill={INK} fontSize={props.fontSize ?? 10} />;
}
OrganicBlobTag.displayName = 'OrganicBlobTag';

/** 흐름선 라벨 — 크림 칩 배경 + 다크 잉크(그라운드 위 가독성). */
function OrganicBlobEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fill={INK} fontSize={props.fontSize ?? 11} />;
}
OrganicBlobEdgeLabel.displayName = 'OrganicBlobEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: OrganicBlobNode,
  Tag: OrganicBlobTag,
  EdgeLabel: OrganicBlobEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'OrganicBlobShowcaseBase' });

/** 쇼케이스 — 모티프 CSS(유기 그라운드 그라디언트)를 주입한 뒤 공용 씬을 렌더. */
function OrganicBlobShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
OrganicBlobShowcase.displayName = 'OrganicBlobShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary:
      '소프트 자연광 그라운드(웜 오프화이트) 위에 유기 blob 도형. 노드는 실제 도형 뒤에 결정론적 blob <path>(살짝 비대칭 라운드 초타원)로 감싼다. 그림자는 없고, 쇼케이스는 저채도 소프트 blob 그라디언트 백드롭.',
    dos: [
      '채움은 소프트 유기 라이트 틴트(세이지/클레이/스카이/피치/라일락)',
      '노드는 결정론적 blob 곡선으로 감싼다(고정 wobble + id 길이 seed)',
      '윤곽은 딥 그린-차콜 잉크 얇은 선 + 라운드 커넥터',
    ],
    donts: [
      '각진 하드엣지·강한 그림자 금지(유기·차분 무드 상실)',
      'blob에 Math.random 변형 금지(결정론 유지)',
      '다크 그라운드 전환 금지(라이트 전용)',
    ],
  },
  color: {
    summary:
      '차분한 자연 파스텔 — 소프트 세이지/클레이/스카이/피치/라일락 틴트 + 딥 그린-차콜 잉크. colorway 전환은 그라운드·blob·잉크 세트 교체(default 멀티틴트 / sage 세이지 주도).',
    dos: [
      '채움은 저채도 자연 파스텔 틴트로 절제',
      '라인/라벨 잉크는 딥 그린-차콜 한 색으로 통일',
      'colorway 전환은 잉크·그라운드·blob 틴트를 함께 교체',
    ],
    donts: [
      '고채도 원색 채움 금지(차분한 유기 무드 붕괴)',
      '라이트 틴트를 라인/텍스트 잉크로 사용 금지(대비 미달)',
    ],
  },
  typography: {
    summary:
      '친근한 라운드 산세리프(Quicksand) 타이틀 + mono 수치. 모든 라벨은 딥 그린-차콜 잉크로 소프트 틴트/그라운드 위에서도 고대비(≥8.2:1).',
    dos: ['타이틀은 라운드 산세리프', '수치·값은 mono', '라벨은 다크 잉크로 대비 확보'],
    donts: ['라벨을 blob 데코 그룹 안에 넣기 금지(장식은 aria-hidden)', '라이트 틴트 색 텍스트 금지(저대비)'],
  },
  accessibility: {
    summary:
      '모든 라벨(node.tagColor / c4.labelColor / boundary.labelColor)은 딥 그린-차콜 잉크 — 소프트 라이트 fill·틴트 위에서 ≥8.2:1(auditVizContrast 게이트, aa=4.5 상회). blob은 aria-hidden 순수 장식이라 텍스트를 감싸거나 왜곡하지 않고, 실제 <Node> 라벨은 blob 그룹 밖에서 렌더된다. 형태 구분은 색뿐 아니라 blob·아이콘·라벨로 병기.',
    dos: [
      '텍스트는 딥 그린-차콜 잉크(라이트 표면 위 ≥4.5:1)',
      'blob·그라운드 그라디언트는 비상호작용 장식으로 유지',
      '의미는 색 단독이 아니라 라벨/형태로 병기',
    ],
    donts: [
      '라벨을 blob 데코 안에 얹기 금지(aria-hidden 장식)',
      '라이트 틴트 색을 텍스트/라인 잉크로 사용 금지(대비 미달)',
      'blob 형태 차이를 의미 인코딩 수단으로 오용 금지(순수 데코)',
    ],
  },
};

export const organicBlob01VizStyleGuide: VisualizationStyleGuide = {
  name: 'organic-blob-01',
  description:
    'Organic blob paint — soft natural-light ground, biomorphic blob-shaped nodes drawn by a wrapper as a deterministic closed cubic-bezier path behind the real node, calm natural-pastel tints (sage/clay/sky/peach/lilac) with deep green-charcoal ink labels for AA contrast, no shadow.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { OrganicBlobShowcase: OrganicBlobShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '유기 blob 모티프 — 소프트 자연광 그라운드 위, 실제 노드 뒤에 결정론적 유기 blob 곡선을 데코레이션으로 깐다(고정 wobble + id 길이 seed). 라벨은 딥 그린-차콜 잉크로 blob 밖에서 또렷.',
    components: {
      Node: {
        description:
          '노드 bbox(x/y/w/h)로부터 부드러운 유기 닫힌 cubic-bezier blob <path>를 계산해 실제 <Node> 뒤에 aria-hidden 장식으로 깐다(지오메트리 불변). blob 채움은 노드 fill(미지정 시 ext-blob), 윤곽은 shape.stroke 잉크. 결정론적(고정 wobble 배열 + id 길이 seed).',
        specs: [
          'blob <path> = 닫힌 cubic-bezier(C), 10 제어점 고정',
          'data-viz-blob(aria-hidden) 장식, 텍스트 없음',
          'fill = 노드 fill ?? ext-blob / stroke = shape.stroke 잉크',
        ],
      },
      Tag: {
        description: '타입 태그는 딥 그린-차콜 잉크 라벨 — blob 데코 미적용(가독성).',
        specs: ['딥 그린-차콜 잉크', '10px', '라이트 표면 위 ≥8.5:1'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 크림 칩 배경 + 다크 잉크로 유기 그라운드 위에서도 또렷.',
        specs: ['bg = canvas.bg 칩', '11px', '딥 그린-차콜 잉크'],
      },
    },
    example: OrganicBlobShowcase as React.FC,
  },
  meta: {
    displayName: 'Organic_Blob_01',
    family: 'viz-organic-blob',
    summary:
      '소프트 자연광 그라운드 + 결정론적 유기 blob 형태 노드 + 자연 파스텔 틴트·딥 그린-차콜 잉크의 차분하고 친근한 바이오모픽 인포그래픽 페인트.',
    tags: ['organic', 'rounded', 'pastel', 'light', 'playful'],
    mood: { formality: 2, energy: 2, warmth: 4, density: 2, ornament: 3 },
    characteristics: {
      cornerRadius: 'round',
      borderWeight: 'thin',
      shadow: 'none',
      density: 'airy',
      motion: 'still',
      colorScheme: 'light',
      contrast: 'high',
    },
    domains: ['creative-agency', 'marketing', 'portfolio', 'education', 'healthcare'],
    useWhen: [
      '차분하고 친근한 유기적 무드의 다이어그램·인포그래픽을 조립할 때 쓴다.',
      '크리에이티브 에이전시·마케팅·포트폴리오처럼 부드러운 바이오모픽 감성이 필요할 때 쓴다.',
      '교육·헬스케어처럼 따뜻하고 접근 가능한 파스텔 도식이 필요할 때 쓴다.',
    ],
    avoidWhen: [
      '각진 정밀·격식이 최우선인 기업 리포트·기술 명세 도식일 때 피한다.',
      '다크 그라운드·네온 하이테크 무드가 필요할 때 피한다(라이트 전용).',
      '고채도 원색으로 강한 에너지를 내야 할 때 피한다(저채도 자연 파스텔).',
    ],
    accessibility: {
      contrastIntent: 'aa',
      colorblindConsidered: false,
      motionHeavy: false,
      darkFirst: false,
    },
    related: ['colorful-flat-01', 'marker-sketchnote-01'],
  },
};
