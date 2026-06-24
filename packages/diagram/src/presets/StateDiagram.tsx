import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import { StateNode } from '../nodes/StateNode';
import type { StateVariant } from '../nodes/StateNode';

export type { StateVariant };

const PSEUDO_SIZE = 28; // 2 × PSEUDO_RADIUS=14

export interface StateSpec {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  title?: string;
  variant?: StateVariant;
  fill?: string;
  stroke?: string;
}

export interface TransitionSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface StateDiagramData {
  states: StateSpec[];
  transitions?: TransitionSpec[];
}

export interface StateDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: StateDiagramData;
}

function stateHeight(s: StateSpec): number {
  if (s.variant === 'start' || s.variant === 'end') return PSEUDO_SIZE;
  return s.height ?? 50;
}

function stateWidth(s: StateSpec): number {
  if (s.variant === 'start' || s.variant === 'end') return PSEUDO_SIZE;
  return s.width ?? 120;
}

export function StateDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'State Diagram',
  ...props
}: StateDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const states = data?.states ?? [];
  const transitions = data?.transitions ?? [];

  const allNodes = states.map((s) => ({
    id: s.id,
    x: s.x,
    y: s.y,
    width: stateWidth(s),
    height: stateHeight(s),
  }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 400 400';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
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
      {states.map((s) => (
        <StateNode
          key={s.id}
          id={s.id}
          x={s.x}
          y={s.y}
          width={stateWidth(s)}
          height={stateHeight(s)}
          title={s.title}
          variant={s.variant ?? 'normal'}
          fill={s.fill}
          stroke={s.stroke}
        />
      ))}
      {transitions.map((t) => (
        <Edge key={t.id} from={t.from} to={t.to} markerEnd="arrow" strokeWidth={1.5} />
      ))}
    </DiagramCanvas>
  );
}

StateDiagram.displayName = 'StateDiagram';
