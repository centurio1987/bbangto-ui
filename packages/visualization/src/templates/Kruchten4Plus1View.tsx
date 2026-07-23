import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';

/** 4+1 뷰의 5개 영역. 각 영역은 다른 프리셋(ReactNode)을 조합해 채운다. */
export type Kruchten4Plus1RegionKey =
  | 'logical'
  | 'process'
  | 'development'
  | 'physical'
  | 'scenarios';

/** 영역별 슬롯 — 중첩 프리셋(다른 다이어그램)을 조합한다. */
export type Kruchten4Plus1Slots = Partial<Record<Kruchten4Plus1RegionKey, ReactNode>>;

/** 슬롯 없이 빠르게 채우는 불릿 폴백. */
export type Kruchten4Plus1Data = Partial<Record<Kruchten4Plus1RegionKey, string[]>>;

export interface Kruchten4Plus1ViewProps extends Omit<CanvasProps, 'data' | 'children'> {
  /** 영역별 중첩 프리셋 슬롯. 영역마다 slot 우선, 없으면 data 불릿, 둘 다 없으면 골격만. */
  slots?: Kruchten4Plus1Slots;
  /** 영역별 불릿 폴백. slot이 있으면 해당 영역은 무시(병합 금지). */
  data?: Kruchten4Plus1Data;
}

interface RegionMeta {
  key: Kruchten4Plus1RegionKey;
  label: string;
  sub: string;
  palette: string;
}

// Kruchten(1995) 정식 배치: 네 코너 뷰 + 중앙 시나리오(+1). 좌상=Logical/end-user,
// 우상=Development/programmer, 좌하=Process/integrator, 우하=Physical/engineer.
const REGIONS: RegionMeta[] = [
  { key: 'logical', label: 'Logical View', sub: 'end users · functionality', palette: 'p1' },
  { key: 'development', label: 'Development View', sub: 'programmers · modules', palette: 'p2' },
  { key: 'scenarios', label: 'Scenarios (+1)', sub: 'use cases tie the four views', palette: 'p4' },
  { key: 'process', label: 'Process View', sub: 'integrators · concurrency', palette: 'p6' },
  { key: 'physical', label: 'Physical View', sub: 'engineers · deployment', palette: 'p8' },
];

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const P = 18; // 외곽 패딩
const G = 14; // 패널 간 간격
const PAD = 12; // 패널 내부 패딩
const TITLE_BLOCK = 42; // 제목+부제 영역 높이

/** viewBox → 5영역 절대 좌표(3행: 상단 2코너 · 중앙 밴드 · 하단 2코너). */
function regionRects(vb: [number, number, number, number]): Record<Kruchten4Plus1RegionKey, Rect> {
  const [vbX, vbY, vbW, vbH] = vb;
  const innerX = vbX + P;
  const innerY = vbY + P;
  const innerW = vbW - 2 * P;
  const innerH = vbH - 2 * P;
  const usableH = innerH - 2 * G;
  const topH = usableH * 0.4;
  const midH = usableH * 0.2;
  const botH = usableH * 0.4;
  const colW = (innerW - G) / 2;
  const col2X = innerX + colW + G;
  const yMid = innerY + topH + G;
  const yBot = yMid + midH + G;
  return {
    logical: { x: innerX, y: innerY, w: colW, h: topH },
    development: { x: col2X, y: innerY, w: colW, h: topH },
    scenarios: { x: innerX, y: yMid, w: innerW, h: midH },
    process: { x: innerX, y: yBot, w: colW, h: botH },
    physical: { x: col2X, y: yBot, w: colW, h: botH },
  };
}

/**
 * Kruchten 4+1 아키텍처 뷰 모델 (PLAN §D G6 메타 프레임).
 * 유형이 아니라 다른 프리셋을 조합하는 **메타 구조 프레임** — Logical/Development/Process/
 * Physical 네 뷰를 코너에, Scenarios(+1)를 중앙 밴드에 배치한다. 영역마다 `slots`의 중첩
 * 프리셋을 우선 렌더하고, 없으면 `data`의 불릿을 렌더한다(영역 단위 no-merge). headless.
 */
export function Kruchten4Plus1View({
  slots,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Kruchten 4+1 architectural view',
  ...props
}: Kruchten4Plus1ViewProps) {
  const vb = parseViewBox(viewBox, [0, 0, 760, 580]);
  const rects = regionRects(vb);
  const stroke = vvar('shape', 'stroke');
  const titleFont = vvar('typography', 'titleFont');
  const monoFont = vvar('typography', 'monoFont');
  const labelColor = vvar('boundary', 'labelColor');

  return (
    <Canvas
      viewBox={viewBox ?? `${vb[0]} ${vb[1]} ${vb[2]} ${vb[3]}`}
      width={width}
      height={height}
      title={title}
      data-bbangto-viz-chart="kruchten-4plus1"
      {...props}
    >
      {REGIONS.map((meta) => {
        const r = rects[meta.key];
        const slot = slots?.[meta.key];
        const items = data?.[meta.key] ?? [];
        return (
          <g
            key={meta.key}
            data-bbangto-viz-kruchten-region
            data-bbangto-viz-kruchten-region-key={meta.key}
          >
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
              style={{ fill: stroke }}
            >
              {meta.label}
            </text>
            <text x={r.x + PAD} y={r.y + 34} fontSize={9.5} fontFamily={monoFont} style={{ fill: labelColor }}>
              {meta.sub}
            </text>
            {slot != null ? (
              <svg
                data-bbangto-viz-kruchten-slot
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
                  data-bbangto-viz-kruchten-item
                  x={r.x + PAD + 2}
                  y={r.y + TITLE_BLOCK + 12 + ii * 15}
                  fontSize={10}
                  fontFamily={monoFont}
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

Kruchten4Plus1View.displayName = 'Kruchten4Plus1View';
