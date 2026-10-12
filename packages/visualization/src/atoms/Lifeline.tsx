import React from 'react';
import { vvar } from '../tokens/contract';

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
      headFill,
      labelFontSize = 12,
      labelFontFamily,
      labelColor,
      style,
      ...props
    },
    ref,
  ) => {
    const effectiveStroke = stroke ?? vvar('edge', 'stroke');
    // 머리 기본 면(canvas.bg) 위 글자는 캔버스 위 글자색이다(KAN-075). 면을 넘기면 계산할 수 없어 연결선 색이다.
    const effectiveLabelColor = labelColor ?? (headFill === undefined ? vvar('on', 'canvas', 'bg') : vvar('edge', 'stroke'));
    const effectiveHeadFill = headFill ?? vvar('canvas', 'bg');
    const effectiveFont = labelFontFamily ?? vvar('typography', 'titleFont');
    const cx = x;

    return (
      <g
        ref={ref}
        data-bbangto-viz-lifeline
        style={style}
        {...props}
      >
        {/* Head box */}
        <rect
          x={cx - headWidth / 2}
          y={y}
          width={headWidth}
          height={headHeight}
          style={{ fill: effectiveHeadFill, stroke: effectiveStroke, strokeWidth }}
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
            style={{ fill: effectiveLabelColor }}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);

Lifeline.displayName = 'Lifeline';
