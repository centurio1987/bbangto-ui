import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge, type EdgeLabelOffset } from '../atoms/Edge';
import { classRelationshipLineStyle, type ClassRelationshipKind } from '../atoms/relationKind';
import { ClassBox } from '../molecules/ClassBox';

export interface ClassSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  stereotype?: string;
  attributes?: string[];
  methods?: string[];
  fill?: string;
  stroke?: string;
}

// 관계 종류와 선 모양 매핑은 atoms/relationKind.ts 가 낸다(바깥 보고서 P11 ① — 소비자가 같은 매핑을 쓰게).
export type { ClassRelationshipKind };

export interface ClassRelationshipSpec {
  id: string;
  from: string;
  to: string;
  kind?: ClassRelationshipKind;
  label?: string;
  /** 선 가운데 라벨을 이만큼 옮긴다(겹칠 때 비키기, KAN-082). */
  labelOffset?: EdgeLabelOffset;
  fromLabel?: string;
  toLabel?: string;
}

export interface ClassDiagramData {
  classes: ClassSpec[];
  relationships?: ClassRelationshipSpec[];
}

export interface ClassDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ClassDiagramData;
}

/**
 * @vizType VT-101 UML Class Diagram · A. 엔지니어링/소프트웨어 · dataShape: hierarchy, relationship · 구조: nested, relational
 * @useWhen 도메인/코드 모델의 클래스 구조를 표현할 때
 * @useWhen 상속·연관·의존 관계를 명세할 때
 * @avoidWhen 런타임 시간순 상호작용이 핵심이면 Sequence(VT-108) 사용
 * @avoidWhen 물리 배포 구성이면 Deployment(VT-104) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ClassDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Class Diagram',
  ...props
}: ClassDiagramProps) {
  if (children) {
    return (
      <Canvas data-viz-notation viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const classes = data?.classes ?? [];
  const relationships = data?.relationships ?? [];

  const allNodes = classes.map((c) => ({ id: c.id, x: c.x, y: c.y, width: c.width, height: c.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 400';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas
      data-viz-notation
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {classes.map((c) => (
        <ClassBox
          key={c.id}
          id={c.id}
          x={c.x}
          y={c.y}
          width={c.width}
          height={c.height}
          name={c.name}
          stereotype={c.stereotype}
          attributes={c.attributes}
          methods={c.methods}
          fill={c.fill}
          stroke={c.stroke}
        />
      ))}
      {relationships.map((r) => {
        const cfg = classRelationshipLineStyle(r.kind ?? 'association');
        return (
          <Edge
            key={r.id}
            from={r.from}
            to={r.to}
            markerEnd={cfg.markerEnd}
            markerStart={cfg.markerStart}
            strokeDasharray={cfg.strokeDasharray}
            strokeWidth={1.5}
            label={r.label} labelOffset={r.labelOffset}
            fromLabel={r.fromLabel}
            toLabel={r.toLabel}
            labelFontSize={10}
          />
        );
      })}
    </Canvas>
  );
}

ClassDiagram.displayName = 'ClassDiagram';
