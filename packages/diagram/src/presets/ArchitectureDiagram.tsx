import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { Boundary } from '../atoms/Boundary';
import type { NodeShape } from '../geometry/shapes';
import type { EdgeRouting } from '../geometry/routing';

export interface ArchServiceSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  shape?: NodeShape;
  fill?: string;
  stroke?: string;
}

export interface ArchGroupSpec {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface ArchEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  routing?: EdgeRouting;
}

export interface ArchitectureDiagramData {
  groups?: ArchGroupSpec[];
  services: ArchServiceSpec[];
  edges?: ArchEdgeSpec[];
}

export interface ArchitectureDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ArchitectureDiagramData;
}

export function ArchitectureDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Architecture Diagram',
  ...props
}: ArchitectureDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const groups = data?.groups ?? [];
  const services = data?.services ?? [];
  const edges = data?.edges ?? [];

  const allNodes = services.map((s) => ({ id: s.id, x: s.x, y: s.y, width: s.width, height: s.height }));

  const autoViewBox = viewBox ?? (() => {
    const all = [...groups, ...services];
    if (!all.length) return '0 0 600 400';
    const maxX = Math.max(...all.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...all.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <DiagramCanvas
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {groups.map((g, i) => (
        <Boundary
          key={i}
          x={g.x}
          y={g.y}
          width={g.width}
          height={g.height}
          label={g.label}
          dashPattern=""
          strokeWidth={1.5}
        />
      ))}
      {services.map((s) => (
        <React.Fragment key={s.id}>
          <Node
            id={s.id}
            x={s.x}
            y={s.y}
            width={s.width}
            height={s.height}
            shape={s.shape ?? 'rounded'}
            fill={s.fill ?? '#FFFFFF'}
            stroke={s.stroke ?? '#111111'}
            strokeWidth={2}
          />
          <NodeLabel x={s.x} y={s.y + s.height / 2} width={s.width} title={s.label} fontSize={11} />
        </React.Fragment>
      ))}
      {edges.map((e) => (
        <Edge key={e.id} from={e.from} to={e.to} routing={e.routing ?? 'orthogonal'} markerEnd="arrow" />
      ))}
    </DiagramCanvas>
  );
}

ArchitectureDiagram.displayName = 'ArchitectureDiagram';
