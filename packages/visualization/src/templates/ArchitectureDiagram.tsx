import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge, type EdgeLabelOffset } from '../atoms/Edge';
import { LegendBlock, relationLegendBox, type RelationLegendOption } from '../molecules/LegendBlock';
import { relationEdgeProps, usedRelationKinds, type RelationKind } from '../atoms/relationKind';
import { NodeLabel } from '../atoms/NodeLabel';
import { Boundary } from '../atoms/Boundary';
import type { NodeShape } from '../geometry/shapes';
import type { EdgeRouting } from '../geometry/routing';

export interface ArchServiceSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  shape?: NodeShape;
  fill?: string;
  stroke?: string;
}

export interface ArchGroupSpec {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

/** 이 도식의 관계가 받는 뜻(KAN-082 .2). */
export type ArchRelationKind = Extract<RelationKind, 'call' | 'asyncMessage' | 'dataFlow' | 'network' | 'dependency'>;

export interface ArchEdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  /** 선 가운데 라벨을 이만큼 옮긴다(겹칠 때 비키기, KAN-082). */
  labelOffset?: EdgeLabelOffset;
  routing?: EdgeRouting;
  /** 관계의 뜻(KAN-082). 적으면 선 모양이 종류마다 갈리고, 둘 이상 쓰이면 범례가 붙는다. */
  kind?: ArchRelationKind;
}

export interface ArchitectureDiagramData {
  groups?: ArchGroupSpec[];
  services: ArchServiceSpec[];
  edges?: ArchEdgeSpec[];
  /** 관계 종류가 둘 이상 쓰이면 붙는 범례의 위치 · 이름 바꾸기. `false` 면 그리지 않는다(KAN-082). */
  legend?: RelationLegendOption | false;
}

export interface ArchitectureDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ArchitectureDiagramData;
}

/**
 * @vizType VT-115 Cloud Architecture Diagram · A. 엔지니어링/소프트웨어 · dataShape: relationship, network · 구조: nested, relational
 * @useWhen 클라우드 서비스 구성과 연결을 설계·소통할 때
 * @useWhen 중립 아이콘으로 인프라를 도식할 때
 * @avoidWhen 논리 UML 배치는 Deployment(VT-104) 사용
 * @avoidWhen 네트워크 세그먼트 경계는 Network Topology(VT-125) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ArchitectureDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Architecture Diagram',
  ...props
}: ArchitectureDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const groups = data?.groups ?? [];
  const services = data?.services ?? [];
  const edges = data?.edges ?? [];

  const allNodes = services.map((s) => ({ id: s.id, x: s.x, y: s.y, width: s.width, height: s.height }));

  const legend = relationLegendBox([...groups, ...allNodes], usedRelationKinds(edges), data?.legend);

  const autoViewBox = viewBox ?? (() => {
    const all = [...groups, ...services];
    if (!all.length) return '0 0 600 400';
    const maxX = Math.max(...all.map((n) => n.x + n.width), legend ? legend.x + legend.width : 0) + 20;
    const maxY = Math.max(...all.map((n) => n.y + n.height), legend ? legend.y + legend.height : 0) + 20;
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
      {groups.map((g, i) => (
        <Boundary
          key={i}
          x={g.x}
          y={g.y}
          width={g.width}
          height={g.height}
          label={g.label}
          dashPattern=""
          strokeWidth={1.5}
        />
      ))}
      {services.map((s) => (
        <React.Fragment key={s.id}>
          <Node
            id={s.id}
            x={s.x}
            y={s.y}
            width={s.width}
            height={s.height}
            shape={s.shape ?? 'rounded'}
            fill={s.fill}
            stroke={s.stroke}
            strokeWidth={2}
          />
          <NodeLabel x={s.x} y={s.y + s.height / 2} width={s.width} title={s.label} fontSize={11} />
        </React.Fragment>
      ))}
      {edges.map((e) => (
        <Edge key={e.id} from={e.from} to={e.to} routing={e.routing ?? 'orthogonal'} markerEnd="arrow" label={e.label} labelOffset={e.labelOffset} {...relationEdgeProps(e.kind)} />
      ))}
      {legend && <LegendBlock {...legend} />}
    </Canvas>
  );
}

ArchitectureDiagram.displayName = 'ArchitectureDiagram';
