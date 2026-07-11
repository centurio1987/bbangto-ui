import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { StatCard } from '../molecules/StatCard';
import { PictographUnit } from '../atoms/PictographUnit';
import { ProportionBlock } from '../atoms/ProportionBlock';
import { StatNumber } from '../atoms/StatNumber';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';

export interface StatItemSpec {
  label: string;
  value: number | string;
  unit?: string;
  delta?: number;
  /** isotype 모드에서 반복할 단위 수(소수는 부분 채움). */
  count?: number;
}

export type StatisticsMode = 'cards' | 'isotype' | 'mosaic';

export interface StatisticsProps extends Omit<CanvasProps, 'data'> {
  data?: { items: readonly StatItemSpec[] };
  mode?: StatisticsMode;
  children?: ReactNode;
}

/**
 * Statistics 패턴 — 수치 강조/아이콘 정량화(headless).
 * 레퍼런스: infographic minimal_02(스탯카드 그리드), minimal_06(아이소타입), colorful_05(모자이크).
 * 모든 값은 텍스트로도 노출한다(그래픽 단독 인코딩 금지).
 */
export function Statistics({
  data,
  mode = 'cards',
  children,
  viewBox,
  ...canvasProps
}: StatisticsProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 720, 220]);
  const items = data?.items ?? [];

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="statistics" {...canvasProps}>
      {data
        ? mode === 'isotype'
          ? renderIsotype(items, vbX, vbY, vbW, vbH)
          : mode === 'mosaic'
            ? renderMosaic(items, vbX, vbY, vbW, vbH)
            : renderCards(items, vbX, vbY, vbW, vbH)
        : children}
    </Canvas>
  );
}

function renderCards(
  items: readonly StatItemSpec[],
  vbX: number,
  vbY: number,
  vbW: number,
  vbH: number,
): ReactNode {
  const n = items.length;
  if (!n) return null;
  const gap = 20;
  const cardW = (vbW - 32 - gap * (n - 1)) / n;
  const cardH = vbH - 32;

  return (
    <>
      {items.map((item, i) => (
        <StatCard
          key={i}
          x={vbX + 16 + i * (cardW + gap)}
          y={vbY + 16}
          width={cardW}
          height={cardH}
          label={item.label}
          value={item.value}
          unit={item.unit}
          delta={item.delta}
        />
      ))}
    </>
  );
}

function renderIsotype(
  items: readonly StatItemSpec[],
  vbX: number,
  vbY: number,
  _vbW: number,
  vbH: number,
): ReactNode {
  const rowH = Math.min(52, (vbH - 32) / Math.max(items.length, 1));
  const unitSize = Math.min(20, rowH * 0.45);
  const labelW = 110;

  return (
    <>
      {items.map((item, r) => {
        const y = vbY + 24 + r * rowH;
        const count = item.count ?? (Number(item.value) || 0);
        const whole = Math.floor(count);
        const frac = count - whole;
        const units = Array.from({ length: whole + (frac > 0 ? 1 : 0) });
        return (
          <g key={r}>
            <text
              x={vbX + 16}
              y={y + unitSize / 2}
              dominantBaseline="central"
              fontSize={13}
              fontWeight={700}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('shape', 'stroke') }}
            >
              {item.label}
            </text>
            {units.map((_, i) => (
              <PictographUnit
                key={i}
                x={vbX + 16 + labelW + i * (unitSize + 6)}
                y={y}
                size={unitSize}
                fraction={i < whole ? 1 : frac}
              />
            ))}
            <text
              x={vbX + 16 + labelW + units.length * (unitSize + 6) + 10}
              y={y + unitSize / 2}
              dominantBaseline="central"
              fontSize={13}
              fontWeight={700}
              fontFamily={vvar('typography', 'monoFont')}
              style={{ fill: vvar('shape', 'stroke') }}
            >
              {item.value}
              {item.unit ?? ''}
            </text>
          </g>
        );
      })}
    </>
  );
}

function renderMosaic(
  items: readonly StatItemSpec[],
  vbX: number,
  vbY: number,
  vbW: number,
  vbH: number,
): ReactNode {
  const n = items.length;
  if (!n) return null;
  const maxValue = Math.max(...items.map((i) => Number(i.value) || 0), 1);
  const maxSide = Math.min(vbH * 0.55, (vbW - 32) / n - 16);
  const baseY = vbY + vbH * 0.68;

  return (
    <>
      {items.map((item, i) => {
        const cx = vbX + 16 + (i + 0.5) * ((vbW - 32) / n);
        const side = Math.sqrt((Number(item.value) || 0) / maxValue) * maxSide;
        return (
          <g key={i}>
            <ProportionBlock x={cx - side / 2} y={baseY - side} width={side} height={side} />
            <StatNumber x={cx} y={baseY + 30} value={item.value} unit={item.unit} fontSize={22} />
            <text
              x={cx}
              y={baseY + 52}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('boundary', 'labelColor') }}
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </>
  );
}
