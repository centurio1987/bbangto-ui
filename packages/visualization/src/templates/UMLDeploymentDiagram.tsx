import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { Boundary } from '../atoms/Boundary';
import type { EdgeRouting } from '../geometry/routing';

export interface UMLDeploymentNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  fill?: string;
  stroke?: string;
}

export interface UMLDeploymentEnvironmentSpec {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface UMLDeploymentEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  routing?: EdgeRouting;
}

export interface UMLDeploymentDiagramData {
  environments?: UMLDeploymentEnvironmentSpec[];
  nodes: UMLDeploymentNodeSpec[];
  edges?: UMLDeploymentEdgeSpec[];
}

export interface UMLDeploymentDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: UMLDeploymentDiagramData;
}

/**
 * @vizType VT-104 UML Deployment Diagram · A. 엔지니어링/소프트웨어 · dataShape: relationship, hierarchy · 구조: nested, relational
 * @useWhen 소프트웨어 아티팩트의 물리/실행 노드 배치를 표현할 때
 * @useWhen 인프라 배포 구성을 소통할 때
 * @avoidWhen 논리 컴포넌트 배선은 Component(VT-103) 사용
 * @avoidWhen 클라우드 서비스 구성은 Cloud Architecture(VT-115) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function UMLDeploymentDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'UML Deployment Diagram',
  ...props
}: UMLDeploymentDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const environments = data?.environments ?? [];
  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];

  const allNodes = nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width, height: n.height }));

  const autoViewBox = viewBox ?? (() => {
    const all = [...environments, ...nodes];
    if (!all.length) return '0 0 600 400';
    const maxX = Math.max(...all.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...all.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {environments.map((env, i) => (
        <Boundary
          key={i}
          x={env.x}
          y={env.y}
          width={env.width}
          height={env.height}
          label={env.label}
          strokeWidth={1.5}
        />
      ))}
      {nodes.map((n) => (
        <React.Fragment key={n.id}>
          <Node
            id={n.id}
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            shape="cube"
            fill={n.fill ?? '#E8EDF4'}
            stroke={n.stroke ?? '#111111'}
            strokeWidth={2}
          />
          <NodeLabel x={n.x} y={n.y + n.height / 2 + 6} width={n.width} title={n.name} fontSize={12} />
        </React.Fragment>
      ))}
      {edges.map((e) => (
        <Edge key={e.id} from={e.from} to={e.to} routing={e.routing ?? 'orthogonal'} markerEnd="arrow" />
      ))}
    </Canvas>
  );
}

UMLDeploymentDiagram.displayName = 'UMLDeploymentDiagram';
