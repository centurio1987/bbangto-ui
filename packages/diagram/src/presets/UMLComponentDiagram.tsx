import React, { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { dvar } from '../tokens/contract';

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

export interface UMLComponentDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
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
        data-bbangto-diagram-uml-lollipop
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
        data-bbangto-diagram-uml-socket
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
      />
    </>
  );
}

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
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
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

  const stroke = dvar('edge', 'stroke');

  return (
    <DiagramCanvas
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
    </DiagramCanvas>
  );
}

UMLComponentDiagram.displayName = 'UMLComponentDiagram';
