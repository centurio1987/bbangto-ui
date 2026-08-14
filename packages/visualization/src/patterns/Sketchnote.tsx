import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';
import type { NodeShape } from '../geometry/shapes';

export interface SketchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  shape?: NodeShape;
}

export interface SketchConnector {
  from: string;
  to: string;
}

export interface SketchnoteProps extends Omit<CanvasProps, 'data'> {
  data?: { nodes: SketchNode[]; connectors?: SketchConnector[] };
  children?: ReactNode;
}

const NODE_W = 120;
const NODE_H = 56;

/**
 * Sketchnote (VT-608) — 손그림형 구성(구조만). 지터/손글씨 paint는 F4 스타일 가이드 이연.
 * headless: Node 다형 + curved 커넥터 + 라벨.
 *
 * @vizType VT-608 Sketchnote Composition · F. 인포그래픽/에디토리얼 · dataShape: concept · 구조: relational
 * @useWhen 강연/아이디어를 손그림·화살표 노트로 기록할 때
 * @avoidWhen 정형 개념 관계는 Concept Map(VT-302) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Sketchnote({ data, viewBox, children, title = 'Sketchnote', ...canvasProps }: SketchnoteProps) {
  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="sketchnote" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const registry = {
    nodes: data.nodes.map((n) => ({ id: n.id, x: n.x - NODE_W / 2, y: n.y - NODE_H / 2, width: NODE_W, height: NODE_H })),
  };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-pattern="sketchnote" {...canvasProps}>
      {(data.connectors ?? []).map((c, i) => (
        <Edge key={`c-${i}`} from={c.from} to={c.to} routing="curved" markerEnd="arrow" />
      ))}
      {data.nodes.map((n) => (
        <g key={n.id} data-bbangto-viz-sketch-node data-bbangto-viz-sketch-node-id={n.id}>
          <Node id={n.id} x={n.x - NODE_W / 2} y={n.y - NODE_H / 2} width={NODE_W} height={NODE_H} shape={n.shape ?? 'rounded'} />
          <NodeLabel x={n.x - NODE_W / 2} y={n.y} width={NODE_W} title={n.label} fontSize={13} />
        </g>
      ))}
    </Canvas>
  );
}

Sketchnote.displayName = 'Sketchnote';
