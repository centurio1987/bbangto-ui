import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { parseViewBox } from '../geometry/layout';

export interface SwotMatrixData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface SwotMatrixProps extends Omit<CanvasProps, 'data'> {
  data?: SwotMatrixData;
  labels?: Partial<Record<keyof SwotMatrixData, string>>;
  children?: ReactNode;
}

interface QuadSpec {
  key: keyof SwotMatrixData;
  title: string;
  palette: string;
  col: 0 | 1;
  row: 0 | 1;
}

const DEFAULT_TITLES: Record<keyof SwotMatrixData, string> = {
  strengths: 'Strengths',
  weaknesses: 'Weaknesses',
  opportunities: 'Opportunities',
  threats: 'Threats',
};

/** SWOT (VT-703) — 강점/약점/기회/위협 4분면. headless. */
export function SwotMatrix({
  data,
  labels,
  viewBox,
  children,
  title = 'SWOT matrix',
  ...canvasProps
}: SwotMatrixProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 440, 360]);

  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="swot" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const gap = 10;
  const pad = 16;
  const cellW = (vbW - pad * 2 - gap) / 2;
  const cellH = (vbH - pad * 2 - gap) / 2;

  const quads: QuadSpec[] = [
    { key: 'strengths', title: labels?.strengths ?? DEFAULT_TITLES.strengths, palette: 'p1', col: 0, row: 0 },
    { key: 'weaknesses', title: labels?.weaknesses ?? DEFAULT_TITLES.weaknesses, palette: 'p2', col: 1, row: 0 },
    { key: 'opportunities', title: labels?.opportunities ?? DEFAULT_TITLES.opportunities, palette: 'p3', col: 0, row: 1 },
    { key: 'threats', title: labels?.threats ?? DEFAULT_TITLES.threats, palette: 'p4', col: 1, row: 1 },
  ];

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="swot" {...canvasProps}>
      {quads.map((q) => {
        const x = vbX + pad + q.col * (cellW + gap);
        const y = vbY + pad + q.row * (cellH + gap);
        const items = data[q.key];
        return (
          <g key={q.key} data-bbangto-viz-swot-quadrant data-bbangto-viz-swot-quadrant-key={q.key}>
            <rect data-viz-part="shape" x={x} y={y} width={cellW} height={cellH} rx={8} style={{ fill: vvar('palette', q.palette), fillOpacity: 0.28, stroke: vvar('palette', q.palette), strokeWidth: 1.5 }} />
            <text x={x + 14} y={y + 22} fontSize={14} fontWeight={800} fontFamily={vvar('typography', 'titleFont')} style={{ fill: vvar('shape', 'stroke') }}>
              {q.title}
            </text>
            {items.map((it, i) => (
              <text key={i} x={x + 14} y={y + 46 + i * 18} fontSize={11} fontFamily={resolveLabelFont(it)} style={{ fill: vvar('shape', 'stroke') }}>
                {`• ${it}`}
              </text>
            ))}
          </g>
        );
      })}
    </Canvas>
  );
}

SwotMatrix.displayName = 'SwotMatrix';
