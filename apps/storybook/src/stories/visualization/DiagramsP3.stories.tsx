import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  UMLPackageDiagram,
  DMNDiagram,
  BPMNCollaborationDiagram,
  ArchiMateViewpointDiagram,
  WorkBreakdownStructure,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Templates/A-P3',
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

// ── UMLPackageDiagram (VT-102) ────────────────────────────────────────
export const UMLPackage: Story = {
  render: () => (
    <UMLPackageDiagram
      data={{
        packages: [
          { id: 'ui', label: 'ui', x: 30, y: 30, width: 130, height: 80 },
          { id: 'domain', label: 'domain', x: 250, y: 30, width: 130, height: 80 },
          { id: 'infra', label: 'infra', x: 140, y: 180, width: 130, height: 80 },
        ],
        dependencies: [
          { id: 'd1', from: 'ui', to: 'domain', kind: 'import' },
          { id: 'd2', from: 'domain', to: 'infra', kind: 'access' },
        ],
      }}
      viewBox="0 0 420 300"
      width={420}
      height={300}
      title="UML package"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-package]').length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-node-shape="folder"]').length).toBe(3);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="uml-package"]')!;
    await expect(root.textContent).toContain('import');
  },
};

// ── DMNDiagram (VT-124) ───────────────────────────────────────────────
export const DMNDecisionRequirements: Story = {
  render: () => (
    <DMNDiagram
      data={{
        nodes: [
          { id: 'dec', kind: 'decision', label: 'Approve loan', x: 160, y: 30, width: 140, height: 56 },
          { id: 'inp', kind: 'inputData', label: 'Credit score', x: 40, y: 180, width: 130, height: 50 },
          { id: 'ks', kind: 'knowledgeSource', label: 'Risk policy', x: 300, y: 180, width: 120, height: 60 },
          { id: 'bkm', kind: 'bkm', label: 'Scorecard', x: 170, y: 180, width: 120, height: 56 },
        ],
        requirements: [
          { id: 'r1', from: 'inp', to: 'dec', kind: 'information' },
          { id: 'r2', from: 'bkm', to: 'dec', kind: 'knowledge' },
          { id: 'r3', from: 'ks', to: 'bkm', kind: 'authority' },
        ],
      }}
      viewBox="0 0 460 280"
      width={460}
      height={280}
      title="DMN DRD"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-dmn-node]').length).toBe(4);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-dmn-node-kind="knowledgeSource"]').length).toBe(1);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-dmn-node-kind="bkm"]').length).toBe(1);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="dmn"]')!;
    await expect(root.textContent).toContain('Approve loan');
  },
};

// ── BPMNCollaborationDiagram (VT-123) ─────────────────────────────────
export const BPMNCollaboration: Story = {
  render: () => (
    <BPMNCollaborationDiagram
      data={{
        pools: [
          { id: 'customer', label: 'Customer', x: 20, y: 20, width: 520, height: 90 },
          { id: 'shop', label: 'Shop', x: 20, y: 130, width: 520, height: 90 },
        ],
        events: [
          { id: 'start', x: 90, y: 65, kind: 'start' },
          { id: 'end', x: 500, y: 175, kind: 'end' },
        ],
        tasks: [
          { id: 'order', x: 160, y: 45, width: 100, height: 40, label: 'Place order' },
          { id: 'fulfil', x: 300, y: 155, width: 100, height: 40, label: 'Fulfil order' },
        ],
        gateways: [{ id: 'g1', x: 430, y: 175, kind: 'exclusive' }],
        sequenceFlows: [
          { id: 's1', from: 'start', to: 'order' },
          { id: 's2', from: 'fulfil', to: 'g1' },
          { id: 's3', from: 'g1', to: 'end' },
        ],
        messageFlows: [{ id: 'm1', from: 'order', to: 'fulfil', label: 'order msg' }],
      }}
      viewBox="0 0 560 240"
      width={560}
      height={240}
      title="BPMN collaboration"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-pool]').length).toBe(2);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-message-flow]').length).toBe(1);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-bpmn-task]').length).toBe(2);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="bpmn-collaboration"]')!;
    await expect(root.textContent).toContain('Place order');
  },
};

// ── ArchiMateViewpointDiagram (VT-121) ────────────────────────────────
export const ArchiMateMotivation: Story = {
  render: () => (
    <ArchiMateViewpointDiagram
      viewpoint="motivation"
      data={{
        elements: [
          { id: 'driver', name: 'Cost pressure', kind: 'Driver', x: 40, y: 40, width: 140, height: 60 },
          { id: 'goal', name: 'Reduce cost', kind: 'Goal', x: 260, y: 40, width: 140, height: 60 },
          { id: 'req', name: 'Automate billing', kind: 'Requirement', x: 260, y: 170, width: 140, height: 60 },
        ],
        relationships: [
          { id: 'r1', from: 'driver', to: 'goal', kind: 'influence' },
          { id: 'r2', from: 'goal', to: 'req', kind: 'realization' },
        ],
      }}
      viewBox="0 0 440 280"
      width={440}
      height={280}
      title="ArchiMate motivation"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-archimate-element]').length).toBe(3);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="archimate-viewpoint"]')!;
    await expect(root.getAttribute('data-bbangto-viz-archimate-viewpoint')).toBe('motivation');
    await expect(root.textContent).toContain('Reduce cost');
  },
};

// ── WorkBreakdownStructure (VT-307) ───────────────────────────────────
export const WBS: Story = {
  render: () => (
    <WorkBreakdownStructure
      data={{
        root: {
          id: 'proj',
          label: 'Website',
          children: [
            { id: 'design', label: 'Design', children: [{ id: 'wf', label: 'Wireframe' }, { id: 'ui', label: 'UI kit' }] },
            { id: 'build', label: 'Build', children: [{ id: 'fe', label: 'Frontend' }] },
          ],
        },
      }}
      viewBox="0 0 620 320"
      width={620}
      height={320}
      title="Work breakdown structure"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-wbs-node]').length).toBe(6);
    // WBS 십진 번호 병기.
    const numbers = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-wbs-number]')).map((n) => n.textContent);
    await expect(numbers).toContain('1');
    await expect(numbers).toContain('1.1.1');
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="wbs"]')!;
    await expect(root.textContent).toContain('Wireframe');
  },
};
