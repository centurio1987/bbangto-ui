import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import { dvar } from '../tokens/contract';

export interface SequenceParticipantSpec {
  id: string;
  x: number;
  width: number;
  name: string;
  fill?: string;
  stroke?: string;
}

export type SequenceMessageKind = 'sync' | 'async' | 'return' | 'create' | 'destroy';

export interface SequenceMessageSpec {
  id: string;
  from: string;
  to: string;
  y: number;
  label?: string;
  kind?: SequenceMessageKind;
}

export interface UMLSequenceDiagramData {
  participants: SequenceParticipantSpec[];
  messages: SequenceMessageSpec[];
}

export interface UMLSequenceDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: UMLSequenceDiagramData;
  lifelineHeight?: number;
}

const HEAD_HEIGHT = 40;
const HEAD_Y = 10;
const LIFELINE_START_Y = HEAD_Y + HEAD_HEIGHT;

interface LifelineProps {
  participant: SequenceParticipantSpec;
  lifelineHeight: number;
}

function Lifeline({ participant, lifelineHeight }: LifelineProps) {
  const { x, width, name, fill, stroke } = participant;
  const cx = x + width / 2;
  const headFill = fill ?? dvar('palette', 'p2');
  const headStroke = stroke ?? '#111111';

  return (
    <g data-bbangto-diagram-lifeline data-bbangto-diagram-lifeline-id={participant.id}>
      {/* header box */}
      <rect
        x={x}
        y={HEAD_Y}
        width={width}
        height={HEAD_HEIGHT}
        fill={typeof headFill === 'string' ? headFill : '#E8EDF4'}
        stroke={headStroke}
        strokeWidth={1.5}
        rx={4}
      />
      <text
        x={cx}
        y={HEAD_Y + HEAD_HEIGHT / 2 + 5}
        textAnchor="middle"
        fontSize={12}
        fill={headStroke}
      >
        {name}
      </text>
      {/* dashed lifeline */}
      <line
        x1={cx}
        y1={LIFELINE_START_Y}
        x2={cx}
        y2={LIFELINE_START_Y + lifelineHeight}
        stroke={headStroke}
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />
    </g>
  );
}

export function UMLSequenceDiagram({
  children,
  data,
  lifelineHeight = 300,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'UML Sequence Diagram',
  ...props
}: UMLSequenceDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const participants = data?.participants ?? [];
  const messages = data?.messages ?? [];

  const participantMap = new Map(participants.map((p) => [p.id, p]));

  const autoViewBox = viewBox ?? (() => {
    if (!participants.length) return '0 0 600 400';
    const maxX = Math.max(...participants.map((p) => p.x + p.width)) + 20;
    const maxY = LIFELINE_START_Y + lifelineHeight + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <DiagramCanvas viewBox={autoViewBox} width={width} height={height} title={title} {...props}>
      {participants.map((p) => (
        <Lifeline key={p.id} participant={p} lifelineHeight={lifelineHeight} />
      ))}
      {messages.map((msg) => {
        const fromP = participantMap.get(msg.from);
        const toP = participantMap.get(msg.to);
        if (!fromP || !toP) return null;

        const fromX = fromP.x + fromP.width / 2;
        const toX = toP.x + toP.width / 2;
        const y = msg.y;

        const isReturn = msg.kind === 'return';
        const dasharray = isReturn ? '5 3' : undefined;

        return (
          <React.Fragment key={msg.id}>
            <Edge
              id={msg.id}
              from={{ x: fromX, y }}
              to={{ x: toX, y }}
              routing="straight"
              markerEnd="arrow"
              strokeDasharray={dasharray}
              strokeWidth={1.5}
            />
            {msg.label && (
              <text
                x={(fromX + toX) / 2}
                y={y - 4}
                textAnchor="middle"
                fontSize={10}
                fill="#333333"
              >
                {msg.label}
              </text>
            )}
          </React.Fragment>
        );
      })}
    </DiagramCanvas>
  );
}

UMLSequenceDiagram.displayName = 'UMLSequenceDiagram';
