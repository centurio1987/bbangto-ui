import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';
import { EdgeLabel } from '../atoms/EdgeLabel';
import { Lane } from '../atoms/Lane';
import { vvar } from '../tokens/contract';

export type ActivityNodeKind = 'start' | 'end' | 'action' | 'decision' | 'merge' | 'fork' | 'join';

export interface ActivityNode {
  id: string;
  kind: ActivityNodeKind;
  label?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface ActivityEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ActivityLane {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  orientation?: 'horizontal' | 'vertical';
}

export interface ActivityDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { nodes: ActivityNode[]; edges: ActivityEdge[]; lanes?: ActivityLane[] };
  children?: ReactNode;
}

/**
 * UML Activity (VT-106, 전용 승격) — start/end·action·decision·fork/join·merge + 레인.
 * Flowchart+BPMN 근사를 대체하는 전용 구현. headless(수동 좌표).
 */
export function ActivityDiagram({
  data,
  viewBox,
  children,
  title = 'Activity diagram',
  ...canvasProps
}: ActivityDiagramProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="activity" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { nodes, edges, lanes = [] } = data;
  const registry = { nodes: nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width ?? 100, height: n.height ?? 44 })) };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="activity" {...canvasProps}>
      {lanes.map((l) => (
        <Lane key={l.id} x={l.x} y={l.y} width={l.width} height={l.height} label={l.label} orientation={l.orientation ?? 'vertical'} />
      ))}
      {edges.map((e, i) => {
        const from = registry.nodes.find((n) => n.id === e.from)!;
        const to = registry.nodes.find((n) => n.id === e.to)!;
        const mx = (from.x + from.width / 2 + to.x + to.width / 2) / 2;
        const my = (from.y + from.height / 2 + to.y + to.height / 2) / 2;
        return (
          <g key={`e-${i}`}>
            <Edge from={e.from} to={e.to} routing="orthogonal" />
            {e.label && <EdgeLabel x={mx} y={my} label={e.label} fontSize={10} />}
          </g>
        );
      })}
      {nodes.map((n) => (
        <g key={n.id} data-bbangto-viz-activity-node data-bbangto-viz-activity-id={n.id} data-bbangto-viz-activity-kind={n.kind}>
          {renderActivityNode(n)}
        </g>
      ))}
    </Canvas>
  );
}

function renderActivityNode(n: ActivityNode): ReactNode {
  const w = n.width ?? 100;
  const h = n.height ?? 44;
  const cx = n.x + w / 2;
  const cy = n.y + h / 2;
  const stroke = vvar('shape', 'stroke');

  switch (n.kind) {
    case 'start':
      return <circle data-viz-part="shape" cx={cx} cy={cy} r={Math.min(w, h) / 2} style={{ fill: stroke }} />;
    case 'end':
      return (
        <>
          <circle data-viz-part="shape" cx={cx} cy={cy} r={Math.min(w, h) / 2} style={{ fill: 'none', stroke, strokeWidth: 2 }} />
          <circle cx={cx} cy={cy} r={Math.min(w, h) / 2 - 5} style={{ fill: stroke }} />
        </>
      );
    case 'decision':
    case 'merge':
      return (
        <>
          <Node id={n.id} x={n.x} y={n.y} width={w} height={h} shape="diamond" />
          {n.label && <NodeLabel x={n.x} y={cy} width={w} title={n.label} fontSize={11} />}
        </>
      );
    case 'fork':
    case 'join':
      return <rect data-viz-part="shape" x={n.x} y={n.y} width={w} height={h} rx={2} style={{ fill: stroke }} />;
    case 'action':
    default:
      return (
        <>
          <Node id={n.id} x={n.x} y={n.y} width={w} height={h} shape="rounded" />
          {n.label && <NodeLabel x={n.x} y={cy} width={w} title={n.label} fontSize={12} />}
        </>
      );
  }
}

ActivityDiagram.displayName = 'ActivityDiagram';
