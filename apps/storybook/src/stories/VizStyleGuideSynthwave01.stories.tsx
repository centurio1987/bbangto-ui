import type { Meta } from '@storybook/react';
import { synthwave01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Synthwave_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(synthwave01VizStyleGuide, {
  // 신스웨이브 시그니처 게이트: (1) SynthwaveNode wrapper가 노드 위에 깐 CRT 스캔라인
  // 오버레이(data-viz-synth)가 aria-hidden 장식으로 존재하고 <text>를 포함하지 않으며 실제
  // 라인 지오메트리를 갖는지, (2) 절제된 네온 글로우(drop-shadow)가 [data-viz-synth-glow]
  // 노드 그룹에 모티프 CSS로 실제 적용됐는지(computed style), (3) 라벨(태그 <text>)이
  // 스캔라인 오버레이 밖에서 렌더되는지 실측한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="synthwave-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) CRT 스캔라인 오버레이 — 노드마다 하나(2개 노드 → ≥2), aria-hidden, 텍스트 없음, 실제 라인.
    const synth = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-synth]'));
    await expect(synth.length).toBeGreaterThanOrEqual(2);
    for (const g of synth) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      const lines = g.querySelectorAll('line');
      await expect(lines.length).toBeGreaterThan(0);
      for (const ln of Array.from(lines)) {
        await expect(ln.tagName.toLowerCase()).toBe('line');
      }
    }

    // (2) 네온 글로우 — 모티프 CSS가 [data-viz-synth-glow] 노드 그룹에 drop-shadow를 실제 적용.
    const glow = root!.querySelector<SVGGElement>('[data-viz-synth-glow]');
    await expect(glow).not.toBeNull();
    const filter = getComputedStyle(glow!).filter;
    await expect(filter).not.toBe('none');
    await expect(filter.includes('drop-shadow')).toBe(true);

    // (3) 라벨은 스캔라인 오버레이 밖에서 렌더 — 태그 <text>가 존재하고 어떤 [data-viz-synth] 안에도 없음.
    const texts = Array.from(root!.querySelectorAll('text'));
    await expect(texts.length).toBeGreaterThan(0);
    for (const t of texts) {
      await expect(t.closest('[data-viz-synth]')).toBeNull();
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
