import type {
  VisualizationFoundation,
  VizFoundationPreset,
} from '@centurio1987/bbangto-ui-tokens';
import type { VisualizationStyleGuide } from '@centurio1987/bbangto-ui-visualization';

/**
 * Blueprint_Technical_01 — 기존 diagram 패키지의 blueprintTheme 시각 언어를
 * visualization 스타일 가이드로 승격한 preset. foundations 값은 blueprintTheme verbatim.
 */

const KEYLINE = '#111111';
const KEYLINE_WIDTH = 2.5;

const foundations: VisualizationFoundation = {
  name: 'blueprint-technical-01',

  canvas: {
    bg: '#F9F8F6',
    grid: '#E5E2DC',
    gridUnit: 8,
  },

  palette: {
    p1: '#EE7B4D',
    p2: '#C5B6EE',
    p3: '#F0C5DA',
    p4: '#E7E058',
    p5: '#A6C6E2',
    p6: '#87B79A',
    p7: '#A98C7E',
    p8: '#9CAFE7',
  },

  node: {
    person: { fill: '#C5B6EE', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'user' },
    external: { fill: '#EE7B4D', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, dashed: true, glyph: 'arrowOut' },
    container: { fill: '#87B79A', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'stackedRect' },
    database: { fill: '#A6C6E2', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'cylinder' },
    queue: { fill: '#E7E058', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'bars' },
    decision: { fill: '#F0C5DA', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'diamond' },
    process: { fill: '#9CAFE7', keyline: KEYLINE, keylineWidth: KEYLINE_WIDTH, tagColor: KEYLINE, glyph: 'process' },
  },

  edge: {
    stroke: KEYLINE,
    width: 2.5,
    dashPattern: '',
    cornerRadius: 4,
    marker: {
      size: 8,
      arrow: KEYLINE,
      diamond: KEYLINE,
      circle: KEYLINE,
      cross: KEYLINE,
    },
  },

  c4: {
    l1: { borderWidth: 3, bgTint: 'rgba(0,0,0,0.04)', labelColor: KEYLINE },
    l2: { borderWidth: 2, bgTint: 'rgba(0,0,0,0.02)', labelColor: KEYLINE },
    l3: { borderWidth: 1.4, bgTint: 'transparent', labelColor: KEYLINE },
  },

  boundary: {
    stroke: KEYLINE,
    width: 1.5,
    dashPattern: '8 6',
    radius: 8,
    labelColor: '#555555',
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

/** whiteprint — 잉크/종이를 반전한 딥 네이비 색 스킴(색 외 토큰은 base와 동일). */
const WHITE_INK = '#EAF1FF';

const whiteprintFoundations: VisualizationFoundation = {
  ...foundations,
  name: 'blueprint-technical-01-whiteprint',
  canvas: { ...foundations.canvas, bg: '#152238', grid: '#243550' },
  node: Object.fromEntries(
    Object.entries(foundations.node).map(([kind, style]) => [
      kind,
      { ...style, keyline: WHITE_INK, tagColor: KEYLINE },
    ]),
  ) as VisualizationFoundation['node'],
  edge: {
    ...foundations.edge,
    stroke: WHITE_INK,
    marker: { ...foundations.edge.marker, arrow: WHITE_INK, diamond: WHITE_INK, circle: WHITE_INK, cross: WHITE_INK },
  },
  c4: {
    l1: { ...foundations.c4.l1, bgTint: 'rgba(255,255,255,0.06)', labelColor: WHITE_INK },
    l2: { ...foundations.c4.l2, bgTint: 'rgba(255,255,255,0.03)', labelColor: WHITE_INK },
    l3: { ...foundations.c4.l3, labelColor: WHITE_INK },
  },
  boundary: { ...foundations.boundary, stroke: WHITE_INK, labelColor: '#B9C6DE' },
};

const foundationPresets: readonly VizFoundationPreset[] = [
  // 카탈로그 불변식: 첫 preset의 foundations는 base foundations와 동일 객체 참조.
  { key: 'default', label: 'Paper', foundations },
  { key: 'whiteprint', label: 'Whiteprint (Inverted Navy)', foundations: whiteprintFoundations },
];

export const blueprintTechnical01VizStyleGuide: VisualizationStyleGuide = {
  name: 'blueprint-technical-01',
  description:
    'Precision drafting look — warm paper canvas, bold 2.5px keylines, pastel semantic fills, mono tags. Promoted from the original blueprint theme.',
  foundations,
  foundationPresets,
  defaultFoundationKey: 'default',
};
