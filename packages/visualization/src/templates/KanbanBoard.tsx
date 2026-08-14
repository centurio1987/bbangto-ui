import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
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

export interface KanbanBoardProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: {
    columns: KanbanColumnSpec[];
    cards: KanbanCardSpec[];
  };
}

/**
 * @vizType VT-204 Kanban Board · B. 프로세스·플로우 · dataShape: process · 구조: sequential
 * @useWhen 상태 컬럼(To Do/Doing/Done)으로 작업 흐름을 관리할 때
 * @avoidWhen 시간 기반 일정은 Gantt(VT-403) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
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
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
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
    <Canvas
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
    </Canvas>
  );
}

KanbanBoard.displayName = 'KanbanBoard';
