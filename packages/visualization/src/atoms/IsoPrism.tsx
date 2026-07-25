import React from 'react';
import {
  type Box3,
  type IsoProjection,
  isoPrismFaces,
  facePath,
} from '../geometry/isometric';
import { vvar } from '../tokens/contract';

export interface IsoPrismProps extends React.SVGAttributes<SVGGElement> {
  /** near-min corner + x/y/z 크기의 3D 박스(world). */
  box: Box3;
  projection: IsoProjection;
  /** 명시 paint 오버라이드(미지정 시 계약 시트가 shape 토큰 공급). */
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  /**
   * 단독 아톰 사용 시에만 그리는 평면 라벨(top-면 centroid). skew/투영 없음.
   * `IsometricScene`은 라벨을 씬 overlay 레이어가 전담하므로 이 prop을 넘기지 않는다.
   */
  label?: string;
  labelFontSize?: number;
  /** left/right 면 음영 강도(면색 위 검정 오버레이 opacity). 기본 0.10 / 0.22. */
  shade?: { left?: number; right?: number };
}

function definedStyle(entries: React.CSSProperties): React.CSSProperties {
  return Object.fromEntries(
    Object.entries(entries).filter(([, v]) => v !== undefined),
  ) as React.CSSProperties;
}

function centroid(pts: { x: number; y: number }[]): { x: number; y: number } {
  const n = pts.length || 1;
  return {
    x: pts.reduce((s, p) => s + p.x, 0) / n,
    y: pts.reduce((s, p) => s + p.y, 0) / n,
  };
}

/**
 * 진짜 isometric 프리즘 아톰(가짜 2.5D `Node` cube와 구분). `isoPrismFaces`로 top/left/right
 * 세 면을 렌더한다. 각 base 면은 `data-viz-part="shape"`로 계약 paint를 해석하고, left/right에는
 * paint 무관 검정 오버레이(면색 위 fillOpacity)로 3단 음영을 얹는다.
 *
 * ⚠️ 음영 오버레이는 **장식**이다 — `data-viz-part` 없이 `data-bbangto-viz-decoration` +
 * `aria-hidden` + `pointer-events:none`로 마킹해 paint 게이트/접근성 검사 바깥에 둔다(검정 fill
 * shape로 오인되면 게이트가 실패한다). top은 lit 면이라 오버레이가 없다(Node cube가 front를
 * 밝게 두는 것과 반전 — 프리즘엔 front 면이 없다).
 */
export const IsoPrism = React.forwardRef<SVGGElement, IsoPrismProps>(
  (
    {
      box,
      projection,
      fill,
      stroke,
      strokeWidth,
      label,
      labelFontSize = 11,
      shade,
      style,
      ...props
    },
    ref,
  ) => {
    const faces = isoPrismFaces(box, projection);
    const shapeStyle = definedStyle({ fill, stroke, strokeWidth });
    const leftShade = shade?.left ?? 0.1;
    const rightShade = shade?.right ?? 0.22;
    const topC = centroid(faces.top);

    return (
      <g ref={ref} data-bbangto-viz-iso-prism style={style} {...props}>
        <path
          data-viz-part="shape"
          data-bbangto-viz-iso-face="top"
          d={facePath(faces.top)}
          style={shapeStyle}
        />
        <path
          data-viz-part="shape"
          data-bbangto-viz-iso-face="left"
          d={facePath(faces.left)}
          style={shapeStyle}
        />
        <path
          data-bbangto-viz-decoration
          aria-hidden="true"
          pointerEvents="none"
          d={facePath(faces.left)}
          style={{ fill: '#000000', fillOpacity: leftShade, stroke: 'none' }}
        />
        <path
          data-viz-part="shape"
          data-bbangto-viz-iso-face="right"
          d={facePath(faces.right)}
          style={shapeStyle}
        />
        <path
          data-bbangto-viz-decoration
          aria-hidden="true"
          pointerEvents="none"
          d={facePath(faces.right)}
          style={{ fill: '#000000', fillOpacity: rightShade, stroke: 'none' }}
        />
        {label != null && label !== '' && (
          <text
            data-bbangto-viz-iso-label
            x={topC.x}
            y={topC.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={labelFontSize}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);

IsoPrism.displayName = 'IsoPrism';
