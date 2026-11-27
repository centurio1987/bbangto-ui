import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { pickOnInk, surfacesFor } from '../tokens/onInk';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';
import { resolveLabelFont } from '../tokens/labelFont';
import { parseViewBox } from '../geometry/layout';

/** SEI Views and Beyond 의 세 뷰 종류(viewtype) */
export type ViewsAndBeyondRegionKey = 'module' | 'cc' | 'allocation';

/** 영역별 슬롯 — 다른 도식(프리셋)을 넣는다 */
export type ViewsAndBeyondSlots = Partial<Record<ViewsAndBeyondRegionKey, ReactNode>>;

/** 슬롯 없이 빠르게 채우는 불릿 폴백 */
export type ViewsAndBeyondData = Partial<Record<ViewsAndBeyondRegionKey, string[]>>;

export interface ViewsAndBeyondFrameProps extends Omit<CanvasProps, 'data' | 'children'> {
  /** 영역별 중첩 도식 슬롯. 영역마다 slot 우선, 없으면 data 불릿, 둘 다 없으면 골격만. */
  slots?: ViewsAndBeyondSlots;
  /** 영역별 불릿 폴백. slot 이 있으면 그 영역은 무시(병합하지 않는다). */
  data?: ViewsAndBeyondData;
}

interface RegionMeta {
  key: ViewsAndBeyondRegionKey;
  label: string;
  sub: string;
  palette: string;
}

const REGIONS: RegionMeta[] = [
  { key: 'module', label: 'Module views', sub: 'code structure · decomposition · uses · layers', palette: 'p1' },
  { key: 'cc', label: 'Component-and-Connector views', sub: 'runtime structure · processes · connectors', palette: 'p4' },
  { key: 'allocation', label: 'Allocation views', sub: 'deployment · implementation · work assignment', palette: 'p8' },
];

const P = 18; // 바깥 여백
const G = 14; // 영역 사이 간격
const PAD = 12; // 영역 안 여백
const TITLE_BLOCK = 42; // 제목 + 부제 높이

/**
 * SEI Views and Beyond 프레임(KAN-082.5) — 소프트웨어 아키텍처 문서의 뷰를 Module(코드 구조) · C&C(런타임 구조) ·
 * Allocation(물리 배치 · 팀 배치) 셋으로 나눠 가로로 놓는다. 유형이 아니라 다른 도식을 담는 **조합 프레임**이라
 * Kruchten4Plus1View · ViewpointFrame 처럼 유형 축(registry)에 넣지 않는다. 영역마다 `slots` 의 중첩 도식을 먼저
 * 그리고, 없으면 `data` 의 불릿을 그린다(영역 단위로 합치지 않는다). headless.
 */
export function ViewsAndBeyondFrame({
  slots,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'SEI Views and Beyond',
  ...props
}: ViewsAndBeyondFrameProps) {
  const vb = parseViewBox(viewBox, [0, 0, 900, 420]);
  const [vbX, vbY, vbW, vbH] = vb;
  const colW = (vbW - 2 * P - 2 * G) / 3;
  const rowH = vbH - 2 * P;
  const stroke = vvar('shape', 'stroke');
  const foundation = useVizFoundation();
  const regionInk = (key: string) =>
    pickOnInk(foundation, surfacesFor(foundation, foundation.palette[key as keyof typeof foundation.palette], 0.12));
  const titleFont = vvar('typography', 'titleFont');
  const labelColor = vvar('boundary', 'labelColor');

  return (
    <Canvas
      viewBox={viewBox ?? `${vbX} ${vbY} ${vbW} ${vbH}`}
      width={width}
      height={height}
      title={title}
      data-bbangto-viz-chart="views-and-beyond"
      {...props}
    >
      {REGIONS.map((meta, i) => {
        const r = { x: vbX + P + i * (colW + G), y: vbY + P, w: colW, h: rowH };
        const slot = slots?.[meta.key];
        const items = data?.[meta.key] ?? [];
        return (
          <g key={meta.key} data-bbangto-viz-vab-region data-bbangto-viz-vab-region-key={meta.key}>
            <rect
              data-viz-part="shape"
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx={8}
              ry={8}
              style={{ fill: vvar('palette', meta.palette), fillOpacity: 0.12, stroke, strokeWidth: 1.25 }}
            />
            <text
              x={r.x + PAD}
              y={r.y + 20}
              fontSize={13}
              fontWeight={800}
              fontFamily={titleFont}
              style={{ fill: regionInk(meta.palette) }}
            >
              {meta.label}
            </text>
            <text x={r.x + PAD} y={r.y + 34} fontSize={9.5} fontFamily={resolveLabelFont(meta.sub)} style={{ fill: labelColor }}>
              {meta.sub}
            </text>
            {slot != null ? (
              <svg
                data-bbangto-viz-vab-slot
                x={r.x + PAD}
                y={r.y + TITLE_BLOCK}
                width={Math.max(0, r.w - 2 * PAD)}
                height={Math.max(0, r.h - TITLE_BLOCK - PAD)}
                style={{ overflow: 'hidden' }}
              >
                {slot}
              </svg>
            ) : (
              items.map((item, ii) => (
                <text
                  key={ii}
                  data-bbangto-viz-vab-item
                  x={r.x + PAD + 2}
                  y={r.y + TITLE_BLOCK + 12 + ii * 15}
                  fontSize={10}
                  fontFamily={resolveLabelFont(item)}
                  style={{ fill: labelColor }}
                >
                  {`• ${item}`}
                </text>
              ))
            )}
          </g>
        );
      })}
    </Canvas>
  );
}

ViewsAndBeyondFrame.displayName = 'ViewsAndBeyondFrame';
