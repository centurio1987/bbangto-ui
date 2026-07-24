import type { Meta } from '@storybook/react';
import { organicBlob01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Organic_Blob_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(organicBlob01VizStyleGuide, {
  // 유기 blob 데코레이션 게이트: OrganicBlobNode wrapper가 노드 bbox로부터 계산하는
  // 결정론적 유기 blob <path>(data-viz-blob)를 실측한다. WrapperComponents 스토리는
  // 2개 노드(w1=x24, w2=x220 / 동일 w140·h80·y40 / id 길이 2)를 렌더한다.
  wrapperExtraPlay: async (canvasElement) => {
    const root = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-viz-style-guide="organic-blob-01"]',
    );
    await expect(root).not.toBeNull();

    // (1) 실제 <Node> ≥ 2 — blob은 노드를 대체하지 않는 추가 데코레이션.
    const nodes = root!.querySelectorAll('[data-bbangto-viz-node]');
    await expect(nodes.length).toBeGreaterThanOrEqual(2);

    // (2) blob 데코 ≥ 2 — 각 그룹은 aria-hidden 순수 장식이고 텍스트가 없다.
    const blobs = Array.from(root!.querySelectorAll<SVGGElement>('[data-viz-blob]'));
    await expect(blobs.length).toBeGreaterThanOrEqual(2);
    for (const g of blobs) {
      await expect(g.getAttribute('aria-hidden')).toBe('true');
      await expect(g.querySelector('text')).toBeNull();
      // 각 blob 그룹은 cubic-bezier(C) 명령을 쓰는 <path>를 담는다.
      const path = g.querySelector('path');
      await expect(path).not.toBeNull();
      await expect(path!.tagName.toLowerCase()).toBe('path');
      const d = path!.getAttribute('d') ?? '';
      await expect(d.length).toBeGreaterThan(0);
      await expect(/[Cc]/.test(d)).toBe(true);
      // path에는 M/C/Z/숫자/공백/부호 외 문자가 없어야 한다(결정론적 순수 지오메트리).
      await expect(/^[MCZ0-9.\-\s]+$/.test(d)).toBe(true);
    }

    // (3) 라벨은 blob 밖 — 캔버스에 텍스트 라벨이 존재하고, 어느 것도 blob 그룹 안에 없다.
    const texts = Array.from(root!.querySelectorAll('text'));
    await expect(texts.length).toBeGreaterThanOrEqual(1);
    for (const t of texts) {
      await expect(t.closest('[data-viz-blob]')).toBeNull();
    }

    // (4) 결정론(determinism): w1·w2는 id 길이·w·h·y가 같고 x만 196 차이 →
    //     blob2 = blob1 을 (196, 0) 평행이동한 것과 정확히 일치해야 한다(랜덤 변형 없음).
    const d1 = blobs[0].querySelector('path')!.getAttribute('d') ?? '';
    const d2 = blobs[1].querySelector('path')!.getAttribute('d') ?? '';
    const m1 = /^M\s+([\d.-]+)\s+([\d.-]+)/.exec(d1);
    const m2 = /^M\s+([\d.-]+)\s+([\d.-]+)/.exec(d2);
    await expect(m1).not.toBeNull();
    await expect(m2).not.toBeNull();
    const dx = Number(m2![1]) - Number(m1![1]);
    const dy = Number(m2![2]) - Number(m1![2]);
    await expect(Math.abs(dx - 196)).toBeLessThan(0.5);
    await expect(Math.abs(dy)).toBeLessThan(0.5);
    // 두 blob 모두 동일한 고정 제어점 수(cubic-bezier C 세그먼트) — 구조적 결정론.
    const cCount = (d: string) => (d.match(/C/g) ?? []).length;
    await expect(cCount(d1)).toBe(cCount(d2));
    await expect(cCount(d1)).toBeGreaterThanOrEqual(3);
  },
});

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
