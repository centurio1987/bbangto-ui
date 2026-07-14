import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, bandScale, niceTicks } from '../geometry/scale';
import { stack } from '../geometry/stack';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface StackedBarSeries {
  id: string;
  label: string;
  /** categories와 index-정렬된 값 배열. 음수→0 클램프. */
  values: number[];
  color?: string;
}

export interface StackedBarChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { categories: string[]; series: StackedBarSeries[] };
  orientation?: 'vertical' | 'horizontal';
  /** 값축 도메인 [0,max]. 미지정 시 스택 최대 합. */
  domain?: [number, number];
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 48, right: 18, top: 22, bottom: 36 } as const;

/** Stacked bar chart (VT-502) — 양수 누적. headless: 세그먼트별 값 텍스트 병기. */
export function StackedBarChart({
  data,
  orientation = 'vertical',
  domain,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Stacked bar chart',
  ...canvasProps
}: StackedBarChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 300]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="stacked-bar" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { categories, series } = data;
  const hasNegative = series.some((s) => s.values.some((v) => v < 0));
  if (hasNegative && typeof console !== 'undefined') {
    console.warn('[StackedBarChart] 음수 값은 0으로 클램프됩니다(양수 누적만 지원).');
  }
  // spans[s][c] = { y0, y1 }
  const spans = stack(series.map((s) => s.values));
  const totals = categories.map((_, c) => spans.length ? spans[spans.length - 1][c].y1 : 0);
  const vMax = domain?.[1] ?? Math.max(1, ...totals);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const fillFor = (s: StackedBarSeries, i: number) => s.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]);

  const isVertical = orientation === 'vertical';
  const band = bandScale(categories.length, isVertical ? [plotLeft, plotRight] : [plotTop, plotBottom]);
  const valScale = isVertical
    ? linearScale([0, vMax], [plotBottom, plotTop])
    : linearScale([0, vMax], [plotLeft, plotRight]);

  const segs: ReactNode[] = [];
  series.forEach((s, si) => {
    categories.forEach((_, ci) => {
      const span = spans[si][ci];
      if (span.y1 - span.y0 <= 0) return;
      const bandPos = band.position(ci);
      const commonAttrs = {
        'data-bbangto-viz-bar': true,
        'data-bbangto-viz-bar-series': s.id,
        'data-bbangto-viz-bar-cat': String(ci),
        'data-viz-part': 'shape',
      } as const;
      const segValue = span.y1 - span.y0;
      if (isVertical) {
        const yTop = valScale(span.y1);
        const yBot = valScale(span.y0);
        segs.push(
          <g key={`${s.id}-${ci}`}>
            <rect {...commonAttrs} x={bandPos} y={yTop} width={band.bandwidth} height={yBot - yTop} style={{ fill: fillFor(s, si) }} />
            <text
              data-bbangto-viz-bar-value
              x={band.center(ci)}
              y={(yTop + yBot) / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={10}
              fontWeight={700}
              fontFamily={vvar('typography', 'monoFont')}
              style={{ fill: vvar('canvas', 'bg') }}
            >
              {formatValue(segValue)}
            </text>
          </g>,
        );
      } else {
        const xLeft = valScale(span.y0);
        const xRight = valScale(span.y1);
        segs.push(
          <g key={`${s.id}-${ci}`}>
            <rect {...commonAttrs} x={xLeft} y={bandPos} width={xRight - xLeft} height={band.bandwidth} style={{ fill: fillFor(s, si) }} />
            <text
              data-bbangto-viz-bar-value
              x={(xLeft + xRight) / 2}
              y={band.center(ci)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={10}
              fontWeight={700}
              fontFamily={vvar('typography', 'monoFont')}
              style={{ fill: vvar('canvas', 'bg') }}
            >
              {formatValue(segValue)}
            </text>
          </g>,
        );
      }
    });
  });

  const valTicks: AxisTick[] = niceTicks(0, vMax).map((t) => ({ pos: valScale(t), label: formatValue(t) }));
  const catTicks: AxisTick[] = categories.map((c, i) => ({ pos: band.center(i), label: c }));

  const axes = isVertical ? (
    <>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={valTicks} />
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={catTicks} tickSize={0} />
    </>
  ) : (
    <>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={catTicks} tickSize={0} />
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={valTicks} />
    </>
  );

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="stacked-bar" {...canvasProps}>
      {axes}
      {segs}
    </Canvas>
  );
}

StackedBarChart.displayName = 'StackedBarChart';
