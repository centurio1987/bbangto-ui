import { describe, it, expect } from 'vitest';
import {
  contentBox,
  cylinderCapHeight,
  cylinderPaths,
  cubeDepth,
  diamondPath,
  folderPath,
  hexagonPath,
  parallelogramPath,
  trapezoidPath,
  type NodeShape,
} from './shapes';
import type { BBox } from '../types/data';

// 상류 이슈 P2(형태별 콘텐츠 박스 미노출)의 회귀 고정.
// 호출자가 내부 상수를 복제하지 않고도 "글자를 넣어도 되는 영역"을 받을 수 있어야 한다.

/** M/L만으로 이루어진 path에서 꼭짓점을 뽑는다(다각형 도형 전용). */
function polygonVertices(d: string): [number, number][] {
  const nums = (d.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
  const out: [number, number][] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) out.push([nums[i], nums[i + 1]]);
  return out;
}

function pointInPolygon([px, py]: [number, number], poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const hit = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}

/** 콘텐츠 박스를 살짝 안쪽으로 줄인 네 꼭짓점 — 경계 접점의 부동소수 흔들림을 피한다. */
function corners(b: BBox, inset = 0.01): [number, number][] {
  return [
    [b.x + inset, b.y + inset],
    [b.x + b.width - inset, b.y + inset],
    [b.x + b.width - inset, b.y + b.height - inset],
    [b.x + inset, b.y + b.height - inset],
  ];
}

const BB: BBox = { x: 10, y: 20, width: 200, height: 100 };

describe('contentBox · 도형별 콘텐츠 영역', () => {
  it('cylinder는 위 뚜껑의 아랫 호 아래부터다 (h=62 → 34.1)', () => {
    // 리포트는 대칭 뚜껑을 가정해 43.4를 계산했지만, cylinderPaths가 실제로 칠하는 영역은
    // 위로 2*cap, 아래로 cap 을 먹는다(브라우저 isPointInFill 실측 근거는 소스 주석 참고).
    const box = contentBox('cylinder', { x: 0, y: 0, width: 200, height: 62 });
    expect(box.y).toBeCloseTo(18.6, 6);
    expect(box.height).toBeCloseTo(34.1, 6);
    expect(box.x).toBe(0);
    expect(box.width).toBe(200);
  });

  it('cylinder 뚜껑 높이는 cylinderPaths와 같은 값을 쓴다', () => {
    for (const height of [20, 40, 62, 100, 200]) {
      const bbox = { x: 0, y: 0, width: 120, height };
      const cap = cylinderCapHeight(height);
      // 뚜껑 값이 갈리면 path의 곡선 반지름과 콘텐츠 박스가 어긋난다.
      expect(cylinderPaths(bbox).body).toContain(`a 60 ${cap} `);
      expect(contentBox('cylinder', bbox)).toEqual({
        x: 0,
        y: 2 * cap,
        width: 120,
        height: Math.max(0, height - 3 * cap),
      });
    }
  });

  it('diamond는 내접 사각형(가로세로 절반)이다', () => {
    expect(contentBox('diamond', BB)).toEqual({ x: 60, y: 45, width: 100, height: 50 });
  });

  it('hexagon은 좌우 꼭짓점을 뺀 가운데 절반 폭이다', () => {
    expect(contentBox('hexagon', BB)).toEqual({ x: 60, y: 20, width: 100, height: 100 });
  });

  it('trapezoid·parallelogram은 기운 변만큼 좌우를 줄인다', () => {
    expect(contentBox('trapezoid', BB)).toEqual({ x: 30, y: 20, width: 160, height: 100 });
    expect(contentBox('parallelogram', BB)).toEqual({ x: 30, y: 20, width: 160, height: 100 });
  });

  it('cube는 앞면이고 깊이는 Node가 그리는 값과 같다', () => {
    const bbox = { x: 0, y: 0, width: 100, height: 64 };
    const d = cubeDepth(bbox);
    expect(d).toBe(14);
    expect(contentBox('cube', bbox)).toEqual({ x: 0, y: d, width: 100 - d, height: 64 - d });
  });

  it('folder는 탭 아래 영역이다', () => {
    expect(contentBox('folder', BB)).toEqual({ x: 10, y: 34, width: 200, height: 86 });
  });

  it('subroutine은 양쪽 세로선 안쪽이다', () => {
    expect(contentBox('subroutine', { x: 0, y: 0, width: 120, height: 60 })).toEqual({
      x: 14,
      y: 0,
      width: 92,
      height: 60,
    });
  });

  it('circle·ellipse는 내접 사각형(반지름/√2)이다', () => {
    const circle = contentBox('circle', { x: 0, y: 0, width: 100, height: 64 });
    const half = 32 / Math.SQRT2;
    expect(circle.x).toBeCloseTo(50 - half, 6);
    expect(circle.width).toBeCloseTo(half * 2, 6);
    expect(circle.height).toBeCloseTo(half * 2, 6);

    const ellipse = contentBox('ellipse', { x: 0, y: 0, width: 200, height: 100 });
    expect(ellipse.width).toBeCloseTo((200 / Math.SQRT2), 6);
    expect(ellipse.height).toBeCloseTo((100 / Math.SQRT2), 6);
  });

  it('stadium은 양 끝 반원을 뺀 가운데 사각형이다', () => {
    expect(contentBox('stadium', { x: 0, y: 0, width: 200, height: 60 })).toEqual({
      x: 30,
      y: 0,
      width: 140,
      height: 60,
    });
  });

  it('doubleCircle은 안쪽 원의 내접 사각형이다', () => {
    const box = contentBox('doubleCircle', { x: 0, y: 0, width: 100, height: 64 });
    const half = (32 - 4) / Math.SQRT2;
    expect(box.width).toBeCloseTo(half * 2, 6);
  });

  it('rounded는 모서리 반경만큼 안쪽으로 들어간다', () => {
    const box = contentBox('rounded', { x: 0, y: 0, width: 200, height: 100 });
    const inset = 8 * (1 - 1 / Math.SQRT2);
    expect(box.x).toBeCloseTo(inset, 6);
    expect(box.width).toBeCloseTo(200 - 2 * inset, 6);
  });

  it('rect·component는 bbox 그대로다', () => {
    expect(contentBox('rect', BB)).toEqual(BB);
    // component의 톱니는 bbox 바깥(왼쪽)으로 튀어나오므로 안쪽 영역은 줄지 않는다.
    expect(contentBox('component', BB)).toEqual(BB);
  });
});

describe('contentBox · 불변식', () => {
  const ALL: NodeShape[] = [
    'rect', 'rounded', 'stadium', 'circle', 'ellipse',
    'diamond', 'cylinder', 'hexagon', 'parallelogram',
    'trapezoid', 'subroutine', 'doubleCircle', 'cube', 'component', 'folder',
  ];

  it.each(ALL)('%s — bbox 안에 들어가고 넓이가 음수가 아니다', (shape) => {
    for (const bbox of [BB, { x: 0, y: 0, width: 40, height: 24 }, { x: -30, y: -10, width: 300, height: 90 }]) {
      const box = contentBox(shape, bbox);
      expect(box.width).toBeGreaterThanOrEqual(0);
      expect(box.height).toBeGreaterThanOrEqual(0);
      expect(box.x).toBeGreaterThanOrEqual(bbox.x);
      expect(box.y).toBeGreaterThanOrEqual(bbox.y);
      expect(box.x + box.width).toBeLessThanOrEqual(bbox.x + bbox.width);
      expect(box.y + box.height).toBeLessThanOrEqual(bbox.y + bbox.height);
    }
  });
});

describe('contentBox · 다각형 도형 샘플 점 검사', () => {
  // 곡선 도형(cylinder/ellipse/stadium 등)은 브라우저 isPointInFill 로 검사한다
  // (apps/storybook Atoms.stories.tsx `NodeContentBox`). 여기서는 M/L 다각형만 본다.
  const POLY: [NodeShape, (b: BBox) => string][] = [
    ['diamond', diamondPath],
    ['hexagon', hexagonPath],
    ['parallelogram', (b) => parallelogramPath(b)],
    ['trapezoid', (b) => trapezoidPath(b)],
    ['folder', (b) => folderPath(b)],
  ];

  it.each(POLY)('%s — 콘텐츠 박스 네 꼭짓점이 도형 안에 있다', (shape, path) => {
    for (const bbox of [BB, { x: 0, y: 0, width: 90, height: 90 }, { x: 5, y: 5, width: 60, height: 120 }]) {
      const poly = polygonVertices(path(bbox));
      for (const pt of corners(contentBox(shape, bbox))) {
        expect({ shape, bbox, pt, inside: pointInPolygon(pt, poly) }).toEqual({
          shape,
          bbox,
          pt,
          inside: true,
        });
      }
    }
  });
});
