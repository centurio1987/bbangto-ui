import React from 'react';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

export interface EdgeLabelProps {
  x: number;
  y: number;
  label: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  bgFill?: string;
  padding?: number;
}

export const EdgeLabel = React.forwardRef<SVGGElement, EdgeLabelProps>(
  (
    {
      x,
      y,
      label,
      fontSize = 11,
      fontFamily,
      fill,
      bgFill,
      padding = 3,
    },
    ref,
  ) => {
    // 바탕이 기본(canvas.bg)이면 그 위 글자색을 쓴다(KAN-075). 바탕을 넘기면 그 면은 계산할 수 없어 연결선 색이다.
    const effectiveFill = fill ?? (bgFill === undefined ? vvar('on', 'canvas', 'bg') : vvar('edge', 'stroke'));
    const effectiveBg = bgFill ?? vvar('canvas', 'bg');
    const effectiveFont = resolveLabelFont(label, fontFamily);
    const charWidth = fontSize * 0.6;
    const approxWidth = label.length * charWidth + padding * 2;

    return (
      <g ref={ref} data-bbangto-viz-edge-label>
        <rect
          x={x - approxWidth / 2}
          y={y - fontSize / 2 - padding}
          width={approxWidth}
          height={fontSize + padding * 2}
          style={{ fill: effectiveBg, stroke: 'none' }}
          rx={2}
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={effectiveFont}
          fontSize={fontSize}
          style={{ fill: effectiveFill }}
        >
          {label}
        </text>
      </g>
    );
  },
);

EdgeLabel.displayName = 'EdgeLabel';
