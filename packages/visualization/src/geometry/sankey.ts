/**
 * Sankey 링크 오프셋 배치 — 순수 함수. acyclic·좌→우·수동 노드 좌표만 지원.
 * 노드 높이는 유입/유출 값 합의 최대에 scale을 곱해 산출 → 링크 폭 합 = 노드 높이 불변식.
 * 정밀 검증은 sankey.test.ts.
 */

export interface SankeyNodeInput {
  id: string;
  /** 컬럼 x(좌측 상단). 수동 지정. */
  x: number;
  /** 상단 y. 수동 지정. */
  y: number;
}

export interface SankeyLinkInput {
  source: string;
  target: string;
  value: number;
}

export interface SankeyLayoutNode {
  id: string;
  x: number;
  y: number;
  height: number;
}

export interface SankeyLayoutLink {
  source: string;
  target: string;
  value: number;
  width: number;
  /** source 우측 앵커 중심. */
  sx: number;
  sy: number;
  /** target 좌측 앵커 중심. */
  tx: number;
  ty: number;
}

export interface SankeyLayout {
  nodes: SankeyLayoutNode[];
  links: SankeyLayoutLink[];
}

/** value→픽셀 폭 scale과 노드 폭으로 Sankey 리본 오프셋을 계산. */
export function sankeyLayout(
  nodes: readonly SankeyNodeInput[],
  links: readonly SankeyLinkInput[],
  opts?: { scale?: number; nodeWidth?: number },
): SankeyLayout {
  const scale = opts?.scale ?? 1;
  const nodeWidth = opts?.nodeWidth ?? 16;

  const sumOut = new Map<string, number>();
  const sumIn = new Map<string, number>();
  for (const l of links) {
    sumOut.set(l.source, (sumOut.get(l.source) ?? 0) + l.value);
    sumIn.set(l.target, (sumIn.get(l.target) ?? 0) + l.value);
  }

  const nodeById = new Map<string, SankeyLayoutNode>();
  const outNodes: SankeyLayoutNode[] = nodes.map((n) => {
    const total = Math.max(sumIn.get(n.id) ?? 0, sumOut.get(n.id) ?? 0);
    const node = { id: n.id, x: n.x, y: n.y, height: total * scale };
    nodeById.set(n.id, node);
    return node;
  });

  // 노드별 유출/유입 누적 오프셋(위→아래).
  const outCursor = new Map<string, number>();
  const inCursor = new Map<string, number>();

  const outLinks: SankeyLayoutLink[] = links.map((l) => {
    const s = nodeById.get(l.source);
    const t = nodeById.get(l.target);
    const width = l.value * scale;
    const soff = outCursor.get(l.source) ?? 0;
    const toff = inCursor.get(l.target) ?? 0;
    outCursor.set(l.source, soff + width);
    inCursor.set(l.target, toff + width);
    const sy = (s ? s.y : 0) + soff + width / 2;
    const ty = (t ? t.y : 0) + toff + width / 2;
    return {
      source: l.source,
      target: l.target,
      value: l.value,
      width,
      sx: (s ? s.x : 0) + nodeWidth,
      sy,
      tx: t ? t.x : 0,
      ty,
    };
  });

  return { nodes: outNodes, links: outLinks };
}
