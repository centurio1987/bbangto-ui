import { describe, it, expect } from 'vitest';
import { vennCircles } from './venn';

describe('vennCircles', () => {
  const box = { x: 0, y: 0, width: 400, height: 300 };

  it('returns 2 circles for two sets', () => {
    const circles = vennCircles([{ id: 'a', size: 10 }, { id: 'b', size: 10 }], box);
    expect(circles.length).toBe(2);
  });

  it('returns 3 circles for three sets', () => {
    const circles = vennCircles(
      [{ id: 'a', size: 10 }, { id: 'b', size: 10 }, { id: 'c', size: 10 }],
      box,
    );
    expect(circles.length).toBe(3);
  });

  it('two equal circles overlap (distance < r1 + r2)', () => {
    const [a, b] = vennCircles([{ id: 'a', size: 10 }, { id: 'b', size: 10 }], box);
    const dist = Math.hypot(a.cx - b.cx, a.cy - b.cy);
    expect(dist).toBeLessThan(a.r + b.r);
    // 최소 overlap 제약: 완전 포함이 아니어야(중심 거리 > |r1-r2|)
    expect(dist).toBeGreaterThan(Math.abs(a.r - b.r));
  });

  it('circles stay within the bounding box', () => {
    const circles = vennCircles([{ id: 'a', size: 8 }, { id: 'b', size: 5 }], box);
    for (const c of circles) {
      expect(c.cx - c.r).toBeGreaterThanOrEqual(box.x - 1e-6);
      expect(c.cx + c.r).toBeLessThanOrEqual(box.x + box.width + 1e-6);
      expect(c.cy - c.r).toBeGreaterThanOrEqual(box.y - 1e-6);
      expect(c.cy + c.r).toBeLessThanOrEqual(box.y + box.height + 1e-6);
    }
  });

  it('larger set gets larger radius', () => {
    const [a, b] = vennCircles([{ id: 'a', size: 20 }, { id: 'b', size: 5 }], box);
    expect(a.r).toBeGreaterThan(b.r);
  });
});
