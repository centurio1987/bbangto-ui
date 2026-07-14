import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Node } from '../atoms/Node';
import { Edge } from '../atoms/Edge';
import { NodeLabel } from '../atoms/NodeLabel';
import { vvar } from '../tokens/contract';
import { knowledgeSourcePath, bkmPath } from '../geometry/shapes';

export type DMNNodeKind = 'decision' | 'inputData' | 'knowledgeSource' | 'bkm';
export type DMNRequirementKind = 'information' | 'knowledge' | 'authority';

export interface DMNNodeSpec {
  id: string;
  kind: DMNNodeKind;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
}

export interface DMNRequirementSpec {
  id: string;
  from: string;
  to: string;
  kind?: DMNRequirementKind;
}

export interface DMNDiagramData {
  nodes: DMNNodeSpec[];
  requirements?: DMNRequirementSpec[];
}

export interface DMNDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: DMNDiagramData;
}

const KIND_FILL: Record<DMNNodeKind, string> = {
  decision: 'p5',
  inputData: 'p6',
  knowledgeSource: 'p4',
  bkm: 'p2',
};

function DMNShape({ spec }: { spec: DMNNodeSpec }) {
  const bbox = { x: spec.x, y: spec.y, width: spec.width, height: spec.height };
  const fill = spec.fill ?? vvar('palette', KIND_FILL[spec.kind]);
  const stroke = vvar('shape', 'stroke');
  const style = { fill, stroke, strokeWidth: 1.5 };

  if (spec.kind === 'decision') {
    return <Node id={spec.id} x={spec.x} y={spec.y} width={spec.width} height={spec.height} shape="rect" fill={fill} />;
  }
  if (spec.kind === 'inputData') {
    return <Node id={spec.id} x={spec.x} y={spec.y} width={spec.width} height={spec.height} shape="stadium" fill={fill} />;
  }
  const d = spec.kind === 'knowledgeSource' ? knowledgeSourcePath(bbox) : bkmPath(bbox);
  return <path data-viz-part="shape" d={d} style={style} />;
}

/** DMN Decision Requirements (VT-124) — decision/inputData/knowledgeSource/bkm + 요구 엣지. headless. */
export function DMNDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'DMN decision requirements',
  ...props
}: DMNDiagramProps) {
  if (children != null || !data) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} data-bbangto-viz-chart="dmn" {...props}>
        {children}
      </Canvas>
    );
  }

  const nodes = data.nodes;
  const requirements = data.requirements ?? [];
  const registry = nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, width: n.width, height: n.height }));

  const autoViewBox = viewBox ?? (() => {
    if (!registry.length) return '0 0 600 300';
    const maxX = Math.max(...registry.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...registry.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const edgeProps = (kind?: DMNRequirementKind) => {
    switch (kind) {
      case 'knowledge': return { markerEnd: 'arrow' as const, strokeDasharray: '6 4' };
      case 'authority': return { markerEnd: 'circle' as const, strokeDasharray: '2 3' };
      default:          return { markerEnd: 'arrow' as const, strokeDasharray: undefined };
    }
  };

  return (
    <Canvas
      data={{ nodes: registry }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      data-bbangto-viz-chart="dmn"
      {...props}
    >
      {requirements.map((r) => {
        const e = edgeProps(r.kind);
        return (
          <Edge
            key={r.id}
            id={r.id}
            from={r.from}
            to={r.to}
            markerEnd={e.markerEnd}
            strokeDasharray={e.strokeDasharray}
            strokeWidth={1.5}
            data-bbangto-viz-dmn-requirement-kind={r.kind ?? 'information'}
          />
        );
      })}
      {nodes.map((n) => (
        <g key={n.id} data-bbangto-viz-dmn-node data-bbangto-viz-dmn-node-kind={n.kind} data-bbangto-viz-dmn-node-id={n.id}>
          <DMNShape spec={n} />
          <NodeLabel x={n.x} y={n.y + n.height / 2} width={n.width} title={n.label} fontSize={11} />
        </g>
      ))}
    </Canvas>
  );
}

DMNDiagram.displayName = 'DMNDiagram';
