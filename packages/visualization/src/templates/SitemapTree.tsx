import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { parseViewBox } from '../geometry/layout';
import { tidyTreeLayout, type TreeNodeInput } from '../geometry/tree';

export interface SitemapNode {
  id: string;
  label: string;
  children?: SitemapNode[];
}

export interface SitemapTreeProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { root: SitemapNode };
  children?: ReactNode;
}

const NODE_W = 96;
const NODE_H = 40;
const PAD = { x: 70, top: 30, bottom: 30 } as const;

/** Sitemap tree (VT-304) — tidyTreeLayout + elbow(orthogonal) 커넥터. headless. */
/**
 * @vizType VT-304 Sitemap Tree · C. 계층·관계 · dataShape: hierarchy · 구조: nested
 * @useWhen 사이트 정보구조(IA)를 elbow 트리로 설계할 때
 * @avoidWhen 일반 조직 트리는 Hierarchy(VT-303) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function SitemapTree({
  data,
  viewBox,
  children,
  title = 'Sitemap tree',
  ...canvasProps
}: SitemapTreeProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 640, 320]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="sitemap" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const labelById = new Map<string, string>();
  const collect = (n: SitemapNode) => {
    labelById.set(n.id, n.label);
    n.children?.forEach(collect);
  };
  collect(data.root);

  const laid = tidyTreeLayout(data.root as TreeNodeInput, {
    width: vbW - PAD.x * 2,
    height: vbH - PAD.top - PAD.bottom,
  });
  const pos = new Map(laid.map((n) => [n.id, { x: n.x + vbX + PAD.x, y: n.y + vbY + PAD.top, parentId: n.parentId }]));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="sitemap" {...canvasProps}>
      {/* elbow 커넥터: 부모 하단 → 자식 상단(수직-수평-수직). */}
      {laid.map((n) => {
        if (!n.parentId) return null;
        const p = pos.get(n.parentId)!;
        const c = pos.get(n.id)!;
        const py = p.y + NODE_H / 2;
        const cy = c.y - NODE_H / 2;
        const midY = (py + cy) / 2;
        return (
          <path
            key={`e-${n.id}`}
            data-bbangto-viz-edge
            d={`M ${p.x} ${py} L ${p.x} ${midY} L ${c.x} ${midY} L ${c.x} ${cy}`}
            style={{ fill: 'none' }}
          />
        );
      })}
      {laid.map((n) => {
        const p = pos.get(n.id)!;
        return (
          <g key={n.id} data-bbangto-viz-sitemap-node data-bbangto-viz-sitemap-node-id={n.id}>
            <Node id={n.id} x={p.x - NODE_W / 2} y={p.y - NODE_H / 2} width={NODE_W} height={NODE_H} shape="rounded" />
            <NodeLabel x={p.x - NODE_W / 2} y={p.y} width={NODE_W} title={labelById.get(n.id) ?? n.id} fontSize={11} />
          </g>
        );
      })}
    </Canvas>
  );
}

SitemapTree.displayName = 'SitemapTree';
