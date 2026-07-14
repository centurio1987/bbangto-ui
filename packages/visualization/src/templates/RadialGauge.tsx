import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { StatNumber } from '../atoms/StatNumber';
import { vvar } from '../tokens/contract';
import { parseViewBox, donutSegmentPath, radialPositions } from '../geometry/layout';
import { linearScale, niceTicks } from '../geometry/scale';

export interface RadialGaugeProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { value: number; min?: number; max?: number; label?: string; unit?: string; color?: string };
  /** 게이지 각 범위(도). 기본 반원(-90~90 → 180° 아크, 12시 기준 좌하→우하). */
  startAngle?: number;
  endAngle?: number;
  children?: ReactNode;
}

/** Radial gauge (VT-519) — 아크 트랙 + 값 아크 + 눈금 + StatNumber(값 텍스트 필수). */
export function RadialGauge({
  data,
  startAngle = -180,
  endAngle = 0,
  viewBox,
  children,
  title = 'Radial gauge',
  ...canvasProps
}: RadialGaugeProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 320, 240]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="gauge" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { value, min = 0, max = 100, label, unit, color } = data;
  const cx = vbX + vbW / 2;
  const cy = vbY + vbH * 0.72;
  const rOuter = Math.min(vbW / 2, vbH * 0.72) * 0.92;
  const rInner = rOuter * 0.72;

  const angleScale = linearScale([min, max], [startAngle, endAngle]);
  const clamped = Math.max(min, Math.min(max, value));
  const valueAngle = angleScale(clamped);
  const arcColor = color ?? vvar('palette', 'p1');

  // 눈금(틱) — niceTicks를 각도로 매핑
  const ticks = niceTicks(min, max);
  const tickR1 = rOuter + 2;
  const tickR2 = rOuter + 8;

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="gauge" {...canvasProps}>
      <g data-bbangto-viz-gauge>
        {/* 트랙 */}
        <path
          data-viz-part="shape"
          d={donutSegmentPath(cx, cy, rOuter, rInner, startAngle, endAngle)}
          style={{ fillOpacity: 0.18 }}
        />
        {/* 값 아크 */}
        <path
          data-bbangto-viz-gauge-value
          d={donutSegmentPath(cx, cy, rOuter, rInner, startAngle, valueAngle)}
          style={{ fill: arcColor, stroke: 'none' }}
        />
        {/* 눈금 */}
        {ticks.map((t, i) => {
          const a = angleScale(t);
          const [p1] = radialPositions(1, cx, cy, tickR1, a);
          const [p2] = radialPositions(1, cx, cy, tickR2, a);
          return <path key={i} data-bbangto-viz-edge d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`} style={{ fill: 'none' }} />;
        })}
      </g>
      {/* 값 텍스트(필수 병기) */}
      <StatNumber x={cx} y={cy - rInner * 0.15} value={value} unit={unit} fontSize={30} />
      {label && (
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          fontSize={12}
          fontWeight={600}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('edge', 'stroke') }}
        >
          {label}
        </text>
      )}
    </Canvas>
  );
}

RadialGauge.displayName = 'RadialGauge';
