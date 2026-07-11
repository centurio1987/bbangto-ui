import React, { type ReactNode } from 'react';
import { dvar } from '../tokens/contract';

export type StateVariant = 'start' | 'end' | 'normal';

export interface StateNodeProps {
  id?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  title?: string;
  variant?: StateVariant;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  children?: ReactNode;
}

const PSEUDO_RADIUS = 14;

export const StateNode = React.forwardRef<SVGGElement, StateNodeProps>(
  (
    {
      id,
      x,
      y,
      width = 120,
      height = 60,
      title = '',
      variant = 'normal',
      fill,
      stroke,
      strokeWidth = 2,
      children,
    },
    ref,
  ) => {
    const effectiveStroke = stroke ?? dvar('edge', 'stroke');
    const effectiveFill = fill ?? dvar('canvas', 'bg');
    const titleFont = dvar('typography', 'titleFont');
    const textColor = dvar('edge', 'stroke');

    if (variant === 'start') {
      const cx = x + PSEUDO_RADIUS;
      const cy = y + PSEUDO_RADIUS;
      return (
        <g ref={ref} data-bbangto-diagram-state="start" data-bbangto-diagram-state-id={id}>
          <circle cx={cx} cy={cy} r={PSEUDO_RADIUS} style={{ fill: '#111111' }} />
          {children}
        </g>
      );
    }

    if (variant === 'end') {
      const cx = x + PSEUDO_RADIUS;
      const cy = y + PSEUDO_RADIUS;
      return (
        <g ref={ref} data-bbangto-diagram-state="end" data-bbangto-diagram-state-id={id}>
          <circle
            cx={cx}
            cy={cy}
            r={PSEUDO_RADIUS}
            style={{ fill: 'none', stroke: effectiveStroke, strokeWidth }}
          />
          <circle cx={cx} cy={cy} r={PSEUDO_RADIUS * 0.55} style={{ fill: '#111111' }} />
          {children}
        </g>
      );
    }

    // normal state — stadium shape
    const r = height / 2;
    const innerW = width - 2 * r;
    const d =
      innerW > 0
        ? `M ${x + r} ${y} L ${x + r + innerW} ${y} A ${r} ${r} 0 0 1 ${x + r + innerW} ${y + height} L ${x + r} ${y + height} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`
        : `M ${x + width / 2} ${y} A ${r} ${r} 0 1 1 ${x + width / 2} ${y + height} A ${r} ${r} 0 1 1 ${x + width / 2} ${y} Z`;

    return (
      <g ref={ref} data-bbangto-diagram-state="normal" data-bbangto-diagram-state-id={id}>
        <path
          d={d}
          style={{ fill: effectiveFill, stroke: effectiveStroke, strokeWidth }}
        />
        {title && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={titleFont}
            fontSize={12}
            fontWeight={600}
            fill={textColor}
          >
            {title}
          </text>
        )}
        {children}
      </g>
    );
  },
);

StateNode.displayName = 'StateNode';
