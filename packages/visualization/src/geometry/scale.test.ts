import { describe, it, expect } from 'vitest';
import { linearScale, bandScale, niceTicks } from './scale';

describe('linearScale', () => {
  it('maps domain endpoints to range endpoints', () => {
    const s = linearScale([0, 100], [0, 200]);
    expect(s(0)).toBe(0);
    expect(s(100)).toBe(200);
    expect(s(50)).toBe(100);
  });

  it('supports inverted range (SVG y-down)', () => {
    const s = linearScale([0, 10], [300, 0]);
    expect(s(0)).toBe(300);
    expect(s(10)).toBe(0);
    expect(s(5)).toBe(150);
  });

  it('handles negative domain values around zero baseline', () => {
    const s = linearScale([-10, 10], [0, 200]);
    expect(s(0)).toBe(100);
    expect(s(-10)).toBe(0);
  });

  it('degenerate domain collapses to range start (no NaN)', () => {
    const s = linearScale([5, 5], [0, 100]);
    expect(Number.isNaN(s(5))).toBe(false);
    expect(s(5)).toBe(0);
  });
});

describe('bandScale', () => {
  it('produces count bands within range', () => {
    const b = bandScale(4, [0, 400]);
    expect(b.position(0)).toBeGreaterThanOrEqual(0);
    expect(b.position(3) + b.bandwidth).toBeLessThanOrEqual(400 + 1e-9);
    expect(b.bandwidth).toBeGreaterThan(0);
  });

  it('center is bandwidth/2 past position', () => {
    const b = bandScale(3, [0, 300]);
    expect(b.center(1)).toBeCloseTo(b.position(1) + b.bandwidth / 2, 6);
  });

  it('step increases by count monotonically in position', () => {
    const b = bandScale(5, [0, 500]);
    for (let i = 1; i < 5; i++) {
      expect(b.position(i)).toBeGreaterThan(b.position(i - 1));
    }
  });

  it('empty count is safe', () => {
    const b = bandScale(0, [0, 100]);
    expect(b.bandwidth).toBe(0);
  });
});

describe('niceTicks', () => {
  it('returns rounded ticks within [min,max]', () => {
    const t = niceTicks(0, 100, 5);
    expect(t[0]).toBeGreaterThanOrEqual(0);
    expect(t[t.length - 1]).toBeLessThanOrEqual(100);
    expect(t.length).toBeGreaterThan(1);
  });

  it('degenerate range returns single tick', () => {
    expect(niceTicks(5, 5)).toEqual([5]);
  });

  it('ticks are strictly increasing', () => {
    const t = niceTicks(-3, 47, 6);
    for (let i = 1; i < t.length; i++) expect(t[i]).toBeGreaterThan(t[i - 1]);
  });
});
