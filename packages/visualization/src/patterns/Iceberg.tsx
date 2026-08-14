import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { icebergLayout } from '../geometry/iceberg';

const PALETTE_KEYS = ['p5', 'p4', 'p6', 'p8', 'p2', 'p3'] as const;

export interface IcebergLayer {
  id: string;
  label: string;
  color?: string;
}

export interface IcebergProps extends Omit<CanvasProps, 'data'> {
  /** tip = 수면 위(관찰 가능), layers = 수면 아래(숨은 구조). */
  data?: { tip: { label: string }; layers: IcebergLayer[] };
  children?: ReactNode;
}

/** Iceberg model (VT-704) — 수면 위 tip + 수면 아래 사다리꼴 레이어. icebergLayout geometry. headless. */
/**
 * @vizType VT-704 Iceberg · G. 개념 프레임워크 · dataShape: concept, hierarchy · 구조: nested, paired
 * @useWhen 표면 현상과 그 아래 숨은 근본 원인을 은유로 표현할 때
 * @avoidWhen 동심원 근접 계층은 Onion(VT-705) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Iceberg({
  data,
  viewBox,
  children,
  title = 'Iceberg diagram',
  ...canvasProps
}: IcebergProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 300, 360]);

  if (children != null || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="iceberg" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const layers = data.layers;
  const layout = icebergLayout({ width: vbW, height: vbH, layers: layers.length });
  const off = (p: { x: number; y: number }) => ({ x: p.x + vbX, y: p.y + vbY });

  const stroke = vvar('shape', 'stroke');
  const apex = off(layout.tip.apex);
  const bl = off(layout.tip.baseLeft);
  const br = off(layout.tip.baseRight);
  const bodyBottom = off(layout.body.bottom);
  const bodyTR = off(layout.body.topRight);
  const waterY = layout.waterlineY + vbY;

  // 밴드 y에서의 본체 반폭(선형 taper) → 사다리꼴 좌우 x.
  const halfAt = (y: number) => (bodyTR.x - bodyBottom.x) * ((bodyBottom.y - y) / (bodyBottom.y - bodyTR.y));
  const cx = bodyBottom.x;

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="iceberg" {...canvasProps}>
      {/* 수면 위 tip */}
      <path
        data-viz-part="shape"
        data-bbangto-viz-iceberg-tip
        d={`M ${apex.x} ${apex.y} L ${br.x} ${br.y} L ${bl.x} ${bl.y} Z`}
        style={{ fill: vvar('palette', 'p7'), stroke, strokeWidth: 1.5 }}
      />
      <text
        x={apex.x}
        y={(apex.y + waterY) / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight={800}
        fontFamily={vvar('typography', 'titleFont')}
        style={{ fill: stroke }}
      >
        {data.tip.label}
      </text>

      {/* 수면 아래 레이어(사다리꼴, 위→아래 폭 축소) */}
      {layout.bands.map((b, i) => {
        const yTop = b.y + vbY;
        const yBot = yTop + b.height;
        const hwTop = halfAt(yTop);
        const hwBot = halfAt(yBot);
        const layer = layers[i];
        const d = `M ${cx - hwTop} ${yTop} L ${cx + hwTop} ${yTop} L ${cx + hwBot} ${yBot} L ${cx - hwBot} ${yBot} Z`;
        return (
          <g key={layer.id} data-bbangto-viz-iceberg-layer data-bbangto-viz-iceberg-layer-id={layer.id}>
            <path data-viz-part="shape" d={d} style={{ fill: layer.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), fillOpacity: 0.85, stroke, strokeWidth: 1 }} />
            <text
              x={cx}
              y={(yTop + yBot) / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontWeight={600}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: stroke }}
            >
              {layer.label}
            </text>
          </g>
        );
      })}

      {/* 수면선 */}
      <line
        data-bbangto-viz-waterline
        data-bbangto-viz-edge
        x1={vbX + 8}
        y1={waterY}
        x2={vbX + vbW - 8}
        y2={waterY}
        style={{ stroke: vvar('palette', 'p8'), strokeWidth: 2, strokeDasharray: '6 4' }}
      />
    </Canvas>
  );
}

Iceberg.displayName = 'Iceberg';
