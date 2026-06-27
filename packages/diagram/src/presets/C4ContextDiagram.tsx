import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import { Boundary } from '../atoms/Boundary';
import { PersonNode } from '../nodes/PersonNode';
import { ExternalNode } from '../nodes/ExternalNode';
import { C4Box } from '../nodes/C4Box';
import type { C4PersonSpec, C4SystemSpec, C4RelationshipSpec, C4BoundarySpec } from './c4Types';

export type { C4PersonSpec, C4SystemSpec, C4RelationshipSpec, C4BoundarySpec };

export interface C4ContextDiagramData {
  boundary?: C4BoundarySpec;
  persons?: C4PersonSpec[];
  systems?: C4SystemSpec[];
  relationships?: C4RelationshipSpec[];
}

export interface C4ContextDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: C4ContextDiagramData;
}

export function C4ContextDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'C4 Context Diagram',
  ...props
}: C4ContextDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const persons = data?.persons ?? [];
  const systems = data?.systems ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = [
    ...persons.map((p) => ({ id: p.id, x: p.x, y: p.y, width: p.width, height: p.height })),
    ...systems.map((s) => ({ id: s.id, x: s.x, y: s.y, width: s.width, height: s.height })),
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
      {data?.boundary && (
        <Boundary
          x={data.boundary.x}
          y={data.boundary.y}
          width={data.boundary.width}
          height={data.boundary.height}
          label={data.boundary.label}
        />
      )}
      {persons.map((p) =>
        p.external ? (
          <ExternalNode key={p.id} id={p.id} x={p.x} y={p.y} width={p.width} height={p.height} title={p.name} subtitle={p.description} />
        ) : (
          <PersonNode key={p.id} id={p.id} x={p.x} y={p.y} width={p.width} height={p.height} title={p.name} subtitle={p.description} />
        ),
      )}
      {systems.map((s) => (
        <C4Box
          key={s.id}
          id={s.id}
          x={s.x}
          y={s.y}
          width={s.width}
          height={s.height}
          level={s.level ?? 'l1'}
          title={s.name}
          subtitle={s.description}
          fill={s.fill}
        />
      ))}
      {relationships.map((r) => (
        <Edge key={r.id} from={r.from} to={r.to} />
      ))}
    </DiagramCanvas>
  );
}

C4ContextDiagram.displayName = 'C4ContextDiagram';
