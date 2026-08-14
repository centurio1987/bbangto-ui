import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { parseViewBox } from '../geometry/layout';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface ListInfographicItem {
  id: string;
  title: string;
  description?: string;
  /** 아이콘 글리프 대체 텍스트(1~2자). 미지정 시 순번. */
  glyph?: string;
}

export interface ListInfographicProps extends Omit<CanvasProps, 'data'> {
  data?: { items: ListInfographicItem[] };
  children?: ReactNode;
}

/** List infographic (VT-603) — 아이콘 배지 + 항목 목록. headless. */
export function ListInfographic({
  data,
  viewBox,
  children,
  title = 'List infographic',
  ...canvasProps
}: ListInfographicProps) {
  const [vbX, vbY, , vbH] = parseViewBox(viewBox, [0, 0, 480, 260]);

  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="list-infographic" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const items = data.items;
  const n = items.length;
  const rowH = n ? (vbH - 32) / n : 0;
  const badgeR = Math.min(22, rowH * 0.32);
  const leftX = vbX + 24;

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="list-infographic" {...canvasProps}>
      {items.map((item, i) => {
        const cy = vbY + 16 + rowH * i + rowH / 2;
        const textX = leftX + badgeR + 20;
        return (
          <g key={item.id} data-bbangto-viz-list-item data-bbangto-viz-list-item-id={item.id}>
            <circle data-viz-part="shape" cx={leftX + badgeR} cy={cy} r={badgeR} style={{ fill: vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]) }} />
            <text x={leftX + badgeR} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={800} fontFamily={resolveLabelFont(item.glyph)} style={{ fill: vvar('shape', 'stroke') }}>
              {item.glyph ?? String(i + 1)}
            </text>
            <text x={textX} y={cy - 8} fontSize={14} fontWeight={700} fontFamily={vvar('typography', 'titleFont')} style={{ fill: vvar('shape', 'stroke') }}>
              {item.title}
            </text>
            {item.description && (
              <text x={textX} y={cy + 12} fontSize={11} fontFamily={resolveLabelFont(item.description)} style={{ fill: vvar('boundary', 'labelColor') }}>
                {item.description}
              </text>
            )}
          </g>
        );
      })}
    </Canvas>
  );
}

ListInfographic.displayName = 'ListInfographic';
