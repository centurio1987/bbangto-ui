import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import type { EdgeRouting } from '../geometry/routing';
import type { MarkerVariant } from '../atoms/Marker';

export interface BlockNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface BlockEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  routing?: EdgeRouting;
  markerEnd?: MarkerVariant;
}

export interface BlockDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: {
    nodes: BlockNodeSpec[];
    edges?: BlockEdgeSpec[];
  };
}

export function BlockDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Block Diagram',
  ...props
}: BlockDiagramProps) {
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
    if (!nodes.length) return '0 0 400 200';
    const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <DiagramCanvas
      data={{ nodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {nodes.map((n) => (
        <React.Fragment key={n.id}>
          <Node
            id={n.id}
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            shape="rect"
            fill={n.fill ?? '#FFFFFF'}
            stroke={n.stroke ?? '#111111'}
            strokeWidth={n.strokeWidth ?? 2.5}
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
        />
      ))}
    </DiagramCanvas>
  );
}

BlockDiagram.displayName = 'BlockDiagram';
