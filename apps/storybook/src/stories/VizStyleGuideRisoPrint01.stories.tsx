import type { Meta } from '@storybook/react';
import { risoPrint01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Riso_Print_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(risoPrint01VizStyleGuide, {
  // 리소 시그니처 게이트: (1) 그레인 필터(feTurbulence 고정 seed)가 도형 그룹에만 걸리고
  // 텍스트엔 미적용, (2) 미스레지 유령 도형이 aria-hidden 장식으로 존재, (3) 오버프린트
  // multiply가 [data-viz-part="shape"]에 실제 적용됨(computed style)을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="riso-print-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 그레인 그룹 — url(#...) 필터 적용 + 텍스트 없음(결정론 필터가 라벨을 왜곡하지 않음).
    const grainGroups = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-riso-grain]'));
    await expect(grainGroups.length).toBeGreaterThanOrEqual(2);
    for (const g of grainGroups) {
      await expect(g.getAttribute('filter') ?? '').toMatch(/^url\(#/);
      await expect(g.querySelector('text')).toBeNull();
      const m = /url\(["']?#([^"')]+)["']?\)/.exec(g.getAttribute('filter') ?? '');
      await expect(m).not.toBeNull();
      await expect(root!.querySelector(`filter[id="${m![1]}"]`)).not.toBeNull();
    }

    // feTurbulence가 고정 seed로 존재(결정론 — PRNG 없음).
    const turbs = Array.from(root!.querySelectorAll('feTurbulence'));
    await expect(turbs.length).toBeGreaterThanOrEqual(2);
    for (const t of turbs) {
      await expect(t.getAttribute('seed')).toBe('7');
    }

    // (2) 미스레지 유령 — 장식(aria-hidden), 텍스트 없음.
    const misreg = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-riso-misreg]'));
    await expect(misreg.length).toBeGreaterThanOrEqual(2);
    for (const g of misreg) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
    }

    // (3) 오버프린트 multiply가 도형(shape)에 실제 적용됨 — 텍스트가 아닌 도형에만.
    const shape = root!.querySelector<SVGElement>('[data-viz-part="shape"]');
    await expect(shape).not.toBeNull();
    await expect(getComputedStyle(shape!).mixBlendMode).toBe('multiply');
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
