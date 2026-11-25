import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  Flowchart,
  C4ContextDiagram,
  Kruchten4Plus1View,
  ViewpointFrame,
  ViewsAndBeyondFrame,
  C4ContainerDiagram,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Templates/G6-MetaFrames',
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

// 중첩용 소형 프리셋 — "다른 프리셋을 조합" 계약 검증.
const LOGICAL_FLOW = (
  <Flowchart
    data={{
      nodes: [
        { id: 'a', x: 20, y: 30, width: 110, height: 48, label: 'Order', shape: 'rect' as const },
        { id: 'b', x: 190, y: 30, width: 110, height: 48, label: 'Invoice', shape: 'rect' as const },
      ],
      edges: [{ id: 'ab', from: 'a', to: 'b' }],
    }}
    viewBox="0 0 320 110"
    title="Logical domain flow"
  />
);

// ── Kruchten4Plus1View (G6, PLAN §D) ──────────────────────────────────
export const Kruchten4Plus1: Story = {
  render: () => (
    <Kruchten4Plus1View
      slots={{ logical: LOGICAL_FLOW }}
      data={{
        development: ['ui/', 'domain/', 'infra/'],
        process: ['worker pool', 'event bus', 'scheduler'],
        physical: ['edge node', 'app cluster', 'db primary'],
        scenarios: ['Checkout', 'Refund', 'Restock'],
      }}
      viewBox="0 0 760 580"
      width={760}
      height={580}
      title="Kruchten 4+1 view"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    // 5개 영역 슬롯이 모두 렌더된다.
    const regions = Array.from(
      canvasElement.querySelectorAll('[data-bbangto-viz-kruchten-region]'),
    );
    await expect(regions.length).toBe(5);
    const keys = regions.map((r) => r.getAttribute('data-bbangto-viz-kruchten-region-key')).sort();
    await expect(keys).toEqual(['development', 'logical', 'physical', 'process', 'scenarios']);

    const root = canvasElement.querySelector('[data-bbangto-viz-chart="kruchten-4plus1"]')!;
    // 표준 뷰 라벨 + (+1) 시나리오.
    await expect(root.textContent).toContain('Logical View');
    await expect(root.textContent).toContain('Development View');
    await expect(root.textContent).toContain('Process View');
    await expect(root.textContent).toContain('Physical View');
    await expect(root.textContent).toContain('Scenarios');

    // logical 영역은 중첩 프리셋(슬롯) 렌더 — nested svg 존재.
    const logical = canvasElement.querySelector(
      '[data-bbangto-viz-kruchten-region-key="logical"]',
    )!;
    await expect(logical.querySelector('[data-bbangto-viz-kruchten-slot] svg')).not.toBeNull();
    await expect(logical.textContent).toContain('Invoice');

    // data 폴백 영역은 불릿 항목 렌더.
    const dev = canvasElement.querySelector('[data-bbangto-viz-kruchten-region-key="development"]')!;
    await expect(dev.querySelectorAll('[data-bbangto-viz-kruchten-item]').length).toBe(3);
  },
};

// ── ViewpointFrame (ISO/IEC/IEEE 42010) ───────────────────────────────
export const ViewpointFrameISO42010: Story = {
  render: () => (
    <ViewpointFrame
      viewpoint="Deployment viewpoint"
      concerns={['Scalability', 'Fault tolerance', 'Cost']}
      stakeholders={['Operations', 'SRE']}
      modelKinds={['Node diagram', 'Allocation table']}
      view={
        <C4ContextDiagram
          data={{
            persons: [{ id: 'u', name: 'Operator', x: 40, y: 40, width: 120, height: 70 }],
            systems: [{ id: 's', name: 'Platform', x: 260, y: 40, width: 140, height: 70 }],
            relationships: [{ id: 'r', from: 'u', to: 's', label: 'operates' }],
          }}
          viewBox="0 0 460 180"
          title="Deployment context view"
        />
      }
      viewBox="0 0 660 480"
      width={660}
      height={480}
      title="ISO 42010 viewpoint frame"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="viewpoint-frame"]')!;
    await expect(root.getAttribute('data-bbangto-viz-viewpoint-name')).toBe('Deployment viewpoint');

    // 헤더 밴드: viewpoint 명 + concerns[] + stakeholders[].
    const header = canvasElement.querySelector('[data-bbangto-viz-viewpoint-header]')!;
    await expect(header.textContent).toContain('Deployment viewpoint');
    await expect(
      canvasElement.querySelectorAll('[data-bbangto-viz-viewpoint-concern]').length,
    ).toBe(3);
    await expect(
      canvasElement.querySelectorAll('[data-bbangto-viz-viewpoint-stakeholder]').length,
    ).toBe(2);

    // body 슬롯: 중첩 view(프리셋) 렌더.
    const body = canvasElement.querySelector('[data-bbangto-viz-viewpoint-body]')!;
    await expect(body.querySelector('[data-bbangto-viz-viewpoint-slot] svg')).not.toBeNull();
    await expect(body.textContent).toContain('Platform');
  },
};

// ── 폴백: 슬롯/데이터 없이도 프레임 골격만 렌더 ───────────────────────
export const ViewpointFrameEmptyBody: Story = {
  render: () => (
    <ViewpointFrame
      viewpoint="Logical viewpoint"
      concerns={['Separation of concerns']}
      stakeholders={['Architects']}
      viewBox="0 0 560 360"
      width={560}
      height={360}
      title="Empty viewpoint frame"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const body = canvasElement.querySelector('[data-bbangto-viz-viewpoint-body]')!;
    // view 미지정 시 플레이스홀더 안내 텍스트.
    await expect(body.textContent).toContain('No view supplied');
    await expect(body.querySelector('[data-bbangto-viz-viewpoint-slot]')).toBeNull();
  },
};

// ──────────────────────────────────────────────────────────────────────
// SEI Views and Beyond — Module · C&C · Allocation 세 뷰 (KAN-082 .5)
//   원문 「모든 뷰를 세 가지로 나눕니다. Module(코드 구조), C&C(런타임 구조), Allocation(물리 배치·팀 배치)」.
//   C&C 영역에는 런타임 도식(C4 컨테이너)을 슬롯으로 넣고, 나머지는 불릿으로 채운다.
// ──────────────────────────────────────────────────────────────────────
const CC_SLOT = (
  <C4ContainerDiagram
    data={{
      containers: [
        { id: 'api', x: 10, y: 10, width: 110, height: 70, name: 'API', technology: 'Node.js' },
        { id: 'worker', x: 10, y: 150, width: 110, height: 70, name: 'Worker', technology: 'Go' },
      ],
      relationships: [{ id: 'r1', from: 'api', to: 'worker', label: 'enqueue', kind: 'asyncMessage' }],
    }}
    viewBox="0 0 140 240"
    width={140}
    height={240}
    title="C&C slot"
  />
);

export const ViewsAndBeyondSEI: Story = {
  render: () => (
    <ViewsAndBeyondFrame
      slots={{ cc: CC_SLOT }}
      data={{
        module: ['checkout/', 'payment/', 'shared/'],
        allocation: ['EC2 — api, worker', 'RDS — order db', 'Team A — checkout'],
      }}
      viewBox="0 0 900 420"
      width={900}
      height={420}
      title="SEI Views and Beyond"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const regions = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-vab-region]'));
    await expect(regions.map((r) => r.getAttribute('data-bbangto-viz-vab-region-key'))).toEqual(['module', 'cc', 'allocation']);
    const root = canvasElement.querySelector('[data-bbangto-viz-chart="views-and-beyond"]')!;
    for (const s of ['Module views', 'Component-and-Connector views', 'Allocation views']) await expect(root.textContent).toContain(s);
    // C&C 영역은 슬롯(중첩 도식), 나머지 둘은 불릿
    const cc = canvasElement.querySelector('[data-bbangto-viz-vab-region-key="cc"]')!;
    await expect(cc.querySelector('[data-bbangto-viz-vab-slot] svg')).not.toBeNull();
    await expect(cc.textContent).toContain('Worker');
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-vab-item]')).toHaveLength(6);
    // 세 영역은 가로로 나란하다
    const boxes = regions.map((r) => (r.querySelector('rect') as SVGRectElement).getBBox());
    await expect(boxes[0].x + boxes[0].width).toBeLessThanOrEqual(boxes[1].x);
    await expect(boxes[1].x + boxes[1].width).toBeLessThanOrEqual(boxes[2].x);
  },
};
