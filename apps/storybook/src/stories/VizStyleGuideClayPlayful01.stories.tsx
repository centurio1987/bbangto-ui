import type { Meta } from '@storybook/react';
import { clayPlayful01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Clay_Playful_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(clayPlayful01VizStyleGuide, {
  // 클레이 시그니처 게이트: (1) inset(inner shadow) 필터가 도형 그룹([data-viz-clay])에만
  // 걸리고 텍스트엔 미적용, (2) 알파 반전(feComposite operator="out")·feFlood가 결정론적으로
  // 존재, (3) 라벨은 필터 그룹 밖에서 렌더(그룹 내부 <text> 없음, 캔버스엔 라벨 존재)를 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="clay-playful-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 클레이 데코 그룹 — url(#...) inset 필터 적용 + 그룹 내부 텍스트 없음(필터가 라벨을 왜곡하지 않음).
    const clayGroups = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-clay]'));
    await expect(clayGroups.length).toBeGreaterThanOrEqual(2);
    for (const g of clayGroups) {
      await expect(g.getAttribute('filter') ?? '').toMatch(/^url\(#/);
      await expect(g.querySelector('text')).toBeNull();
      const m = /url\(["']?#([^"')]+)["']?\)/.exec(g.getAttribute('filter') ?? '');
      await expect(m).not.toBeNull();
      await expect(root!.querySelector(`filter[id="${m![1]}"]`)).not.toBeNull();
    }

    // (2) inset 시그니처 — 알파 반전 feComposite(operator="out")과 feFlood가 결정론적으로 존재(≥2 도형).
    const outComposites = Array.from(
      root!.querySelectorAll('feComposite'),
    ).filter((c) => c.getAttribute('operator') === 'out');
    await expect(outComposites.length).toBeGreaterThanOrEqual(2);
    await expect(root!.querySelectorAll('feFlood').length).toBeGreaterThanOrEqual(2);
    // 결정론: 비결정 노이즈(feTurbulence) 없음.
    await expect(root!.querySelector('feTurbulence')).toBeNull();

    // (3) 라벨은 필터 밖에서 렌더 — 캔버스에 태그 라벨이 존재하되 클레이 그룹 안엔 없다.
    await expect(
      canvasElement.querySelectorAll('[data-bbangto-viz-tag]').length,
    ).toBeGreaterThanOrEqual(1);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
