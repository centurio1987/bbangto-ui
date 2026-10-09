import React, { type ReactNode } from 'react';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

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
      fill: fillProp,
      headerFill,
      stroke,
      strokeWidth = 1.5,
      children,
    },
    ref,
  ) => {
    const fill = fillProp ?? vvar('shape', 'fill');
    const effectiveStroke = stroke ?? vvar('edge', 'stroke');
    const effectiveHeaderFill = headerFill ?? vvar('canvas', 'grid');
    const titleFont = vvar('typography', 'titleFont');
    const textColor = vvar('edge', 'stroke');
    // 속성 줄은 표 면(shape.fill) 위에 놓인다. fill 을 직접 주면 그 면의 대비는 준 쪽 몫이라 종전 글자색을 둔다(KAN-061).
    const rowTextColor = fillProp === undefined ? vvar('on', 'shape', 'fill') : textColor;

    const totalH = HEADER_H + attributes.length * ROW_H;
    const lineStyle: React.CSSProperties = {
      stroke: effectiveStroke,
      strokeWidth,
    };

    return (
      <g ref={ref} data-bbangto-viz-entity-table data-bbangto-viz-entity-table-id={id}>
        {/* outer border */}
        <rect
          x={x}
          y={y}
          width={width}
          height={totalH}
          style={{ fill, stroke: effectiveStroke, strokeWidth }}
        />

        {/* header */}
        <g data-bbangto-viz-entity-header>
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
            style={{ fill: textColor }}
          >
            {name}
          </text>
        </g>

        {/* attribute rows */}
        {attributes.map((attr, i) => {
          const rowY = y + HEADER_H + i * ROW_H;
          return (
            <g key={i} data-bbangto-viz-entity-row>
              <line x1={x} y1={rowY} x2={x + width} y2={rowY} style={lineStyle} />
              {attr.key && (
                <text
                  x={x + PAD_X}
                  y={rowY + ROW_H / 2}
                  textAnchor="start"
                  dominantBaseline="central"
                  fontFamily={resolveLabelFont(attr.key)}
                  fontSize={9}
                  fontWeight={700}
                  style={{ fill: rowTextColor }}
                >
                  {attr.key}
                </text>
              )}
              <text
                x={x + (attr.key ? 36 : PAD_X)}
                y={rowY + ROW_H / 2}
                textAnchor="start"
                dominantBaseline="central"
                fontFamily={resolveLabelFont(attr.name)}
                fontSize={10}
                style={{ fill: rowTextColor }}
              >
                {attr.name}
              </text>
              <text
                x={x + width - PAD_X}
                y={rowY + ROW_H / 2}
                textAnchor="end"
                dominantBaseline="central"
                fontFamily={resolveLabelFont(attr.type)}
                // 타입은 이름보다 작게 써서 구분한다. 흐리게(opacity) 쓰면 가이드에 따라 바탕에 묻힌다(KAN-061).
                fontSize={9}
                style={{ fill: rowTextColor }}
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
