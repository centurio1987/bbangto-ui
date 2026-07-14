import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  GitGraph,
  PacketDiagram,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

// VISUALIZATION/Templates/Structure — 구조 다이어그램(GitGraph/Packet/Topology/Lineage/Sitemap/Network).
// storybook 그룹핑일 뿐, PLAN §D G6 메타 프레임과는 무관.
const meta = {
  title: 'VISUALIZATION/Templates/Structure',
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

// ── GitGraph ──────────────────────────────────────────────────────────
export const GitGraphBasic: Story = {
  render: () => (
    <GitGraph
      data={{
        branches: [
          { id: 'main', label: 'main' },
          { id: 'feat', label: 'feature' },
        ],
        commits: [
          { id: 'c1', branch: 'main', label: 'init' },
          { id: 'c2', branch: 'main', label: 'setup' },
          { id: 'c3', branch: 'feat', label: 'wip' },
          { id: 'c4', branch: 'feat', label: 'done' },
          { id: 'c5', branch: 'main', label: 'merge' },
        ],
        merges: [{ from: 'c4', to: 'c5' }],
      }}
      viewBox="0 0 560 220"
      width={560}
      height={220}
      title="Git graph"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const commits = canvasElement.querySelectorAll('[data-bbangto-viz-commit]');
    await expect(commits.length).toBe(5);
    const lanes = canvasElement.querySelectorAll('[data-bbangto-viz-branch-lane]');
    await expect(lanes.length).toBe(2);
  },
};

// ── PacketDiagram ─────────────────────────────────────────────────────
export const PacketDiagramBasic: Story = {
  render: () => (
    <PacketDiagram
      data={{
        fields: [
          { label: 'Source Port', bits: 16 },
          { label: 'Dest Port', bits: 16 },
          { label: 'Sequence Number', bits: 32 },
        ],
      }}
      viewBox="0 0 640 180"
      width={640}
      height={180}
      title="Packet diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const fields = canvasElement.querySelectorAll('[data-bbangto-viz-packet-field]');
    await expect(fields.length).toBe(3);
    // 비트 폭 합 = 행 폭 (Seq 32bit가 Source 16bit의 ~2배)
    const w = (el: Element) => parseFloat(el.querySelector('rect')?.getAttribute('width') || '0');
    await expect(w(fields[2])).toBeGreaterThan(w(fields[0]) * 1.5);
  },
};
