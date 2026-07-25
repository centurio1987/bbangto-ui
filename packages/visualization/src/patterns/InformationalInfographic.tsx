import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface InformationalSection {
  id: string;
  title: string;
  body: string;
  /** 아이콘 대체 텍스트(1~2자). 미지정 시 순번. */
  glyph?: string;
}

export interface InformationalInfographicProps extends Omit<CanvasProps, 'data'> {
  data?: {
    heading?: string;
    intro?: string;
    sections: InformationalSection[];
    columns?: number;
  };
  children?: ReactNode;
}

/** Informational infographic (VT-604) — 텍스트 중심 개요(헤딩+인트로+섹션 그리드). headless. */
export function InformationalInfographic({
  data,
  viewBox,
  children,
  title = 'Informational infographic',
  ...canvasProps
}: InformationalInfographicProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 520, 320]);

  if (children != null || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="informational" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { heading, intro, sections } = data;
  const cols = Math.max(1, data.columns ?? 2);
  const rows = Math.ceil(sections.length / cols);

  const headerH = heading || intro ? 64 : 12;
  const gridTop = vbY + headerH;
  const gridH = vbH - headerH - 16;
  const margin = 16;
  const cellW = (vbW - margin * (cols + 1)) / cols;
  const cellH = rows ? (gridH - margin * (rows + 1)) / rows : 0;

  const stroke = vvar('shape', 'stroke');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="informational" {...canvasProps}>
      {heading && (
        <text x={vbX + margin} y={vbY + 26} fontSize={18} fontWeight={800} fontFamily={vvar('typography', 'titleFont')} style={{ fill: stroke }}>
          {heading}
        </text>
      )}
      {intro && (
        <text x={vbX + margin} y={vbY + 48} fontSize={12} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('boundary', 'labelColor') }}>
          {intro}
        </text>
      )}
      {sections.map((s, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = vbX + margin + col * (cellW + margin);
        const y = gridTop + margin + row * (cellH + margin);
        const badgeR = 14;
        return (
          <g key={s.id} data-bbangto-viz-info-section data-bbangto-viz-info-section-id={s.id}>
            <rect data-viz-part="shape" x={x} y={y} width={cellW} height={cellH} rx={8} style={{ fill: vvar('canvas', 'grid'), stroke, strokeWidth: 1 }} />
            <circle data-viz-part="shape" cx={x + 22} cy={y + 24} r={badgeR} style={{ fill: vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]) }} />
            <text x={x + 22} y={y + 24} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={800} fontFamily={vvar('typography', 'monoFont')} style={{ fill: stroke }}>
              {s.glyph ?? String(i + 1)}
            </text>
            <text x={x + 44} y={y + 28} fontSize={14} fontWeight={700} fontFamily={vvar('typography', 'titleFont')} style={{ fill: stroke }}>
              {s.title}
            </text>
            <text x={x + 14} y={y + 52} fontSize={11} fontFamily={vvar('typography', 'monoFont')} style={{ fill: vvar('boundary', 'labelColor') }}>
              {s.body}
            </text>
          </g>
        );
      })}
    </Canvas>
  );
}

InformationalInfographic.displayName = 'InformationalInfographic';
