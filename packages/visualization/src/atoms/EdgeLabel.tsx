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

/**
 * 라벨 글자 폭 어림 — 한글 · 한자 · 가나(U+1100 이상)는 1em, 그 밖은 0.6em. 모두 0.6em 으로 어림하면 한글 라벨의
 * 바탕이 글자보다 좁아 그 밑 선이 글자 양 끝에 비친다(KAN-082 에서 확인).
 */
export function labelTextWidth(label: string, fontSize: number): number {
  let w = 0;
  for (const ch of label) w += (ch.codePointAt(0) ?? 0) >= 0x1100 ? fontSize : fontSize * 0.6;
  return w;
}

/**
 * EdgeLabel 이 그리는 바탕 상자의 크기 — 글자 폭 어림(`labelTextWidth`) + 안쪽 여백.
 * 라벨을 선 끝에 놓는 쪽(Edge 의 fromLabel · toLabel)이 상자가 선과 노드를 비키도록 같은 값을 쓴다.
 */
export function edgeLabelBox(label: string, fontSize = 11, padding = 3): { width: number; height: number } {
  return { width: labelTextWidth(label, fontSize) + padding * 2, height: fontSize + padding * 2 };
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
    const approxWidth = edgeLabelBox(label, fontSize, padding).width;

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
