import React from 'react';
import { vvar } from '../tokens/contract';

export interface MockupNodeProps {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title?: string;
  variant?: 'browser' | 'mobile';
}

/** 화면 목업 프레임 노드(molecule) — ScreenFlow용. 타이틀바 + 콘텐츠 영역 플레이스홀더. */
export const MockupNode = React.forwardRef<SVGGElement, MockupNodeProps>(
  ({ id, x, y, width, height, title, variant = 'browser' }, ref) => {
    const barH = variant === 'mobile' ? 22 : 20;
    const dotR = 3;
    return (
      <g ref={ref} data-bbangto-viz-mockup-node data-bbangto-viz-mockup-node-id={id} data-bbangto-viz-mockup-variant={variant}>
        {/* 프레임 */}
        <rect data-viz-part="shape" x={x} y={y} width={width} height={height} rx={variant === 'mobile' ? 14 : 6} style={{ fill: vvar('canvas', 'bg') }} />
        {/* 타이틀바 */}
        <rect data-viz-part="shape" x={x} y={y} width={width} height={barH} rx={variant === 'mobile' ? 14 : 6} style={{ fill: vvar('palette', 'p2') }} />
        <rect data-viz-part="shape" x={x} y={y + barH - 8} width={width} height={8} style={{ fill: vvar('palette', 'p2') }} />
        {variant === 'browser' &&
          [0, 1, 2].map((i) => (
            <circle key={i} cx={x + 12 + i * 11} cy={y + barH / 2} r={dotR} style={{ fill: vvar('canvas', 'bg') }} />
          ))}
        {/* 콘텐츠 플레이스홀더 라인(장식 — 시맨틱 엣지 아님) */}
        {[0, 1, 2].map((i) => (
          <rect
            key={`ph-${i}`}
            x={x + 12}
            y={y + barH + 14 + i * 16}
            width={width - 24 - (i === 2 ? width * 0.3 : 0)}
            height={7}
            rx={3}
            style={{ fill: vvar('shape', 'stroke'), opacity: 0.18 }}
          />
        ))}
        {title && (
          <text
            x={x + width / 2}
            y={y + height + 14}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {title}
          </text>
        )}
      </g>
    );
  },
);

MockupNode.displayName = 'MockupNode';
