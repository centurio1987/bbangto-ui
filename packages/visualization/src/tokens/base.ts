import type { VisualizationFoundation, NodeSemanticStyle } from './types';

const baseNode = (): NodeSemanticStyle => ({
  fill: '#FFFFFF',
  keyline: '#333333',
  keylineWidth: 1.5,
});

/**
 * 무채색 base foundation — Provider 밖(useVizFoundation 폴백)이나
 * 스타일 가이드 미지정 시의 중립 기본값. 특정 시각 언어(Blueprint 등)를 담지 않는다.
 */
export const baseVisualizationFoundation: VisualizationFoundation = {
  name: 'base',

  canvas: {
    bg: '#FFFFFF',
    grid: '#EEEEEE',
    gridUnit: 8,
  },

  shape: {
    fill: '#FFFFFF',
    stroke: '#333333',
    strokeWidth: 1.5,
  },

  palette: {
    p1: '#DDDDDD',
    p2: '#CCCCCC',
    p3: '#BBBBBB',
    p4: '#AAAAAA',
    p5: '#999999',
    p6: '#888888',
    p7: '#777777',
    p8: '#666666',
  },

  node: {
    person: baseNode(),
    external: baseNode(),
    container: baseNode(),
    database: baseNode(),
    queue: baseNode(),
    decision: baseNode(),
    process: baseNode(),
  },

  edge: {
    stroke: '#333333',
    width: 1.5,
    dashPattern: '',
    cornerRadius: 4,
    marker: {
      size: 8,
      arrow: '#333333',
      diamond: '#333333',
      circle: '#333333',
      cross: '#333333',
    },
  },

  c4: {
    l1: { borderWidth: 3, bgTint: 'rgba(0,0,0,0.04)' },
    l2: { borderWidth: 2, bgTint: 'rgba(0,0,0,0.02)' },
    l3: { borderWidth: 1.4, bgTint: 'transparent' },
  },

  boundary: {
    stroke: '#333333',
    width: 1.5,
    dashPattern: '8 6',
    radius: 8,
    labelColor: '#555555',
  },

  typography: {
    titleFont: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
  },
};
