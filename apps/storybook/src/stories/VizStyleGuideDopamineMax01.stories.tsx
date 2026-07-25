import type { Meta } from '@storybook/react';
import { dopamineMax01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Dopamine_Max_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(dopamineMax01VizStyleGuide, {
  // 도파민 시그니처 게이트: (1) 색 충돌 오버랩 유령 그룹이 ≥2개 존재하고 aria-hidden 장식 +
  // 오프셋 transform + 텍스트 없음, (2) 유령 그룹에 오버랩 블렌드(mix-blend-mode != normal)가
  // 실제 적용됨(computed style), (3) 실 도형이 유령 밖에서 ≥2개 + 라벨이 유령 밖에서 렌더됨을
  // 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="dopamine-max-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 클래시 유령 그룹 ≥2 — 장식(aria-hidden), 오프셋 transform, 텍스트 없음.
    const clash = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-dopamine-clash]'));
    await expect(clash.length).toBeGreaterThanOrEqual(2);
    for (const g of clash) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.getAttribute('transform') ?? '').toMatch(/translate/);
      await expect(g.querySelector('text')).toBeNull();
      // (2) 오버랩 블렌드가 유령 장식에 실제 적용됨(텍스트가 아닌 장식에만).
      await expect(getComputedStyle(g).mixBlendMode).not.toBe('normal');
    }

    // (3) 실 도형 ≥2 — 클래시 유령 밖(오프셋 없음)에서 렌더.
    const realNodes = Array.from(
      root!.querySelectorAll<SVGGElement>('[data-bbangto-viz-node]'),
    ).filter((n) => !n.closest('[data-viz-dopamine-clash]'));
    await expect(realNodes.length).toBeGreaterThanOrEqual(2);

    // 라벨은 클래시 유령 밖에서 렌더(가독성) — 유령 밖 텍스트가 존재.
    const outsideLabels = Array.from(root!.querySelectorAll<SVGTextElement>('text')).filter(
      (t) => !t.closest('[data-viz-dopamine-clash]'),
    );
    await expect(outsideLabels.length).toBeGreaterThanOrEqual(1);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
