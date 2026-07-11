import React, { type ReactNode } from 'react';
import { dvar } from '../tokens/contract';

export interface EntityAttribute {
  name: string;
  type: string;
  key?: string;
}

export interface EntityTableProps {
  id?: string;
  x: number;
  y: number;
  width: number;
  name: string;
  attributes?: EntityAttribute[];
  fill?: string;
  headerFill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  children?: ReactNode;
}

const HEADER_H = 28;
const ROW_H = 22;
const PAD_X = 8;

export const EntityTable = React.forwardRef<SVGGElement, EntityTableProps>(
  (
    {
      id,
      x,
      y,
      width,
      name,
      attributes = [],
      fill = '#FFFFFF',
      headerFill,
      stroke,
      strokeWidth = 1.5,
      children,
    },
    ref,
  ) => {
    const effectiveStroke = stroke ?? dvar('edge', 'stroke');
    const effectiveHeaderFill = headerFill ?? dvar('canvas', 'grid');
    const monoFont = dvar('typography', 'monoFont');
    const titleFont = dvar('typography', 'titleFont');
    const textColor = dvar('edge', 'stroke');

    const totalH = HEADER_H + attributes.length * ROW_H;
    const lineStyle: React.CSSProperties = {
      stroke: effectiveStroke,
      strokeWidth,
    };

    return (
      <g ref={ref} data-bbangto-diagram-entity-table data-bbangto-diagram-entity-table-id={id}>
        {/* outer border */}
        <rect
          x={x}
          y={y}
          width={width}
          height={totalH}
          style={{ fill, stroke: effectiveStroke, strokeWidth }}
        />

        {/* header */}
        <g data-bbangto-diagram-entity-header>
          <rect
            x={x}
            y={y}
            width={width}
            height={HEADER_H}
            style={{ fill: effectiveHeaderFill, stroke: effectiveStroke, strokeWidth }}
          />
          <text
            x={x + width / 2}
            y={y + HEADER_H / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={titleFont}
            fontSize={13}
            fontWeight={700}
            fill={textColor}
          >
            {name}
          </text>
        </g>

        {/* attribute rows */}
        {attributes.map((attr, i) => {
          const rowY = y + HEADER_H + i * ROW_H;
          return (
            <g key={i} data-bbangto-diagram-entity-row>
              <line x1={x} y1={rowY} x2={x + width} y2={rowY} style={lineStyle} />
              {attr.key && (
                <text
                  x={x + PAD_X}
                  y={rowY + ROW_H / 2}
                  textAnchor="start"
                  dominantBaseline="central"
                  fontFamily={monoFont}
                  fontSize={9}
                  fontWeight={700}
                  fill={textColor}
                >
                  {attr.key}
                </text>
              )}
              <text
                x={x + (attr.key ? 36 : PAD_X)}
                y={rowY + ROW_H / 2}
                textAnchor="start"
                dominantBaseline="central"
                fontFamily={monoFont}
                fontSize={10}
                fill={textColor}
              >
                {attr.name}
              </text>
              <text
                x={x + width - PAD_X}
                y={rowY + ROW_H / 2}
                textAnchor="end"
                dominantBaseline="central"
                fontFamily={monoFont}
                fontSize={10}
                fill={textColor}
                opacity={0.6}
              >
                {attr.type}
              </text>
            </g>
          );
        })}

        {children}
      </g>
    );
  },
);

EntityTable.displayName = 'EntityTable';
