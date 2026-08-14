import React, { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { Lane } from '../atoms/Lane';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

export type BPMNCollabEventKind = 'start' | 'end' | 'intermediate';
export type BPMNCollabGatewayKind = 'exclusive' | 'parallel' | 'inclusive';

export interface BPMNPoolSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}
export interface BPMNCollabEventSpec {
  id: string;
  x: number;
  y: number;
  r?: number;
  kind?: BPMNCollabEventKind;
  label?: string;
}
export interface BPMNCollabTaskSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  fill?: string;
}
export interface BPMNCollabGatewaySpec {
  id: string;
  x: number;
  y: number;
  size?: number;
  kind?: BPMNCollabGatewayKind;
  label?: string;
}
export interface BPMNCollabFlowSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface BPMNCollaborationDiagramData {
  pools: BPMNPoolSpec[];
  events?: BPMNCollabEventSpec[];
  tasks?: BPMNCollabTaskSpec[];
  gateways?: BPMNCollabGatewaySpec[];
  sequenceFlows?: BPMNCollabFlowSpec[];
  messageFlows?: BPMNCollabFlowSpec[];
}

export interface BPMNCollaborationDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: BPMNCollaborationDiagramData;
}

const EVENT_R = 15;

function CollabEvent({ spec }: { spec: BPMNCollabEventSpec }) {
  const r = spec.r ?? EVENT_R;
  const stroke = vvar('edge', 'stroke');
  const strokeW = spec.kind === 'end' ? 3 : 1.5;
  return (
    <g data-bbangto-viz-bpmn-event data-bbangto-viz-bpmn-event-kind={spec.kind ?? 'start'}>
      <circle data-viz-part="shape" cx={spec.x} cy={spec.y} r={r} style={{ fill: '#FFFFFF', stroke, strokeWidth: strokeW }} />
      {spec.label && (
        <text x={spec.x} y={spec.y + r + 11} textAnchor="middle" fontSize={9} style={{ fill: stroke }}>
          {spec.label}
        </text>
      )}
    </g>
  );
}

function CollabGateway({ spec }: { spec: BPMNCollabGatewaySpec }) {
  const size = spec.size ?? 34;
  const half = size / 2;
  const { x: cx, y: cy } = spec;
  const stroke = vvar('edge', 'stroke');
  const d = `M ${cx} ${cy - half} L ${cx + half} ${cy} L ${cx} ${cy + half} L ${cx - half} ${cy} Z`;
  const symbol =
    spec.kind === 'parallel'
      ? `M ${cx} ${cy - 7} L ${cx} ${cy + 7} M ${cx - 7} ${cy} L ${cx + 7} ${cy}`
      : `M ${cx - 6} ${cy - 6} L ${cx + 6} ${cy + 6} M ${cx + 6} ${cy - 6} L ${cx - 6} ${cy + 6}`;
  return (
    <g data-bbangto-viz-bpmn-gateway data-bbangto-viz-bpmn-gateway-kind={spec.kind ?? 'exclusive'}>
      <path data-viz-part="shape" d={d} style={{ fill: vvar('palette', 'p4'), stroke, strokeWidth: 1.5 }} />
      <path d={symbol} style={{ stroke, strokeWidth: 2, fill: 'none' }} />
    </g>
  );
}

/** BPMN Collaboration (VT-123) — 다중 pool + sequence flow(solid) + message flow(dashed). headless. */
export function BPMNCollaborationDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'BPMN collaboration',
  ...props
}: BPMNCollaborationDiagramProps) {
  if (children != null || !data) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} data-bbangto-viz-chart="bpmn-collaboration" {...props}>
        {children}
      </Canvas>
    );
  }

  const pools = data.pools;
  const events = data.events ?? [];
  const tasks = data.tasks ?? [];
  const gateways = data.gateways ?? [];
  const sequenceFlows = data.sequenceFlows ?? [];
  const messageFlows = data.messageFlows ?? [];

  const registry = [
    ...events.map((e) => ({ id: e.id, x: e.x - (e.r ?? EVENT_R), y: e.y - (e.r ?? EVENT_R), width: (e.r ?? EVENT_R) * 2, height: (e.r ?? EVENT_R) * 2 })),
    ...tasks.map((t) => ({ id: t.id, x: t.x, y: t.y, width: t.width, height: t.height })),
    ...gateways.map((g) => { const h = (g.size ?? 34) / 2; return { id: g.id, x: g.x - h, y: g.y - h, width: h * 2, height: h * 2 }; }),
  ];

  const autoViewBox = viewBox ?? (() => {
    const all = [...pools, ...registry];
    if (!all.length) return '0 0 600 300';
    const maxX = Math.max(...all.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...all.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas
      data={{ nodes: registry }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      data-bbangto-viz-chart="bpmn-collaboration"
      {...props}
    >
      {pools.map((p) => (
        <g key={p.id} data-bbangto-viz-pool data-bbangto-viz-pool-id={p.id}>
          <Lane x={p.x} y={p.y} width={p.width} height={p.height} label={p.label} orientation="horizontal" headerWidth={40} />
        </g>
      ))}

      {tasks.map((t) => (
        <React.Fragment key={t.id}>
          <Node id={t.id} x={t.x} y={t.y} width={t.width} height={t.height} shape="rounded" fill={t.fill ?? '#FFFFFF'} strokeWidth={1.5} data-bbangto-viz-bpmn-task />
          <NodeLabel x={t.x} y={t.y + t.height / 2} width={t.width} title={t.label} fontSize={10} />
        </React.Fragment>
      ))}

      {events.map((e) => <CollabEvent key={e.id} spec={e} />)}
      {gateways.map((g) => <CollabGateway key={g.id} spec={g} />)}

      {/* Sequence flows: solid, pool 내부 */}
      {sequenceFlows.map((f) => (
        <Edge key={f.id} id={f.id} from={f.from} to={f.to} markerEnd="arrow" strokeWidth={1.5} />
      ))}

      {/* Message flows: dashed, pool 간(출발 open-circle · 도착 open-arrow) */}
      {messageFlows.map((f) => (
        <g key={f.id} data-bbangto-viz-message-flow data-bbangto-viz-message-flow-id={f.id}>
          <Edge from={f.from} to={f.to} markerStart="circle" markerEnd="triangleOpen" strokeDasharray="5 4" strokeWidth={1.5} />
        </g>
      ))}
      {/* Message flow 라벨(엣지 중앙 근사) */}
      {messageFlows.map((f) => {
        const src = registry.find((n) => n.id === f.from);
        const dst = registry.find((n) => n.id === f.to);
        if (!src || !dst || !f.label) return null;
        const mx = (src.x + src.width / 2 + dst.x + dst.width / 2) / 2;
        const my = (src.y + src.height / 2 + dst.y + dst.height / 2) / 2;
        return (
          <text
            key={`mlbl-${f.id}`}
            data-bbangto-viz-message-flow-stereotype
            x={mx}
            y={my}
            textAnchor="middle"
            fontSize={9}
            fontFamily={resolveLabelFont(f.label)}
            style={{ fill: vvar('boundary', 'labelColor') }}
          >
            {f.label}
          </text>
        );
      })}
    </Canvas>
  );
}

BPMNCollaborationDiagram.displayName = 'BPMNCollaborationDiagram';
