import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';
import { vvar } from '../tokens/contract';
import type { ArchiMateRelKind } from './ArchiMateDiagram';

export type ArchiMateViewpoint = 'motivation' | 'strategy' | 'implementation';

export interface ArchiMateViewpointElementSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  kind?: string;
  fill?: string;
}

export interface ArchiMateViewpointRelationshipSpec {
  id: string;
  from: string;
  to: string;
  kind?: ArchiMateRelKind;
}

export interface ArchiMateViewpointDiagramData {
  elements: ArchiMateViewpointElementSpec[];
  relationships?: ArchiMateViewpointRelationshipSpec[];
}

export interface ArchiMateViewpointDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ArchiMateViewpointDiagramData;
  viewpoint: ArchiMateViewpoint;
}

// ArchiMate 확장 viewpoint 밴드 컬러(motivation=보라, strategy=주황, implementation=핑크).
const VIEWPOINT_FILL: Record<ArchiMateViewpoint, string> = {
  motivation: 'p2',
  strategy: 'p1',
  implementation: 'p3',
};

function relMarkerEnd(kind?: ArchiMateRelKind) {
  switch (kind) {
    case 'composition': return 'diamond' as const;
    case 'aggregation': return 'diamondOpen' as const;
    case 'realization': return 'triangleOpen' as const;
    default: return 'arrow' as const;
  }
}

function relDash(kind?: ArchiMateRelKind): string | undefined {
  return kind === 'influence' || kind === 'access' ? '5 3' : undefined;
}

/**
 * ArchiMate 확장 viewpoints (VT-121) — motivation / strategy / implementation & migration.
 * ArchiMate element/relationship 렌더를 재사용하되 viewpoint별 fill 밴드로 구분. headless.
 */
export function ArchiMateViewpointDiagram({
  children,
  data,
  viewpoint,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'ArchiMate viewpoint',
  ...props
}: ArchiMateViewpointDiagramProps) {
  if (children != null || !data) {
    return (
      <Canvas
        viewBox={viewBox}
        width={width}
        height={height}
        title={title}
        data-bbangto-viz-chart="archimate-viewpoint"
        data-bbangto-viz-archimate-viewpoint={viewpoint}
        {...props}
      >
        {children}
      </Canvas>
    );
  }

  const elements = data.elements;
  const relationships = data.relationships ?? [];
  const nodes = elements.map((e) => ({ id: e.id, x: e.x, y: e.y, width: e.width, height: e.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!nodes.length) return '0 0 600 300';
    const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const bandFill = vvar('palette', VIEWPOINT_FILL[viewpoint]);
  const stroke = vvar('shape', 'stroke');

  return (
    <Canvas
      data={{ nodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      data-bbangto-viz-chart="archimate-viewpoint"
      data-bbangto-viz-archimate-viewpoint={viewpoint}
      {...props}
    >
      {relationships.map((r) => (
        <Edge
          key={r.id}
          id={r.id}
          from={r.from}
          to={r.to}
          markerEnd={relMarkerEnd(r.kind)}
          strokeDasharray={relDash(r.kind)}
          strokeWidth={1.5}
        />
      ))}
      {elements.map((e) => (
        <g key={e.id} data-bbangto-viz-archimate-element data-bbangto-viz-archimate-element-id={e.id}>
          <Node id={e.id} x={e.x} y={e.y} width={e.width} height={e.height} shape="rounded" fill={e.fill ?? bandFill} stroke={stroke} strokeWidth={1.5} />
          <NodeLabel x={e.x} y={e.y + e.height / 2 - 6} width={e.width} title={e.name} fontSize={12} />
          {e.kind && <Tag x={e.x + e.width / 2} y={e.y + e.height - 8} label={e.kind} />}
        </g>
      ))}
    </Canvas>
  );
}

ArchiMateViewpointDiagram.displayName = 'ArchiMateViewpointDiagram';
