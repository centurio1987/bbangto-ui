import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { parseViewBox } from '../geometry/layout';

export interface PosterEditorialProps extends Omit<CanvasProps, 'data'> {
  data?: { eyebrow?: string; title: string; subtitle?: string; items?: string[] };
  children?: ReactNode;
}

const PAD = 32;

/** Poster editorial (VT-609) — 타이포 위계 지면. headless(typography 토큰만). */
export function PosterEditorial({ data, viewBox, children, title = 'Poster', ...canvasProps }: PosterEditorialProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 520, 360]);

  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="poster-editorial" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const left = vbX + PAD;
  const right = vbX + vbW - PAD;
  const titleFont = vvar('typography', 'titleFont');
  const ink = vvar('shape', 'stroke');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="poster-editorial" {...canvasProps}>
      {/* 상단 규칙선 */}
      <path data-bbangto-viz-edge d={`M ${left} ${vbY + PAD} L ${right} ${vbY + PAD}`} style={{ fill: 'none', strokeWidth: 2 }} />
      {data.eyebrow && (
        <text x={left} y={vbY + PAD + 26} fontSize={13} fontWeight={700} letterSpacing="0.18em" fontFamily={resolveLabelFont(data.eyebrow)} style={{ fill: vvar('palette', 'p1') }}>
          {data.eyebrow}
        </text>
      )}
      <text data-bbangto-viz-poster-title x={left} y={vbY + vbH * 0.42} fontSize={54} fontWeight={800} fontFamily={titleFont} style={{ fill: ink }}>
        {data.title}
      </text>
      {data.subtitle && (
        <text x={left} y={vbY + vbH * 0.42 + 34} fontSize={17} fontWeight={500} fontFamily={titleFont} style={{ fill: ink, opacity: 0.75 }}>
          {data.subtitle}
        </text>
      )}
      {/* 하단 규칙선 + 항목 */}
      <path data-bbangto-viz-edge d={`M ${left} ${vbY + vbH * 0.62} L ${right} ${vbY + vbH * 0.62}`} style={{ fill: 'none' }} />
      {(data.items ?? []).map((it, i) => (
        <text
          key={i}
          x={left}
          y={vbY + vbH * 0.62 + 28 + i * 26}
          fontSize={15}
          fontWeight={600}
          fontFamily={titleFont}
          style={{ fill: ink }}
        >
          {`0${i + 1} — ${it}`}
        </text>
      ))}
    </Canvas>
  );
}

PosterEditorial.displayName = 'PosterEditorial';
