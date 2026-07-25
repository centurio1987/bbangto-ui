import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, bandScale, niceTicks } from '../geometry/scale';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface BarChartDatum {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { items: BarChartDatum[] };
  orientation?: 'vertical' | 'horizontal';
  /** 값 도메인 [min,max]. 미지정 시 데이터+0 기준선으로 계산. */
  domain?: [number, number];
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 48, right: 18, top: 22, bottom: 36 } as const;

/** Bar chart (VT-501) — 단일 시리즈, 0 기준선(음수 지원). headless: 값은 텍스트 병기. */
export function BarChart({
  data,
  orientation = 'vertical',
  domain,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Bar chart',
  ...canvasProps
}: BarChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 300]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="bar" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const items = data.items;
  const values = items.map((d) => d.value);
  const dataMin = Math.min(0, ...values);
  const dataMax = Math.max(0, ...values, dataMin + 1);
  const [vMin, vMax] = domain ?? [dataMin, dataMax];

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const fillFor = (d: BarChartDatum, i: number) => d.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]);

  let bars: ReactNode;
  let axes: ReactNode;

  if (orientation === 'vertical') {
    const yScale = linearScale([vMin, vMax], [plotBottom, plotTop]);
    const band = bandScale(items.length, [plotLeft, plotRight]);
    const baseline = yScale(0);
    const yTicks: AxisTick[] = niceTicks(vMin, vMax).map((t) => ({ pos: yScale(t), label: formatValue(t) }));
    const xTicks: AxisTick[] = items.map((d, i) => ({ pos: band.center(i), label: d.label }));

    bars = items.map((d, i) => {
      const bx = band.position(i);
      const yv = yScale(d.value);
      const yTop = Math.min(baseline, yv);
      const h = Math.abs(yv - baseline);
      const labelY = d.value >= 0 ? yTop - 6 : yTop + h + 12;
      return (
        <g key={d.id}>
          <rect
            data-bbangto-viz-bar
            data-bbangto-viz-bar-id={d.id}
            x={bx}
            y={yTop}
            width={band.bandwidth}
            height={h}
            style={{ fill: fillFor(d, i) }}
          />
          <text
            data-bbangto-viz-bar-value
            x={band.center(i)}
            y={labelY}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fontFamily={vvar('typography', 'monoFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {formatValue(d.value)}
          </text>
        </g>
      );
    });
    axes = (
      <>
        <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} />
        <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} />
      </>
    );
  } else {
    const xScale = linearScale([vMin, vMax], [plotLeft, plotRight]);
    const band = bandScale(items.length, [plotTop, plotBottom]);
    const baseline = xScale(0);
    const xTicks: AxisTick[] = niceTicks(vMin, vMax).map((t) => ({ pos: xScale(t), label: formatValue(t) }));
    const yTicks: AxisTick[] = items.map((d, i) => ({ pos: band.center(i), label: d.label }));

    bars = items.map((d, i) => {
      const by = band.position(i);
      const xv = xScale(d.value);
      const xLeft = Math.min(baseline, xv);
      const w = Math.abs(xv - baseline);
      return (
        <g key={d.id}>
          <rect
            data-bbangto-viz-bar
            data-bbangto-viz-bar-id={d.id}
            x={xLeft}
            y={by}
            width={w}
            height={band.bandwidth}
            style={{ fill: fillFor(d, i) }}
          />
          <text
            data-bbangto-viz-bar-value
            x={d.value >= 0 ? xv + 6 : xv - 6}
            y={band.center(i)}
            textAnchor={d.value >= 0 ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={11}
            fontWeight={700}
            fontFamily={vvar('typography', 'monoFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {formatValue(d.value)}
          </text>
        </g>
      );
    });
    axes = (
      <>
        <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} tickSize={0} />
        <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} />
      </>
    );
  }

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="bar" {...canvasProps}>
      {axes}
      {bars}
    </Canvas>
  );
}

BarChart.displayName = 'BarChart';
