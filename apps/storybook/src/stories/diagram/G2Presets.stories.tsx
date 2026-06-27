import type { Meta, StoryObj } from '@storybook/react';
import {
  DiagramCanvas,
  DiagramProvider,
  blueprintTheme,
  C4ContextDiagram,
  C4ContainerDiagram,
  C4ComponentDiagram,
  C4CodeDiagram,
  ArchitectureDiagram,
  UMLComponentDiagram,
  UMLDeploymentDiagram,
  UMLSequenceDiagram,
} from '@centurio1987/bbangto-ui-diagram';
import { expect } from 'storybook/test';

const meta = {
  title: 'Diagram/Presets/G2',
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
// 1. C4ContextDiagram — persons + systems + boundary label
// ──────────────────────────────────────────────────────────────────────
export const C4ContextDiagramBasic: Story = {
  render: () => (
    <C4ContextDiagram
      data={{
        boundary: { x: 160, y: 10, width: 200, height: 180, label: 'Internet Banking System' },
        persons: [
          { id: 'user', x: 20,  y: 50, width: 110, height: 120, name: 'Personal Banking Customer' },
        ],
        systems: [
          { id: 'ibs',  x: 180, y: 50, width: 160, height: 120, name: 'Internet Banking System', level: 'l1' },
        ],
        relationships: [
          { id: 'r1', from: 'user', to: 'ibs', label: 'Views account balance' },
        ],
      }}
      viewBox="0 0 400 220"
      width={400}
      height={220}
      title="C4 Context"
    />
  ),
  play: async ({ canvasElement }) => {
    // boundary label text
    const boundary = canvasElement.querySelector('[data-bbangto-diagram-boundary]');
    await expect(boundary).not.toBeNull();
    const boundaryText = boundary?.querySelector('text');
    await expect(boundaryText?.textContent).toBe('Internet Banking System');

    // person molecule exists
    const person = canvasElement.querySelector('[data-bbangto-diagram-molecule="person"]');
    await expect(person).not.toBeNull();

    // l1 C4Box exists with strokeWidth=3
    const l1box = canvasElement.querySelector('[data-bbangto-diagram-c4-box="l1"]');
    await expect(l1box).not.toBeNull();
    const l1shape = l1box?.querySelector('[data-bbangto-diagram-node-shape]') as SVGElement | null;
    await expect(parseFloat(getComputedStyle(l1shape!).strokeWidth)).toBe(3);

    // edge connects person to system
    const edge = canvasElement.querySelector('[data-bbangto-diagram-edge]');
    await expect(edge).not.toBeNull();
  },
};

// ──────────────────────────────────────────────────────────────────────
// 2. C4ContainerDiagram — l2 border width, boundary label (key test)
// ──────────────────────────────────────────────────────────────────────
export const C4ContainerDiagramBasic: Story = {
  render: () => (
    <C4ContainerDiagram
      data={{
        systemBoundary: { x: 150, y: 10, width: 260, height: 220, label: 'My System' },
        containers: [
          { id: 'web', x: 170, y: 50, width: 100, height: 80, name: 'Web App',    technology: 'React'   },
          { id: 'api', x: 300, y: 50, width: 100, height: 80, name: 'API Server', technology: 'Node.js' },
        ],
        external: [
          { id: 'usr', x: 20,  y: 70, width: 100, height: 120, name: 'User', external: false },
        ],
        relationships: [
          { id: 'r1', from: 'usr', to: 'web', label: 'uses'  },
          { id: 'r2', from: 'web', to: 'api', label: 'calls' },
        ],
      }}
      viewBox="0 0 440 260"
      width={440}
      height={260}
      title="C4 Container"
    />
  ),
  play: async ({ canvasElement }) => {
    // Boundary label present — key assertion
    const boundary = canvasElement.querySelector('[data-bbangto-diagram-boundary]');
    await expect(boundary).not.toBeNull();
    const label = boundary?.querySelector('text');
    await expect(label?.textContent).toBe('My System');

    // l2 boxes have strokeWidth === 2 (border hierarchy)
    const l2boxes = canvasElement.querySelectorAll('[data-bbangto-diagram-c4-box="l2"]');
    await expect(l2boxes.length).toBe(2);
    const l2shape = l2boxes[0]?.querySelector('[data-bbangto-diagram-node-shape]') as SVGElement | null;
    await expect(parseFloat(getComputedStyle(l2shape!).strokeWidth)).toBe(2);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 3. C4ComponentDiagram — l3 boxes inside boundary
// ──────────────────────────────────────────────────────────────────────
export const C4ComponentDiagramBasic: Story = {
  render: () => (
    <C4ComponentDiagram
      data={{
        containerBoundary: { x: 10, y: 10, width: 400, height: 200, label: 'API Server' },
        components: [
          { id: 'ctrl', x: 30,  y: 50, width: 110, height: 80, name: 'AuthController' },
          { id: 'svc',  x: 160, y: 50, width: 110, height: 80, name: 'UserService'    },
          { id: 'repo', x: 290, y: 50, width: 110, height: 80, name: 'UserRepository' },
        ],
        relationships: [
          { id: 'r1', from: 'ctrl', to: 'svc',  label: 'uses' },
          { id: 'r2', from: 'svc',  to: 'repo', label: 'calls' },
        ],
      }}
      viewBox="0 0 430 230"
      width={430}
      height={230}
      title="C4 Component"
    />
  ),
  play: async ({ canvasElement }) => {
    const boundary = canvasElement.querySelector('[data-bbangto-diagram-boundary]');
    await expect(boundary).not.toBeNull();
    await expect(boundary?.querySelector('text')?.textContent).toBe('API Server');

    // l3 boxes have strokeWidth ≈ 1.4
    const l3boxes = canvasElement.querySelectorAll('[data-bbangto-diagram-c4-box="l3"]');
    await expect(l3boxes.length).toBe(3);
    const l3shape = l3boxes[0]?.querySelector('[data-bbangto-diagram-node-shape]') as SVGElement | null;
    await expect(parseFloat(getComputedStyle(l3shape!).strokeWidth)).toBeCloseTo(1.4, 1);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 4. C4CodeDiagram — ClassBox sections
// ──────────────────────────────────────────────────────────────────────
export const C4CodeDiagramBasic: Story = {
  render: () => (
    <C4CodeDiagram
      data={{
        elements: [
          {
            id: 'cls1', x: 20,  y: 20, width: 160, height: 160, name: 'User',
            kind: 'class', attributes: ['- id: string', '+ email: string'],
            methods: ['+ login(): void'],
          },
          {
            id: 'cls2', x: 220, y: 20, width: 160, height: 160, name: 'Account',
            kind: 'class', attributes: ['- balance: number'],
            methods: ['+ deposit(n): void'],
          },
        ],
        relationships: [{ id: 'r1', from: 'cls1', to: 'cls2', label: 'has' }],
      }}
      viewBox="0 0 420 210"
      width={420}
      height={210}
      title="C4 Code"
    />
  ),
  play: async ({ canvasElement }) => {
    const boxes = canvasElement.querySelectorAll('[data-bbangto-diagram-class-box]');
    await expect(boxes.length).toBe(2);

    const sections = canvasElement.querySelectorAll('[data-bbangto-diagram-class-section]');
    await expect(sections.length).toBe(6); // 3 sections × 2 boxes

    const edge = canvasElement.querySelector('[data-bbangto-diagram-edge]');
    await expect(edge).not.toBeNull();
  },
};

// ──────────────────────────────────────────────────────────────────────
// 5. ArchitectureDiagram — groups + services + edges
// ──────────────────────────────────────────────────────────────────────
export const ArchitectureDiagramBasic: Story = {
  render: () => (
    <ArchitectureDiagram
      data={{
        groups: [
          { x: 10, y: 10, width: 200, height: 200, label: 'Frontend' },
          { x: 230, y: 10, width: 200, height: 200, label: 'Backend'  },
        ],
        services: [
          { id: 'svc1', x: 50,  y: 70, width: 120, height: 70, label: 'Web Client'  },
          { id: 'svc2', x: 270, y: 70, width: 120, height: 70, label: 'API Server'  },
          { id: 'svc3', x: 270, y: 160, width: 120, height: 40, label: 'Database'   },
        ],
        edges: [
          { id: 'e1', from: 'svc1', to: 'svc2', label: 'HTTPS' },
          { id: 'e2', from: 'svc2', to: 'svc3', label: 'SQL'   },
        ],
      }}
      viewBox="0 0 460 240"
      width={460}
      height={240}
      title="Architecture Diagram"
    />
  ),
  play: async ({ canvasElement }) => {
    const groups = canvasElement.querySelectorAll('[data-bbangto-diagram-boundary]');
    await expect(groups.length).toBe(2);

    const services = canvasElement.querySelectorAll('[data-bbangto-diagram-node]');
    await expect(services.length).toBe(3);

    const edges = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(edges.length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 6. UMLComponentDiagram — component shape + lollipop
// ──────────────────────────────────────────────────────────────────────
export const UMLComponentDiagramBasic: Story = {
  render: () => (
    <UMLComponentDiagram
      data={{
        components: [
          {
            id: 'comp1', x: 40,  y: 60, width: 130, height: 80, name: 'OrderService',
            providedInterfaces: [{ name: 'IOrder', x: 170, y: 100 }],
          },
          {
            id: 'comp2', x: 280, y: 60, width: 130, height: 80, name: 'PaymentService',
          },
        ],
        dependencies: [{ id: 'd1', from: 'comp1', to: 'comp2', label: '«use»' }],
      }}
      viewBox="0 0 460 200"
      width={460}
      height={200}
      title="UML Component"
    />
  ),
  play: async ({ canvasElement }) => {
    // component shape nodes
    const compShapes = canvasElement.querySelectorAll('[data-bbangto-diagram-node-shape="component"]');
    await expect(compShapes.length).toBe(2);

    // lollipop (provided interface circle)
    const lollipop = canvasElement.querySelector('[data-bbangto-diagram-uml-lollipop]');
    await expect(lollipop).not.toBeNull();

    const edge = canvasElement.querySelector('[data-bbangto-diagram-edge]');
    await expect(edge).not.toBeNull();
  },
};

// ──────────────────────────────────────────────────────────────────────
// 7. UMLDeploymentDiagram — cube nodes + boundary
// ──────────────────────────────────────────────────────────────────────
export const UMLDeploymentDiagramBasic: Story = {
  render: () => (
    <UMLDeploymentDiagram
      data={{
        environments: [
          { x: 10, y: 10, width: 420, height: 210, label: 'Production' },
        ],
        nodes: [
          { id: 'web', x: 30,  y: 40, width: 160, height: 100, name: 'Web Server'  },
          { id: 'db',  x: 240, y: 40, width: 160, height: 100, name: 'DB Server'   },
        ],
        edges: [
          { id: 'e1', from: 'web', to: 'db', label: 'JDBC' },
        ],
      }}
      viewBox="0 0 450 240"
      width={450}
      height={240}
      title="UML Deployment"
    />
  ),
  play: async ({ canvasElement }) => {
    const envBoundary = canvasElement.querySelector('[data-bbangto-diagram-boundary]');
    await expect(envBoundary).not.toBeNull();

    // cube-shaped nodes
    const cubeShapes = canvasElement.querySelectorAll('[data-bbangto-diagram-node-shape="cube"]');
    await expect(cubeShapes.length).toBe(2);

    const edge = canvasElement.querySelector('[data-bbangto-diagram-edge]');
    await expect(edge).not.toBeNull();
  },
};

// ──────────────────────────────────────────────────────────────────────
// 8. UMLSequenceDiagram — lifelines + messages
// ──────────────────────────────────────────────────────────────────────
export const UMLSequenceDiagramBasic: Story = {
  render: () => (
    <UMLSequenceDiagram
      data={{
        participants: [
          { id: 'client',  x: 80,  name: 'Client',  width: 100 },
          { id: 'server',  x: 280, name: 'Server',  width: 100 },
          { id: 'db',      x: 480, name: 'Database', width: 100 },
        ],
        messages: [
          { id: 'm1', from: 'client', to: 'server',  y: 100, label: 'POST /login', kind: 'sync'  },
          { id: 'm2', from: 'server', to: 'db',      y: 140, label: 'SELECT user', kind: 'sync'  },
          { id: 'm3', from: 'db',     to: 'server',  y: 180, label: 'result',      kind: 'return'},
          { id: 'm4', from: 'server', to: 'client',  y: 220, label: '200 OK',      kind: 'return'},
        ],
      }}
      lifelineHeight={280}
      viewBox="0 0 600 340"
      width={600}
      height={340}
      title="UML Sequence"
    />
  ),
  play: async ({ canvasElement }) => {
    const lifelines = canvasElement.querySelectorAll('[data-bbangto-diagram-lifeline]');
    await expect(lifelines.length).toBe(3);

    const messages = canvasElement.querySelectorAll('[data-bbangto-diagram-edge]');
    await expect(messages.length).toBe(4);

    // message d attribute not empty
    const firstMsg = messages[0] as SVGPathElement;
    await expect(firstMsg.getAttribute('d')!.length).toBeGreaterThan(4);
  },
};
