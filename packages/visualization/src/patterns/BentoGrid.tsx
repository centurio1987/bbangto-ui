import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface BentoCell {
  id: string;
  col: number;
  row: number;
  colSpan?: number;
  rowSpan?: number;
  title: string;
  value?: string;
  color?: string;
}

export interface BentoGridProps extends Omit<CanvasProps, 'data'> {
  data?: { cells: BentoCell[]; cols?: number; rows?: number };
  gap?: number;
  children?: ReactNode;
}

const PAD = 16;

/** Bento grid (VT-607) — 비대칭 모듈 격자. headless(셀 겹침 없음). */
export function BentoGrid({ data, gap = 10, viewBox, children, title = 'Bento grid', ...canvasProps }: BentoGridProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 360]);

  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="bento-grid" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const cols = data.cols ?? Math.max(...data.cells.map((c) => c.col + (c.colSpan ?? 1)));
  const rows = data.rows ?? Math.max(...data.cells.map((c) => c.row + (c.rowSpan ?? 1)));
  const gridW = vbW - PAD * 2;
  const gridH = vbH - PAD * 2;
  const cellW = (gridW - gap * (cols - 1)) / cols;
  const cellH = (gridH - gap * (rows - 1)) / rows;

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="bento-grid" {...canvasProps}>
      {data.cells.map((c, i) => {
        const cs = c.colSpan ?? 1;
        const rs = c.rowSpan ?? 1;
        const x = vbX + PAD + c.col * (cellW + gap);
        const y = vbY + PAD + c.row * (cellH + gap);
        const w = cellW * cs + gap * (cs - 1);
        const h = cellH * rs + gap * (rs - 1);
        return (
          <g key={c.id} data-bbangto-viz-bento-cell data-bbangto-viz-bento-cell-id={c.id}>
            <rect
              data-viz-part="shape"
              x={x}
              y={y}
              width={w}
              height={h}
              rx={12}
              style={{ fill: c.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), fillOpacity: 0.9 }}
            />
            <text x={x + 14} y={y + 26} fontSize={13} fontWeight={700} fontFamily={vvar('typography', 'titleFont')} style={{ fill: vvar('canvas', 'bg') }}>
              {c.title}
            </text>
            {c.value && (
              <text x={x + 14} y={y + 52} fontSize={20} fontWeight={800} fontFamily={vvar('typography', 'titleFont')} style={{ fill: vvar('canvas', 'bg') }}>
                {c.value}
              </text>
            )}
          </g>
        );
      })}
    </Canvas>
  );
}

BentoGrid.displayName = 'BentoGrid';
