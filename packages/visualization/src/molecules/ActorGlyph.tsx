import React from 'react';
import { vvar } from '../tokens/contract';

export interface ActorGlyphProps {
  id?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  stroke?: string;
}

/**
 * UML 액터(막대 인간) 글리프 — UseCaseDiagram 전용. 라벨은 하단 병기.
 * bbox(x,y,width,height)는 caller가 지정(Edge 앵커용 registry와 정렬).
 */
export const ActorGlyph = React.forwardRef<SVGGElement, ActorGlyphProps>(
  ({ id, x, y, width = 40, height = 64, label, stroke }, ref) => {
    const s = stroke ?? vvar('shape', 'stroke');
    const cx = x + width / 2;
    const headR = Math.min(width, height) * 0.16;
    const headCy = y + headR + 2;
    const bodyTop = headCy + headR;
    const bodyBot = bodyTop + height * 0.42;
    const armY = bodyTop + height * 0.12;
    const legY = bodyBot + height * 0.22;
    const armSpan = width * 0.42;
    const legSpan = width * 0.36;

    return (
      <g ref={ref} data-bbangto-viz-actor data-bbangto-viz-actor-id={id}>
        <circle data-viz-part="shape" cx={cx} cy={headCy} r={headR} style={{ fill: 'none', stroke: s, strokeWidth: 2 }} />
        <path
          data-bbangto-viz-edge
          d={`M ${cx} ${bodyTop} L ${cx} ${bodyBot}
              M ${cx - armSpan} ${armY} L ${cx + armSpan} ${armY}
              M ${cx} ${bodyBot} L ${cx - legSpan} ${legY}
              M ${cx} ${bodyBot} L ${cx + legSpan} ${legY}`}
          style={{ fill: 'none', stroke: s, strokeWidth: 2 }}
        />
        <text
          x={cx}
          y={y + height + 2}
          textAnchor="middle"
          dominantBaseline="hanging"
          fontSize={11}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('shape', 'stroke') }}
        >
          {label}
        </text>
      </g>
    );
  },
);

ActorGlyph.displayName = 'ActorGlyph';
