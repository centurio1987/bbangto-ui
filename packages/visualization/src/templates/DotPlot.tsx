import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, bandScale, niceTicks, type BandScale } from '../geometry/scale';

export type DotPlotMode = 'dot' | 'dumbbell' | 'range';

export interface DotPlotItem {
  id: string;
  label: string;
  /** dot 모드 값. */
  value?: number;
  /** dumbbell/range 하한. */
  low?: number;
  /** dumbbell/range 상한. */
  high?: number;
  color?: string;
}

export interface DotPlotProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { items: DotPlotItem[] };
  mode?: DotPlotMode;
  domain?: [number, number];
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 88, right: 28, top: 20, bottom: 34 } as const;

interface RowCtx {
  xScale: (v: number) => number;
  band: BandScale;
  fmt: (n: number) => string;
}

/** 단일 값 dot. */
function renderDot(item: DotPlotItem, i: number, ctx: RowCtx): ReactNode {
  const v = item.value ?? 0;
  const cy = ctx.band.center(i);
  const cx = ctx.xScale(v);
  const fill = item.color ?? vvar('palette', 'p1');
  return (
    <g key={item.id}>
      <circle data-bbangto-viz-point data-bbangto-viz-point-id={item.id} data-viz-part="shape" cx={cx} cy={cy} r={6} style={{ fill }} />
      <text data-bbangto-viz-point-value x={cx + 10} y={cy} dominantBaseline="central" fontSize={11} fontWeight={700} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('shape', 'stroke') }}>
        {ctx.fmt(v)}
      </text>
    </g>
  );
}

/** low↔high 두 점 + 연결선. */
function renderDumbbell(item: DotPlotItem, i: number, ctx: RowCtx): ReactNode {
  const lo = item.low ?? 0;
  const hi = item.high ?? 0;
  const cy = ctx.band.center(i);
  const xLo = ctx.xScale(lo);
  const xHi = ctx.xScale(hi);
  const fill = item.color ?? vvar('palette', 'p1');
  return (
    <g key={item.id}>
      <line data-bbangto-viz-range data-bbangto-viz-range-id={item.id} x1={xLo} y1={cy} x2={xHi} y2={cy} data-bbangto-viz-edge style={{ stroke: vvar('edge', 'stroke'), strokeWidth: 2 }} />
      <circle data-bbangto-viz-point data-bbangto-viz-point-id={`${item.id}-lo`} data-viz-part="shape" cx={xLo} cy={cy} r={5} style={{ fill: vvar('palette', 'p3') }} />
      <circle data-bbangto-viz-point data-bbangto-viz-point-id={`${item.id}-hi`} data-viz-part="shape" cx={xHi} cy={cy} r={5} style={{ fill }} />
      <text data-bbangto-viz-point-value x={xHi + 8} y={cy} dominantBaseline="central" fontSize={10} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('shape', 'stroke') }}>
        {`${ctx.fmt(lo)}–${ctx.fmt(hi)}`}
      </text>
    </g>
  );
}

/** low↔high 범위 바(굵은 캡슐) + 라벨. */
function renderRange(item: DotPlotItem, i: number, ctx: RowCtx): ReactNode {
  const lo = item.low ?? 0;
  const hi = item.high ?? 0;
  const cy = ctx.band.center(i);
  const xLo = ctx.xScale(lo);
  const xHi = ctx.xScale(hi);
  const fill = item.color ?? vvar('palette', 'p1');
  const h = 10;
  return (
    <g key={item.id}>
      <rect data-bbangto-viz-range data-bbangto-viz-range-id={item.id} data-viz-part="shape" x={xLo} y={cy - h / 2} width={Math.max(1, xHi - xLo)} height={h} rx={h / 2} style={{ fill }} />
      <text data-bbangto-viz-point-value x={xHi + 8} y={cy} dominantBaseline="central" fontSize={10} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('shape', 'stroke') }}>
        {`${ctx.fmt(lo)}–${ctx.fmt(hi)}`}
      </text>
    </g>
  );
}

/**
 * Dot plot / dumbbell / range (VT-509) — 공통 x 스케일 공유, 모드별 서브렌더 분리.
 * headless: 값 텍스트 병기. 수평 배치(카테고리=y band, 값=x축).
 *
 * @vizType VT-509 Dot Plot · E. 데이터 차트 · dataShape: distribution, magnitude, ranking · 구조: paired, quantitative · mode="dot"(기본), mode="dumbbell", mode="range"
 * @useWhen 점으로 값을 표시하거나 dumbbell로 두 값 차이를 볼 때
 * @useWhen 범위(range)를 표현할 때
 * @avoidWhen 막대 길이 비교는 Bar(VT-501) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function DotPlot({
  data,
  mode = 'dot',
  domain,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Dot plot',
  ...canvasProps
}: DotPlotProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 240]);

  if (children || !data || data.items.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="dot-plot" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const items = data.items;
  const vals = items.flatMap((it) =>
    mode === 'dot' ? [it.value ?? 0] : [it.low ?? 0, it.high ?? 0],
  );
  const vMin = domain?.[0] ?? Math.min(0, ...vals);
  const vMax = domain?.[1] ?? Math.max(...vals, vMin + 1);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const xScale = linearScale([vMin, vMax], [plotLeft, plotRight]);
  const band = bandScale(items.length, [plotTop, plotBottom]);
  const ctx: RowCtx = { xScale, band, fmt: formatValue };

  const renderer = mode === 'dumbbell' ? renderDumbbell : mode === 'range' ? renderRange : renderDot;
  const rows = items.map((it, i) => renderer(it, i, ctx));

  const xTicks: AxisTick[] = niceTicks(vMin, vMax).map((t) => ({ pos: xScale(t), label: formatValue(t) }));
  const yTicks: AxisTick[] = items.map((it, i) => ({ pos: band.center(i), label: it.label }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="dot-plot" {...canvasProps}>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} tickSize={0} />
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} />
      {rows}
    </Canvas>
  );
}

DotPlot.displayName = 'DotPlot';
