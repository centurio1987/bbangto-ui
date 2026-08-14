import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, bandScale, niceTicks } from '../geometry/scale';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface GanttTask {
  id: string;
  label: string;
  /** 시작 시각(수치). */
  start: number;
  /** 종료 시각(수치). */
  end: number;
  color?: string;
}

export interface GanttChartProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { tasks: GanttTask[]; timeDomain?: [number, number] };
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

const PAD = { left: 96, right: 20, top: 16, bottom: 34 } as const;

/** Gantt chart (VT-403) — bandScale(작업)×linearScale(시간). headless: 작업 라벨·기간 노출. */
/**
 * @vizType VT-403 Gantt Chart · D. 시간축 · dataShape: temporal · 구조: sequential, quantitative
 * @useWhen 작업과 기간을 시간축 막대로 일정 관리할 때
 * @avoidWhen 마일스톤 요약은 Timeline Roadmap(VT-402) 사용
 * @avoidWhen 상태 보드는 Kanban(VT-204) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function GanttChart({
  data,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Gantt chart',
  ...canvasProps
}: GanttChartProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 560, 260]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="gantt" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const tasks = data.tasks;
  const tMin = data.timeDomain?.[0] ?? Math.min(...tasks.map((t) => t.start), 0);
  const tMax = data.timeDomain?.[1] ?? Math.max(...tasks.map((t) => t.end), 1);

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const xScale = linearScale([tMin, tMax], [plotLeft, plotRight]);
  const band = bandScale(tasks.length, [plotTop, plotBottom], { paddingInner: 0.35 });
  const xTicks: AxisTick[] = niceTicks(tMin, tMax).map((t) => ({ pos: xScale(t), label: formatValue(t) }));

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="gantt" {...canvasProps}>
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} ticks={xTicks} />
      {tasks.map((t, i) => {
        const x = xScale(t.start);
        const w = Math.max(2, xScale(t.end) - xScale(t.start));
        const y = band.position(i);
        return (
          <g key={t.id}>
            <text
              x={plotLeft - 8}
              y={band.center(i)}
              textAnchor="end"
              dominantBaseline="central"
              fontSize={11}
              fontWeight={600}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('shape', 'stroke') }}
            >
              {t.label}
            </text>
            <rect
              data-bbangto-viz-gantt-bar
              data-bbangto-viz-gantt-bar-id={t.id}
              x={x}
              y={y}
              width={w}
              height={band.bandwidth}
              rx={3}
              style={{ fill: t.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]) }}
            />
          </g>
        );
      })}
    </Canvas>
  );
}

GanttChart.displayName = 'GanttChart';
