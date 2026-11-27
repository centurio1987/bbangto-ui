import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge, type EdgeLabelOffset } from '../atoms/Edge';
import { LegendBlock, relationLegendBox, type RelationLegendOption } from '../molecules/LegendBlock';
import { relationEdgeProps, usedRelationKinds, type RelationKind } from '../atoms/relationKind';
import { NodeLabel } from '../atoms/NodeLabel';
import { Boundary } from '../atoms/Boundary';
import type { EdgeRouting } from '../geometry/routing';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { labelTextWidth } from '../atoms/EdgeLabel';
import { estimateWidth, wrapText } from '../geometry/text';
import { fitNestedBoxes, type NestBox, type NestRoom } from '../geometry/nesting';

export interface UMLDeploymentNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  fill?: string;
  stroke?: string;
  /**
   * 이 노드를 품는 노드 id(VPC › 서브넷 › EC2 › 컨테이너 같은 배치 관계). 좌표는 데이터가 준 그대로이고 자동 배치는
   * 하지 않는다 — 템플릿은 부모를 자식보다 먼저 그리고, 자식이 있는 노드의 이름을 상자 위쪽으로 올린다(KAN-082).
   */
  parent?: string;
  /** UML 노드 종류 — 물리 장치(«device») · 실행 환경(«executionEnvironment»). */
  kind?: UMLDeploymentNodeKind;
  /** 종류 대신 적을 스테레오타입 글(«container» 등). 적으면 kind 보다 앞선다. */
  stereotype?: string;
  /** 이 노드에 배치된 artifact 이름(api.jar 등). 노드 아래쪽에 문서 모양 칩으로 쌓는다. */
  artifacts?: string[];
}

/** UML 배포 노드 종류 */
export type UMLDeploymentNodeKind = 'device' | 'executionEnvironment';

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

/** artifact 칩 한 줄 높이 */
const ART_H = 20;
/** 이름 글자 크기 · 줄 높이(NodeLabel 은 글자 크기의 1.25배로 줄을 쌓는다) */
const NAME_FS = 12;
const NAME_LH = NAME_FS * 1.25;
/** 큐브 옆면 · 윗면 깊이의 최대값(cubeDepth) — 글자와 자식은 앞면 안에 둔다 */
const CUBE_D = 14;

/** 글자 폭 — 한글을 1em 로 보는 어림과 NodeLabel 이 줄을 나눌 때 쓰는 어림 중 넓은 쪽 */
const textW = (s: string, fs: number) => Math.max(labelTextWidth(s, fs), estimateWidth(s, fs));
const chipW = (a: string) => labelTextWidth(a, 10) + 22;
/** 이름이 폭 안에서 몇 줄로 나뉘는가(NodeLabel 과 같은 규칙 — 줄 수 제한 없이) */
const nameLines = (name: string, width: number) => wrapText(name, width - 8, NAME_FS).length;

/**
 * 노드 하나가 비워 둘 여백(KAN-082.3 검토 2번). 좌표는 데이터 그대로이고, 상자만 이 여백을 지키게 커진다.
 * 자식이 있으면 위쪽에 스테레오타입 · 이름 띠, 아래쪽에 artifact 칩 띠를 남기고, 오른쪽은 큐브 옆면 깊이만큼 더 띄운다.
 * 자식이 없으면 스테레오타입 · 이름 · 칩이 앞면 안에 들어갈 높이를 둔다.
 */
function umlRoom(n: UMLDeploymentNodeSpec, hasKids: boolean): NestRoom {
  const stereo = n.stereotype ?? n.kind;
  const arts = n.artifacts ?? [];
  const nl = nameLines(n.name, n.width);
  const longestWord = Math.max(0, ...n.name.split(/\s+/).map((w) => textW(w, NAME_FS)));
  const minWidth = Math.max(stereo ? textW(`«${stereo}»`, 9) : 0, longestWord, ...arts.map((a) => chipW(a) + 12)) + 8 + CUBE_D;
  if (hasKids) {
    return {
      top: (stereo ? 32.5 : 14.5) + nl * NAME_LH + 6,
      left: 6,
      right: CUBE_D + 6,
      bottom: arts.length ? 14 + arts.length * ART_H : 6,
      minWidth,
    };
  }
  const topNeed = stereo ? 47 + nl * NAME_LH : 20 + nl * NAME_LH;
  const bottomNeed = arts.length ? 40 + nl * NAME_LH + 2 * arts.length * ART_H : 20 + nl * NAME_LH;
  return { minWidth, minHeight: Math.max(topNeed, bottomNeed) };
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

  // 부모를 자식보다 먼저 그린다 — 깊이(부모를 몇 번 거슬러 오르는가) 순, 같은 깊이는 데이터 순서
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const depth = (n: UMLDeploymentNodeSpec): number => {
    let d = 0;
    for (let p = n.parent, seen = 0; p && byId.has(p) && seen < nodes.length; p = byId.get(p)!.parent, seen++) d++;
    return d;
  };
  const ordered = nodes.map((n, i) => ({ n, i, d: depth(n) })).sort((a, b) => a.d - b.d || a.i - b.i).map((x) => x.n);
  const parents = new Set(nodes.map((n) => n.parent).filter((p): p is string => !!p));

  // 상자를 맞춘다 — 자식을 담고 글자 · 칩 띠를 비워 둔다. 좌표는 데이터 그대로이고, 데이터가 이미 맞으면 상자도 그대로다(KAN-082.3 검토 2번)
  const fitted = fitNestedBoxes(nodes, (it, hasKids) => umlRoom(byId.get(it.id)!, hasKids));
  const boxOf = (n: UMLDeploymentNodeSpec): NestBox => fitted.get(n.id) ?? n;
  const allNodes = nodes.map((n) => ({ id: n.id, ...boxOf(n) }));

  const legend = relationLegendBox([...environments, ...allNodes], usedRelationKinds(edges), data?.legend);

  const autoViewBox = viewBox ?? (() => {
    const all = [...environments, ...allNodes];
    if (!all.length) return '0 0 600 400';
    // 상자가 위 · 왼쪽으로 커져 0 밖으로 나가면 그만큼 보이는 곳을 넓힌다(그 밖에는 예전처럼 0 에서 시작)
    const minX = Math.min(0, ...all.map((n) => (n.x < 0 ? n.x - 20 : 0)));
    const minY = Math.min(0, ...all.map((n) => (n.y < 0 ? n.y - 20 : 0)));
    const maxX = Math.max(...all.map((n) => n.x + n.width), legend ? legend.x + legend.width : 0) + 20;
    const maxY = Math.max(...all.map((n) => n.y + n.height), legend ? legend.y + legend.height : 0) + 20;
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
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
      {ordered.map((n) => {
        const hasKids = parents.has(n.id);
        const stereo = n.stereotype ?? n.kind;
        const b = boxOf(n);
        // 면 위 글자는 그 면의 글자색 — fill 을 직접 주면 그 면은 계산할 수 없어 연결선 색이다(KAN-075 규칙)
        const ink = n.fill === undefined ? vvar('on', 'shape', 'fill') : vvar('edge', 'stroke');
        // 이름이 폭 안에서 나뉘는 줄 수 — 줄을 자르지 않고 다 그린다(줄이 늘면 상자가 그만큼 커져 있다)
        const nl = nameLines(n.name, b.width);
        // 자식이 있으면 이름을 위쪽에, 없으면 예전처럼 가운데에. 위쪽 스테레오타입은 큐브 윗면과 앞면 사이 선(깊이 14)에
        // 걸치지 않게 앞면 안에 둔다(KAN-082.3 검토 2번 — 예전에는 y+16 이라 선 위에 글자가 걸쳤다)
        const nameY = hasKids ? b.y + (stereo ? 32.5 : 14.5) + (nl * NAME_LH) / 2 : b.y + b.height / 2 + 6;
        const stereoY = hasKids ? b.y + 23 : nameY - (nl * NAME_LH) / 2 - 8.5;
        const arts = n.artifacts ?? [];
        return (
          <g
            key={n.id}
            data-bbangto-viz-deploy-node={n.id}
            data-bbangto-viz-deploy-parent={n.parent}
            data-bbangto-viz-box={`${b.x} ${b.y} ${b.width} ${b.height}`}
          >
            <Node
              id={n.id}
              x={b.x}
              y={b.y}
              width={b.width}
              height={b.height}
              shape="cube"
              fill={n.fill}
              stroke={n.stroke}
              strokeWidth={2}
            />
            {stereo && (
              <text
                data-bbangto-viz-deploy-stereotype
                x={b.x + b.width / 2}
                y={stereoY}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={9}
                fontFamily={resolveLabelFont(stereo)}
                style={{ fill: ink }}
              >
                {`«${stereo}»`}
              </text>
            )}
            <NodeLabel x={b.x} y={nameY} width={b.width} title={n.name} fontSize={NAME_FS} maxLines={Math.max(3, nl)} />
            {arts.map((a, i) => {
              const w = chipW(a);
              const ay = b.y + b.height - 10 - (arts.length - i) * ART_H;
              const ax = b.x + 10;
              return (
                <g key={a} data-bbangto-viz-artifact={a} data-bbangto-viz-box={`${ax} ${ay} ${w} ${ART_H - 4}`}>
                  <path
                    d={`M ${ax} ${ay} L ${ax + w - 6} ${ay} L ${ax + w} ${ay + 6} L ${ax + w} ${ay + ART_H - 4} L ${ax} ${ay + ART_H - 4} Z`}
                    style={{ fill: vvar('canvas', 'bg'), stroke: vvar('shape', 'stroke'), strokeWidth: 1 }}
                  />
                  <text
                    x={ax + 6}
                    y={ay + (ART_H - 4) / 2}
                    dominantBaseline="central"
                    fontSize={10}
                    fontFamily={resolveLabelFont(a)}
                    style={{ fill: vvar('on', 'canvas', 'bg') }}
                  >
                    {a}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      {edges.map((e) => (
        <Edge key={e.id} from={e.from} to={e.to} routing={e.routing ?? 'orthogonal'} markerEnd="arrow" label={e.label} labelOffset={e.labelOffset} {...relationEdgeProps(e.kind)} />
      ))}
      {legend && <LegendBlock {...legend} />}
    </Canvas>
  );
}

UMLDeploymentDiagram.displayName = 'UMLDeploymentDiagram';
