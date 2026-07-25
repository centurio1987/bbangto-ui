import type { Meta } from '@storybook/react';
import { neumorphicSoft01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Neumorphic_Soft_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(neumorphicSoft01VizStyleGuide, {
  // 뉴모픽 시그니처 게이트: (1) 듀얼 섀도 SVG 필터가 도형 그룹에만 걸리고 텍스트엔 미적용,
  // (2) 필터가 좌상/우하 2겹 섀도 프리미티브(feOffset)를 feMerge로 합성, (3) 라벨은 필터 밖에 존재.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="neumorphic-soft-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 듀얼 섀도 도형 그룹 — url(#...) 필터 적용 + 텍스트 없음(섀도가 라벨을 흐리지 않음).
    const shadowGroups = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-neumorph]'));
    await expect(shadowGroups.length).toBeGreaterThanOrEqual(2);
    for (const g of shadowGroups) {
      await expect(g.getAttribute('filter') ?? '').toMatch(/^url\(#/);
      await expect(g.querySelector('text')).toBeNull();
      const m = /url\(["']?#([^"')]+)["']?\)/.exec(g.getAttribute('filter') ?? '');
      await expect(m).not.toBeNull();
      const filterEl = root!.querySelector<SVGFilterElement>(`filter[id="${m![1]}"]`);
      await expect(filterEl).not.toBeNull();
      // 듀얼 섀도: 라이트 + 다크 = 섀도 프리미티브(feOffset/feDropShadow) ≥ 2.
      const prims = filterEl!.querySelectorAll('feOffset, feDropShadow');
      await expect(prims.length).toBeGreaterThanOrEqual(2);
      // 원본 도형과 합성(feMerge) — 섀도가 도형 아래에 깔린다.
      await expect(filterEl!.querySelector('feMerge')).not.toBeNull();
    }

    // (2) 라벨은 필터 그룹 밖에 존재(가독성) — neumorph 그룹 바깥 <text> ≥ 1.
    const outsideText = Array.from(root!.querySelectorAll<SVGTextElement>('text')).filter(
      (t) => !t.closest('[data-viz-neumorph]'),
    );
    await expect(outsideText.length).toBeGreaterThanOrEqual(1);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
