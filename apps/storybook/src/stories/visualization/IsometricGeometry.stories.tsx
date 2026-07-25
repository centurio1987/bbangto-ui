import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  IsometricScene,
  isoDepthKey,
  type IsoCellSpec,
  type IsoLinkSpec,
  type VisualizationStyleGuide,
} from '@centurio1987/bbangto-ui-visualization';
import {
  isoColorBlock01VizStyleGuide,
  corporateSchematic01VizStyleGuide,
} from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

/**
 * 진짜 isometric geometry 트랙(KAN-028) — Iso_ColorBlock 페인트 패밀리와 별개.
 * 동일 씬을 서로 다른 두 페인트 가이드로 렌더해 paint/geometry 직교성을 실증한다.
 */

// 스칼라 depth key가 모두 distinct → depth-sort DOM 순서가 결정론적.
// keys: A=0, B=1, D=2, E=2.2(부양), C=3.
const CELLS: IsoCellSpec[] = [
  { id: 'A', x: 0, y: 0, w: 1, d: 1, h: 1, label: 'API' },
  { id: 'B', x: 1, y: 0, w: 1, d: 1, h: 1.4, label: 'Web' },
  { id: 'D', x: 0, y: 2, w: 1, d: 1, h: 1.2, label: 'Cache' },
  { id: 'E', x: 1, y: 0, z: 1.2, w: 1, d: 1, h: 0.6, label: 'Edge' },
  { id: 'C', x: 2, y: 1, w: 1, d: 1, h: 0.8, label: 'DB' },
];

const LINKS: IsoLinkSpec[] = [
  { from: 'A', to: 'B' },
  { from: 'B', to: 'C' },
  { from: 'D', to: 'C' },
];

const VIEWBOX = '0 0 520 380';

function Scene({ guide }: { guide: VisualizationStyleGuide }) {
  return (
    <VisualizationStyleGuideProvider styleGuide={guide}>
      <IsometricScene
        data={{ cells: CELLS, links: LINKS }}
        viewBox={VIEWBOX}
        width={520}
        height={380}
        title="Isometric scene"
      />
    </VisualizationStyleGuideProvider>
  );
}

const meta = {
  title: 'VISUALIZATION/Geometry/Isometric',
  component: Canvas,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Canvas>;

export default meta;
type Story = StoryObj<typeof meta>;

// prism DOM 순서가 각 셀 depth key 오름차순인지 검증(스칼라 = 위상 순서).
async function expectDepthSorted(canvasElement: HTMLElement) {
  const keyById = new Map(
    CELLS.map((c) => [c.id, isoDepthKey({ x: c.x, y: c.y, z: c.z ?? 0, w: 1, d: 1, h: 1 })]),
  );
  const prisms = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-iso-prism]'));
  await expect(prisms.length).toBe(CELLS.length);
  const keys = prisms.map((p) => keyById.get(p.getAttribute('data-bbangto-viz-cell-id') ?? '') ?? NaN);
  for (let i = 1; i < keys.length; i++) {
    await expect(keys[i]).toBeGreaterThanOrEqual(keys[i - 1]);
  }
}

// 각 프리즘이 top/left/right 세 면을 모두 방출하는지.
async function expectThreeFaces(canvasElement: HTMLElement) {
  const prisms = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-iso-prism]'));
  for (const p of prisms) {
    for (const face of ['top', 'left', 'right']) {
      await expect(p.querySelector(`[data-bbangto-viz-iso-face="${face}"]`)).not.toBeNull();
    }
  }
}

/** Iso_ColorBlock 페인트로 렌더 — 색블록 계열이 iso geometry 위에 얹힌다. */
export const IsoColorBlockPaint: Story = {
  render: () => <Scene guide={isoColorBlock01VizStyleGuide} />,
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expectThreeFaces(canvasElement);
    await expectDepthSorted(canvasElement);
  },
};

/** Corporate_Schematic 페인트로 동일 씬 렌더 — 같은 geometry, 다른 페인트(직교성). */
export const CorporateSchematicPaint: Story = {
  render: () => <Scene guide={corporateSchematic01VizStyleGuide} />,
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expectThreeFaces(canvasElement);
    await expectDepthSorted(canvasElement);
  },
};

/** geometry 계약: depth-sort · 커넥터 오클루전 · 평면 라벨 접근성. */
export const GeometryContract: Story = {
  render: () => <Scene guide={isoColorBlock01VizStyleGuide} />,
  play: async ({ canvasElement }) => {
    await expectDepthSorted(canvasElement);

    // 커넥터가 프리즘보다 먼저(뒤에 깔림) — DOM 위치로 검증.
    const edge = canvasElement.querySelector('[data-bbangto-viz-edge]');
    const firstPrism = canvasElement.querySelector('[data-bbangto-viz-iso-prism]');
    await expect(edge).not.toBeNull();
    await expect(firstPrism).not.toBeNull();
    const prismFollowsEdge =
      edge!.compareDocumentPosition(firstPrism!) & Node.DOCUMENT_POSITION_FOLLOWING;
    await expect(prismFollowsEdge).toBeTruthy();

    // 평면 라벨: skew/투영 없음(접근성 불변식) + 최상단 레이어.
    const labels = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-iso-label]'));
    await expect(labels.length).toBe(CELLS.length);
    const lastPrism = Array.from(
      canvasElement.querySelectorAll('[data-bbangto-viz-iso-prism]'),
    ).pop()!;
    for (const l of labels) {
      await expect(getComputedStyle(l as Element).transform).toBe('none');
      const labelFollowsPrism =
        lastPrism.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_FOLLOWING;
      await expect(labelFollowsPrism).toBeTruthy();
    }

    // floor cast shadow는 대응 프리즘 top-면 라벨보다 화면상 아래(바닥).
    const shadowA = canvasElement.querySelector(
      '[data-bbangto-viz-iso-shadow][data-bbangto-viz-cell-id="A"]',
    ) as SVGGraphicsElement | null;
    const labelA = canvasElement.querySelector(
      '[data-bbangto-viz-iso-label][data-bbangto-viz-cell-id="A"]',
    ) as SVGGraphicsElement | null;
    await expect(shadowA).not.toBeNull();
    await expect(labelA).not.toBeNull();
    const sB = shadowA!.getBBox();
    const lB = labelA!.getBBox();
    await expect(sB.y + sB.height / 2).toBeGreaterThan(lB.y + lB.height / 2);
  },
};
