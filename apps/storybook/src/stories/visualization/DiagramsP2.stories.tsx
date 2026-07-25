import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  UseCaseDiagram,
  C4DynamicDiagram,
  C4SystemLandscapeDiagram,
  DataFlowDiagram,
  ActivityDiagram,
  ConceptMap,
  Fishbone,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Templates/A-P2',
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

// ── UseCaseDiagram (VT-105) ───────────────────────────────────────────
export const UseCaseBasic: Story = {
  render: () => (
    <UseCaseDiagram
      data={{
        system: { label: 'Shop', x: 150, y: 20, width: 220, height: 240 },
        actors: [
          { id: 'user', label: 'Customer', x: 20, y: 90 },
          { id: 'admin', label: 'Admin', x: 440, y: 90 },
        ],
        useCases: [
          { id: 'browse', label: 'Browse', x: 180, y: 50 },
          { id: 'checkout', label: 'Checkout', x: 180, y: 130 },
          { id: 'manage', label: 'Manage', x: 180, y: 200 },
        ],
        links: [
          { from: 'user', to: 'browse' },
          { from: 'user', to: 'checkout' },
          { from: 'admin', to: 'manage' },
          { from: 'checkout', to: 'browse', kind: 'include' },
        ],
      }}
      viewBox="0 0 520 300"
      width={520}
      height={300}
      title="Use case"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-actor]').length).toBe(2);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-usecase]').length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-boundary]').length).toBe(1);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="use-case"]')!;
    await expect(root.textContent).toContain('Checkout');
  },
};

// ── C4DynamicDiagram (VT-113) ─────────────────────────────────────────
export const C4Dynamic: Story = {
  render: () => (
    <C4DynamicDiagram
      data={{
        elements: [
          { id: 'spa', name: 'SPA', technology: 'React', x: 30, y: 40, width: 140, height: 70, level: 'l2' },
          { id: 'api', name: 'API', technology: 'Node', x: 260, y: 40, width: 140, height: 70, level: 'l2' },
          { id: 'db', name: 'DB', technology: 'Postgres', x: 260, y: 180, width: 140, height: 70, level: 'l2' },
        ],
        steps: [
          { id: 's1', from: 'spa', to: 'api', order: 1, label: 'GET /orders' },
          { id: 's2', from: 'api', to: 'db', order: 2, label: 'query' },
        ],
      }}
      viewBox="0 0 440 280"
      width={440}
      height={280}
      title="C4 dynamic"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-c4-box]').length).toBe(3);
    // 순번 배지 = step 수
    const orders = canvasElement.querySelectorAll('[data-bbangto-viz-order]');
    await expect(orders.length).toBe(2);
    await expect(canvasElement.textContent).toContain('GET /orders');
  },
};

// ── C4SystemLandscapeDiagram (VT-114) ─────────────────────────────────
export const C4Landscape: Story = {
  render: () => (
    <C4SystemLandscapeDiagram
      data={{
        systems: [
          { id: 'shop', name: 'Shop', x: 40, y: 60, width: 150, height: 80, level: 'l1' },
          { id: 'pay', name: 'Payments', x: 250, y: 60, width: 150, height: 80, level: 'l1' },
          { id: 'crm', name: 'CRM', x: 250, y: 190, width: 150, height: 80, level: 'l1', external: true },
        ],
        boundaries: [{ x: 20, y: 30, width: 390, height: 130, label: 'Enterprise' }],
        relationships: [
          { id: 'r1', from: 'shop', to: 'pay', label: 'uses' },
          { id: 'r2', from: 'shop', to: 'crm', label: 'syncs' },
        ],
      }}
      viewBox="0 0 440 300"
      width={440}
      height={300}
      title="C4 landscape"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    // shop/pay = C4Box(2), crm = external node
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-c4-box]').length).toBe(2);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-boundary]').length).toBe(1);
    await expect(canvasElement.textContent).toContain('CRM');
  },
};

// ── DataFlowDiagram (VT-126) ──────────────────────────────────────────
export const DataFlow: Story = {
  render: () => (
    <DataFlowDiagram
      data={{
        nodes: [
          { id: 'user', label: 'User', kind: 'external', x: 30, y: 100, width: 90, height: 50 },
          { id: 'proc', label: 'Validate', kind: 'process', x: 200, y: 95, width: 90, height: 60 },
          { id: 'store', label: 'Orders', kind: 'store', x: 370, y: 100, width: 110, height: 50 },
        ],
        flows: [
          { from: 'user', to: 'proc', label: 'request' },
          { from: 'proc', to: 'store', label: 'write' },
        ],
        boundaries: [{ id: 'tb', label: 'Trust boundary', x: 170, y: 60, width: 150, height: 150 }],
      }}
      viewBox="0 0 510 260"
      width={510}
      height={260}
      title="Data flow"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-dfd-node]').length).toBe(3);
    await expect(canvasElement.querySelector('[data-bbangto-viz-dfd-node-kind="store"]')).toBeTruthy();
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-boundary]').length).toBe(1);
  },
};

// ── ActivityDiagram (VT-106, 🔶→✅ dedicated) ─────────────────────────
export const Activity: Story = {
  render: () => (
    <ActivityDiagram
      data={{
        nodes: [
          { id: 'start', kind: 'start', x: 100, y: 20, width: 20, height: 20 },
          { id: 'a1', kind: 'action', label: 'Receive', x: 60, y: 70, width: 100, height: 44 },
          { id: 'd1', kind: 'decision', label: 'Valid?', x: 70, y: 140, width: 80, height: 60 },
          { id: 'a2', kind: 'action', label: 'Process', x: 200, y: 150, width: 100, height: 44 },
          { id: 'a3', kind: 'action', label: 'Reject', x: 60, y: 230, width: 100, height: 44 },
          { id: 'end', kind: 'end', x: 240, y: 240, width: 22, height: 22 },
        ],
        edges: [
          { from: 'start', to: 'a1' },
          { from: 'a1', to: 'd1' },
          { from: 'd1', to: 'a2', label: 'yes' },
          { from: 'd1', to: 'a3', label: 'no' },
          { from: 'a2', to: 'end' },
        ],
      }}
      viewBox="0 0 340 300"
      width={340}
      height={300}
      title="Activity"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelector('[data-bbangto-viz-activity-kind="start"]')).toBeTruthy();
    await expect(canvasElement.querySelector('[data-bbangto-viz-activity-kind="end"]')).toBeTruthy();
    await expect(canvasElement.querySelector('[data-bbangto-viz-activity-kind="decision"]')).toBeTruthy();
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-activity-kind="action"]').length).toBe(3);
    await expect(canvasElement.textContent).toContain('Process');
  },
};

// ── ConceptMap (VT-302, 🔶→✅ dedicated) ──────────────────────────────
export const ConceptMapBasic: Story = {
  render: () => (
    <ConceptMap
      data={{
        nodes: [
          { id: 'water', label: 'Water', x: 40, y: 30, width: 110, height: 46 },
          { id: 'cloud', label: 'Cloud', x: 260, y: 30, width: 110, height: 46 },
          { id: 'rain', label: 'Rain', x: 260, y: 170, width: 110, height: 46 },
          { id: 'river', label: 'River', x: 40, y: 170, width: 110, height: 46 },
        ],
        links: [
          { from: 'water', to: 'cloud', label: 'evaporates to' },
          { from: 'cloud', to: 'rain', label: 'condenses as' },
          { from: 'rain', to: 'river', label: 'flows into' },
          { from: 'river', to: 'water', label: 'returns' },
        ],
      }}
      viewBox="0 0 420 250"
      width={420}
      height={250}
      title="Concept map"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-concept-node]').length).toBe(4);
    // 라벨 붙은 연결선 = concept map의 핵심(Mindmap과 차별점)
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-edge-label]').length).toBe(4);
    await expect(canvasElement.textContent).toContain('evaporates to');
  },
};

// ── Fishbone (VT-706) ─────────────────────────────────────────────────
export const FishboneBasic: Story = {
  render: () => (
    <Fishbone
      data={{
        problem: 'Late delivery',
        categories: [
          { id: 'people', label: 'People', causes: ['Understaffed', 'Training'] },
          { id: 'process', label: 'Process', causes: ['Manual steps'] },
          { id: 'tools', label: 'Tools', causes: ['Slow CI'] },
          { id: 'env', label: 'Environment', causes: ['Flaky infra'] },
        ],
      }}
      viewBox="0 0 560 280"
      width={560}
      height={280}
      title="Fishbone"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-bone]').length).toBe(4);
    await expect(canvasElement.querySelector('[data-bbangto-viz-fishbone-head]')).toBeTruthy();
    await expect(canvasElement.textContent).toContain('Late delivery');
    await expect(canvasElement.textContent).toContain('People');
    await expect(canvasElement.textContent).toContain('Slow CI');
  },
};
