import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';
import { EdgeLabel } from '../atoms/EdgeLabel';
import { Boundary } from '../atoms/Boundary';
import { vvar } from '../tokens/contract';

export type DFDNodeKind = 'process' | 'store' | 'external';

export interface DFDNode {
  id: string;
  label: string;
  kind: DFDNodeKind;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface DFDFlow {
  from: string;
  to: string;
  label?: string;
}

export interface DFDBoundary {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DataFlowDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { nodes: DFDNode[]; flows: DFDFlow[]; boundaries?: DFDBoundary[] };
  children?: ReactNode;
}

const DEF_W = 100;
const DEF_H = 52;

/**
 * Data-Flow Diagram (VT-126) — 프로세스(원)·데이터스토어(개방형 rect)·외부엔티티(rect) +
 * 데이터 흐름 + 트러스트 경계(dashed). headless(수동 좌표).
 */
export function DataFlowDiagram({
  data,
  viewBox,
  children,
  title = 'Data-flow diagram',
  ...canvasProps
}: DataFlowDiagramProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="data-flow" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { nodes, flows, boundaries = [] } = data;
  const registry = { nodes: nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width ?? DEF_W, height: n.height ?? DEF_H })) };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="data-flow" {...canvasProps}>
      {boundaries.map((b) => (
        <Boundary key={b.id} x={b.x} y={b.y} width={b.width} height={b.height} label={b.label} variant="group" />
      ))}
      {flows.map((f, i) => {
        const from = registry.nodes.find((n) => n.id === f.from)!;
        const to = registry.nodes.find((n) => n.id === f.to)!;
        const mx = (from.x + from.width / 2 + to.x + to.width / 2) / 2;
        const my = (from.y + from.height / 2 + to.y + to.height / 2) / 2;
        return (
          <g key={`f-${i}`}>
            <Edge from={f.from} to={f.to} routing="orthogonal" />
            {f.label && <EdgeLabel x={mx} y={my - 10} label={f.label} fontSize={10} />}
          </g>
        );
      })}
      {nodes.map((n) => {
        const w = n.width ?? DEF_W;
        const h = n.height ?? DEF_H;
        return (
          <g key={n.id} data-bbangto-viz-dfd-node data-bbangto-viz-dfd-node-id={n.id} data-bbangto-viz-dfd-node-kind={n.kind}>
            {n.kind === 'process' && <Node id={n.id} x={n.x} y={n.y} width={w} height={h} shape="ellipse" />}
            {n.kind === 'external' && <Node id={n.id} x={n.x} y={n.y} width={w} height={h} shape="rect" />}
            {n.kind === 'store' && <DataStoreShape id={n.id} x={n.x} y={n.y} width={w} height={h} />}
            <NodeLabel x={n.x} y={n.y + h / 2} width={w} title={n.label} fontSize={12} />
          </g>
        );
      })}
    </Canvas>
  );
}

/** 데이터스토어(Gane-Sarson 개방형): 상·하 라인 + 좌측 라벨 캡. DFD 전용 inline shape. */
function DataStoreShape({ id, x, y, width, height }: { id: string; x: number; y: number; width: number; height: number }): ReactNode {
  const s = vvar('shape', 'stroke');
  return (
    <g>
      {/* Node registry 정합용 히트영역(투명) */}
      <rect id={id} x={x} y={y} width={width} height={height} style={{ fill: vvar('shape', 'fill'), stroke: 'none' }} data-viz-part="shape" />
      <path d={`M ${x} ${y} L ${x + width} ${y}`} data-bbangto-viz-edge style={{ fill: 'none', stroke: s, strokeWidth: 2 }} />
      <path d={`M ${x} ${y + height} L ${x + width} ${y + height}`} data-bbangto-viz-edge style={{ fill: 'none', stroke: s, strokeWidth: 2 }} />
      <path d={`M ${x + 16} ${y} L ${x + 16} ${y + height}`} data-bbangto-viz-edge style={{ fill: 'none', stroke: s, strokeWidth: 1.5 }} />
    </g>
  );
}

DataFlowDiagram.displayName = 'DataFlowDiagram';
