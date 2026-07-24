import type { Meta } from '@storybook/react';
import { kawaiiPastel01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Kawaii_Pastel_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(kawaiiPastel01VizStyleGuide, {
  // 마스코트 글리프 데코레이션 게이트: KawaiiNode wrapper가 노드마다 그리는 카와이 얼굴
  // 그룹(data-viz-kawaii-mascot)이 노드 수만큼 존재하고, 각 그룹이 aria-hidden + 텍스트 없음이며,
  // 실 노드가 렌더되고 라벨 텍스트는 마스코트 그룹 밖에서 정상 렌더됨을 실측한다.
  // WrapperComponents 스토리는 2개 노드를 렌더하므로 마스코트 그룹 2개가 기대된다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="kawaii-pastel-01"]',
    );
    await expect(root).not.toBeNull();

    // 실 노드 ≥2
    const nodes = root!.querySelectorAll('[data-bbangto-viz-node]');
    await expect(nodes.length).toBeGreaterThanOrEqual(2);

    // 마스코트 글리프 그룹 ≥2(노드당 1개) — 각 aria-hidden + 텍스트 없음 + 실제 지오메트리 보유.
    const mascots = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-kawaii-mascot]'));
    await expect(mascots.length).toBeGreaterThanOrEqual(2);
    for (const m of mascots) {
      await expect(m.getAttribute('aria-hidden')).toBe('true');
      await expect(m.querySelector('text')).toBeNull();
      // 눈/미소 등 실 도형(circle/path)이 존재해야 한다(빈 데코 아님).
      await expect(m.querySelector('circle, path')).not.toBeNull();
    }

    // 라벨 텍스트는 마스코트 그룹 밖에서 렌더된다(데코가 라벨을 삼키지 않음).
    const outsideText = Array.from(root!.querySelectorAll('text')).filter(
      (t) => !t.closest('[data-viz-kawaii-mascot]'),
    );
    await expect(outsideText.length).toBeGreaterThanOrEqual(1);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
