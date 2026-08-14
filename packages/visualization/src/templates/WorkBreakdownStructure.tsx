import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { tidyTreeLayout, wbsNumbering, type TreeNodeInput } from '../geometry/tree';

const PALETTE_KEYS = ['p5', 'p1', 'p6', 'p4', 'p3', 'p7'] as const;

export interface WBSNode {
  id: string;
  label: string;
  children?: WBSNode[];
}

export interface WorkBreakdownStructureProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { root: WBSNode };
  children?: ReactNode;
}

const NODE_W = 104;
const NODE_H = 44;
const PAD = { x: 74, top: 34, bottom: 30 } as const;

/** Work Breakdown Structure (VT-307) — 산출물 분해 트리 + WBS 십진 번호 + 레벨 tiered fill. headless. */
/**
 * @vizType VT-307 Work Breakdown Structure · C. 계층·관계 · dataShape: hierarchy · 구조: nested
 * @useWhen 프로젝트 산출물을 계층적으로 분해할 때
 * @useWhen 범위를 작업 단위로 나눌 때
 * @avoidWhen 일정은 Gantt(VT-403) 사용
 * @avoidWhen 일반 조직 트리는 Hierarchy(VT-303) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function WorkBreakdownStructure({
  data,
  viewBox,
  children,
  title = 'Work breakdown structure',
  ...canvasProps
}: WorkBreakdownStructureProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 620, 320]);

  if (children != null || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="wbs" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const labelById = new Map<string, string>();
  const collect = (n: WBSNode) => {
    labelById.set(n.id, n.label);
    n.children?.forEach(collect);
  };
  collect(data.root);

  const numbers = wbsNumbering(data.root as TreeNodeInput);

  const laid = tidyTreeLayout(data.root as TreeNodeInput, {
    width: vbW - PAD.x * 2,
    height: vbH - PAD.top - PAD.bottom,
  });
  const pos = new Map(laid.map((n) => [n.id, { x: n.x + vbX + PAD.x, y: n.y + vbY + PAD.top, parentId: n.parentId, depth: n.depth }]));

  const stroke = vvar('shape', 'stroke');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="wbs" {...canvasProps}>
      {/* elbow 커넥터: 부모 하단 → 자식 상단. */}
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
        const fill = vvar('palette', PALETTE_KEYS[p.depth % PALETTE_KEYS.length]);
        const code = numbers[n.id] ?? '';
        return (
          <g key={n.id} data-bbangto-viz-wbs-node data-bbangto-viz-wbs-node-id={n.id} data-bbangto-viz-wbs-depth={p.depth}>
            <Node
              id={n.id}
              x={p.x - NODE_W / 2}
              y={p.y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              shape="rect"
              fill={fill}
              stroke={stroke}
              strokeWidth={1.5}
            />
            {/* WBS 번호 배지 */}
            <text
              data-bbangto-viz-wbs-number
              x={p.x - NODE_W / 2 + 6}
              y={p.y - NODE_H / 2 + 12}
              fontSize={9}
              fontWeight={700}
              fontFamily={vvar('typography', 'monoFont')}
              style={{ fill: stroke }}
            >
              {code}
            </text>
            <NodeLabel x={p.x - NODE_W / 2} y={p.y + 4} width={NODE_W} title={labelById.get(n.id) ?? n.id} fontSize={11} />
          </g>
        );
      })}
    </Canvas>
  );
}

WorkBreakdownStructure.displayName = 'WorkBreakdownStructure';
