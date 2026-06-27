import type { Meta, StoryObj } from '@storybook/react';
import {
  DiagramCanvas,
  DiagramProvider,
  blueprintTheme,
  Node,
  Edge,
  Flowchart,
  BlockDiagram,
  Mindmap,
  TimelineDiagram,
  RequirementDiagram,
  KanbanBoard,
} from '@centurio1987/bbangto-ui-diagram';
import { expect } from 'storybook/test';

const meta = {
  title: 'Diagram/Presets/G1',
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

// ── shared data fixtures ──────────────────────────────────────────────
const FLOWCHART_NODES = [
  { id: 'n1', x: 50,  y: 40,  width: 120, height: 60, label: 'Start',    shape: 'stadium' as const, fill: '#C5B6EE' },
  { id: 'n2', x: 240, y: 40,  width: 120, height: 60, label: 'Process',  shape: 'rect'    as const, fill: '#87B79A' },
  { id: 'n3', x: 240, y: 170, width: 120, height: 60, label: 'Decision', shape: 'diamond' as const, fill: '#F0C5DA' },
];
const FLOWCHART_EDGES = [
  { id: 'e1', from: 'n1', to: 'n2' },
  { id: 'e2', from: 'n2', to: 'n3' },
];

// ──────────────────────────────────────────────────────────────────────
// 1. Flowchart — data mode
// ──────────────────────────────────────────────────────────────────────
export const FlowchartDataMode: Story = {
  render: () => (
    <Flowchart
      data={{ nodes: FLOWCHART_NODES, edges: FLOWCHART_EDGES }}
      viewBox="0 0 500 280"
      width={500}
      height={280}
      title="Flowchart data mode"
    />
  ),
  play: async ({ canvasElement }) => {
    const nodes = canvasElement.querySelectorAll('[data-bbangto-diagram-node]');
    await expect(nodes.length).toBe(3);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);

    // edge d attribute must not be empty
    const firstEdge = edges[0] as SVGPathElement;
    const d = firstEdge.getAttribute('d');
    await expect(d).not.toBeNull();
    await expect(d!.length).toBeGreaterThan(4);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 2. Flowchart — children mode (equal node/edge count to data mode)
// ──────────────────────────────────────────────────────────────────────
export const FlowchartChildrenMode: Story = {
  render: () => (
    <Flowchart viewBox="0 0 500 280" width={500} height={280} title="Flowchart children mode">
      <Node id="n1" x={50}  y={40}  width={120} height={60} shape="stadium" fill="#C5B6EE" stroke="#111" />
      <Node id="n2" x={240} y={40}  width={120} height={60} shape="rect"    fill="#87B79A" stroke="#111" />
      <Node id="n3" x={240} y={170} width={120} height={60} shape="diamond" fill="#F0C5DA" stroke="#111" />
      <Edge from="n1" to="n2" markerEnd="arrow" />
      <Edge from="n2" to="n3" markerEnd="arrow" />
    </Flowchart>
  ),
  play: async ({ canvasElement }) => {
    const nodes = canvasElement.querySelectorAll('[data-bbangto-diagram-node]');
    await expect(nodes.length).toBe(3);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);

    const firstEdge = edges[0] as SVGPathElement;
    const d = firstEdge.getAttribute('d');
    await expect(d).not.toBeNull();
    await expect(d!.length).toBeGreaterThan(4);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 3. BlockDiagram — data mode, all rect nodes
// ──────────────────────────────────────────────────────────────────────
export const BlockDiagramDataMode: Story = {
  render: () => (
    <BlockDiagram
      data={{
        nodes: [
          { id: 'b1', x: 20,  y: 50, width: 120, height: 60, label: 'Auth'     },
          { id: 'b2', x: 180, y: 50, width: 120, height: 60, label: 'API'      },
          { id: 'b3', x: 340, y: 50, width: 120, height: 60, label: 'Database' },
        ],
        edges: [
          { id: 'be1', from: 'b1', to: 'b2' },
          { id: 'be2', from: 'b2', to: 'b3' },
        ],
      }}
      viewBox="0 0 500 170"
      width={500}
      height={170}
      title="Block diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    const nodes = canvasElement.querySelectorAll('[data-bbangto-diagram-node]');
    await expect(nodes.length).toBe(3);

    // All shapes are rect in BlockDiagram
    const rectShapes = canvasElement.querySelectorAll('[data-bbangto-diagram-node-shape="rect"]');
    await expect(rectShapes.length).toBe(3);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 4. Mindmap — curved edges, no arrowheads
// ──────────────────────────────────────────────────────────────────────
export const MindmapDataMode: Story = {
  render: () => (
    <Mindmap
      data={{
        nodes: [
          { id: 'root',   x: 220, y: 100, width: 100, height: 50, label: 'Mindmap', level: 0 },
          { id: 'b1',     x: 50,  y: 40,  width: 100, height: 40, label: 'Topic A',  level: 1 },
          { id: 'b2',     x: 50,  y: 170, width: 100, height: 40, label: 'Topic B',  level: 1 },
          { id: 'b3',     x: 400, y: 40,  width: 100, height: 40, label: 'Topic C',  level: 1 },
          { id: 'b4',     x: 400, y: 170, width: 100, height: 40, label: 'Topic D',  level: 1 },
        ],
        edges: [
          { id: 'me1', from: 'root', to: 'b1' },
          { id: 'me2', from: 'root', to: 'b2' },
          { id: 'me3', from: 'root', to: 'b3' },
          { id: 'me4', from: 'root', to: 'b4' },
        ],
      }}
      viewBox="0 0 560 260"
      width={560}
      height={260}
      title="Mindmap"
    />
  ),
  play: async ({ canvasElement }) => {
    const nodes = canvasElement.querySelectorAll('[data-bbangto-diagram-node]');
    await expect(nodes.length).toBe(5);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(4);

    // Mindmap edges have no arrowhead marker-end
    const firstEdge = edges[0] as SVGPathElement;
    const markerEnd = firstEdge.getAttribute('marker-end');
    await expect(markerEnd).toBeNull();
  },
};

// ──────────────────────────────────────────────────────────────────────
// 5. TimelineDiagram — axis + events
// ──────────────────────────────────────────────────────────────────────
export const TimelineDiagramBasic: Story = {
  render: () => (
    <TimelineDiagram
      data={{
        axisY: 110,
        events: [
          { id: 'ev1', x: 80,  y: 20, width: 110, height: 50, label: 'Phase 1', date: '2024 Q1' },
          { id: 'ev2', x: 230, y: 20, width: 110, height: 50, label: 'Phase 2', date: '2024 Q2' },
          { id: 'ev3', x: 380, y: 20, width: 110, height: 50, label: 'Phase 3', date: '2024 Q3' },
        ],
      }}
      viewBox="0 0 500 160"
      width={500}
      height={160}
      title="Timeline"
    />
  ),
  play: async ({ canvasElement }) => {
    const axis = canvasElement.querySelector('[data-bbangto-diagram-timeline-axis]');
    await expect(axis).not.toBeNull();

    const nodes = canvasElement.querySelectorAll('[data-bbangto-diagram-node]');
    await expect(nodes.length).toBe(3);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 6. RequirementDiagram — requirements + relations
// ──────────────────────────────────────────────────────────────────────
export const RequirementDiagramBasic: Story = {
  render: () => (
    <RequirementDiagram
      data={{
        requirements: [
          { id: 'r1', x: 20,  y: 20, width: 160, height: 100, name: 'Authenticate',   text: 'User must log in',     kind: 'requirement'            },
          { id: 'r2', x: 220, y: 20, width: 160, height: 100, name: 'Authorize',      text: 'Role-based access',    kind: 'functionalRequirement'  },
          { id: 'r3', x: 420, y: 20, width: 160, height: 100, name: 'ResponseTime',   text: 'p99 < 200ms',          kind: 'performanceRequirement' },
        ],
        edges: [
          { id: 're1', from: 'r1', to: 'r2', kind: 'derives'   },
          { id: 're2', from: 'r2', to: 'r3', kind: 'satisfies' },
        ],
      }}
      viewBox="0 0 620 160"
      width={620}
      height={160}
      title="Requirement diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    const reqs = canvasElement.querySelectorAll('[data-bbangto-diagram-requirement]');
    await expect(reqs.length).toBe(3);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);

    // requirement name text is present
    const firstName = reqs[0]?.querySelector('[data-bbangto-diagram-requirement-name]');
    await expect(firstName).not.toBeNull();
    await expect(firstName?.textContent).toBe('Authenticate');
  },
};

// ──────────────────────────────────────────────────────────────────────
// 7. KanbanBoard — lanes + cards
// ──────────────────────────────────────────────────────────────────────
export const KanbanBoardBasic: Story = {
  render: () => (
    <KanbanBoard
      data={{
        columns: [
          { id: 'col1', x: 10,  y: 10, width: 150, height: 340, title: 'Todo'       },
          { id: 'col2', x: 170, y: 10, width: 150, height: 340, title: 'In Progress' },
          { id: 'col3', x: 330, y: 10, width: 150, height: 340, title: 'Done'        },
        ],
        cards: [
          { id: 'c1', x: 18,  y: 54, width: 134, height: 60, label: 'Task A'  },
          { id: 'c2', x: 18,  y: 126, width: 134, height: 60, label: 'Task B' },
          { id: 'c3', x: 178, y: 54, width: 134, height: 60, label: 'Task C'  },
          { id: 'c4', x: 338, y: 54, width: 134, height: 60, label: 'Task D'  },
        ],
      }}
      viewBox="0 0 490 360"
      width={490}
      height={360}
      title="Kanban board"
    />
  ),
  play: async ({ canvasElement }) => {
    const lanes = canvasElement.querySelectorAll('[data-bbangto-diagram-lane]');
    await expect(lanes.length).toBe(3);

    const cards = canvasElement.querySelectorAll('[data-bbangto-diagram-node]');
    await expect(cards.length).toBe(4);
  },
};
