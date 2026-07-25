import type { Meta } from '@storybook/react';
import { pixelRetro01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Pixel_Retro_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(pixelRetro01VizStyleGuide, {
  // 픽셀 시그니처 게이트: (1) <pattern>에 <rect>(스퀘어 픽셀 셀)이 유일 id로 defs에 존재하며
  // shape-rendering=crispEdges(하드 엣지, 안티에일리어싱 없음), (2) 픽셀 오버레이 그룹(aria-hidden)이
  // 도형에 실제 적용됨(url(#...) 패턴 fill, ≥2) + 텍스트 없음, (3) 라벨(<text>)은 전부 픽셀 그룹
  // 밖에 있음(픽셀 스크린이 텍스트를 왜곡하지 않음)을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="pixel-retro-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 스퀘어 픽셀 <pattern> — <rect>(정사각 셀) 포함 + 유일 id로 defs에 존재 + crispEdges(하드 엣지).
    const patterns = Array.from(root!.querySelectorAll<SVGPatternElement>('pattern'));
    await expect(patterns.length).toBeGreaterThanOrEqual(2);
    for (const pat of patterns) {
      const rect = pat.querySelector<SVGRectElement>('rect');
      await expect(rect).not.toBeNull();
      // 원형 도트가 아니라 정사각 셀(픽셀) — <circle>은 없어야 함.
      await expect(pat.querySelector('circle')).toBeNull();
      await expect(rect!.getAttribute('shape-rendering')).toBe('crispEdges');
      await expect(pat.getAttribute('id') ?? '').not.toBe('');
    }

    // (2) 픽셀 오버레이 그룹 — 도형에 적용(≥2), url(#...) 패턴 fill, aria-hidden, 텍스트 없음(장식).
    const pixelGroups = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-pixel]'));
    await expect(pixelGroups.length).toBeGreaterThanOrEqual(2);
    for (const g of pixelGroups) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      const shape = g.querySelector<SVGElement>('[data-viz-part="shape"]');
      await expect(shape).not.toBeNull();
      await expect(getComputedStyle(shape!).fill).toMatch(/url\(/i);
    }

    // (3) 라벨(<text>)은 존재하되 어떤 것도 픽셀 그룹 안이 아니다(픽셀 밖 렌더).
    const texts = Array.from(root!.querySelectorAll<SVGTextElement>('text'));
    await expect(texts.length).toBeGreaterThanOrEqual(1);
    for (const t of texts) {
      await expect(t.closest('[data-viz-pixel]')).toBeNull();
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
