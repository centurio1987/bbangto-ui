import { describe, it, expect } from 'vitest';
import { boxplotSummary } from './boxplot';

describe('boxplotSummary', () => {
  it('empty array → undefined', () => {
    expect(boxplotSummary([])).toBeUndefined();
  });

  it('single value → all quartiles equal, iqr 0, no outliers', () => {
    const s = boxplotSummary([5])!;
    expect(s).toMatchObject({ min: 5, q1: 5, median: 5, q3: 5, max: 5, iqr: 0 });
    expect(s.outliers).toEqual([]);
    expect(s.whiskerLow).toBe(5);
    expect(s.whiskerHigh).toBe(5);
  });

  it('odd length linear-interpolation quartiles', () => {
    const s = boxplotSummary([1, 2, 3, 4, 5])!;
    expect(s.median).toBe(3);
    expect(s.q1).toBe(2);
    expect(s.q3).toBe(4);
    expect(s.iqr).toBe(2);
    expect(s.min).toBe(1);
    expect(s.max).toBe(5);
    expect(s.outliers).toEqual([]);
  });

  it('even length interpolates between neighbours', () => {
    const s = boxplotSummary([1, 2, 3, 4])!;
    expect(s.median).toBeCloseTo(2.5, 6);
    expect(s.q1).toBeCloseTo(1.75, 6);
    expect(s.q3).toBeCloseTo(3.25, 6);
  });

  it('handles negatives (order-independent input)', () => {
    const s = boxplotSummary([-1, -5, -3])!;
    expect(s.min).toBe(-5);
    expect(s.median).toBe(-3);
    expect(s.max).toBe(-1);
  });

  it('identical values → iqr 0, no outliers', () => {
    const s = boxplotSummary([4, 4, 4])!;
    expect(s.iqr).toBe(0);
    expect(s.outliers).toEqual([]);
  });

  it('flags Tukey outliers beyond 1.5×IQR fences and clamps whiskers', () => {
    const s = boxplotSummary([1, 2, 3, 4, 5, 100])!;
    expect(s.outliers).toContain(100);
    expect(s.whiskerHigh).toBe(5);
    expect(s.max).toBe(100);
  });
});
