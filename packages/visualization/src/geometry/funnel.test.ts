import { describe, it, expect } from 'vitest';
import { funnelTrapezoids } from './funnel';

describe('funnelTrapezoids', () => {
  it('top width proportional to value, centered horizontally', () => {
    const t = funnelTrapezoids([100, 50], { width: 200, height: 100 });
    expect(t.length).toBe(2);
    // widest stage spans full width, centered
    const w0 = t[0].topR - t[0].topL;
    expect(w0).toBeCloseTo(200, 6);
    const cx0 = (t[0].topL + t[0].topR) / 2;
    expect(cx0).toBeCloseTo(100, 6);
  });

  it('bottom of a stage matches top width of the next stage', () => {
    const t = funnelTrapezoids([100, 50], { width: 200, height: 100 });
    const bot0 = t[0].botR - t[0].botL;
    const top1 = t[1].topR - t[1].topL;
    expect(bot0).toBeCloseTo(top1, 6);
  });

  it('stacks stages vertically by equal band height', () => {
    const t = funnelTrapezoids([10, 8, 6], { width: 120, height: 90 });
    expect(t[0].top).toBeCloseTo(0, 6);
    expect(t[0].bottom).toBeCloseTo(30, 6);
    expect(t[2].bottom).toBeCloseTo(90, 6);
  });

  it('clamps negatives to zero-width (min visible), all-zero → empty', () => {
    expect(funnelTrapezoids([0, 0], { width: 100, height: 50 })).toEqual([]);
    const t = funnelTrapezoids([10, -5], { width: 100, height: 50 });
    // negative stage collapses toward min width
    expect(t[1].topR - t[1].topL).toBeLessThan(t[0].topR - t[0].topL);
  });

  it('empty input → empty array', () => {
    expect(funnelTrapezoids([], { width: 100, height: 100 })).toEqual([]);
  });
});
