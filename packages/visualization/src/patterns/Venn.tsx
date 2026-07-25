import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { vennCircles, type VennCircle } from '../geometry/venn';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface VennSetSpec {
  id: string;
  label: string;
  size: number;
  color?: string;
}

export interface VennIntersectionSpec {
  /** 교집합에 참여하는 set id들. */
  ids: string[];
  label: string;
}

export interface VennProps extends Omit<CanvasProps, 'data'> {
  data?: { sets: VennSetSpec[]; intersections?: VennIntersectionSpec[] };
  children?: ReactNode;
}

/** Venn (VT-306) — 집합 겹침. 2원 정밀+3원 대칭 근사. headless: 교집합 라벨 텍스트 병기. */
export function Venn({ data, viewBox, children, ...canvasProps }: VennProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 420, 360]);

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="venn" {...canvasProps}>
      {data ? renderVenn(data, { x: vbX, y: vbY, width: vbW, height: vbH }) : children}
    </Canvas>
  );
}

function renderVenn(
  data: { sets: VennSetSpec[]; intersections?: VennIntersectionSpec[] },
  box: { x: number; y: number; width: number; height: number },
): ReactNode {
  const circles = vennCircles(
    data.sets.map((s) => ({ id: s.id, size: s.size })),
    box,
  );
  const byId = new Map<string, VennCircle>(circles.map((c) => [c.id, c]));

  return (
    <>
      {circles.map((c, i) => {
        const spec = data.sets[i];
        return (
          <g key={c.id} data-bbangto-viz-venn-circle data-bbangto-viz-venn-circle-id={c.id}>
            <circle
              data-viz-part="shape"
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              style={{ fill: spec.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), fillOpacity: 0.32, stroke: spec.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), strokeWidth: 2 }}
            />
          </g>
        );
      })}
      {/* set 라벨: 원 중심에서 바깥쪽으로 */}
      {circles.map((c, i) => {
        const cxBox = box.x + box.width / 2;
        const cyBox = box.y + box.height / 2;
        const ux = c.cx - cxBox;
        const uy = c.cy - cyBox;
        const len = Math.hypot(ux, uy) || 1;
        const lx = c.cx + (ux / len) * c.r * 0.7;
        const ly = c.cy + (uy / len) * c.r * 0.7;
        return (
          <text
            key={`sl-${c.id}`}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={13}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {data.sets[i].label}
          </text>
        );
      })}
      {/* 교집합 라벨: 참여 원 중심들의 평균 위치 */}
      {(data.intersections ?? []).map((it, i) => {
        const pts = it.ids.map((id) => byId.get(id)).filter(Boolean) as VennCircle[];
        if (!pts.length) return null;
        const mx = pts.reduce((s, p) => s + p.cx, 0) / pts.length;
        const my = pts.reduce((s, p) => s + p.cy, 0) / pts.length;
        return (
          <text
            key={`is-${i}`}
            data-bbangto-viz-venn-label
            x={mx}
            y={my}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {it.label}
          </text>
        );
      })}
    </>
  );
}

Venn.displayName = 'Venn';
