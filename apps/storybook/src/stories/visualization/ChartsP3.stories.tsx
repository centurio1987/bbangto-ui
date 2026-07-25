import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  Boxplot,
  ChordDiagram,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Templates/E-P3',
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

// ── Boxplot (VT-510) ──────────────────────────────────────────────────
export const BoxplotBasic: Story = {
  render: () => (
    <Boxplot
      data={{
        groups: [
          { id: 'a', label: 'A', values: [12, 15, 17, 18, 20, 21, 24] },
          { id: 'b', label: 'B', values: [8, 10, 11, 13, 14, 30] },
          { id: 'c', label: 'C', values: [16, 18, 19, 20, 22, 23, 25, 26] },
        ],
      }}
      viewBox="0 0 460 300"
      width={460}
      height={300}
      title="Boxplot"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-box]').length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-median]').length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-whisker]').length).toBeGreaterThan(0);
    // group B has an outlier (30) beyond the upper fence.
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-outlier]').length).toBeGreaterThan(0);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="boxplot"]')!;
    await expect(root.textContent).toContain('A');
  },
};

// precomputed 5-number summary 모드
export const BoxplotSummary: Story = {
  render: () => (
    <Boxplot
      data={{
        groups: [
          { id: 'q', label: 'Q1', summary: { min: 2, q1: 5, median: 8, q3: 12, max: 16 } },
          { id: 'r', label: 'Q2', summary: { min: 4, q1: 7, median: 10, q3: 14, max: 18 } },
        ],
      }}
      viewBox="0 0 360 280"
      width={360}
      height={280}
      title="Boxplot summary"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-box]').length).toBe(2);
  },
};

// ── ChordDiagram (VT-516) ─────────────────────────────────────────────
export const ChordBasic: Story = {
  render: () => (
    <ChordDiagram
      data={{
        nodes: [
          { id: 'x', label: 'X' },
          { id: 'y', label: 'Y' },
          { id: 'z', label: 'Z' },
        ],
        matrix: [
          [0, 5, 3],
          [5, 0, 2],
          [3, 2, 1],
        ],
      }}
      viewBox="0 0 320 320"
      width={320}
      height={320}
      title="Chord"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    // 노드 3개 → arc 3개.
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-chord-arc]').length).toBe(3);
    // 리본 ≥ 1(대각 self-chord 포함).
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-chord-ribbon]').length).toBeGreaterThan(0);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="chord"]')!;
    await expect(root.textContent).toContain('X');
  },
};
