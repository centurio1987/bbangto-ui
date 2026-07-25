import type { Meta } from '@storybook/react';
import { swissSystematic01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Swiss_Systematic_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(swissSystematic01VizStyleGuide, {
  // 스위스 노드 게이트: SwissNode가 제네릭 박스(rounded)를 샤프 rect로 정렬하고,
  // 의미 도형(stadium)은 통과(pass-through)함을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const nodes = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-node]'));
    await expect(nodes.length).toBeGreaterThanOrEqual(2);

    // 정렬: 최소 1개 샤프 rect(제네릭 박스 승격)
    await expect(canvasElement.querySelector('[data-bbangto-viz-node-shape="rect"]')).not.toBeNull();

    // pass-through: rect가 아닌 노드(의미 도형)도 존재
    const nonRect = nodes.filter((n) => !n.querySelector('[data-bbangto-viz-node-shape="rect"]'));
    await expect(nonRect.length).toBeGreaterThanOrEqual(1);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
