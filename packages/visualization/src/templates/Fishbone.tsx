import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { fishboneLayout } from '../geometry/fishbone';

export interface FishboneCategory {
  id: string;
  label: string;
  causes?: string[];
}

export interface FishboneProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { problem: string; categories: FishboneCategory[] };
  /** 뼈대 각도(도). 기본 40. */
  boneAngle?: number;
  children?: ReactNode;
}

const HEAD_W = 120;

/**
 * Fishbone / Ishikawa (VT-706) — 수평 척추 + 인덱스 홀짝 상/하 교차 원인 범주 뼈대.
 * fishboneLayout geometry 재사용. headless(problem 헤드 + 범주/원인 텍스트).
 */
export function Fishbone({
  data,
  boneAngle = 42,
  viewBox,
  children,
  title = 'Fishbone diagram',
  ...canvasProps
}: FishboneProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 560, 280]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="fishbone" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { problem, categories } = data;
  const spineY = vbY + vbH / 2;
  const spineLength = vbW - HEAD_W - 20;
  const boneLength = Math.min(vbH * 0.36, 90);

  const layout = fishboneLayout({
    categories: categories.length,
    spineLength,
    spineY,
    boneLength,
    boneAngle,
  });

  const stroke = vvar('shape', 'stroke');
  const edge = vvar('edge', 'stroke');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="fishbone" {...canvasProps}>
      {/* 척추 */}
      <path
        data-bbangto-viz-edge
        data-bbangto-viz-fishbone-spine
        d={`M ${vbX + layout.spine.x1} ${layout.spine.y1} L ${vbX + layout.spine.x2} ${layout.spine.y2}`}
        style={{ fill: 'none', stroke, strokeWidth: 3 }}
      />
      {/* 머리(문제) */}
      <g data-bbangto-viz-fishbone-head>
        <path
          data-viz-part="shape"
          d={`M ${vbX + spineLength} ${spineY - 34} L ${vbX + spineLength + HEAD_W} ${spineY} L ${vbX + spineLength} ${spineY + 34} Z`}
          style={{ fill: vvar('palette', 'p2'), stroke, strokeWidth: 2 }}
        />
        <text
          x={vbX + spineLength + HEAD_W / 2 + 6}
          y={spineY}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
          fontWeight={800}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: vvar('shape', 'stroke') }}
        >
          {problem}
        </text>
      </g>
      {/* 범주 뼈대 + 원인 */}
      {layout.bones.map((b, i) => {
        const cat = categories[i];
        const x1 = vbX + b.x1;
        const x2 = vbX + b.x2;
        const causes = cat.causes ?? [];
        return (
          <g key={cat.id} data-bbangto-viz-bone data-bbangto-viz-bone-id={cat.id} data-bbangto-viz-bone-side={b.side}>
            <path data-bbangto-viz-edge d={`M ${x1} ${b.y1} L ${x2} ${b.y2}`} style={{ fill: 'none', stroke: edge, strokeWidth: 2 }} />
            {/* 범주 라벨(뼈대 꼬리) */}
            <text
              x={x1}
              y={b.side === 'top' ? b.y1 - 6 : b.y1 + 14}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('shape', 'stroke') }}
            >
              {cat.label}
            </text>
            {/* 원인 텍스트(뼈대 따라) */}
            {causes.map((c, ci) => {
              const t = (ci + 1) / (causes.length + 1);
              const px = x1 + (x2 - x1) * t;
              const py = b.y1 + (b.y2 - b.y1) * t + (b.side === 'top' ? -4 : 12);
              return (
                <text
                  key={ci}
                  data-bbangto-viz-cause
                  x={px + 6}
                  y={py}
                  fontSize={10}
                  fontFamily={vvar('typography', 'monoFont')}
                  style={{ fill: vvar('boundary', 'labelColor') }}
                >
                  {c}
                </text>
              );
            })}
          </g>
        );
      })}
    </Canvas>
  );
}

Fishbone.displayName = 'Fishbone';
