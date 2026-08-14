import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { ClassBox } from '../molecules/ClassBox';
import { EntityTable } from '../molecules/EntityTable';
import type { EntityAttribute } from '../molecules/EntityTable';
import type { C4RelationshipSpec } from './c4Types';

export type C4CodeElementKind = 'class' | 'entity' | 'generic';

export interface C4CodeElementSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  kind?: C4CodeElementKind;
  // class
  attributes?: string[];
  methods?: string[];
  // entity
  columns?: EntityAttribute[];
}

export interface C4CodeDiagramData {
  elements: C4CodeElementSpec[];
  relationships?: C4RelationshipSpec[];
}

export interface C4CodeDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: C4CodeDiagramData;
}

/**
 * @vizType VT-112 C4 Code · A. 엔지니어링/소프트웨어 · dataShape: hierarchy, relationship · 구조: nested, relational
 * @useWhen 코드 수준 요소(클래스/인터페이스) 구조를 표현할 때
 * @avoidWhen 컴포넌트 책임 수준은 C4 Component(VT-111) 사용
 * @avoidWhen 표준 UML 클래스는 Class(VT-101) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function C4CodeDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'C4 Code Diagram',
  ...props
}: C4CodeDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const elements = data?.elements ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = elements.map((e) => ({ id: e.id, x: e.x, y: e.y, width: e.width, height: e.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 300';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
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
      {elements.map((el) => {
        if (el.kind === 'entity') {
          return (
            <EntityTable
              key={el.id}
              id={el.id}
              x={el.x}
              y={el.y}
              width={el.width}
              name={el.name}
              attributes={el.columns}
            />
          );
        }
        // default: class or generic → ClassBox
        return (
          <ClassBox
            key={el.id}
            id={el.id}
            x={el.x}
            y={el.y}
            width={el.width}
            height={el.height}
            name={el.name}
            attributes={el.attributes}
            methods={el.methods}
          />
        );
      })}
      {relationships.map((r) => (
        <Edge key={r.id} from={r.from} to={r.to} markerEnd="triangleOpen" stroke="#555555" strokeWidth={1.5} />
      ))}
    </Canvas>
  );
}

C4CodeDiagram.displayName = 'C4CodeDiagram';
