import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface GeoRegion {
  id: string;
  /** SVG path d — caller가 제공(투영 미지원, 고정 viewBox). */
  d: string;
  label?: string;
  value?: number;
  color?: string;
}

export interface GeoPin {
  id: string;
  x: number;
  y: number;
  label: string;
  value?: number;
}

export interface GeoMapProps extends Omit<CanvasProps, 'data'> {
  data?: { regions: GeoRegion[]; pins?: GeoPin[] };
  children?: ReactNode;
}

/** Geo map (VT-605) — caller-supplied region path + pins. headless(투영/좌표변환 없음). */
export function GeoMap({ data, viewBox, children, title = 'Geo map', ...canvasProps }: GeoMapProps) {
  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="geo-map" {...canvasProps}>
      {data ? renderGeo(data) : children}
    </Canvas>
  );
}

function renderGeo(data: { regions: GeoRegion[]; pins?: GeoPin[] }): ReactNode {
  return (
    <>
      {data.regions.map((r, i) => (
        <path
          key={r.id}
          data-bbangto-viz-geo-region
          data-bbangto-viz-geo-region-id={r.id}
          data-viz-part="shape"
          d={r.d}
          style={{ fill: r.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), fillOpacity: 0.55, stroke: vvar('canvas', 'bg'), strokeWidth: 1.5 }}
        />
      ))}
      {(data.pins ?? []).map((p) => (
        <g key={p.id} data-bbangto-viz-geo-pin data-bbangto-viz-geo-pin-id={p.id}>
          {/* 리더 틱 + 핀 */}
          <circle cx={p.x} cy={p.y} r={5} style={{ fill: vvar('shape', 'stroke') }} />
          <line x1={p.x} y1={p.y} x2={p.x} y2={p.y - 16} data-bbangto-viz-edge style={{ stroke: vvar('shape', 'stroke') }} />
          <text
            x={p.x}
            y={p.y - 20}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {p.value != null ? `${p.label} (${p.value})` : p.label}
          </text>
        </g>
      ))}
      {/* region 라벨 + 값 병기 */}
      {data.regions.map((r) => (r.label ? <GeoRegionLabel key={`rl-${r.id}`} region={r} /> : null))}
    </>
  );
}

function GeoRegionLabel({ region }: { region: GeoRegion }): ReactNode {
  // path 중심 추정: d의 좌표 평균(간이).
  const nums = region.d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  if (!xs.length || !ys.length) return null;
  const cx = xs.reduce((s, v) => s + v, 0) / xs.length;
  const cy = ys.reduce((s, v) => s + v, 0) / ys.length;
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
      fontFamily={vvar('typography', 'titleFont')}
      style={{ fill: vvar('canvas', 'bg') }}
    >
      {region.value != null ? `${region.label} ${region.value}` : region.label}
    </text>
  );
}

GeoMap.displayName = 'GeoMap';
