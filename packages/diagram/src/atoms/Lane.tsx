import React from 'react';
import { dvar } from '../tokens/contract';

export type LaneOrientation = 'horizontal' | 'vertical';

export interface LaneProps extends React.SVGAttributes<SVGGElement> {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  orientation?: LaneOrientation;
  headerWidth?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  labelFontSize?: number;
  labelFontFamily?: string;
  labelColor?: string;
}

export const Lane = React.forwardRef<SVGGElement, LaneProps>(
  (
    {
      x,
      y,
      width,
      height,
      label,
      orientation = 'horizontal',
      headerWidth = 32,
      fill = 'rgba(0,0,0,0.03)',
      stroke,
      strokeWidth = 1.5,
      labelFontSize = 11,
      labelFontFamily,
      labelColor,
      style,
      ...props
    },
    ref,
  ) => {
    const effectiveStroke = stroke ?? dvar('boundary', 'stroke');
    const effectiveLabelColor = labelColor ?? dvar('boundary', 'labelColor');
    const effectiveFont = labelFontFamily ?? dvar('typography', 'monoFont');

    const isH = orientation === 'horizontal';
    const hw = isH ? headerWidth : width;
    const hh = isH ? height : headerWidth;
    const lx = isH ? x + headerWidth / 2 : x + width / 2;
    const ly = isH ? y + height / 2 : y + headerWidth / 2;
    const rotate = isH ? -90 : 0;

    return (
      <g
        ref={ref}
        data-bbangto-diagram-lane
        data-bbangto-diagram-lane-orientation={orientation}
        style={style}
        {...props}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{ fill, stroke: effectiveStroke, strokeWidth }}
        />
        <rect
          x={x}
          y={y}
          width={hw}
          height={hh}
          style={{ fill: 'rgba(0,0,0,0.05)', stroke: effectiveStroke, strokeWidth }}
        />
        {label && (
          <text
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={effectiveFont}
            fontSize={labelFontSize}
            fill={effectiveLabelColor}
            transform={rotate !== 0 ? `rotate(${rotate}, ${lx}, ${ly})` : undefined}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);

Lane.displayName = 'Lane';
