import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { LegendBlock, relationLegendBox, type RelationLegendOption } from '../molecules/LegendBlock';
import { relationEdgeProps, usedRelationKinds } from '../atoms/relationKind';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import type { C4ContainerSpec, C4RelationshipSpec } from './c4Types';
import { c4RelationshipLabel } from './c4Types';
import { C4ContainerNode } from './C4ContainerDiagram';

/**
 * C4 배포 노드 — 서버 · VM · 컨테이너 호스트 · 클라우드 영역처럼 컨테이너가 올라가는 곳. 다른 배포 노드 안에 들어갈 수 있다
 * (AWS › VPC › EC2). 좌표는 데이터가 준 그대로이고 자동 배치는 하지 않는다.
 */
export interface C4DeploymentNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  /** 배포 노드의 기술(운영체제 · 리전 · 인스턴스 종류). 이름 아래 「[기술]」로 그린다. */
  technology?: string;
  /** 이 노드를 품는 배포 노드 id. 부모를 자식보다 먼저 그린다. */
  parent?: string;
  /** 같은 노드가 여럿이면 그 수(오른쪽 위 「×N」). */
  instances?: number;
}

/** 배포 노드 위에 올라간 컨테이너 인스턴스 — C4 컨테이너와 같은 칸에 올라간 노드 id 를 더한다. */
export interface C4DeploymentContainerSpec extends C4ContainerSpec {
  /** 이 컨테이너가 올라간 배포 노드 id */
  node: string;
}

export interface C4DeploymentDiagramData {
  nodes: C4DeploymentNodeSpec[];
  containers?: C4DeploymentContainerSpec[];
  relationships?: C4RelationshipSpec[];
  /** 관계 종류가 둘 이상 쓰이면 붙는 범례의 위치 · 이름 바꾸기. `false` 면 그리지 않는다(KAN-082). */
  legend?: RelationLegendOption | false;
}

export interface C4DeploymentDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: C4DeploymentDiagramData;
}

const NAME_FS = 12;
const TECH_FS = 10;

/**
 * @vizType VT-104 UML Deployment Diagram · A. 엔지니어링/소프트웨어 · dataShape: relationship, hierarchy · 구조: nested, relational
 * @useWhen 소프트웨어 아티팩트의 물리/실행 노드 배치를 표현할 때
 * @useWhen 인프라 배포 구성을 소통할 때
 * @avoidWhen 논리 컴포넌트 배선은 Component(VT-103) 사용
 * @avoidWhen 클라우드 서비스 구성은 Cloud Architecture(VT-115) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function C4DeploymentDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'C4 Deployment Diagram',
  ...props
}: C4DeploymentDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const nodes = data?.nodes ?? [];
  const containers = data?.containers ?? [];
  const relationships = data?.relationships ?? [];

  // 관계선은 컨테이너끼리도, 배포 노드끼리도 이을 수 있다
  const allNodes = [
    ...nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width, height: n.height })),
    ...containers.map((c) => ({ id: c.id, x: c.x, y: c.y, width: c.width, height: c.height })),
  ];

  // 부모를 자식보다 먼저 그린다 — 깊이 순, 같은 깊이는 데이터 순서
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const depth = (n: C4DeploymentNodeSpec): number => {
    let d = 0;
    for (let p = n.parent, seen = 0; p && byId.has(p) && seen < nodes.length; p = byId.get(p)!.parent, seen++) d++;
    return d;
  };
  const ordered = nodes.map((n, i) => ({ n, i, d: depth(n) })).sort((a, b) => a.d - b.d || a.i - b.i).map((x) => x.n);

  const legend = relationLegendBox(allNodes, usedRelationKinds(relationships), data?.legend);

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 400';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width), legend ? legend.x + legend.width : 0) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height), legend ? legend.y + legend.height : 0) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const ink = vvar('on', 'canvas', 'bg');

  return (
    <Canvas data={{ nodes: allNodes }} viewBox={autoViewBox} width={width} height={height} title={title} {...props}>
      {ordered.map((n) => (
        <g key={n.id} data-bbangto-viz-deploy-node={n.id} data-bbangto-viz-deploy-parent={n.parent}>
          <rect
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            rx={4}
            style={{ fill: 'none', stroke: vvar('boundary', 'stroke'), strokeWidth: 1.5 }}
          />
          <text
            x={n.x + 10}
            y={n.y + 18}
            fontSize={NAME_FS}
            fontWeight={700}
            fontFamily={resolveLabelFont(n.name)}
            style={{ fill: ink }}
          >
            {n.name}
          </text>
          {n.technology && (
            <text x={n.x + 10} y={n.y + 32} fontSize={TECH_FS} fontFamily={resolveLabelFont(n.technology)} style={{ fill: ink }}>
              {`[${n.technology}]`}
            </text>
          )}
          {n.instances !== undefined && n.instances > 1 && (
            <text
              x={n.x + n.width - 10}
              y={n.y + 18}
              textAnchor="end"
              fontSize={TECH_FS}
              fontFamily={resolveLabelFont('x')}
              style={{ fill: ink }}
            >
              {`×${n.instances}`}
            </text>
          )}
        </g>
      ))}
      {containers.map((c) => (
        <g key={c.id} data-bbangto-viz-container-node={c.node}>
          <C4ContainerNode spec={c} />
        </g>
      ))}
      {relationships.map((r) => (
        <Edge
          key={r.id}
          from={r.from}
          to={r.to}
          label={c4RelationshipLabel(r)}
          labelOffset={r.labelOffset}
          labelFontSize={10}
          {...relationEdgeProps(r.kind)}
        />
      ))}
      {legend && <LegendBlock {...legend} />}
    </Canvas>
  );
}

C4DeploymentDiagram.displayName = 'C4DeploymentDiagram';
