import React from 'react';
import { dvar } from '../tokens/contract';

export interface LifelineProps extends React.SVGAttributes<SVGGElement> {
  x: number;
  y: number;
  height: number;
  label?: string;
  headWidth?: number;
  headHeight?: number;
  stroke?: string;
  strokeWidth?: number | string;
  headFill?: string;
  labelFontSize?: number;
  labelFontFamily?: string;
  labelColor?: string;
}

export const Lifeline = React.forwardRef<SVGGElement, LifelineProps>(
  (
    {
      x,
      y,
      height,
      label,
      headWidth = 80,
      headHeight = 32,
      stroke,
      strokeWidth = 1.5,
      headFill = 'white',
      labelFontSize = 12,
      labelFontFamily,
      labelColor,
      style,
      ...props
    },
    ref,
  ) => {
    const effectiveStroke = stroke ?? dvar('edge', 'stroke');
    const effectiveLabelColor = labelColor ?? dvar('edge', 'stroke');
    const effectiveFont = labelFontFamily ?? dvar('typography', 'titleFont');
    const cx = x;

    return (
      <g
        ref={ref}
        data-bbangto-diagram-lifeline
        style={style}
        {...props}
      >
        {/* Head box */}
        <rect
          x={cx - headWidth / 2}
          y={y}
          width={headWidth}
          height={headHeight}
          style={{ fill: headFill, stroke: effectiveStroke, strokeWidth }}
        />
        {/* Dashed line */}
        <line
          x1={cx}
          y1={y + headHeight}
          x2={cx}
          y2={y + height}
          style={{
            stroke: effectiveStroke,
            strokeWidth,
            strokeDasharray: '6 4',
          }}
        />
        {label && (
          <text
            x={cx}
            y={y + headHeight / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={effectiveFont}
            fontSize={labelFontSize}
            fill={effectiveLabelColor}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);

Lifeline.displayName = 'Lifeline';
