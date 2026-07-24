import type { Meta } from '@storybook/react';
import { darkluxe01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/DarkLuxe_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(darkluxe01VizStyleGuide, {
  // DarkLuxe 시그니처 게이트: (1) 골드 헤어라인 룰(data-viz-darkluxe-rule)이 ≥2개 존재하고
  // 각각 aria-hidden 장식(텍스트 없음) + <line> ≥1개, (2) 실 노드가 렌더되고 라벨은 룰 밖,
  // (3) titleFont var이 세리프('serif')를 포함(큰 세리프 디스플레이 시그니처)함을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="darkluxe-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 골드 헤어라인 룰 — ≥2개, aria-hidden, 텍스트 없음, <line> ≥1개.
    const rules = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-darkluxe-rule]'));
    await expect(rules.length).toBeGreaterThanOrEqual(2);
    for (const g of rules) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      await expect(g.querySelectorAll('line').length).toBeGreaterThanOrEqual(1);
    }

    // (2) 실 노드가 렌더되고, 타입 라벨(text)은 헤어라인 룰 그룹 밖에 존재한다.
    const nodes = Array.from(root!.querySelectorAll('[data-bbangto-viz-node]'));
    await expect(nodes.length).toBeGreaterThanOrEqual(2);
    const tag = root!.querySelector('[data-bbangto-viz-tag]');
    await expect(tag).not.toBeNull();
    await expect(tag!.closest('[data-viz-darkluxe-rule]')).toBeNull();

    // (3) 큰 세리프 디스플레이 시그니처 — titleFont var이 'serif'를 포함.
    const titleFont = getComputedStyle(root!).getPropertyValue('--bbangto-viz-typography-title-font');
    await expect(titleFont.toLowerCase()).toContain('serif');
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
