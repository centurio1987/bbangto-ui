import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { Tag } from '../atoms/Tag';

export type ArchiMateLayer = 'business' | 'application' | 'technology';

export type ArchiMateRelKind =
  | 'serving'
  | 'triggering'
  | 'association'
  | 'composition'
  | 'aggregation'
  | 'realization'
  | 'influence'
  | 'access';

export interface ArchiMateElementSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  kind?: string;
  fill?: string;
}

export interface ArchiMateRelationshipSpec {
  id: string;
  from: string;
  to: string;
  kind?: ArchiMateRelKind;
}

export interface ArchiMateDiagramData {
  elements: ArchiMateElementSpec[];
  relationships?: ArchiMateRelationshipSpec[];
}

export interface ArchiMateDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ArchiMateDiagramData;
  layer: ArchiMateLayer;
}

const LAYER_FILL: Record<ArchiMateLayer, string> = {
  business:    '#FFF9C4',
  application: '#DBEAFE',
  technology:  '#DCFCE7',
};

function relMarkerEnd(kind?: ArchiMateRelKind) {
  switch (kind) {
    case 'composition':  return 'diamond'     as const;
    case 'aggregation':  return 'diamondOpen' as const;
    case 'realization':  return 'triangleOpen'as const;
    default:             return 'arrow'       as const;
  }
}

function relDash(kind?: ArchiMateRelKind): string | undefined {
  return kind === 'influence' || kind === 'access' ? '5 3' : undefined;
}

/**
 * @vizType VT-120 ArchiMate Layered View · A. 엔지니어링/소프트웨어 · dataShape: relationship, hierarchy · 구조: nested, relational
 * @useWhen 비즈니스·애플리케이션·기술 계층을 통합한 EA 뷰를 표현할 때
 * @useWhen 레이어 밴드로 계층을 구분할 때
 * @avoidWhen 동기·전략·이행 관점은 ArchiMate Viewpoints(VT-121) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ArchiMateDiagram({
  children,
  data,
  layer,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'ArchiMate Diagram',
  ...props
}: ArchiMateDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const elements      = data?.elements      ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = elements.map((e) => ({ id: e.id, x: e.x, y: e.y, width: e.width, height: e.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 300';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const layerFill = LAYER_FILL[layer];
  const tagY = (e: ArchiMateElementSpec) => e.y + e.height - 8;

  return (
    <Canvas
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      <g data-bbangto-viz-archimate-layer={layer}>
        {elements.map((e) => (
          <React.Fragment key={e.id}>
            <Node
              id={e.id}
              x={e.x}
              y={e.y}
              width={e.width}
              height={e.height}
              shape="rect"
              fill={e.fill ?? layerFill}
              stroke="#111111"
              strokeWidth={1.5}
              data-bbangto-viz-archimate-element
            />
            <NodeLabel
              x={e.x}
              y={e.y + e.height / 2 - 6}
              width={e.width}
              title={e.name}
              fontSize={12}
            />
            {e.kind && (
              <Tag x={e.x + e.width / 2} y={tagY(e)} label={e.kind} />
            )}
          </React.Fragment>
        ))}
        {relationships.map((r) => (
          <Edge
            key={r.id}
            from={r.from}
            to={r.to}
            markerEnd={relMarkerEnd(r.kind)}
            strokeDasharray={relDash(r.kind)}
            strokeWidth={1.5}
          />
        ))}
      </g>
    </Canvas>
  );
}

ArchiMateDiagram.displayName = 'ArchiMateDiagram';

// ──────────────────────────────────────────────────────────────────────
// Layer-specific convenience components
// ──────────────────────────────────────────────────────────────────────

export interface ArchiMateLayerDiagramProps extends Omit<ArchiMateDiagramProps, 'layer'> {}

/**
 * @vizType VT-120 ArchiMate Layered View · A. 엔지니어링/소프트웨어 · dataShape: relationship, hierarchy · 구조: nested, relational
 * @useWhen 비즈니스·애플리케이션·기술 계층을 통합한 EA 뷰를 표현할 때
 * @useWhen 레이어 밴드로 계층을 구분할 때
 * @avoidWhen 동기·전략·이행 관점은 ArchiMate Viewpoints(VT-121) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ArchiMateBusinessDiagram(props: ArchiMateLayerDiagramProps) {
  return <ArchiMateDiagram layer="business" title={props.title ?? 'ArchiMate Business'} {...props} />;
}
ArchiMateBusinessDiagram.displayName = 'ArchiMateBusinessDiagram';

/**
 * @vizType VT-120 ArchiMate Layered View · A. 엔지니어링/소프트웨어 · dataShape: relationship, hierarchy · 구조: nested, relational
 * @useWhen 비즈니스·애플리케이션·기술 계층을 통합한 EA 뷰를 표현할 때
 * @useWhen 레이어 밴드로 계층을 구분할 때
 * @avoidWhen 동기·전략·이행 관점은 ArchiMate Viewpoints(VT-121) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ArchiMateApplicationDiagram(props: ArchiMateLayerDiagramProps) {
  return <ArchiMateDiagram layer="application" title={props.title ?? 'ArchiMate Application'} {...props} />;
}
ArchiMateApplicationDiagram.displayName = 'ArchiMateApplicationDiagram';

/**
 * @vizType VT-120 ArchiMate Layered View · A. 엔지니어링/소프트웨어 · dataShape: relationship, hierarchy · 구조: nested, relational
 * @useWhen 비즈니스·애플리케이션·기술 계층을 통합한 EA 뷰를 표현할 때
 * @useWhen 레이어 밴드로 계층을 구분할 때
 * @avoidWhen 동기·전략·이행 관점은 ArchiMate Viewpoints(VT-121) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ArchiMateTechnologyDiagram(props: ArchiMateLayerDiagramProps) {
  return <ArchiMateDiagram layer="technology" title={props.title ?? 'ArchiMate Technology'} {...props} />;
}
ArchiMateTechnologyDiagram.displayName = 'ArchiMateTechnologyDiagram';
