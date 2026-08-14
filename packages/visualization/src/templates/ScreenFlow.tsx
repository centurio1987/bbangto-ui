import React, { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { MockupNode } from '../molecules/MockupNode';
import { Edge } from '../atoms/Edge';
import { EdgeLabel } from '../atoms/EdgeLabel';

export interface ScreenSpec {
  id: string;
  title: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  variant?: 'browser' | 'mobile';
}

export interface FlowSpec {
  from: string;
  to: string;
  label?: string;
}

export interface ScreenFlowProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { screens: ScreenSpec[]; flows?: FlowSpec[] };
  children?: ReactNode;
}

const SCREEN_W = 160;
const SCREEN_H = 130;

/** Screen flow (VT-206) — 화면 목업 노드 + 이동 흐름. headless(수동 좌표). */
/**
 * @vizType VT-206 Screen Flow · B. 프로세스·플로우 · dataShape: process, network · 구조: sequential, branching, relational
 * @useWhen 화면 목업 간 이동 흐름을 설계·소통할 때
 * @avoidWhen 감정 곡선 여정은 User Journey Map(VT-205) 사용
 * @avoidWhen 추상 절차는 Flowchart(VT-201) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ScreenFlow({
  data,
  viewBox,
  children,
  title = 'Screen flow',
  ...canvasProps
}: ScreenFlowProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="screenflow" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const specById = new Map(data.screens.map((s) => [s.id, s]));
  const dims = (s: ScreenSpec) => ({ w: s.width ?? SCREEN_W, h: s.height ?? SCREEN_H });
  const registry = {
    nodes: data.screens.map((s) => {
      const { w, h } = dims(s);
      return { id: s.id, x: s.x, y: s.y, width: w, height: h };
    }),
  };
  const centerOf = (id: string) => {
    const s = specById.get(id);
    if (!s) return { x: 0, y: 0 };
    const { w, h } = dims(s);
    return { x: s.x + w / 2, y: s.y + h / 2 };
  };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="screenflow" {...canvasProps}>
      {(data.flows ?? []).map((f, i) => {
        const a = centerOf(f.from);
        const b = centerOf(f.to);
        return (
          <React.Fragment key={`f-${i}`}>
            <Edge from={f.from} to={f.to} routing="orthogonal" markerEnd="arrow" />
            {f.label && <EdgeLabel x={(a.x + b.x) / 2} y={(a.y + b.y) / 2} label={f.label} />}
          </React.Fragment>
        );
      })}
      {data.screens.map((s) => {
        const { w, h } = dims(s);
        return <MockupNode key={s.id} id={s.id} x={s.x} y={s.y} width={w} height={h} title={s.title} variant={s.variant} />;
      })}
    </Canvas>
  );
}

ScreenFlow.displayName = 'ScreenFlow';
