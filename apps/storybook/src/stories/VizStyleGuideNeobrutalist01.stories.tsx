import type { Meta } from '@storybook/react';
import { neobrutalist01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Neobrutalist_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(neobrutalist01VizStyleGuide, {
  // 네오브루탈 하드 오프셋 섀도 게이트: NeobrutalistNode가 본 도형 뒤에 근블랙 실루엣을
  // (1) transform 오프셋 장식 그룹(aria-hidden, 텍스트 없음)으로 깔고, (2) 실 도형이 그 위에
  // 존재하며, (3) 라벨(text)은 섀도 그룹 밖에서 렌더됨을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="neobrutalist-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 하드 오프셋 섀도 그룹 — 노드마다 1개(데모 2노드 → ≥2), 전부 aria-hidden 장식,
    //     텍스트 없음, transform 오프셋으로 이동, 내부에 실루엣 도형(shape) 보유.
    const shadows = Array.from(
      root!.querySelectorAll<SVGGElement>('[data-viz-neobrutal-shadow]'),
    );
    await expect(shadows.length).toBeGreaterThanOrEqual(2);
    for (const g of shadows) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      await expect(g.getAttribute('transform') ?? '').toMatch(/translate/);
      await expect(g.querySelector('[data-viz-part="shape"]')).not.toBeNull();
    }

    // (2) 실 도형(섀도 그룹 밖의 shape)이 존재 — 노드당 1개 이상.
    const realShapes = Array.from(
      root!.querySelectorAll<SVGElement>('[data-viz-part="shape"]'),
    ).filter((el) => el.closest('[data-viz-neobrutal-shadow]') == null);
    await expect(realShapes.length).toBeGreaterThanOrEqual(2);

    // (3) 라벨(text)은 존재하며 전부 섀도 그룹 밖 — 그림자가 텍스트를 덮지 않음.
    const labels = Array.from(root!.querySelectorAll<SVGTextElement>('text'));
    await expect(labels.length).toBeGreaterThan(0);
    for (const t of labels) {
      await expect(t.closest('[data-viz-neobrutal-shadow]')).toBeNull();
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
