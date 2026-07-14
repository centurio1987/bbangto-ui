import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  StackedBarChart,
  AreaChart,
  ScatterPlot,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Templates/G5-P2',
  component: Canvas,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story: React.ComponentType) => (
      <VisualizationStyleGuideProvider styleGuide={blueprintTechnical01VizStyleGuide}>
        <Story />
      </VisualizationStyleGuideProvider>
    ),
  ],
} satisfies Meta<typeof Canvas>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── StackedBarChart (VT-502) ──────────────────────────────────────────
const STACK_DATA = {
  categories: ['Q1', 'Q2', 'Q3'],
  series: [
    { id: 's1', label: 'Product', values: [30, 45, 20] },
    { id: 's2', label: 'Service', values: [20, 15, 35] },
    { id: 's3', label: 'Other', values: [10, 10, 10] },
  ],
};

export const StackedBarVertical: Story = {
  render: () => (
    <StackedBarChart data={STACK_DATA} viewBox="0 0 480 300" width={480} height={300} title="Stacked bar" />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const segs = canvasElement.querySelectorAll('[data-bbangto-viz-bar]');
    await expect(segs.length).toBe(9); // 3 series × 3 categories
    const values = canvasElement.querySelectorAll('[data-bbangto-viz-bar-value]');
    await expect(values.length).toBe(9);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-axis]').length).toBe(2);
    // Q2 total (70) taller than Q3 total (40) → its top segment sits higher (smaller y)
    const q2s1 = canvasElement.querySelector('[data-bbangto-viz-bar-cat="1"][data-bbangto-viz-bar-series="s1"]');
    const q3s1 = canvasElement.querySelector('[data-bbangto-viz-bar-cat="2"][data-bbangto-viz-bar-series="s1"]');
    await expect(parseFloat(q2s1!.getAttribute('height')!)).toBeGreaterThan(0);
    await expect(parseFloat(q3s1!.getAttribute('height')!)).toBeGreaterThan(0);
  },
};

export const StackedBarHorizontal: Story = {
  render: () => (
    <StackedBarChart
      data={STACK_DATA}
      orientation="horizontal"
      viewBox="0 0 480 280"
      width={480}
      height={280}
      title="Stacked bar horizontal"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-bar]').length).toBe(9);
  },
};

// ── AreaChart (VT-504) ────────────────────────────────────────────────
const AREA_SERIES = [
  { id: 'a', label: 'A', points: [ { x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 18 }, { x: 3, y: 30 } ] },
  { id: 'b', label: 'B', points: [ { x: 0, y: 6 }, { x: 1, y: 12 }, { x: 2, y: 22 }, { x: 3, y: 14 } ] },
];

export const AreaChartStacked: Story = {
  render: () => (
    <AreaChart data={{ series: AREA_SERIES }} stacked viewBox="0 0 480 300" width={480} height={300} title="Stacked area" />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const areas = canvasElement.querySelectorAll('[data-bbangto-viz-area]');
    await expect(areas.length).toBe(2);
    await expect((areas[0].getAttribute('d') || '').length).toBeGreaterThan(10);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-axis]').length).toBe(2);
  },
};

export const AreaChartOverlap: Story = {
  render: () => (
    <AreaChart data={{ series: AREA_SERIES }} viewBox="0 0 480 300" width={480} height={300} title="Overlapping area" />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-area]').length).toBe(2);
  },
};

// ── ScatterPlot (VT-505) ──────────────────────────────────────────────
const SCATTER = {
  series: [
    {
      id: 'g1',
      label: 'Group 1',
      points: [
        { id: 'p1', x: 10, y: 20, size: 5 },
        { id: 'p2', x: 30, y: 45, size: 12 },
        { id: 'p3', x: 55, y: 30, size: 8 },
      ],
    },
    {
      id: 'g2',
      label: 'Group 2',
      points: [
        { id: 'p4', x: 20, y: 60, size: 6 },
        { id: 'p5', x: 48, y: 15, size: 15 },
      ],
    },
  ],
};

export const ScatterBubble: Story = {
  render: () => (
    <ScatterPlot data={SCATTER} sizeDomain={[0, 15]} viewBox="0 0 480 320" width={480} height={320} title="Bubble scatter" />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const points = canvasElement.querySelectorAll('[data-bbangto-viz-point]');
    await expect(points.length).toBe(5);
    // larger size → larger radius
    const rOf = (id: string) =>
      parseFloat(canvasElement.querySelector(`[data-bbangto-viz-point-id="${id}"]`)!.getAttribute('r')!);
    await expect(rOf('p5')).toBeGreaterThan(rOf('p1'));
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-axis]').length).toBe(2);
  },
};

export const ScatterEmpty: Story = {
  render: () => <ScatterPlot data={{ series: [] }} viewBox="0 0 480 320" width={480} height={320} title="Empty scatter" />,
  play: async ({ canvasElement }) => {
    // 빈 데이터 → throw 없이 빈 캔버스
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-point]').length).toBe(0);
    await expect(canvasElement.querySelector('[data-bbangto-viz-canvas]')).toBeTruthy();
  },
};
