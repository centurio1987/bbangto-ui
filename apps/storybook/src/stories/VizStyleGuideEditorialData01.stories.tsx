import type { Meta } from '@storybook/react';
import { editorialData01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Editorial_Data_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(editorialData01VizStyleGuide, {
  // 에디토리얼 시그니처 게이트: (1) 헤어라인 컬럼 rule 장식이 카드마다 존재하고 aria-hidden +
  // 텍스트 없음(가독성·접근성), (2) 실 노드가 함께 렌더되고 라벨은 rule 그룹 밖에 있으며,
  // (3) 세리프 디스플레이 titleFont var가 실제로 주입됨(computed style)을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="editorial-data-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 헤어라인 컬럼 rule — 카드마다 1개, aria-hidden 장식 + 텍스트 없음 + line ≥1.
    const rules = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-editorial-rule]'));
    await expect(rules.length).toBeGreaterThanOrEqual(2);
    for (const g of rules) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      await expect(g.querySelectorAll('line').length).toBeGreaterThanOrEqual(1);
    }

    // (2) 실 노드가 렌더되고, 라벨(text)은 rule 그룹 밖에서 정상 렌더된다.
    const nodes = Array.from(root!.querySelectorAll('[data-bbangto-viz-node]'));
    await expect(nodes.length).toBeGreaterThanOrEqual(2);
    const texts = Array.from(root!.querySelectorAll('text'));
    await expect(texts.length).toBeGreaterThanOrEqual(1);
    for (const t of texts) {
      await expect(t.closest('[data-viz-editorial-rule]')).toBeNull();
    }

    // (3) 세리프 디스플레이 titleFont var가 실제로 주입됨(세리프 시그니처).
    const titleFont = getComputedStyle(root!)
      .getPropertyValue('--bbangto-viz-typography-title-font')
      .toLowerCase();
    await expect(titleFont).toContain('serif');
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
