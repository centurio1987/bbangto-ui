import React from 'react';
import { dvar } from '../tokens/contract';

export type BoundaryVariant = 'system' | 'group' | 'container';

export interface BoundaryProps extends React.SVGAttributes<SVGGElement> {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  variant?: BoundaryVariant;
  stroke?: string;
  strokeWidth?: number | string;
  dashPattern?: string;
  radius?: number;
  labelColor?: string;
  labelFontSize?: number;
  labelFontFamily?: string;
}

export const Boundary = React.forwardRef<SVGGElement, BoundaryProps>(
  (
    {
      x,
      y,
      width,
      height,
      label,
      variant = 'system',
      stroke,
      strokeWidth = 1.5,
      dashPattern = '8 6',
      radius = 8,
      labelColor,
      labelFontSize = 11,
      labelFontFamily,
      style,
      ...props
    },
    ref,
  ) => {
    const effectiveStroke = stroke ?? dvar('boundary', 'stroke');
    const effectiveLabelColor = labelColor ?? dvar('boundary', 'labelColor');
    const effectiveFont = labelFontFamily ?? dvar('typography', 'monoFont');

    return (
      <g
        ref={ref}
        data-bbangto-diagram-boundary
        data-bbangto-diagram-boundary-variant={variant}
        style={style}
        {...props}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={radius}
          ry={radius}
          style={{
            fill: 'none',
            stroke: effectiveStroke,
            strokeWidth,
            strokeDasharray: dashPattern,
          }}
        />
        {label && (
          <text
            x={x + 12}
            y={y - labelFontSize / 2}
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

Boundary.displayName = 'Boundary';
