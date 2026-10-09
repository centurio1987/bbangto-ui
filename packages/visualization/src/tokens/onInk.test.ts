import { describe, it, expect } from 'vitest';
import { compositeOver, contrastRatio, parseColor } from '@centurio1987/bbangto-ui-tokens';
import type { RGBA } from '@centurio1987/bbangto-ui-tokens';
import type { VisualizationFoundation } from './types';
import { baseVisualizationFoundation } from './base';
import { visualizationFoundationToStyleObject, vvar } from './contract';
import { deriveOnInk, pickOnInk, surfaceOver, surfacesFor, ON_INK_MIN, ON_INK_SHADE } from './onInk';

// KAN-061 — 면 위 글자색. 면 토큰마다 「그 위에 쓸 글자색」 하나를 계산해 --bbangto-viz-on-* 로 낸다.
// 후보는 가이드 글자색 넷(edge.stroke → shape.stroke → boundary.labelColor → canvas.bg)이고,
// 처음으로 4.5:1 을 넘는 것을 쓴다. 넘는 것이 없으면 검정·흰색 중 대비가 큰 쪽이다.

const WHITE: RGBA = { r: 255, g: 255, b: 255, a: 1 };

function foundation(over: {
  canvasBg?: string;
  edgeStroke?: string;
  shapeStroke?: string;
  boundaryLabel?: string;
  p1?: string;
  on?: VisualizationFoundation['on'];
}): VisualizationFoundation {
  const b = baseVisualizationFoundation;
  return {
    ...b,
    canvas: { ...b.canvas, bg: over.canvasBg ?? b.canvas.bg },
    edge: { ...b.edge, stroke: over.edgeStroke ?? b.edge.stroke },
    shape: { ...b.shape, stroke: over.shapeStroke ?? b.shape.stroke },
    boundary: { ...b.boundary, labelColor: over.boundaryLabel ?? b.boundary.labelColor },
    palette: { ...b.palette, p1: over.p1 ?? b.palette.p1 },
    ...(over.on ? { on: over.on } : {}),
  };
}

const opaque = (c: string): RGBA => compositeOver(parseColor(c)!, WHITE);

describe('pickOnInk — 후보 순서', () => {
  it('edge.stroke 가 4.5:1 을 넘으면 그것을 쓴다', () => {
    const f = foundation({ edgeStroke: '#111111', shapeStroke: '#222222' });
    expect(pickOnInk(f, opaque('#EEEEEE'))).toBe('#111111');
  });

  it('edge.stroke 가 모자라면 shape.stroke 로 넘어간다', () => {
    const f = foundation({ edgeStroke: '#DDDDDD', shapeStroke: '#202020' });
    expect(pickOnInk(f, opaque('#EEEEEE'))).toBe('#202020');
  });

  it('어두운 면에서는 밝은 canvas.bg 까지 내려간다', () => {
    const f = foundation({
      canvasBg: '#FAFAFA',
      edgeStroke: '#333333',
      shapeStroke: '#444444',
      boundaryLabel: '#555555',
    });
    expect(pickOnInk(f, opaque('#1A1A2E'))).toBe('#FAFAFA');
  });

  it('반투명 후보는 건너뛴다', () => {
    const f = foundation({ edgeStroke: 'rgba(0, 0, 0, 0.5)', shapeStroke: '#101010' });
    expect(pickOnInk(f, opaque('#EEEEEE'))).toBe('#101010');
  });
});

describe('pickOnInk — 검정·흰색 대체', () => {
  // colorful-flat palette.p1 #E8443B: 흰색 3.95 · 가이드 남색 3.73 (2026-10-10 진단)
  const mid = foundation({
    canvasBg: '#FFFFFF',
    edgeStroke: '#1F2A44',
    shapeStroke: '#1F2A44',
    boundaryLabel: '#1F2A44',
  });

  it('후보 넷이 모두 모자라면 검정과 흰색 중 대비가 큰 쪽을 쓴다', () => {
    const ink = pickOnInk(mid, opaque('#E8443B'));
    expect(ink).toBe('#000000');
    expect(contrastRatio(ink, '#E8443B')!).toBeGreaterThanOrEqual(ON_INK_MIN);
  });

  it('어두운 중간색에서는 흰색이다', () => {
    const f = foundation({ canvasBg: '#000000', edgeStroke: '#7A7A7A', shapeStroke: '#7A7A7A', boundaryLabel: '#7A7A7A' });
    expect(pickOnInk(f, opaque('#3A3AB0'))).toBe('#FFFFFF');
  });
});

describe('surfaceOver — 면을 canvas 위에 합성한다', () => {
  it('반투명 면은 canvas.bg 위 합성색이다', () => {
    const f = foundation({ canvasBg: '#000000' });
    const s = surfaceOver(f, 'rgba(255, 255, 255, 0.5)');
    expect(Math.round(s.r)).toBe(128);
    expect(s.a).toBe(1);
  });

  it('opacity 인자를 면 알파에 곱한다', () => {
    const f = foundation({ canvasBg: '#FFFFFF' });
    const s = surfaceOver(f, '#000000', 0.25);
    expect(Math.round(s.r)).toBe(191);
  });

  it('transparent · none · 읽을 수 없는 값은 canvas.bg 다', () => {
    const f = foundation({ canvasBg: '#123456' });
    for (const v of ['transparent', 'none', 'var(--x)']) {
      expect(surfaceOver(f, v)).toEqual(opaque('#123456'));
    }
  });
});

describe('surfacesFor — 반투명 면은 밑에 무엇이 깔릴지 모른다', () => {
  it('불투명 면은 canvas 위 하나다', () => {
    const f = foundation({ canvasBg: '#FFFFFF' });
    expect(surfacesFor(f, '#3366CC')).toHaveLength(1);
  });

  it('반투명·none 면은 canvas 위와 검정 음영을 얹은 canvas 위 둘이다', () => {
    const f = foundation({ canvasBg: '#FFFFFF' });
    for (const v of ['rgba(255, 77, 109, 0.22)', 'none']) {
      const [plain, shaded] = surfacesFor(f, v);
      expect(shaded).toBeDefined();
      expect(shaded!.r).toBeLessThan(plain!.r);
    }
    // opacity 인자로 옅게 칠한 불투명 색도 반투명 면이다
    expect(surfacesFor(f, '#3366CC', 0.35)).toHaveLength(2);
  });

  it('음영 깊이는 ON_INK_SHADE 다', () => {
    const f = foundation({ canvasBg: '#FFFFFF' });
    const [, shaded] = surfacesFor(f, 'none');
    expect(Math.round(shaded!.r)).toBe(Math.round(255 * (1 - ON_INK_SHADE)));
  });
});

describe('pickOnInk — 면이 여럿이면 모두에서 4.5:1', () => {
  // riso-print: shape.fill 22% 분홍, 레인 띠 위에서 edge.stroke 가 4.4 로 떨어졌다(KAN-061 S3 실측)
  const riso = foundation({
    canvasBg: '#F4EFE0',
    edgeStroke: '#1E5AA8',
    shapeStroke: '#1E5AA8',
    boundaryLabel: '#182234',
  });

  it('음영을 얹은 면에서도 넘는 후보를 고른다', () => {
    const surfaces = surfacesFor(riso, 'rgba(255, 77, 109, 0.22)');
    const ink = pickOnInk(riso, surfaces);
    for (const s of surfaces) expect(contrastRatio(ink, s)!).toBeGreaterThanOrEqual(ON_INK_MIN);
    expect(ink).toBe('#182234');
  });
});

describe('pickOnInk — 음영까지 읽히는 색이 없을 때', () => {
  // marker-sketchnote heatmap: palette.p1 #2A2A28 57% 칸. 흰색은 canvas 위 3.81, 검정은 음영 위 3.1 이라
  // 두 면 모두에서 읽히는 색이 없다(KAN-061 S6 실측). 그때는 실제 바탕인 첫 면(canvas 위)에서 읽히는 쪽이다.
  const marker = foundation({
    canvasBg: '#FCFBF7',
    edgeStroke: '#2A2A28',
    shapeStroke: '#2A2A28',
    boundaryLabel: '#2A2A28',
  });

  it('첫 면에서 4.5:1 을 넘는 검정·흰색을 고른다', () => {
    const surfaces = surfacesFor(marker, '#2A2A28', 0.57);
    const ink = pickOnInk(marker, surfaces);
    expect(contrastRatio(ink, surfaces[0]!)!).toBeGreaterThanOrEqual(ON_INK_MIN);
  });
});

describe('deriveOnInk — 면 토큰 전부', () => {
  it('팔레트 8 · shape.fill · canvas.bg · c4 3 · node 7 을 모두 채운다', () => {
    const on = deriveOnInk(baseVisualizationFoundation);
    expect(Object.keys(on.palette).sort()).toEqual(['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8']);
    expect(typeof on.shape.fill).toBe('string');
    expect(typeof on.canvas.bg).toBe('string');
    expect(Object.keys(on.c4).sort()).toEqual(['l1', 'l2', 'l3']);
    expect(Object.keys(on.node).sort()).toEqual(Object.keys(baseVisualizationFoundation.node).sort());
  });

  it('가이드가 on 에 적은 값이 계산값을 이긴다', () => {
    const f = foundation({ p1: '#E8443B', on: { palette: { p1: '#FFFFFF' } } });
    const on = deriveOnInk(f);
    expect(on.palette.p1).toBe('#FFFFFF');
    // 적지 않은 자리는 계산값이다
    expect(on.palette.p2).toBe(pickOnInk(f, surfacesFor(f, f.palette.p2)));
  });
});

describe('visualizationFoundationToStyleObject — --bbangto-viz-on-*', () => {
  const vars = visualizationFoundationToStyleObject(baseVisualizationFoundation);
  const on = deriveOnInk(baseVisualizationFoundation);
  const name = (ref: string) => ref.slice('var('.length, -1);

  it.each([
    [vvar('on', 'palette', 'p1'), on.palette.p1],
    [vvar('on', 'shape', 'fill'), on.shape.fill],
    [vvar('on', 'canvas', 'bg'), on.canvas.bg],
    [vvar('on', 'c4', 'l2', 'bgTint'), on.c4.l2.bgTint],
    [vvar('on', 'node', 'person', 'fill'), on.node.person.fill],
  ])('%s', (ref, expected) => {
    expect(vars[name(ref)]).toBe(expected);
  });

  it('기존 변수는 그대로다', () => {
    expect(vars['--bbangto-viz-edge-stroke']).toBe(baseVisualizationFoundation.edge.stroke);
    expect(vars['--bbangto-viz-palette-p1']).toBe(baseVisualizationFoundation.palette.p1);
  });
});
