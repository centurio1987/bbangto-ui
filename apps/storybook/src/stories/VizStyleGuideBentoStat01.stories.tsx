import type { Meta } from '@storybook/react';
import { bentoStat01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Bento_Stat_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(bentoStat01VizStyleGuide, {
  // 벤토 타일 데코 게이트: BentoStatNode wrapper가 노드 bbox에서 파생해 그리는
  // 라운드 카드 frame + 액센트 코너 칩(data-viz-bento-tile)이 (1) 노드당 하나씩
  // 존재하고, (2) aria-hidden 장식이며 텍스트를 담지 않고, (3) 실제로 대응 노드를
  // 감싸는(노드 상대) 위치인지 getBBox로 실측한다. WrapperComponents 스토리는 노드 2개를
  // 렌더하므로 타일 데코도 ≥2개가 기대된다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="bento-stat-01"]',
    );
    await expect(root).not.toBeNull();

    // 실 노드 존재
    const nodes = Array.from(root!.querySelectorAll<SVGGElement>('[data-bbangto-viz-node]'));
    await expect(nodes.length).toBeGreaterThanOrEqual(2);

    // 타일 데코 ≥2 — 노드당 하나
    const tiles = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-bento-tile]'));
    await expect(tiles.length).toBeGreaterThanOrEqual(2);

    // 각 타일은 aria-hidden 장식 + 텍스트 없음 + frame/chip 보유
    for (const t of tiles) {
      await expect(t.getAttribute('aria-hidden')).toBe('true');
      await expect(t.querySelector('text')).toBeNull();
      await expect(t.querySelector('[data-viz-bento-frame]')).not.toBeNull();
      await expect(t.querySelector('[data-viz-bento-chip]')).not.toBeNull();
    }

    // 라벨(text)은 타일 데코 밖에 렌더 — 접근성/가독성
    await expect(root!.querySelectorAll('[data-viz-bento-tile] text').length).toBe(0);

    // 타일 frame이 대응 노드를 감싼다(노드 상대 위치) — frame bbox ⊇ 노드 bbox
    const tol = 2;
    for (let i = 0; i < Math.min(tiles.length, nodes.length); i++) {
      const frame = tiles[i].querySelector<SVGGraphicsElement>('[data-viz-bento-frame]');
      await expect(frame).not.toBeNull();
      const fb = frame!.getBBox();
      const nb = nodes[i].getBBox();
      await expect(fb.width).toBeGreaterThan(0);
      await expect(fb.height).toBeGreaterThan(0);
      await expect(fb.x).toBeLessThanOrEqual(nb.x + tol);
      await expect(fb.y).toBeLessThanOrEqual(nb.y + tol);
      await expect(fb.x + fb.width).toBeGreaterThanOrEqual(nb.x + nb.width - tol);
      await expect(fb.y + fb.height).toBeGreaterThanOrEqual(nb.y + nb.height - tol);
    }
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
