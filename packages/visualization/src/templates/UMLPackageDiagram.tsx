import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

export type UMLPackageDependencyKind = 'import' | 'access' | 'merge';

export interface UMLPackageSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  fill?: string;
}

export interface UMLPackageDependencySpec {
  id: string;
  from: string;
  to: string;
  kind?: UMLPackageDependencyKind;
  label?: string;
}

export interface UMLPackageDiagramData {
  packages: UMLPackageSpec[];
  dependencies?: UMLPackageDependencySpec[];
}

export interface UMLPackageDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: UMLPackageDiagramData;
}

/** UML Package Diagram (VT-102) — folder(탭) 패키지 + «import»/«access» 의존 엣지. headless. */
export function UMLPackageDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'UML package diagram',
  ...props
}: UMLPackageDiagramProps) {
  if (children != null || !data) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} data-bbangto-viz-chart="uml-package" {...props}>
        {children}
      </Canvas>
    );
  }

  const packages = data.packages;
  const dependencies = data.dependencies ?? [];
  const nodes = packages.map((p) => ({ id: p.id, x: p.x, y: p.y, width: p.width, height: p.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!nodes.length) return '0 0 600 300';
    const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas
      data={{ nodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      data-bbangto-viz-chart="uml-package"
      {...props}
    >
      {packages.map((p) => (
        <g key={p.id} data-bbangto-viz-package data-bbangto-viz-package-id={p.id}>
          <Node id={p.id} x={p.x} y={p.y} width={p.width} height={p.height} shape="folder" fill={p.fill} />
          <NodeLabel x={p.x} y={p.y + p.height / 2 + 7} width={p.width} title={p.label} fontSize={12} />
        </g>
      ))}
      {dependencies.map((d) => (
        <g key={d.id} data-bbangto-viz-package-dep data-bbangto-viz-package-dep-kind={d.kind ?? 'import'}>
          <Edge id={d.id} from={d.from} to={d.to} markerEnd="triangleOpen" strokeDasharray="6 4" strokeWidth={1.5} />
        </g>
      ))}
      {/* 의존 스테레오타입 라벨(엣지 중앙 근사 배치) */}
      {dependencies.map((d) => {
        const from = packages.find((p) => p.id === d.from);
        const to = packages.find((p) => p.id === d.to);
        if (!from || !to) return null;
        const mx = (from.x + from.width / 2 + to.x + to.width / 2) / 2;
        const my = (from.y + from.height / 2 + to.y + to.height / 2) / 2;
        const stereotype = d.label ?? (d.kind ? `«${d.kind}»` : null);
        if (!stereotype) return null;
        return (
          <text
            key={`lbl-${d.id}`}
            data-bbangto-viz-package-dep-stereotype
            x={mx}
            y={my}
            textAnchor="middle"
            fontSize={9}
            fontFamily={resolveLabelFont(stereotype)}
            style={{ fill: vvar('boundary', 'labelColor') }}
          >
            {stereotype}
          </text>
        );
      })}
    </Canvas>
  );
}

UMLPackageDiagram.displayName = 'UMLPackageDiagram';
