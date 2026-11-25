import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  DataFlowDiagram,
  Flowchart,
  C4ContainerDiagram,
  RELATION_KIND_NAMES,
  RELATION_LINE_STYLES,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

// KAN-082 — 「도식은 노드가 무엇인가와 화살표가 무엇을 뜻하는가로 구분한다」는 원문의 예시를 그대로 그린다.
// 자주 헷갈리는 쌍마다 두 도식을 나란히 두고, 화살표 위 라벨이 그 화살표의 뜻(데이터 · 제어 …)을 말하게 한다.
// 원문은 KANBAN.md 의 KAN-082-MD50S0 카드 「원문」 블록에 있다.

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
