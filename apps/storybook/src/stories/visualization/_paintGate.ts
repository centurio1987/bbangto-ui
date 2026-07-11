import { expect } from 'storybook/test';

/**
 * paint 해석 게이트 — 렌더된 모든 shape/edge가 계약 스타일시트(또는 명시 prop)로
 * 유효한 paint를 해석했는지 확인한다. var 미해석 시 SVG fill은 initial(black)로
 * 떨어지므로 "순수 검정 fill"을 주입 실패 신호로 본다(블루프린트에 검정 면 없음).
 */
export async function expectVizPaintResolved(root: HTMLElement): Promise<void> {
  const shapes = root.querySelectorAll<SVGElement>('[data-viz-part="shape"]');
  const edges = root.querySelectorAll<SVGElement>('[data-bbangto-viz-edge]');
  await expect(shapes.length + edges.length).toBeGreaterThan(0);

  for (const el of Array.from(shapes)) {
    const cs = getComputedStyle(el);
    await expect(cs.fill).not.toBe('');
    await expect(cs.fill).not.toBe('rgb(0, 0, 0)');
    if (cs.stroke !== 'none') {
      await expect(parseFloat(cs.strokeWidth)).toBeGreaterThan(0);
    }
  }

  for (const el of Array.from(edges)) {
    const cs = getComputedStyle(el);
    await expect(cs.stroke).not.toBe('none');
    await expect(cs.stroke).not.toBe('');
    await expect(parseFloat(cs.strokeWidth)).toBeGreaterThan(0);
  }
}
