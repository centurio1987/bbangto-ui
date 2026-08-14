import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, niceTicks } from '../geometry/scale';
import { histogramBins } from '../geometry/histogram';

export interface HistogramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { values: number[] };
  /** 균등 구간 개수(기본 10). thresholds 지정 시 무시. */
  bins?: number;
  /** 명시 경계값(오름차순). bins보다 우선. */
  thresholds?: number[];
  color?: string;
  formatValue?: (n: number) => string;
  formatCount?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 44, right: 18, top: 22, bottom: 36 } as const;

/** Histogram (VT-508) — 연속값 구간 빈도. histogramBins geometry 재사용. */
/**
 * @vizType VT-508 Histogram · E. 데이터 차트 · dataShape: distribution · 구조: quantitative
 * @useWhen 연속 변수의 구간별 빈도 분포를 볼 때
 * @avoidWhen 범주 비교는 Bar(VT-501) 사용
 * @avoidWhen 사분위 요약은 Boxplot(VT-510) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Histogram({
  data,
  bins,
  thresholds,
  color,
  formatValue = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1)),
  formatCount = (n) => String(n),
  viewBox,
  children,
  title = 'Histogram',
  ...canvasProps
}: HistogramProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 300]);

  if (children || !data || data.values.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="histogram" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const hist = histogramBins(data.values, { bins, thresholds });
  const xMin = hist[0].x0;
  const xMax = hist[hist.length - 1].x1;
  const maxCount = Math.max(1, ...hist.map((b) => b.count));

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const xScale = linearScale([xMin, xMax], [plotLeft, plotRight]);
  const yScale = linearScale([0, maxCount], [plotBottom, plotTop]);
  const fill = color ?? vvar('palette', 'p1');

  const bars: ReactNode[] = hist.map((b, i) => {
    const x0 = xScale(b.x0);
    const x1 = xScale(b.x1);
    const yTop = yScale(b.count);
    return (
      <g key={i}>
        <rect
          data-bbangto-viz-bar
          data-bbangto-viz-bar-bin={String(i)}
          data-viz-part="shape"
          x={x0}
          y={yTop}
          width={Math.max(0, x1 - x0 - 1)}
          height={plotBottom - yTop}
          style={{ fill }}
        />
        {b.count > 0 && (
          <text
            data-bbangto-viz-bar-value
            x={(x0 + x1) / 2}
            y={yTop - 5}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fontFamily={vvar('typography', 'monoFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {formatCount(b.count)}
          </text>
        )}
      </g>
    );
  });

  const yTicks: AxisTick[] = niceTicks(0, maxCount).map((t) => ({ pos: yScale(t), label: formatCount(t) }));
  const xTicks: AxisTick[] = hist
    .map((b) => b.x0)
    .concat(xMax)
    .map((v) => ({ pos: xScale(v), label: formatValue(v) }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="histogram" {...canvasProps}>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} />
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} />
      {bars}
    </Canvas>
  );
}

Histogram.displayName = 'Histogram';
