import type { ReactNode } from 'react';
import {
  ActivityDiagram,
  ArchiMateApplicationDiagram,
  ArchiMateBusinessDiagram,
  ArchiMateDiagram,
  ArchiMateTechnologyDiagram,
  ArchiMateViewpointDiagram,
  AreaChart,
  BPMNCollaborationDiagram,
  C4CodeDiagram,
  C4ComponentDiagram,
  C4ContextDiagram,
  C4DynamicDiagram,
  C4SystemLandscapeDiagram,
  ChoroplethMap,
  ConceptMap,
  DataLineage,
  DMNDiagram,
  DotPlot,
  GanttChart,
  GitGraph,
  Histogram,
  IsometricScene,
  Kruchten4Plus1View,
  NetworkGraph,
  NetworkTopology,
  PacketDiagram,
  QuadrantChart,
  RadialGauge,
  RequirementDiagram,
  SankeyDiagram,
  ScreenFlow,
  SitemapTree,
  StackedBarChart,
  SysMLBlockDiagram,
  TimelineDiagram,
  UMLDeploymentDiagram,
  UMLPackageDiagram,
  UMLSequenceDiagram,
  UseCaseDiagram,
  UserJourneyGantt,
  UserJourneyMap,
  ViewpointFrame,
  WaterfallChart,
  ZenUMLDiagram,
} from '@centurio1987/bbangto-ui-visualization';
import { MATRIX_FIXTURES } from './_matrixFixtures';

/**
 * Paint Gate 표본(fixture) — `templates` 가 내보내는 템플릿마다 하나씩 (KAN-063).
 *
 * `TemplatePaintGate.stories.tsx` 의 두 검사(리터럴 색 · 글자 대비)가 이 목록을 그린다. 표본이 없는 템플릿은
 * 리터럴 색이 들어와도, 글자가 바탕에 묻혀도 걸리지 않으므로, 새 템플릿을 내보내면 여기에도 더해야 한다.
 * 빠지면 `packages/foundations/src/vizPaintGateCoverage.test.ts` 가 `test:unit` 에서 그 이름으로 실패한다.
 * 그 검사가 이 파일을 정규식으로 읽으므로 형식을 지킨다 — 표본 하나는 `fromMatrix(key, 이름)` 호출이거나,
 * 템플릿 이름을 문자열 리터럴로 적은 `template` 필드와 그 템플릿을 그리는 `render` 를 가진 객체다.
 *
 * - 표본은 `fill`·`stroke` 를 명시하지 않는다. 명시한 prop 은 가이드를 이기는 것이 정상이라 검사가 무의미해진다.
 * - 데이터는 그룹 스토리(G2·G4·G5·G6·ChartsP2·DiagramsP2·DiagramsP3·Structure·IsometricGeometry)에서 검증된 값을
 *   옮겼다. 원래 스토리는 손대지 않는다.
 * - `key` 는 글자 대비 기준 목록(`_labelContrastBaseline.ts`)의 키에 들어가므로 바꾸지 않는다.
 * - 슬롯을 받는 메타 프레임(Kruchten4Plus1View · ViewpointFrame)은 슬롯을 비운다. 다른 템플릿을 넣으면 그 색까지
 *   프레임 몫으로 재게 된다.
 */
export interface PaintGateFixture {
  /** DOM `data-*-row`/`-cell` 값과 React key. 유일해야 한다(스토리 play 가 확인한다). */
  key: string;
  /** `templates/index.ts` 가 내보내는 이름. */
  template: string;
  render: () => ReactNode;
}

/** `_matrixFixtures.tsx` 의 표본을 그대로 쓴다. 그 파일은 TemplateStyleMatrix 와 함께 쓰므로 고치지 않는다. */
function fromMatrix(key: string, template: string): PaintGateFixture {
  const fx = MATRIX_FIXTURES.find((f) => f.key === key);
  if (!fx) throw new Error(`_matrixFixtures 에 key '${key}' 가 없습니다`);
  return { key, template, render: fx.render };
}

export const PAINT_GATE_FIXTURES: PaintGateFixture[] = [
  // ── matrix 에서 가져온 24개 ────────────────────────────────────────
  fromMatrix('flowchart', 'Flowchart'),
  fromMatrix('block-diagram', 'BlockDiagram'),
  fromMatrix('mindmap', 'Mindmap'),
  fromMatrix('kanban-board', 'KanbanBoard'),
  fromMatrix('c4-container', 'C4ContainerDiagram'),
  fromMatrix('architecture', 'ArchitectureDiagram'),
  fromMatrix('uml-component', 'UMLComponentDiagram'),
  fromMatrix('class-diagram', 'ClassDiagram'),
  fromMatrix('state-diagram', 'StateDiagram'),
  fromMatrix('er-diagram', 'ERDiagram'),
  fromMatrix('sequence-diagram', 'SequenceDiagram'),
  fromMatrix('bpmn', 'BPMNDiagram'),
  fromMatrix('bar-chart', 'BarChart'),
  fromMatrix('line-chart', 'LineChart'),
  fromMatrix('pie-chart', 'PieChart'),
  fromMatrix('radar-chart', 'RadarChart'),
  fromMatrix('treemap', 'Treemap'),
  fromMatrix('heatmap', 'Heatmap'),
  fromMatrix('scatter-plot', 'ScatterPlot'),
  fromMatrix('data-flow', 'DataFlowDiagram'),
  fromMatrix('fishbone', 'Fishbone'),
  fromMatrix('boxplot', 'Boxplot'),
  fromMatrix('chord-diagram', 'ChordDiagram'),
  fromMatrix('wbs', 'WorkBreakdownStructure'),

  // ── KAN-056 이 더한 7개 — G1·G2·G4·DiagramsP3 데이터를 줄였다 ─────────
  {
    key: 'archimate-business',
    template: 'ArchiMateBusinessDiagram',
    render: () => (
      <ArchiMateBusinessDiagram
        data={{
          elements: [
            { id: 'role1', x: 20, y: 40, width: 120, height: 70, name: 'Customer', kind: 'role' },
            { id: 'process1', x: 190, y: 40, width: 120, height: 70, name: 'Order Proc', kind: 'process' },
          ],
          relationships: [{ id: 'r1', from: 'role1', to: 'process1', kind: 'triggering' }],
        }}
        viewBox="0 0 340 150"
        width={340}
        height={150}
        title="ArchiMate Business"
      />
    ),
  },
  {
    key: 'bpmn-collaboration',
    template: 'BPMNCollaborationDiagram',
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
  },
  {
    key: 'c4-code',
    template: 'C4CodeDiagram',
    render: () => (
      <C4CodeDiagram
        data={{
          elements: [
            { id: 'cls1', x: 20, y: 20, width: 160, height: 120, name: 'User', kind: 'class', attributes: ['- id: string'], methods: ['+ login(): void'] },
            { id: 'cls2', x: 220, y: 20, width: 160, height: 120, name: 'Account', kind: 'class', attributes: ['- balance: number'], methods: ['+ deposit(n): void'] },
          ],
          relationships: [{ id: 'r1', from: 'cls1', to: 'cls2', label: 'has' }],
        }}
        viewBox="0 0 420 170"
        width={420}
        height={170}
        title="C4 Code"
      />
    ),
  },
  {
    key: 'requirement',
    template: 'RequirementDiagram',
    render: () => (
      <RequirementDiagram
        data={{
          requirements: [
            { id: 'r1', x: 20, y: 20, width: 160, height: 100, name: 'Authenticate', text: 'User must log in', kind: 'requirement' },
            { id: 'r2', x: 220, y: 20, width: 160, height: 100, name: 'Authorize', text: 'Role-based access', kind: 'functionalRequirement' },
          ],
          edges: [{ id: 're1', from: 'r1', to: 'r2', kind: 'derives' }],
        }}
        viewBox="0 0 420 150"
        width={420}
        height={150}
        title="Requirement diagram"
      />
    ),
  },
  {
    key: 'timeline',
    template: 'TimelineDiagram',
    render: () => (
      <TimelineDiagram
        data={{
          axisY: 110,
          events: [
            { id: 'ev1', x: 80, y: 20, width: 110, height: 50, label: 'Phase 1', date: '2024 Q1' },
            { id: 'ev2', x: 230, y: 20, width: 110, height: 50, label: 'Phase 2', date: '2024 Q2' },
          ],
        }}
        viewBox="0 0 360 160"
        width={360}
        height={160}
        title="Timeline"
      />
    ),
  },
  {
    key: 'uml-deployment',
    template: 'UMLDeploymentDiagram',
    render: () => (
      <UMLDeploymentDiagram
        data={{
          environments: [{ x: 10, y: 10, width: 420, height: 170, label: 'Production' }],
          nodes: [
            { id: 'web', x: 30, y: 40, width: 160, height: 100, name: 'Web Server' },
            { id: 'db', x: 240, y: 40, width: 160, height: 100, name: 'DB Server' },
          ],
          edges: [{ id: 'e1', from: 'web', to: 'db', label: 'JDBC' }],
        }}
        viewBox="0 0 450 200"
        width={450}
        height={200}
        title="UML Deployment"
      />
    ),
  },
  {
    key: 'uml-sequence',
    template: 'UMLSequenceDiagram',
    render: () => (
      <UMLSequenceDiagram
        data={{
          participants: [
            { id: 'client', x: 40, name: 'Client', width: 100 },
            { id: 'server', x: 240, name: 'Server', width: 100 },
          ],
          messages: [
            { id: 'm1', from: 'client', to: 'server', y: 100, label: 'POST /login', kind: 'sync' },
            { id: 'm2', from: 'server', to: 'client', y: 140, label: '200 OK', kind: 'return' },
          ],
        }}
        lifelineHeight={140}
        viewBox="0 0 380 200"
        width={380}
        height={200}
        title="UML Sequence"
      />
    ),
  },

  // ── KAN-063 이 더한 37개 ───────────────────────────────────────────
  // G2Templates
  {
    key: 'c4-context',
    template: 'C4ContextDiagram',
    render: () => (
      <C4ContextDiagram
        data={{
          boundary: { x: 160, y: 10, width: 200, height: 180, label: 'Internet Banking System' },
          persons: [{ id: 'user', x: 20, y: 50, width: 110, height: 120, name: 'Personal Banking Customer' }],
          systems: [{ id: 'ibs', x: 180, y: 50, width: 160, height: 120, name: 'Internet Banking System', level: 'l1' }],
          relationships: [{ id: 'r1', from: 'user', to: 'ibs', label: 'Views account balance' }],
        }}
        viewBox="0 0 400 220"
        width={400}
        height={220}
        title="C4 Context"
      />
    ),
  },
  {
    key: 'c4-component',
    template: 'C4ComponentDiagram',
    render: () => (
      <C4ComponentDiagram
        data={{
          containerBoundary: { x: 10, y: 10, width: 400, height: 200, label: 'API Server' },
          components: [
            { id: 'ctrl', x: 30, y: 50, width: 110, height: 80, name: 'AuthController' },
            { id: 'svc', x: 160, y: 50, width: 110, height: 80, name: 'UserService' },
            { id: 'repo', x: 290, y: 50, width: 110, height: 80, name: 'UserRepository' },
          ],
          relationships: [
            { id: 'r1', from: 'ctrl', to: 'svc', label: 'uses' },
            { id: 'r2', from: 'svc', to: 'repo', label: 'calls' },
          ],
        }}
        viewBox="0 0 430 230"
        width={430}
        height={230}
        title="C4 Component"
      />
    ),
  },
  // G4Templates
  {
    key: 'archimate',
    template: 'ArchiMateDiagram',
    render: () => (
      <ArchiMateDiagram
        layer="business"
        data={{
          elements: [
            { id: 'actor1', x: 20, y: 40, width: 120, height: 70, name: 'Clerk', kind: 'actor' },
            { id: 'service1', x: 190, y: 40, width: 120, height: 70, name: 'Billing', kind: 'service' },
          ],
          relationships: [{ id: 'r1', from: 'service1', to: 'actor1', kind: 'serving' }],
        }}
        viewBox="0 0 340 150"
        width={340}
        height={150}
        title="ArchiMate"
      />
    ),
  },
  {
    key: 'archimate-application',
    template: 'ArchiMateApplicationDiagram',
    render: () => (
      <ArchiMateApplicationDiagram
        data={{
          elements: [
            { id: 'comp1', x: 20, y: 40, width: 130, height: 70, name: 'Web Frontend', kind: 'component' },
            { id: 'comp2', x: 200, y: 40, width: 130, height: 70, name: 'API Service', kind: 'component' },
          ],
          relationships: [{ id: 'r1', from: 'comp1', to: 'comp2', kind: 'serving' }],
        }}
        viewBox="0 0 380 150"
        width={380}
        height={150}
        title="ArchiMate Application"
      />
    ),
  },
  {
    key: 'archimate-technology',
    template: 'ArchiMateTechnologyDiagram',
    render: () => (
      <ArchiMateTechnologyDiagram
        data={{
          elements: [
            { id: 'node1', x: 20, y: 40, width: 130, height: 70, name: 'App Server', kind: 'node' },
            { id: 'node2', x: 200, y: 40, width: 130, height: 70, name: 'DB Server', kind: 'device' },
          ],
          relationships: [{ id: 'r1', from: 'node1', to: 'node2', kind: 'association' }],
        }}
        viewBox="0 0 380 150"
        width={380}
        height={150}
        title="ArchiMate Technology"
      />
    ),
  },
  {
    key: 'sysml-block',
    template: 'SysMLBlockDiagram',
    render: () => (
      <SysMLBlockDiagram
        data={{
          blocks: [
            { id: 'vehicle', x: 20, y: 20, width: 160, height: 150, name: 'Vehicle', stereotype: 'block', values: ['+ mass: kg'], operations: ['+ accelerate(): void'] },
            { id: 'engine', x: 240, y: 20, width: 160, height: 150, name: 'Engine', stereotype: 'block', values: ['+ power: kW'], operations: ['+ start(): void'] },
          ],
          relationships: [{ id: 'r1', from: 'vehicle', to: 'engine', kind: 'composition' }],
        }}
        viewBox="0 0 440 210"
        width={440}
        height={210}
        title="SysML Block Diagram"
      />
    ),
  },
  {
    key: 'zenuml',
    template: 'ZenUMLDiagram',
    render: () => (
      <ZenUMLDiagram
        data={{
          participants: [
            { id: 'client', x: 80, name: 'Client', width: 90 },
            { id: 'api', x: 260, name: 'API', width: 90 },
          ],
          messages: [
            { id: 'm1', from: 'client', to: 'api', y: 90, label: 'request()', kind: 'sync' },
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
  },
  // G5Charts
  {
    key: 'quadrant',
    template: 'QuadrantChart',
    render: () => (
      <QuadrantChart
        data={{
          items: [
            { id: 'p1', label: 'Feature A', x: 20, y: 80 },
            { id: 'p2', label: 'Feature B', x: 70, y: 65 },
            { id: 'p3', label: 'Feature C', x: 40, y: 30 },
          ],
          xAxisLabel: 'Effort',
          yAxisLabel: 'Impact',
          quadrantLabels: ['Quick wins', 'Major', 'Fill-ins', 'Thankless'],
        }}
        viewBox="0 0 420 420"
        width={320}
        height={320}
        title="Quadrant chart"
      />
    ),
  },
  {
    key: 'radial-gauge',
    template: 'RadialGauge',
    render: () => (
      <RadialGauge
        data={{ value: 72, min: 0, max: 100, label: 'Uptime', unit: '%' }}
        viewBox="0 0 320 240"
        width={320}
        height={240}
        title="Radial gauge"
      />
    ),
  },
  {
    key: 'sankey',
    template: 'SankeyDiagram',
    render: () => (
      <SankeyDiagram
        data={{
          nodes: [
            { id: 'src', label: 'Traffic', x: 20, y: 40 },
            { id: 'signup', label: 'Signup', x: 240, y: 20 },
            { id: 'bounce', label: 'Bounce', x: 240, y: 160 },
            { id: 'paid', label: 'Paid', x: 440, y: 20 },
          ],
          links: [
            { source: 'src', target: 'signup', value: 60 },
            { source: 'src', target: 'bounce', value: 40 },
            { source: 'signup', target: 'paid', value: 35 },
          ],
        }}
        scale={1.6}
        viewBox="0 0 520 260"
        width={520}
        height={260}
        title="Sankey"
      />
    ),
  },
  {
    key: 'gantt',
    template: 'GanttChart',
    render: () => (
      <GanttChart
        data={{
          tasks: [
            { id: 't1', label: 'Research', start: 0, end: 3 },
            { id: 't2', label: 'Design', start: 2, end: 6 },
            { id: 't3', label: 'Build', start: 5, end: 10 },
          ],
        }}
        viewBox="0 0 560 260"
        width={480}
        height={223}
        title="Gantt chart"
      />
    ),
  },
  {
    key: 'user-journey-gantt',
    template: 'UserJourneyGantt',
    render: () => (
      <UserJourneyGantt
        data={{
          phases: [
            { id: 'p1', label: 'Awareness', start: 0, end: 2 },
            { id: 'p2', label: 'Consideration', start: 2, end: 5 },
            { id: 'p3', label: 'Purchase', start: 5, end: 6 },
          ],
        }}
        viewBox="0 0 620 240"
        width={520}
        height={201}
        title="User journey gantt"
      />
    ),
  },
  {
    key: 'user-journey-map',
    template: 'UserJourneyMap',
    render: () => (
      <UserJourneyMap
        data={{
          steps: [
            { id: 's1', label: 'Land', score: 60 },
            { id: 's2', label: 'Sign up', score: 35 },
            { id: 's3', label: 'Onboard', score: 50 },
            { id: 's4', label: 'First value', score: 80 },
          ],
        }}
        viewBox="0 0 640 300"
        width={520}
        height={244}
        title="User journey map"
      />
    ),
  },
  // G6MetaFrames — 슬롯은 비운다
  {
    key: 'kruchten-4plus1',
    template: 'Kruchten4Plus1View',
    render: () => (
      <Kruchten4Plus1View
        data={{
          development: ['ui/', 'domain/', 'infra/'],
          process: ['worker pool', 'event bus'],
          physical: ['edge node', 'db primary'],
          scenarios: ['Checkout', 'Refund'],
        }}
        viewBox="0 0 760 580"
        width={456}
        height={348}
        title="Kruchten 4+1 view"
      />
    ),
  },
  {
    key: 'viewpoint-frame',
    template: 'ViewpointFrame',
    render: () => (
      <ViewpointFrame
        viewpoint="Deployment viewpoint"
        concerns={['Scalability', 'Fault tolerance']}
        stakeholders={['Operations', 'SRE']}
        modelKinds={['Node diagram']}
        viewBox="0 0 660 480"
        width={440}
        height={320}
        title="ISO 42010 viewpoint frame"
      />
    ),
  },
  // ChartsP2
  {
    key: 'stacked-bar',
    template: 'StackedBarChart',
    render: () => (
      <StackedBarChart
        data={{
          categories: ['Q1', 'Q2', 'Q3'],
          series: [
            { id: 's1', label: 'Product', values: [30, 45, 20] },
            { id: 's2', label: 'Service', values: [20, 15, 35] },
          ],
        }}
        viewBox="0 0 480 300"
        width={400}
        height={250}
        title="Stacked bar"
      />
    ),
  },
  {
    key: 'area-chart',
    template: 'AreaChart',
    render: () => (
      <AreaChart
        data={{
          series: [
            { id: 'a', label: 'A', points: [{ x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 18 }, { x: 3, y: 30 }] },
            { id: 'b', label: 'B', points: [{ x: 0, y: 6 }, { x: 1, y: 12 }, { x: 2, y: 22 }, { x: 3, y: 14 }] },
          ],
        }}
        stacked
        viewBox="0 0 480 300"
        width={400}
        height={250}
        title="Stacked area"
      />
    ),
  },
  {
    key: 'histogram',
    template: 'Histogram',
    render: () => (
      <Histogram
        data={{ values: [1, 2, 2, 3, 3, 3, 4, 4, 5, 8, 9, 9] }}
        bins={4}
        viewBox="0 0 480 300"
        width={400}
        height={250}
        title="Histogram"
      />
    ),
  },
  {
    key: 'dot-plot',
    template: 'DotPlot',
    render: () => (
      <DotPlot
        data={{
          items: [
            { id: 'a', label: 'Alpha', value: 40 },
            { id: 'b', label: 'Beta', value: 72 },
            { id: 'c', label: 'Gamma', value: 55 },
          ],
        }}
        mode="dot"
        viewBox="0 0 480 240"
        width={400}
        height={200}
        title="Dot plot"
      />
    ),
  },
  {
    key: 'waterfall',
    template: 'WaterfallChart',
    render: () => (
      <WaterfallChart
        data={{
          items: [
            { id: 'start', label: 'Start', value: 100 },
            { id: 'a', label: 'Gain', value: 40 },
            { id: 'b', label: 'Loss', value: -30 },
          ],
        }}
        showTotal
        totalLabel="Net"
        viewBox="0 0 500 300"
        width={400}
        height={240}
        title="Waterfall"
      />
    ),
  },
  {
    key: 'choropleth',
    template: 'ChoroplethMap',
    render: () => (
      <ChoroplethMap
        data={{
          regions: [
            { id: 'r1', d: 'M10,10 H120 V110 H10 Z', label: 'North' },
            { id: 'r2', d: 'M130,10 H240 V110 H130 Z', label: 'South' },
            { id: 'r3', d: 'M10,120 H240 V220 H10 Z', label: 'East' },
          ],
          items: [
            { id: 'r1', value: 20 },
            { id: 'r2', value: 80 },
            { id: 'r3', value: 50 },
          ],
        }}
        viewBox="0 0 260 240"
        width={260}
        height={240}
        title="Choropleth"
      />
    ),
  },
  // DiagramsP2
  {
    key: 'use-case',
    template: 'UseCaseDiagram',
    render: () => (
      <UseCaseDiagram
        data={{
          system: { label: 'Shop', x: 150, y: 20, width: 220, height: 240 },
          actors: [
            { id: 'user', label: 'Customer', x: 20, y: 90 },
            { id: 'admin', label: 'Admin', x: 440, y: 90 },
          ],
          useCases: [
            { id: 'browse', label: 'Browse', x: 180, y: 50 },
            { id: 'checkout', label: 'Checkout', x: 180, y: 130 },
          ],
          links: [
            { from: 'user', to: 'browse' },
            { from: 'admin', to: 'checkout' },
            { from: 'checkout', to: 'browse', kind: 'include' },
          ],
        }}
        viewBox="0 0 520 300"
        width={416}
        height={240}
        title="Use case"
      />
    ),
  },
  {
    key: 'c4-dynamic',
    template: 'C4DynamicDiagram',
    render: () => (
      <C4DynamicDiagram
        data={{
          elements: [
            { id: 'spa', name: 'SPA', technology: 'React', x: 30, y: 40, width: 140, height: 70, level: 'l2' },
            { id: 'api', name: 'API', technology: 'Node', x: 260, y: 40, width: 140, height: 70, level: 'l2' },
          ],
          steps: [{ id: 's1', from: 'spa', to: 'api', order: 1, label: 'GET /orders' }],
        }}
        viewBox="0 0 440 150"
        width={440}
        height={150}
        title="C4 dynamic"
      />
    ),
  },
  {
    key: 'c4-system-landscape',
    template: 'C4SystemLandscapeDiagram',
    render: () => (
      <C4SystemLandscapeDiagram
        data={{
          systems: [
            { id: 'shop', name: 'Shop', x: 40, y: 60, width: 150, height: 80, level: 'l1' },
            { id: 'pay', name: 'Payments', x: 250, y: 60, width: 150, height: 80, level: 'l1' },
            { id: 'crm', name: 'CRM', x: 250, y: 190, width: 150, height: 80, level: 'l1', external: true },
          ],
          boundaries: [{ x: 20, y: 30, width: 390, height: 130, label: 'Enterprise' }],
          relationships: [
            { id: 'r1', from: 'shop', to: 'pay', label: 'uses' },
            { id: 'r2', from: 'shop', to: 'crm', label: 'syncs' },
          ],
        }}
        viewBox="0 0 440 300"
        width={440}
        height={300}
        title="C4 landscape"
      />
    ),
  },
  {
    key: 'activity',
    template: 'ActivityDiagram',
    render: () => (
      <ActivityDiagram
        data={{
          nodes: [
            { id: 'start', kind: 'start', x: 100, y: 20, width: 20, height: 20 },
            { id: 'a1', kind: 'action', label: 'Receive', x: 60, y: 70, width: 100, height: 44 },
            { id: 'd1', kind: 'decision', label: 'Valid?', x: 70, y: 140, width: 80, height: 60 },
            { id: 'a2', kind: 'action', label: 'Process', x: 200, y: 150, width: 100, height: 44 },
            { id: 'end', kind: 'end', x: 240, y: 240, width: 22, height: 22 },
          ],
          edges: [
            { from: 'start', to: 'a1' },
            { from: 'a1', to: 'd1' },
            { from: 'd1', to: 'a2', label: 'yes' },
            { from: 'a2', to: 'end' },
          ],
        }}
        viewBox="0 0 340 300"
        width={340}
        height={300}
        title="Activity"
      />
    ),
  },
  {
    key: 'concept-map',
    template: 'ConceptMap',
    render: () => (
      <ConceptMap
        data={{
          nodes: [
            { id: 'water', label: 'Water', x: 40, y: 30, width: 110, height: 46 },
            { id: 'cloud', label: 'Cloud', x: 260, y: 30, width: 110, height: 46 },
            { id: 'rain', label: 'Rain', x: 260, y: 170, width: 110, height: 46 },
          ],
          links: [
            { from: 'water', to: 'cloud', label: 'evaporates to' },
            { from: 'cloud', to: 'rain', label: 'condenses as' },
          ],
        }}
        viewBox="0 0 420 250"
        width={420}
        height={250}
        title="Concept map"
      />
    ),
  },
  // DiagramsP3
  {
    key: 'uml-package',
    template: 'UMLPackageDiagram',
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
  },
  {
    key: 'dmn',
    template: 'DMNDiagram',
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
  },
  {
    key: 'archimate-viewpoint',
    template: 'ArchiMateViewpointDiagram',
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
  },
  // Structure
  {
    key: 'git-graph',
    template: 'GitGraph',
    render: () => (
      <GitGraph
        data={{
          branches: [
            { id: 'main', label: 'main' },
            { id: 'feat', label: 'feature' },
          ],
          commits: [
            { id: 'c1', branch: 'main', label: 'init' },
            { id: 'c2', branch: 'feat', label: 'wip' },
            { id: 'c3', branch: 'main', label: 'merge' },
          ],
          merges: [{ from: 'c2', to: 'c3' }],
        }}
        viewBox="0 0 560 220"
        width={448}
        height={176}
        title="Git graph"
      />
    ),
  },
  {
    key: 'packet',
    template: 'PacketDiagram',
    render: () => (
      <PacketDiagram
        data={{
          fields: [
            { label: 'Source Port', bits: 16 },
            { label: 'Dest Port', bits: 16 },
            { label: 'Sequence Number', bits: 32 },
          ],
        }}
        viewBox="0 0 640 180"
        width={512}
        height={144}
        title="Packet diagram"
      />
    ),
  },
  {
    key: 'network-topology',
    template: 'NetworkTopology',
    render: () => (
      <NetworkTopology
        data={{
          zones: [
            { id: 'dmz', label: 'DMZ', x: 20, y: 40, width: 220, height: 200 },
            { id: 'internal', label: 'Internal', x: 300, y: 40, width: 260, height: 200 },
          ],
          nodes: [
            { id: 'web', label: 'Web', x: 90, y: 130, zone: 'dmz' },
            { id: 'app', label: 'App', x: 360, y: 90, zone: 'internal' },
            { id: 'db', label: 'DB', x: 360, y: 170, zone: 'internal', shape: 'cylinder' },
          ],
          links: [
            { from: 'web', to: 'app' },
            { from: 'app', to: 'db' },
          ],
        }}
        viewBox="0 0 600 280"
        width={480}
        height={224}
        title="Network topology"
      />
    ),
  },
  {
    key: 'data-lineage',
    template: 'DataLineage',
    render: () => (
      <DataLineage
        data={{
          nodes: [
            { id: 'src', label: 'Source', detail: 'events', x: 20, y: 80 },
            { id: 'stg', label: 'Staging', detail: 'clean', x: 220, y: 80 },
            { id: 'dw', label: 'Warehouse', detail: 'facts', x: 420, y: 80 },
          ],
          edges: [
            { from: 'src', to: 'stg', label: 'ETL' },
            { from: 'stg', to: 'dw', label: 'load' },
          ],
        }}
        viewBox="0 0 600 220"
        width={480}
        height={176}
        title="Data lineage"
      />
    ),
  },
  {
    key: 'sitemap-tree',
    template: 'SitemapTree',
    render: () => (
      <SitemapTree
        data={{
          root: {
            id: 'home',
            label: 'Home',
            children: [
              { id: 'products', label: 'Products', children: [{ id: 'p1', label: 'List' }] },
              { id: 'about', label: 'About' },
            ],
          },
        }}
        viewBox="0 0 640 320"
        width={480}
        height={240}
        title="Sitemap tree"
      />
    ),
  },
  {
    key: 'network-graph',
    template: 'NetworkGraph',
    render: () => (
      <NetworkGraph
        data={{
          nodes: [
            { id: 'hub', label: 'Core', x: 300, y: 150, hub: true },
            { id: 'a', label: 'A', x: 120, y: 60 },
            { id: 'b', label: 'B', x: 480, y: 240 },
          ],
          edges: [
            { from: 'hub', to: 'a' },
            { from: 'hub', to: 'b' },
          ],
        }}
        viewBox="0 0 600 300"
        width={480}
        height={240}
        title="Network graph"
      />
    ),
  },
  {
    key: 'screen-flow',
    template: 'ScreenFlow',
    render: () => (
      <ScreenFlow
        data={{
          screens: [
            { id: 'login', title: 'Login', x: 20, y: 60 },
            { id: 'home', title: 'Home', x: 240, y: 60 },
          ],
          flows: [{ from: 'login', to: 'home', label: 'sign in' }],
        }}
        viewBox="0 0 440 260"
        width={440}
        height={260}
        title="Screen flow"
      />
    ),
  },
  // IsometricGeometry
  {
    key: 'isometric-scene',
    template: 'IsometricScene',
    render: () => (
      <IsometricScene
        data={{
          cells: [
            { id: 'A', x: 0, y: 0, w: 1, d: 1, h: 1, label: 'API' },
            { id: 'B', x: 1, y: 0, w: 1, d: 1, h: 1.4, label: 'Web' },
            { id: 'C', x: 2, y: 1, w: 1, d: 1, h: 0.8, label: 'DB' },
          ],
          links: [
            { from: 'A', to: 'B' },
            { from: 'B', to: 'C' },
          ],
        }}
        viewBox="0 0 520 380"
        width={416}
        height={304}
        title="Isometric scene"
      />
    ),
  },
];
