import type { Meta, StoryObj } from '@storybook/react';
import {
  DiagramCanvas,
  DiagramProvider,
  blueprintTheme,
  SequenceDiagram,
  ZenUMLDiagram,
  BPMNDiagram,
  ArchiMateBusinessDiagram,
  ArchiMateApplicationDiagram,
  ArchiMateTechnologyDiagram,
  SysMLBlockDiagram,
} from '@centurio1987/diagram';
import { expect } from 'storybook/test';

const meta = {
  title: 'Diagram/Presets/G4',
  component: DiagramCanvas,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story: React.ComponentType) => (
      <DiagramProvider theme={blueprintTheme}>
        <Story />
      </DiagramProvider>
    ),
  ],
} satisfies Meta<typeof DiagramCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

// ──────────────────────────────────────────────────────────────────────
// 1. SequenceDiagram — lifelines + messages + activation bar
// ──────────────────────────────────────────────────────────────────────
export const SequenceDiagramBasic: Story = {
  render: () => (
    <SequenceDiagram
      data={{
        participants: [
          { id: 'browser', x: 80,  name: 'Browser', width: 90 },
          { id: 'server',  x: 260, name: 'Server',  width: 90 },
          { id: 'db',      x: 440, name: 'DB',       width: 90 },
        ],
        messages: [
          { id: 'm1', from: 'browser', to: 'server', y: 90,  label: 'POST /api/login', kind: 'sync'   },
          { id: 'm2', from: 'server',  to: 'db',     y: 130, label: 'SELECT *',        kind: 'sync'   },
          { id: 'm3', from: 'db',      to: 'server', y: 170, label: 'rows',            kind: 'return' },
          { id: 'm4', from: 'server',  to: 'browser',y: 210, label: '200 OK',          kind: 'return' },
        ],
        activations: [
          { participantId: 'server', startY: 90, endY: 210 },
        ],
      }}
      lifelineHeight={260}
      viewBox="0 0 560 310"
      width={560}
      height={310}
      title="Sequence Diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    const lifelines = canvasElement.querySelectorAll('[data-bbangto-diagram-lifeline]');
    await expect(lifelines.length).toBe(3);

    const messages = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(messages.length).toBe(4);

    const activations = canvasElement.querySelectorAll('[data-bbangto-diagram-activation]');
    await expect(activations.length).toBe(1);

    // messages ordered by y
    const firstMsg = messages[0] as SVGPathElement;
    await expect(firstMsg.getAttribute('d')!.length).toBeGreaterThan(4);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 2. ZenUMLDiagram — SequenceDiagram reskin
// ──────────────────────────────────────────────────────────────────────
export const ZenUMLDiagramBasic: Story = {
  render: () => (
    <ZenUMLDiagram
      data={{
        participants: [
          { id: 'client', x: 80,  name: 'Client', width: 90 },
          { id: 'api',    x: 260, name: 'API',    width: 90 },
        ],
        messages: [
          { id: 'm1', from: 'client', to: 'api', y: 90,  label: 'request()', kind: 'sync'   },
          { id: 'm2', from: 'api', to: 'client', y: 130, label: 'response()', kind: 'return' },
        ],
      }}
      lifelineHeight={180}
      viewBox="0 0 380 230"
      width={380}
      height={230}
      title="ZenUML Diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    const lifelines = canvasElement.querySelectorAll('[data-bbangto-diagram-lifeline]');
    await expect(lifelines.length).toBe(2);

    const messages = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(messages.length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 3. BPMNDiagram — pool/lane + event + task + gateway
// ──────────────────────────────────────────────────────────────────────
export const BPMNDiagramBasic: Story = {
  render: () => (
    <BPMNDiagram
      data={{
        lanes: [
          { x: 0, y: 0, width: 520, height: 120, label: 'Customer'  },
          { x: 0, y: 120, width: 520, height: 120, label: 'System'  },
        ],
        events: [
          { id: 'start', x: 50,  y: 60,  kind: 'start',        label: 'Order\nPlaced' },
          { id: 'end',   x: 470, y: 60,  kind: 'end',          label: 'Completed' },
        ],
        tasks: [
          { id: 'pay',     x: 120, y: 160, width: 100, height: 60, label: 'Process\nPayment' },
          { id: 'fulfill', x: 300, y: 160, width: 100, height: 60, label: 'Fulfil\nOrder' },
        ],
        gateways: [
          { id: 'gw1', x: 240, y: 60, kind: 'exclusive', label: 'Valid?' },
        ],
        flows: [
          { id: 'f1', from: 'start', to: 'gw1'    },
          { id: 'f2', from: 'gw1',   to: 'pay'    },
          { id: 'f3', from: 'pay',   to: 'fulfill' },
          { id: 'f4', from: 'fulfill', to: 'end'  },
        ],
      }}
      viewBox="0 0 520 240"
      width={520}
      height={240}
      title="BPMN Diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    const lanes = canvasElement.querySelectorAll('[data-bbangto-diagram-lane]');
    await expect(lanes.length).toBe(2);

    const events = canvasElement.querySelectorAll('[data-bbangto-diagram-bpmn-event]');
    await expect(events.length).toBe(2);

    const tasks = canvasElement.querySelectorAll('[data-bbangto-diagram-bpmn-task]');
    await expect(tasks.length).toBe(2);

    const gateways = canvasElement.querySelectorAll('[data-bbangto-diagram-bpmn-gateway]');
    await expect(gateways.length).toBe(1);

    const flows = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(flows.length).toBe(4);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 4. ArchiMateBusinessDiagram — business layer band + elements
// ──────────────────────────────────────────────────────────────────────
export const ArchiMateBusinessDiagramBasic: Story = {
  render: () => (
    <ArchiMateBusinessDiagram
      data={{
        elements: [
          { id: 'role1',    x: 20,  y: 40, width: 120, height: 70, name: 'Customer',   kind: 'role'    },
          { id: 'process1', x: 190, y: 40, width: 120, height: 70, name: 'Order Proc', kind: 'process' },
          { id: 'obj1',     x: 360, y: 40, width: 120, height: 70, name: 'Contract',   kind: 'object'  },
        ],
        relationships: [
          { id: 'r1', from: 'role1',    to: 'process1', kind: 'triggering' },
          { id: 'r2', from: 'process1', to: 'obj1',     kind: 'association' },
        ],
      }}
      viewBox="0 0 520 150"
      width={520}
      height={150}
      title="ArchiMate Business"
    />
  ),
  play: async ({ canvasElement }) => {
    const layer = canvasElement.querySelector('[data-bbangto-diagram-archimate-layer="business"]');
    await expect(layer).not.toBeNull();

    const elements = canvasElement.querySelectorAll('[data-bbangto-diagram-archimate-element]');
    await expect(elements.length).toBe(3);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 5. ArchiMateApplicationDiagram — application layer band
// ──────────────────────────────────────────────────────────────────────
export const ArchiMateApplicationDiagramBasic: Story = {
  render: () => (
    <ArchiMateApplicationDiagram
      data={{
        elements: [
          { id: 'comp1', x: 20,  y: 40, width: 130, height: 70, name: 'Web Frontend',  kind: 'component' },
          { id: 'comp2', x: 200, y: 40, width: 130, height: 70, name: 'API Service',   kind: 'component' },
        ],
        relationships: [
          { id: 'r1', from: 'comp1', to: 'comp2', kind: 'serving' },
        ],
      }}
      viewBox="0 0 380 150"
      width={380}
      height={150}
      title="ArchiMate Application"
    />
  ),
  play: async ({ canvasElement }) => {
    const layer = canvasElement.querySelector('[data-bbangto-diagram-archimate-layer="application"]');
    await expect(layer).not.toBeNull();

    const elements = canvasElement.querySelectorAll('[data-bbangto-diagram-archimate-element]');
    await expect(elements.length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 6. ArchiMateTechnologyDiagram — technology layer band
// ──────────────────────────────────────────────────────────────────────
export const ArchiMateTechnologyDiagramBasic: Story = {
  render: () => (
    <ArchiMateTechnologyDiagram
      data={{
        elements: [
          { id: 'node1', x: 20,  y: 40, width: 130, height: 70, name: 'App Server', kind: 'node'   },
          { id: 'node2', x: 200, y: 40, width: 130, height: 70, name: 'DB Server',  kind: 'device' },
        ],
        relationships: [
          { id: 'r1', from: 'node1', to: 'node2', kind: 'association' },
        ],
      }}
      viewBox="0 0 380 150"
      width={380}
      height={150}
      title="ArchiMate Technology"
    />
  ),
  play: async ({ canvasElement }) => {
    const layer = canvasElement.querySelector('[data-bbangto-diagram-archimate-layer="technology"]');
    await expect(layer).not.toBeNull();

    const elements = canvasElement.querySelectorAll('[data-bbangto-diagram-archimate-element]');
    await expect(elements.length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 7. SysMLBlockDiagram — ClassBox with «block» stereotype
// ──────────────────────────────────────────────────────────────────────
export const SysMLBlockDiagramBasic: Story = {
  render: () => (
    <SysMLBlockDiagram
      data={{
        blocks: [
          {
            id: 'vehicle', x: 20, y: 20, width: 160, height: 150, name: 'Vehicle',
            stereotype: 'block',
            values:     ['+ mass: kg', '+ speed: m/s'],
            operations: ['+ accelerate(): void'],
          },
          {
            id: 'engine', x: 240, y: 20, width: 160, height: 150, name: 'Engine',
            stereotype: 'block',
            values:     ['+ power: kW'],
            operations: ['+ start(): void'],
          },
        ],
        relationships: [
          { id: 'r1', from: 'vehicle', to: 'engine', kind: 'composition' },
        ],
      }}
      viewBox="0 0 440 210"
      width={440}
      height={210}
      title="SysML Block Diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    const boxes = canvasElement.querySelectorAll('[data-bbangto-diagram-class-box]');
    await expect(boxes.length).toBe(2);

    const stereotypes = canvasElement.querySelectorAll('[data-bbangto-diagram-sysml-stereotype]');
    await expect(stereotypes.length).toBe(2);
    await expect((stereotypes[0] as SVGTextElement).textContent).toContain('block');

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(1);
  },
};
