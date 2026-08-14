import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { parseViewBox } from '../geometry/layout';
import { bandScale, linearScale } from '../geometry/scale';

export interface HeatmapCell {
  row: string;
  col: string;
  value: number;
}

export interface HeatmapProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { rows: string[]; cols: string[]; cells: HeatmapCell[] };
  domain?: [number, number];
  /** 셀 채색 팔레트 키(단색 강도 램프). 기본 p1. */
  color?: string;
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 64, right: 16, top: 20, bottom: 40 } as const;

/**
 * Heatmap (VT-512) — 격자 색 강도. 신규 paint 채널 없이 팔레트색+fill-opacity 스케일.
 * 권장 상한 ~20×20(초과는 렌더하되 성능 비보증). headless: 셀 값 텍스트 병기.
 *
 * @vizType VT-512 Heatmap · E. 데이터 차트 · dataShape: correlation, magnitude · 구조: cross-axis, quantitative
 * @useWhen 격자 위 값의 강도를 색 농도로 표현할 때
 * @useWhen 달력/행렬 패턴을 볼 때
 * @avoidWhen 정확한 값 비교는 Bar(VT-501) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Heatmap({
  data,
  domain,
  color,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Heatmap',
  ...canvasProps
}: HeatmapProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 420, 320]);

  if (children || !data || data.cells.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="heatmap" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { rows, cols, cells } = data;
  const values = cells.map((c) => c.value);
  const vMin = domain?.[0] ?? Math.min(...values);
  const vMax = domain?.[1] ?? Math.max(...values);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const xBand = bandScale(cols.length, [plotLeft, plotRight], { paddingInner: 0.06 });
  const yBand = bandScale(rows.length, [plotTop, plotBottom], { paddingInner: 0.06 });
  const opacity = linearScale([vMin, vMax], [0.15, 1]);
  const fill = color ?? vvar('palette', 'p1');

  const lookup = new Map(cells.map((c) => [`${c.row}:${c.col}`, c.value]));

  const cellEls: ReactNode[] = [];
  rows.forEach((r, ri) => {
    cols.forEach((c, ci) => {
      const key = `${r}:${c}`;
      const v = lookup.get(key);
      if (v == null) return;
      const x = xBand.position(ci);
      const y = yBand.position(ri);
      const cx = xBand.center(ci);
      const cy = yBand.center(ri);
      cellEls.push(
        <g key={key}>
          <rect
            data-bbangto-viz-cell
            data-bbangto-viz-cell-id={key}
            data-viz-part="shape"
            x={x}
            y={y}
            width={xBand.bandwidth}
            height={yBand.bandwidth}
            style={{ fill, fillOpacity: vMax === vMin ? 1 : opacity(v) }}
          />
          <text
            data-bbangto-viz-cell-value
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight={700}
            fontFamily={vvar('typography', 'monoFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {formatValue(v)}
          </text>
        </g>,
      );
    });
  });

  const labelFill = vvar('edge', 'stroke');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="heatmap" {...canvasProps}>
      {/* 열 라벨(하단) */}
      {cols.map((c, ci) => (
        <text key={`col-${c}`} data-bbangto-viz-tick-label x={xBand.center(ci)} y={plotBottom + 16} textAnchor="middle" fontSize={11} fontFamily={resolveLabelFont(c)} style={{ fill: labelFill }}>
          {c}
        </text>
      ))}
      {/* 행 라벨(좌측) */}
      {rows.map((r, ri) => (
        <text key={`row-${r}`} data-bbangto-viz-tick-label x={plotLeft - 8} y={yBand.center(ri)} textAnchor="end" dominantBaseline="central" fontSize={11} fontFamily={resolveLabelFont(r)} style={{ fill: labelFill }}>
          {r}
        </text>
      ))}
      {cellEls}
    </Canvas>
  );
}

Heatmap.displayName = 'Heatmap';
