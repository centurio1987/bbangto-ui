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
 * Neon_Gradient_Dark_01 — 다크 그라운드 + 광택 멀티휴 그라디언트 페인트.
 * 근거: F7 Neon_Gradient_Dark 배정 7장(style-classification.md — 구 iso 스펙에서 분리된 패밀리).
 * 그라디언트는 wrapper가 <defs><linearGradient>로 노드 옆에 주입하고 stop-color를
 * CSS var로 읽는다 → colorway 전환만으로 램프가 교체된다(코어 defs 인프라 무변경).
 * foundation의 node.*.fill은 램프 시작 stop의 대표 솔리드 hex — 대비 게이트/headless 렌더 호환.
 */

const WHITE = '#FFFFFF';
const HAIR = 1;

// 램프 세그먼트: 시안→퍼플→핑크→오렌지→앰버에서 kind별 구간 할당.
type GradSegment = 'a' | 'b' | 'c' | 'd';
const SEGMENT_BY_KIND: Record<string, GradSegment> = {
  person: 'a',
  database: 'a',
  container: 'b',
  decision: 'b',
  queue: 'c',
  external: 'd',
  process: 'd',
};

const node = (fill: string, tagColor: string, glyph: string, dashed?: boolean) => ({
  fill,
  keyline: WHITE,
  keylineWidth: HAIR,
  tagColor,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'neon-gradient-dark-01',

  canvas: {
    bg: '#1E1A3D',
    grid: '#2E2760',
    gridUnit: 8,
  },

  // 니어네온 램프 스탑들 + 흰 잉크/라벤더 보조.
  palette: {
    p1: '#29B6E8',
    p2: '#8A3FF0',
    p3: '#E0389E',
    p4: '#FF9A1F',
    p5: '#FFC24D',
    p6: '#54C7F0',
    p7: '#FFFFFF',
    p8: '#9F8FE8',
  },

  shape: {
    fill: '#29B6E8',
    stroke: WHITE,
    strokeWidth: HAIR,
  },

  // 대표 fill = 각 세그먼트 시작 stop. tagColor는 "부득이 면 위에 얹을 때의 안전색"
  // (원칙은 외부 라벨 — guidelines.accessibility 참조).
  node: {
    person: node('#29B6E8', '#10102C', 'user'),
    external: node('#FF9A1F', '#10102C', 'arrowOut', true),
    container: node('#8A3FF0', '#FFFFFF', 'stackedRect'),
    database: node('#54C7F0', '#10102C', 'cylinder'),
    queue: node('#E0389E', '#10102C', 'bars'),
    decision: node('#B07CF5', '#10102C', 'diamond'),
    process: node('#FF7E4F', '#10102C', 'process'),
  },

  // 흰 헤어라인 엣지 1px — 다크 그라운드 대비 16.5:1.
  edge: {
    stroke: WHITE,
    width: HAIR,
    dashPattern: '',
    cornerRadius: 4,
    marker: {
      size: 6,
      arrow: WHITE,
      diamond: WHITE,
      circle: WHITE,
      cross: WHITE,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(255,255,255,0.05)', labelColor: WHITE },
    l2: { borderWidth: 1.5, bgTint: 'rgba(255,255,255,0.03)', labelColor: WHITE },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: WHITE },
  },

  boundary: {
    stroke: '#9F8FE8',
    width: 1,
    dashPattern: '6 4',
    radius: 4,
    labelColor: WHITE,
  },

  typography: {
    titleFont: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
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
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// ext var 전체 세트 — 그라디언트 stop/글로우/배경/라벨. preset마다 전량 재정의해야
// colorway 전환 시 stop-color가 함께 교체된다.
const DEFAULT_EXT: Record<string, string> = {
  '--bbangto-viz-ext-bg-from': '#1E1A3D',
  '--bbangto-viz-ext-bg-to': '#4A1A6B',
  '--bbangto-viz-ext-glow': 'rgba(138,63,240,0.55)',
  '--bbangto-viz-ext-label': '#FFFFFF',
  '--bbangto-viz-ext-grad-a-from': '#29B6E8',
  '--bbangto-viz-ext-grad-a-to': '#8A3FF0',
  '--bbangto-viz-ext-grad-b-from': '#8A3FF0',
  '--bbangto-viz-ext-grad-b-to': '#E0389E',
  '--bbangto-viz-ext-grad-c-from': '#E0389E',
  '--bbangto-viz-ext-grad-c-to': '#FF9A1F',
  '--bbangto-viz-ext-grad-d-from': '#FF9A1F',
  '--bbangto-viz-ext-grad-d-to': '#FFC24D',
};

/** aurora — 네온 그린/다크 네이비 colorway (관측: system_isometric_07 #3DDC84 글로우). */
const auroraFoundations = makeVizColorway(foundations, {
  name: 'neon-gradient-dark-01-aurora',
  canvas: { bg: '#0E1B2E', grid: '#1B2C45' },
  shape: { fill: '#3DDC84' },
  tagColor: '#06131F',
  nodeFills: {
    person: '#3DDC84',
    external: '#B9F06A',
    container: '#29E8C8',
    database: '#54C7F0',
    queue: '#9AE84A',
    decision: '#7FE3A8',
    process: '#2EC4A6',
  },
  palette: { p1: '#3DDC84', p2: '#29E8C8', p3: '#9AE84A', p4: '#54C7F0', p5: '#7FE3A8', p6: '#2EC4A6', p8: '#6FD8B0' },
});

const AURORA_EXT: Record<string, string> = {
  '--bbangto-viz-ext-bg-from': '#0E1B2E',
  '--bbangto-viz-ext-bg-to': '#123A2E',
  '--bbangto-viz-ext-glow': 'rgba(61,220,132,0.5)',
  '--bbangto-viz-ext-label': '#FFFFFF',
  '--bbangto-viz-ext-grad-a-from': '#3DDC84',
  '--bbangto-viz-ext-grad-a-to': '#29E8C8',
  '--bbangto-viz-ext-grad-b-from': '#29E8C8',
  '--bbangto-viz-ext-grad-b-to': '#54C7F0',
  '--bbangto-viz-ext-grad-c-from': '#9AE84A',
  '--bbangto-viz-ext-grad-c-to': '#3DDC84',
  '--bbangto-viz-ext-grad-d-from': '#B9F06A',
  '--bbangto-viz-ext-grad-d-to': '#7FE3A8',
};

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'Neon Purple Ramp',
    foundations,
    extendedFoundations: DEFAULT_EXT,
  },
  {
    key: 'aurora',
    label: 'Aurora Green (Navy Ground)',
    foundations: auroraFoundations,
    extendedFoundations: AURORA_EXT,
  },
];

const MOTIF_ID = 'bbangto-viz-motif-neon-gradient-dark-01';
// 글로우는 절제된 drop-shadow, 쇼케이스 배경은 다크 그라디언트 그라운드
// (인라인 bg(vvar canvas.bg)보다 우선해야 하므로 !important — 가이드 name 스코프라 오염 없음).
const MOTIF_CSS = `
[data-bbangto-viz-style-guide="neon-gradient-dark-01"] [data-viz-neon-glow] {
  filter: drop-shadow(0 0 6px var(--bbangto-viz-ext-glow));
}
[data-bbangto-viz-style-guide="neon-gradient-dark-01"] [data-viz-showcase] {
  background-image: linear-gradient(160deg, var(--bbangto-viz-ext-bg-from), var(--bbangto-viz-ext-bg-to)) !important;
}
`;

function segmentOf(fill?: string): GradSegment {
  const m = fill ? /^var\(--bbangto-viz-node-([a-z]+)-fill\)$/.exec(fill.trim()) : null;
  return (m && SEGMENT_BY_KIND[m[1]]) || 'a';
}

/**
 * 그라디언트 채움 + 글로우 — <defs><linearGradient>를 노드 옆에 인라인 주입(SVG 표준 준수).
 * id는 Provider defsPrefix + useId 이중 조합으로 Provider 간/인스턴스 간 모두 유일.
 * 주의: 노드 수만큼 defs가 생성된다 — 대규모(수백 노드) 다이어그램에선 비용(guidelines 참조).
 */
function NeonNode(props: NodeProps) {
  const prefix = useVizDefsPrefix();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const gid = `${prefix}-neongrad-${uid}`;
  const seg = segmentOf(props.fill);
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: `var(--bbangto-viz-ext-grad-${seg}-from)` }} />
          <stop offset="1" style={{ stopColor: `var(--bbangto-viz-ext-grad-${seg}-to)` }} />
        </linearGradient>
      </defs>
      <Node
        {...props}
        fill={`url(#${gid})`}
        strokeWidth={props.strokeWidth ?? HAIR}
        data-viz-neon-glow=""
      />
    </>
  );
}
NeonNode.displayName = 'NeonNode';

/** 외부 흰 라벨 + 리더 틱 — 그라디언트 면 위 텍스트 금지 규칙의 wrapper 구현. */
function NeonTag(props: TagProps) {
  return (
    <>
      <line
        x1={props.x}
        y1={props.y - 14}
        x2={props.x}
        y2={props.y - 6}
        style={{ stroke: vvar('ext', 'label'), strokeWidth: 1 }}
        data-viz-neon-leader=""
      />
      <Tag {...props} fill={vvar('ext', 'label')} fontSize={9} />
    </>
  );
}
NeonTag.displayName = 'NeonTag';

function NeonEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} fill={vvar('ext', 'label')} padding={4} />;
}
NeonEdgeLabel.displayName = 'NeonEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: NeonNode,
  Tag: NeonTag,
  EdgeLabel: NeonEdgeLabel,
};

const BaseShowcase = makeVizShowcase({ displayName: 'NeonGradientDarkShowcaseBase' });

/** 쇼케이스 — 모티프 CSS(다크 그라디언트 그라운드 + 글로우)를 주입한 뒤 공용 씬을 렌더. */
function NeonShowcase() {
  useVizMotifStyle(MOTIF_ID, MOTIF_CSS);
  return <BaseShowcase />;
}
NeonShowcase.displayName = 'NeonGradientDarkShowcase';

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary: '다크 그라디언트 그라운드 + 흰 헤어라인 1px 엣지 + 광택 멀티휴 그라디언트 채움. 글로우는 절제(blur 6px).',
    dos: ['도형 윤곽은 흰 헤어라인 고정', '글로우는 drop-shadow 1겹만', '그리드/다이아 패턴은 저대비 오버레이로'],
    donts: ['글로우 중첩·고강도 블러 금지', '라이트 그라운드 전환 금지(이 가이드는 다크 전용)'],
  },
  color: {
    summary: '시안→퍼플→핑크→오렌지 니어네온 램프에서 kind별 세그먼트 할당. 그라디언트 stop은 ext 토큰으로만.',
    dos: ['kind→세그먼트 매핑 유지(person/database=a, container/decision=b, queue=c, external/process=d)', 'colorway 전환은 ext-grad 토큰 교체로'],
    donts: ['세그먼트 외 임의 그라디언트 금지', '램프 중간에 무채색 stop 삽입 금지'],
  },
  typography: {
    summary: '라벨은 순백 고정 — 다크 그라운드 대비 16.5:1. 수치는 mono.',
    dos: ['라벨·캡션은 순백', '강조는 크기·굵기로'],
    donts: ['라벤더/그라디언트 색 텍스트 금지(대비 불안정)'],
  },
  accessibility: {
    summary: '그라디언트 도형 위 텍스트 금지 — 라벨은 외부 배치 + 리더 틱. tagColor는 부득이한 경우의 안전색(대표 hex 대비 4.5:1 실측).',
    dos: ['라벨은 도형 밖 + 리더선', '값 인코딩은 텍스트 병기', '노드 수백 개 규모에선 그라디언트 defs가 노드 수만큼 늘어남을 고려'],
    donts: ['그라디언트 면 위 직접 텍스트 금지(경사면 대비 미보장)', '핑크(#E0389E) 면 위 흰 텍스트 금지(4.02 실측 미달)'],
  },
};

export const neonGradientDark01VizStyleGuide: VisualizationStyleGuide = {
  name: 'neon-gradient-dark-01',
  description:
    'Dark neon-gradient paint — deep purple ground, glossy multi-hue gradient fills via wrapper-injected SVG defs, white hairline edges, restrained glow.',
  foundations,
  extendedFoundations: DEFAULT_EXT,
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { NeonGradientDarkShowcase: NeonShowcase as React.FC },
  guidelines,
  visualMotif: {
    summary:
      '네온 그라디언트 모티프 — kind별 램프 세그먼트 그라디언트 채움, 흰 헤어라인, 절제된 글로우, 외부 라벨 + 리더 틱.',
    components: {
      Node: {
        description: '도형은 <defs> 그라디언트(url 참조)로 채워지고 글로우를 두른다 — stop-color가 CSS var라 colorway 전환에 반응한다.',
        specs: ['fill = url(#<prefix>-neongrad-<uid>)', 'stop: ext-grad-<seg>-{from,to}', 'glow drop-shadow 6px'],
      },
      Tag: {
        description: '타입 태그는 도형 밖 순백 라벨 + 수직 리더 틱 — 그라디언트 면 위 텍스트 금지 규칙의 구현.',
        specs: ['외부 배치 + 리더 틱 8px', '9px 순백', 'ext-label 상속'],
      },
      EdgeLabel: {
        description: '흐름선 라벨은 다크 캔버스 칩 + 순백 텍스트로 그라디언트와 분리.',
        specs: ['bg = canvas.bg', '패딩 4px', '순백'],
      },
    },
    example: NeonShowcase as React.FC,
  },
};
