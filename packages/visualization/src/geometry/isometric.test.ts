import { describe, it, expect } from 'vitest';
import {
  projectIso,
  isoPrismFaces,
  isoDepthKey,
  depthSortBoxes,
  isoConnectorPath,
  floorShadowPolygon,
  isoFloorGrid,
  fitIsoProjection,
  type Box3,
  type IsoProjection,
} from './isometric';

const COS30 = Math.sqrt(3) / 2; // ≈ 0.8660254
const SIN30 = 0.5;
const UNIT: IsoProjection = { origin: { x: 0, y: 0 }, scale: 1, angleDeg: 30 };

function shoelace(pts: { x: number; y: number }[]): number {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % pts.length];
    a += p.x * q.y - q.x * p.y;
  }
  return a / 2;
}

function centroid(pts: { x: number; y: number }[]) {
  return {
    x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
    y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
  };
}

describe('projectIso', () => {
  it('projects the three world axes to unit-length screen vectors (α=30°)', () => {
    expect(projectIso({ x: 1, y: 0, z: 0 }, UNIT)).toEqual({
      x: expect.closeTo(COS30, 6),
      y: expect.closeTo(SIN30, 6),
    });
    expect(projectIso({ x: 0, y: 1, z: 0 }, UNIT)).toEqual({
      x: expect.closeTo(-COS30, 6),
      y: expect.closeTo(SIN30, 6),
    });
    // +z moves the point UP on screen (negative screenY).
    expect(projectIso({ x: 0, y: 0, z: 1 }, UNIT)).toEqual({
      x: expect.closeTo(0, 6),
      y: expect.closeTo(-1, 6),
    });
  });

  it('each screen axis vector has length == scale for arbitrary α', () => {
    const proj: IsoProjection = { origin: { x: 0, y: 0 }, scale: 3, angleDeg: 42 };
    const o = projectIso({ x: 0, y: 0, z: 0 }, proj);
    for (const axis of [
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 1 },
    ]) {
      const p = projectIso(axis, proj);
      const len = Math.hypot(p.x - o.x, p.y - o.y);
      expect(len).toBeCloseTo(3, 6);
    }
  });

  it('is affine in origin and scale', () => {
    const p1 = projectIso({ x: 2, y: 1, z: 1 }, { origin: { x: 0, y: 0 }, scale: 1, angleDeg: 30 });
    const p2 = projectIso({ x: 2, y: 1, z: 1 }, { origin: { x: 10, y: 20 }, scale: 2, angleDeg: 30 });
    expect(p2.x).toBeCloseTo(10 + p1.x * 2, 6);
    expect(p2.y).toBeCloseTo(20 + p1.y * 2, 6);
  });

  it('ground axes are 120° apart at α=30° (dot == -0.5·scale²)', () => {
    const x = projectIso({ x: 1, y: 0, z: 0 }, UNIT);
    const y = projectIso({ x: 0, y: 1, z: 0 }, UNIT);
    expect(x.x * y.x + x.y * y.y).toBeCloseTo(-0.5, 6);
  });

  it('returns finite values at degenerate angles (0°, 90°)', () => {
    for (const angleDeg of [0, 90]) {
      const p = projectIso({ x: 1, y: 2, z: 3 }, { origin: { x: 0, y: 0 }, scale: 1, angleDeg });
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.y)).toBe(true);
    }
  });
});

describe('isoPrismFaces', () => {
  const box: Box3 = { x: 0, y: 0, z: 0, w: 1, d: 1, h: 1 };

  it('returns the exact projected vertices of the top face (guards against flipped faces)', () => {
    const { top } = isoPrismFaces(box, UNIT);
    expect(top).toHaveLength(4);
    // (0,0,1),(1,0,1),(1,1,1),(0,1,1)
    const expected = [
      { x: 0, y: -1 },
      { x: COS30, y: -0.5 },
      { x: 0, y: 0 },
      { x: -COS30, y: -0.5 },
    ];
    top.forEach((p, i) => {
      expect(p.x).toBeCloseTo(expected[i].x, 6);
      expect(p.y).toBeCloseTo(expected[i].y, 6);
    });
  });

  it('top sits above both side faces; left is left of right', () => {
    const { top, left, right } = isoPrismFaces(box, UNIT);
    expect(left).toHaveLength(4);
    expect(right).toHaveLength(4);
    const ct = centroid(top);
    const cl = centroid(left);
    const cr = centroid(right);
    expect(ct.y).toBeLessThan(cl.y);
    expect(ct.y).toBeLessThan(cr.y);
    expect(cl.x).toBeLessThan(cr.x);
  });

  it('each face has non-zero area with consistent winding sign', () => {
    const { top, left, right } = isoPrismFaces(box, UNIT);
    const areas = [shoelace(top), shoelace(left), shoelace(right)];
    for (const a of areas) expect(Math.abs(a)).toBeGreaterThan(0);
    expect(Math.sign(areas[0])).toBe(Math.sign(areas[1]));
    expect(Math.sign(areas[1])).toBe(Math.sign(areas[2]));
  });

  it('degenerate box (h=0) → 4 points per face, no NaN', () => {
    const flat: Box3 = { x: 0, y: 0, z: 0, w: 1, d: 1, h: 0 };
    const { top, left, right } = isoPrismFaces(flat, UNIT);
    for (const face of [top, left, right]) {
      expect(face).toHaveLength(4);
      for (const p of face) {
        expect(Number.isFinite(p.x)).toBe(true);
        expect(Number.isFinite(p.y)).toBe(true);
      }
    }
  });
});

describe('isoDepthKey / depthSortBoxes', () => {
  const mk = (id: string, x: number, y: number, z = 0): { id: string; box: Box3 } => ({
    id,
    box: { x, y, z, w: 1, d: 1, h: 1 },
  });

  it('orders a ground tiling by i+j (far → near), stable on ties', () => {
    const items = [mk('c', 1, 1), mk('a', 0, 0), mk('b1', 1, 0), mk('b2', 0, 1)];
    const sorted = depthSortBoxes(items).map((i) => i.id);
    expect(sorted[0]).toBe('a'); // key 0
    expect(sorted[3]).toBe('c'); // key 2
    // b1,b2 tie at key 1 → original relative order preserved (stable)
    expect(sorted.slice(1, 3)).toEqual(['b1', 'b2']);
  });

  it('a stacked box (higher z0) draws after its base', () => {
    const base = mk('base', 0, 0, 0);
    const onTop = mk('top', 0, 0, 1);
    expect(isoDepthKey(onTop.box)).toBeGreaterThan(isoDepthKey(base.box));
    const sorted = depthSortBoxes([onTop, base]).map((i) => i.id);
    expect(sorted).toEqual(['base', 'top']);
  });

  it('respects a custom compare override', () => {
    const items = [mk('a', 0, 0), mk('c', 1, 1)];
    const sorted = depthSortBoxes(items, {
      compare: (p, q) => isoDepthKey(q) - isoDepthKey(p), // descending
    }).map((i) => i.id);
    expect(sorted).toEqual(['c', 'a']);
  });

  it('empty input → empty output', () => {
    expect(depthSortBoxes([])).toEqual([]);
  });
});

describe('isoConnectorPath', () => {
  it("order 'xy' routes along x first (waypoint at to.x, from.y)", () => {
    const r = isoConnectorPath({ x: 0, y: 0, z: 0 }, { x: 2, y: 2, z: 0 }, UNIT, { order: 'xy' });
    expect(r.points).toHaveLength(3);
    expect(r.points[1]).toEqual({
      x: expect.closeTo(projectIso({ x: 2, y: 0, z: 0 }, UNIT).x, 6),
      y: expect.closeTo(projectIso({ x: 2, y: 0, z: 0 }, UNIT).y, 6),
    });
    expect(r.d.startsWith('M ')).toBe(true);
    expect(r.d).toContain('L');
  });

  it("order 'yx' routes along y first (waypoint at from.x, to.y)", () => {
    const r = isoConnectorPath({ x: 0, y: 0, z: 0 }, { x: 2, y: 2, z: 0 }, UNIT, { order: 'yx' });
    const wp = projectIso({ x: 0, y: 2, z: 0 }, UNIT);
    expect(r.points[1].x).toBeCloseTo(wp.x, 6);
    expect(r.points[1].y).toBeCloseTo(wp.y, 6);
  });

  it('collinear (single-axis) input dedupes the degenerate waypoint → 2 points', () => {
    const r = isoConnectorPath({ x: 0, y: 0, z: 0 }, { x: 2, y: 0, z: 0 }, UNIT, { order: 'xy' });
    expect(r.points).toHaveLength(2);
  });

  it('projects all three points at a common z (no stray diagonal when from.z ≠ to.z)', () => {
    const r = isoConnectorPath({ x: 0, y: 0, z: 0 }, { x: 2, y: 2, z: 5 }, UNIT, { order: 'xy' });
    // endpoint routed at floor z=0, not z=5
    const grounded = projectIso({ x: 2, y: 2, z: 0 }, UNIT);
    expect(r.points[r.points.length - 1].x).toBeCloseTo(grounded.x, 6);
    expect(r.points[r.points.length - 1].y).toBeCloseTo(grounded.y, 6);
  });
});

describe('floorShadowPolygon', () => {
  const box: Box3 = { x: 0, y: 0, z: 2, w: 1, d: 1, h: 1 };

  it('projects the base rectangle at floorZ=0 by default → 4 points', () => {
    const poly = floorShadowPolygon(box, UNIT);
    expect(poly).toHaveLength(4);
    // ground plane corner (0,0,0)
    const c0 = projectIso({ x: 0, y: 0, z: 0 }, UNIT);
    expect(poly[0].x).toBeCloseTo(c0.x, 6);
    expect(poly[0].y).toBeCloseTo(c0.y, 6);
  });

  it('world XY offset shifts all corners by the same screen vector', () => {
    const base = floorShadowPolygon(box, UNIT);
    const shifted = floorShadowPolygon(box, UNIT, { offset: { dx: 1, dy: 1 } });
    const dx = shifted[0].x - base[0].x;
    const dy = shifted[0].y - base[0].y;
    shifted.forEach((p, i) => {
      expect(p.x - base[i].x).toBeCloseTo(dx, 6);
      expect(p.y - base[i].y).toBeCloseTo(dy, 6);
    });
  });
});

describe('isoFloorGrid', () => {
  it('emits one line per gridline in each direction (extent-based)', () => {
    const lines = isoFloorGrid({ minX: 0, maxX: 2, minY: 0, maxY: 2 }, 1, UNIT);
    // 3 y-gridlines (x-direction lines) + 3 x-gridlines (y-direction lines) = 6
    expect(lines).toHaveLength(6);
    for (const l of lines) {
      expect(Number.isFinite(l.a.x)).toBe(true);
      expect(Number.isFinite(l.b.y)).toBe(true);
    }
  });

  it('aligns to a non-zero / negative origin extent', () => {
    const lines = isoFloorGrid({ minX: -1, maxX: 1, minY: -1, maxY: 1 }, 1, UNIT);
    expect(lines).toHaveLength(6);
  });

  it('step ≤ 0 → empty', () => {
    expect(isoFloorGrid({ minX: 0, maxX: 2, minY: 0, maxY: 2 }, 0, UNIT)).toEqual([]);
  });
});

describe('fitIsoProjection', () => {
  const viewBox: [number, number, number, number] = [0, 0, 400, 300];

  it('empty boxes → centered default projection, no NaN', () => {
    const proj = fitIsoProjection([], viewBox);
    expect(Number.isFinite(proj.scale)).toBe(true);
    expect(Number.isFinite(proj.origin.x)).toBe(true);
    expect(Number.isFinite(proj.origin.y)).toBe(true);
  });

  it('fits all box corners inside the padded viewBox', () => {
    const boxes: Box3[] = [
      { x: 0, y: 0, z: 0, w: 2, d: 2, h: 2 },
      { x: 3, y: 1, z: 0, w: 1, d: 1, h: 3 },
    ];
    const pad = 12;
    const proj = fitIsoProjection(boxes, viewBox, { pad });
    for (const b of boxes) {
      const corners: Array<[number, number, number]> = [
        [b.x, b.y, b.z],
        [b.x + b.w, b.y, b.z],
        [b.x, b.y + b.d, b.z],
        [b.x + b.w, b.y + b.d, b.z],
        [b.x, b.y, b.z + b.h],
        [b.x + b.w, b.y, b.z + b.h],
        [b.x, b.y + b.d, b.z + b.h],
        [b.x + b.w, b.y + b.d, b.z + b.h],
      ];
      for (const [x, y, z] of corners) {
        const p = projectIso({ x, y, z }, proj);
        expect(p.x).toBeGreaterThanOrEqual(viewBox[0] + pad - 1e-6);
        expect(p.x).toBeLessThanOrEqual(viewBox[0] + viewBox[2] - pad + 1e-6);
        expect(p.y).toBeGreaterThanOrEqual(viewBox[1] + pad - 1e-6);
        expect(p.y).toBeLessThanOrEqual(viewBox[1] + viewBox[3] - pad + 1e-6);
      }
    }
  });

  it('degenerate (zero-span) box → finite projection, no divide-by-zero', () => {
    const proj = fitIsoProjection([{ x: 1, y: 1, z: 1, w: 0, d: 0, h: 0 }], viewBox);
    expect(Number.isFinite(proj.scale)).toBe(true);
    expect(proj.scale).toBeGreaterThan(0);
  });

  it('respects an explicit opts.scale (origin-only fit)', () => {
    const boxes: Box3[] = [{ x: 0, y: 0, z: 0, w: 1, d: 1, h: 1 }];
    const proj = fitIsoProjection(boxes, viewBox, { scale: 40 });
    expect(proj.scale).toBe(40);
  });
});
