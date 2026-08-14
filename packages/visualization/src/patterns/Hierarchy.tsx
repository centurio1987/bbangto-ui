import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';
import { PyramidLayer } from '../atoms/PyramidLayer';
import { distributeCenters, parseViewBox } from '../geometry/layout';

export interface HierarchyTreeNode {
  id: string;
  label: string;
  children?: readonly HierarchyTreeNode[];
}

export interface HierarchyLayerSpec {
  label: string;
  value?: number;
}

export type HierarchyMode = 'tree' | 'pyramid';

export interface HierarchyProps extends Omit<CanvasProps, 'data'> {
  data?: { root?: HierarchyTreeNode; layers?: readonly HierarchyLayerSpec[] };
  mode?: HierarchyMode;
  children?: ReactNode;
}

const NODE_W = 120;
const NODE_H = 40;

/**
 * Hierarchy 패턴 — 계층/조직(headless).
 * 레퍼런스: system minimal_01/02(사이트맵 트리), infographic iso_05/06(피라미드 층).
 *
 * @vizType VT-303 Hierarchy / Tree · C. 계층·관계 · dataShape: hierarchy · 구조: nested · mode="tree"(기본)
 * @useWhen 조직/분류의 루트-자식 재귀 구조를 표현할 때
 * @avoidWhen 층상 비율 계층은 Pyramid(VT-701) 사용
 * @avoidWhen 작업 분해는 WBS(VT-307) 사용
 * @vizType VT-701 Pyramid · G. 개념 프레임워크 · dataShape: hierarchy, part-to-whole · 구조: nested · mode="pyramid"
 * @useWhen 기반→정점 층상 중요도/단계를 표현할 때
 * @useWhen Hierarchy를 mode="pyramid"로 렌더할 때
 * @avoidWhen 전환 축소 구조는 Funnel(VT-207) 사용
 * @avoidWhen 재귀 트리는 Hierarchy(VT-303) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Hierarchy({
  data,
  mode = 'tree',
  children,
  viewBox,
  ...canvasProps
}: HierarchyProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 640, 320]);

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="hierarchy" {...canvasProps}>
      {data
        ? mode === 'pyramid'
          ? renderPyramid(data.layers ?? [], vbX, vbY, vbW, vbH)
          : data.root
            ? renderTree(data.root, vbX, vbY, vbW, vbH)
            : null
        : children}
    </Canvas>
  );
}

interface PlacedNode {
  node: HierarchyTreeNode;
  x: number;
  y: number;
  parent?: PlacedNode;
}

function renderTree(
  root: HierarchyTreeNode,
  vbX: number,
  vbY: number,
  vbW: number,
  vbH: number,
): ReactNode {
  // BFS 레벨 배치 — 각 레벨의 노드를 폭 방향으로 균등 분배(파일럿 tidy 근사).
  const levels: HierarchyTreeNode[][] = [];
  const parentOf = new Map<HierarchyTreeNode, HierarchyTreeNode>();
  let frontier: HierarchyTreeNode[] = [root];
  while (frontier.length) {
    levels.push(frontier);
    const next: HierarchyTreeNode[] = [];
    for (const n of frontier) {
      for (const c of n.children ?? []) {
        parentOf.set(c, n);
        next.push(c);
      }
    }
    frontier = next;
  }

  const levelYs = distributeCenters(levels.length, vbY + 24, vbY + vbH - 24);
  const placed = new Map<HierarchyTreeNode, PlacedNode>();
  levels.forEach((nodes, li) => {
    const xs = distributeCenters(nodes.length, vbX + 16, vbX + vbW - 16);
    nodes.forEach((n, i) => {
      placed.set(n, { node: n, x: xs[i], y: levelYs[li] });
    });
  });

  const all = Array.from(placed.values());

  return (
    <>
      {all.map((p) => {
        const parent = parentOf.get(p.node);
        if (!parent) return null;
        const pp = placed.get(parent)!;
        return (
          <Edge
            key={`${parent.id}-${p.node.id}`}
            from={{ x: pp.x, y: pp.y + NODE_H / 2 }}
            to={{ x: p.x, y: p.y - NODE_H / 2 }}
            routing="orthogonal"
            markerEnd="none"
          />
        );
      })}
      {all.map((p) => (
        <g key={p.node.id} data-viz-hierarchy-node>
          <Node
            id={p.node.id}
            x={p.x - NODE_W / 2}
            y={p.y - NODE_H / 2}
            width={NODE_W}
            height={NODE_H}
            shape="rounded"
          />
          <NodeLabel x={p.x - NODE_W / 2} y={p.y} width={NODE_W} title={p.node.label} fontSize={12} />
        </g>
      ))}
    </>
  );
}

function renderPyramid(
  layers: readonly HierarchyLayerSpec[],
  vbX: number,
  vbY: number,
  vbW: number,
  vbH: number,
): ReactNode {
  const n = layers.length;
  if (!n) return null;
  const baseWidth = vbW * 0.62;
  const totalH = vbH - 48;
  const layerH = totalH / n;
  const cx = vbX + vbW / 2;
  const topY = vbY + 24;

  return (
    <>
      {layers.map((layer, i) => (
        <PyramidLayer
          key={i}
          cx={cx}
          y={topY + i * layerH}
          topWidth={(baseWidth * i) / n}
          bottomWidth={(baseWidth * (i + 1)) / n}
          height={layerH - 4}
          label={layer.label}
        />
      ))}
    </>
  );
}
