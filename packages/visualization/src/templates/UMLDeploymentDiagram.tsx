import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge, type EdgeLabelOffset } from '../atoms/Edge';
import { LegendBlock, relationLegendBox, type RelationLegendOption } from '../molecules/LegendBlock';
import { relationEdgeProps, usedRelationKinds, type RelationKind } from '../atoms/relationKind';
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

/** 이 도식의 관계가 받는 뜻(KAN-082 .2). */
export type UMLDeploymentRelationKind = Extract<RelationKind, 'deployment' | 'network' | 'dependency'>;

export interface UMLDeploymentEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  /** 선 가운데 라벨을 이만큼 옮긴다(겹칠 때 비키기, KAN-082). */
  labelOffset?: EdgeLabelOffset;
  routing?: EdgeRouting;
  /** 관계의 뜻(KAN-082). 적으면 선 모양이 종류마다 갈리고, 둘 이상 쓰이면 범례가 붙는다. */
  kind?: UMLDeploymentRelationKind;
}

export interface UMLDeploymentDiagramData {
  environments?: UMLDeploymentEnvironmentSpec[];
  nodes: UMLDeploymentNodeSpec[];
  edges?: UMLDeploymentEdgeSpec[];
  /** 관계 종류가 둘 이상 쓰이면 붙는 범례의 위치 · 이름 바꾸기. `false` 면 그리지 않는다(KAN-082). */
  legend?: RelationLegendOption | false;
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
      <Canvas data-viz-notation viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const environments = data?.environments ?? [];
  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];

  const allNodes = nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width, height: n.height }));

  const legend = relationLegendBox([...environments, ...allNodes], usedRelationKinds(edges), data?.legend);

  const autoViewBox = viewBox ?? (() => {
    const all = [...environments, ...nodes];
    if (!all.length) return '0 0 600 400';
    const maxX = Math.max(...all.map((n) => n.x + n.width), legend ? legend.x + legend.width : 0) + 20;
    const maxY = Math.max(...all.map((n) => n.y + n.height), legend ? legend.y + legend.height : 0) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas
      data-viz-notation
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
            fill={n.fill}
            stroke={n.stroke}
            strokeWidth={2}
          />
          <NodeLabel x={n.x} y={n.y + n.height / 2 + 6} width={n.width} title={n.name} fontSize={12} />
        </React.Fragment>
      ))}
      {edges.map((e) => (
        <Edge key={e.id} from={e.from} to={e.to} routing={e.routing ?? 'orthogonal'} markerEnd="arrow" label={e.label} labelOffset={e.labelOffset} {...relationEdgeProps(e.kind)} />
      ))}
      {legend && <LegendBlock {...legend} />}
    </Canvas>
  );
}

UMLDeploymentDiagram.displayName = 'UMLDeploymentDiagram';
