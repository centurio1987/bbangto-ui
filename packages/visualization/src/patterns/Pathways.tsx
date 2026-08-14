import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { NodeLabel } from '../atoms/NodeLabel';
import { IndexBadge } from '../atoms/IndexBadge';
import { vvar } from '../tokens/contract';
import { parseViewBox, distributeCenters } from '../geometry/layout';

export interface PathwayStepSpec {
  id: string;
  label: string;
  description?: string;
}

export interface PathwaysProps extends Omit<CanvasProps, 'data'> {
  data?: { steps: PathwayStepSpec[] };
  children?: ReactNode;
}

/** Pathways (VT-208) — 곡선 경로 위 이정표 + 순번. headless: 순번은 DOM 순서와 일치. */
/**
 * @vizType VT-208 Pathways · B. 프로세스·플로우 · dataShape: process · 구조: sequential
 * @useWhen 커리큘럼/여정 경로 위 이정표를 배열할 때
 * @avoidWhen 분기 절차는 Flowchart(VT-201) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Pathways({ data, viewBox, children, ...canvasProps }: PathwaysProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 720, 260]);

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="pathways" {...canvasProps}>
      {data ? renderPathways(data, { x: vbX, y: vbY, width: vbW, height: vbH }) : children}
    </Canvas>
  );
}

function renderPathways(
  data: { steps: PathwayStepSpec[] },
  box: { x: number; y: number; width: number; height: number },
): ReactNode {
  const steps = data.steps;
  const n = steps.length;
  if (!n) return null;

  const xs = distributeCenters(n, box.x + 70, box.x + box.width - 70);
  const midY = box.y + box.height / 2;
  const amp = box.height * 0.22;
  // 사인형 경로 위 이정표 y 배치(위/아래 물결).
  const ys = xs.map((_, i) => midY + (i % 2 === 0 ? -amp : amp) * 0.6);

  // 곡선 경로 path(스무스 큐빅).
  let pathD = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < n; i++) {
    const cx = (xs[i - 1] + xs[i]) / 2;
    pathD += ` C ${cx} ${ys[i - 1]} ${cx} ${ys[i]} ${xs[i]} ${ys[i]}`;
  }

  const nodeW = 120;
  const nodeH = 44;

  return (
    <>
      <path data-bbangto-viz-edge d={pathD} style={{ fill: 'none', strokeDasharray: '2 6' }} />
      {steps.map((s, i) => (
        <g key={s.id} data-bbangto-viz-pathway-step data-bbangto-viz-pathway-step-id={s.id}>
          <Node id={`path-${s.id}`} x={xs[i] - nodeW / 2} y={ys[i] - nodeH / 2} width={nodeW} height={nodeH} shape="rounded" />
          <NodeLabel x={xs[i] - nodeW / 2} y={ys[i]} width={nodeW} title={s.label} subtitle={s.description} fontSize={12} />
          <IndexBadge cx={xs[i] - nodeW / 2} cy={ys[i] - nodeH / 2} index={i + 1} radius={13} fill={vvar('palette', 'p1')} />
        </g>
      ))}
    </>
  );
}

Pathways.displayName = 'Pathways';
