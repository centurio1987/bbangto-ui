import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, bandScale, niceTicks } from '../geometry/scale';
import { boxplotSummary, type FiveNumber } from '../geometry/boxplot';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

/** precomputed 5수 요약 입력(whisker/outlier 생략 시 min/max로 대체). */
export interface BoxplotSummaryInput {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  whiskerLow?: number;
  whiskerHigh?: number;
  outliers?: number[];
}

export interface BoxplotGroup {
  id: string;
  label: string;
  /** 원시 관측값(있으면 이걸로 요약 계산). */
  values?: number[];
  /** 사전 계산 요약(values 없을 때 사용). */
  summary?: BoxplotSummaryInput;
  color?: string;
}

export interface BoxplotProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { groups: BoxplotGroup[]; domain?: [number, number] };
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 48, right: 18, top: 22, bottom: 40 } as const;

function resolveSummary(g: BoxplotGroup): FiveNumber | undefined {
  if (g.values && g.values.length) return boxplotSummary(g.values);
  if (g.summary) {
    const s = g.summary;
    return {
      min: s.min,
      q1: s.q1,
      median: s.median,
      q3: s.q3,
      max: s.max,
      iqr: s.q3 - s.q1,
      whiskerLow: s.whiskerLow ?? s.min,
      whiskerHigh: s.whiskerHigh ?? s.max,
      outliers: s.outliers ?? [],
    };
  }
  return undefined;
}

/** Boxplot / box-and-whisker (VT-510) — group별 사분위 상자 + whisker + outlier. headless. */
/**
 * @vizType VT-510 Boxplot · E. 데이터 차트 · dataShape: distribution · 구조: quantitative
 * @useWhen 중앙값·사분위·이상치로 분포를 요약할 때
 * @useWhen 여러 그룹 분포를 비교할 때
 * @avoidWhen 원자료 빈도 형태는 Histogram(VT-508) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Boxplot({
  data,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Boxplot',
  ...canvasProps
}: BoxplotProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 460, 300]);

  if (children != null || !data || data.groups.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="boxplot" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const resolved = data.groups
    .map((g) => ({ group: g, summary: resolveSummary(g) }))
    .filter((r): r is { group: BoxplotGroup; summary: FiveNumber } => r.summary != null);

  const allValues = resolved.flatMap((r) => [r.summary.whiskerLow, r.summary.whiskerHigh, ...r.summary.outliers]);
  const vMin = data.domain?.[0] ?? Math.min(...allValues);
  const vMax = data.domain?.[1] ?? Math.max(...allValues);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const yScale = linearScale([vMin, vMax], [plotBottom, plotTop]);
  const band = bandScale(resolved.length, [plotLeft, plotRight], { paddingInner: 0.5 });

  const edge = vvar('edge', 'stroke');
  const stroke = vvar('shape', 'stroke');

  const yTicks: AxisTick[] = niceTicks(vMin, vMax).map((t) => ({ pos: yScale(t), label: formatValue(t) }));
  const xTicks: AxisTick[] = resolved.map((r, i) => ({ pos: band.center(i), label: r.group.label }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="boxplot" {...canvasProps}>
      <Axis orientation="y" x={plotLeft} y={plotTop} length={plotBottom - plotTop} ticks={yTicks} />
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} tickSize={0} />
      {resolved.map((r, i) => {
        const s = r.summary;
        const bx = band.position(i);
        const bw = band.bandwidth;
        const cx = band.center(i);
        const yQ1 = yScale(s.q1);
        const yQ3 = yScale(s.q3);
        const fill = r.group.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]);
        return (
          <g key={r.group.id} data-bbangto-viz-box-group data-bbangto-viz-box-group-id={r.group.id}>
            {/* whisker: 세로선 + 상/하 캡 */}
            <line
              data-bbangto-viz-whisker
              x1={cx}
              y1={yScale(s.whiskerHigh)}
              x2={cx}
              y2={yScale(s.whiskerLow)}
              style={{ stroke: edge, strokeWidth: 1.5 }}
            />
            <line data-bbangto-viz-edge x1={cx - bw / 4} y1={yScale(s.whiskerHigh)} x2={cx + bw / 4} y2={yScale(s.whiskerHigh)} style={{ stroke: edge, strokeWidth: 1.5 }} />
            <line data-bbangto-viz-edge x1={cx - bw / 4} y1={yScale(s.whiskerLow)} x2={cx + bw / 4} y2={yScale(s.whiskerLow)} style={{ stroke: edge, strokeWidth: 1.5 }} />
            {/* 상자 q1..q3 */}
            <rect
              data-bbangto-viz-box
              data-bbangto-viz-box-id={r.group.id}
              data-viz-part="shape"
              x={bx}
              y={yQ3}
              width={bw}
              height={Math.max(1, yQ1 - yQ3)}
              style={{ fill, fillOpacity: 0.55, stroke, strokeWidth: 1.5 }}
            />
            {/* median 선 */}
            <line
              data-bbangto-viz-median
              x1={bx}
              y1={yScale(s.median)}
              x2={bx + bw}
              y2={yScale(s.median)}
              style={{ stroke, strokeWidth: 2 }}
            />
            {/* outlier dots */}
            {s.outliers.map((v, oi) => (
              <circle
                key={oi}
                data-bbangto-viz-outlier
                data-viz-part="shape"
                cx={cx}
                cy={yScale(v)}
                r={2.5}
                style={{ fill, stroke, strokeWidth: 1 }}
              />
            ))}
            {/* median 값 텍스트 병기 */}
            <text
              data-bbangto-viz-box-value
              x={bx + bw + 4}
              y={yScale(s.median)}
              dominantBaseline="central"
              fontSize={10}
              fontFamily={vvar('typography', 'monoFont')}
              style={{ fill: stroke }}
            >
              {formatValue(s.median)}
            </text>
          </g>
        );
      })}
    </Canvas>
  );
}

Boxplot.displayName = 'Boxplot';
