import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { Lane } from '../atoms/Lane';
import { dvar } from '../tokens/contract';

export type BPMNEventKind = 'start' | 'end' | 'intermediate';
export type BPMNGatewayKind = 'exclusive' | 'parallel' | 'inclusive' | 'event';

export interface BPMNEventSpec {
  id: string;
  x: number;
  y: number;
  r?: number;
  kind?: BPMNEventKind;
  label?: string;
}

export interface BPMNTaskSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  fill?: string;
}

export interface BPMNGatewaySpec {
  id: string;
  x: number;
  y: number;
  size?: number;
  kind?: BPMNGatewayKind;
  label?: string;
}

export interface BPMNLaneSpec {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface BPMNFlowSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface BPMNDiagramData {
  lanes?: BPMNLaneSpec[];
  events?: BPMNEventSpec[];
  tasks?: BPMNTaskSpec[];
  gateways?: BPMNGatewaySpec[];
  flows?: BPMNFlowSpec[];
}

export interface BPMNDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: BPMNDiagramData;
}

interface BPMNEventRendProps {
  spec: BPMNEventSpec;
}

function BPMNEvent({ spec }: BPMNEventRendProps) {
  const r = spec.r ?? 16;
  const { x: cx, y: cy } = spec;
  const stroke = dvar('edge', 'stroke');
  const strokeW = spec.kind === 'end' ? 3 : 1.5;
  const fill = spec.kind === 'end' ? '#FFCCBC' : '#FFFFFF';

  return (
    <g data-bbangto-diagram-bpmn-event data-bbangto-diagram-bpmn-event-kind={spec.kind ?? 'start'}>
      <circle cx={cx} cy={cy} r={r} style={{ fill, stroke, strokeWidth: strokeW }} />
      {spec.kind === 'intermediate' && (
        <circle cx={cx} cy={cy} r={r - 3} style={{ fill: 'none', stroke, strokeWidth: 1.5 }} />
      )}
      {spec.label && (
        <text x={cx} y={cy + r + 12} textAnchor="middle" fontSize={9} fill={stroke}>
          {spec.label}
        </text>
      )}
    </g>
  );
}

interface BPMNGatewayRendProps {
  spec: BPMNGatewaySpec;
}

function BPMNGateway({ spec }: BPMNGatewayRendProps) {
  const size = spec.size ?? 36;
  const half = size / 2;
  const { x: cx, y: cy } = spec;
  const stroke = dvar('edge', 'stroke');

  const d = `M ${cx} ${cy - half} L ${cx + half} ${cy} L ${cx} ${cy + half} L ${cx - half} ${cy} Z`;

  let symbol: React.ReactNode = null;
  if (spec.kind === 'exclusive') {
    symbol = (
      <path
        d={`M ${cx - 7} ${cy - 7} L ${cx + 7} ${cy + 7} M ${cx + 7} ${cy - 7} L ${cx - 7} ${cy + 7}`}
        style={{ stroke, strokeWidth: 2, fill: 'none' }}
      />
    );
  } else if (spec.kind === 'parallel') {
    symbol = (
      <path
        d={`M ${cx} ${cy - 8} L ${cx} ${cy + 8} M ${cx - 8} ${cy} L ${cx + 8} ${cy}`}
        style={{ stroke, strokeWidth: 2, fill: 'none' }}
      />
    );
  }

  return (
    <g data-bbangto-diagram-bpmn-gateway data-bbangto-diagram-bpmn-gateway-kind={spec.kind ?? 'exclusive'}>
      <path d={d} style={{ fill: '#FFF9C4', stroke, strokeWidth: 1.5 }} />
      {symbol}
      {spec.label && (
        <text x={cx} y={cy + half + 14} textAnchor="middle" fontSize={9} fill={stroke}>
          {spec.label}
        </text>
      )}
    </g>
  );
}

export function BPMNDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'BPMN Diagram',
  ...props
}: BPMNDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const lanes    = data?.lanes    ?? [];
  const events   = data?.events   ?? [];
  const tasks    = data?.tasks    ?? [];
  const gateways = data?.gateways ?? [];
  const flows    = data?.flows    ?? [];

  const eventR = 16;
  const allNodes = [
    ...events.map((e) => ({
      id: e.id, x: e.x - eventR, y: e.y - eventR,
      width: eventR * 2, height: eventR * 2,
    })),
    ...tasks.map((t) => ({ id: t.id, x: t.x, y: t.y, width: t.width, height: t.height })),
    ...gateways.map((g) => {
      const half = (g.size ?? 36) / 2;
      return { id: g.id, x: g.x - half, y: g.y - half, width: half * 2, height: half * 2 };
    }),
  ];

  const autoViewBox = viewBox ?? (() => {
    const all = [...lanes, ...allNodes];
    if (!all.length) return '0 0 600 300';
    const maxX = Math.max(...all.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...all.map((n) => n.y + n.height)) + 30;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <DiagramCanvas
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {/* Lanes (behind everything) */}
      {lanes.map((l, i) => (
        <Lane
          key={i}
          x={l.x}
          y={l.y}
          width={l.width}
          height={l.height}
          label={l.label}
          orientation="horizontal"
          headerWidth={40}
        />
      ))}

      {/* Tasks */}
      {tasks.map((t) => (
        <React.Fragment key={t.id}>
          <Node
            id={t.id}
            x={t.x}
            y={t.y}
            width={t.width}
            height={t.height}
            shape="rounded"
            fill={t.fill ?? '#FFFFFF'}
            strokeWidth={1.5}
            data-bbangto-diagram-bpmn-task
          />
          <NodeLabel x={t.x} y={t.y + t.height / 2} width={t.width} title={t.label} fontSize={10} />
        </React.Fragment>
      ))}

      {/* Events */}
      {events.map((e) => (
        <BPMNEvent key={e.id} spec={e} />
      ))}

      {/* Gateways */}
      {gateways.map((g) => (
        <BPMNGateway key={g.id} spec={g} />
      ))}

      {/* Sequence flows */}
      {flows.map((f) => (
        <Edge key={f.id} from={f.from} to={f.to} markerEnd="arrow" strokeWidth={1.5} />
      ))}
    </DiagramCanvas>
  );
}

BPMNDiagram.displayName = 'BPMNDiagram';
