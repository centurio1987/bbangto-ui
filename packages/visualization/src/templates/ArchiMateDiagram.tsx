import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';

export type ArchiMateLayer = 'business' | 'application' | 'technology';

export type ArchiMateRelKind =
  | 'serving'
  | 'triggering'
  | 'association'
  | 'composition'
  | 'aggregation'
  | 'realization'
  | 'influence'
  | 'access';

export interface ArchiMateElementSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  kind?: string;
  fill?: string;
}

export interface ArchiMateRelationshipSpec {
  id: string;
  from: string;
  to: string;
  kind?: ArchiMateRelKind;
}

export interface ArchiMateDiagramData {
  elements: ArchiMateElementSpec[];
  relationships?: ArchiMateRelationshipSpec[];
}

export interface ArchiMateDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ArchiMateDiagramData;
  layer: ArchiMateLayer;
}

const LAYER_FILL: Record<ArchiMateLayer, string> = {
  business:    '#FFF9C4',
  application: '#DBEAFE',
  technology:  '#DCFCE7',
};

function relMarkerEnd(kind?: ArchiMateRelKind) {
  switch (kind) {
    case 'composition':  return 'diamond'     as const;
    case 'aggregation':  return 'diamondOpen' as const;
    case 'realization':  return 'triangleOpen'as const;
    default:             return 'arrow'       as const;
  }
}

function relDash(kind?: ArchiMateRelKind): string | undefined {
  return kind === 'influence' || kind === 'access' ? '5 3' : undefined;
}

export function ArchiMateDiagram({
  children,
  data,
  layer,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'ArchiMate Diagram',
  ...props
}: ArchiMateDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const elements      = data?.elements      ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = elements.map((e) => ({ id: e.id, x: e.x, y: e.y, width: e.width, height: e.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 300';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const layerFill = LAYER_FILL[layer];
  const tagY = (e: ArchiMateElementSpec) => e.y + e.height - 8;

  return (
    <DiagramCanvas
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      <g data-bbangto-diagram-archimate-layer={layer}>
        {elements.map((e) => (
          <React.Fragment key={e.id}>
            <Node
              id={e.id}
              x={e.x}
              y={e.y}
              width={e.width}
              height={e.height}
              shape="rect"
              fill={e.fill ?? layerFill}
              stroke="#111111"
              strokeWidth={1.5}
              data-bbangto-diagram-archimate-element
            />
            <NodeLabel
              x={e.x}
              y={e.y + e.height / 2 - 6}
              width={e.width}
              title={e.name}
              fontSize={12}
            />
            {e.kind && (
              <Tag x={e.x + e.width / 2} y={tagY(e)} label={e.kind} />
            )}
          </React.Fragment>
        ))}
        {relationships.map((r) => (
          <Edge
            key={r.id}
            from={r.from}
            to={r.to}
            markerEnd={relMarkerEnd(r.kind)}
            strokeDasharray={relDash(r.kind)}
            strokeWidth={1.5}
          />
        ))}
      </g>
    </DiagramCanvas>
  );
}

ArchiMateDiagram.displayName = 'ArchiMateDiagram';

// ──────────────────────────────────────────────────────────────────────
// Layer-specific convenience components
// ──────────────────────────────────────────────────────────────────────

export interface ArchiMateLayerDiagramProps extends Omit<ArchiMateDiagramProps, 'layer'> {}

export function ArchiMateBusinessDiagram(props: ArchiMateLayerDiagramProps) {
  return <ArchiMateDiagram layer="business" title={props.title ?? 'ArchiMate Business'} {...props} />;
}
ArchiMateBusinessDiagram.displayName = 'ArchiMateBusinessDiagram';

export function ArchiMateApplicationDiagram(props: ArchiMateLayerDiagramProps) {
  return <ArchiMateDiagram layer="application" title={props.title ?? 'ArchiMate Application'} {...props} />;
}
ArchiMateApplicationDiagram.displayName = 'ArchiMateApplicationDiagram';

export function ArchiMateTechnologyDiagram(props: ArchiMateLayerDiagramProps) {
  return <ArchiMateDiagram layer="technology" title={props.title ?? 'ArchiMate Technology'} {...props} />;
}
ArchiMateTechnologyDiagram.displayName = 'ArchiMateTechnologyDiagram';
