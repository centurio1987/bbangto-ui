import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { hexLayout } from '../geometry/hexgrid';
import { hexagonPath } from '../geometry/shapes';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface HoneycombCell {
  id: string;
  label: string;
  color?: string;
}

export interface HoneycombProps extends Omit<CanvasProps, 'data'> {
  data?: { cells: HoneycombCell[]; columns?: number };
  children?: ReactNode;
}

/** Honeycomb (VT-709) — 육각 셀 클러스터. hexLayout(flat) + hexagonPath. headless. */
/**
 * @vizType VT-709 Honeycomb · G. 개념 프레임워크 · dataShape: concept, comparison
 * @useWhen 다면 속성/기준을 육각 셀로 제시할 때
 * @avoidWhen 정량 축 비교는 Radar(VT-511) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Honeycomb({
  data,
  viewBox,
  children,
  title = 'Honeycomb',
  ...canvasProps
}: HoneycombProps) {
  const [vbX, vbY, vbW] = parseViewBox(viewBox, [0, 0, 360, 320]);

  if (children != null || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="honeycomb" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const cells = data.cells;
  const cols = Math.max(1, data.columns ?? 3);
  const margin = 20;
  // flat-top hex: 가로 배치폭 = (1.5·cols + 0.5)·s. 뷰포트에 맞춰 s 산정.
  const s = (vbW - margin * 2) / (1.5 * cols + 0.5);
  const laid = hexLayout(cells.length, { columns: cols, size: s, orientation: 'flat' });

  const stroke = vvar('shape', 'stroke');
  const hexW = 2 * s;
  const hexH = Math.sqrt(3) * s;

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="honeycomb" {...canvasProps}>
      {laid.map((cell, i) => {
        const item = cells[i];
        const cx = cell.cx + vbX + margin - s;
        const cy = cell.cy + vbY + margin;
        const bbox = { x: cx - s, y: cy - hexH / 2, width: hexW, height: hexH };
        return (
          <g key={item.id} data-bbangto-viz-hex-cell data-bbangto-viz-hex-cell-id={item.id}>
            <path data-viz-part="shape" d={hexagonPath(bbox)} style={{ fill: item.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), stroke, strokeWidth: 1.5 }} />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontWeight={700}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('shape', 'stroke') }}
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </Canvas>
  );
}

Honeycomb.displayName = 'Honeycomb';
