import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { dvar } from '../tokens/contract';

export interface MindmapNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  level?: number;
  fill?: string;
  stroke?: string;
}

export interface MindmapEdgeSpec {
  id: string;
  from: string;
  to: string;
}

export interface MindmapProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: {
    nodes: MindmapNodeSpec[];
    edges?: MindmapEdgeSpec[];
  };
}

const LEVEL_FILLS = [
  dvar('palette', 'p2'),
  dvar('palette', 'p5'),
  dvar('palette', 'p6'),
  dvar('palette', 'p4'),
];

function levelFill(level: number, overrideFill?: string): string {
  return overrideFill ?? LEVEL_FILLS[level] ?? LEVEL_FILLS[LEVEL_FILLS.length - 1]!;
}

export function Mindmap({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Mindmap',
  ...props
}: MindmapProps) {
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
    if (!nodes.length) return '0 0 600 400';
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
            shape={n.level === 0 ? 'rounded' : 'stadium'}
            fill={levelFill(n.level ?? 1, n.fill)}
            stroke={n.stroke ?? '#111111'}
            strokeWidth={n.level === 0 ? 2.5 : 1.5}
          />
          <NodeLabel
            x={n.x}
            y={n.y + n.height / 2}
            width={n.width}
            title={n.label}
            fontSize={n.level === 0 ? 13 : 11}
          />
        </React.Fragment>
      ))}
      {/* Mindmap edges: curved, no arrowheads */}
      {edges.map((e) => (
        <Edge
          key={e.id}
          from={e.from}
          to={e.to}
          routing="curved"
          markerEnd="none"
          stroke="#555555"
          strokeWidth={1.5}
        />
      ))}
    </DiagramCanvas>
  );
}

Mindmap.displayName = 'Mindmap';
