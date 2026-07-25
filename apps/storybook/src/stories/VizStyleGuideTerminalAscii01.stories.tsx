import type { Meta } from '@storybook/react';
import { terminalAscii01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Terminal_Ascii_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(terminalAscii01VizStyleGuide, {
  // 모노 시그니처 게이트: Terminal은 titleFont === monoFont(전면 모노)여야 한다.
  // (1) sg 토큰 레벨 동일성 + (2) provider 루트 CSS var 동일성을 DOM-safe하게 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const typo = terminalAscii01VizStyleGuide.foundations.typography;
    // (1) 토큰 계약: 제목 폰트 === 모노 폰트.
    await expect(typo.titleFont).toBe(typo.monoFont);
    await expect(/mono/i.test(typo.titleFont)).toBe(true);

    // (2) provider 루트에 주입된 CSS var가 두 필드에서 동일해야 한다.
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="terminal-ascii-01"]',
    );
    await expect(root).not.toBeNull();
    const style = getComputedStyle(root!);
    const titleVar = style.getPropertyValue('--bbangto-viz-typography-title-font').trim();
    const monoVar = style.getPropertyValue('--bbangto-viz-typography-mono-font').trim();
    await expect(titleVar).not.toBe('');
    await expect(monoVar).not.toBe('');
    await expect(titleVar).toBe(monoVar);

    // 커서 블록(장식)이 노드마다 렌더되는지 확인 — Terminal 모티프 시그니처.
    await expect(
      canvasElement.querySelectorAll('[data-viz-terminal-cursor]').length,
    ).toBeGreaterThanOrEqual(2);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
