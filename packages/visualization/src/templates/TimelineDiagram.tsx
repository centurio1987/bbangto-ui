import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

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

export interface TimelineDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: TimelineDiagramData;
}

/**
 * @vizType VT-401 Timeline · D. 시간축 · dataShape: temporal, change-over-time · 구조: sequential
 * @useWhen 사건을 시간순으로 나열할 때
 * @useWhen 연혁/전개를 표현할 때
 * @avoidWhen 기간 막대 일정은 Gantt(VT-403) 사용
 * @avoidWhen 마일스톤 로드맵은 Timeline Roadmap(VT-402) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
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
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
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

  const stroke = vvar('edge', 'stroke');
  const textColor = vvar('boundary', 'labelColor');

  return (
    <Canvas
      data={{ nodes: events.map((e) => ({ id: e.id, x: e.x - e.width / 2, y: e.y, width: e.width, height: e.height })) }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {/* Axis */}
      <line
        data-bbangto-viz-timeline-axis
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
                fontFamily={resolveLabelFont(e.date)}
                fontSize={9}
                fill={textColor}
              >
                {e.date}
              </text>
            )}
          </React.Fragment>
        );
      })}
    </Canvas>
  );
}

TimelineDiagram.displayName = 'TimelineDiagram';
