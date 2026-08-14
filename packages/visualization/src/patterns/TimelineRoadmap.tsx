import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { MilestoneMarker } from '../atoms/MilestoneMarker';
import { vvar } from '../tokens/contract';
import { distributeCenters, parseViewBox } from '../geometry/layout';

export interface MilestoneSpec {
  period: string;
  label: string;
  description?: string;
}

export interface TimelineRoadmapProps extends Omit<CanvasProps, 'data'> {
  data?: { milestones: readonly MilestoneSpec[] };
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
}

/**
 * TimelineRoadmap 패턴 — 연대기/로드맵(headless).
 * 레퍼런스: infographic iso_06(연도 배지 세그먼트 축), mermaid minimal_01/03(수평 시간축).
 * 수평 모드에서 마일스톤 콘텐츠는 축 상/하로 교차 배치된다.
 *
 * @vizType VT-402 Timeline Roadmap · D. 시간축 · dataShape: temporal · 구조: sequential
 * @useWhen 마일스톤과 기간을 로드맵으로 공유할 때
 * @avoidWhen 상세 작업 일정은 Gantt(VT-403) 사용
 * @avoidWhen 사건 나열은 Timeline(VT-401) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function TimelineRoadmap({
  data,
  orientation = 'horizontal',
  children,
  viewBox,
  ...canvasProps
}: TimelineRoadmapProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 760, 260]);
  const milestones = data?.milestones ?? [];

  const axisY = vbY + vbH / 2;
  const axisX = vbX + vbW / 2;
  const horizontal = orientation === 'horizontal';
  const centers = horizontal
    ? distributeCenters(milestones.length, vbX + 40, vbX + vbW - 40)
    : distributeCenters(milestones.length, vbY + 40, vbY + vbH - 40);

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="timeline-roadmap" {...canvasProps}>
      {data ? (
        <>
          <Edge
            data-viz-axis
            from={horizontal ? { x: vbX + 16, y: axisY } : { x: axisX, y: vbY + 16 }}
            to={horizontal ? { x: vbX + vbW - 16, y: axisY } : { x: axisX, y: vbY + vbH - 16 }}
            routing="straight"
            markerEnd="arrow"
          />
          {milestones.map((m, i) => {
            const side = horizontal ? (i % 2 === 0 ? 'above' : 'below') : 'right';
            const px = horizontal ? centers[i] : axisX;
            const py = horizontal ? axisY : centers[i];
            const dir = side === 'below' ? 1 : -1;
            const labelY = horizontal ? py + dir * 56 : py;
            const labelX = horizontal ? px : px + 28;
            const anchor = horizontal ? 'middle' : 'start';
            return (
              <g key={i} data-viz-milestone data-viz-side={side}>
                <MilestoneMarker
                  x={px}
                  y={py}
                  period={m.period}
                  side={horizontal ? (side as 'above' | 'below') : 'above'}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={anchor}
                  dominantBaseline="central"
                  fontSize={14}
                  fontWeight={700}
                  fontFamily={vvar('typography', 'titleFont')}
                  style={{ fill: vvar('shape', 'stroke') }}
                >
                  {m.label}
                </text>
                {m.description && (
                  <text
                    x={labelX}
                    y={labelY + dir * 0 + 18}
                    textAnchor={anchor}
                    dominantBaseline="central"
                    fontSize={11}
                    fontFamily={vvar('typography', 'titleFont')}
                    style={{ fill: vvar('boundary', 'labelColor') }}
                  >
                    {m.description}
                  </text>
                )}
              </g>
            );
          })}
        </>
      ) : (
        children
      )}
    </Canvas>
  );
}
