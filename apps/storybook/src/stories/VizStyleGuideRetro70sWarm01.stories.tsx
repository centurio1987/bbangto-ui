import type { Meta } from '@storybook/react';
import { retro70sWarm01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Retro70s_Warm_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(retro70sWarm01VizStyleGuide, {
  // 레트로 시그니처 게이트: 그레인 필터(feTurbulence 고정 seed=7)가 도형 그룹에만 걸리고
  // 텍스트엔 미적용(라벨은 그레인 그룹 밖)임을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="retro70s-warm-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 그레인 그룹 — url(#...) 필터 적용 + 텍스트 없음(결정론 필터가 라벨을 왜곡하지 않음).
    const grainGroups = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-retro-grain]'));
    await expect(grainGroups.length).toBeGreaterThanOrEqual(2);
    for (const g of grainGroups) {
      await expect(g.getAttribute('filter') ?? '').toMatch(/^url\(#/);
      await expect(g.querySelector('text')).toBeNull();
      const m = /url\(["']?#([^"')]+)["']?\)/.exec(g.getAttribute('filter') ?? '');
      await expect(m).not.toBeNull();
      await expect(root!.querySelector(`filter[id="${m![1]}"]`)).not.toBeNull();
    }

    // (2) feTurbulence가 고정 seed=7로 존재(결정론 — PRNG 없음).
    const turbs = Array.from(root!.querySelectorAll('feTurbulence'));
    await expect(turbs.length).toBeGreaterThanOrEqual(2);
    for (const t of turbs) {
      await expect(t.getAttribute('seed')).toBe('7');
    }

    // (3) 라벨(text)은 그레인 그룹 밖에서 렌더 — 그레인이 텍스트를 왜곡하지 않는다.
    const labels = Array.from(root!.querySelectorAll('text'));
    await expect(labels.length).toBeGreaterThan(0);
    for (const g of grainGroups) {
      for (const t of labels) {
        await expect(g.contains(t)).toBe(false);
      }
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
