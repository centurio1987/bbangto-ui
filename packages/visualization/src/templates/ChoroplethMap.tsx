import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { linearScale } from '../geometry/scale';

export interface ChoroplethRegion {
  id: string;
  /** SVG path d — caller 제공(투영 미지원, 고정 viewBox). */
  d: string;
  label?: string;
}

export interface ChoroplethItem {
  id: string;
  value: number;
}

export interface ChoroplethMapProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { regions: ChoroplethRegion[]; items: ChoroplethItem[] };
  domain?: [number, number];
  /** 채색 팔레트 키(단색 강도 램프). 기본 p1. */
  color?: string;
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

/**
 * Choropleth map (VT-518) — caller-supplied region path + 값 강도(fill-opacity).
 * region.id ↔ item.id 매칭으로 강도 할당. 미매칭 region→중립 fill, 미매칭 item→무시.
 * 투영 미지원·고정 viewBox. headless: 지역 중심에 값 텍스트 병기.
 */
export function ChoroplethMap({
  data,
  domain,
  color,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Choropleth map',
  ...canvasProps
}: ChoroplethMapProps) {
  if (children || !data || data.regions.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="choropleth" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { regions, items } = data;
  const valueById = new Map(items.map((it) => [it.id, it.value]));
  const values = items.map((it) => it.value);
  const vMin = domain?.[0] ?? (values.length ? Math.min(...values) : 0);
  const vMax = domain?.[1] ?? (values.length ? Math.max(...values) : 1);
  const opacity = linearScale([vMin, vMax], [0.15, 1]);
  const fill = color ?? vvar('palette', 'p1');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="choropleth" {...canvasProps}>
      {regions.map((r) => {
        const v = valueById.get(r.id);
        const matched = v != null;
        return (
          <path
            key={r.id}
            data-bbangto-viz-geo-region
            data-bbangto-viz-geo-region-id={r.id}
            data-viz-part="shape"
            d={r.d}
            style={{
              fill: matched ? fill : vvar('canvas', 'grid'),
              fillOpacity: matched && vMax !== vMin ? opacity(v) : matched ? 1 : 0.12,
              stroke: vvar('canvas', 'bg'),
              strokeWidth: 1.5,
            }}
          />
        );
      })}
      {regions.map((r) => {
        const v = valueById.get(r.id);
        if (r.label == null && v == null) return null;
        const [cx, cy] = pathCentroid(r.d);
        return (
          <text
            key={`l-${r.id}`}
            data-bbangto-viz-geo-region-label
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {v != null ? `${r.label ?? r.id} ${formatValue(v)}` : (r.label ?? r.id)}
          </text>
        );
      })}
    </Canvas>
  );
}

/** path d의 좌표 평균으로 중심 추정(간이). GeoMap과 동일 규약. */
function pathCentroid(d: string): [number, number] {
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  if (!xs.length || !ys.length) return [0, 0];
  return [xs.reduce((s, v) => s + v, 0) / xs.length, ys.reduce((s, v) => s + v, 0) / ys.length];
}

ChoroplethMap.displayName = 'ChoroplethMap';
