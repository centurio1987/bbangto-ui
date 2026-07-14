import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox, radialPositions, donutSegmentPath } from '../geometry/layout';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface PieChartDatum {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { items: PieChartDatum[] };
  mode?: 'pie' | 'donut';
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

/** Pie/Donut chart (VT-506) — RingSegment 재사용. headless: 각 조각 값 텍스트 병기. */
export function PieChart({
  data,
  mode = 'pie',
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Pie chart',
  ...canvasProps
}: PieChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 420, 360]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="pie" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const items = data.items;
  const total = items.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;
  const cx = vbX + vbW / 2;
  const cy = vbY + vbH / 2;
  const size = Math.min(vbW, vbH);
  const rOuter = size * 0.36;
  const rInner = mode === 'donut' ? size * 0.2 : 0;
  const labelR = rOuter + size * 0.08;

  // 라벨 각도를 위해 조각 중앙각을 누적 계산
  let acc = -90;
  const slices = items.map((d, i) => {
    const frac = Math.max(0, d.value) / total;
    const start = acc;
    const end = acc + frac * 360;
    acc = end;
    return { d, i, start, end, mid: (start + end) / 2 };
  });

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="pie" {...canvasProps}>
      {slices.map(({ d, i, start, end }) => (
        <path
          key={d.id}
          data-bbangto-viz-slice
          data-bbangto-viz-slice-id={d.id}
          data-viz-part="shape"
          d={donutSegmentPath(cx, cy, rOuter, rInner, start, end)}
          style={{ fill: d.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), stroke: vvar('canvas', 'bg'), strokeWidth: 1.5 }}
        />
      ))}
      {/* donut 중앙 합계 무의미 → 각 조각 외부 라벨(값 병기) */}
      {slices.map(({ d, mid }) => {
        const [pt] = radialPositions(1, cx, cy, labelR, mid);
        const anchor = pt.x < cx - 4 ? 'end' : pt.x > cx + 4 ? 'start' : 'middle';
        return (
          <text
            key={`l-${d.id}`}
            data-bbangto-viz-slice-label
            x={pt.x}
            y={pt.y}
            textAnchor={anchor}
            dominantBaseline="central"
            fontSize={12}
            fontWeight={600}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {`${d.label} ${formatValue(d.value)}`}
          </text>
        );
      })}
    </Canvas>
  );
}

PieChart.displayName = 'PieChart';
