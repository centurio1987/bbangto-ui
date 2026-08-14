import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale, bandScale } from '../geometry/scale';

export interface JourneyStep {
  id: string;
  label: string;
  /** 만족도 0~100. */
  score: number;
}

export interface UserJourneyMapProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { steps: JourneyStep[]; scoreDomain?: [number, number] };
  children?: ReactNode;
}

const PAD = { left: 40, right: 24, top: 28, bottom: 52 } as const;

/** User journey map (VT-205) — 단계 레인 + 만족도 곡선 + 감정 dot. headless. */
/**
 * @vizType VT-205 User Journey Map · B. 프로세스·플로우 · dataShape: process, temporal · 구조: sequential, quantitative
 * @useWhen 사용자 여정 단계별 감정/만족도를 표현할 때
 * @useWhen UX 리서치 결과를 소통할 때
 * @avoidWhen 날짜 기반 여정 일정은 User Journey Gantt(VT-404) 사용
 * @avoidWhen 화면 이동 흐름은 Screen Flow(VT-206) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function UserJourneyMap({
  data,
  viewBox,
  children,
  title = 'User journey map',
  ...canvasProps
}: UserJourneyMapProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 640, 300]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="journey-map" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const steps = data.steps;
  const [sMin, sMax] = data.scoreDomain ?? [0, 100];

  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const plotTop = vbY + PAD.top;
  const plotBottom = vbY + vbH - PAD.bottom;

  const band = bandScale(steps.length, [plotLeft, plotRight], { paddingInner: 0 });
  const yScale = linearScale([sMin, sMax], [plotBottom, plotTop]);

  const pts = steps.map((s, i) => ({ x: band.center(i), y: yScale(s.score), s }));
  const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="journey-map" {...canvasProps}>
      {/* 단계 레인 구분선 */}
      {steps.map((s, i) => (
        <path
          key={`div-${s.id}`}
          data-bbangto-viz-edge
          d={`M ${band.position(i)} ${plotTop} L ${band.position(i)} ${plotBottom}`}
          style={{ fill: 'none', strokeDasharray: '3 5', opacity: 0.4 }}
        />
      ))}
      <Axis orientation="x" x={plotLeft} y={plotBottom} length={plotRight - plotLeft} showDomain tickSize={0} />
      {/* 만족도 곡선 */}
      <path data-bbangto-viz-journey-line d={lineD} style={{ fill: 'none', stroke: vvar('palette', 'p1'), strokeWidth: 2.5 }} />
      {/* 단계별 dot + 라벨 + 점수 병기 */}
      {pts.map(({ x, y, s }) => (
        <g key={s.id} data-bbangto-viz-journey-step data-bbangto-viz-journey-step-id={s.id}>
          <circle cx={x} cy={y} r={5} style={{ fill: vvar('palette', 'p1') }} />
          <text x={x} y={y - 12} textAnchor="middle" fontSize={11} fontWeight={700} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('shape', 'stroke') }}>
            {s.score}
          </text>
          <text x={x} y={plotBottom + 18} textAnchor="middle" fontSize={11} fontWeight={600} fontFamily={vvar('typography', 'titleFont')} style={{ fill: vvar('shape', 'stroke') }}>
            {s.label}
          </text>
        </g>
      ))}
    </Canvas>
  );
}

UserJourneyMap.displayName = 'UserJourneyMap';
