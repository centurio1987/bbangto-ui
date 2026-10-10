import React from 'react';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

export interface TagProps {
  x: number;
  y: number;
  label: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
}

export const Tag = React.forwardRef<SVGTextElement, TagProps>(
  (
    {
      x,
      y,
      label,
      fontSize = 10,
      fontFamily,
      fill,
    },
    ref,
  ) => {
    // 기본은 캔버스 위 태그다(KAN-075). 노드 안 태그는 그 면의 글자색을 fill 로 넘긴다.
    const effectiveFill = fill ?? vvar('on', 'canvas', 'bg');
    const effectiveFont = resolveLabelFont(label, fontFamily);

    return (
      <text
        ref={ref}
        data-bbangto-viz-tag
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={effectiveFont}
        fontSize={fontSize}
        style={{ fill: effectiveFill }}
      >
        {`[${label}]`}
      </text>
    );
  },
);

Tag.displayName = 'Tag';
