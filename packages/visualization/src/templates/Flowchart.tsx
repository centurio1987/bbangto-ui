import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { GridLayer } from '../atoms/GridLayer';
import type { NodeShape } from '../geometry/shapes';
import type { EdgeRouting } from '../geometry/routing';
import type { MarkerVariant } from '../atoms/Marker';

export interface FlowchartNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  shape?: NodeShape;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export interface FlowchartEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  routing?: EdgeRouting;
  dashed?: boolean;
  markerEnd?: MarkerVariant;
}

export interface FlowchartProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: {
    nodes: FlowchartNodeSpec[];
    edges?: FlowchartEdgeSpec[];
  };
  showGrid?: boolean;
}

export function Flowchart({
  children,
  data,
  showGrid = false,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Flowchart',
  ...props
}: FlowchartProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];

  const autoViewBox = viewBox ?? (() => {
    if (!nodes.length) return '0 0 400 300';
    const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const vbParts = autoViewBox.split(' ').map(Number);
  const vbW = vbParts[2] ?? 400;
  const vbH = vbParts[3] ?? 300;

  return (
    <DiagramCanvas
      data={{ nodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {showGrid && <GridLayer width={vbW} height={vbH} />}
      {nodes.map((n) => (
        <React.Fragment key={n.id}>
          <Node
            id={n.id}
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            shape={n.shape ?? 'rect'}
            fill={n.fill ?? '#FFFFFF'}
            stroke={n.stroke ?? '#111111'}
            strokeWidth={n.strokeWidth ?? 2.5}
            strokeDasharray={n.strokeDasharray}
          />
          {n.label && (
            <NodeLabel
              x={n.x}
              y={n.y + n.height / 2}
              width={n.width}
              title={n.label}
              fontSize={12}
            />
          )}
        </React.Fragment>
      ))}
      {edges.map((e) => (
        <Edge
          key={e.id}
          from={e.from}
          to={e.to}
          routing={e.routing ?? 'orthogonal'}
          markerEnd={e.markerEnd ?? 'arrow'}
          strokeDasharray={e.dashed ? '6 4' : undefined}
        />
      ))}
    </DiagramCanvas>
  );
}

Flowchart.displayName = 'Flowchart';
