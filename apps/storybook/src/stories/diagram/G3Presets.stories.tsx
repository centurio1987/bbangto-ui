import type { Meta, StoryObj } from '@storybook/react';
import {
  DiagramCanvas,
  DiagramProvider,
  blueprintTheme,
  ClassDiagram,
  StateDiagram,
  ERDiagram,
} from '@centurio1987/bbangto-ui-diagram';
import { expect } from 'storybook/test';

const meta = {
  title: 'Diagram/Presets/G3',
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
// 1. ClassDiagram — ClassBox nodes + inheritance + aggregation
// ──────────────────────────────────────────────────────────────────────
export const ClassDiagramBasic: Story = {
  render: () => (
    <ClassDiagram
      data={{
        classes: [
          {
            id: 'animal', x: 20, y: 20, width: 160, height: 130, name: 'Animal',
            attributes: ['# name: string'], methods: ['+ speak(): void'],
          },
          {
            id: 'dog', x: 20, y: 210, width: 160, height: 130, name: 'Dog',
            attributes: ['+ breed: string'], methods: ['+ speak(): void'],
          },
          {
            id: 'owner', x: 230, y: 20, width: 160, height: 100, name: 'Owner',
            attributes: ['+ name: string'], methods: [],
          },
        ],
        relationships: [
          { id: 'r1', from: 'dog',   to: 'animal', kind: 'inheritance' },
          { id: 'r2', from: 'owner', to: 'dog',    kind: 'aggregation' },
        ],
      }}
      viewBox="0 0 420 380"
      width={420}
      height={380}
      title="Class Diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    // 3 class boxes
    const boxes = canvasElement.querySelectorAll('[data-bbangto-diagram-class-box]');
    await expect(boxes.length).toBe(3);

    // Each box has 3 sections
    const sections = canvasElement.querySelectorAll('[data-bbangto-diagram-class-section]');
    await expect(sections.length).toBe(9); // 3 × 3

    // 2 edges
    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);

    // inheritance edge has triangleOpen marker
    const inheritEdge = edges[0] as SVGPathElement;
    await expect(inheritEdge.getAttribute('marker-end')).toContain('triangle-open');
  },
};

// ──────────────────────────────────────────────────────────────────────
// 2. StateDiagram — start/end pseudo-states + normal + transitions
// ──────────────────────────────────────────────────────────────────────
export const StateDiagramBasic: Story = {
  render: () => (
    <StateDiagram
      data={{
        states: [
          { id: 's0',   x: 80,  y: 10,  variant: 'start' },
          { id: 's1',   x: 40,  y: 70,  width: 120, height: 50, title: 'Idle',    variant: 'normal' },
          { id: 's2',   x: 40,  y: 180, width: 120, height: 50, title: 'Running', variant: 'normal' },
          { id: 'send', x: 80,  y: 290, variant: 'end'   },
        ],
        transitions: [
          { id: 't1', from: 's0', to: 's1' },
          { id: 't2', from: 's1', to: 's2', label: 'start()' },
          { id: 't3', from: 's2', to: 'send', label: 'finish()' },
        ],
      }}
      viewBox="0 0 220 360"
      width={220}
      height={360}
      title="State Diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    const start = canvasElement.querySelector('[data-bbangto-diagram-state="start"]');
    await expect(start).not.toBeNull();

    const end = canvasElement.querySelector('[data-bbangto-diagram-state="end"]');
    await expect(end).not.toBeNull();

    const normals = canvasElement.querySelectorAll('[data-bbangto-diagram-state="normal"]');
    await expect(normals.length).toBe(2);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(3);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 3. ERDiagram — EntityTable nodes + crow's-foot edges
// ──────────────────────────────────────────────────────────────────────
export const ERDiagramBasic: Story = {
  render: () => (
    <ERDiagram
      data={{
        entities: [
          {
            id: 'user', x: 20, y: 30, width: 170, name: 'User',
            attributes: [
              { name: 'id',    type: 'int',     key: 'PK' },
              { name: 'email', type: 'varchar'            },
              { name: 'name',  type: 'varchar'            },
            ],
          },
          {
            id: 'order', x: 260, y: 30, width: 170, name: 'Order',
            attributes: [
              { name: 'id',       type: 'int',     key: 'PK' },
              { name: 'total',    type: 'decimal'            },
              { name: 'user_id',  type: 'int',     key: 'FK' },
            ],
          },
        ],
        relationships: [
          { id: 'r1', from: 'user', to: 'order', fromCardinality: 'one', toCardinality: 'many' },
        ],
      }}
      viewBox="0 0 460 180"
      width={460}
      height={180}
      title="ER Diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    // 2 entity tables
    const tables = canvasElement.querySelectorAll('[data-bbangto-diagram-entity-table]');
    await expect(tables.length).toBe(2);

    // entity rows exist
    const rows = canvasElement.querySelectorAll('[data-bbangto-diagram-entity-row]');
    await expect(rows.length).toBeGreaterThan(0);

    // relationship edge
    const edge = canvasElement.querySelector('[data-bbangto-diagram-edge]');
    await expect(edge).not.toBeNull();

    // crow's-foot marker on edge
    await expect(edge!.getAttribute('marker-end')).toContain('er-many');
  },
};
