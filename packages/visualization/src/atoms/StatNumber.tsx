import React from 'react';
import { vvar } from '../tokens/contract';

export interface StatNumberProps {
  x: number;
  y: number;
  value: number | string;
  /** 단위(%, h 등). 값 뒤에 작은 크기로 붙는다. */
  unit?: string;
  /** 증감. 부호를 포함해 텍스트로 병기한다(+4.1 / -1.2). */
  delta?: number;
  fontSize?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  fill?: string;
}

/** 대형 수치 강조 atom — 값·단위·델타를 타입 스케일 위계로 렌더한다(값은 항상 텍스트 노출). */
export const StatNumber = React.forwardRef<SVGGElement, StatNumberProps>(
  ({ x, y, value, unit, delta, fontSize = 34, textAnchor = 'middle', fill }, ref) => {
    const inkFill = fill ?? vvar('shape', 'stroke');
    const deltaFill = delta != null && delta < 0 ? vvar('palette', 'p1') : vvar('palette', 'p6');
    const deltaText = delta != null ? `${delta > 0 ? '+' : ''}${delta}` : undefined;

    return (
      <g ref={ref} data-viz-stat-number>
        <text
          data-viz-stat-value
          x={x}
          y={y}
          textAnchor={textAnchor}
          fontSize={fontSize}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: inkFill }}
        >
          {value}
          {unit && (
            <tspan fontSize={fontSize * 0.45} fontWeight={600} dx={2}>
              {unit}
            </tspan>
          )}
        </text>
        {deltaText && (
          <text
            data-viz-stat-delta
            x={x}
            y={y + fontSize * 0.55}
            textAnchor={textAnchor}
            fontSize={fontSize * 0.35}
            fontWeight={700}
            fontFamily={vvar('typography', 'monoFont')}
            style={{ fill: deltaFill }}
          >
            {deltaText}
          </text>
        )}
      </g>
    );
  },
);

StatNumber.displayName = 'StatNumber';
