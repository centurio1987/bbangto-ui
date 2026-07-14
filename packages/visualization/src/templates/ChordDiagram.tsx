import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox, donutSegmentPath } from '../geometry/layout';
import { chordLayout } from '../geometry/chord';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface ChordNode {
  id: string;
  label: string;
  color?: string;
}

export interface ChordDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { nodes: ChordNode[]; matrix: number[][] };
  /** 그룹 arc 두께(px). 기본 16. */
  ringWidth?: number;
  /** 그룹 간 여백(라디안). 기본 0.04. */
  padAngle?: number;
  children?: ReactNode;
}

const toDeg = (rad: number) => (rad * 180) / Math.PI;
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

/** Chord Diagram (VT-516) — 원 둘레 그룹 arc + 그룹 간 흐름 리본. chordLayout geometry. headless. */
export function ChordDiagram({
  data,
  ringWidth = 16,
  padAngle = 0.04,
  viewBox,
  children,
  title = 'Chord diagram',
  ...canvasProps
}: ChordDiagramProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 320, 320]);

  if (children != null || !data || data.nodes.length === 0) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="chord" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { nodes, matrix } = data;
  const cx = vbX + vbW / 2;
  const cy = vbY + vbH / 2;
  const rOuter = Math.min(vbW, vbH) * 0.42;
  const rInner = rOuter - ringWidth;

  const layout = chordLayout(matrix, { padAngle });
  const colorOf = (i: number) => nodes[i]?.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]);
  const stroke = vvar('shape', 'stroke');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="chord" {...canvasProps}>
      {/* 흐름 리본(arc 뒤에) */}
      {layout.chords.map((c, i) => {
        const s0 = polar(cx, cy, rInner, toDeg(c.source.startAngle));
        const s1 = polar(cx, cy, rInner, toDeg(c.source.endAngle));
        const t0 = polar(cx, cy, rInner, toDeg(c.target.startAngle));
        const t1 = polar(cx, cy, rInner, toDeg(c.target.endAngle));
        const srcLarge = c.source.endAngle - c.source.startAngle > Math.PI ? 1 : 0;
        const tgtLarge = c.target.endAngle - c.target.startAngle > Math.PI ? 1 : 0;
        const d =
          `M ${s0.x} ${s0.y} ` +
          `A ${rInner} ${rInner} 0 ${srcLarge} 1 ${s1.x} ${s1.y} ` +
          `Q ${cx} ${cy} ${t0.x} ${t0.y} ` +
          `A ${rInner} ${rInner} 0 ${tgtLarge} 1 ${t1.x} ${t1.y} ` +
          `Q ${cx} ${cy} ${s0.x} ${s0.y} Z`;
        return (
          <path
            key={`ribbon-${i}`}
            data-bbangto-viz-chord-ribbon
            data-viz-part="shape"
            d={d}
            style={{ fill: colorOf(c.source.index), fillOpacity: 0.45, stroke, strokeWidth: 0.75 }}
          />
        );
      })}
      {/* 그룹 arc + 라벨 */}
      {layout.groups.map((g) => {
        const midDeg = toDeg((g.startAngle + g.endAngle) / 2);
        const labelPos = polar(cx, cy, rOuter + 14, midDeg);
        return (
          <g key={nodes[g.index]?.id ?? g.index} data-bbangto-viz-chord-group data-bbangto-viz-chord-group-id={nodes[g.index]?.id}>
            <path
              data-bbangto-viz-chord-arc
              data-viz-part="shape"
              d={donutSegmentPath(cx, cy, rOuter, rInner, toDeg(g.startAngle), toDeg(g.endAngle))}
              style={{ fill: colorOf(g.index), stroke, strokeWidth: 1 }}
            />
            <text
              data-bbangto-viz-chord-label
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontWeight={700}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: stroke }}
            >
              {nodes[g.index]?.label}
            </text>
          </g>
        );
      })}
    </Canvas>
  );
}

ChordDiagram.displayName = 'ChordDiagram';
