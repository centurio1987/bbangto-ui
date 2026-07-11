import React from 'react';

export interface ProportionBlockProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  rx?: number;
}

/** 값 비례 사각 타일 atom — 모자이크/크기 비교용(면적 = 값, 값 텍스트는 패턴이 병기). */
export const ProportionBlock = React.forwardRef<SVGRectElement, ProportionBlockProps>(
  ({ x, y, width, height, fill, rx = 4 }, ref) => (
    <rect
      ref={ref}
      data-viz-proportion-block
      data-viz-part={fill ? undefined : 'shape'}
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      style={fill ? { fill, stroke: 'none' } : undefined}
    />
  ),
);

ProportionBlock.displayName = 'ProportionBlock';
