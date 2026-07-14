import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';
import { EdgeLabel } from '../atoms/EdgeLabel';

export interface ConceptNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface ConceptLink {
  from: string;
  to: string;
  /** 관계 라벨(linking phrase) — concept map의 핵심. */
  label: string;
}

export interface ConceptMapProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { nodes: ConceptNode[]; links: ConceptLink[] };
  children?: ReactNode;
}

const DEF_W = 110;
const DEF_H = 46;

/**
 * Concept Map (VT-302, 전용 승격) — 라벨 붙은 연결선의 개념 관계망(비계층).
 * Mindmap+EdgeLabel 근사를 대체(모든 링크에 linking phrase 필수). headless(수동 좌표).
 */
export function ConceptMap({
  data,
  viewBox,
  children,
  title = 'Concept map',
  ...canvasProps
}: ConceptMapProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="concept-map" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { nodes, links } = data;
  const registry = { nodes: nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width ?? DEF_W, height: n.height ?? DEF_H })) };
  const byId = new Map(registry.nodes.map((n) => [n.id, n]));

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="concept-map" {...canvasProps}>
      {links.map((l, i) => {
        const from = byId.get(l.from)!;
        const to = byId.get(l.to)!;
        const mx = (from.x + from.width / 2 + to.x + to.width / 2) / 2;
        const my = (from.y + from.height / 2 + to.y + to.height / 2) / 2;
        return (
          <g key={`l-${i}`} data-bbangto-viz-concept-link>
            <Edge from={l.from} to={l.to} routing="straight" markerEnd="arrowOpen" />
            <EdgeLabel x={mx} y={my} label={l.label} fontSize={10} />
          </g>
        );
      })}
      {nodes.map((n) => (
        <g key={n.id} data-bbangto-viz-concept-node data-bbangto-viz-concept-node-id={n.id}>
          <Node id={n.id} x={n.x} y={n.y} width={n.width ?? DEF_W} height={n.height ?? DEF_H} shape="rounded" />
          <NodeLabel x={n.x} y={n.y + (n.height ?? DEF_H) / 2} width={n.width ?? DEF_W} title={n.label} fontSize={12} />
        </g>
      ))}
    </Canvas>
  );
}

ConceptMap.displayName = 'ConceptMap';
