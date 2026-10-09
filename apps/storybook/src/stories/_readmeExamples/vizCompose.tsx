import { Canvas, Edge, Node, NodeLabel } from '@centurio1987/bbangto-ui-visualization';

// 87종 어디에도 맞지 않는 그림은 atom 으로 조립한다. 좌표는 호출자가 정하고(자동 배치 없음),
// 색·선은 비워 둔다 — 비워 두면 VisualizationStyleGuideProvider 의 스타일 가이드가 칠한다.
// Node 는 Canvas 바로 아래에 둔다. 그래야 Edge 가 id 로 노드를 찾는다.

const W = 140;
const H = 56;
const nodes = [
  { id: 'ask', x: 170, y: 16, title: '예산이 1억을 넘는가', shape: 'diamond' as const },
  { id: 'vendor', x: 40, y: 136, title: '외주 입찰', shape: 'rounded' as const },
  { id: 'inhouse', x: 300, y: 136, title: '내부 개발', shape: 'rounded' as const },
];

export function DecisionSketch() {
  return (
    <Canvas viewBox="0 0 480 208" width={480} height={208} title="예산에 따른 개발 방식 결정">
      {nodes.map((n) => (
        <Node key={n.id} id={n.id} x={n.x} y={n.y} width={W} height={H} shape={n.shape} />
      ))}
      {nodes.map((n) => (
        <NodeLabel key={`${n.id}-label`} x={n.x} y={n.y + H / 2} width={W} title={n.title} />
      ))}
      <Edge from="ask" to="vendor" fromSide="left" toSide="top" routing="orthogonal" markerEnd="arrow" label="예" />
      <Edge from="ask" to="inhouse" fromSide="right" toSide="top" routing="orthogonal" markerEnd="arrow" label="아니오" />
    </Canvas>
  );
}
