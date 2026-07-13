import type { Meta } from '@storybook/react';
import { neonGradientDark01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Neon_Gradient_Dark_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(neonGradientDark01VizStyleGuide, {
  // 그라디언트 defs 게이트: wrapper가 노드마다 주입하는 <defs><linearGradient>의
  // 표준 준수(defs 부모)·id 유일성·url(#id) 참조 무결성을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const gradients = Array.from(canvasElement.querySelectorAll('linearGradient'));
    await expect(gradients.length).toBeGreaterThanOrEqual(2);

    for (const g of gradients) {
      await expect(g.parentElement?.tagName.toLowerCase()).toBe('defs');
    }

    const ids = gradients.map((g) => g.id).filter(Boolean);
    await expect(ids.length).toBe(gradients.length);
    await expect(new Set(ids).size).toBe(ids.length);

    // url(#id)로 채워진 도형은 대상 그라디언트가 같은 문서에 실제로 존재해야 한다.
    let referenced = 0;
    for (const shape of Array.from(
      canvasElement.querySelectorAll<SVGElement>('[data-viz-part="shape"]'),
    )) {
      const m = /url\(["']?#([^"')]+)["']?\)/.exec(shape.style.fill ?? '');
      if (m) {
        referenced += 1;
        await expect(canvasElement.querySelector(`linearGradient[id="${m[1]}"]`)).not.toBeNull();
      }
    }
    await expect(referenced).toBeGreaterThanOrEqual(2);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
