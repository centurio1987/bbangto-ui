import type { Meta } from '@storybook/react';
import { ukiyoeFlat01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Ukiyoe_Flat_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(ukiyoeFlat01VizStyleGuide, {
  // 우키요에 시그니처 게이트: (1) 스미 먹선 오프셋 컨투어 데코(data-viz-ukiyoe)가 ≥2개 존재하고
  // aria-hidden 장식이며 텍스트(<text>)를 담지 않는다(라벨 왜곡 없음), (2) 데코가 아닌 실 노드가
  // ≥2개 렌더된다(라벨은 데코 밖), (3) 데코 컨투어는 fill:none 의 스미 먹선(면을 덮지 않음)이다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="ukiyoe-flat-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 스미 오프셋 컨투어 데코 — aria-hidden 장식, 텍스트 없음.
    const ukiyoe = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-ukiyoe]'));
    await expect(ukiyoe.length).toBeGreaterThanOrEqual(2);
    for (const g of ukiyoe) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      // 컨투어는 면을 덮지 않는 스미 먹선(fill:none)이어야 한다.
      const shape = g.querySelector<SVGElement>('[data-viz-part="shape"]');
      await expect(shape).not.toBeNull();
      await expect(getComputedStyle(shape!).fill).toBe('none');
    }

    // (2) 데코가 아닌 실 노드가 ≥2개(라벨은 데코 밖에서 렌더).
    const realNodes = Array.from(
      root!.querySelectorAll<SVGGElement>('[data-bbangto-viz-node]:not([data-viz-ukiyoe])'),
    );
    await expect(realNodes.length).toBeGreaterThanOrEqual(2);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
