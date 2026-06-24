import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Lane } from '../atoms/Lane';
import { NodeLabel } from '../atoms/NodeLabel';

export interface KanbanColumnSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  headerHeight?: number;
  fill?: string;
}

export interface KanbanCardSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  fill?: string;
  stroke?: string;
}

export interface KanbanBoardProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: {
    columns: KanbanColumnSpec[];
    cards: KanbanCardSpec[];
  };
}

export function KanbanBoard({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Kanban Board',
  ...props
}: KanbanBoardProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const columns = data?.columns ?? [];
  const cards = data?.cards ?? [];

  const autoViewBox = viewBox ?? (() => {
    if (!columns.length) return '0 0 600 400';
    const maxX = Math.max(...columns.map((c) => c.x + c.width)) + 10;
    const maxY = Math.max(...columns.map((c) => c.y + c.height)) + 10;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <DiagramCanvas
      data={{ nodes: cards }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {/* Column backgrounds using Lane */}
      {columns.map((col) => (
        <Lane
          key={col.id}
          x={col.x}
          y={col.y}
          width={col.width}
          height={col.height}
          label={col.title}
          orientation="vertical"
          headerWidth={col.headerHeight ?? 32}
          fill={col.fill ?? 'rgba(0,0,0,0.02)'}
        />
      ))}
      {/* Cards */}
      {cards.map((card) => (
        <React.Fragment key={card.id}>
          <Node
            id={card.id}
            x={card.x}
            y={card.y}
            width={card.width}
            height={card.height}
            shape="rounded"
            fill={card.fill ?? '#FFFFFF'}
            stroke={card.stroke ?? '#111111'}
            strokeWidth={1.5}
          />
          <NodeLabel
            x={card.x}
            y={card.y + card.height / 2}
            width={card.width}
            title={card.label}
            fontSize={11}
          />
        </React.Fragment>
      ))}
    </DiagramCanvas>
  );
}

KanbanBoard.displayName = 'KanbanBoard';
