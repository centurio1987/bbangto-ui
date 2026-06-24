import React from 'react';
import { wrapText, truncateText, estimateWidth } from '../geometry/text';
import { dvar } from '../tokens/contract';

export type NodeLabelMode = 'wrap' | 'truncate' | 'fit';

export interface NodeLabelProps {
  x: number;
  y: number;
  width: number;
  title: string;
  subtitle?: string;
  mode?: NodeLabelMode;
  maxLines?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number | string;
  fill?: string;
  textAnchor?: 'start' | 'middle' | 'end';
}

export const NodeLabel = React.forwardRef<SVGGElement, NodeLabelProps>(
  (
    {
      x,
      y,
      width,
      title,
      subtitle,
      mode = 'wrap',
      maxLines = 3,
      fontSize = 13,
      fontFamily,
      fontWeight = 700,
      fill,
      textAnchor = 'middle',
    },
    ref,
  ) => {
    const effectiveFill = fill ?? dvar('edge', 'stroke');
    const effectiveFont = fontFamily ?? dvar('typography', 'titleFont');
    const cx = textAnchor === 'middle' ? x + width / 2 : textAnchor === 'end' ? x + width : x;
    const lineHeight = fontSize * 1.25;

    let titleLines: string[];
    if (mode === 'wrap') {
      titleLines = wrapText(title, width - 8, fontSize, false, maxLines);
    } else if (mode === 'truncate') {
      titleLines = [truncateText(title, width - 8, fontSize)];
    } else {
      // fit mode: single line with SVG lengthAdjust
      titleLines = [title];
    }

    const totalH = titleLines.length * lineHeight + (subtitle ? lineHeight : 0);
    const startY = y - totalH / 2 + lineHeight / 2;

    return (
      <g ref={ref} data-bbangto-diagram-node-label>
        {titleLines.map((line, i) => (
          <text
            key={i}
            x={cx}
            y={startY + i * lineHeight}
            textAnchor={textAnchor}
            dominantBaseline="central"
            fontFamily={effectiveFont}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fill={effectiveFill}
            {...(mode === 'fit'
              ? {
                  textLength: estimateWidth(line, fontSize) > width - 8 ? width - 8 : undefined,
                  lengthAdjust: 'spacingAndGlyphs' as const,
                }
              : {})}
          >
            {line}
          </text>
        ))}
        {subtitle && (
          <text
            x={cx}
            y={startY + titleLines.length * lineHeight}
            textAnchor={textAnchor}
            dominantBaseline="central"
            fontFamily={effectiveFont}
            fontSize={fontSize - 2}
            fontWeight={400}
            fill={effectiveFill}
            opacity={0.7}
          >
            {subtitle}
          </text>
        )}
      </g>
    );
  },
);

NodeLabel.displayName = 'NodeLabel';
