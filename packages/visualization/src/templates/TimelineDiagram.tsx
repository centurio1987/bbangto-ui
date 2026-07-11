import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { dvar } from '../tokens/contract';

export interface TimelineEventSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  date?: string;
}

export interface TimelineDiagramData {
  events: TimelineEventSpec[];
  axisY: number;
  axisX0?: number;
  axisX1?: number;
}

export interface TimelineDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: TimelineDiagramData;
}

export function TimelineDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Timeline',
  ...props
}: TimelineDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const events = data?.events ?? [];
  const axisY = data?.axisY ?? 100;

  const axisX0 = data?.axisX0 ?? (events.length ? Math.min(...events.map((e) => e.x - e.width / 2)) - 20 : 0);
  const axisX1 = data?.axisX1 ?? (events.length ? Math.max(...events.map((e) => e.x + e.width / 2)) + 20 : 400);

  const autoViewBox = viewBox ?? (() => {
    const minX = axisX0 - 10;
    const minY = events.length ? Math.min(...events.map((e) => e.y)) - 10 : 0;
    const maxX = axisX1 + 10;
    const maxY = axisY + 40;
    return `0 ${minY > 0 ? 0 : minY} ${maxX - minX} ${maxY - Math.min(0, minY)}`;
  })();

  const stroke = dvar('edge', 'stroke');
  const monoFont = dvar('typography', 'monoFont');
  const textColor = dvar('boundary', 'labelColor');

  return (
    <DiagramCanvas
      data={{ nodes: events.map((e) => ({ id: e.id, x: e.x - e.width / 2, y: e.y, width: e.width, height: e.height })) }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {/* Axis */}
      <line
        data-bbangto-diagram-timeline-axis
        x1={axisX0}
        y1={axisY}
        x2={axisX1}
        y2={axisY}
        style={{ stroke, strokeWidth: 2.5, strokeLinecap: 'round' }}
      />
      {/* Arrow at end of axis */}
      <polygon
        points={`${axisX1},${axisY} ${axisX1 - 8},${axisY - 4} ${axisX1 - 8},${axisY + 4}`}
        style={{ fill: stroke }}
      />

      {events.map((e) => {
        const boxX = e.x - e.width / 2;
        const boxBottom = e.y + e.height;
        return (
          <React.Fragment key={e.id}>
            {/* Event node */}
            <Node
              id={e.id}
              x={boxX}
              y={e.y}
              width={e.width}
              height={e.height}
              shape="rounded"
              fill="#FFFFFF"
              stroke="#111111"
              strokeWidth={2}
            />
            <NodeLabel x={boxX} y={e.y + e.height / 2} width={e.width} title={e.label} fontSize={11} />

            {/* Connector from node bottom to axis */}
            <line
              x1={e.x}
              y1={boxBottom}
              x2={e.x}
              y2={axisY}
              style={{ stroke, strokeWidth: 1.5, strokeDasharray: '3 2' }}
            />

            {/* Dot on axis */}
            <circle cx={e.x} cy={axisY} r={4} style={{ fill: stroke }} />

            {/* Date label below axis */}
            {e.date && (
              <text
                x={e.x}
                y={axisY + 16}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily={monoFont}
                fontSize={9}
                fill={textColor}
              >
                {e.date}
              </text>
            )}
          </React.Fragment>
        );
      })}
    </DiagramCanvas>
  );
}

TimelineDiagram.displayName = 'TimelineDiagram';
