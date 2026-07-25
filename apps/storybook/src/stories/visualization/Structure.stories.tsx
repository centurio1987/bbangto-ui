import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  GitGraph,
  PacketDiagram,
  NetworkTopology,
  DataLineage,
  SitemapTree,
  NetworkGraph,
  ScreenFlow,
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

// ── NetworkTopology ───────────────────────────────────────────────────
export const NetworkTopologyBasic: Story = {
  render: () => (
    <NetworkTopology
      data={{
        zones: [
          { id: 'dmz', label: 'DMZ', x: 20, y: 40, width: 220, height: 200 },
          { id: 'internal', label: 'Internal', x: 300, y: 40, width: 260, height: 200 },
        ],
        nodes: [
          { id: 'fw', label: 'Firewall', x: 90, y: 90, zone: 'dmz' },
          { id: 'web', label: 'Web', x: 90, y: 170, zone: 'dmz' },
          { id: 'app', label: 'App', x: 360, y: 90, zone: 'internal' },
          { id: 'db', label: 'DB', x: 360, y: 170, zone: 'internal', shape: 'cylinder' },
        ],
        links: [
          { from: 'fw', to: 'web' },
          { from: 'web', to: 'app' },
          { from: 'app', to: 'db' },
        ],
      }}
      viewBox="0 0 600 280"
      width={600}
      height={280}
      title="Network topology"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-zone]').length).toBe(2);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-node]').length).toBe(4);
  },
};

// ── DataLineage ───────────────────────────────────────────────────────
export const DataLineageBasic: Story = {
  render: () => (
    <DataLineage
      data={{
        nodes: [
          { id: 'src', label: 'Source', detail: 'events', x: 20, y: 80 },
          { id: 'stg', label: 'Staging', detail: 'clean', x: 220, y: 80 },
          { id: 'dw', label: 'Warehouse', detail: 'facts', x: 420, y: 80 },
        ],
        edges: [
          { from: 'src', to: 'stg', label: 'ETL' },
          { from: 'stg', to: 'dw', label: 'load' },
        ],
      }}
      viewBox="0 0 600 220"
      width={600}
      height={220}
      title="Data lineage"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-lineage-node]').length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-edge]').length).toBe(2);
  },
};

// ── SitemapTree ───────────────────────────────────────────────────────
export const SitemapTreeBasic: Story = {
  render: () => (
    <SitemapTree
      data={{
        root: {
          id: 'home',
          label: 'Home',
          children: [
            { id: 'products', label: 'Products', children: [{ id: 'p1', label: 'List' }, { id: 'p2', label: 'Detail' }] },
            { id: 'about', label: 'About' },
            { id: 'blog', label: 'Blog', children: [{ id: 'b1', label: 'Posts' }] },
          ],
        },
      }}
      viewBox="0 0 640 320"
      width={640}
      height={320}
      title="Sitemap tree"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const nodes = canvasElement.querySelectorAll('[data-bbangto-viz-sitemap-node]');
    await expect(nodes.length).toBe(7);
    // elbow edge 존재
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-edge]').length).toBe(6);
  },
};

// ── NetworkGraph ──────────────────────────────────────────────────────
export const NetworkGraphBasic: Story = {
  render: () => (
    <NetworkGraph
      data={{
        nodes: [
          { id: 'hub', label: 'Core', x: 300, y: 150, hub: true },
          { id: 'a', label: 'A', x: 120, y: 60 },
          { id: 'b', label: 'B', x: 120, y: 240 },
          { id: 'c', label: 'C', x: 480, y: 60 },
          { id: 'd', label: 'D', x: 480, y: 240 },
        ],
        edges: [
          { from: 'hub', to: 'a' },
          { from: 'hub', to: 'b' },
          { from: 'hub', to: 'c' },
          { from: 'hub', to: 'd' },
        ],
      }}
      viewBox="0 0 600 300"
      width={600}
      height={300}
      title="Network graph"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-node]').length).toBe(5);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-edge]').length).toBe(4);
  },
};

// ── ScreenFlow ────────────────────────────────────────────────────────
export const ScreenFlowBasic: Story = {
  render: () => (
    <ScreenFlow
      data={{
        screens: [
          { id: 'login', title: 'Login', x: 20, y: 60 },
          { id: 'home', title: 'Home', x: 240, y: 60 },
          { id: 'detail', title: 'Detail', x: 460, y: 60 },
        ],
        flows: [
          { from: 'login', to: 'home', label: 'sign in' },
          { from: 'home', to: 'detail', label: 'select' },
        ],
      }}
      viewBox="0 0 640 260"
      width={640}
      height={260}
      title="Screen flow"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const screens = canvasElement.querySelectorAll('[data-bbangto-viz-mockup-node]');
    await expect(screens.length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-edge]').length).toBe(2);
  },
};
