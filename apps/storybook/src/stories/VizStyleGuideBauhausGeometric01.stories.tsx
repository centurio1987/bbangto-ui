import type { Meta } from '@storybook/react';
import { bauhausGeometric01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Bauhaus_Geometric_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(bauhausGeometric01VizStyleGuide, {
  // 바우하우스 하드 섀도 게이트: BauhausNode가 본 도형 뒤 +5,+5 잉크 실루엣을 그리고,
  // 각 노드가 실제로 2개 이상 렌더됨을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const nodes = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-node]'));
    await expect(nodes.length).toBeGreaterThanOrEqual(2);

    // 하드 오프셋 섀도 실루엣이 최소 1개 존재(장식적 입체감).
    await expect(
      canvasElement.querySelectorAll('[data-viz-wrapper-shadow]').length,
    ).toBeGreaterThanOrEqual(1);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
