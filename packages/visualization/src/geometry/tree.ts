/** 계층 트리 배치 — 순수 함수(SitemapTree 등). 정밀 검증은 tree.test.ts. */

export interface TreeNodeInput {
  id: string;
  children?: TreeNodeInput[];
}

export interface TreeLayoutNode {
  id: string;
  x: number;
  y: number;
  depth: number;
  parentId: string | null;
}

/**
 * 레이어드 tidy tree 배치. 리프를 순서대로 균등 배치하고 내부 노드는 자식 중앙에 놓는다.
 * 좌표는 [0,width]×[0,height] 정규화(깊이=y, 리프 순서=x).
 */
export function tidyTreeLayout(
  root: TreeNodeInput,
  opts: { width: number; height: number },
): TreeLayoutNode[] {
  const { width, height } = opts;

  // 1) depth + parent 수집, 리프 순서 부여.
  const nodes: Array<{ id: string; depth: number; parentId: string | null; xRaw: number }> = [];
  let leafCursor = 0;
  let maxDepth = 0;

  const visit = (node: TreeNodeInput, depth: number, parentId: string | null): number => {
    maxDepth = Math.max(maxDepth, depth);
    const kids = node.children ?? [];
    let xRaw: number;
    if (kids.length === 0) {
      xRaw = leafCursor;
      leafCursor += 1;
    } else {
      const childXs = kids.map((k) => visit(k, depth + 1, node.id));
      xRaw = (Math.min(...childXs) + Math.max(...childXs)) / 2;
    }
    nodes.push({ id: node.id, depth, parentId, xRaw });
    return xRaw;
  };
  visit(root, 0, null);

  const leafCount = Math.max(1, leafCursor);
  const denomX = Math.max(1, leafCount - 1);
  const denomY = Math.max(1, maxDepth);

  return nodes.map((n) => ({
    id: n.id,
    x: leafCount === 1 ? width / 2 : (n.xRaw / denomX) * width,
    y: (n.depth / denomY) * height,
    depth: n.depth,
    parentId: n.parentId,
  }));
}
