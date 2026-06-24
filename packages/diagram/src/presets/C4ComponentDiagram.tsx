import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import { Boundary } from '../atoms/Boundary';
import { C4Box } from '../nodes/C4Box';
import type { C4ComponentSpec, C4RelationshipSpec, C4BoundarySpec } from './c4Types';

export type { C4ComponentSpec };

export interface C4ComponentDiagramData {
  containerBoundary?: C4BoundarySpec;
  components?: C4ComponentSpec[];
  relationships?: C4RelationshipSpec[];
}

export interface C4ComponentDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: C4ComponentDiagramData;
}

export function C4ComponentDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'C4 Component Diagram',
  ...props
}: C4ComponentDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const components = data?.components ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = components.map((c) => ({ id: c.id, x: c.x, y: c.y, width: c.width, height: c.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 300';
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
      {data?.containerBoundary && (
        <Boundary
          x={data.containerBoundary.x}
          y={data.containerBoundary.y}
          width={data.containerBoundary.width}
          height={data.containerBoundary.height}
          label={data.containerBoundary.label}
        />
      )}
      {components.map((c) => (
        <C4Box
          key={c.id}
          id={c.id}
          x={c.x}
          y={c.y}
          width={c.width}
          height={c.height}
          level="l3"
          title={c.name}
          subtitle={c.technology}
          fill={c.fill}
        />
      ))}
      {relationships.map((r) => (
        <Edge key={r.id} from={r.from} to={r.to} />
      ))}
    </DiagramCanvas>
  );
}

C4ComponentDiagram.displayName = 'C4ComponentDiagram';
