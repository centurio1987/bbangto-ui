import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { Boundary } from '../atoms/Boundary';
import { C4Box } from '../molecules/C4Box';
import type { C4ComponentSpec, C4RelationshipSpec, C4BoundarySpec } from './c4Types';

export type { C4ComponentSpec };

export interface C4ComponentDiagramData {
  containerBoundary?: C4BoundarySpec;
  components?: C4ComponentSpec[];
  relationships?: C4RelationshipSpec[];
}

export interface C4ComponentDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: C4ComponentDiagramData;
}

/**
 * @vizType VT-111 C4 Component · A. 엔지니어링/소프트웨어 · dataShape: relationship · 구조: nested, relational
 * @useWhen 컨테이너 내부 컴포넌트의 책임과 상호작용을 상세화할 때
 * @avoidWhen 기술 스택 개관은 C4 Container(VT-110) 사용
 * @avoidWhen 코드 클래스 구조는 C4 Code(VT-112) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function C4ComponentDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'C4 Component Diagram',
  ...props
}: C4ComponentDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const components = data?.components ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = components.map((c) => ({ id: c.id, x: c.x, y: c.y, width: c.width, height: c.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 300';
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
      {data?.containerBoundary && (
        <Boundary
          x={data.containerBoundary.x}
          y={data.containerBoundary.y}
          width={data.containerBoundary.width}
          height={data.containerBoundary.height}
          label={data.containerBoundary.label}
        />
      )}
      {components.map((c) => (
        <C4Box
          key={c.id}
          id={c.id}
          x={c.x}
          y={c.y}
          width={c.width}
          height={c.height}
          level="l3"
          title={c.name}
          subtitle={c.technology}
          fill={c.fill}
        />
      ))}
      {relationships.map((r) => (
        <Edge key={r.id} from={r.from} to={r.to} />
      ))}
    </Canvas>
  );
}

C4ComponentDiagram.displayName = 'C4ComponentDiagram';
