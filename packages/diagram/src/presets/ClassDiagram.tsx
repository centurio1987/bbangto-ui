import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import type { MarkerVariant } from '../atoms/Marker';
import { ClassBox } from '../nodes/ClassBox';

export interface ClassSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  stereotype?: string;
  attributes?: string[];
  methods?: string[];
  fill?: string;
  stroke?: string;
}

export type ClassRelationshipKind =
  | 'inheritance'
  | 'composition'
  | 'aggregation'
  | 'association'
  | 'dependency'
  | 'realization';

export interface ClassRelationshipSpec {
  id: string;
  from: string;
  to: string;
  kind?: ClassRelationshipKind;
  label?: string;
  fromLabel?: string;
  toLabel?: string;
}

export interface ClassDiagramData {
  classes: ClassSpec[];
  relationships?: ClassRelationshipSpec[];
}

export interface ClassDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ClassDiagramData;
}

interface EdgeConfig {
  markerEnd?: MarkerVariant;
  markerStart?: MarkerVariant;
  strokeDasharray?: string;
}

function edgeConfig(kind: ClassRelationshipKind): EdgeConfig {
  switch (kind) {
    case 'inheritance':   return { markerEnd: 'triangleOpen' };
    case 'realization':   return { markerEnd: 'triangleOpen', strokeDasharray: '6 3' };
    case 'composition':   return { markerStart: 'diamond' };
    case 'aggregation':   return { markerStart: 'diamondOpen' };
    case 'dependency':    return { markerEnd: 'arrowOpen', strokeDasharray: '5 3' };
    case 'association':
    default:              return { markerEnd: 'arrow' };
  }
}

export function ClassDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Class Diagram',
  ...props
}: ClassDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const classes = data?.classes ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = classes.map((c) => ({ id: c.id, x: c.x, y: c.y, width: c.width, height: c.height }));

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
      {classes.map((c) => (
        <ClassBox
          key={c.id}
          id={c.id}
          x={c.x}
          y={c.y}
          width={c.width}
          height={c.height}
          name={c.name}
          attributes={c.attributes}
          methods={c.methods}
          fill={c.fill}
          stroke={c.stroke}
        />
      ))}
      {relationships.map((r) => {
        const cfg = edgeConfig(r.kind ?? 'association');
        return (
          <Edge
            key={r.id}
            from={r.from}
            to={r.to}
            markerEnd={cfg.markerEnd}
            markerStart={cfg.markerStart}
            strokeDasharray={cfg.strokeDasharray}
            strokeWidth={1.5}
          />
        );
      })}
    </DiagramCanvas>
  );
}

ClassDiagram.displayName = 'ClassDiagram';
