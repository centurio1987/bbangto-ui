import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  DataFlowDiagram,
  Flowchart,
  C4ContainerDiagram,
  C4DeploymentDiagram,
  UMLSequenceDiagram,
  CommunicationDiagram,
  ActivityDiagram,
  ClassDiagram,
  StateDiagram,
  RELATION_KIND_NAMES,
  RELATION_LINE_STYLES,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

// KAN-082 — 「도식은 노드가 무엇인가와 화살표가 무엇을 뜻하는가로 구분한다」는 원문의 예시를 한 파일에 모은다.
// 여섯 도식(물리 대상 · 런타임 · 데이터 흐름 · 코드 구조 · 동작 · 플로우)과 자주 헷갈리는 쌍 셋(DFD vs 플로우차트 ·
// 시퀀스 vs 액티비티 · 배포 vs 런타임)을 그리고, 화살표 위 라벨과 범례가 그 화살표의 뜻(데이터 · 제어 · 호출 …)을 보이게 한다.
// 원문은 KANBAN.md 의 KAN-082-MD50S0 카드 「원문」 블록에 있다. 어느 도식을 고를지는 visualization README 「도식 고르기」.

const meta = {
  title: 'VISUALIZATION/Templates/Diagram Examples',
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

/** 그림 안 선 라벨 글을 모은다(선 가운데 · 끝 라벨 모두 EdgeLabel) */
function edgeLabelTexts(root: Element): string[] {
  return Array.from(root.querySelectorAll('[data-bbangto-viz-edge-label] text')).map((t) => t.textContent ?? '');
}

// ──────────────────────────────────────────────────────────────────────
// 1. DFD vs 플로우차트 — 「DFD 의 화살표는 데이터고, 플로우차트의 화살표는 제어입니다」
// ──────────────────────────────────────────────────────────────────────

/** DFD — 「주문 정보가 결제 처리로 간다」. 화살표 라벨은 흐르는 데이터이고, 분기 · 순서가 없다. */
export const DfdOrderInfoToPayment: Story = {
  render: () => (
    <DataFlowDiagram
      data={{
        nodes: [
          { id: 'customer', label: '고객', kind: 'external', x: 20, y: 60 },
          { id: 'order', label: '주문 접수', kind: 'process', x: 220, y: 60, width: 120 },
          { id: 'payment', label: '결제 처리', kind: 'process', x: 440, y: 60, width: 120 },
          { id: 'ledger', label: '결제 내역', kind: 'store', x: 440, y: 200, width: 120 },
        ],
        flows: [
          { from: 'customer', to: 'order', label: '주문' },
          { from: 'order', to: 'payment', label: '주문 정보' },
          { from: 'payment', to: 'ledger', label: '결제 기록' },
        ],
      }}
      viewBox="0 0 600 280"
      width={600}
      height={280}
      title="DFD — 주문 정보가 결제 처리로 간다"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    // 데이터 저장소의 위 · 아래 선도 같은 표시를 쓰므로 연결선(connector)만 센다
    await expect(svg.querySelectorAll('path[data-viz-part="connector"]')).toHaveLength(3);
    // 화살표마다 흐르는 데이터 이름이 붙는다
    await expect(edgeLabelTexts(svg)).toEqual(['주문', '주문 정보', '결제 기록']);
    // DFD 에는 분기가 없다 — 판단 마름모가 없다
    await expect(svg.querySelectorAll('[data-bbangto-viz-node-shape="diamond"]')).toHaveLength(0);
  },
};

/**
 * 플로우차트 — 「결제 성공이면 배송, 실패면 재시도」. 화살표는 다음에 할 일이고, 분기 라벨이 조건을 말한다.
 * 재시도는 결제 시도로 돌아간다. 돌아가는 선은 재시도의 왼쪽 변에서 나와 결제 시도의 아래 변으로 들어가게
 * fromSide · toSide · waypoints 를 적었다 — 적지 않으면 가까운 변을 골라 정방향 선과 겹친다(KAN-082.1 검토 3번).
 */
export const FlowchartPaymentRetry: Story = {
  render: () => (
    <Flowchart
      data={{
        nodes: [
          { id: 'try', x: 20, y: 70, width: 120, height: 56, label: '결제 시도', shape: 'rounded' },
          { id: 'ok', x: 210, y: 60, width: 140, height: 76, label: '결제 성공?', shape: 'diamond' },
          { id: 'ship', x: 440, y: 70, width: 120, height: 56, label: '배송', shape: 'rounded' },
          { id: 'retry', x: 220, y: 220, width: 120, height: 56, label: '재시도', shape: 'rounded' },
        ],
        edges: [
          { id: 'e-try', from: 'try', to: 'ok' },
          { id: 'e-ok', from: 'ok', to: 'ship', label: '성공' },
          { id: 'e-fail', from: 'ok', to: 'retry', label: '실패' },
          { id: 'e-back', from: 'retry', to: 'try', fromSide: 'left', toSide: 'bottom', waypoints: [{ x: 80, y: 248 }] },
        ],
      }}
      viewBox="0 0 600 300"
      width={600}
      height={300}
      title="플로우차트 — 결제 성공이면 배송, 실패면 재시도"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    // 분기는 마름모 하나
    await expect(svg.querySelectorAll('[data-bbangto-viz-node-shape="diamond"]')).toHaveLength(1);
    const edges = Array.from(svg.querySelectorAll('path[data-viz-part="connector"]')) as SVGPathElement[];
    await expect(edges).toHaveLength(4);
    // 분기 라벨은 둘 — 각자 자기 선의 가운데에 있다
    await expect(edgeLabelTexts(svg)).toEqual(['성공', '실패']);
    for (const [i, word] of [[1, '성공'], [2, '실패']] as const) {
      const path = edges[i];
      const text = path.nextElementSibling?.querySelector('text');
      await expect(text?.textContent).toBe(word);
      const mid = path.getPointAtLength(path.getTotalLength() / 2);
      await expect(Math.hypot(Number(text?.getAttribute('x')) - mid.x, Number(text?.getAttribute('y')) - mid.y)).toBeLessThanOrEqual(1);
    }
    // 돌아가는 선은 결제 시도의 아래 변으로 들어가고, 정방향 선(결제 시도 → 결제 성공?)이 지나는 높이를 지나지 않는다
    const tryBox = (svg.querySelector('[data-bbangto-viz-node-id="try"]') as SVGGraphicsElement | null)?.getBBox();
    const back = edges[3];
    const end = back.getPointAtLength(back.getTotalLength());
    if (tryBox) await expect(end.y).toBeGreaterThan(tryBox.y + tryBox.height);
    const fwdY = edges[0].getPointAtLength(0).y;
    const total = back.getTotalLength();
    let onForward = false;
    for (let t = 0; t <= total; t += 2) if (Math.abs(back.getPointAtLength(t).y - fwdY) < 0.5) onForward = true;
    await expect(onForward).toBe(false);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 2. 화살표 뜻을 섞을 때 — 「섞어야 한다면 범례로 화살표 종류를 구분해 표시하는 게 좋습니다」
// ──────────────────────────────────────────────────────────────────────

/**
 * 런타임 도식(C4 컨테이너)에 호출 · 비동기 메시지 · 데이터 이동을 섞은 그림. 관계마다 `kind` 를 적으면 선 모양이
 * 종류마다 갈리고, 쓰인 종류가 둘 이상이라 범례가 노드 아래에 붙는다.
 */
export const RuntimeMixedArrowsWithLegend: Story = {
  render: () => (
    <C4ContainerDiagram
      data={{
        containers: [
          { id: 'web', x: 20, y: 30, width: 150, height: 90, name: '웹 앱', technology: 'React' },
          { id: 'api', x: 300, y: 30, width: 150, height: 90, name: 'API 서버', technology: 'Node.js' },
          { id: 'queue', x: 580, y: 30, width: 150, height: 90, name: '결제 큐', technology: 'Kafka' },
          { id: 'worker', x: 580, y: 220, width: 150, height: 90, name: '결제 워커', technology: 'Go' },
          { id: 'db', x: 300, y: 220, width: 150, height: 90, name: '주문 DB', technology: 'PostgreSQL' },
        ],
        relationships: [
          { id: 'r1', from: 'web', to: 'api', label: '주문 조회', technology: 'HTTPS', kind: 'call' },
          { id: 'r2', from: 'api', to: 'queue', label: '결제 요청 발행', kind: 'asyncMessage' },
          { id: 'r3', from: 'queue', to: 'worker', label: '결제 요청 소비', kind: 'asyncMessage' },
          { id: 'r4', from: 'worker', to: 'db', label: '결제 결과', kind: 'dataFlow' },
        ],
      }}
      width={760}
      height={460}
      title="런타임 — 호출 · 비동기 메시지 · 데이터 이동을 섞은 그림과 범례"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    const used = ['call', 'asyncMessage', 'dataFlow'] as const;

    // 범례 항목 수 = 쓰인 종류 수, 이름은 종류 이름
    const items = Array.from(svg.querySelectorAll('[data-bbangto-viz-legend-item]'));
    await expect(items.map((g) => g.getAttribute('data-bbangto-viz-legend-item'))).toEqual([...used]);
    await expect(items.map((g) => g.querySelector('text')?.textContent)).toEqual(used.map((k) => RELATION_KIND_NAMES[k]));

    // 관계선마다 종류 표시가 붙고, 같은 종류의 범례 견본과 대시 · 화살촉이 같다
    const lineOf = (p: Element) =>
      `${getComputedStyle(p).strokeDasharray}|${p.getAttribute('marker-start') ?? '-'}|${p.getAttribute('marker-end') ?? '-'}`;
    for (const kind of used) {
      const edges = Array.from(svg.querySelectorAll(`path[data-bbangto-viz-relation-kind="${kind}"]`));
      await expect(edges.length).toBeGreaterThan(0);
      const swatch = svg.querySelector(`[data-bbangto-viz-legend-item="${kind}"] path[data-viz-part="connector"]`)!;
      for (const e of edges) await expect({ kind, line: lineOf(e) }).toEqual({ kind, line: lineOf(swatch) });
      // 실선 종류(호출)는 가이드 대시와 상관없이 실선이다
      if (RELATION_LINE_STYLES[kind].strokeDasharray === 'none') {
        for (const e of edges) await expect(getComputedStyle(e).strokeDasharray).toBe('none');
      }
    }
    // 범례는 노드 아래에 있다 — 노드와 겹치지 않는다
    const legendBox = (svg.querySelector('[data-bbangto-viz-legend] rect') as SVGRectElement).getBBox();
    await expect(legendBox.y).toBeGreaterThanOrEqual(310);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 3. 배포 vs 런타임 — 「하나의 EC2 위에 API 서버와 워커가 같이 떠 있다면, 배포 도식에서는 박스 하나고 런타임 도식에서는
//    박스 두 개입니다」
// ──────────────────────────────────────────────────────────────────────

/** 배포 도식(C4 Deployment) — EC2 상자 하나 안에 API 서버와 워커. 「몇 대에 어떻게 나뉘어 있나」에 답한다. */
export const DeploymentOneEc2: Story = {
  render: () => (
    <C4DeploymentDiagram
      data={{
        nodes: [
          { id: 'aws', x: 10, y: 10, width: 640, height: 300, name: 'AWS', technology: 'ap-northeast-2' },
          { id: 'ec2', x: 30, y: 60, width: 340, height: 230, name: 'EC2', technology: 'm5.large · Ubuntu 22.04', parent: 'aws' },
          { id: 'rds', x: 480, y: 60, width: 150, height: 230, name: 'RDS', technology: 'db.t3.medium', parent: 'aws' },
        ],
        containers: [
          { id: 'api', node: 'ec2', x: 50, y: 120, width: 140, height: 90, name: 'API 서버', technology: 'Node.js' },
          { id: 'worker', node: 'ec2', x: 210, y: 120, width: 140, height: 90, name: '워커', technology: 'Go' },
          { id: 'db', node: 'rds', x: 495, y: 120, width: 120, height: 90, name: '주문 DB', technology: 'PostgreSQL', shape: 'database' },
        ],
        relationships: [{ id: 'r1', from: 'worker', to: 'db', label: '결제 결과 쓰기', technology: 'SQL' }],
      }}
      width={680}
      height={340}
      title="배포 도식 — EC2 하나에 API 서버와 워커"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    // EC2 는 상자 하나이고, API 서버와 워커는 그 안에 있다
    const ec2 = svg.querySelector('[data-bbangto-viz-deploy-node="ec2"] rect') as SVGRectElement;
    await expect(ec2).not.toBeNull();
    const box = ec2.getBBox();
    const onEc2 = Array.from(svg.querySelectorAll('[data-bbangto-viz-container-node="ec2"]')) as SVGGElement[];
    await expect(onEc2).toHaveLength(2);
    for (const g of onEc2) {
      const b = g.getBBox();
      await expect(b.x >= box.x && b.y >= box.y && b.x + b.width <= box.x + box.width && b.y + b.height <= box.y + box.height).toBe(true);
    }
    // EC2 는 AWS 안의 배포 노드다
    await expect(svg.querySelector('[data-bbangto-viz-deploy-node="ec2"]')?.getAttribute('data-bbangto-viz-deploy-parent')).toBe('aws');
  },
};

/** 런타임 도식(C4 Container) — 같은 시스템을 서로 통신하는 상자 둘(API 서버 · 워커)과 DB · 큐 모양으로. 「무엇이 서로 통신하나」에 답한다. */
export const RuntimeTwoContainers: Story = {
  render: () => (
    <C4ContainerDiagram
      data={{
        containers: [
          { id: 'api', x: 20, y: 30, width: 150, height: 90, name: 'API 서버', technology: 'Node.js' },
          { id: 'queue', x: 300, y: 30, width: 150, height: 90, name: '작업 큐', technology: 'SQS', shape: 'queue' },
          { id: 'worker', x: 580, y: 30, width: 150, height: 90, name: '워커', technology: 'Go' },
          { id: 'db', x: 580, y: 220, width: 150, height: 100, name: '주문 DB', technology: 'PostgreSQL', shape: 'database' },
        ],
        relationships: [
          { id: 'r1', from: 'api', to: 'queue', label: '결제 작업 넣기', kind: 'asyncMessage' },
          { id: 'r2', from: 'queue', to: 'worker', label: '작업 꺼내기', kind: 'asyncMessage' },
          { id: 'r3', from: 'worker', to: 'db', label: '결제 결과', technology: 'SQL', kind: 'dataFlow' },
        ],
      }}
      width={760}
      height={460}
      title="런타임 도식 — 같은 EC2 의 API 서버와 워커를 상자 둘로"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    // API 서버와 워커는 상자 둘 — 배포 도식에서 같은 EC2 안에 있던 둘이다
    await expect(svg.querySelector('[data-bbangto-viz-c4-box-id="api"]')).not.toBeNull();
    await expect(svg.querySelector('[data-bbangto-viz-c4-box-id="worker"]')).not.toBeNull();
    // DB · 큐는 그 모양 부품으로 그린다
    await expect(svg.querySelector('[data-bbangto-viz-molecule="database"][data-bbangto-viz-molecule-id="db"]')).not.toBeNull();
    await expect(svg.querySelector('[data-bbangto-viz-molecule="queue"][data-bbangto-viz-molecule-id="queue"]')).not.toBeNull();
    // 범례는 쓰인 종류 둘(비동기 메시지 · 데이터 이동)
    await expect(svg.querySelectorAll('[data-bbangto-viz-legend-item]')).toHaveLength(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 4. 같은 상호작용을 시간축(시퀀스)과 링크 위 번호(커뮤니케이션)로 — 「동작을 나타내는 개념도」 (KAN-082 .4)
// ──────────────────────────────────────────────────────────────────────
const CHECKOUT_MSGS = [
  { from: 'ui', to: 'order', label: 'placeOrder()' },
  { from: 'order', to: 'pay', label: 'charge()' },
  { from: 'pay', to: 'order', label: 'approved' },
];

/** 시퀀스 도식 — 누가 누구에게 언제 말하는지(세로가 시간) */
export const CheckoutAsSequence: Story = {
  render: () => (
    <UMLSequenceDiagram
      data={{
        participants: [
          { id: 'ui', x: 20, width: 140, name: 'ui : CheckoutPage' },
          { id: 'order', x: 220, width: 140, name: ': OrderService' },
          { id: 'pay', x: 420, width: 140, name: ': PaymentGateway' },
        ],
        messages: CHECKOUT_MSGS.map((m, i) => ({ id: `m${i}`, ...m, y: 90 + i * 50, kind: m.label === 'approved' ? 'return' : 'sync' })),
      }}
      viewBox="0 0 580 260"
      width={580}
      height={260}
      title="시퀀스 도식 — 결제 요청"
    />
  ),
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    for (const m of CHECKOUT_MSGS) await expect(svg.textContent).toContain(m.label);
  },
};

/** 커뮤니케이션 도식 — 같은 메시지를 객체 사이 링크 위에 번호와 방향으로 */
export const CheckoutAsCommunication: Story = {
  render: () => (
    <CommunicationDiagram
      data={{
        objects: [
          { id: 'ui', x: 20, y: 60, width: 160, height: 50, name: 'ui', classifier: 'CheckoutPage' },
          { id: 'order', x: 320, y: 60, width: 160, height: 50, classifier: 'OrderService' },
          { id: 'pay', x: 320, y: 230, width: 160, height: 50, classifier: 'PaymentGateway' },
        ],
        links: [
          { id: 'l1', from: 'ui', to: 'order', messages: [{ order: '1', label: 'placeOrder()' }] },
          {
            id: 'l2',
            from: 'order',
            to: 'pay',
            messages: [
              { order: '1.1', label: 'charge()' },
              { order: '1.2', label: 'approved', direction: 'backward' },
            ],
          },
        ],
      }}
      viewBox="0 0 520 300"
      width={520}
      height={300}
      title="커뮤니케이션 도식 — 결제 요청"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    const msgs = Array.from(svg.querySelectorAll('[data-bbangto-viz-message]'));
    await expect(msgs.map((g) => g.getAttribute('data-bbangto-viz-message'))).toEqual(['1', '1.1', '1.2']);
    await expect(msgs.map((g) => g.querySelector('text')?.textContent)).toEqual(['1: placeOrder()', '1.1: charge()', '1.2: approved']);
    // 1.2(backward)는 pay → order — 세로 링크에서 화살표 끝이 시작보다 위에 있다
    const back = msgs[2].querySelector('path') as SVGPathElement;
    await expect(back.getPointAtLength(back.getTotalLength()).y).toBeLessThan(back.getPointAtLength(0).y);
    // 메시지 글은 링크 선과 겹치지 않는다 — 세로 링크 옆 글은 링크 왼쪽에서 끝난다
    const linkX = (svg.querySelector('[data-bbangto-viz-communication-link="l2"]') as SVGPathElement).getPointAtLength(0).x;
    for (const g of msgs.slice(1)) {
      const b = (g.querySelector('text') as SVGTextElement).getBBox();
      await expect(b.x + b.width).toBeLessThanOrEqual(linkX);
    }
    // 메시지 글끼리 겹치지 않는다 — 한 링크에 메시지가 여럿이어도 줄이 갈린다
    const boxes = msgs.map((g) => (g.querySelector('text') as SVGTextElement).getBBox());
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const c = boxes[j];
        const overlap = a.x < c.x + c.width && c.x < a.x + a.width && a.y < c.y + c.height && c.y < a.y + a.height;
        await expect({ i, j, overlap }).toEqual({ i, j, overlap: false });
      }
  },
};

// ──────────────────────────────────────────────────────────────────────
// 5. 시퀀스 vs 액티비티 — 「시퀀스는 누가 누구에게 언제 말하는지가 중심이고, 액티비티는 무엇을 어떤 순서로 하는지가
//    중심입니다. 액티비티에 스윔레인을 넣으면 두 도식의 중간쯤이 됩니다」(위 CheckoutAsSequence 와 짝)
// ──────────────────────────────────────────────────────────────────────

/** 액티비티 도식 — 같은 결제 요청을 「무엇을 어떤 순서로」, 스윔레인이 「누가」를 더한다 */
export const CheckoutAsActivityWithLanes: Story = {
  render: () => (
    <ActivityDiagram
      data={{
        lanes: [
          { id: 'l-ui', label: '결제 화면', x: 20, y: 20, width: 180, height: 400 },
          { id: 'l-order', label: '주문 서비스', x: 200, y: 20, width: 180, height: 400 },
          { id: 'l-pay', label: '결제 게이트웨이', x: 380, y: 20, width: 180, height: 400 },
        ],
        nodes: [
          { id: 'start', kind: 'start', x: 110, y: 70 },
          { id: 'submit', kind: 'action', label: '주문 제출', x: 110, y: 130 },
          { id: 'create', kind: 'action', label: '주문 만들기', x: 290, y: 130 },
          { id: 'charge', kind: 'action', label: '결제 승인', x: 470, y: 210 },
          { id: 'ok', kind: 'decision', label: '승인?', x: 290, y: 290 },
          { id: 'done', kind: 'action', label: '완료 표시', x: 110, y: 360 },
          { id: 'end', kind: 'end', x: 290, y: 390 },
        ],
        edges: [
          { from: 'start', to: 'submit' },
          { from: 'submit', to: 'create' },
          { from: 'create', to: 'charge' },
          { from: 'charge', to: 'ok' },
          { from: 'ok', to: 'done', label: '예' },
          { from: 'ok', to: 'end', label: '아니오' },
        ],
      }}
      viewBox="0 0 580 440"
      width={580}
      height={440}
      title="액티비티 도식 — 결제 요청을 스윔레인으로"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    // 스윔레인 셋 — 시퀀스 도식의 참여자와 같은 셋이 「누가」를 맡는다
    for (const s of ['결제 화면', '주문 서비스', '결제 게이트웨이']) await expect(svg.textContent).toContain(s);
    // 분기 라벨(예 · 아니오)이 선 위에 그려진다
    const labels = Array.from(svg.querySelectorAll('[data-bbangto-viz-edge-label] text')).map((t) => t.textContent);
    await expect(labels).toEqual(expect.arrayContaining(['예', '아니오']));
  },
};

// ──────────────────────────────────────────────────────────────────────
// 6. 코드 구조 — 「클래스, 모듈, 객체 · 의존, 소유, 상속, 참조」(타입 수준은 클래스 도식, 인스턴스는 G3 의 객체 도식)
// ──────────────────────────────────────────────────────────────────────
export const CodeStructureClass: Story = {
  render: () => (
    <ClassDiagram
      data={{
        classes: [
          { id: 'order', x: 20, y: 20, width: 180, height: 100, name: 'Order', attributes: ['+ id: OrderId'], methods: ['+ place(): void'] },
          { id: 'line', x: 340, y: 20, width: 180, height: 80, name: 'OrderLine', attributes: ['+ qty: number'] },
          { id: 'payment', x: 20, y: 220, width: 180, height: 80, name: 'Payment', stereotype: 'interface', methods: ['+ charge(): Result'] },
          { id: 'card', x: 340, y: 220, width: 180, height: 80, name: 'CardPayment', methods: ['+ charge(): Result'] },
        ],
        relationships: [
          { id: 'r1', from: 'order', to: 'line', kind: 'composition', label: 'owns', fromLabel: '1', toLabel: '1..*' },
          { id: 'r2', from: 'order', to: 'payment', kind: 'dependency', label: 'uses' },
          { id: 'r3', from: 'card', to: 'payment', kind: 'realization' },
        ],
      }}
      viewBox="0 0 540 320"
      width={540}
      height={320}
      title="코드 구조 — 소유 · 의존 · 실현"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    const labels = Array.from(svg.querySelectorAll('[data-bbangto-viz-edge-label] text')).map((t) => t.textContent);
    await expect(labels).toEqual(expect.arrayContaining(['owns', 'uses', '1', '1..*']));
    await expect(svg.textContent).toContain('«interface»');
  },
};

// ──────────────────────────────────────────────────────────────────────
// 7. 동작 — 상태 머신 「상태 · 상태 전이」(시간 축 있음). 전이 라벨이 이벤트 [조건] / 동작
// ──────────────────────────────────────────────────────────────────────
export const BehaviorOrderStates: Story = {
  render: () => (
    <StateDiagram
      data={{
        states: [
          { id: 's0', x: 40, y: 71, variant: 'start' },
          { id: 'created', x: 100, y: 60, width: 120, height: 50, title: '주문됨' },
          { id: 'paid', x: 440, y: 60, width: 120, height: 50, title: '결제됨' },
          { id: 'shipped', x: 440, y: 200, width: 120, height: 50, title: '배송됨' },
          { id: 'end', x: 486, y: 300, variant: 'end' },
        ],
        transitions: [
          { id: 't0', from: 's0', to: 'created' },
          { id: 't1', from: 'created', to: 'paid', label: 'pay() [잔액 충분] / 영수증 발행' },
          { id: 't2', from: 'paid', to: 'shipped', label: 'ship()' },
          { id: 't3', from: 'shipped', to: 'end' },
        ],
      }}
      viewBox="0 0 600 340"
      width={600}
      height={340}
      title="동작 — 주문 상태 머신"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]')!;
    const labels = Array.from(svg.querySelectorAll('[data-bbangto-viz-edge-label] text')).map((t) => t.textContent);
    await expect(labels).toEqual(['pay() [잔액 충분] / 영수증 발행', 'ship()']);
    // 긴 전이 라벨이 두 상태 상자와 겹치지 않는다
    const label = (svg.querySelector('[data-bbangto-viz-edge-label] rect') as SVGRectElement).getBBox();
    for (const id of ['created', 'paid']) {
      const box = (svg.querySelector(`[data-bbangto-viz-state-id="${id}"]`) as SVGGElement).getBBox();
      const apart = label.x >= box.x + box.width || label.x + label.width <= box.x;
      await expect({ id, apart }).toEqual({ id, apart: true });
    }
  },
};
