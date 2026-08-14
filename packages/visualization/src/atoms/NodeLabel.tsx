import React from 'react';
import { wrapText, truncateText, estimateWidth } from '../geometry/text';
import { contentBox, type NodeShape } from '../geometry/shapes';
import { vvar } from '../tokens/contract';

export type NodeLabelMode = 'wrap' | 'truncate' | 'fit';

export interface NodeLabelProps {
  x: number;
  y: number;
  width: number;
  /**
   * 노드 높이. `shape`와 함께 주면 도형의 콘텐츠 박스(`contentBox`) 안으로 라벨을 맞춘다 —
   * 세로 여유에서 줄 수를 산출해 도형 밖으로 넘치거나 조용히 잘리는 일을 없앤다.
   * 미지정 시 동작은 종전과 같다(가로 폭만 보고 배치).
   */
  height?: number;
  /** 노드 도형. `height`와 함께 줄 때만 쓰인다. 기본 `rect`. */
  shape?: NodeShape;
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
      height,
      shape,
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
    const effectiveFill = fill ?? vvar('edge', 'stroke');
    const effectiveFont = fontFamily ?? vvar('typography', 'titleFont');
    const lineHeight = fontSize * 1.25;

    // height를 주면 도형의 콘텐츠 박스가 배치 기준이 된다(y는 노드 세로 중심).
    const box =
      height !== undefined
        ? contentBox(shape ?? 'rect', { x, y: y - height / 2, width, height })
        : { x, y: y - lineHeight / 2, width, height: lineHeight };
    const boxCy = height !== undefined ? box.y + box.height / 2 : y;
    const cx =
      textAnchor === 'middle'
        ? box.x + box.width / 2
        : textAnchor === 'end'
          ? box.x + box.width
          : box.x;

    // 세로 여유가 허용하는 줄 수 — 넘칠 바에 줄을 줄이고, 줄인 사실은 말줄임으로 드러낸다.
    const roomLines =
      height !== undefined
        ? Math.max(1, Math.floor(box.height / lineHeight) - (subtitle ? 1 : 0))
        : Infinity;
    const effectiveMaxLines = Math.min(maxLines, roomLines);

    let titleLines: string[];
    if (mode === 'wrap') {
      titleLines = wrapText(title, box.width - 8, fontSize, false, effectiveMaxLines);
      // 세로 여유 때문에 줄을 줄였고 그 바람에 뒤쪽 낱말이 빠졌으면 말줄임으로 드러낸다.
      // (height를 주지 않은 종전 호출은 이 분기에 들어오지 않는다 — 동작 불변.)
      const dropped =
        height !== undefined && titleLines.join(' ') !== title.trim().replace(/\s+/g, ' ');
      if (dropped) {
        let last = `${titleLines[titleLines.length - 1]}…`;
        while (last.length > 1 && estimateWidth(last, fontSize) > box.width - 8) {
          last = `${last.slice(0, -2)}…`;
        }
        titleLines[titleLines.length - 1] = last;
      }
    } else if (mode === 'truncate') {
      titleLines = [truncateText(title, box.width - 8, fontSize)];
    } else {
      // fit mode: single line with SVG lengthAdjust
      titleLines = [title];
    }

    const totalH = titleLines.length * lineHeight + (subtitle ? lineHeight : 0);
    const startY = boxCy - totalH / 2 + lineHeight / 2;

    return (
      <g ref={ref} data-bbangto-viz-node-label>
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
            style={{ fill: effectiveFill }}
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
            style={{ fill: effectiveFill }}
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
