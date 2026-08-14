import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';
import { EdgeLabel } from '../atoms/EdgeLabel';
import { Boundary } from '../atoms/Boundary';
import { ActorGlyph } from '../molecules/ActorGlyph';

export interface UseCaseActor {
  id: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface UseCaseNodeSpec {
  id: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface UseCaseSystemSpec {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type UseCaseLinkKind = 'association' | 'include' | 'extend';

export interface UseCaseLink {
  from: string;
  to: string;
  kind?: UseCaseLinkKind;
}

export interface UseCaseDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { actors: UseCaseActor[]; useCases: UseCaseNodeSpec[]; system?: UseCaseSystemSpec; links: UseCaseLink[] };
  children?: ReactNode;
}

const ACTOR_W = 44;
const ACTOR_H = 64;
const UC_W = 120;
const UC_H = 52;

/** UML Use Case (VT-105) — 액터·유스케이스(ellipse)·시스템 경계·관계. headless(수동 좌표). */
/**
 * @vizType VT-105 UML Use Case Diagram · A. 엔지니어링/소프트웨어 · dataShape: relationship · 구조: relational
 * @useWhen 액터와 시스템 기능(유스케이스) 관계를 정의할 때
 * @useWhen 요구 범위를 합의할 때
 * @avoidWhen 내부 절차 흐름은 Activity(VT-106) 사용
 * @avoidWhen 요구 추적성은 Requirement(VT-118) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function UseCaseDiagram({
  data,
  viewBox,
  children,
  title = 'Use case diagram',
  ...canvasProps
}: UseCaseDiagramProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="use-case" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { actors, useCases, system, links } = data;
  const registry = {
    nodes: [
      ...actors.map((a) => ({ id: a.id, x: a.x, y: a.y, width: a.width ?? ACTOR_W, height: a.height ?? ACTOR_H })),
      ...useCases.map((u) => ({ id: u.id, x: u.x, y: u.y, width: u.width ?? UC_W, height: u.height ?? UC_H })),
    ],
  };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="use-case" {...canvasProps}>
      {system && <Boundary x={system.x} y={system.y} width={system.width} height={system.height} label={system.label} />}
      {links.map((l, i) => {
        const dashed = l.kind === 'include' || l.kind === 'extend';
        const fromN = registry.nodes.find((n) => n.id === l.from)!;
        const toN = registry.nodes.find((n) => n.id === l.to)!;
        const mx = (fromN.x + fromN.width / 2 + toN.x + toN.width / 2) / 2;
        const my = (fromN.y + fromN.height / 2 + toN.y + toN.height / 2) / 2;
        return (
          <g key={`l-${i}`}>
            <Edge
              from={l.from}
              to={l.to}
              routing="straight"
              markerEnd={dashed ? 'arrowOpen' : 'none'}
              strokeDasharray={dashed ? '6 4' : undefined}
            />
            {dashed && <EdgeLabel x={mx} y={my} label={`«${l.kind}»`} fontSize={9} />}
          </g>
        );
      })}
      {useCases.map((u) => (
        <g key={u.id} data-bbangto-viz-usecase data-bbangto-viz-usecase-id={u.id}>
          <Node id={u.id} x={u.x} y={u.y} width={u.width ?? UC_W} height={u.height ?? UC_H} shape="ellipse" />
          <NodeLabel x={u.x} y={u.y + (u.height ?? UC_H) / 2} width={u.width ?? UC_W} title={u.label} fontSize={12} />
        </g>
      ))}
      {actors.map((a) => (
        <ActorGlyph key={a.id} id={a.id} x={a.x} y={a.y} width={a.width ?? ACTOR_W} height={a.height ?? ACTOR_H} label={a.label} />
      ))}
    </Canvas>
  );
}

UseCaseDiagram.displayName = 'UseCaseDiagram';
