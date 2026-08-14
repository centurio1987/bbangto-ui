import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, niceTicks } from '../geometry/scale';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface JourneyPhase {
  id: string;
  label: string;
  start: number;
  end: number;
  color?: string;
}

export interface UserJourneyGanttProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { phases: JourneyPhase[]; timeDomain?: [number, number] };
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 24, right: 24, top: 40, bottom: 34 } as const;

/** User journey gantt (VT-404) — 여정 phase pill을 단일 시간축에 배치. headless. */
/**
 * @vizType VT-404 User Journey Gantt · D. 시간축 · dataShape: temporal · 구조: sequential, quantitative
 * @useWhen 여정 단계를 날짜축과 결합해 일정화할 때
 * @avoidWhen 감정 곡선 여정은 User Journey Map(VT-205) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function UserJourneyGantt({
  data,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'User journey gantt',
  ...canvasProps
}: UserJourneyGanttProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 620, 240]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="journey-gantt" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const phases = data.phases;
  const tMin = data.timeDomain?.[0] ?? Math.min(...phases.map((p) => p.start), 0);
  const tMax = data.timeDomain?.[1] ?? Math.max(...phases.map((p) => p.end), 1);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const midY = vbY + (vbH - PAD.bottom + PAD.top) / 2;
  const pillH = 46;

  const xScale = linearScale([tMin, tMax], [plotLeft, plotRight]);
  const xTicks: AxisTick[] = niceTicks(tMin, tMax).map((t) => ({ pos: xScale(t), label: formatValue(t) }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="journey-gantt" {...canvasProps}>
      {phases.map((p, i) => {
        const x = xScale(p.start);
        const w = Math.max(pillH, xScale(p.end) - xScale(p.start));
        return (
          <g key={p.id}>
            <rect
              data-bbangto-viz-journey-bar
              data-bbangto-viz-journey-bar-id={p.id}
              x={x}
              y={midY - pillH / 2}
              width={w}
              height={pillH}
              rx={pillH / 2}
              style={{ fill: p.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]) }}
            />
            <text
              x={x + w / 2}
              y={midY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              fontWeight={700}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('canvas', 'bg') }}
            >
              {p.label}
            </text>
          </g>
        );
      })}
      <Axis orientation="x" x={plotLeft} y={vbY + vbH - PAD.bottom} length={plotRight - plotLeft} ticks={xTicks} />
    </Canvas>
  );
}

UserJourneyGantt.displayName = 'UserJourneyGantt';
