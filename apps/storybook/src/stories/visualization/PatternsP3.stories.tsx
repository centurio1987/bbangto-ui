import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  InformationalInfographic,
  Iceberg,
  BusinessModelCanvas,
  Honeycomb,
} from '@centurio1987/bbangto-ui-visualization';
import { colorfulFlat01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Patterns/P3',
  component: Canvas,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story: React.ComponentType) => (
      <VisualizationStyleGuideProvider styleGuide={colorfulFlat01VizStyleGuide}>
        <Story />
      </VisualizationStyleGuideProvider>
    ),
  ],
} satisfies Meta<typeof Canvas>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── InformationalInfographic (VT-604) ─────────────────────────────────
export const Informational: Story = {
  render: () => (
    <InformationalInfographic
      data={{
        heading: 'What is headless UI?',
        intro: 'A pattern separating behaviour from presentation.',
        columns: 2,
        sections: [
          { id: 's1', title: 'Structure', body: 'Markup and semantics only.', glyph: '1' },
          { id: 's2', title: 'Style', body: 'Injected by a style guide.', glyph: '2' },
          { id: 's3', title: 'State', body: 'Owned by the consumer.', glyph: '3' },
          { id: 's4', title: 'Slots', body: 'Composable content areas.', glyph: '4' },
        ],
      }}
      viewBox="0 0 520 320"
      width={520}
      height={320}
      title="Informational infographic"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-info-section]').length).toBe(4);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="informational"]')!;
    await expect(root.textContent).toContain('What is headless UI?');
    await expect(root.textContent).toContain('Structure');
  },
};

// ── Iceberg (VT-704) ──────────────────────────────────────────────────
export const IcebergModel: Story = {
  render: () => (
    <Iceberg
      data={{
        tip: { label: 'Behaviour' },
        layers: [
          { id: 'l1', label: 'Values' },
          { id: 'l2', label: 'Beliefs' },
          { id: 'l3', label: 'Assumptions' },
        ],
      }}
      viewBox="0 0 300 360"
      width={300}
      height={360}
      title="Iceberg model"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-iceberg-layer]').length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-waterline]').length).toBe(1);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="iceberg"]')!;
    await expect(root.textContent).toContain('Behaviour');
    await expect(root.textContent).toContain('Assumptions');
  },
};

// ── BusinessModelCanvas (VT-707) ──────────────────────────────────────
export const BMC: Story = {
  render: () => (
    <BusinessModelCanvas
      data={{
        blocks: {
          keyPartners: ['Suppliers', 'Logistics'],
          keyActivities: ['Manufacturing'],
          keyResources: ['Factory'],
          valuePropositions: ['Fresh bread daily'],
          customerRelationships: ['Loyalty app'],
          channels: ['Storefront', 'Online'],
          customerSegments: ['Locals'],
          costStructure: ['Ingredients', 'Rent'],
          revenueStreams: ['Retail sales'],
        },
      }}
      viewBox="0 0 640 380"
      width={640}
      height={380}
      title="Business model canvas"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    // 표준 BMC 9블록.
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-bmc-block]').length).toBe(9);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="bmc"]')!;
    await expect(root.textContent).toContain('Value Propositions');
    await expect(root.textContent).toContain('Fresh bread daily');
  },
};

// ── Honeycomb (VT-709) ────────────────────────────────────────────────
export const HoneycombCluster: Story = {
  render: () => (
    <Honeycomb
      data={{
        columns: 3,
        cells: [
          { id: 'c1', label: 'Useful' },
          { id: 'c2', label: 'Usable' },
          { id: 'c3', label: 'Desirable' },
          { id: 'c4', label: 'Findable' },
          { id: 'c5', label: 'Accessible' },
          { id: 'c6', label: 'Credible' },
          { id: 'c7', label: 'Valuable' },
        ],
      }}
      viewBox="0 0 360 320"
      width={360}
      height={320}
      title="UX honeycomb"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-hex-cell]').length).toBe(7);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="honeycomb"]')!;
    await expect(root.textContent).toContain('Valuable');
  },
};
