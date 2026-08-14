import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { IndexBadge } from '../atoms/IndexBadge';
import { StepConnector } from '../molecules/StepConnector';
import { CalloutLeader } from '../molecules/CalloutLeader';
import { vvar } from '../tokens/contract';
import { distributeCenters, parseViewBox } from '../geometry/layout';

export interface ProcessStepSpec {
  id?: string;
  title: string;
  description?: string;
}

export type ProcessStepsOrientation = 'horizontal' | 'vertical' | 'zigzag';

export interface ProcessStepsProps extends Omit<CanvasProps, 'data'> {
  data?: { steps: readonly ProcessStepSpec[] };
  orientation?: ProcessStepsOrientation;
  children?: ReactNode;
}

const BADGE_R = 18;

/**
 * ProcessSteps 패턴 — 순차 스텝 체인(headless).
 * 레퍼런스: infographic minimal_04/05(수평 번호 스텝), colorful_04(수직), minimal_01(지그재그 콜아웃).
 *
 * @vizType VT-202 Process Steps · B. 프로세스·플로우 · dataShape: process · 구조: sequential
 * @useWhen 튜토리얼/워크플로를 순서대로 안내할 때
 * @useWhen 분기 없는 선형 절차를 강조할 때
 * @avoidWhen 조건 분기가 있으면 Flowchart(VT-201) 사용
 * @avoidWhen 끝이 처음으로 돌아오는 순환이면 Cycle(VT-203) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ProcessSteps({
  data,
  orientation = 'horizontal',
  children,
  viewBox,
  ...canvasProps
}: ProcessStepsProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 720, 160]);
  const steps = data?.steps ?? [];

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="process-steps" {...canvasProps}>
      {data
        ? orientation === 'zigzag'
          ? renderZigzag(steps, vbX, vbY, vbW, vbH)
          : orientation === 'vertical'
            ? renderVertical(steps, vbX, vbY, vbW, vbH)
            : renderHorizontal(steps, vbX, vbY, vbW, vbH)
        : children}
    </Canvas>
  );
}

function renderHorizontal(
  steps: readonly ProcessStepSpec[],
  vbX: number,
  vbY: number,
  vbW: number,
  vbH: number,
): ReactNode {
  const centers = distributeCenters(steps.length, vbX + 24, vbX + vbW - 24);
  const y = vbY + vbH * 0.34;

  return (
    <>
      {steps.map((step, i) => (
        <g key={step.id ?? i} data-viz-step>
          <IndexBadge cx={centers[i]} cy={y} index={i + 1} radius={BADGE_R} />
          <text
            x={centers[i]}
            y={y + BADGE_R + 22}
            textAnchor="middle"
            fontSize={14}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {step.title}
          </text>
          {step.description && (
            <text
              x={centers[i]}
              y={y + BADGE_R + 40}
              textAnchor="middle"
              fontSize={11}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('boundary', 'labelColor') }}
            >
              {step.description}
            </text>
          )}
        </g>
      ))}
      {steps.slice(0, -1).map((_, i) => (
        <StepConnector
          key={`c${i}`}
          from={{ x: centers[i] + BADGE_R + 6, y }}
          to={{ x: centers[i + 1] - BADGE_R - 6, y }}
        />
      ))}
    </>
  );
}

function renderVertical(
  steps: readonly ProcessStepSpec[],
  vbX: number,
  vbY: number,
  _vbW: number,
  vbH: number,
): ReactNode {
  const centers = distributeCenters(steps.length, vbY + 24, vbY + vbH - 24);
  const x = vbX + 48;

  return (
    <>
      {steps.map((step, i) => (
        <g key={step.id ?? i} data-viz-step>
          <IndexBadge cx={x} cy={centers[i]} index={i + 1} radius={BADGE_R} />
          <text
            x={x + BADGE_R + 14}
            y={centers[i] - (step.description ? 6 : 0)}
            dominantBaseline="central"
            fontSize={14}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {step.title}
          </text>
          {step.description && (
            <text
              x={x + BADGE_R + 14}
              y={centers[i] + 12}
              dominantBaseline="central"
              fontSize={11}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('boundary', 'labelColor') }}
            >
              {step.description}
            </text>
          )}
        </g>
      ))}
      {steps.slice(0, -1).map((_, i) => (
        <StepConnector
          key={`c${i}`}
          from={{ x, y: centers[i] + BADGE_R + 6 }}
          to={{ x, y: centers[i + 1] - BADGE_R - 6 }}
        />
      ))}
    </>
  );
}

function renderZigzag(
  steps: readonly ProcessStepSpec[],
  vbX: number,
  vbY: number,
  vbW: number,
  vbH: number,
): ReactNode {
  const centers = distributeCenters(steps.length, vbY + 24, vbY + vbH - 24);
  const spineX = vbX + vbW / 2;
  const calloutDx = Math.min(120, vbW * 0.28);

  return (
    <>
      {steps.map((step, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        const dir = side === 'left' ? -1 : 1;
        return (
          <g key={step.id ?? i} data-viz-step data-viz-side={side}>
            <IndexBadge cx={spineX} cy={centers[i]} index={i + 1} radius={BADGE_R} />
            <CalloutLeader
              from={{ x: spineX + dir * (BADGE_R + 4), y: centers[i] }}
              to={{ x: spineX + dir * calloutDx, y: centers[i] }}
              lines={step.description ? [step.title, step.description] : [step.title]}
              side={side === 'left' ? 'left' : 'right'}
            />
          </g>
        );
      })}
      {steps.slice(0, -1).map((_, i) => (
        <StepConnector
          key={`c${i}`}
          from={{ x: spineX, y: centers[i] + BADGE_R + 4 }}
          to={{ x: spineX, y: centers[i + 1] - BADGE_R - 4 }}
        />
      ))}
    </>
  );
}
