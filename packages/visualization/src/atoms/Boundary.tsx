import React from 'react';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';

export type BoundaryVariant = 'system' | 'group' | 'container';

/**
 * 경계 라벨의 배치.
 * - `on-line`(기본): 종전 배치 그대로 — 프레임 상단선에 걸친다. 대신 글자 뒤로 배경색
 *   halo를 깔아 선이 글자를 가로지르지 않게 한다(기존 그림의 좌표를 움직이지 않는다).
 * - `outside`: 프레임 위 바깥으로 완전히 뺀다.
 * - `inside`: 프레임 안쪽으로 넣는다.
 */
export type BoundaryLabelPlacement = 'on-line' | 'outside' | 'inside';

export interface BoundaryProps extends React.SVGAttributes<SVGGElement> {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  variant?: BoundaryVariant;
  stroke?: string;
  /** 선 두께. 적지 않으면 스타일 가이드의 `boundary.width`. */
  strokeWidth?: number | string;
  /** 대시(`stroke-dasharray` 값). 적지 않으면 스타일 가이드의 `boundary.dashPattern`(계약 스타일시트가 건다). */
  dashPattern?: string;
  /** 모서리 반지름. 적지 않으면 스타일 가이드의 `boundary.radius`. */
  radius?: number;
  labelColor?: string;
  labelFontSize?: number;
  labelFontFamily?: string;
  labelPlacement?: BoundaryLabelPlacement;
  /** `on-line`에서 글자 뒤에 깔 halo를 끌 수 있다. 기본 켬. */
  labelHalo?: boolean;
  /** halo 색 — 기본은 캔버스 배경. 경계가 색면 위에 놓이면 그 색을 넘긴다. */
  labelHaloColor?: string;
  /** halo 두께. 프레임 선을 확실히 끊으려면 선 두께 이상이어야 한다. 기본 3. */
  labelHaloWidth?: number;
}

export const Boundary = React.forwardRef<SVGGElement, BoundaryProps>(
  (
    {
      x,
      y,
      width,
      height,
      label,
      variant = 'system',
      stroke,
      strokeWidth,
      dashPattern,
      radius,
      labelColor,
      labelFontSize = 11,
      labelFontFamily,
      labelPlacement = 'on-line',
      labelHalo = true,
      labelHaloColor,
      labelHaloWidth = 3,
      style,
      ...props
    },
    ref,
  ) => {
    const foundation = useVizFoundation();
    const effectiveStroke = stroke ?? vvar('boundary', 'stroke');
    const effectiveLabelColor = labelColor ?? vvar('boundary', 'labelColor');
    const effectiveFont = resolveLabelFont(label, labelFontFamily);
    // 두께·모서리는 라벨 위치와 halo 계산에 숫자가 필요해 foundation 값을 JS 기본값으로 쓴다(Edge 의 cornerRadius 와 같다).
    // 대시는 계산에 안 쓰이므로 계약 스타일시트가 건다 — 적은 prop 만 인라인으로 내야 소비자 스타일시트도 가이드 값을 덮는다.
    const effectiveStrokeWidth = strokeWidth ?? foundation.boundary.width;
    const effectiveRadius = radius ?? foundation.boundary.radius;

    // 라벨 y — `on-line`은 선 위에 걸친다. 나머지는 선 두께를 감안해 비킨다.
    const sw =
      typeof effectiveStrokeWidth === 'number' ? effectiveStrokeWidth : parseFloat(effectiveStrokeWidth) || 0;
    const clearGap = sw / 2 + 3;
    const labelY =
      labelPlacement === 'outside'
        ? y - labelFontSize / 2 - clearGap
        : labelPlacement === 'inside'
          ? y + labelFontSize / 2 + clearGap
          : y - labelFontSize / 2;

    // `on-line`은 글자가 선 위에 걸치므로 글리프 둘레를 배경색으로 한 번 깔아 선을 끊는다.
    // paint-order로 stroke를 먼저 칠하면 글자 모양 그대로 halo가 생긴다 — 폭 측정이 필요 없다.
    const useHalo = labelPlacement === 'on-line' && labelHalo;
    const haloStyle: React.CSSProperties = useHalo
      ? {
          paintOrder: 'stroke',
          stroke: labelHaloColor ?? vvar('canvas', 'bg'),
          strokeWidth: Math.max(labelHaloWidth, sw),
          strokeLinejoin: 'round',
        }
      : {};

    return (
      <g
        ref={ref}
        data-bbangto-viz-boundary
        data-bbangto-viz-boundary-variant={variant}
        style={style}
        {...props}
      >
        <rect
          data-viz-part="boundary"
          x={x}
          y={y}
          width={width}
          height={height}
          rx={effectiveRadius}
          ry={effectiveRadius}
          style={{
            fill: 'none',
            stroke: effectiveStroke,
            strokeWidth: effectiveStrokeWidth,
            ...(dashPattern !== undefined ? { strokeDasharray: dashPattern } : {}),
          }}
        />
        {label && (
          <text
            data-bbangto-viz-boundary-label
            data-bbangto-viz-boundary-label-placement={labelPlacement}
            x={x + 12}
            y={labelY}
            dominantBaseline="central"
            fontFamily={effectiveFont}
            fontSize={labelFontSize}
            style={{ fill: effectiveLabelColor, ...haloStyle }}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);

Boundary.displayName = 'Boundary';
