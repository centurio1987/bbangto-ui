import { describe, it, expect } from 'vitest';
import { waterfallSteps } from './waterfall';

describe('waterfallSteps', () => {
  it('accumulates running totals with start/end per delta', () => {
    const s = waterfallSteps([100, -30, 20]);
    expect(s[0]).toEqual({ start: 0, end: 100, delta: 100, isTotal: false });
    expect(s[1]).toEqual({ start: 100, end: 70, delta: -30, isTotal: false });
    expect(s[2]).toEqual({ start: 70, end: 90, delta: 20, isTotal: false });
  });

  it('supports negative deltas (decrease bars)', () => {
    const s = waterfallSteps([-40]);
    expect(s[0].end).toBe(-40);
    expect(s[0].delta).toBe(-40);
  });

  it('appends total bar when showTotal set', () => {
    const s = waterfallSteps([100, -30, 20], { showTotal: true });
    expect(s.length).toBe(4);
    const total = s[3];
    expect(total.isTotal).toBe(true);
    expect(total).toMatchObject({ start: 0, end: 90, delta: 90 });
  });

  it('empty values → empty array (no total)', () => {
    expect(waterfallSteps([], { showTotal: true })).toEqual([]);
  });
});
