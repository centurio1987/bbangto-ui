import React, { type ReactNode } from 'react';
import { dvar } from '../tokens/contract';

export interface ClassBoxProps {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  stereotype?: string;
  attributes?: string[];
  methods?: string[];
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  children?: ReactNode;
}

const ROW_H = 16;
const PAD = 6;
const HEADER_H = 28;

export const ClassBox = React.forwardRef<SVGGElement, ClassBoxProps>(
  (
    {
      id,
      x,
      y,
      width,
      height,
      name,
      stereotype,
      attributes = [],
      methods = [],
      fill = '#FFFFFF',
      stroke,
      strokeWidth = 2,
      children,
    },
    ref,
  ) => {
    const effectiveStroke = stroke ?? dvar('edge', 'stroke');
    const monoFont = dvar('typography', 'monoFont');
    const titleFont = dvar('typography', 'titleFont');
    const textColor = dvar('edge', 'stroke');

    // Distribute height into 3 sections
    const attrH = Math.max(HEADER_H, attributes.length * ROW_H + PAD * 2);
    const methodH = Math.max(HEADER_H, methods.length * ROW_H + PAD * 2);
    const nameH = height - attrH - methodH;
    const nameH2 = Math.max(HEADER_H, nameH);

    const attrY = y + nameH2;
    const methodY = attrY + attrH;

    const lineStyle: React.CSSProperties = {
      stroke: effectiveStroke,
      strokeWidth,
      fill: 'none',
    };

    return (
      <g ref={ref} data-bbangto-diagram-class-box data-bbangto-diagram-class-box-id={id}>
        {/* outer rect */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{ fill, stroke: effectiveStroke, strokeWidth }}
        />

        {/* section 1: name */}
        <g data-bbangto-diagram-class-section="name">
          {stereotype && (
            <text
              data-bbangto-diagram-sysml-stereotype
              x={x + width / 2}
              y={y + nameH2 / 2 - 9}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={monoFont}
              fontSize={9}
              fill={textColor}
            >
              {`«${stereotype}»`}
            </text>
          )}
          <text
            x={x + width / 2}
            y={stereotype ? y + nameH2 / 2 + 6 : y + nameH2 / 2}
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

        {/* divider after name */}
        <line x1={x} y1={attrY} x2={x + width} y2={attrY} style={lineStyle} />

        {/* section 2: attributes */}
        <g data-bbangto-diagram-class-section="attributes">
          {attributes.map((attr, i) => (
            <text
              key={i}
              x={x + PAD}
              y={attrY + PAD + i * ROW_H + ROW_H / 2}
              textAnchor="start"
              dominantBaseline="central"
              fontFamily={monoFont}
              fontSize={10}
              fill={textColor}
            >
              {attr}
            </text>
          ))}
        </g>

        {/* divider after attributes */}
        <line x1={x} y1={methodY} x2={x + width} y2={methodY} style={lineStyle} />

        {/* section 3: methods */}
        <g data-bbangto-diagram-class-section="methods">
          {methods.map((method, i) => (
            <text
              key={i}
              x={x + PAD}
              y={methodY + PAD + i * ROW_H + ROW_H / 2}
              textAnchor="start"
              dominantBaseline="central"
              fontFamily={monoFont}
              fontSize={10}
              fill={textColor}
            >
              {method}
            </text>
          ))}
        </g>

        {children}
      </g>
    );
  },
);

ClassBox.displayName = 'ClassBox';
