import React, { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  /** 허브(강조 — 크게). */
  hub?: boolean;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface NetworkGraphProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { nodes: GraphNode[]; edges?: GraphEdge[] };
  children?: ReactNode;
}

const R = 22;
const HUB_R = 34;

/** Network graph (VT-305) — 노드-엣지 관계망(비계층). headless(수동 좌표, 허브 강조). */
/**
 * @vizType VT-305 Network Graph · C. 계층·관계 · dataShape: network · 구조: relational
 * @useWhen 비계층 노드·엣지 관계망을 분석할 때
 * @useWhen 허브 노드를 강조할 때
 * @avoidWhen 계층 트리는 Hierarchy(VT-303) 사용
 * @avoidWhen 라벨 개념 관계는 Concept Map(VT-302) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function NetworkGraph({
  data,
  viewBox,
  children,
  title = 'Network graph',
  ...canvasProps
}: NetworkGraphProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="network" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const registry = {
    nodes: data.nodes.map((n) => {
      const r = n.hub ? HUB_R : R;
      return { id: n.id, x: n.x - r, y: n.y - r, width: r * 2, height: r * 2 };
    }),
  };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="network" {...canvasProps}>
      {(data.edges ?? []).map((e, i) => (
        <Edge key={`e-${i}`} from={e.from} to={e.to} routing="straight" markerEnd="none" />
      ))}
      {data.nodes.map((n) => {
        const r = n.hub ? HUB_R : R;
        return (
          <React.Fragment key={n.id}>
            <Node id={n.id} x={n.x - r} y={n.y - r} width={r * 2} height={r * 2} shape="circle" />
            <NodeLabel x={n.x - r} y={n.y} width={r * 2} title={n.label} fontSize={n.hub ? 13 : 11} />
          </React.Fragment>
        );
      })}
    </Canvas>
  );
}

NetworkGraph.displayName = 'NetworkGraph';
