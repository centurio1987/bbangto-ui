import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface OnionLayer {
  id: string;
  label: string;
  color?: string;
}

export interface OnionDiagramProps extends Omit<CanvasProps, 'data'> {
  /** layers[0] = 최내핵(core), 마지막 = 최외곽. */
  data?: { layers: OnionLayer[] };
  children?: ReactNode;
}

/** Onion / Concentric (VT-705) — 동심원 근접도 레이어. headless(값=레이어 라벨). */
/**
 * @vizType VT-705 Onion / Concentric · G. 개념 프레임워크 · dataShape: hierarchy, concept · 구조: nested
 * @useWhen 동심원 근접도로 이해관계자/의존 계층을 표현할 때
 * @avoidWhen 수직 층상 은유는 Iceberg(VT-704) 사용
 * @avoidWhen 방사 위계는 Mindmap(VT-301) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function OnionDiagram({
  data,
  viewBox,
  children,
  title = 'Onion diagram',
  ...canvasProps
}: OnionDiagramProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 400, 400]);

  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="onion" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const layers = data.layers;
  const n = layers.length;
  const cx = vbX + vbW / 2;
  const cy = vbY + vbH / 2;
  const rMax = Math.min(vbW, vbH) * 0.44;
  const radiusOf = (i: number) => (rMax * (i + 1)) / n;

  // 외곽부터 그려 안쪽 원이 위에 오게(중첩). 라벨은 각 밴드 상단.
  const order = layers.map((_, i) => i).reverse();

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="onion" {...canvasProps}>
      {order.map((i) => {
        const layer = layers[i];
        const r = radiusOf(i);
        return (
          <circle
            key={layer.id}
            data-bbangto-viz-onion-layer
            data-bbangto-viz-onion-layer-id={layer.id}
            data-viz-part="shape"
            cx={cx}
            cy={cy}
            r={r}
            style={{ fill: layer.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), stroke: vvar('canvas', 'bg'), strokeWidth: 2 }}
          />
        );
      })}
      {layers.map((layer, i) => {
        const rOuter = radiusOf(i);
        const rInner = i === 0 ? 0 : radiusOf(i - 1);
        const labelY = cy - (rOuter + rInner) / 2;
        return (
          <text
            key={`l-${layer.id}`}
            x={cx}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {layer.label}
          </text>
        );
      })}
    </Canvas>
  );
}

OnionDiagram.displayName = 'OnionDiagram';
