import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { squarifyLayout } from '../geometry/treemap';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface TreemapDatum {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface TreemapProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { items: TreemapDatum[] };
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = 8;

/** Treemap (VT-507) — squarify 면적 분할. headless: 각 셀 값 텍스트 병기. */
export function Treemap({
  data,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Treemap',
  ...canvasProps
}: TreemapProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 480, 320]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="treemap" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const byId = new Map(data.items.map((d) => [d.id, d]));
  const cells = squarifyLayout(
    data.items.map((d) => ({ id: d.id, value: d.value })),
    { x: vbX + PAD, y: vbY + PAD, width: vbW - PAD * 2, height: vbH - PAD * 2 },
    { gap: 3 },
  );

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="treemap" {...canvasProps}>
      {cells.map((c, i) => {
        const d = byId.get(c.id)!;
        return (
          <g key={c.id} data-bbangto-viz-treemap-cell data-bbangto-viz-treemap-cell-id={c.id}>
            <rect
              data-viz-part="shape"
              x={c.x}
              y={c.y}
              width={c.width}
              height={c.height}
              style={{ fill: d.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]) }}
            />
            {c.width > 40 && c.height > 26 && (
              <>
                <text
                  x={c.x + 6}
                  y={c.y + 16}
                  fontSize={12}
                  fontWeight={700}
                  fontFamily={vvar('typography', 'titleFont')}
                  style={{ fill: vvar('canvas', 'bg') }}
                >
                  {d.label}
                </text>
                <text
                  data-bbangto-viz-treemap-value
                  x={c.x + 6}
                  y={c.y + 30}
                  fontSize={11}
                  fontFamily={vvar('typography', 'monoFont')}
                  style={{ fill: vvar('canvas', 'bg'), opacity: 0.85 }}
                >
                  {formatValue(d.value)}
                </text>
              </>
            )}
            {!(c.width > 40 && c.height > 26) && (
              <text data-bbangto-viz-treemap-value x={c.x + 3} y={c.y + 12} fontSize={9} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('canvas', 'bg') }}>
                {formatValue(d.value)}
              </text>
            )}
          </g>
        );
      })}
    </Canvas>
  );
}

Treemap.displayName = 'Treemap';
