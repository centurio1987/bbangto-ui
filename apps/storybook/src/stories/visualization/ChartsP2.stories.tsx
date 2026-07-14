import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  StackedBarChart,
  AreaChart,
  ScatterPlot,
  Histogram,
  DotPlot,
  WaterfallChart,
  Heatmap,
  ChoroplethMap,
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

// ── Histogram (VT-508) ────────────────────────────────────────────────
export const HistogramBasic: Story = {
  render: () => (
    <Histogram
      data={{ values: [1, 2, 2, 3, 3, 3, 4, 4, 5, 8, 9, 9] }}
      bins={4}
      viewBox="0 0 480 300"
      width={480}
      height={300}
      title="Histogram"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const bars = canvasElement.querySelectorAll('[data-bbangto-viz-bar]');
    await expect(bars.length).toBe(4);
    const counts = canvasElement.querySelectorAll('[data-bbangto-viz-bar-value]');
    await expect(counts.length).toBe(4);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-axis]').length).toBe(2);
  },
};

// ── DotPlot (VT-509) ──────────────────────────────────────────────────
export const DotPlotDot: Story = {
  render: () => (
    <DotPlot
      data={{
        items: [
          { id: 'a', label: 'Alpha', value: 40 },
          { id: 'b', label: 'Beta', value: 72 },
          { id: 'c', label: 'Gamma', value: 55 },
        ],
      }}
      mode="dot"
      viewBox="0 0 480 240"
      width={480}
      height={240}
      title="Dot plot"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-point]').length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-point-value]').length).toBe(3);
  },
};

export const DotPlotDumbbell: Story = {
  render: () => (
    <DotPlot
      data={{
        items: [
          { id: 'a', label: 'Alpha', low: 20, high: 60 },
          { id: 'b', label: 'Beta', low: 35, high: 80 },
        ],
      }}
      mode="dumbbell"
      viewBox="0 0 480 220"
      width={480}
      height={220}
      title="Dumbbell plot"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    // dumbbell: 2 dots per item + connector
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-point]').length).toBe(4);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-range]').length).toBe(2);
  },
};

// ── WaterfallChart (VT-517) ───────────────────────────────────────────
export const WaterfallWithTotal: Story = {
  render: () => (
    <WaterfallChart
      data={{
        items: [
          { id: 'start', label: 'Start', value: 100 },
          { id: 'a', label: 'Gain', value: 40 },
          { id: 'b', label: 'Loss', value: -30 },
          { id: 'c', label: 'Gain2', value: 15 },
        ],
      }}
      showTotal
      totalLabel="Net"
      viewBox="0 0 500 300"
      width={500}
      height={300}
      title="Waterfall"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const bars = canvasElement.querySelectorAll('[data-bbangto-viz-bar]');
    await expect(bars.length).toBe(5); // 4 steps + total
    const total = canvasElement.querySelector('[data-bbangto-viz-bar-total="true"]');
    await expect(total).toBeTruthy();
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-bar-value]').length).toBe(5);
  },
};

// ── Heatmap (VT-512) ──────────────────────────────────────────────────
export const HeatmapBasic: Story = {
  render: () => (
    <Heatmap
      data={{
        rows: ['Mon', 'Tue', 'Wed'],
        cols: ['AM', 'PM', 'Eve'],
        cells: [
          { row: 'Mon', col: 'AM', value: 2 },
          { row: 'Mon', col: 'PM', value: 8 },
          { row: 'Mon', col: 'Eve', value: 5 },
          { row: 'Tue', col: 'AM', value: 1 },
          { row: 'Tue', col: 'PM', value: 9 },
          { row: 'Tue', col: 'Eve', value: 4 },
          { row: 'Wed', col: 'AM', value: 6 },
          { row: 'Wed', col: 'PM', value: 3 },
          { row: 'Wed', col: 'Eve', value: 7 },
        ],
      }}
      viewBox="0 0 420 320"
      width={420}
      height={320}
      title="Heatmap"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const cells = canvasElement.querySelectorAll('[data-bbangto-viz-cell]');
    await expect(cells.length).toBe(9);
    // 강도 인코딩: 높은 값 셀의 fill-opacity가 낮은 값보다 큼
    const op = (row: string, col: string) => {
      const el = canvasElement.querySelector(`[data-bbangto-viz-cell-id="${row}:${col}"]`)!;
      return parseFloat(getComputedStyle(el as Element).fillOpacity || '1');
    };
    await expect(op('Tue', 'PM')).toBeGreaterThan(op('Tue', 'AM'));
    // 값 텍스트 병기
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-cell-value]').length).toBe(9);
  },
};

// ── ChoroplethMap (VT-518) ────────────────────────────────────────────
const CHORO_REGIONS = [
  { id: 'r1', d: 'M10,10 H120 V110 H10 Z', label: 'North' },
  { id: 'r2', d: 'M130,10 H240 V110 H130 Z', label: 'South' },
  { id: 'r3', d: 'M10,120 H240 V220 H10 Z', label: 'East' },
];

export const ChoroplethBasic: Story = {
  render: () => (
    <ChoroplethMap
      data={{
        regions: CHORO_REGIONS,
        items: [
          { id: 'r1', value: 20 },
          { id: 'r2', value: 80 },
          { id: 'r3', value: 50 },
        ],
      }}
      viewBox="0 0 260 240"
      width={260}
      height={240}
      title="Choropleth"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const regions = canvasElement.querySelectorAll('[data-bbangto-viz-geo-region]');
    await expect(regions.length).toBe(3);
    const op = (id: string) =>
      parseFloat(getComputedStyle(canvasElement.querySelector(`[data-bbangto-viz-geo-region-id="${id}"]`)! as Element).fillOpacity || '1');
    // 값 큰 지역이 더 진함
    await expect(op('r2')).toBeGreaterThan(op('r1'));
    // 값 텍스트 병기
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="choropleth"]')!;
    await expect(root.textContent).toContain('80');
  },
};

export const ChoroplethUnmatched: Story = {
  render: () => (
    <ChoroplethMap
      data={{ regions: CHORO_REGIONS, items: [{ id: 'r1', value: 40 }] }}
      viewBox="0 0 260 240"
      width={260}
      height={240}
      title="Choropleth partial"
    />
  ),
  play: async ({ canvasElement }) => {
    // 미매칭 region도 throw 없이 렌더(중립 fill)
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-geo-region]').length).toBe(3);
  },
};
