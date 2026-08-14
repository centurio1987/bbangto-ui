import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { Boundary } from '../atoms/Boundary';
import { PersonNode } from '../molecules/PersonNode';
import { ExternalNode } from '../molecules/ExternalNode';
import { C4Box } from '../molecules/C4Box';
import type { C4PersonSpec, C4SystemSpec, C4RelationshipSpec, C4BoundarySpec } from './c4Types';

export type { C4PersonSpec, C4SystemSpec, C4RelationshipSpec, C4BoundarySpec };

export interface C4ContextDiagramData {
  boundary?: C4BoundarySpec;
  persons?: C4PersonSpec[];
  systems?: C4SystemSpec[];
  relationships?: C4RelationshipSpec[];
}

export interface C4ContextDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: C4ContextDiagramData;
}

/**
 * @vizType VT-109 C4 System Context · A. 엔지니어링/소프트웨어 · dataShape: relationship · 구조: relational
 * @useWhen 시스템을 블랙박스로 두고 사용자·외부 시스템 관계를 표현할 때
 * @useWhen 프로젝트 범위를 합의할 때
 * @avoidWhen 내부 컨테이너 구성은 C4 Container(VT-110) 사용
 * @avoidWhen 코드 수준 구조는 C4 Code(VT-112) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function C4ContextDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'C4 Context Diagram',
  ...props
}: C4ContextDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const persons = data?.persons ?? [];
  const systems = data?.systems ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = [
    ...persons.map((p) => ({ id: p.id, x: p.x, y: p.y, width: p.width, height: p.height })),
    ...systems.map((s) => ({ id: s.id, x: s.x, y: s.y, width: s.width, height: s.height })),
  ];

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 400';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 30;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {data?.boundary && (
        <Boundary
          x={data.boundary.x}
          y={data.boundary.y}
          width={data.boundary.width}
          height={data.boundary.height}
          label={data.boundary.label}
        />
      )}
      {persons.map((p) =>
        p.external ? (
          <ExternalNode key={p.id} id={p.id} x={p.x} y={p.y} width={p.width} height={p.height} title={p.name} subtitle={p.description} />
        ) : (
          <PersonNode key={p.id} id={p.id} x={p.x} y={p.y} width={p.width} height={p.height} title={p.name} subtitle={p.description} />
        ),
      )}
      {systems.map((s) => (
        <C4Box
          key={s.id}
          id={s.id}
          x={s.x}
          y={s.y}
          width={s.width}
          height={s.height}
          level={s.level ?? 'l1'}
          title={s.name}
          subtitle={s.description}
          fill={s.fill}
        />
      ))}
      {relationships.map((r) => (
        <Edge key={r.id} from={r.from} to={r.to} />
      ))}
    </Canvas>
  );
}

C4ContextDiagram.displayName = 'C4ContextDiagram';
