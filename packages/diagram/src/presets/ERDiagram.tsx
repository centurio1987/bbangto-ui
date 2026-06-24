import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import type { MarkerVariant } from '../atoms/Marker';
import { EntityTable } from '../nodes/EntityTable';
import type { EntityAttribute } from '../nodes/EntityTable';

export type { EntityAttribute };

const HEADER_H = 28;
const ROW_H = 22;

export type ERCardinality = 'one' | 'many' | 'zeroOrOne' | 'oneOrMany' | 'zeroOrMany';

function cardinalityMarker(c: ERCardinality): MarkerVariant {
  switch (c) {
    case 'one':        return 'erOne';
    case 'many':       return 'erMany';
    case 'zeroOrOne':  return 'erZeroOrOne';
    case 'oneOrMany':  return 'erOneOrMany';
    case 'zeroOrMany': return 'erZeroOrMany';
  }
}

export interface EREntitySpec {
  id: string;
  x: number;
  y: number;
  width: number;
  name: string;
  attributes?: EntityAttribute[];
  fill?: string;
  headerFill?: string;
  stroke?: string;
}

export interface ERRelationshipSpec {
  id: string;
  from: string;
  to: string;
  fromCardinality?: ERCardinality;
  toCardinality?: ERCardinality;
  label?: string;
}

export interface ERDiagramData {
  entities: EREntitySpec[];
  relationships?: ERRelationshipSpec[];
}

export interface ERDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ERDiagramData;
}

function entityHeight(e: EREntitySpec): number {
  return HEADER_H + (e.attributes?.length ?? 0) * ROW_H;
}

export function ERDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'ER Diagram',
  ...props
}: ERDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const entities = data?.entities ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = entities.map((e) => ({
    id: e.id,
    x: e.x,
    y: e.y,
    width: e.width,
    height: entityHeight(e),
  }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 400';
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
      {entities.map((e) => (
        <EntityTable
          key={e.id}
          id={e.id}
          x={e.x}
          y={e.y}
          width={e.width}
          name={e.name}
          attributes={e.attributes}
          fill={e.fill}
          headerFill={e.headerFill}
          stroke={e.stroke}
        />
      ))}
      {relationships.map((r) => {
        const markerEnd = r.toCardinality ? cardinalityMarker(r.toCardinality) : 'arrow';
        const markerStart = r.fromCardinality ? cardinalityMarker(r.fromCardinality) : undefined;
        return (
          <Edge
            key={r.id}
            from={r.from}
            to={r.to}
            markerEnd={markerEnd}
            markerStart={markerStart}
            strokeWidth={1.5}
          />
        );
      })}
    </DiagramCanvas>
  );
}

ERDiagram.displayName = 'ERDiagram';
