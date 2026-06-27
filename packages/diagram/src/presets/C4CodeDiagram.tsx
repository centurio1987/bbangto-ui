import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import { ClassBox } from '../nodes/ClassBox';
import { EntityTable } from '../nodes/EntityTable';
import type { EntityAttribute } from '../nodes/EntityTable';
import type { C4RelationshipSpec } from './c4Types';

export type C4CodeElementKind = 'class' | 'entity' | 'generic';

export interface C4CodeElementSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  kind?: C4CodeElementKind;
  // class
  attributes?: string[];
  methods?: string[];
  // entity
  columns?: EntityAttribute[];
}

export interface C4CodeDiagramData {
  elements: C4CodeElementSpec[];
  relationships?: C4RelationshipSpec[];
}

export interface C4CodeDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: C4CodeDiagramData;
}

export function C4CodeDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'C4 Code Diagram',
  ...props
}: C4CodeDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const elements = data?.elements ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = elements.map((e) => ({ id: e.id, x: e.x, y: e.y, width: e.width, height: e.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 300';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
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
      {elements.map((el) => {
        if (el.kind === 'entity') {
          return (
            <EntityTable
              key={el.id}
              id={el.id}
              x={el.x}
              y={el.y}
              width={el.width}
              name={el.name}
              attributes={el.columns}
            />
          );
        }
        // default: class or generic → ClassBox
        return (
          <ClassBox
            key={el.id}
            id={el.id}
            x={el.x}
            y={el.y}
            width={el.width}
            height={el.height}
            name={el.name}
            attributes={el.attributes}
            methods={el.methods}
          />
        );
      })}
      {relationships.map((r) => (
        <Edge key={r.id} from={r.from} to={r.to} markerEnd="triangleOpen" stroke="#555555" strokeWidth={1.5} />
      ))}
    </DiagramCanvas>
  );
}

C4CodeDiagram.displayName = 'C4CodeDiagram';
