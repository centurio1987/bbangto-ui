import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  PersonNode,
  ExternalNode,
  ContainerNode,
  DatabaseNode,
  QueueNode,
  DecisionNode,
  ProcessNode,
  ClassBox,
  StateNode,
  EntityTable,
  C4Box,
  MockupNode,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';

const meta = {
  title: 'VISUALIZATION/Molecules',
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

// ──────────────────────────────────────────────
// 1. SemanticFills — molecule fill from token
// ──────────────────────────────────────────────
export const SemanticFills: Story = {
  render: () => (
    <Canvas viewBox="0 0 800 160" width={800} height={160} title="Semantic nodes">
      <PersonNode id="p" x={10} y={10} width={100} height={140} title="User" />
      <ExternalNode id="e" x={120} y={10} width={100} height={140} title="External" />
      <ContainerNode id="c" x={230} y={10} width={100} height={140} title="Container" />
      <DatabaseNode id="d" x={340} y={10} width={100} height={140} title="Database" />
      <QueueNode id="q" x={450} y={10} width={100} height={140} title="Queue" />
      <DecisionNode id="dec" x={560} y={10} width={100} height={140} title="Decision" />
      <ProcessNode id="proc" x={670} y={10} width={100} height={140} title="Process" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const person = canvasElement.querySelector('[data-bbangto-viz-molecule="person"]');
    await expect(person).not.toBeNull();

    // fill resolves to blueprint person color: #C5B6EE = rgb(197, 182, 238)
    const personShape = person?.querySelector('[data-bbangto-viz-node-shape]') as SVGElement | null;
    await expect(personShape).not.toBeNull();
    const personFill = getComputedStyle(personShape!).fill;
    await expect(personFill).toBe('rgb(197, 182, 238)');

    // [tag] text present
    const personTag = person?.querySelector('[data-bbangto-viz-tag]');
    await expect(personTag).not.toBeNull();
    await expect(personTag?.textContent).toBe('[person]');

    // All 7 molecule kinds present
    for (const kind of ['person', 'external', 'container', 'database', 'queue', 'decision', 'process']) {
      const el = canvasElement.querySelector(`[data-bbangto-viz-molecule="${kind}"]`);
      await expect(el).not.toBeNull();
    }
  },
};

// ──────────────────────────────────────────────
// 2. GlyphPresence — inline <svg> with data attr
// ──────────────────────────────────────────────
export const GlyphPresence: Story = {
  render: () => (
    <Canvas viewBox="0 0 550 160" width={550} height={160} title="Glyph presence">
      <PersonNode id="p" x={10} y={10} width={100} height={140} title="Person" />
      <ExternalNode id="e" x={120} y={10} width={100} height={140} title="External" />
      <ContainerNode id="c" x={230} y={10} width={100} height={140} title="Container" />
      <DatabaseNode id="d" x={340} y={10} width={100} height={140} title="DB" />
      <QueueNode id="q" x={450} y={10} width={100} height={140} title="Queue" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const glyphs = canvasElement.querySelectorAll('[data-bbangto-viz-glyph]');
    await expect(glyphs.length).toBeGreaterThanOrEqual(5);
    for (const glyph of glyphs) {
      await expect(glyph.tagName.toLowerCase()).toBe('svg');
    }
  },
};

// ──────────────────────────────────────────────
// 3. ExternalNode dashed stroke
// ──────────────────────────────────────────────
export const ExternalNodeDashed: Story = {
  render: () => (
    <Canvas viewBox="0 0 200 160" width={200} height={160} title="External dashed">
      <ExternalNode id="e" x={20} y={10} width={160} height={140} title="External System" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const external = canvasElement.querySelector('[data-bbangto-viz-molecule="external"]');
    await expect(external).not.toBeNull();
    const shape = external?.querySelector('[data-bbangto-viz-node-shape]') as SVGElement | null;
    await expect(shape).not.toBeNull();
    // stroke-dasharray must be set (not none / empty)
    const dasharray = getComputedStyle(shape!).strokeDasharray;
    await expect(dasharray).not.toBe('none');
    await expect(dasharray.trim()).not.toBe('');
  },
};

// ──────────────────────────────────────────────
// 4. C4Box levels — border width hierarchy
// ──────────────────────────────────────────────
export const C4BoxLevels: Story = {
  render: () => (
    <Canvas viewBox="0 0 450 160" width={450} height={160} title="C4 box levels">
      <C4Box id="l1" x={10} y={10} width={130} height={140} level="l1" title="Software System" />
      <C4Box id="l2" x={160} y={10} width={130} height={140} level="l2" title="Container" />
      <C4Box id="l3" x={310} y={10} width={130} height={140} level="l3" title="Component" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const l1 = canvasElement.querySelector('[data-bbangto-viz-c4-box="l1"]');
    const l2 = canvasElement.querySelector('[data-bbangto-viz-c4-box="l2"]');
    const l3 = canvasElement.querySelector('[data-bbangto-viz-c4-box="l3"]');
    await expect(l1).not.toBeNull();
    await expect(l2).not.toBeNull();
    await expect(l3).not.toBeNull();

    const l1Shape = l1?.querySelector('[data-bbangto-viz-node-shape]') as SVGElement | null;
    const l2Shape = l2?.querySelector('[data-bbangto-viz-node-shape]') as SVGElement | null;
    const l3Shape = l3?.querySelector('[data-bbangto-viz-node-shape]') as SVGElement | null;

    const l1sw = parseFloat(getComputedStyle(l1Shape!).strokeWidth);
    const l2sw = parseFloat(getComputedStyle(l2Shape!).strokeWidth);
    const l3sw = parseFloat(getComputedStyle(l3Shape!).strokeWidth);

    await expect(l1sw).toBe(3);
    await expect(l2sw).toBe(2);
    await expect(l3sw).toBeCloseTo(1.4, 1);
  },
};

// ──────────────────────────────────────────────
// 5. ClassBox — 3 sections
// ──────────────────────────────────────────────
export const ClassBoxSections: Story = {
  render: () => (
    <Canvas viewBox="0 0 220 200" width={220} height={200} title="ClassBox">
      <ClassBox
        id="cls"
        x={20}
        y={10}
        width={180}
        height={180}
        name="MyClass"
        attributes={['- id: string', '+ name: string']}
        methods={['+ getName(): string', '+ setName(n): void']}
      />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const box = canvasElement.querySelector('[data-bbangto-viz-class-box]');
    await expect(box).not.toBeNull();

    const sections = canvasElement.querySelectorAll('[data-bbangto-viz-class-section]');
    await expect(sections.length).toBe(3);

    const nameText = sections[0]?.querySelector('text');
    await expect(nameText?.textContent).toBe('MyClass');
  },
};

// ──────────────────────────────────────────────
// 6. StateNode variants — start / normal / end
// ──────────────────────────────────────────────
export const StateNodeVariants: Story = {
  render: () => (
    <Canvas viewBox="0 0 400 120" width={400} height={120} title="StateNode">
      <StateNode id="start" x={20} y={40} variant="start" />
      <StateNode id="normal" x={80} y={10} width={200} height={100} title="Processing" variant="normal" />
      <StateNode id="end" x={320} y={40} variant="end" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const start = canvasElement.querySelector('[data-bbangto-viz-state="start"]');
    await expect(start).not.toBeNull();
    const startCircle = start?.querySelector('circle');
    await expect(startCircle).not.toBeNull();

    const normal = canvasElement.querySelector('[data-bbangto-viz-state="normal"]');
    await expect(normal).not.toBeNull();

    const end = canvasElement.querySelector('[data-bbangto-viz-state="end"]');
    await expect(end).not.toBeNull();
    const endCircles = end?.querySelectorAll('circle');
    await expect(endCircles!.length).toBeGreaterThanOrEqual(2);
  },
};

// ──────────────────────────────────────────────
// 7. EntityTable — header + rows
// ──────────────────────────────────────────────
export const EntityTableBasic: Story = {
  render: () => (
    <Canvas viewBox="0 0 240 200" width={240} height={200} title="EntityTable">
      <EntityTable
        id="user"
        x={20}
        y={10}
        width={200}
        name="User"
        attributes={[
          { name: 'id', type: 'int', key: 'PK' },
          { name: 'email', type: 'varchar' },
          { name: 'name', type: 'varchar' },
        ]}
      />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const table = canvasElement.querySelector('[data-bbangto-viz-entity-table]');
    await expect(table).not.toBeNull();

    const header = canvasElement.querySelector('[data-bbangto-viz-entity-header]');
    await expect(header).not.toBeNull();
    await expect(header?.querySelector('text')?.textContent).toBe('User');

    const rows = canvasElement.querySelectorAll('[data-bbangto-viz-entity-row]');
    await expect(rows.length).toBe(3);
  },
};

// ── MockupNode (ScreenFlow용 프레임 노드) ──────────────────────────────
export const MockupNodeVariants: Story = {
  render: () => (
    <Canvas viewBox="0 0 460 240" width={460} height={240} title="Mockup nodes">
      <MockupNode id="m1" x={20} y={30} width={180} height={160} title="Home" variant="browser" />
      <MockupNode id="m2" x={260} y={30} width={110} height={180} title="App" variant="mobile" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const mocks = canvasElement.querySelectorAll('[data-bbangto-viz-mockup-node]');
    await expect(mocks.length).toBe(2);
    await expect(canvasElement.textContent).toContain('Home');
  },
};
