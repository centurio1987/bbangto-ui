import type { DiagramTheme } from './types';

export const blueprintTheme: DiagramTheme = {
  name: 'blueprint',

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
    person: {
      fill: '#C5B6EE',
      keyline: '#111111',
      keylineWidth: 2.5,
      tagColor: '#111111',
      glyph: 'user',
    },
    external: {
      fill: '#EE7B4D',
      keyline: '#111111',
      keylineWidth: 2.5,
      tagColor: '#111111',
      dashed: true,
      glyph: 'arrowOut',
    },
    container: {
      fill: '#87B79A',
      keyline: '#111111',
      keylineWidth: 2.5,
      tagColor: '#111111',
      glyph: 'stackedRect',
    },
    database: {
      fill: '#A6C6E2',
      keyline: '#111111',
      keylineWidth: 2.5,
      tagColor: '#111111',
      glyph: 'cylinder',
    },
    queue: {
      fill: '#E7E058',
      keyline: '#111111',
      keylineWidth: 2.5,
      tagColor: '#111111',
      glyph: 'bars',
    },
    decision: {
      fill: '#F0C5DA',
      keyline: '#111111',
      keylineWidth: 2.5,
      tagColor: '#111111',
      glyph: 'diamond',
    },
    process: {
      fill: '#9CAFE7',
      keyline: '#111111',
      keylineWidth: 2.5,
      tagColor: '#111111',
      glyph: 'process',
    },
  },

  edge: {
    stroke: '#111111',
    width: 2.5,
    dashPattern: '',
    cornerRadius: 4,
    marker: {
      size: 8,
      arrow: '#111111',
      diamond: '#111111',
      circle: '#111111',
      cross: '#111111',
    },
  },

  c4: {
    l1: { borderWidth: 3, bgTint: 'rgba(0,0,0,0.04)', labelColor: '#111111' },
    l2: { borderWidth: 2, bgTint: 'rgba(0,0,0,0.02)', labelColor: '#111111' },
    l3: { borderWidth: 1.4, bgTint: 'transparent', labelColor: '#111111' },
  },

  boundary: {
    stroke: '#111111',
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
