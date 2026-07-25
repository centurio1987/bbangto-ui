import type { ReactNode } from 'react';
import {
  // G1
  Flowchart,
  BlockDiagram,
  Mindmap,
  KanbanBoard,
  // G2
  C4ContainerDiagram,
  ArchitectureDiagram,
  UMLComponentDiagram,
  // G3
  ClassDiagram,
  StateDiagram,
  ERDiagram,
  // G4
  SequenceDiagram,
  BPMNDiagram,
  // G5
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  Treemap,
  // P2
  Heatmap,
  ScatterPlot,
  DataFlowDiagram,
  Fishbone,
  // P3
  Boxplot,
  ChordDiagram,
  WorkBreakdownStructure,
} from '@centurio1987/bbangto-ui-visualization';

/**
 * 스타일 매트릭스(ExpandedMatrix)용 공유 fixture 레지스트리.
 *
 * 각 fixture는 고정 데이터/viewBox/dims로 템플릿 1개를 렌더한다(가이드 provider는
 * 스토리가 감싼다). 데이터는 그룹 스토리(G1~G5/ChartsP2/DiagramsP2/ChartsP3/
 * DiagramsP3)에서 이미 검증된 값을 **복사**한 것 — 기존 스토리는 손대지 않는다.
 *
 * 24종은 모든 그룹(G1~G5·P2·P3)과 서로 다른 geometry 프리미티브(node-edge,
 * lifeline, bar/line/pie/radar, treemap/heatmap, chord/box 등)를 커버한다.
 * 전 fixture가 paint 게이트 셀렉터(`[data-viz-part="shape"]` 또는
 * `[data-bbangto-viz-edge]`) 중 최소 하나를 방출함이 확인됐고, play가
 * paintSig non-empty로 이를 다시 강제한다.
 */
export type MatrixGroup = 'G1' | 'G2' | 'G3' | 'G4' | 'G5' | 'P2' | 'P3';

export interface MatrixFixture {
  /** DOM `data-matrix-row` 값 + React key. slug-safe·유일해야 함(play가 검증). */
  key: string;
  /** 행 헤딩 + svg `<title>`. */
  label: string;
  group: MatrixGroup;
  /** 고정 데이터로 템플릿 1개 렌더(스타일 가이드 provider는 스토리가 감쌈). */
  render: () => ReactNode;
}

export const MATRIX_FIXTURES: MatrixFixture[] = [
  // ── G1 ────────────────────────────────────────────────────────────
  {
    key: 'flowchart',
    label: 'Flowchart',
    group: 'G1',
    render: () => (
      <Flowchart
        data={{
          nodes: [
            { id: 'a', x: 30, y: 30, width: 110, height: 50, label: 'Start', shape: 'stadium' },
            { id: 'b', x: 200, y: 30, width: 110, height: 50, label: 'Work', shape: 'rect' },
            { id: 'c', x: 370, y: 30, width: 110, height: 50, label: 'Done', shape: 'stadium' },
          ],
          edges: [
            { id: 'e1', from: 'a', to: 'b' },
            { id: 'e2', from: 'b', to: 'c' },
          ],
        }}
        viewBox="0 0 510 110"
        width={510}
        height={110}
        title="Flowchart"
      />
    ),
  },
  {
    key: 'block-diagram',
    label: 'Block Diagram',
    group: 'G1',
    render: () => (
      <BlockDiagram
        data={{
          nodes: [
            { id: 'b1', x: 20, y: 50, width: 120, height: 60, label: 'Auth' },
            { id: 'b2', x: 180, y: 50, width: 120, height: 60, label: 'API' },
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
        title="Block Diagram"
      />
    ),
  },
  {
    key: 'mindmap',
    label: 'Mindmap',
    group: 'G1',
    render: () => (
      <Mindmap
        data={{
          nodes: [
            { id: 'root', x: 220, y: 100, width: 100, height: 50, label: 'Mindmap', level: 0 },
            { id: 'b1', x: 50, y: 40, width: 100, height: 40, label: 'Topic A', level: 1 },
            { id: 'b2', x: 50, y: 170, width: 100, height: 40, label: 'Topic B', level: 1 },
            { id: 'b3', x: 400, y: 40, width: 100, height: 40, label: 'Topic C', level: 1 },
            { id: 'b4', x: 400, y: 170, width: 100, height: 40, label: 'Topic D', level: 1 },
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
  },
  {
    key: 'kanban-board',
    label: 'Kanban Board',
    group: 'G1',
    render: () => (
      <KanbanBoard
        data={{
          columns: [
            { id: 'col1', x: 10, y: 10, width: 150, height: 340, title: 'Todo' },
            { id: 'col2', x: 170, y: 10, width: 150, height: 340, title: 'In Progress' },
            { id: 'col3', x: 330, y: 10, width: 150, height: 340, title: 'Done' },
          ],
          cards: [
            { id: 'c1', x: 18, y: 54, width: 134, height: 60, label: 'Task A' },
            { id: 'c2', x: 18, y: 126, width: 134, height: 60, label: 'Task B' },
            { id: 'c3', x: 178, y: 54, width: 134, height: 60, label: 'Task C' },
            { id: 'c4', x: 338, y: 54, width: 134, height: 60, label: 'Task D' },
          ],
        }}
        viewBox="0 0 490 360"
        width={490}
        height={360}
        title="Kanban Board"
      />
    ),
  },

  // ── G2 ────────────────────────────────────────────────────────────
  {
    key: 'c4-container',
    label: 'C4 Container',
    group: 'G2',
    render: () => (
      <C4ContainerDiagram
        data={{
          containers: [
            { id: 'web', x: 30, y: 40, width: 150, height: 90, name: 'Web App', technology: 'React' },
            { id: 'db', x: 260, y: 40, width: 150, height: 90, name: 'Store', technology: 'SQL' },
          ],
          relationships: [{ id: 'r1', from: 'web', to: 'db', label: 'reads' }],
        }}
        viewBox="0 0 440 170"
        width={440}
        height={170}
        title="C4 Container"
      />
    ),
  },
  {
    key: 'architecture',
    label: 'Architecture Diagram',
    group: 'G2',
    render: () => (
      <ArchitectureDiagram
        data={{
          groups: [
            { x: 10, y: 10, width: 200, height: 200, label: 'Frontend' },
            { x: 230, y: 10, width: 200, height: 200, label: 'Backend' },
          ],
          services: [
            { id: 'svc1', x: 50, y: 70, width: 120, height: 70, label: 'Web Client' },
            { id: 'svc2', x: 270, y: 70, width: 120, height: 70, label: 'API Server' },
            { id: 'svc3', x: 270, y: 160, width: 120, height: 40, label: 'Database' },
          ],
          edges: [
            { id: 'e1', from: 'svc1', to: 'svc2', label: 'HTTPS' },
            { id: 'e2', from: 'svc2', to: 'svc3', label: 'SQL' },
          ],
        }}
        viewBox="0 0 460 240"
        width={460}
        height={240}
        title="Architecture Diagram"
      />
    ),
  },
  {
    key: 'uml-component',
    label: 'UML Component',
    group: 'G2',
    render: () => (
      <UMLComponentDiagram
        data={{
          components: [
            {
              id: 'comp1',
              x: 40,
              y: 60,
              width: 130,
              height: 80,
              name: 'OrderService',
              providedInterfaces: [{ name: 'IOrder', x: 170, y: 100 }],
            },
            { id: 'comp2', x: 280, y: 60, width: 130, height: 80, name: 'PaymentService' },
          ],
          dependencies: [{ id: 'd1', from: 'comp1', to: 'comp2', label: '«use»' }],
        }}
        viewBox="0 0 460 200"
        width={460}
        height={200}
        title="UML Component"
      />
    ),
  },

  // ── G3 ────────────────────────────────────────────────────────────
  {
    key: 'class-diagram',
    label: 'Class Diagram',
    group: 'G3',
    render: () => (
      <ClassDiagram
        data={{
          classes: [
            {
              id: 'animal',
              x: 20,
              y: 20,
              width: 160,
              height: 130,
              name: 'Animal',
              attributes: ['# name: string'],
              methods: ['+ speak(): void'],
            },
            {
              id: 'dog',
              x: 20,
              y: 210,
              width: 160,
              height: 130,
              name: 'Dog',
              attributes: ['+ breed: string'],
              methods: ['+ speak(): void'],
            },
            {
              id: 'owner',
              x: 230,
              y: 20,
              width: 160,
              height: 100,
              name: 'Owner',
              attributes: ['+ name: string'],
              methods: [],
            },
          ],
          relationships: [
            { id: 'r1', from: 'dog', to: 'animal', kind: 'inheritance' },
            { id: 'r2', from: 'owner', to: 'dog', kind: 'aggregation' },
          ],
        }}
        viewBox="0 0 420 380"
        width={420}
        height={380}
        title="Class Diagram"
      />
    ),
  },
  {
    key: 'state-diagram',
    label: 'State Diagram',
    group: 'G3',
    render: () => (
      <StateDiagram
        data={{
          states: [
            { id: 's0', x: 80, y: 10, variant: 'start' },
            { id: 's1', x: 40, y: 70, width: 120, height: 50, title: 'Idle', variant: 'normal' },
            { id: 's2', x: 40, y: 180, width: 120, height: 50, title: 'Running', variant: 'normal' },
            { id: 'send', x: 80, y: 290, variant: 'end' },
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
  },
  {
    key: 'er-diagram',
    label: 'ER Diagram',
    group: 'G3',
    render: () => (
      <ERDiagram
        data={{
          entities: [
            {
              id: 'user',
              x: 20,
              y: 30,
              width: 170,
              name: 'User',
              attributes: [
                { name: 'id', type: 'int', key: 'PK' },
                { name: 'email', type: 'varchar' },
                { name: 'name', type: 'varchar' },
              ],
            },
            {
              id: 'order',
              x: 260,
              y: 30,
              width: 170,
              name: 'Order',
              attributes: [
                { name: 'id', type: 'int', key: 'PK' },
                { name: 'total', type: 'decimal' },
                { name: 'user_id', type: 'int', key: 'FK' },
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
  },

  // ── G4 ────────────────────────────────────────────────────────────
  {
    key: 'sequence-diagram',
    label: 'Sequence Diagram',
    group: 'G4',
    render: () => (
      <SequenceDiagram
        data={{
          participants: [
            { id: 'ui', name: 'Client', x: 40 },
            { id: 'api', name: 'API', x: 220 },
          ],
          messages: [
            { id: 'm1', from: 'ui', to: 'api', label: 'request()', y: 90 },
            { id: 'm2', from: 'api', to: 'ui', label: 'response', y: 130, kind: 'return' },
          ],
        }}
        viewBox="0 0 340 180"
        width={340}
        height={180}
        title="Sequence Diagram"
      />
    ),
  },
  {
    key: 'bpmn',
    label: 'BPMN Diagram',
    group: 'G4',
    render: () => (
      <BPMNDiagram
        data={{
          lanes: [
            { x: 0, y: 0, width: 520, height: 120, label: 'Customer' },
            { x: 0, y: 120, width: 520, height: 120, label: 'System' },
          ],
          events: [
            { id: 'start', x: 50, y: 60, kind: 'start', label: 'Order\nPlaced' },
            { id: 'end', x: 470, y: 60, kind: 'end', label: 'Completed' },
          ],
          tasks: [
            { id: 'pay', x: 120, y: 160, width: 100, height: 60, label: 'Process\nPayment' },
            { id: 'fulfill', x: 300, y: 160, width: 100, height: 60, label: 'Fulfil\nOrder' },
          ],
          gateways: [{ id: 'gw1', x: 240, y: 60, kind: 'exclusive', label: 'Valid?' }],
          flows: [
            { id: 'f1', from: 'start', to: 'gw1' },
            { id: 'f2', from: 'gw1', to: 'pay' },
            { id: 'f3', from: 'pay', to: 'fulfill' },
            { id: 'f4', from: 'fulfill', to: 'end' },
          ],
        }}
        viewBox="0 0 520 240"
        width={520}
        height={240}
        title="BPMN Diagram"
      />
    ),
  },

  // ── G5 ────────────────────────────────────────────────────────────
  {
    key: 'bar-chart',
    label: 'Bar Chart',
    group: 'G5',
    render: () => (
      <BarChart
        data={{
          items: [
            { id: 'a', label: 'Q1', value: 40 },
            { id: 'b', label: 'Q2', value: 72 },
            { id: 'c', label: 'Q3', value: 55 },
            { id: 'd', label: 'Q4', value: 90 },
          ],
        }}
        viewBox="0 0 480 300"
        width={480}
        height={300}
        title="Bar Chart"
      />
    ),
  },
  {
    key: 'line-chart',
    label: 'Line Chart',
    group: 'G5',
    render: () => (
      <LineChart
        data={{
          series: [
            {
              id: 's1',
              label: 'A',
              points: [
                { x: 0, y: 10 },
                { x: 1, y: 30 },
                { x: 2, y: 22 },
                { x: 3, y: 48 },
              ],
            },
            {
              id: 's2',
              label: 'B',
              points: [
                { x: 0, y: 25 },
                { x: 1, y: 18 },
                { x: 2, y: 40 },
                { x: 3, y: 35 },
              ],
            },
          ],
        }}
        viewBox="0 0 480 300"
        width={480}
        height={300}
        title="Line Chart"
      />
    ),
  },
  {
    key: 'pie-chart',
    label: 'Pie Chart',
    group: 'G5',
    render: () => (
      <PieChart
        data={{
          items: [
            { id: 'a', label: 'Chrome', value: 63 },
            { id: 'b', label: 'Safari', value: 20 },
            { id: 'c', label: 'Edge', value: 10 },
            { id: 'd', label: 'Other', value: 7 },
          ],
        }}
        mode="donut"
        viewBox="0 0 420 360"
        width={420}
        height={360}
        title="Pie Chart"
      />
    ),
  },
  {
    key: 'radar-chart',
    label: 'Radar Chart',
    group: 'G5',
    render: () => (
      <RadarChart
        data={{
          axes: ['Speed', 'Power', 'Range', 'Cost', 'Weight'],
          series: [
            { id: 'r1', label: 'Model A', values: [80, 60, 70, 40, 55] },
            { id: 'r2', label: 'Model B', values: [50, 90, 45, 70, 65] },
          ],
          max: 100,
        }}
        viewBox="0 0 420 420"
        width={420}
        height={420}
        title="Radar Chart"
      />
    ),
  },
  {
    key: 'treemap',
    label: 'Treemap',
    group: 'G5',
    render: () => (
      <Treemap
        data={{
          items: [
            { id: 'a', label: 'Eng', value: 42 },
            { id: 'b', label: 'Sales', value: 28 },
            { id: 'c', label: 'Ops', value: 16 },
            { id: 'd', label: 'HR', value: 9 },
            { id: 'e', label: 'Legal', value: 5 },
          ],
        }}
        viewBox="0 0 480 320"
        width={480}
        height={320}
        title="Treemap"
      />
    ),
  },

  // ── P2 ────────────────────────────────────────────────────────────
  {
    key: 'heatmap',
    label: 'Heatmap',
    group: 'P2',
    render: () => (
      <Heatmap
        data={{
          rows: ['Mon', 'Tue', 'Wed'],
          cols: ['AM', 'PM', 'Eve'],
          cells: [
            { row: 'Mon', col: 'AM', value: 2 },
            { row: 'Mon', col: 'PM', value: 8 },
            { row: 'Mon', col: 'Eve', value: 5 },
            { row: 'Tue', col: 'AM', value: 1 },
            { row: 'Tue', col: 'PM', value: 9 },
            { row: 'Tue', col: 'Eve', value: 4 },
            { row: 'Wed', col: 'AM', value: 6 },
            { row: 'Wed', col: 'PM', value: 3 },
            { row: 'Wed', col: 'Eve', value: 7 },
          ],
        }}
        viewBox="0 0 420 320"
        width={420}
        height={320}
        title="Heatmap"
      />
    ),
  },
  {
    key: 'scatter-plot',
    label: 'Scatter Plot',
    group: 'P2',
    render: () => (
      <ScatterPlot
        data={{
          series: [
            {
              id: 'g1',
              label: 'Group 1',
              points: [
                { id: 'p1', x: 10, y: 20, size: 5 },
                { id: 'p2', x: 30, y: 45, size: 12 },
                { id: 'p3', x: 55, y: 30, size: 8 },
              ],
            },
            {
              id: 'g2',
              label: 'Group 2',
              points: [
                { id: 'p4', x: 20, y: 60, size: 6 },
                { id: 'p5', x: 48, y: 15, size: 15 },
              ],
            },
          ],
        }}
        sizeDomain={[0, 15]}
        viewBox="0 0 480 320"
        width={480}
        height={320}
        title="Scatter Plot"
      />
    ),
  },
  {
    key: 'data-flow',
    label: 'Data Flow Diagram',
    group: 'P2',
    render: () => (
      <DataFlowDiagram
        data={{
          nodes: [
            { id: 'user', label: 'User', kind: 'external', x: 30, y: 100, width: 90, height: 50 },
            { id: 'proc', label: 'Validate', kind: 'process', x: 200, y: 95, width: 90, height: 60 },
            { id: 'store', label: 'Orders', kind: 'store', x: 370, y: 100, width: 110, height: 50 },
          ],
          flows: [
            { from: 'user', to: 'proc', label: 'request' },
            { from: 'proc', to: 'store', label: 'write' },
          ],
          boundaries: [{ id: 'tb', label: 'Trust boundary', x: 170, y: 60, width: 150, height: 150 }],
        }}
        viewBox="0 0 510 260"
        width={510}
        height={260}
        title="Data Flow Diagram"
      />
    ),
  },
  {
    key: 'fishbone',
    label: 'Fishbone',
    group: 'P2',
    render: () => (
      <Fishbone
        data={{
          problem: 'Late delivery',
          categories: [
            { id: 'people', label: 'People', causes: ['Understaffed', 'Training'] },
            { id: 'process', label: 'Process', causes: ['Manual steps'] },
            { id: 'tools', label: 'Tools', causes: ['Slow CI'] },
            { id: 'env', label: 'Environment', causes: ['Flaky infra'] },
          ],
        }}
        viewBox="0 0 560 280"
        width={560}
        height={280}
        title="Fishbone"
      />
    ),
  },

  // ── P3 ────────────────────────────────────────────────────────────
  {
    key: 'boxplot',
    label: 'Boxplot',
    group: 'P3',
    render: () => (
      <Boxplot
        data={{
          groups: [
            { id: 'a', label: 'A', values: [12, 15, 17, 18, 20, 21, 24] },
            { id: 'b', label: 'B', values: [8, 10, 11, 13, 14, 30] },
            { id: 'c', label: 'C', values: [16, 18, 19, 20, 22, 23, 25, 26] },
          ],
        }}
        viewBox="0 0 460 300"
        width={460}
        height={300}
        title="Boxplot"
      />
    ),
  },
  {
    key: 'chord-diagram',
    label: 'Chord Diagram',
    group: 'P3',
    render: () => (
      <ChordDiagram
        data={{
          nodes: [
            { id: 'x', label: 'X' },
            { id: 'y', label: 'Y' },
            { id: 'z', label: 'Z' },
          ],
          matrix: [
            [0, 5, 3],
            [5, 0, 2],
            [3, 2, 1],
          ],
        }}
        viewBox="0 0 320 320"
        width={320}
        height={320}
        title="Chord Diagram"
      />
    ),
  },
  {
    key: 'wbs',
    label: 'Work Breakdown Structure',
    group: 'P3',
    render: () => (
      <WorkBreakdownStructure
        data={{
          root: {
            id: 'proj',
            label: 'Website',
            children: [
              {
                id: 'design',
                label: 'Design',
                children: [
                  { id: 'wf', label: 'Wireframe' },
                  { id: 'ui', label: 'UI kit' },
                ],
              },
              { id: 'build', label: 'Build', children: [{ id: 'fe', label: 'Frontend' }] },
            ],
          },
        }}
        viewBox="0 0 620 320"
        width={620}
        height={320}
        title="Work Breakdown Structure"
      />
    ),
  },
];
