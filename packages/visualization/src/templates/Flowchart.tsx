import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { GridLayer } from '../atoms/GridLayer';
import type { NodeShape } from '../geometry/shapes';
import type { EdgeRouting } from '../geometry/routing';
import type { MarkerVariant } from '../atoms/Marker';

export interface FlowchartNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  shape?: NodeShape;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export interface FlowchartEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  routing?: EdgeRouting;
  dashed?: boolean;
  markerEnd?: MarkerVariant;
}

export interface FlowchartProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: {
    nodes: FlowchartNodeSpec[];
    edges?: FlowchartEdgeSpec[];
  };
  showGrid?: boolean;
}

/**
 * @vizType VT-201 Flowchart · B. 프로세스·플로우 · dataShape: process · 구조: sequential, branching
 * @useWhen 분기가 있는 범용 절차를 도식할 때
 * @useWhen 의사결정 흐름을 표현할 때
 * @avoidWhen 표준 업무 절차는 BPMN(VT-122) 사용
 * @avoidWhen 스윔레인 병행 절차는 Activity(VT-106) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Flowchart({
  children,
  data,
  showGrid = false,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Flowchart',
  ...props
}: FlowchartProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];

  const autoViewBox = viewBox ?? (() => {
    if (!nodes.length) return '0 0 400 300';
    const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const vbParts = autoViewBox.split(' ').map(Number);
  const vbW = vbParts[2] ?? 400;
  const vbH = vbParts[3] ?? 300;

  return (
    <Canvas
      data={{ nodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {showGrid && <GridLayer width={vbW} height={vbH} />}
      {nodes.map((n) => (
        <React.Fragment key={n.id}>
          <Node
            id={n.id}
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            shape={n.shape ?? 'rect'}
            fill={n.fill}
            stroke={n.stroke}
            strokeWidth={n.strokeWidth}
            strokeDasharray={n.strokeDasharray}
          />
          {n.label && (
            <NodeLabel
              x={n.x}
              y={n.y + n.height / 2}
              width={n.width}
              title={n.label}
              fontSize={12}
            />
          )}
        </React.Fragment>
      ))}
      {edges.map((e) => (
        <Edge
          key={e.id}
          from={e.from}
          to={e.to}
          routing={e.routing ?? 'orthogonal'}
          markerEnd={e.markerEnd ?? 'arrow'}
          strokeDasharray={e.dashed ? '6 4' : undefined}
        />
      ))}
    </Canvas>
  );
}

Flowchart.displayName = 'Flowchart';
