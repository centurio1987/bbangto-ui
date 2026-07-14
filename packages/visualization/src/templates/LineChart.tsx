import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, niceTicks } from '../geometry/scale';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface LinePoint {
  x: number;
  y: number;
}

export interface LineSeries {
  id: string;
  label?: string;
  color?: string;
  points: LinePoint[];
}

export interface LineChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { series: LineSeries[]; xDomain?: [number, number]; yDomain?: [number, number] };
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 48, right: 18, top: 22, bottom: 34 } as const;

/** Line chart (VT-503) — 다중 시리즈 polyline + 점. headless: 값 축 텍스트 병기. */
export function LineChart({
  data,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Line chart',
  ...canvasProps
}: LineChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 300]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="line" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const series = data.series;
  const allPts = series.flatMap((s) => s.points);
  const xs = allPts.map((p) => p.x);
  const ys = allPts.map((p) => p.y);
  const [xMin, xMax] = data.xDomain ?? [Math.min(...xs, 0), Math.max(...xs, 1)];
  const [yMin, yMax] = data.yDomain ?? [Math.min(...ys, 0), Math.max(...ys, 1)];

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const xScale = linearScale([xMin, xMax], [plotLeft, plotRight]);
  const yScale = linearScale([yMin, yMax], [plotBottom, plotTop]);

  const yTicks: AxisTick[] = niceTicks(yMin, yMax).map((t) => ({ pos: yScale(t), label: formatValue(t) }));
  const xTicks: AxisTick[] = niceTicks(xMin, xMax).map((t) => ({ pos: xScale(t), label: formatValue(t) }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="line" {...canvasProps}>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} />
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} />
      {series.map((s, si) => {
        const color = s.color ?? vvar('palette', PALETTE_KEYS[si % PALETTE_KEYS.length]);
        const d = s.points
          .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x)} ${yScale(p.y)}`)
          .join(' ');
        return (
          <g key={s.id} data-bbangto-viz-series data-bbangto-viz-series-id={s.id}>
            <path
              data-bbangto-viz-line
              d={d}
              style={{ fill: 'none', stroke: color, strokeWidth: 2.5 }}
            />
            {s.points.map((p, i) => (
              <circle
                key={i}
                data-bbangto-viz-point
                cx={xScale(p.x)}
                cy={yScale(p.y)}
                r={3.5}
                style={{ fill: color }}
              />
            ))}
          </g>
        );
      })}
    </Canvas>
  );
}

LineChart.displayName = 'LineChart';
