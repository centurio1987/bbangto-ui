import type { Meta } from '@storybook/react';
import { hudTelemetry01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Hud_Telemetry_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(hudTelemetry01VizStyleGuide, {
  // corner-bracket 데코레이션 게이트: HudNode wrapper가 노드 bbox 4모서리에 그리는
  // ⌐¬ L 브래킷 <path>(data-viz-hud-bracket)가 실제로 렌더됐는지 실측한다.
  // WrapperComponents 스토리는 2개 노드를 렌더하므로 4×2 = 8개 브래킷이 기대된다.
  wrapperExtraPlay: async (canvasElement) => {
    const nodes = canvasElement.querySelectorAll('[data-bbangto-viz-node]');
    await expect(nodes.length).toBeGreaterThanOrEqual(2);

    const brackets = canvasElement.querySelectorAll('[data-viz-hud-bracket]');
    await expect(brackets.length).toBeGreaterThanOrEqual(4);

    // 각 브래킷은 실제 path geometry(d)를 가진 무채움 라인이어야 한다.
    for (const b of Array.from(brackets)) {
      await expect((b.getAttribute('d') ?? '').length).toBeGreaterThan(0);
      await expect(b.tagName.toLowerCase()).toBe('path');
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
