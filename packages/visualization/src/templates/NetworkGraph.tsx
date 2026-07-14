import React, { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  /** 허브(강조 — 크게). */
  hub?: boolean;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface NetworkGraphProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { nodes: GraphNode[]; edges?: GraphEdge[] };
  children?: ReactNode;
}

const R = 22;
const HUB_R = 34;

/** Network graph (VT-305) — 노드-엣지 관계망(비계층). headless(수동 좌표, 허브 강조). */
export function NetworkGraph({
  data,
  viewBox,
  children,
  title = 'Network graph',
  ...canvasProps
}: NetworkGraphProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="network" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const registry = {
    nodes: data.nodes.map((n) => {
      const r = n.hub ? HUB_R : R;
      return { id: n.id, x: n.x - r, y: n.y - r, width: r * 2, height: r * 2 };
    }),
  };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="network" {...canvasProps}>
      {(data.edges ?? []).map((e, i) => (
        <Edge key={`e-${i}`} from={e.from} to={e.to} routing="straight" markerEnd="none" />
      ))}
      {data.nodes.map((n) => {
        const r = n.hub ? HUB_R : R;
        return (
          <React.Fragment key={n.id}>
            <Node id={n.id} x={n.x - r} y={n.y - r} width={r * 2} height={r * 2} shape="circle" />
            <NodeLabel x={n.x - r} y={n.y} width={r * 2} title={n.label} fontSize={n.hub ? 13 : 11} />
          </React.Fragment>
        );
      })}
    </Canvas>
  );
}

NetworkGraph.displayName = 'NetworkGraph';
