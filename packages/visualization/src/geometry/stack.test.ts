import { describe, it, expect } from 'vitest';
import { stack } from './stack';

describe('stack', () => {
  it('accumulates series into y0/y1 spans per category', () => {
    // series[0]=[10,20], series[1]=[5,5]
    const r = stack([
      [10, 20],
      [5, 5],
    ]);
    expect(r[0][0]).toEqual({ y0: 0, y1: 10 });
    expect(r[1][0]).toEqual({ y0: 10, y1: 15 });
    expect(r[0][1]).toEqual({ y0: 0, y1: 20 });
    expect(r[1][1]).toEqual({ y0: 20, y1: 25 });
  });

  it('top of last series equals category total', () => {
    const r = stack([
      [3, 1],
      [4, 9],
      [2, 0],
    ]);
    expect(r[2][0].y1).toBeCloseTo(9, 9);
    expect(r[2][1].y1).toBeCloseTo(10, 9);
  });

  it('clamps negative and NaN to zero', () => {
    const r = stack([
      [-5, Number.NaN],
      [10, 10],
    ]);
    expect(r[0][0]).toEqual({ y0: 0, y1: 0 });
    expect(r[0][1]).toEqual({ y0: 0, y1: 0 });
    expect(r[1][0]).toEqual({ y0: 0, y1: 10 });
  });

  it('handles ragged series (missing index → 0)', () => {
    const r = stack([[10], [5, 7]]);
    // category count = 2 (max length)
    expect(r[0].length).toBe(2);
    expect(r[0][1]).toEqual({ y0: 0, y1: 0 });
    expect(r[1][1]).toEqual({ y0: 0, y1: 7 });
  });

  it('empty input → empty output', () => {
    expect(stack([])).toEqual([]);
  });
});
