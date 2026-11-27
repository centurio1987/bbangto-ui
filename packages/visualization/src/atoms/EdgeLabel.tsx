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
/** 여러 줄 라벨의 줄 간격(글자 크기 배수). 라벨 글에 줄바꿈(`\n`)이 있으면 줄마다 한 줄씩 그린다. */
const LINE_HEIGHT = 1.2;

export function edgeLabelBox(label: string, fontSize = 11, padding = 3): { width: number; height: number } {
  const lines = label.split('\n');
  return {
    width: Math.max(...lines.map((l) => labelTextWidth(l, fontSize))) + padding * 2,
    height: fontSize + (lines.length - 1) * fontSize * LINE_HEIGHT + padding * 2,
  };
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
    const box = edgeLabelBox(label, fontSize, padding);
    const lines = label.split('\n');
    const step = fontSize * LINE_HEIGHT;

    return (
      <g ref={ref} data-bbangto-viz-edge-label>
        <rect
          x={x - box.width / 2}
          y={y - box.height / 2}
          width={box.width}
          height={box.height}
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
          {lines.length === 1
            ? label
            : lines.map((line, i) => (
                // 줄 묶음의 가운데가 y 에 오도록 첫 줄을 위로 올리고 다음 줄부터 한 줄씩 내린다
                <tspan key={i} x={x} dy={i === 0 ? -((lines.length - 1) * step) / 2 : step}>
                  {line}
                </tspan>
              ))}
        </text>
      </g>
    );
  },
);

EdgeLabel.displayName = 'EdgeLabel';
