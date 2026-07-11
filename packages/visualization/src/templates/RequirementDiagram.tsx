import { type ReactNode } from 'react';
import { DiagramCanvas } from '../atoms/DiagramCanvas';
import type { DiagramCanvasProps } from '../atoms/DiagramCanvas';
import { Edge } from '../atoms/Edge';
import { dvar } from '../tokens/contract';

export interface RequirementNodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  text?: string;
  risk?: string;
  verifyMethod?: string;
  kind?: string;
}

export interface RequirementEdgeSpec {
  id: string;
  from: string;
  to: string;
  kind?: 'contains' | 'copies' | 'derives' | 'satisfies' | 'verifies' | 'refines' | 'traces';
}

export interface RequirementDiagramProps extends Omit<DiagramCanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: {
    requirements: RequirementNodeSpec[];
    edges?: RequirementEdgeSpec[];
  };
}

const HEADER_H = 38;
const PAD = 7;
const LINE_H = 14;

interface ReqNodeProps {
  req: RequirementNodeSpec;
}

function ReqNode({ req }: ReqNodeProps) {
  const stroke = dvar('edge', 'stroke');
  const titleFont = dvar('typography', 'titleFont');
  const monoFont = dvar('typography', 'monoFont');
  const textColor = dvar('edge', 'stroke');
  const headerFill = 'rgba(0,0,0,0.06)';

  const { x, y, width, height, name, text, risk, verifyMethod, kind = 'requirement' } = req;

  const lines: string[] = [];
  if (text) lines.push(`text: ${text}`);
  if (risk) lines.push(`risk: ${risk}`);
  if (verifyMethod) lines.push(`verify: ${verifyMethod}`);

  return (
    <g data-bbangto-diagram-requirement data-bbangto-diagram-requirement-id={req.id}>
      {/* outer box */}
      <rect x={x} y={y} width={width} height={height} style={{ fill: '#FFFFFF', stroke, strokeWidth: 1.5 }} />
      {/* header background */}
      <rect x={x} y={y} width={width} height={HEADER_H} style={{ fill: headerFill, stroke, strokeWidth: 1.5 }} />
      {/* stereotype */}
      <text
        x={x + width / 2}
        y={y + 11}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={monoFont}
        fontSize={9}
        fill={textColor}
        opacity={0.6}
      >
        {`«${kind}»`}
      </text>
      {/* name */}
      <text
        data-bbangto-diagram-requirement-name
        x={x + width / 2}
        y={y + 26}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={titleFont}
        fontSize={12}
        fontWeight={700}
        fill={textColor}
      >
        {name}
      </text>
      {/* divider */}
      <line x1={x} y1={y + HEADER_H} x2={x + width} y2={y + HEADER_H} style={{ stroke, strokeWidth: 1.5 }} />
      {/* body lines */}
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + PAD}
          y={y + HEADER_H + PAD + i * LINE_H + LINE_H / 2}
          textAnchor="start"
          dominantBaseline="central"
          fontFamily={monoFont}
          fontSize={9}
          fill={textColor}
          opacity={0.8}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function RequirementDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Requirement Diagram',
  ...props
}: RequirementDiagramProps) {
  if (children) {
    return (
      <DiagramCanvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </DiagramCanvas>
    );
  }

  const reqs = data?.requirements ?? [];
  const edges = data?.edges ?? [];

  const autoViewBox = viewBox ?? (() => {
    if (!reqs.length) return '0 0 600 200';
    const maxX = Math.max(...reqs.map((r) => r.x + r.width)) + 20;
    const maxY = Math.max(...reqs.map((r) => r.y + r.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <DiagramCanvas
      data={{ nodes: reqs.map((r) => ({ id: r.id, x: r.x, y: r.y, width: r.width, height: r.height })) }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {reqs.map((r) => (
        <ReqNode key={r.id} req={r} />
      ))}
      {edges.map((e) => (
        <Edge
          key={e.id}
          from={e.from}
          to={e.to}
          markerEnd="arrowOpen"
          stroke="#555555"
          strokeWidth={1.5}
          strokeDasharray="5 3"
        />
      ))}
    </DiagramCanvas>
  );
}

RequirementDiagram.displayName = 'RequirementDiagram';
