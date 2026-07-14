import { describe, it, expect } from 'vitest';
import { histogramBins } from './histogram';

describe('histogramBins', () => {
  it('produces equal-width bins covering [min,max]', () => {
    const bins = histogramBins([0, 1, 2, 3, 4], { bins: 2 });
    expect(bins.length).toBe(2);
    expect(bins[0].x0).toBeCloseTo(0, 9);
    expect(bins[1].x1).toBeCloseTo(4, 9);
  });

  it('last bin is closed [x0,x1]; others are half-open [x0,x1)', () => {
    // values exactly on boundary 2 fall into first bin (not last), max into last
    const bins = histogramBins([0, 2, 4], { bins: 2 });
    // bin0 [0,2): contains 0; bin1 [2,4]: contains 2 and 4
    expect(bins[0].count).toBe(1);
    expect(bins[1].count).toBe(2);
  });

  it('thresholds take priority over bins', () => {
    const bins = histogramBins([1, 5, 9], { bins: 10, thresholds: [0, 6, 10] });
    expect(bins.length).toBe(2);
    expect(bins[0]).toMatchObject({ x0: 0, x1: 6 });
    expect(bins[0].count).toBe(2); // 1,5
    expect(bins[1].count).toBe(1); // 9
  });

  it('single unique value → single bin holding all', () => {
    const bins = histogramBins([7, 7, 7], { bins: 4 });
    expect(bins.length).toBe(1);
    expect(bins[0].count).toBe(3);
  });

  it('empty values → empty array', () => {
    expect(histogramBins([], { bins: 5 })).toEqual([]);
  });
});
