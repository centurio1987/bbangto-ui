import React, { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { EdgeLabel } from '../atoms/EdgeLabel';
import { vvar } from '../tokens/contract';

export interface LineageNode {
  id: string;
  label: string;
  detail?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface LineageEdge {
  from: string;
  to: string;
  label?: string;
}

export interface DataLineageProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { nodes: LineageNode[]; edges?: LineageEdge[] };
  children?: ReactNode;
}

const NODE_W = 130;
const NODE_H = 64;

/** Data lineage (VT-127) — 카드형 노드 + named edge. headless(수동 좌표, 기존 atom 조합). */
export function DataLineage({
  data,
  viewBox,
  children,
  title = 'Data lineage',
  ...canvasProps
}: DataLineageProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="lineage" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const specById = new Map(data.nodes.map((n) => [n.id, n]));
  const centerOf = (id: string) => {
    const n = specById.get(id);
    if (!n) return { x: 0, y: 0 };
    return { x: n.x + (n.width ?? NODE_W) / 2, y: n.y + (n.height ?? NODE_H) / 2 };
  };
  const registry = { nodes: data.nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width ?? NODE_W, height: n.height ?? NODE_H })) };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="lineage" {...canvasProps}>
      {(data.edges ?? []).map((e, i) => {
        const a = centerOf(e.from);
        const b = centerOf(e.to);
        return (
          <React.Fragment key={`e-${i}`}>
            <Edge from={e.from} to={e.to} routing="orthogonal" markerEnd="arrow" />
            {e.label && <EdgeLabel x={(a.x + b.x) / 2} y={(a.y + b.y) / 2} label={e.label} />}
          </React.Fragment>
        );
      })}
      {data.nodes.map((n) => {
        const w = n.width ?? NODE_W;
        const h = n.height ?? NODE_H;
        return (
          <g key={n.id} data-bbangto-viz-lineage-node data-bbangto-viz-lineage-node-id={n.id}>
            <Node id={n.id} x={n.x} y={n.y} width={w} height={h} shape="rounded" />
            <text x={n.x + 10} y={n.y + 22} fontSize={13} fontWeight={700} fontFamily={vvar('typography', 'titleFont')} style={{ fill: vvar('shape', 'stroke') }}>
              {n.label}
            </text>
            {n.detail && (
              <text x={n.x + 10} y={n.y + 40} fontSize={11} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('edge', 'stroke'), opacity: 0.8 }}>
                {n.detail}
              </text>
            )}
          </g>
        );
      })}
    </Canvas>
  );
}

DataLineage.displayName = 'DataLineage';
