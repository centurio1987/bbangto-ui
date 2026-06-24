import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { Boundary } from '../atoms/Boundary';
import type { EdgeRouting } from '../geometry/routing';

export interface UMLDeploymentNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  fill?: string;
  stroke?: string;
}

export interface UMLDeploymentEnvironmentSpec {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface UMLDeploymentEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  routing?: EdgeRouting;
}

export interface UMLDeploymentDiagramData {
  environments?: UMLDeploymentEnvironmentSpec[];
  nodes: UMLDeploymentNodeSpec[];
  edges?: UMLDeploymentEdgeSpec[];
}

export interface UMLDeploymentDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: UMLDeploymentDiagramData;
}

export function UMLDeploymentDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'UML Deployment Diagram',
  ...props
}: UMLDeploymentDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const environments = data?.environments ?? [];
  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];

  const allNodes = nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width, height: n.height }));

  const autoViewBox = viewBox ?? (() => {
    const all = [...environments, ...nodes];
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
      {environments.map((env, i) => (
        <Boundary
          key={i}
          x={env.x}
          y={env.y}
          width={env.width}
          height={env.height}
          label={env.label}
          strokeWidth={1.5}
        />
      ))}
      {nodes.map((n) => (
        <React.Fragment key={n.id}>
          <Node
            id={n.id}
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            shape="cube"
            fill={n.fill ?? '#E8EDF4'}
            stroke={n.stroke ?? '#111111'}
            strokeWidth={2}
          />
          <NodeLabel x={n.x} y={n.y + n.height / 2 + 6} width={n.width} title={n.name} fontSize={12} />
        </React.Fragment>
      ))}
      {edges.map((e) => (
        <Edge key={e.id} from={e.from} to={e.to} routing={e.routing ?? 'orthogonal'} markerEnd="arrow" />
      ))}
    </DiagramCanvas>
  );
}

UMLDeploymentDiagram.displayName = 'UMLDeploymentDiagram';
