import React from 'react';
import { vvar } from '../tokens/contract';
import type { Point } from '../geometry/anchors';

export interface CalloutLeaderProps {
  /** 그래픽 쪽 시작점. */
  from: Point;
  /** 텍스트 블록 기준점. */
  to: Point;
  /** 텍스트 줄들 — 첫 줄이 제목. */
  lines: readonly string[];
  side?: 'left' | 'right';
  fontSize?: number;
}

/** 리더선 + 텍스트 블록 molecule — 그래픽과 라벨을 연결한다(zigzag 콜아웃 등). */
export const CalloutLeader = React.forwardRef<SVGGElement, CalloutLeaderProps>(
  ({ from, to, lines, side = 'right', fontSize = 12 }, ref) => {
    const ink = vvar('shape', 'stroke');
    const elbowX = to.x;
    const anchor = side === 'right' ? 'start' : 'end';
    const textX = side === 'right' ? to.x + 8 : to.x - 8;

    return (
      <g ref={ref} data-viz-callout-leader>
        <polyline
          points={`${from.x},${from.y} ${elbowX},${from.y} ${elbowX},${to.y}`}
          style={{ fill: 'none', stroke: ink, strokeWidth: 1 }}
        />
        {lines.map((line, i) => (
          <text
            key={i}
            x={textX}
            y={to.y + i * (fontSize + 4)}
            textAnchor={anchor}
            fontSize={i === 0 ? fontSize + 2 : fontSize}
            fontWeight={i === 0 ? 700 : 400}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: i === 0 ? ink : vvar('boundary', 'labelColor') }}
          >
            {line}
          </text>
        ))}
      </g>
    );
  },
);

CalloutLeader.displayName = 'CalloutLeader';
