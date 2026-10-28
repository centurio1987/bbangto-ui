import { describe, expect, it } from 'vitest';
import { vizStaticStyles, VIZ_CONTRACT_STYLE_ID, VIZ_REDUCED_MOTION_STYLE_ID } from '../index';

// KAN-081 — 서버 렌더 소비자가 `<head>` 에 깔 정적 스타일 목록. 런타임 훅이 넣는 것과 같은 id · 같은 순서여야 한다.
describe('vizStaticStyles', () => {
  it('런타임 주입 순서대로 감속 · 계약 두 시트를 낸다', () => {
    expect(vizStaticStyles().map((s) => s.id)).toEqual([VIZ_REDUCED_MOTION_STYLE_ID, VIZ_CONTRACT_STYLE_ID]);
    expect(VIZ_REDUCED_MOTION_STYLE_ID).toBe('bbangto-viz-reduced-motion');
    expect(VIZ_CONTRACT_STYLE_ID).toBe('bbangto-viz-contract');
  });

  it('계약 시트가 도형 · 선 · 경계 훅을 토큰에 묶는다', () => {
    const contract = vizStaticStyles().find((s) => s.id === VIZ_CONTRACT_STYLE_ID)!.css;
    expect(contract).toContain('[data-viz-part="shape"]');
    expect(contract).toContain('var(--bbangto-viz-shape-fill)');
    expect(contract).toContain('[data-bbangto-viz-edge]');
    expect(contract).toContain('[data-viz-part="boundary"]');
  });

  it('부를 때마다 새 배열을 준다(소비자가 고쳐도 다음 호출이 안 오염된다)', () => {
    const a = vizStaticStyles();
    a.pop();
    expect(vizStaticStyles()).toHaveLength(2);
  });
});
