import type { Meta } from '@storybook/react';
import { artdecoLuxe01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/ArtDeco_Luxe_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(artdecoLuxe01VizStyleGuide, {
  // golden symmetric frame 데코레이션 게이트: ArtDecoLuxeNode wrapper가 노드 bbox에서 그리는
  // stepped 코너 4개 + 내부 대칭 라인 프레임(<g data-viz-artdeco-frame aria-hidden>)이 실제로
  // 렌더됐는지 실측한다. WrapperComponents 스토리는 2개 노드를 렌더 → 프레임 그룹 ≥2 기대.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="artdeco-luxe-01"]',
    );
    await expect(root).not.toBeNull();

    // 실제 노드 2개 이상 렌더.
    const nodes = canvasElement.querySelectorAll('[data-bbangto-viz-node]');
    await expect(nodes.length).toBeGreaterThanOrEqual(2);

    // golden symmetric frame — 장식(aria-hidden), 텍스트 없음, 대칭 line/path 자식 보유.
    const frames = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-artdeco-frame]'));
    await expect(frames.length).toBeGreaterThanOrEqual(2);
    for (const g of frames) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      const parts = Array.from(g.querySelectorAll('path, line'));
      // stepped 코너 4개(+ 내부 프레임) — 대칭 라인/패스 자식.
      await expect(parts.length).toBeGreaterThanOrEqual(4);
      for (const p of parts) {
        const geom = p.getAttribute('d') ?? p.getAttribute('x1') ?? '';
        await expect(geom.length).toBeGreaterThan(0);
      }
    }

    // 라벨은 프레임 밖 — 어떤 text도 프레임 그룹 내부에 있지 않다.
    const texts = Array.from(canvasElement.querySelectorAll('text'));
    await expect(texts.length).toBeGreaterThan(0);
    for (const t of texts) {
      await expect(t.closest('[data-viz-artdeco-frame]')).toBeNull();
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
