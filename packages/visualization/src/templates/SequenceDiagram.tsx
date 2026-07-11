import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { Lifeline } from '../atoms/Lifeline';
import { Boundary } from '../atoms/Boundary';
import { vvar } from '../tokens/contract';

export type SeqMessageKind = 'sync' | 'async' | 'return' | 'create' | 'destroy';
export type SeqFragmentKind = 'loop' | 'alt' | 'opt' | 'ref' | 'par';

export interface SeqParticipantSpec {
  id: string;
  x: number;
  width?: number;
  name: string;
  fill?: string;
  stroke?: string;
}

export interface SeqMessageSpec {
  id: string;
  from: string;
  to: string;
  y: number;
  label?: string;
  kind?: SeqMessageKind;
}

export interface SeqActivationSpec {
  participantId: string;
  startY: number;
  endY: number;
  width?: number;
}

export interface SeqFragmentSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind: SeqFragmentKind;
  guard?: string;
}

export interface SequenceDiagramData {
  participants: SeqParticipantSpec[];
  messages: SeqMessageSpec[];
  activations?: SeqActivationSpec[];
  fragments?: SeqFragmentSpec[];
}

export interface SequenceDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: SequenceDiagramData;
  lifelineHeight?: number;
  lifelineY?: number;
  monoFont?: boolean;
}

const HEAD_HEIGHT = 36;

export function SequenceDiagram({
  children,
  data,
  lifelineHeight = 300,
  lifelineY = 10,
  monoFont = false,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Sequence Diagram',
  ...props
}: SequenceDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const participants = data?.participants ?? [];
  const messages = data?.messages ?? [];
  const activations = data?.activations ?? [];
  const fragments = data?.fragments ?? [];

  const participantMap = new Map(participants.map((p) => [p.id, p]));

  const autoViewBox = viewBox ?? (() => {
    if (!participants.length) return '0 0 600 400';
    const maxX = Math.max(...participants.map((p) => p.x + (p.width ?? 80))) + 20;
    const maxY = lifelineY + HEAD_HEIGHT + lifelineHeight + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const headFill = vvar('canvas', 'bg');

  return (
    <Canvas viewBox={autoViewBox} width={width} height={height} title={title} {...props}>
      {/* Fragments (behind lifelines) */}
      {fragments.map((f) => (
        <React.Fragment key={f.id}>
          <Boundary
            x={f.x}
            y={f.y}
            width={f.width}
            height={f.height}
            label={`${f.kind}${f.guard ? ` [${f.guard}]` : ''}`}
            dashPattern="4 3"
            strokeWidth={1.5}
          />
        </React.Fragment>
      ))}

      {/* Lifelines */}
      {participants.map((p) => {
        const headWidth = p.width ?? 80;
        return (
          <Lifeline
            key={p.id}
            x={p.x + headWidth / 2}
            y={lifelineY}
            height={HEAD_HEIGHT + lifelineHeight}
            label={p.name}
            headWidth={headWidth}
            headHeight={HEAD_HEIGHT}
            headFill={p.fill ?? headFill}
            stroke={p.stroke}
            labelFontFamily={monoFont ? vvar('typography', 'monoFont') : undefined}
          />
        );
      })}

      {/* Activation bars */}
      {activations.map((act, i) => {
        const p = participantMap.get(act.participantId);
        if (!p) return null;
        const cx = p.x + (p.width ?? 80) / 2;
        const barW = act.width ?? 10;
        return (
          <rect
            key={i}
            data-bbangto-viz-activation
            x={cx - barW / 2}
            y={act.startY}
            width={barW}
            height={act.endY - act.startY}
            style={{ fill: vvar('canvas', 'bg'), stroke: vvar('edge', 'stroke'), strokeWidth: 1.5 }}
          />
        );
      })}

      {/* Messages */}
      {messages.map((msg) => {
        const fromP = participantMap.get(msg.from);
        const toP = participantMap.get(msg.to);
        if (!fromP || !toP) return null;

        const fromX = fromP.x + (fromP.width ?? 80) / 2;
        const toX = toP.x + (toP.width ?? 80) / 2;
        const y = msg.y;
        const isReturn = msg.kind === 'return';
        const isAsync = msg.kind === 'async';

        return (
          <React.Fragment key={msg.id}>
            <Edge
              id={msg.id}
              from={{ x: fromX, y }}
              to={{ x: toX, y }}
              routing="straight"
              markerEnd={isAsync ? 'arrowOpen' : 'arrow'}
              strokeDasharray={isReturn ? '5 3' : undefined}
              strokeWidth={1.5}
            />
            {msg.label && (
              <text
                x={(fromX + toX) / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize={10}
                fontFamily={monoFont ? vvar('typography', 'monoFont') : vvar('typography', 'titleFont')}
                style={{ fill: vvar('boundary', 'labelColor') }}
              >
                {msg.label}
              </text>
            )}
          </React.Fragment>
        );
      })}
    </Canvas>
  );
}

SequenceDiagram.displayName = 'SequenceDiagram';
