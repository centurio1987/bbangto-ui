import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { EdgeLabel } from '../atoms/EdgeLabel';
import { Boundary } from '../atoms/Boundary';
import { C4Box, type C4Level } from '../molecules/C4Box';
import { PersonNode } from '../molecules/PersonNode';
import { ExternalNode } from '../molecules/ExternalNode';
import { vvar } from '../tokens/contract';
import type { C4BoundarySpec } from './c4Types';

export interface C4DynamicElement {
  id: string;
  name: string;
  technology?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  level?: C4Level;
  external?: boolean;
  person?: boolean;
  fill?: string;
}

export interface C4DynamicStep {
  id: string;
  from: string;
  to: string;
  order: number;
  label?: string;
}

export interface C4DynamicDiagramData {
  elements: C4DynamicElement[];
  steps: C4DynamicStep[];
  boundary?: C4BoundarySpec;
}

export interface C4DynamicDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: C4DynamicDiagramData;
  children?: ReactNode;
}

/** C4 Dynamic (VT-113) — C4 요소 간 순번 있는 협력. 순번 배지 + 라벨. headless(수동 좌표). */
/**
 * @vizType VT-113 C4 Dynamic · A. 엔지니어링/소프트웨어 · dataShape: process, temporal · 구조: sequential, relational
 * @useWhen C4 요소 간 런타임 협력을 순번으로 표현할 때
 * @useWhen 특정 유스케이스의 흐름을 설명할 때
 * @avoidWhen 정적 구성은 C4 Container(VT-110)/Component(VT-111) 사용
 * @avoidWhen 상세 메시지 명세는 Sequence(VT-108) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function C4DynamicDiagram({
  data,
  viewBox,
  children,
  title = 'C4 dynamic diagram',
  ...canvasProps
}: C4DynamicDiagramProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="c4-dynamic" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { elements, steps, boundary } = data;
  const registry = { nodes: elements.map((e) => ({ id: e.id, x: e.x, y: e.y, width: e.width, height: e.height })) };
  const byId = new Map(elements.map((e) => [e.id, e]));

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="c4-dynamic" {...canvasProps}>
      {boundary && <Boundary x={boundary.x} y={boundary.y} width={boundary.width} height={boundary.height} label={boundary.label} />}
      {steps.map((s) => {
        const from = byId.get(s.from)!;
        const to = byId.get(s.to)!;
        const mx = (from.x + from.width / 2 + to.x + to.width / 2) / 2;
        const my = (from.y + from.height / 2 + to.y + to.height / 2) / 2;
        return (
          <g key={s.id}>
            <Edge from={s.from} to={s.to} routing="orthogonal" />
            {s.label && <EdgeLabel x={mx} y={my - 12} label={s.label} fontSize={10} />}
            <g data-bbangto-viz-order data-bbangto-viz-order-value={String(s.order)}>
              <circle cx={mx} cy={my} r={9} data-viz-part="shape" style={{ fill: vvar('palette', 'p3'), stroke: vvar('shape', 'stroke'), strokeWidth: 1 }} />
              <text x={mx} y={my} textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={800} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('shape', 'stroke') }}>
                {s.order}
              </text>
            </g>
          </g>
        );
      })}
      {elements.map((e) =>
        e.person ? (
          <PersonNode key={e.id} id={e.id} x={e.x} y={e.y} width={e.width} height={e.height} title={e.name} />
        ) : e.external ? (
          <ExternalNode key={e.id} id={e.id} x={e.x} y={e.y} width={e.width} height={e.height} title={e.name} />
        ) : (
          <C4Box key={e.id} id={e.id} x={e.x} y={e.y} width={e.width} height={e.height} level={e.level ?? 'l2'} title={e.name} subtitle={e.technology} fill={e.fill} />
        ),
      )}
    </Canvas>
  );
}

C4DynamicDiagram.displayName = 'C4DynamicDiagram';
