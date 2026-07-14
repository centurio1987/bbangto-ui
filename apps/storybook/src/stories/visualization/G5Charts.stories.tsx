import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  BarChart,
  LineChart,
  QuadrantChart,
  PieChart,
  RadarChart,
  RadialGauge,
  linearScale,
  bandScale,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Templates/G5',
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

// ── BarChart ──────────────────────────────────────────────────────────
const BAR_ITEMS = [
  { id: 'a', label: 'Q1', value: 40 },
  { id: 'b', label: 'Q2', value: 72 },
  { id: 'c', label: 'Q3', value: 55 },
  { id: 'd', label: 'Q4', value: 90 },
];

export const BarChartVertical: Story = {
  render: () => (
    <BarChart data={{ items: BAR_ITEMS }} viewBox="0 0 480 300" width={480} height={300} title="Bar chart" />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const bars = canvasElement.querySelectorAll('[data-bbangto-viz-bar]');
    await expect(bars.length).toBe(4);
    // 값 텍스트 병기
    const values = canvasElement.querySelectorAll('[data-bbangto-viz-bar-value]');
    await expect(values.length).toBe(4);
    await expect(values[3].textContent).toContain('90');
    // 값 비례: Q4(90) 막대가 Q1(40) 막대보다 길다
    const h = (el: Element) => Math.abs(parseFloat(el.getAttribute('height') || '0'));
    await expect(h(bars[3])).toBeGreaterThan(h(bars[0]));
    // 축 존재
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-axis]').length).toBe(2);
  },
};

export const BarChartHorizontalNegative: Story = {
  render: () => (
    <BarChart
      data={{
        items: [
          { id: 'a', label: 'Alpha', value: 30 },
          { id: 'b', label: 'Beta', value: -18 },
          { id: 'c', label: 'Gamma', value: 64 },
        ],
      }}
      orientation="horizontal"
      viewBox="0 0 480 260"
      width={480}
      height={260}
      title="Bar chart horizontal with negatives"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const bars = canvasElement.querySelectorAll('[data-bbangto-viz-bar]');
    await expect(bars.length).toBe(3);
  },
};

// ── LineChart ─────────────────────────────────────────────────────────
export const LineChartMultiSeries: Story = {
  render: () => (
    <LineChart
      data={{
        series: [
          { id: 's1', label: 'A', points: [ { x: 0, y: 10 }, { x: 1, y: 30 }, { x: 2, y: 22 }, { x: 3, y: 48 } ] },
          { id: 's2', label: 'B', points: [ { x: 0, y: 25 }, { x: 1, y: 18 }, { x: 2, y: 40 }, { x: 3, y: 35 } ] },
        ],
      }}
      viewBox="0 0 480 300"
      width={480}
      height={300}
      title="Line chart"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const lines = canvasElement.querySelectorAll('[data-bbangto-viz-line]');
    await expect(lines.length).toBe(2);
    const points = canvasElement.querySelectorAll('[data-bbangto-viz-point]');
    await expect(points.length).toBe(8);
    const firstLine = lines[0] as SVGPathElement;
    await expect((firstLine.getAttribute('d') || '').length).toBeGreaterThan(4);
  },
};

// ── QuadrantChart ─────────────────────────────────────────────────────
export const QuadrantChartBasic: Story = {
  render: () => (
    <QuadrantChart
      data={{
        items: [
          { id: 'p1', label: 'Feature A', x: 20, y: 80 },
          { id: 'p2', label: 'Feature B', x: 70, y: 65 },
          { id: 'p3', label: 'Feature C', x: 40, y: 30 },
          { id: 'p4', label: 'Feature D', x: 85, y: 20 },
        ],
        xAxisLabel: 'Effort',
        yAxisLabel: 'Impact',
        quadrantLabels: ['Quick wins', 'Major', 'Fill-ins', 'Thankless'],
      }}
      viewBox="0 0 420 420"
      width={420}
      height={420}
      title="Quadrant chart"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const points = canvasElement.querySelectorAll('[data-bbangto-viz-point]');
    await expect(points.length).toBe(4);
    // 2개 교차 축
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-axis]').length).toBe(2);
    // 사분면 라벨 4개
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-quadrant-label]').length).toBe(4);
  },
};

// ── PieChart ──────────────────────────────────────────────────────────
const PIE_ITEMS = [
  { id: 'a', label: 'Chrome', value: 63 },
  { id: 'b', label: 'Safari', value: 20 },
  { id: 'c', label: 'Edge', value: 10 },
  { id: 'd', label: 'Other', value: 7 },
];

export const PieChartDonut: Story = {
  render: () => (
    <PieChart data={{ items: PIE_ITEMS }} mode="donut" viewBox="0 0 420 360" width={420} height={360} title="Donut chart" />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const slices = canvasElement.querySelectorAll('[data-bbangto-viz-slice]');
    await expect(slices.length).toBe(4);
    // 값 텍스트 병기
    const labels = canvasElement.querySelectorAll('[data-bbangto-viz-slice-label]');
    await expect(labels.length).toBe(4);
    await expect(labels[0].textContent).toContain('63');
  },
};

export const PieChartPie: Story = {
  render: () => (
    <PieChart data={{ items: PIE_ITEMS }} mode="pie" viewBox="0 0 420 360" width={420} height={360} title="Pie chart" />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-slice]').length).toBe(4);
  },
};

// ── RadarChart ────────────────────────────────────────────────────────
export const RadarChartMultiSeries: Story = {
  render: () => (
    <RadarChart
      data={{
        axes: ['Speed', 'Power', 'Range', 'Cost', 'Weight'],
        series: [
          { id: 'r1', label: 'Model A', values: [80, 60, 70, 40, 55] },
          { id: 'r2', label: 'Model B', values: [50, 90, 45, 70, 65] },
        ],
        max: 100,
      }}
      viewBox="0 0 420 420"
      width={420}
      height={420}
      title="Radar chart"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const spokes = canvasElement.querySelectorAll('[data-bbangto-viz-radar-axis]');
    await expect(spokes.length).toBe(5);
    const polys = canvasElement.querySelectorAll('[data-bbangto-viz-radar-series]');
    await expect(polys.length).toBe(2);
  },
};

// ── RadialGauge ───────────────────────────────────────────────────────
export const RadialGaugeBasic: Story = {
  render: () => (
    <RadialGauge data={{ value: 72, min: 0, max: 100, label: 'Uptime', unit: '%' }} viewBox="0 0 320 240" width={320} height={240} title="Radial gauge" />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const gauge = canvasElement.querySelector('[data-bbangto-viz-gauge]');
    await expect(gauge).not.toBeNull();
    // 값 텍스트 병기(StatNumber)
    const val = canvasElement.querySelector('[data-viz-stat-value]');
    await expect(val?.textContent).toContain('72');
  },
};

// ── 스케일 헬퍼가 배럴로 공개되는지(순수 함수는 vitest가 정밀 검증) ──
export const ScaleExportsSmoke: Story = {
  render: () => {
    const s = linearScale([0, 10], [0, 100]);
    const b = bandScale(4, [0, 400]);
    return (
      <Canvas viewBox="0 0 200 60" width={200} height={60} title="scale smoke">
        <text data-testid="scale-out" x={10} y={30} fontSize={12}>
          {`${s(5)}|${b.bandwidth.toFixed(1)}`}
        </text>
      </Canvas>
    );
  },
  play: async ({ canvasElement }) => {
    const out = canvasElement.querySelector('[data-testid="scale-out"]');
    await expect(out?.textContent).toContain('50');
  },
};
