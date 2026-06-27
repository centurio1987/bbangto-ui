import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import type { MarkerVariant } from '../atoms/Marker';
import { ClassBox } from '../nodes/ClassBox';

export interface SysMLBlockSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  stereotype?: string;
  values?: string[];
  operations?: string[];
  fill?: string;
  stroke?: string;
}

export type SysMLRelKind = 'composition' | 'aggregation' | 'association' | 'dependency';

export interface SysMLRelationshipSpec {
  id: string;
  from: string;
  to: string;
  kind?: SysMLRelKind;
}

export interface SysMLBlockDiagramData {
  blocks: SysMLBlockSpec[];
  relationships?: SysMLRelationshipSpec[];
}

export interface SysMLBlockDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: SysMLBlockDiagramData;
}

function relMarker(kind?: SysMLRelKind): { markerEnd?: MarkerVariant; markerStart?: MarkerVariant; dash?: string } {
  switch (kind) {
    case 'composition':  return { markerStart: 'diamond' };
    case 'aggregation':  return { markerStart: 'diamondOpen' };
    case 'dependency':   return { markerEnd: 'arrowOpen', dash: '5 3' };
    case 'association':
    default:             return { markerEnd: 'arrow' };
  }
}

export function SysMLBlockDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'SysML Block Diagram',
  ...props
}: SysMLBlockDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const blocks        = data?.blocks        ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = blocks.map((b) => ({ id: b.id, x: b.x, y: b.y, width: b.width, height: b.height }));

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
      {blocks.map((b) => (
        <ClassBox
          key={b.id}
          id={b.id}
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
          name={b.name}
          stereotype={b.stereotype ?? 'block'}
          attributes={b.values}
          methods={b.operations}
          fill={b.fill}
          stroke={b.stroke}
        />
      ))}
      {relationships.map((r) => {
        const mk = relMarker(r.kind);
        return (
          <Edge
            key={r.id}
            from={r.from}
            to={r.to}
            markerEnd={mk.markerEnd}
            markerStart={mk.markerStart}
            strokeDasharray={mk.dash}
            strokeWidth={1.5}
          />
        );
      })}
    </DiagramCanvas>
  );
}

SysMLBlockDiagram.displayName = 'SysMLBlockDiagram';
