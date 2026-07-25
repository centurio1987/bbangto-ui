import type { Meta } from '@storybook/react';
import { glitchDuotone01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Glitch_Duotone_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

/** transform="translate(x, y)"에서 x 오프셋을 파싱(부호 포함). 없으면 NaN. */
function translateX(el: Element): number {
  const m = /translate\(\s*(-?[\d.]+)/.exec(el.getAttribute('transform') ?? '');
  return m ? Number(m[1]) : NaN;
}

const s = makeVizCatalogStories(glitchDuotone01VizStyleGuide, {
  // 글리치 듀오톤 시그니처 게이트: (1) 정확히 두 채널 유령 그룹(magenta/cyan)만 존재하고 각각
  // aria-hidden·translate 오프셋을 가지며 텍스트가 없다, (2) 두 채널 오프셋 방향이 반대(±),
  // (3) 겹침 오버프린트 multiply가 채널 그룹에 실제 적용됨(computed style), (4) 실 노드가
  // ≥2개 렌더되고 라벨(텍스트)은 유령 채널 밖에 존재(오프셋/왜곡 없음)를 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="glitch-duotone-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 채널 유령 그룹 — 채널값은 정확히 {magenta, cyan} 2종만, 각자 aria-hidden·translate·텍스트 없음.
    const ghosts = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-glitch-chan]'));
    await expect(ghosts.length).toBeGreaterThanOrEqual(4); // 노드당 2채널 × ≥2노드
    for (const g of ghosts) {
      const chan = g.getAttribute('data-viz-glitch-chan');
      await expect(chan === 'magenta' || chan === 'cyan').toBe(true);
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.getAttribute('transform') ?? '').toMatch(/translate\(/);
      await expect(g.querySelector('text')).toBeNull();
    }

    // 정확히 두 채널만 존재(제3 채널 없음).
    const channels = new Set(ghosts.map((g) => g.getAttribute('data-viz-glitch-chan')));
    await expect(channels).toEqual(new Set(['magenta', 'cyan']));

    const magenta = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-glitch-chan="magenta"]'));
    const cyan = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-glitch-chan="cyan"]'));
    await expect(magenta.length).toBeGreaterThanOrEqual(2);
    await expect(cyan.length).toBeGreaterThanOrEqual(2);
    await expect(magenta.length).toBe(cyan.length); // 노드마다 두 채널이 짝

    // (2) 두 채널 오프셋 방향이 반대 — 마젠타 +x, 시안 -x(RGB-split colorsep).
    await expect(translateX(magenta[0])).toBeGreaterThan(0);
    await expect(translateX(cyan[0])).toBeLessThan(0);

    // (3) 오버프린트 multiply가 채널 유령 그룹에 실제 적용됨(도형/텍스트가 아닌 채널에만).
    await expect(getComputedStyle(magenta[0]).mixBlendMode).toBe('multiply');
    await expect(getComputedStyle(cyan[0]).mixBlendMode).toBe('multiply');

    // (4) 실 노드 ≥2 렌더 + 라벨(텍스트)은 유령 채널 밖에 존재(오프셋/왜곡 없음).
    const realNodes = Array.from(root!.querySelectorAll('[data-bbangto-viz-node]'));
    await expect(realNodes.length).toBeGreaterThanOrEqual(2);
    const labelsOutsideGhosts = Array.from(root!.querySelectorAll('text')).filter(
      (t) => !t.closest('[data-viz-glitch-chan]'),
    );
    await expect(labelsOutsideGhosts.length).toBeGreaterThanOrEqual(1);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
