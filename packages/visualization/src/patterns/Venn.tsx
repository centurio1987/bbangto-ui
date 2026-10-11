import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { compositeOver, parseColor } from '@centurio1987/bbangto-ui-tokens';
import { vvar } from '../tokens/contract';
import { pickOnInk, surfaceOver, surfacesFor } from '../tokens/onInk';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';
import type { VisualizationFoundation } from '../tokens/types';
import { parseViewBox } from '../geometry/layout';
import { vennCircles, type VennCircle } from '../geometry/venn';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface VennSetSpec {
  id: string;
  label: string;
  size: number;
  color?: string;
}

export interface VennIntersectionSpec {
  /** 교집합에 참여하는 set id들. */
  ids: string[];
  label: string;
}

export interface VennProps extends Omit<CanvasProps, 'data'> {
  data?: { sets: VennSetSpec[]; intersections?: VennIntersectionSpec[] };
  children?: ReactNode;
}

/** Venn (VT-306) — 집합 겹침. 2원 정밀+3원 대칭 근사. headless: 교집합 라벨 텍스트 병기. */
/**
 * @vizType VT-306 Venn Diagram · C. 계층·관계 · dataShape: comparison, part-to-whole · 구조: nested, paired
 * @useWhen 집합 간 교집합·공통 요소를 표현할 때
 * @useWhen 2~3개 개념의 겹침을 비교할 때
 * @avoidWhen 정량 비율은 Pie(VT-506) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Venn({ data, viewBox, children, ...canvasProps }: VennProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 420, 360]);
  const foundation = useVizFoundation();

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="venn" {...canvasProps}>
      {data ? renderVenn(data, { x: vbX, y: vbY, width: vbW, height: vbH }, foundation) : children}
    </Canvas>
  );
}

function renderVenn(
  data: { sets: VennSetSpec[]; intersections?: VennIntersectionSpec[] },
  box: { x: number; y: number; width: number; height: number },
  foundation: VisualizationFoundation,
): ReactNode {
  const circles = vennCircles(
    data.sets.map((s) => ({ id: s.id, size: s.size })),
    box,
  );
  const byId = new Map<string, VennCircle>(circles.map((c) => [c.id, c]));
  // 원은 32% 로 칠한다. 이름은 그 원 면으로, 겹친 자리 글자는 겹친 원들을 차례로 얹은 면으로 글자색을 고른다(KAN-075).
  const colorOf = (i: number) => data.sets[i]?.color ?? foundation.palette[PALETTE_KEYS[i % PALETTE_KEYS.length]];
  const indexOf = new Map(circles.map((c, i) => [c.id, i]));
  // 겹친 자리 라벨은 원 중심들의 가운데에 놓이는데, 원 크기에 따라 그 자리가 셋 다 겹친 면일 수도 바탕일 수도 있다.
  // 그래서 바탕 · 원 하나하나 · 모두 겹친 면 어디서나 읽히는 색을 고른다(sankey 이름과 같은 방식).
  const overlapInk = (ids: string[]) => {
    const canvas = surfaceOver(foundation, 'transparent');
    const singles = ids.map((id) => surfaceOver(foundation, colorOf(indexOf.get(id) ?? 0), 0.32));
    let all = canvas;
    for (const id of ids) {
      const c = parseColor(colorOf(indexOf.get(id) ?? 0));
      if (c) all = compositeOver({ ...c, a: c.a * 0.32 }, all);
    }
    return pickOnInk(foundation, [canvas, ...singles, all]);
  };

  return (
    <>
      {circles.map((c, i) => {
        const spec = data.sets[i];
        return (
          <g key={c.id} data-bbangto-viz-venn-circle data-bbangto-viz-venn-circle-id={c.id}>
            <circle
              data-viz-part="shape"
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              style={{ fill: spec.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), fillOpacity: 0.32, stroke: spec.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), strokeWidth: 2 }}
            />
          </g>
        );
      })}
      {/* set 라벨: 원 중심에서 바깥쪽으로 */}
      {circles.map((c, i) => {
        const cxBox = box.x + box.width / 2;
        const cyBox = box.y + box.height / 2;
        const ux = c.cx - cxBox;
        const uy = c.cy - cyBox;
        const len = Math.hypot(ux, uy) || 1;
        const lx = c.cx + (ux / len) * c.r * 0.7;
        const ly = c.cy + (uy / len) * c.r * 0.7;
        return (
          <text
            key={`sl-${c.id}`}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={13}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: pickOnInk(foundation, surfacesFor(foundation, colorOf(i), 0.32)) }}
          >
            {data.sets[i].label}
          </text>
        );
      })}
      {/* 교집합 라벨: 참여 원 중심들의 평균 위치 */}
      {(data.intersections ?? []).map((it, i) => {
        const pts = it.ids.map((id) => byId.get(id)).filter(Boolean) as VennCircle[];
        if (!pts.length) return null;
        const mx = pts.reduce((s, p) => s + p.cx, 0) / pts.length;
        const my = pts.reduce((s, p) => s + p.cy, 0) / pts.length;
        return (
          <text
            key={`is-${i}`}
            data-bbangto-viz-venn-label
            x={mx}
            y={my}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={700}
            fontFamily={vvar('typography', 'titleFont')}
            data-viz-ink-multi
            style={{ fill: overlapInk(it.ids) }}
          >
            {it.label}
          </text>
        );
      })}
    </>
  );
}

Venn.displayName = 'Venn';
