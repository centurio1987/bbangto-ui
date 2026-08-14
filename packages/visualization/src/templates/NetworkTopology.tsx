import React, { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import type { NodeShape } from '../geometry/shapes';

export interface TopologyZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TopologyNode {
  id: string;
  label: string;
  x: number;
  y: number;
  zone?: string;
  shape?: NodeShape;
  width?: number;
  height?: number;
}

export interface TopologyLink {
  from: string;
  to: string;
}

export interface NetworkTopologyProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { zones: TopologyZone[]; nodes: TopologyNode[]; links?: TopologyLink[] };
  children?: ReactNode;
}

const ZONE_PAD = 6;

/** Network topology (VT-125) — 존 경계 밴드 + 장비 노드 + 링크. headless(수동 좌표). */
export function NetworkTopology({
  data,
  viewBox,
  children,
  title = 'Network topology',
  ...canvasProps
}: NetworkTopologyProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="topology" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const nodeW = 100;
  const nodeH = 48;
  const registry = { nodes: data.nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width ?? nodeW, height: n.height ?? nodeH })) };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="topology" {...canvasProps}>
      {/* 존 경계(대시 밴드) + 라벨 */}
      {data.zones.map((z) => (
        <g key={z.id} data-bbangto-viz-zone data-bbangto-viz-zone-id={z.id}>
          <rect
            x={z.x - ZONE_PAD}
            y={z.y - ZONE_PAD}
            width={z.width + ZONE_PAD * 2}
            height={z.height + ZONE_PAD * 2}
            rx={8}
            data-bbangto-viz-edge
            style={{ fill: 'none', strokeDasharray: '6 4' }}
          />
          <text x={z.x} y={z.y - ZONE_PAD - 4} fontSize={11} fontWeight={700} fontFamily={resolveLabelFont(z.label)} style={{ fill: vvar('boundary', 'labelColor') }}>
            {z.label}
          </text>
        </g>
      ))}
      {/* 링크 */}
      {(data.links ?? []).map((l, i) => (
        <Edge key={`l-${i}`} from={l.from} to={l.to} routing="orthogonal" markerEnd="none" />
      ))}
      {/* 노드 */}
      {data.nodes.map((n) => (
        <React.Fragment key={n.id}>
          <Node id={n.id} x={n.x} y={n.y} width={n.width ?? nodeW} height={n.height ?? nodeH} shape={n.shape ?? 'rect'} />
          <NodeLabel x={n.x} y={n.y + (n.height ?? nodeH) / 2} width={n.width ?? nodeW} title={n.label} fontSize={12} />
        </React.Fragment>
      ))}
    </Canvas>
  );
}

NetworkTopology.displayName = 'NetworkTopology';
