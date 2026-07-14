import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { Edge } from '../atoms/Edge';
import { RingSegment } from '../atoms/RingSegment';
import { vvar } from '../tokens/contract';
import { radialPositions, parseViewBox } from '../geometry/layout';

export interface CycleItemSpec {
  label: string;
}

export type CycleMode = 'ring' | 'orbit' | 'spiral';

export interface CycleProps extends Omit<CanvasProps, 'data'> {
  data?: { items: readonly CycleItemSpec[]; center?: string };
  mode?: CycleMode;
  children?: ReactNode;
}

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

/**
 * Cycle 패턴 — 순환 프로세스(headless).
 * 레퍼런스: infographic hd_06(원형 노드 체인), hd_02 RADIALS, system minimal_08(원형 phase).
 * ring: 아크 세그먼트가 원을 순환 폐쇄. orbit: 방사 노드 + 마지막→처음 커넥터.
 */
export function Cycle({ data, mode = 'ring', children, viewBox, ...canvasProps }: CycleProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 420, 420]);
  const cx = vbX + vbW / 2;
  const cy = vbY + vbH / 2;

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="cycle" {...canvasProps}>
      {data
        ? mode === 'orbit'
          ? renderOrbit(data, cx, cy, Math.min(vbW, vbH))
          : mode === 'spiral'
            ? renderSpiral(data, cx, cy, Math.min(vbW, vbH))
            : renderRing(data, cx, cy, Math.min(vbW, vbH))
        : children}
    </Canvas>
  );
}

function renderRing(
  data: { items: readonly CycleItemSpec[]; center?: string },
  cx: number,
  cy: number,
  size: number,
): ReactNode {
  const items = data.items;
  const n = items.length;
  if (!n) return null;
  const rOuter = size * 0.34;
  const rInner = size * 0.22;
  const gapDeg = 4;
  const span = 360 / n;
  const labelR = size * 0.42;
  const labelPositions = radialPositions(n, cx, cy, labelR, -90 + span / 2);

  return (
    <>
      {/* 중앙 허브 — 계약 paint(shape) */}
      <circle data-viz-part="shape" cx={cx} cy={cy} r={rInner - 10} />
      {data.center && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={15}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('shape', 'stroke') }}
        >
          {data.center}
        </text>
      )}
      {items.map((_item, i) => {
        const start = -90 + span * i + gapDeg / 2;
        const end = -90 + span * (i + 1) - gapDeg / 2;
        return (
          <RingSegment
            key={i}
            cx={cx}
            cy={cy}
            rOuter={rOuter}
            rInner={rInner}
            startAngle={start}
            endAngle={end}
            fill={vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length])}
          />
        );
      })}
      {items.map((item, i) => (
        <text
          key={`l${i}`}
          x={labelPositions[i].x}
          y={labelPositions[i].y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={13}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('shape', 'stroke') }}
        >
          {item.label}
        </text>
      ))}
    </>
  );
}

function renderSpiral(
  data: { items: readonly CycleItemSpec[]; center?: string },
  cx: number,
  cy: number,
  size: number,
): ReactNode {
  const items = data.items;
  const n = items.length;
  if (!n) return null;
  const nodeW = 104;
  const nodeH = 38;
  const rMax = size * 0.4;
  const rMin = size * 0.12;
  const turns = 1.25; // 아르키메데스 나선 회전수
  // 안쪽(첫 단계)→바깥(마지막 단계)으로 반경·각 증가.
  const positions = Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0 : i / (n - 1);
    const r = rMin + (rMax - rMin) * t;
    const angleDeg = -90 + turns * 360 * t;
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  return (
    <>
      {data.center && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={15}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('shape', 'stroke') }}
        >
          {data.center}
        </text>
      )}
      {positions.slice(0, -1).map((p, i) => (
        <Edge key={`e${i}`} from={p} to={positions[i + 1]} routing="curved" markerEnd="arrow" />
      ))}
      {positions.map((p, i) => (
        <g key={i} data-viz-cycle-node>
          <Node id={`cycle-${i}`} x={p.x - nodeW / 2} y={p.y - nodeH / 2} width={nodeW} height={nodeH} shape="stadium" />
          <NodeLabel x={p.x - nodeW / 2} y={p.y} width={nodeW} title={items[i].label} fontSize={12} />
        </g>
      ))}
    </>
  );
}

function renderOrbit(
  data: { items: readonly CycleItemSpec[]; center?: string },
  cx: number,
  cy: number,
  size: number,
): ReactNode {
  const items = data.items;
  const n = items.length;
  if (!n) return null;
  const orbitR = size * 0.34;
  const nodeW = 108;
  const nodeH = 40;
  const positions = radialPositions(n, cx, cy, orbitR);

  return (
    <>
      {data.center && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('shape', 'stroke') }}
        >
          {data.center}
        </text>
      )}
      {positions.map((p, i) => {
        const next = positions[(i + 1) % n];
        // 순환 폐쇄: 마지막→처음 포함 n개의 곡선 커넥터
        const midShrink = 0.82;
        return (
          <Edge
            key={`e${i}`}
            from={{ x: cx + (p.x - cx) * midShrink, y: cy + (p.y - cy) * midShrink }}
            to={{ x: cx + (next.x - cx) * midShrink, y: cy + (next.y - cy) * midShrink }}
            routing="curved"
            markerEnd="arrow"
          />
        );
      })}
      {positions.map((p, i) => (
        <g key={i} data-viz-cycle-node>
          <Node
            id={`cycle-${i}`}
            x={p.x - nodeW / 2}
            y={p.y - nodeH / 2}
            width={nodeW}
            height={nodeH}
            shape="stadium"
          />
          <NodeLabel x={p.x - nodeW / 2} y={p.y} width={nodeW} title={items[i].label} fontSize={12} />
        </g>
      ))}
    </>
  );
}
