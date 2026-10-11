import React from 'react';
import { contrastRatio } from '@centurio1987/bbangto-ui-tokens';
import { vvar } from '../tokens/contract';
import { ON_INK_MIN, surfacesFor } from '../tokens/onInk';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';

export interface StatNumberProps {
  x: number;
  y: number;
  value: number | string;
  /** 단위(%, h 등). 값 뒤에 작은 크기로 붙는다. */
  unit?: string;
  /** 증감. 부호를 포함해 텍스트로 병기한다(+4.1 / -1.2). */
  delta?: number;
  fontSize?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  fill?: string;
  /** 숫자 밑 면의 색(실제 값). 증감 의미 색이 이 면에서 읽히는지 잴 때 쓴다. 기본은 canvas.bg. */
  surface?: string;
}

/** 대형 수치 강조 atom — 값·단위·델타를 타입 스케일 위계로 렌더한다(값은 항상 텍스트 노출). */
export const StatNumber = React.forwardRef<SVGGElement, StatNumberProps>(
  ({ x, y, value, unit, delta, fontSize = 34, textAnchor = 'middle', fill, surface }, ref) => {
    // 기본은 캔버스 위 숫자다(KAN-075). 다른 면 위에 둘 때는 그 면의 글자색을 fill 로 넘긴다(StatCard).
    const inkFill = fill ?? vvar('on', 'canvas', 'bg');
    // 증감은 오르내림을 팔레트 두 색으로 가르는 의미 색이고 부호를 함께 쓴다. 그 색이 밑 면에서 4.5:1 에 못 미치면
    // 숫자와 같은 글자색으로 쓴다 — 부호가 남으므로 뜻은 잃지 않는다(KAN-075).
    const foundation = useVizFoundation();
    const meaningKey = delta != null && delta < 0 ? 'p1' : 'p6';
    const faces = surfacesFor(foundation, surface ?? foundation.canvas.bg);
    const meaningReads = Math.min(...faces.map((f) => contrastRatio(foundation.palette[meaningKey], f) ?? 0)) >= ON_INK_MIN;
    const deltaFill = meaningReads ? vvar('palette', meaningKey) : inkFill;
    const deltaText = delta != null ? `${delta > 0 ? '+' : ''}${delta}` : undefined;

    return (
      <g ref={ref} data-viz-stat-number>
        <text
          data-viz-stat-value
          x={x}
          y={y}
          textAnchor={textAnchor}
          fontSize={fontSize}
          fontWeight={700}
          fontFamily={vvar('typography', 'titleFont')}
          style={{ fill: inkFill }}
        >
          {value}
          {unit && (
            <tspan fontSize={fontSize * 0.45} fontWeight={600} dx={2}>
              {unit}
            </tspan>
          )}
        </text>
        {deltaText && (
          <text
            data-viz-stat-delta
            x={x}
            y={y + fontSize * 0.55}
            textAnchor={textAnchor}
            fontSize={fontSize * 0.35}
            fontWeight={700}
            fontFamily={vvar('typography', 'monoFont')}
            style={{ fill: deltaFill }}
          >
            {deltaText}
          </text>
        )}
      </g>
    );
  },
);

StatNumber.displayName = 'StatNumber';
