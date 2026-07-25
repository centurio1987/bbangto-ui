import { describe, it, expect } from 'vitest';
import { icebergLayout } from './iceberg';

describe('icebergLayout', () => {
  it('splits submerged mass into N tapering bands', () => {
    const r = icebergLayout({ width: 200, height: 300, layers: 3 });
    expect(r.bands.length).toBe(3);
    // 밴드는 수면선 아래에 순차 배치.
    expect(r.bands[0].y).toBeCloseTo(r.waterlineY, 6);
    expect(r.bands[1].y).toBeGreaterThan(r.bands[0].y);
    // 아래로 갈수록 폭이 좁아진다(빙산 폴리곤 경사) → leftX가 중심으로 이동.
    expect(r.bands[2].leftX).toBeGreaterThan(r.bands[0].leftX);
    expect(r.bands[2].rightX).toBeLessThan(r.bands[0].rightX);
  });

  it('tip apex sits above the waterline', () => {
    const r = icebergLayout({ width: 200, height: 300, layers: 2 });
    expect(r.tip.apex.y).toBeLessThan(r.waterlineY);
    expect(r.tip.baseLeft.y).toBeCloseTo(r.waterlineY, 6);
    expect(r.tip.baseRight.y).toBeCloseTo(r.waterlineY, 6);
  });

  it('layers ≤ 0 → empty bands', () => {
    expect(icebergLayout({ width: 200, height: 300, layers: 0 }).bands).toEqual([]);
  });

  it('waterlineRatio clamps to [0.1, 0.9]', () => {
    const hi = icebergLayout({ width: 200, height: 300, waterlineRatio: 1.5, layers: 1 });
    expect(hi.waterlineY).toBeCloseTo(270, 6); // 300 × 0.9
    const lo = icebergLayout({ width: 200, height: 300, waterlineRatio: -1, layers: 1 });
    expect(lo.waterlineY).toBeCloseTo(30, 6); // 300 × 0.1
  });
});
