import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  DataFlowDiagram,
  Flowchart,
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
 * 재시도에서 결제 시도로 돌아가는 선은 넣지 않았다 — Flowchart 데이터에는 선이 붙을 변을 고르는 칸이 없어, 어느 배치든
 * 되돌아가는 선이 정방향 선과 같은 구간을 지나 화살촉이 맞붙는다(2026-11-25 서버 렌더로 확인).
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
    await expect(edges).toHaveLength(3);
    // 분기 라벨은 둘 — 각자 자기 선의 가운데에 있다
    await expect(edgeLabelTexts(svg)).toEqual(['성공', '실패']);
    for (const [i, word] of [[1, '성공'], [2, '실패']] as const) {
      const path = edges[i];
      const text = path.nextElementSibling?.querySelector('text');
      await expect(text?.textContent).toBe(word);
      const mid = path.getPointAtLength(path.getTotalLength() / 2);
      await expect(Math.hypot(Number(text?.getAttribute('x')) - mid.x, Number(text?.getAttribute('y')) - mid.y)).toBeLessThanOrEqual(1);
    }
  },
};
