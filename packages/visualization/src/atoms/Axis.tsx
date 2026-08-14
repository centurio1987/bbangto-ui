import React from 'react';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

export interface AxisTick {
  /** 축 주방향 좌표(x축이면 x, y축이면 y). 호출부가 scale로 계산해 넘긴다. */
  pos: number;
  label?: string;
}

export interface AxisProps {
  /** 축 시작점. */
  x: number;
  y: number;
  /** 축 길이(x축=가로, y축=세로). */
  length: number;
  orientation: 'x' | 'y';
  ticks?: AxisTick[];
  tickSize?: number;
  showDomain?: boolean;
  labelFontSize?: number;
  labelGap?: number;
}

/**
 * 차트 축 atom — 도메인선·틱은 edge 채널(계약 스타일시트가 stroke 공급),
 * 라벨은 typography 토큰. 신규 paint 채널 없음.
 */
export const Axis = React.forwardRef<SVGGElement, AxisProps>(
  (
    { x, y, length, orientation, ticks = [], tickSize = 6, showDomain = true, labelFontSize = 11, labelGap = 6 },
    ref,
  ) => {
    const isX = orientation === 'x';
    const domainD = isX ? `M ${x} ${y} L ${x + length} ${y}` : `M ${x} ${y} L ${x} ${y + length}`;
    const labelFill = vvar('edge', 'stroke');

    return (
      <g ref={ref} data-bbangto-viz-axis data-bbangto-viz-axis-orientation={orientation}>
        {showDomain && <path data-bbangto-viz-edge d={domainD} style={{ fill: 'none' }} />}
        {ticks.map((t, i) => {
          const tickD = isX
            ? `M ${t.pos} ${y} L ${t.pos} ${y + tickSize}`
            : `M ${x} ${t.pos} L ${x - tickSize} ${t.pos}`;
          return (
            <g key={i} data-bbangto-viz-tick>
              <path data-bbangto-viz-edge d={tickD} style={{ fill: 'none' }} />
              {t.label != null && (
                <text
                  data-bbangto-viz-tick-label
                  x={isX ? t.pos : x - tickSize - labelGap}
                  y={isX ? y + tickSize + labelGap : t.pos}
                  textAnchor={isX ? 'middle' : 'end'}
                  dominantBaseline={isX ? 'hanging' : 'central'}
                  fontSize={labelFontSize}
                  fontFamily={resolveLabelFont(String(t.label))}
                  style={{ fill: labelFill }}
                >
                  {t.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  },
);

Axis.displayName = 'Axis';
