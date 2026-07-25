import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox, radialPositions } from '../geometry/layout';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface RadarSeries {
  id: string;
  label?: string;
  color?: string;
  /** axes와 같은 순서·길이의 값 배열. */
  values: number[];
}

export interface RadarChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { axes: string[]; series: RadarSeries[]; max?: number };
  children?: ReactNode;
}

const RINGS = 4;

/** Radar chart (VT-511) — 방사 다축 다각형. headless: 축 라벨 텍스트 노출, palette+fill-opacity. */
export function RadarChart({
  data,
  viewBox,
  children,
  title = 'Radar chart',
  ...canvasProps
}: RadarChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 420, 420]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="radar" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { axes, series } = data;
  const n = axes.length;
  const max = data.max ?? Math.max(1, ...series.flatMap((s) => s.values));
  const cx = vbX + vbW / 2;
  const cy = vbY + vbH / 2;
  const radius = Math.min(vbW, vbH) * 0.36;
  const axisPts = radialPositions(n, cx, cy, radius); // 값=max 위치

  const pointAt = (axisIndex: number, value: number) => {
    const t = Math.max(0, Math.min(1, value / max));
    const p = axisPts[axisIndex];
    return { x: cx + (p.x - cx) * t, y: cy + (p.y - cy) * t };
  };

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="radar" {...canvasProps}>
      {/* 동심 그리드 링 */}
      {Array.from({ length: RINGS }, (_, r) => {
        const frac = (r + 1) / RINGS;
        const ringD = axisPts
          .map((p, i) => `${i === 0 ? 'M' : 'L'} ${cx + (p.x - cx) * frac} ${cy + (p.y - cy) * frac}`)
          .join(' ') + ' Z';
        return <path key={`ring-${r}`} data-bbangto-viz-edge d={ringD} style={{ fill: 'none' }} />;
      })}
      {/* 축 스포크 + 라벨 */}
      {axisPts.map((p, i) => (
        <g key={`ax-${i}`} data-bbangto-viz-radar-axis>
          <path data-bbangto-viz-edge d={`M ${cx} ${cy} L ${p.x} ${p.y}`} style={{ fill: 'none' }} />
          <text
            x={p.x + (p.x - cx) * 0.08}
            y={p.y + (p.y - cy) * 0.08}
            textAnchor={p.x < cx - 4 ? 'end' : p.x > cx + 4 ? 'start' : 'middle'}
            dominantBaseline="central"
            fontSize={11}
            fontWeight={600}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {axes[i]}
          </text>
        </g>
      ))}
      {/* 시리즈 다각형 */}
      {series.map((s, si) => {
        const color = s.color ?? vvar('palette', PALETTE_KEYS[si % PALETTE_KEYS.length]);
        const d = s.values
          .map((v, i) => {
            const pt = pointAt(i, v);
            return `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
          })
          .join(' ') + ' Z';
        return (
          <path
            key={s.id}
            data-bbangto-viz-radar-series
            data-bbangto-viz-radar-series-id={s.id}
            d={d}
            style={{ fill: color, fillOpacity: 0.18, stroke: color, strokeWidth: 2 }}
          />
        );
      })}
    </Canvas>
  );
}

RadarChart.displayName = 'RadarChart';
