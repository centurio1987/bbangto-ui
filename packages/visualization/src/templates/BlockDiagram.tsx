import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import type { EdgeRouting } from '../geometry/routing';
import type { MarkerVariant } from '../atoms/Marker';

export interface BlockNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface BlockEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  routing?: EdgeRouting;
  markerEnd?: MarkerVariant;
}

export interface BlockDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: {
    nodes: BlockNodeSpec[];
    edges?: BlockEdgeSpec[];
  };
}

/**
 * @vizType VT-116 Block Diagram · A. 엔지니어링/소프트웨어 · dataShape: relationship · 구조: relational
 * @useWhen 기능 블록과 연결로 시스템을 분해할 때
 * @avoidWhen 표준 컴포넌트 배선은 Component(VT-103) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function BlockDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Block Diagram',
  ...props
}: BlockDiagramProps) {
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
    if (!nodes.length) return '0 0 400 200';
    const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas
      data={{ nodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {nodes.map((n) => (
        <React.Fragment key={n.id}>
          <Node
            id={n.id}
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            shape="rect"
            fill={n.fill ?? '#FFFFFF'}
            stroke={n.stroke ?? '#111111'}
            strokeWidth={n.strokeWidth ?? 2.5}
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
        />
      ))}
    </Canvas>
  );
}

BlockDiagram.displayName = 'BlockDiagram';
