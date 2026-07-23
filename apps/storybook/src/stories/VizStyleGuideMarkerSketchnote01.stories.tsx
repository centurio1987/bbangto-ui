import type { Meta } from '@storybook/react';
import { markerSketchnote01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Marker_Sketchnote_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(markerSketchnote01VizStyleGuide, {
  // rough 필터 게이트: wrapper가 주입한 <filter>(feTurbulence 고정 seed)가 도형 그룹에만
  // 적용되고, 텍스트/라벨엔 걸리지 않음(가독성·결정론)을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const roughGroups = Array.from(canvasElement.querySelectorAll<SVGGElement>('[data-viz-rough]'));
    await expect(roughGroups.length).toBeGreaterThanOrEqual(2);

    for (const g of roughGroups) {
      // 도형 그룹에 url(#...) 필터가 실제로 적용됨
      await expect(g.getAttribute('filter') ?? '').toMatch(/^url\(#/);
      // 텍스트는 rough 그룹 안에 없음 — 필터가 라벨을 왜곡하지 않는다
      await expect(g.querySelector('text')).toBeNull();
    }

    // feTurbulence가 고정 seed로 존재(결정론) + url(#id)가 실제 필터를 가리킴
    const turbs = Array.from(canvasElement.querySelectorAll('feTurbulence'));
    await expect(turbs.length).toBeGreaterThanOrEqual(2);
    for (const t of turbs) {
      await expect(t.getAttribute('seed')).not.toBeNull();
    }
    for (const g of roughGroups) {
      const m = /url\(["']?#([^"')]+)["']?\)/.exec(g.getAttribute('filter') ?? '');
      await expect(m).not.toBeNull();
      await expect(canvasElement.querySelector(`filter[id="${m![1]}"]`)).not.toBeNull();
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
