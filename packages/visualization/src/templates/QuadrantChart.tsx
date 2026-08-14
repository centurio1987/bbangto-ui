import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { parseViewBox } from '../geometry/layout';
import { linearScale } from '../geometry/scale';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface QuadrantItem {
  id: string;
  label: string;
  x: number;
  y: number;
  color?: string;
}

export interface QuadrantChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: {
    items: QuadrantItem[];
    xDomain?: [number, number];
    yDomain?: [number, number];
    xAxisLabel?: string;
    yAxisLabel?: string;
    /** [top-left, top-right, bottom-right, bottom-left] */
    quadrantLabels?: [string, string, string, string];
  };
  children?: ReactNode;
}

const PAD = 44;

/** Quadrant chart (VT-702) — 두 축 교차 4분면 + 산점. headless: 값(x,y)은 위치+라벨로 노출. */
export function QuadrantChart({
  data,
  viewBox,
  children,
  title = 'Quadrant chart',
  ...canvasProps
}: QuadrantChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 420, 420]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="quadrant" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const [xMin, xMax] = data.xDomain ?? [0, 100];
  const [yMin, yMax] = data.yDomain ?? [0, 100];

  const left = vbX + PAD;
  const right = vbX + vbW - PAD;
  const top = vbY + PAD;
  const bottom = vbY + vbH - PAD;

  const xScale = linearScale([xMin, xMax], [left, right]);
  const yScale = linearScale([yMin, yMax], [bottom, top]);
  const midX = (left + right) / 2;
  const midY = (top + bottom) / 2;

  const quadCorners: Array<{ x: number; y: number; anchor: 'start' | 'end' }> = [
    { x: left + 8, y: top + 14, anchor: 'start' }, // TL
    { x: right - 8, y: top + 14, anchor: 'end' }, // TR
    { x: right - 8, y: bottom - 8, anchor: 'end' }, // BR
    { x: left + 8, y: bottom - 8, anchor: 'start' }, // BL
  ];

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="quadrant" {...canvasProps}>
      {/* 교차 축: 세로(x 중앙) + 가로(y 중앙) */}
      <Axis orientation="y" x={midX} y={top} length={bottom - top} showDomain tickSize={0} />
      <Axis orientation="x" x={left} y={midY} length={right - left} showDomain tickSize={0} />
      {data.quadrantLabels?.map((lbl, i) => (
        <text
          key={i}
          data-bbangto-viz-quadrant-label
          x={quadCorners[i].x}
          y={quadCorners[i].y}
          textAnchor={quadCorners[i].anchor}
          fontSize={12}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('shape', 'stroke'), opacity: 0.7 }}
        >
          {lbl}
        </text>
      ))}
      {data.items.map((it, i) => {
        const cx = xScale(it.x);
        const cy = yScale(it.y);
        return (
          <g key={it.id}>
            <circle
              data-bbangto-viz-point
              data-bbangto-viz-point-id={it.id}
              cx={cx}
              cy={cy}
              r={6}
              style={{ fill: it.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]) }}
            />
            <text
              x={cx + 9}
              y={cy}
              dominantBaseline="central"
              fontSize={11}
              fontWeight={600}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('shape', 'stroke') }}
            >
              {it.label}
            </text>
          </g>
        );
      })}
      {(data.xAxisLabel || data.yAxisLabel) && (
        <>
          {data.xAxisLabel && (
            <text x={right} y={midY - 6} textAnchor="end" fontSize={11} fontStyle="italic" fontFamily={resolveLabelFont(data.xAxisLabel)} style={{ fill: vvar('edge', 'stroke') }}>
              {data.xAxisLabel} →
            </text>
          )}
          {data.yAxisLabel && (
            <text x={midX + 6} y={top} fontSize={11} fontStyle="italic" fontFamily={resolveLabelFont(data.yAxisLabel)} style={{ fill: vvar('edge', 'stroke') }}>
              ↑ {data.yAxisLabel}
            </text>
          )}
        </>
      )}
    </Canvas>
  );
}

QuadrantChart.displayName = 'QuadrantChart';
