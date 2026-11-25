import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  ClassDiagram,
  StateDiagram,
  ERDiagram,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Templates/G3',
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
    await expectVizPaintResolved(canvasElement);
    // 3 class boxes
    const boxes = canvasElement.querySelectorAll('[data-bbangto-viz-class-box]');
    await expect(boxes.length).toBe(3);

    // Each box has 3 sections
    const sections = canvasElement.querySelectorAll('[data-bbangto-viz-class-section]');
    await expect(sections.length).toBe(9); // 3 × 3

    // 2 edges
    const edges = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
    await expect(edges.length).toBe(2);

    // inheritance edge has triangleOpen marker
    const inheritEdge = edges[0] as SVGPathElement;
    await expect(inheritEdge.getAttribute('marker-end')).toContain('triangle-open');
  },
};

// ──────────────────────────────────────────────────────────────────────
// 1b. ClassDiagram — 선언한 칸이 그림에 나온다 (KAN-082 S4, 상류 이슈 P7 · P11 ②)
//     stereotype 은 클래스 상자 머리에 «…» 로, 관계 이름은 선 가운데, 다중성은 선 양 끝 근처에 그린다.
//     포함 · 집합은 전체 쪽(from)에 마름모만 붙고 부분 쪽(to)에는 화살촉이 없다.
// ──────────────────────────────────────────────────────────────────────
export const ClassDiagramDeclaredFields: Story = {
  render: () => (
    <ClassDiagram
      data={{
        classes: [
          {
            id: 'order', x: 20, y: 20, width: 170, height: 110, name: 'Order', stereotype: 'Aggregate Root',
            attributes: ['+ id: OrderId'], methods: ['+ place(): void'],
          },
          {
            id: 'line', x: 330, y: 20, width: 170, height: 110, name: 'OrderLine',
            attributes: ['+ qty: number'], methods: ['+ total(): Money'],
          },
          {
            id: 'customer', x: 20, y: 240, width: 170, height: 110, name: 'Customer',
            attributes: ['+ name: string'], methods: ['+ rename(): void'],
          },
          {
            id: 'product', x: 330, y: 240, width: 170, height: 110, name: 'Product',
            attributes: ['+ sku: string'], methods: ['+ price(): Money'],
          },
        ],
        relationships: [
          { id: 'r-comp', from: 'order', to: 'line', kind: 'composition', label: 'contains', fromLabel: '1', toLabel: '1..*' },
          { id: 'r-assoc', from: 'customer', to: 'order', kind: 'association', label: 'places', fromLabel: '1', toLabel: '0..*' },
          { id: 'r-aggr', from: 'customer', to: 'product', kind: 'aggregation', label: 'wishlist', fromLabel: '1', toLabel: '0..*' },
          { id: 'r-ref', from: 'line', to: 'product', kind: 'association', label: 'refers to', fromLabel: '0..*', toLabel: '1' },
        ],
      }}
      viewBox="0 0 520 370"
      width={520}
      height={370}
      title="Class Diagram — declared fields"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]') as SVGSVGElement;

    // stereotype — 클래스 상자 머리에 «Aggregate Root»
    const stereo = svg.querySelector('[data-bbangto-viz-class-box] [data-bbangto-viz-sysml-stereotype]');
    await expect(stereo?.textContent).toBe('«Aggregate Root»');

    const edges = Array.from(svg.querySelectorAll('path[data-bbangto-viz-edge]')) as SVGPathElement[];
    await expect(edges).toHaveLength(4);
    const [comp, assoc, aggr] = edges;

    // 포함 · 집합 — 전체 쪽 마름모, 부분 쪽 화살촉 없음 / 연관은 화살촉 그대로
    await expect(comp.getAttribute('marker-start')).toMatch(/-diamond\)$/);
    await expect(comp.getAttribute('marker-end')).toBeNull();
    await expect(aggr.getAttribute('marker-start')).toMatch(/-diamond-open\)$/);
    await expect(aggr.getAttribute('marker-end')).toBeNull();
    await expect(assoc.getAttribute('marker-end')).toContain('arrow');

    // 관계 이름은 선 가운데, 다중성은 자기 끝 근처
    const labelAt = (text: string): DOMPoint => {
      const t = Array.from(svg.querySelectorAll('[data-bbangto-viz-edge-label] text')).find(
        (el) => el.textContent === text,
      ) as SVGTextElement | undefined;
      return new DOMPoint(Number(t?.getAttribute('x')), Number(t?.getAttribute('y')));
    };
    const dist = (a: DOMPoint, b: DOMPoint) => Math.hypot(a.x - b.x, a.y - b.y);
    const ends = (p: SVGPathElement) => ({
      start: p.getPointAtLength(0),
      mid: p.getPointAtLength(p.getTotalLength() / 2),
      end: p.getPointAtLength(p.getTotalLength()),
    });

    const c = ends(comp);
    await expect(dist(labelAt('contains'), c.mid)).toBeLessThanOrEqual(1);
    await expect(dist(labelAt('1..*'), c.end)).toBeLessThan(dist(labelAt('1..*'), c.start));

    const a = ends(assoc);
    await expect(dist(labelAt('places'), a.mid)).toBeLessThanOrEqual(1);
    await expect(dist(labelAt('0..*'), a.end)).toBeLessThan(dist(labelAt('0..*'), a.start));
    // 「1」은 네 관계 끝에 하나씩(포함 · 연관 · 집합의 시작 끝, 참조의 도착 끝) — 그중 둘은 이 두 관계의 시작 끝 근처
    const ones = Array.from(svg.querySelectorAll('[data-bbangto-viz-edge-label] text'))
      .filter((el) => el.textContent === '1')
      .map((el) => new DOMPoint(Number(el.getAttribute('x')), Number(el.getAttribute('y'))));
    await expect(ones).toHaveLength(4);
    await expect(Math.min(...ones.map((p) => dist(p, c.start)))).toBeLessThan(40);
    await expect(Math.min(...ones.map((p) => dist(p, a.start)))).toBeLessThan(40);
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
    await expectVizPaintResolved(canvasElement);
    const start = canvasElement.querySelector('[data-bbangto-viz-state="start"]');
    await expect(start).not.toBeNull();

    const end = canvasElement.querySelector('[data-bbangto-viz-state="end"]');
    await expect(end).not.toBeNull();

    const normals = canvasElement.querySelectorAll('[data-bbangto-viz-state="normal"]');
    await expect(normals.length).toBe(2);

    const edges = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
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
    await expectVizPaintResolved(canvasElement);
    // 2 entity tables
    const tables = canvasElement.querySelectorAll('[data-bbangto-viz-entity-table]');
    await expect(tables.length).toBe(2);

    // entity rows exist
    const rows = canvasElement.querySelectorAll('[data-bbangto-viz-entity-row]');
    await expect(rows.length).toBeGreaterThan(0);

    // relationship edge
    const edge = canvasElement.querySelector('[data-bbangto-viz-edge]');
    await expect(edge).not.toBeNull();

    // crow's-foot marker on edge
    await expect(edge!.getAttribute('marker-end')).toContain('er-many');
  },
};
