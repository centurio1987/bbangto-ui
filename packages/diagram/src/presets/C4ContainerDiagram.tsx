import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import { Boundary } from '../atoms/Boundary';
import { PersonNode } from '../nodes/PersonNode';
import { ExternalNode } from '../nodes/ExternalNode';
import { C4Box } from '../nodes/C4Box';
import type { C4PersonSpec, C4ContainerSpec, C4RelationshipSpec, C4BoundarySpec } from './c4Types';

export type { C4ContainerSpec };

export interface C4ContainerDiagramData {
  systemBoundary?: C4BoundarySpec;
  containers?: C4ContainerSpec[];
  external?: (C4PersonSpec & { external?: boolean })[];
  relationships?: C4RelationshipSpec[];
}

export interface C4ContainerDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: C4ContainerDiagramData;
}

export function C4ContainerDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'C4 Container Diagram',
  ...props
}: C4ContainerDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const containers = data?.containers ?? [];
  const external = data?.external ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = [
    ...containers.map((c) => ({ id: c.id, x: c.x, y: c.y, width: c.width, height: c.height })),
    ...external.map((e) => ({ id: e.id, x: e.x, y: e.y, width: e.width, height: e.height })),
  ];

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 400';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 30;
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
      {data?.systemBoundary && (
        <Boundary
          x={data.systemBoundary.x}
          y={data.systemBoundary.y}
          width={data.systemBoundary.width}
          height={data.systemBoundary.height}
          label={data.systemBoundary.label}
        />
      )}
      {containers.map((c) => (
        <C4Box
          key={c.id}
          id={c.id}
          x={c.x}
          y={c.y}
          width={c.width}
          height={c.height}
          level="l2"
          title={c.name}
          subtitle={c.technology}
          fill={c.fill}
        />
      ))}
      {external.map((e) =>
        e.external ? (
          <ExternalNode key={e.id} id={e.id} x={e.x} y={e.y} width={e.width} height={e.height} title={e.name} />
        ) : (
          <PersonNode key={e.id} id={e.id} x={e.x} y={e.y} width={e.width} height={e.height} title={e.name} />
        ),
      )}
      {relationships.map((r) => (
        <Edge key={r.id} from={r.from} to={r.to} />
      ))}
    </DiagramCanvas>
  );
}

C4ContainerDiagram.displayName = 'C4ContainerDiagram';
