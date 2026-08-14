import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { parseViewBox } from '../geometry/layout';
import { linearScale, niceTicks } from '../geometry/scale';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface ScatterPoint {
  id: string;
  x: number;
  y: number;
  /** 버블 크기 인코딩 값(sizeDomain과 함께). 미지정 시 고정 반경. */
  size?: number;
  label?: string;
  color?: string;
}

export interface ScatterSeries {
  id: string;
  label: string;
  points: ScatterPoint[];
  color?: string;
}

export interface ScatterPlotProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { series: ScatterSeries[] };
  xDomain?: [number, number];
  yDomain?: [number, number];
  /** size→반경 매핑 도메인. 지정 시 버블(가변 반경). */
  sizeDomain?: [number, number];
  radiusRange?: [number, number];
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 48, right: 20, top: 22, bottom: 36 } as const;

/**
 * Scatterplot / bubble (VT-505) — 대량 가능 유형: 점별 텍스트 강제 대신 축+제목 요약으로
 * 값 접근성 확보. 권장 상한 ~200점. headless: 라벨 있는 점만 텍스트 병기.
 */
export function ScatterPlot({
  data,
  xDomain,
  yDomain,
  sizeDomain,
  radiusRange = [3, 18],
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Scatter plot',
  ...canvasProps
}: ScatterPlotProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 320]);
  const allPoints = data?.series.flatMap((s) => s.points.map((p) => ({ p, s }))) ?? [];

  if (children || !data || allPoints.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="scatter" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const xs = allPoints.map(({ p }) => p.x);
  const ys = allPoints.map(({ p }) => p.y);
  const xMin = xDomain?.[0] ?? Math.min(...xs);
  const xMax = xDomain?.[1] ?? Math.max(...xs);
  const yMin = yDomain?.[0] ?? Math.min(0, ...ys);
  const yMax = yDomain?.[1] ?? Math.max(...ys);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const xScale = linearScale([xMin, xMax], [plotLeft, plotRight]);
  const yScale = linearScale([yMin, yMax], [plotBottom, plotTop]);
  const rScale = sizeDomain ? linearScale(sizeDomain, radiusRange) : null;

  const dots: ReactNode[] = data.series.flatMap((s, si) =>
    s.points.map((p) => {
      const r = rScale && p.size != null ? Math.max(1, rScale(p.size)) : radiusRange[0];
      const fill = p.color ?? s.color ?? vvar('palette', PALETTE_KEYS[si % PALETTE_KEYS.length]);
      return (
        <g key={p.id}>
          <circle
            data-bbangto-viz-point
            data-bbangto-viz-point-id={p.id}
            data-bbangto-viz-point-series={s.id}
            data-viz-part="shape"
            cx={xScale(p.x)}
            cy={yScale(p.y)}
            r={r}
            style={{ fill, fillOpacity: 0.72, stroke: fill, strokeWidth: 1 }}
          />
          {p.label != null && (
            <text
              data-bbangto-viz-point-label
              x={xScale(p.x)}
              y={yScale(p.y) - r - 3}
              textAnchor="middle"
              fontSize={10}
              fontFamily={resolveLabelFont(p.label)}
              style={{ fill: vvar('shape', 'stroke') }}
            >
              {p.label}
            </text>
          )}
        </g>
      );
    }),
  );

  const yTicks: AxisTick[] = niceTicks(yMin, yMax).map((t) => ({ pos: yScale(t), label: formatValue(t) }));
  const xTicks: AxisTick[] = niceTicks(xMin, xMax).map((t) => ({ pos: xScale(t), label: formatValue(t) }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="scatter" {...canvasProps}>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} />
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} />
      {dots}
    </Canvas>
  );
}

ScatterPlot.displayName = 'ScatterPlot';
