import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox, distributeCenters } from '../geometry/layout';
import { linearScale } from '../geometry/scale';

export interface SpectrumAxis {
  id: string;
  leftLabel: string;
  rightLabel: string;
  /** 0~100 위치. */
  value: number;
  label?: string;
  color?: string;
}

export interface SpectrumSliderProps extends Omit<CanvasProps, 'data'> {
  data?: { axes: SpectrumAxis[]; domain?: [number, number] };
  children?: ReactNode;
}

const PAD = { left: 110, right: 110, top: 30, bottom: 30 } as const;

/** Spectrum slider (VT-710) — 대립축 다축 척도 + 위치 dot. headless: 값 텍스트 병기. */
export function SpectrumSlider({ data, viewBox, children, title = 'Spectrum slider', ...canvasProps }: SpectrumSliderProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 560, 260]);

  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="spectrum-slider" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const [dMin, dMax] = data.domain ?? [0, 100];
  const trackLeft = vbX + PAD.left;
  const trackRight = vbX + vbW - PAD.right;
  const xScale = linearScale([dMin, dMax], [trackLeft, trackRight]);
  const ys = distributeCenters(data.axes.length, vbY + PAD.top, vbY + vbH - PAD.bottom);

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="spectrum-slider" {...canvasProps}>
      {data.axes.map((a, i) => {
        const y = ys[i];
        const dotX = xScale(Math.max(dMin, Math.min(dMax, a.value)));
        const color = a.color ?? vvar('palette', 'p1');
        return (
          <g key={a.id} data-bbangto-viz-spectrum-axis data-bbangto-viz-spectrum-axis-id={a.id}>
            {/* 트랙 */}
            <path data-bbangto-viz-edge d={`M ${trackLeft} ${y} L ${trackRight} ${y}`} style={{ fill: 'none', strokeWidth: 3, opacity: 0.4 }} />
            {/* 양극 라벨 */}
            <text x={trackLeft - 12} y={y} textAnchor="end" dominantBaseline="central" fontSize={12} fontWeight={600} fontFamily={vvar('typography', 'titleFont')} style={{ fill: vvar('shape', 'stroke') }}>
              {a.leftLabel}
            </text>
            <text x={trackRight + 12} y={y} textAnchor="start" dominantBaseline="central" fontSize={12} fontWeight={600} fontFamily={vvar('typography', 'titleFont')} style={{ fill: vvar('shape', 'stroke') }}>
              {a.rightLabel}
            </text>
            {/* dot + 값 병기 */}
            <circle data-bbangto-viz-spectrum-dot cx={dotX} cy={y} r={8} style={{ fill: color }} />
            <text x={dotX} y={y - 14} textAnchor="middle" fontSize={11} fontWeight={700} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('shape', 'stroke') }}>
              {a.value}
            </text>
          </g>
        );
      })}
    </Canvas>
  );
}

SpectrumSlider.displayName = 'SpectrumSlider';
