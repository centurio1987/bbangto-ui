import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import type { MarkerVariant } from '../atoms/Marker';
import { ClassBox } from '../molecules/ClassBox';

export interface SysMLBlockSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  stereotype?: string;
  values?: string[];
  operations?: string[];
  fill?: string;
  stroke?: string;
}

export type SysMLRelKind = 'composition' | 'aggregation' | 'association' | 'dependency';

export interface SysMLRelationshipSpec {
  id: string;
  from: string;
  to: string;
  kind?: SysMLRelKind;
}

export interface SysMLBlockDiagramData {
  blocks: SysMLBlockSpec[];
  relationships?: SysMLRelationshipSpec[];
}

export interface SysMLBlockDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: SysMLBlockDiagramData;
}

function relMarker(kind?: SysMLRelKind): { markerEnd?: MarkerVariant; markerStart?: MarkerVariant; dash?: string } {
  switch (kind) {
    case 'composition':  return { markerStart: 'diamond' };
    case 'aggregation':  return { markerStart: 'diamondOpen' };
    case 'dependency':   return { markerEnd: 'arrowOpen', dash: '5 3' };
    case 'association':
    default:             return { markerEnd: 'arrow' };
  }
}

/**
 * @vizType VT-119 SysML Block Definition · A. 엔지니어링/소프트웨어 · dataShape: hierarchy, relationship · 구조: nested, relational
 * @useWhen 시스템 블록의 정의와 조성(composition) 구조를 표현할 때
 * @avoidWhen 소프트웨어 클래스 모델은 Class(VT-101) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function SysMLBlockDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'SysML Block Diagram',
  ...props
}: SysMLBlockDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const blocks        = data?.blocks        ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = blocks.map((b) => ({ id: b.id, x: b.x, y: b.y, width: b.width, height: b.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 400';
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
      {blocks.map((b) => (
        <ClassBox
          key={b.id}
          id={b.id}
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
          name={b.name}
          stereotype={b.stereotype ?? 'block'}
          attributes={b.values}
          methods={b.operations}
          fill={b.fill}
          stroke={b.stroke}
        />
      ))}
      {relationships.map((r) => {
        const mk = relMarker(r.kind);
        return (
          <Edge
            key={r.id}
            from={r.from}
            to={r.to}
            markerEnd={mk.markerEnd}
            markerStart={mk.markerStart}
            strokeDasharray={mk.dash}
            strokeWidth={1.5}
          />
        );
      })}
    </Canvas>
  );
}

SysMLBlockDiagram.displayName = 'SysMLBlockDiagram';
