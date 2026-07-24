import type { Meta } from '@storybook/react';
import { halftonePrint01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Halftone_Print_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(halftonePrint01VizStyleGuide, {
  // 망점 시그니처 게이트: (1) <pattern>에 <circle>(K 망점 스크린)이 유일 id로 defs에 존재,
  // (2) 망점 오버레이 그룹(aria-hidden)이 도형에 실제 적용됨(url(#...) 패턴 fill, ≥2) + 텍스트 없음,
  // (3) 라벨(<text>)은 전부 망점 그룹 밖에 있음(망점이 텍스트를 왜곡하지 않음)을 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="halftone-print-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 망점 <pattern> — <circle> 포함 + 유일 id로 defs에 존재.
    const patterns = Array.from(root!.querySelectorAll<SVGPatternElement>('pattern'));
    await expect(patterns.length).toBeGreaterThanOrEqual(2);
    for (const pat of patterns) {
      await expect(pat.querySelector('circle')).not.toBeNull();
      await expect(pat.getAttribute('id') ?? '').not.toBe('');
    }

    // (2) 망점 오버레이 그룹 — 도형에 적용(≥2), url(#...) 패턴 fill, aria-hidden, 텍스트 없음(장식).
    const dotGroups = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-halftone]'));
    await expect(dotGroups.length).toBeGreaterThanOrEqual(2);
    for (const g of dotGroups) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      const shape = g.querySelector<SVGElement>('[data-viz-part="shape"]');
      await expect(shape).not.toBeNull();
      await expect(getComputedStyle(shape!).fill).toMatch(/url\(/i);
    }

    // (3) 라벨(<text>)은 존재하되 어떤 것도 망점 그룹 안이 아니다(망점 밖 렌더).
    const texts = Array.from(root!.querySelectorAll<SVGTextElement>('text'));
    await expect(texts.length).toBeGreaterThanOrEqual(1);
    for (const t of texts) {
      await expect(t.closest('[data-viz-halftone]')).toBeNull();
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
