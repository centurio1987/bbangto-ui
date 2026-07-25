import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { EdgeLabel } from '../atoms/EdgeLabel';
import { Boundary } from '../atoms/Boundary';
import { C4Box } from '../molecules/C4Box';
import { PersonNode } from '../molecules/PersonNode';
import { ExternalNode } from '../molecules/ExternalNode';
import type { C4SystemSpec, C4PersonSpec, C4RelationshipSpec, C4BoundarySpec } from './c4Types';

export interface C4SystemLandscapeDiagramData {
  systems: C4SystemSpec[];
  people?: C4PersonSpec[];
  boundaries?: C4BoundarySpec[];
  relationships: C4RelationshipSpec[];
}

export interface C4SystemLandscapeDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: C4SystemLandscapeDiagramData;
  children?: ReactNode;
}

/** C4 System Landscape (VT-114) — 다중 시스템 전경도 + 경계 + 관계. headless(수동 좌표). */
export function C4SystemLandscapeDiagram({
  data,
  viewBox,
  children,
  title = 'C4 system landscape',
  ...canvasProps
}: C4SystemLandscapeDiagramProps) {
  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="c4-landscape" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { systems, people = [], boundaries = [], relationships } = data;
  const registry = {
    nodes: [
      ...systems.map((s) => ({ id: s.id, x: s.x, y: s.y, width: s.width, height: s.height })),
      ...people.map((p) => ({ id: p.id, x: p.x, y: p.y, width: p.width, height: p.height })),
    ],
  };

  return (
    <Canvas viewBox={viewBox} title={title} data={registry} data-bbangto-viz-chart="c4-landscape" {...canvasProps}>
      {boundaries.map((b, i) => (
        <Boundary key={`b-${i}`} x={b.x} y={b.y} width={b.width} height={b.height} label={b.label} />
      ))}
      {relationships.map((r) => {
        const from = registry.nodes.find((n) => n.id === r.from);
        const to = registry.nodes.find((n) => n.id === r.to);
        const mx = from && to ? (from.x + from.width / 2 + to.x + to.width / 2) / 2 : 0;
        const my = from && to ? (from.y + from.height / 2 + to.y + to.height / 2) / 2 : 0;
        return (
          <g key={r.id}>
            <Edge from={r.from} to={r.to} routing="orthogonal" />
            {r.label && <EdgeLabel x={mx} y={my} label={r.label} fontSize={10} />}
          </g>
        );
      })}
      {systems.map((s) =>
        s.external ? (
          <ExternalNode key={s.id} id={s.id} x={s.x} y={s.y} width={s.width} height={s.height} title={s.name} />
        ) : (
          <C4Box key={s.id} id={s.id} x={s.x} y={s.y} width={s.width} height={s.height} level={s.level ?? 'l1'} title={s.name} subtitle={s.description} fill={s.fill} />
        ),
      )}
      {people.map((p) =>
        p.external ? (
          <ExternalNode key={p.id} id={p.id} x={p.x} y={p.y} width={p.width} height={p.height} title={p.name} />
        ) : (
          <PersonNode key={p.id} id={p.id} x={p.x} y={p.y} width={p.width} height={p.height} title={p.name} />
        ),
      )}
    </Canvas>
  );
}

C4SystemLandscapeDiagram.displayName = 'C4SystemLandscapeDiagram';
