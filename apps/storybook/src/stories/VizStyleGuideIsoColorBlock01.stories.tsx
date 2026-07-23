import type { Meta } from '@storybook/react';
import { isoColorBlock01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Iso_Color_Block_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(isoColorBlock01VizStyleGuide, {
  // 색블록 승격 게이트: IsoNode가 제네릭 박스(rect/rounded)를 cube로 승격하고,
  // 의미 도형(stadium 등)은 통과(pass-through)함을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const nodes = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-node]'));
    await expect(nodes.length).toBeGreaterThanOrEqual(2);

    // 승격: 최소 1개 cube 면(3단 음영)
    await expect(canvasElement.querySelector('[data-bbangto-viz-node-shape="cube"]')).not.toBeNull();

    // pass-through: cube가 아닌 노드도 존재 → 의미 도형 보존
    const nonCube = nodes.filter((n) => !n.querySelector('[data-bbangto-viz-node-shape="cube"]'));
    await expect(nonCube.length).toBeGreaterThanOrEqual(1);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
