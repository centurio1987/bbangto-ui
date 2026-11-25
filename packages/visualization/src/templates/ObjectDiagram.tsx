import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge, type EdgeLabelOffset } from '../atoms/Edge';
import { ClassBox } from '../molecules/ClassBox';

/** 객체의 속성 값 하나 — 「속성 = 값」 으로 그린다. */
export interface ObjectSlotSpec {
  name: string;
  value: string;
}

/** 인스턴스 하나 — 어떤 순간의 객체(인스턴스 스냅샷). */
export interface ObjectSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** 인스턴스 이름. 비우면 이름 없는 객체(「: 클래스」). */
  name?: string;
  /** 이 객체의 클래스 이름 */
  classifier: string;
  slots?: ObjectSlotSpec[];
  fill?: string;
  stroke?: string;
}

/** 객체 사이 링크 — 연관의 인스턴스. 방향이 없는 선이다. */
export interface ObjectLinkSpec {
  id: string;
  from: string;
  to: string;
  /** 링크(연관) 이름 — 선 가운데 */
  label?: string;
  labelOffset?: EdgeLabelOffset;
  /** 양 끝 역할 이름 — 선 끝 근처 */
  fromLabel?: string;
  toLabel?: string;
}

export interface ObjectDiagramData {
  objects: ObjectSpec[];
  links?: ObjectLinkSpec[];
}

export interface ObjectDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: ObjectDiagramData;
}

/** 「이름 : 클래스」 — 이름이 없으면 「: 클래스」 */
function objectTitle(o: ObjectSpec): string {
  return o.name ? `${o.name} : ${o.classifier}` : `: ${o.classifier}`;
}

/**
 * @vizType VT-101 UML Class Diagram · A. 엔지니어링/소프트웨어 · dataShape: hierarchy, relationship · 구조: nested, relational
 * @useWhen 도메인/코드 모델의 클래스 구조를 표현할 때
 * @useWhen 상속·연관·의존 관계를 명세할 때
 * @avoidWhen 런타임 시간순 상호작용이 핵심이면 Sequence(VT-108) 사용
 * @avoidWhen 물리 배포 구성이면 Deployment(VT-104) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ObjectDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Object Diagram',
  ...props
}: ObjectDiagramProps) {
  if (children) {
    return (
      <Canvas data-viz-notation viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const objects = data?.objects ?? [];
  const links = data?.links ?? [];
  const allNodes = objects.map((o) => ({ id: o.id, x: o.x, y: o.y, width: o.width, height: o.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 400';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas data-viz-notation data={{ nodes: allNodes }} viewBox={autoViewBox} width={width} height={height} title={title} {...props}>
      {objects.map((o) => (
        // 객체 상자는 ClassBox 를 다시 쓴다 — 이름 칸(밑줄)과 슬롯 칸 둘, 연산 칸은 비어 있어 그리지 않는다(S12)
        <ClassBox
          key={o.id}
          id={o.id}
          x={o.x}
          y={o.y}
          width={o.width}
          height={o.height}
          name={objectTitle(o)}
          nameUnderline
          attributes={(o.slots ?? []).map((s) => `${s.name} = ${s.value}`)}
          fill={o.fill}
          stroke={o.stroke}
        />
      ))}
      {links.map((l) => (
        <Edge
          key={l.id}
          from={l.from}
          to={l.to}
          markerEnd="none"
          strokeWidth={1.5}
          label={l.label}
          labelOffset={l.labelOffset}
          fromLabel={l.fromLabel}
          toLabel={l.toLabel}
          labelFontSize={10}
        />
      ))}
    </Canvas>
  );
}

ObjectDiagram.displayName = 'ObjectDiagram';
