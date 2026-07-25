import type { Meta } from '@storybook/react';
import { memphisPattern01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Memphis_Pattern_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(memphisPattern01VizStyleGuide, {
  // 멤피스 시그니처 게이트: (1) 콘페티 <pattern>(자식 모티프 포함)이 도형에만 url() 채움으로 적용되고
  // aria-hidden 장식이며 텍스트가 없음(라벨은 밖), (2) 하드 오프셋 섀도 복제가 aria-hidden 장식으로
  // 존재하고 텍스트가 없음을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="memphis-pattern-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 콘페티 오버레이 — 장식(aria-hidden), 텍스트 없음(라벨은 오버레이 밖).
    const confetti = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-memphis]'));
    await expect(confetti.length).toBeGreaterThanOrEqual(2);
    for (const g of confetti) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();

      // 오버레이 도형은 url(#<pattern>) 채움 + 참조 <pattern>이 자식 모티프를 갖고 실재.
      const shape = g.querySelector<SVGElement>('[data-viz-part="shape"]');
      await expect(shape).not.toBeNull();
      const styleStr = shape!.getAttribute('style') ?? '';
      const m = /fill:\s*url\(["']?#([^"')]+)["']?\)/.exec(styleStr);
      await expect(m).not.toBeNull();
      const pattern = root!.querySelector(`pattern[id="${m![1]}"]`);
      await expect(pattern).not.toBeNull();
      await expect(pattern!.childElementCount).toBeGreaterThanOrEqual(1);
    }

    // (2) 하드 오프셋 섀도 — 장식(aria-hidden), 텍스트 없음. [data-viz-memphis]와 별개 속성.
    const shadow = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-memphis-shadow]'));
    await expect(shadow.length).toBeGreaterThanOrEqual(2);
    for (const g of shadow) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
