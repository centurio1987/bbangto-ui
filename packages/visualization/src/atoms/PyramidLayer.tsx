import React from 'react';
import { vvar } from '../tokens/contract';

export interface PyramidLayerProps {
  /** 층의 수평 중심. */
  cx: number;
  /** 층 상단 y. */
  y: number;
  topWidth: number;
  bottomWidth: number;
  height: number;
  label?: string;
  fill?: string;
}

/** 사다리꼴 계층 층 atom — 피라미드형 Hierarchy의 한 층. */
export const PyramidLayer = React.forwardRef<SVGGElement, PyramidLayerProps>(
  ({ cx, y, topWidth, bottomWidth, height, label, fill }, ref) => {
    const d = [
      `M ${cx - topWidth / 2} ${y}`,
      `L ${cx + topWidth / 2} ${y}`,
      `L ${cx + bottomWidth / 2} ${y + height}`,
      `L ${cx - bottomWidth / 2} ${y + height}`,
      'Z',
    ].join(' ');

    return (
      <g ref={ref}>
        <path
          data-viz-pyramid-layer
          data-viz-part={fill ? undefined : 'shape'}
          d={d}
          style={fill ? { fill, stroke: vvar('shape', 'stroke'), strokeWidth: 1.5 } : undefined}
        />
        {label && (
          <text
            x={cx}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={13}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);

PyramidLayer.displayName = 'PyramidLayer';
