import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, bandScale, niceTicks } from '../geometry/scale';
import { waterfallSteps } from '../geometry/waterfall';

export interface WaterfallItem {
  id: string;
  label: string;
  /** 증감 delta. 음수 = 감소. */
  value: number;
}

export interface WaterfallChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { items: WaterfallItem[] };
  showTotal?: boolean;
  totalLabel?: string;
  domain?: [number, number];
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 48, right: 18, top: 22, bottom: 40 } as const;

/** Waterfall (VT-517) — running total 증감 막대. 증가/감소/합계 팔레트 구분. */
/**
 * @vizType VT-517 Waterfall · E. 데이터 차트 · dataShape: flow, part-to-whole · 구조: sequential, quantitative
 * @useWhen 증감을 누적해 최종 합계 도달 과정을 볼 때
 * @avoidWhen 이동량 흐름은 Sankey(VT-515) 사용
 * @avoidWhen 단순 구성비는 Stacked Bar(VT-502) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function WaterfallChart({
  data,
  showTotal = false,
  totalLabel = 'Total',
  domain,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Waterfall chart',
  ...canvasProps
}: WaterfallChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 500, 300]);

  if (children || !data || data.items.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="waterfall" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const items = data.items;
  const steps = waterfallSteps(items.map((it) => it.value), { showTotal });
  const labels = showTotal ? [...items.map((it) => it.label), totalLabel] : items.map((it) => it.label);
  const ids = showTotal ? [...items.map((it) => it.id), '__total__'] : items.map((it) => it.id);

  const bounds = steps.flatMap((s) => [s.start, s.end]);
  const vMin = domain?.[0] ?? Math.min(0, ...bounds);
  const vMax = domain?.[1] ?? Math.max(0, ...bounds);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const yScale = linearScale([vMin, vMax], [plotBottom, plotTop]);
  const band = bandScale(steps.length, [plotLeft, plotRight], { paddingInner: 0.35 });

  const colorFor = (delta: number, isTotal: boolean) =>
    isTotal ? vvar('palette', 'p3') : delta >= 0 ? vvar('palette', 'p1') : vvar('palette', 'p2');

  const bars: ReactNode[] = steps.map((s, i) => {
    const yTop = yScale(Math.max(s.start, s.end));
    const yBot = yScale(Math.min(s.start, s.end));
    const bx = band.position(i);
    const connectorY = yScale(s.end);
    return (
      <g key={ids[i]}>
        {/* 이전 막대 → 현재 시작 연결선 */}
        {i > 0 && !s.isTotal && (
          <line
            data-bbangto-viz-edge
            x1={band.position(i - 1)}
            y1={yScale(s.start)}
            x2={bx + band.bandwidth}
            y2={yScale(s.start)}
            style={{ stroke: vvar('edge', 'stroke'), strokeWidth: 1, strokeDasharray: '3 3' }}
          />
        )}
        <rect
          data-bbangto-viz-bar
          data-bbangto-viz-bar-id={ids[i]}
          data-bbangto-viz-bar-total={s.isTotal ? 'true' : undefined}
          data-viz-part="shape"
          x={bx}
          y={yTop}
          width={band.bandwidth}
          height={Math.max(1, yBot - yTop)}
          style={{ fill: colorFor(s.delta, s.isTotal) }}
        />
        <text
          data-bbangto-viz-bar-value
          x={band.center(i)}
          y={connectorY - 6 < plotTop ? yBot + 12 : yTop - 6}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          fontFamily={vvar('typography', 'monoFont')}
          style={{ fill: vvar('shape', 'stroke') }}
        >
          {`${s.delta >= 0 && !s.isTotal ? '+' : ''}${formatValue(s.delta)}`}
        </text>
      </g>
    );
  });

  const yTicks: AxisTick[] = niceTicks(vMin, vMax).map((t) => ({ pos: yScale(t), label: formatValue(t) }));
  const xTicks: AxisTick[] = labels.map((l, i) => ({ pos: band.center(i), label: l }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="waterfall" {...canvasProps}>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} />
      <Axis orientation="x" x={plotLeft} y={yScale(Math.max(vMin, Math.min(vMax, 0)))} length={plotRight - plotLeft} ticks={xTicks} tickSize={0} />
      {bars}
    </Canvas>
  );
}

WaterfallChart.displayName = 'WaterfallChart';
