import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  C4ContextDiagram,
  C4ContainerDiagram,
  C4ComponentDiagram,
  C4CodeDiagram,
  ArchitectureDiagram,
  UMLComponentDiagram,
  UMLDeploymentDiagram,
  UMLSequenceDiagram,
  C4DeploymentDiagram,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Templates/G2',
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
    await expectVizPaintResolved(canvasElement);
    // boundary label text
    const boundary = canvasElement.querySelector('[data-bbangto-viz-boundary]');
    await expect(boundary).not.toBeNull();
    const boundaryText = boundary?.querySelector('text');
    await expect(boundaryText?.textContent).toBe('Internet Banking System');

    // person molecule exists
    const person = canvasElement.querySelector('[data-bbangto-viz-molecule="person"]');
    await expect(person).not.toBeNull();

    // l1 C4Box exists with strokeWidth=3
    const l1box = canvasElement.querySelector('[data-bbangto-viz-c4-box="l1"]');
    await expect(l1box).not.toBeNull();
    const l1shape = l1box?.querySelector('[data-bbangto-viz-node-shape]') as SVGElement | null;
    await expect(parseFloat(getComputedStyle(l1shape!).strokeWidth)).toBe(3);

    // edge connects person to system
    const edge = canvasElement.querySelector('[data-bbangto-viz-edge]');
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
    await expectVizPaintResolved(canvasElement);
    // Boundary label present — key assertion
    const boundary = canvasElement.querySelector('[data-bbangto-viz-boundary]');
    await expect(boundary).not.toBeNull();
    const label = boundary?.querySelector('text');
    await expect(label?.textContent).toBe('My System');

    // l2 boxes have strokeWidth === 2 (border hierarchy)
    const l2boxes = canvasElement.querySelectorAll('[data-bbangto-viz-c4-box="l2"]');
    await expect(l2boxes.length).toBe(2);
    const l2shape = l2boxes[0]?.querySelector('[data-bbangto-viz-node-shape]') as SVGElement | null;
    await expect(parseFloat(getComputedStyle(l2shape!).strokeWidth)).toBe(2);

    const edges = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
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
    await expectVizPaintResolved(canvasElement);
    const boundary = canvasElement.querySelector('[data-bbangto-viz-boundary]');
    await expect(boundary).not.toBeNull();
    await expect(boundary?.querySelector('text')?.textContent).toBe('API Server');

    // l3 boxes have strokeWidth ≈ 1.4
    const l3boxes = canvasElement.querySelectorAll('[data-bbangto-viz-c4-box="l3"]');
    await expect(l3boxes.length).toBe(3);
    const l3shape = l3boxes[0]?.querySelector('[data-bbangto-viz-node-shape]') as SVGElement | null;
    await expect(parseFloat(getComputedStyle(l3shape!).strokeWidth)).toBeCloseTo(1.4, 1);

    const edges = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
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
    await expectVizPaintResolved(canvasElement);
    const boxes = canvasElement.querySelectorAll('[data-bbangto-viz-class-box]');
    await expect(boxes.length).toBe(2);

    const sections = canvasElement.querySelectorAll('[data-bbangto-viz-class-section]');
    await expect(sections.length).toBe(6); // 3 sections × 2 boxes

    const edge = canvasElement.querySelector('[data-bbangto-viz-edge]');
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
    await expectVizPaintResolved(canvasElement);
    const groups = canvasElement.querySelectorAll('[data-bbangto-viz-boundary]');
    await expect(groups.length).toBe(2);

    const services = canvasElement.querySelectorAll('[data-bbangto-viz-node]');
    await expect(services.length).toBe(3);

    const edges = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
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
    await expectVizPaintResolved(canvasElement);
    // component shape nodes
    const compShapes = canvasElement.querySelectorAll('[data-bbangto-viz-node-shape="component"]');
    await expect(compShapes.length).toBe(2);

    // lollipop (provided interface circle)
    const lollipop = canvasElement.querySelector('[data-bbangto-viz-uml-lollipop]');
    await expect(lollipop).not.toBeNull();

    const edge = canvasElement.querySelector('[data-bbangto-viz-edge]');
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
    await expectVizPaintResolved(canvasElement);
    const envBoundary = canvasElement.querySelector('[data-bbangto-viz-boundary]');
    await expect(envBoundary).not.toBeNull();

    // cube-shaped nodes
    const cubeShapes = canvasElement.querySelectorAll('[data-bbangto-viz-node-shape="cube"]');
    await expect(cubeShapes.length).toBe(2);

    const edge = canvasElement.querySelector('[data-bbangto-viz-edge]');
    await expect(edge).not.toBeNull();
  },
};

// ──────────────────────────────────────────────────────────────────────
// 7-b. 배포 도식 — 좌표가 어긋난 데이터도 상자가 깨지거나 겹치지 않는다(KAN-082.3 검토 2번)
//   「추천대로(좌표는 데이터가 준다), 그러나 레이아웃 깨짐, 글자, 도식 겹침 등이 발생하지 않도록 해야 한다」
//   자식이 부모 이름 띠 안으로 들어오고(api · ec2) 부모 밖으로 나간(worker) 데이터를 그대로 넘긴다.
// ──────────────────────────────────────────────────────────────────────

type DeployBox = { x: number; y: number; width: number; height: number };
const deployBox = (g: Element): DeployBox => {
  const [x, y, width, height] = (g.getAttribute('data-bbangto-viz-box') ?? '').split(' ').map(Number);
  return { x, y, width, height };
};
const within = (c: DeployBox, p: DeployBox) =>
  c.x >= p.x - 0.5 && c.y >= p.y - 0.5 && c.x + c.width <= p.x + p.width + 0.5 && c.y + c.height <= p.y + p.height + 0.5;
const disjoint = (a: DeployBox, b: DeployBox) =>
  a.x + a.width <= b.x + 0.5 || b.x + b.width <= a.x + 0.5 || a.y + a.height <= b.y + 0.5 || b.y + b.height <= a.y + 0.5;

/** 부모 노드마다 — 자식이 부모 안에 있고, 부모의 글자 · artifact 칩이 어느 자식과도 겹치지 않는다(실제 글자 폭으로 잰다) */
async function expectDeployFits(svg: Element, innerOf: (b: DeployBox) => DeployBox) {
  const nodes = Array.from(svg.querySelectorAll('[data-bbangto-viz-deploy-node]'));
  const kidsOf = (id: string) => [
    ...Array.from(svg.querySelectorAll(`[data-bbangto-viz-deploy-parent="${id}"]`)).map(deployBox),
    ...(Array.from(svg.querySelectorAll(`[data-bbangto-viz-container-node="${id}"]`)) as SVGGElement[]).map((g) => g.getBBox()),
  ];
  for (const g of nodes) {
    const id = g.getAttribute('data-bbangto-viz-deploy-node')!;
    const own = deployBox(g);
    const kids = kidsOf(id);
    for (const k of kids) await expect({ id, kid: k, inside: within(k, innerOf(own)) }).toEqual({ id, kid: k, inside: true });
    const marks = [
      ...(Array.from(g.querySelectorAll(':scope > text, [data-bbangto-viz-node-label] text')) as SVGTextElement[]).map((t) => t.getBBox()),
      ...Array.from(g.querySelectorAll('[data-bbangto-viz-artifact]')).map(deployBox),
    ];
    for (const m of marks) {
      await expect({ id, mark: m, inOwn: within(m, own) }).toEqual({ id, mark: m, inOwn: true });
      for (const k of kids) await expect({ id, mark: m, kid: k, apart: disjoint(m, k) }).toEqual({ id, mark: m, kid: k, apart: true });
    }
  }
}

export const UMLDeploymentDiagramFitsChildren: Story = {
  render: () => (
    <UMLDeploymentDiagram
      data={{
        nodes: [
          { id: 'ec2', x: 20, y: 20, width: 220, height: 120, name: 'EC2 m5.large', kind: 'device', artifacts: ['agent.deb'] },
          { id: 'api', x: 40, y: 30, width: 150, height: 110, name: 'API 서버', parent: 'ec2', kind: 'executionEnvironment', artifacts: ['api.jar'] },
          { id: 'worker', x: 210, y: 60, width: 150, height: 100, name: '워커', parent: 'ec2', stereotype: 'container' },
        ],
      }}
      width={460}
      height={320}
      title="UML 배포 도식 — 어긋난 좌표도 깨지지 않는다"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    // 큐브 앞면 안(오른쪽 · 위 깊이 14 를 뺀 곳)에 자식이 담긴다
    await expectDeployFits(svg, (b) => ({ x: b.x, y: b.y + 14, width: b.width - 14, height: b.height - 14 }));
    // 자식 좌표는 데이터 그대로다
    await expect(deployBox(svg.querySelector('[data-bbangto-viz-deploy-node="worker"]')!)).toEqual({ x: 210, y: 60, width: 150, height: 100 });
  },
};

export const C4DeploymentDiagramFitsChildren: Story = {
  render: () => (
    <C4DeploymentDiagram
      data={{
        nodes: [
          { id: 'aws', x: 10, y: 30, width: 300, height: 200, name: 'AWS', technology: 'ap-northeast-2' },
          { id: 'ec2', x: 30, y: 40, width: 260, height: 150, name: 'EC2 Auto Scaling Group', technology: 'm5.large · Ubuntu 22.04 LTS', parent: 'aws', instances: 2 },
        ],
        containers: [
          { id: 'api', node: 'ec2', x: 50, y: 90, width: 140, height: 90, name: 'API 서버', technology: 'Node.js' },
          { id: 'worker', node: 'ec2', x: 210, y: 100, width: 140, height: 90, name: '워커', technology: 'Go' },
        ],
        relationships: [{ id: 'r1', from: 'api', to: 'worker', label: '작업 넣기', technology: 'SQS' }],
      }}
      width={460}
      height={320}
      title="C4 배포 도식 — 어긋난 좌표도 깨지지 않는다"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    await expectDeployFits(svg, (b) => b);
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
    await expectVizPaintResolved(canvasElement);
    const lifelines = canvasElement.querySelectorAll('[data-bbangto-viz-lifeline]');
    await expect(lifelines.length).toBe(3);

    const messages = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
    await expect(messages.length).toBe(4);

    // message d attribute not empty
    const firstMsg = messages[0] as SVGPathElement;
    await expect(firstMsg.getAttribute('d')!.length).toBeGreaterThan(4);
  },
};
