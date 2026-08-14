import React, { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { vvar } from '../tokens/contract';

export interface UMLInterfaceSpec {
  name: string;
  x: number;
  y: number;
  kind?: 'provided' | 'required';
  direction?: 'right' | 'left' | 'top' | 'bottom';
}

export interface UMLComponentSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  providedInterfaces?: UMLInterfaceSpec[];
  requiredInterfaces?: UMLInterfaceSpec[];
}

export interface UMLDependencySpec {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface UMLComponentDiagramData {
  components: UMLComponentSpec[];
  dependencies?: UMLDependencySpec[];
}

export interface UMLComponentDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: UMLComponentDiagramData;
}

interface LollipopProps {
  x: number;
  y: number;
  lineLen?: number;
  radius?: number;
  direction?: 'right' | 'left' | 'top' | 'bottom';
  stroke?: string;
}

function Lollipop({ x, y, lineLen = 18, radius = 5, direction = 'right', stroke = '#111111' }: LollipopProps) {
  const isV = direction === 'top' || direction === 'bottom';
  const dirSign = direction === 'right' || direction === 'bottom' ? 1 : -1;

  const endX = isV ? x : x + dirSign * lineLen;
  const endY = isV ? y + dirSign * lineLen : y;
  const cx = isV ? x : endX + dirSign * radius;
  const cy = isV ? endY + dirSign * radius : y;

  return (
    <>
      <line x1={x} y1={y} x2={endX} y2={endY} stroke={stroke} strokeWidth={1.5} />
      <circle
        data-bbangto-viz-uml-lollipop
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
      />
    </>
  );
}

interface SocketProps {
  x: number;
  y: number;
  lineLen?: number;
  radius?: number;
  direction?: 'right' | 'left' | 'top' | 'bottom';
  stroke?: string;
}

function Socket({ x, y, lineLen = 18, radius = 5, direction = 'right', stroke = '#111111' }: SocketProps) {
  const dirSign = direction === 'right' || direction === 'bottom' ? 1 : -1;
  const endX = x + dirSign * lineLen;
  const cx = endX + dirSign * radius;
  const sweep = direction === 'right' ? 1 : 0;
  const d = `M ${cx} ${y - radius} A ${radius} ${radius} 0 0 ${sweep} ${cx} ${y + radius}`;

  return (
    <>
      <line x1={x} y1={y} x2={endX} y2={y} stroke={stroke} strokeWidth={1.5} />
      <path
        data-bbangto-viz-uml-socket
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
      />
    </>
  );
}

/**
 * @vizType VT-103 UML Component Diagram · A. 엔지니어링/소프트웨어 · dataShape: relationship, network · 구조: relational
 * @useWhen 컴포넌트와 제공/요구 인터페이스 배선을 표현할 때
 * @useWhen 모듈 아키텍처를 명세할 때
 * @avoidWhen 런타임 배치는 Deployment(VT-104) 사용
 * @avoidWhen 클래스 상세는 Class(VT-101) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function UMLComponentDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'UML Component Diagram',
  ...props
}: UMLComponentDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const components = data?.components ?? [];
  const dependencies = data?.dependencies ?? [];

  const allNodes = components.map((c) => ({ id: c.id, x: c.x, y: c.y, width: c.width, height: c.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 300';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 60;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const stroke = vvar('edge', 'stroke');

  return (
    <Canvas
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {components.map((c) => (
        <React.Fragment key={c.id}>
          <Node
            id={c.id}
            x={c.x}
            y={c.y}
            width={c.width}
            height={c.height}
            shape="component"
            fill="#FFFFFF"
            stroke="#111111"
            strokeWidth={2}
          />
          <NodeLabel x={c.x} y={c.y + c.height / 2} width={c.width} title={c.name} fontSize={12} />
          {c.providedInterfaces?.map((iface, i) => (
            <Lollipop
              key={i}
              x={iface.x}
              y={iface.y}
              direction={iface.direction ?? 'right'}
              stroke={typeof stroke === 'string' ? stroke : '#111111'}
            />
          ))}
          {c.requiredInterfaces?.map((iface, i) => (
            <Socket
              key={i}
              x={iface.x}
              y={iface.y}
              direction={iface.direction ?? 'right'}
              stroke={typeof stroke === 'string' ? stroke : '#111111'}
            />
          ))}
        </React.Fragment>
      ))}
      {dependencies.map((d) => (
        <Edge key={d.id} from={d.from} to={d.to} markerEnd="arrow" strokeDasharray="5 3" strokeWidth={1.5} />
      ))}
    </Canvas>
  );
}

UMLComponentDiagram.displayName = 'UMLComponentDiagram';
