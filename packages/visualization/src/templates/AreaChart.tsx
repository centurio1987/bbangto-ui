import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, niceTicks } from '../geometry/scale';
import { stack } from '../geometry/stack';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface AreaPoint {
  x: number;
  y: number;
}

export interface AreaSeries {
  id: string;
  label: string;
  points: AreaPoint[];
  color?: string;
}

export interface AreaChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { series: AreaSeries[] };
  /** 시리즈를 누적(양수)해 쌓는다. 미지정 시 baseline(0) 기준 오버랩. */
  stacked?: boolean;
  xDomain?: [number, number];
  yDomain?: [number, number];
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 48, right: 18, top: 22, bottom: 36 } as const;

/** Area chart (VT-504) — 오버랩 또는 stacked. headless: 시리즈 라벨/끝값 병기. */
/**
 * @vizType VT-504 Area Chart · E. 데이터 차트 · dataShape: change-over-time, part-to-whole · 구조: sequential, quantitative
 * @useWhen 시간에 따른 총량 변화를 강조할 때
 * @useWhen 누적 구성 추세를 볼 때
 * @avoidWhen 개별 계열 값 비교는 Line(VT-503) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function AreaChart({
  data,
  stacked = false,
  xDomain,
  yDomain,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Area chart',
  ...canvasProps
}: AreaChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 300]);

  if (children || !data || data.series.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="area" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const series = data.series;
  const allX = series.flatMap((s) => s.points.map((p) => p.x));
  const xMin = xDomain?.[0] ?? Math.min(...allX);
  const xMax = xDomain?.[1] ?? Math.max(...allX);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  // stacked: 시리즈별 y 값을 index-정렬해 누적
  const spans = stacked ? stack(series.map((s) => s.points.map((p) => p.y))) : null;
  const yTops = series.map((s, si) =>
    s.points.map((p, i) => (spans ? spans[si][i].y1 : Math.max(0, p.y))),
  );
  const yMax = yDomain?.[1] ?? Math.max(1, ...yTops.flat());

  const xScale = linearScale([xMin, xMax], [plotLeft, plotRight]);
  const yScale = linearScale([0, yMax], [plotBottom, plotTop]);

  const areas: ReactNode[] = series.map((s, si) => {
    const topPts = s.points.map((p, i) => `${xScale(p.x)},${yScale(yTops[si][i])}`);
    const botPts = stacked
      ? s.points.map((p, i) => `${xScale(p.x)},${yScale(spans![si][i].y0)}`).reverse()
      : [`${xScale(s.points[s.points.length - 1].x)},${yScale(0)}`, `${xScale(s.points[0].x)},${yScale(0)}`];
    const d = `M ${topPts.join(' L ')} L ${botPts.join(' L ')} Z`;
    const fill = s.color ?? vvar('palette', PALETTE_KEYS[si % PALETTE_KEYS.length]);
    const last = s.points[s.points.length - 1];
    return (
      <g key={s.id}>
        <path
          data-bbangto-viz-area
          data-bbangto-viz-area-id={s.id}
          data-viz-part="shape"
          d={d}
          style={{ fill, fillOpacity: stacked ? 0.9 : 0.45, stroke: fill, strokeWidth: 1.5 }}
        />
        <text
          data-bbangto-viz-area-label
          x={xScale(last.x) - 4}
          y={yScale(yTops[si][s.points.length - 1]) - 4}
          textAnchor="end"
          fontSize={11}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('shape', 'stroke') }}
        >
          {`${s.label} ${formatValue(last.y)}`}
        </text>
      </g>
    );
  });

  const yTicks: AxisTick[] = niceTicks(0, yMax).map((t) => ({ pos: yScale(t), label: formatValue(t) }));
  const xTicks: AxisTick[] = niceTicks(xMin, xMax).map((t) => ({ pos: xScale(t), label: formatValue(t) }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="area" {...canvasProps}>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} />
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} />
      {areas}
    </Canvas>
  );
}

AreaChart.displayName = 'AreaChart';
