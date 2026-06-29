import type { Meta, StoryObj } from '@storybook/react';
import {
  DiagramCanvas,
  DiagramProvider,
  Node,
  Edge,
  NodeLabel,
  Boundary,
  blueprintTheme,
  type NodeShape,
} from '@centurio1987/bbangto-ui-diagram';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'DIAGRAM/Atoms',
  component: DiagramCanvas,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <DiagramProvider theme={blueprintTheme}>
        <Story />
      </DiagramProvider>
    ),
  ],
} satisfies Meta<typeof DiagramCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

// ──────────────────────────────────────────────
// 1. Canvas — role/aria/title/inline defs
// ──────────────────────────────────────────────
export const CanvasBasic: Story = {
  render: () => (
    <DiagramCanvas
      viewBox="0 0 400 200"
      width={400}
      height={200}
      title="Test Canvas"
      desc="A diagram canvas for testing"
    >
      <Node id="a" x={40} y={60} width={120} height={60} shape="rect" fill="#C5B6EE" stroke="#111" />
    </DiagramCanvas>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // role="img"
    const svg = canvasElement.querySelector('[data-bbangto-diagram-canvas]');
    await expect(svg).not.toBeNull();
    await expect(svg?.getAttribute('role')).toBe('img');

    // <title> inside same svg
    const title = svg?.querySelector('title');
    await expect(title).not.toBeNull();
    await expect(title?.textContent).toBe('Test Canvas');

    // inline <defs> inside same svg
    const defs = svg?.querySelector('defs');
    await expect(defs).not.toBeNull();

    // marker element inside defs (arrow marker)
    const arrowMarker = defs?.querySelector('marker[id$="-arrow"]');
    await expect(arrowMarker).not.toBeNull();

    await canvas.findByRole('img');
  },
};

// ──────────────────────────────────────────────
// 2. Node shapes + stroke-width
// ──────────────────────────────────────────────
const ALL_SHAPES: NodeShape[] = [
  'rect', 'rounded', 'stadium', 'circle', 'ellipse',
  'diamond', 'cylinder', 'hexagon', 'parallelogram',
  'trapezoid', 'subroutine', 'doubleCircle', 'cube', 'component',
];

export const NodeShapes: Story = {
  render: () => {
    const cols = 4;
    const W = 100;
    const H = 64;
    const GAP = 20;
    const totalW = cols * (W + GAP);
    const rows = Math.ceil(ALL_SHAPES.length / cols);
    const totalH = rows * (H + GAP);

    return (
      <DiagramCanvas viewBox={`0 0 ${totalW} ${totalH}`} width={totalW} height={totalH}>
        {ALL_SHAPES.map((shape, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = col * (W + GAP) + 10;
          const y = row * (H + GAP) + 10;
          return (
            <Node
              key={shape}
              id={shape}
              x={x}
              y={y}
              width={W}
              height={H}
              shape={shape}
              fill="#C5B6EE"
              stroke="#111111"
              strokeWidth={2.5}
            />
          );
        })}
      </DiagramCanvas>
    );
  },
  play: async ({ canvasElement }) => {
    // Every shape must produce at least one SVG element with data-bbangto-diagram-node-shape
    const shapeEls = canvasElement.querySelectorAll('[data-bbangto-diagram-node-shape]');
    await expect(shapeEls.length).toBeGreaterThanOrEqual(ALL_SHAPES.length);

    // stroke-width === 2.5 on the first shape element
    const first = shapeEls[0] as SVGElement;
    const sw = getComputedStyle(first).getPropertyValue('stroke-width');
    await expect(parseFloat(sw)).toBe(2.5);
  },
};

// ──────────────────────────────────────────────
// 3. Edge — d not empty, marker-end same-canvas uid
// ──────────────────────────────────────────────
export const EdgeBasic: Story = {
  render: () => (
    <DiagramCanvas viewBox="0 0 400 200" width={400} height={200} title="Edge test">
      <Node id="n1" x={20} y={70} width={120} height={60} shape="rect" fill="#C5B6EE" stroke="#111" />
      <Node id="n2" x={260} y={70} width={120} height={60} shape="rounded" fill="#87B79A" stroke="#111" />
      <Edge from="n1" to="n2" markerEnd="arrow" stroke="#111111" strokeWidth={2.5} />
    </DiagramCanvas>
  ),
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('[data-bbangto-diagram-canvas]') as SVGSVGElement;

    const edge = svg?.querySelector('[data-bbangto-diagram-edge]');
    await expect(edge).not.toBeNull();

    // d attribute is not empty
    const d = edge?.getAttribute('d');
    await expect(d).not.toBeNull();
    await expect(d!.length).toBeGreaterThan(4);

    // marker-end references a marker inside the same svg
    const markerEnd = edge?.getAttribute('marker-end');
    await expect(markerEnd).toMatch(/^url\(#.+\)$/);

    const markerId = markerEnd!.replace(/^url\(#/, '').replace(/\)$/, '');
    const referencedMarker = svg?.querySelector(`#${CSS.escape(markerId)}`);
    await expect(referencedMarker).not.toBeNull();
    await expect(referencedMarker?.closest('defs')?.closest('svg')).toBe(svg);
  },
};

// ──────────────────────────────────────────────
// 4. NodeLabel — wrap / truncate / fit
// ──────────────────────────────────────────────
export const NodeLabelModes: Story = {
  render: () => (
    <DiagramCanvas viewBox="0 0 540 200" width={540} height={200} title="NodeLabel modes">
      {/* wrap */}
      <Node id="wrap" x={10} y={20} width={140} height={80} shape="rect" fill="#EEE" stroke="#111" />
      <NodeLabel x={10} y={60} width={140} title="This is a very long title that should wrap" mode="wrap" maxLines={3} />
      {/* truncate */}
      <Node id="trunc" x={180} y={20} width={140} height={80} shape="rect" fill="#EEE" stroke="#111" />
      <NodeLabel x={180} y={60} width={140} title="This is a very long title that should truncate here" mode="truncate" />
      {/* fit */}
      <Node id="fit" x={350} y={20} width={140} height={80} shape="rect" fill="#EEE" stroke="#111" />
      <NodeLabel x={350} y={60} width={140} title="Fit mode label" mode="fit" />
    </DiagramCanvas>
  ),
  play: async ({ canvasElement }) => {
    const labels = canvasElement.querySelectorAll('[data-bbangto-diagram-node-label]');
    await expect(labels.length).toBe(3);

    // wrap: multiple <text> elements
    const wrapLabel = labels[0];
    const wrapTexts = wrapLabel.querySelectorAll('text');
    await expect(wrapTexts.length).toBeGreaterThanOrEqual(1);

    // truncate: single text ending with ellipsis
    const truncLabel = labels[1];
    const truncText = truncLabel.querySelector('text');
    await expect(truncText).not.toBeNull();
    await expect(truncText!.textContent).toMatch(/…$/);

    // fit: single text element present
    const fitLabel = labels[2];
    const fitText = fitLabel.querySelector('text');
    await expect(fitText).not.toBeNull();
    await expect(fitText!.textContent).toBe('Fit mode label');
  },
};

// ──────────────────────────────────────────────
// 5. Boundary — stroke-dasharray + mono label
// ──────────────────────────────────────────────
export const BoundaryBasic: Story = {
  render: () => (
    <DiagramCanvas viewBox="0 0 400 260" width={400} height={260} title="Boundary test">
      <Boundary
        x={20}
        y={30}
        width={360}
        height={200}
        label="System Boundary"
        dashPattern="8 6"
        stroke="#111111"
      />
    </DiagramCanvas>
  ),
  play: async ({ canvasElement }) => {
    const boundary = canvasElement.querySelector('[data-bbangto-diagram-boundary]');
    await expect(boundary).not.toBeNull();

    // rect inside boundary has stroke-dasharray
    const rect = boundary?.querySelector('rect');
    await expect(rect).not.toBeNull();
    const dasharray = getComputedStyle(rect!).getPropertyValue('stroke-dasharray');
    // dasharray should contain the pattern (browsers normalise to "8 6" or "8px 6px")
    await expect(dasharray).toMatch(/8/);

    // label text is present and uses monospace font
    const label = boundary?.querySelector('text');
    await expect(label).not.toBeNull();
    await expect(label?.textContent).toBe('System Boundary');
  },
};

// ──────────────────────────────────────────────
// 6. Large canvas — 200 nodes / 100 edges (perf)
// ──────────────────────────────────────────────
const LARGE_NODE_COUNT = 200;
const LARGE_EDGE_COUNT = 100;
const COLS = 20;
const NW = 60;
const NH = 40;
const GAP = 20;

const largeNodes = Array.from({ length: LARGE_NODE_COUNT }, (_, i) => ({
  id: `ln${i}`,
  x: (i % COLS) * (NW + GAP) + 10,
  y: Math.floor(i / COLS) * (NH + GAP) + 10,
  width: NW,
  height: NH,
}));

export const LargeCanvas: Story = {
  render: () => {
    const totalW = COLS * (NW + GAP) + 20;
    const totalH = Math.ceil(LARGE_NODE_COUNT / COLS) * (NH + GAP) + 20;

    return (
      <DiagramCanvas
        viewBox={`0 0 ${totalW} ${totalH}`}
        width={totalW}
        height={totalH}
        title="Large canvas performance test"
      >
        {largeNodes.map((n) => (
          <Node
            key={n.id}
            id={n.id}
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            shape="rect"
            fill="#C5B6EE"
            stroke="#111"
            strokeWidth={2.5}
          />
        ))}
        {Array.from({ length: LARGE_EDGE_COUNT }, (_, i) => (
          <Edge
            key={`le${i}`}
            from={`ln${i}`}
            to={`ln${i + 1}`}
            routing="straight"
            markerEnd="arrow"
          />
        ))}
      </DiagramCanvas>
    );
  },
  play: async ({ canvasElement }) => {
    const nodes = canvasElement.querySelectorAll('[data-bbangto-diagram-node]');
    await expect(nodes.length).toBe(LARGE_NODE_COUNT);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(LARGE_EDGE_COUNT);
  },
};
