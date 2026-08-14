import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { funnelTrapezoids } from '../geometry/funnel';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface FunnelStage {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface FunnelProps extends Omit<CanvasProps, 'data'> {
  data?: { stages: FunnelStage[] };
  formatValue?: (n: number) => string;
  children?: ReactNode;
}

/**
 * Funnel (VT-207) — 단계 축소형 전환. funnelTrapezoids geometry 재사용.
 * headless: 단계별 라벨+값 텍스트 병기. 음수→0, 전체 0→빈 캔버스.
 *
 * @vizType VT-207 Funnel · B. 프로세스·플로우 · dataShape: process, magnitude · 구조: sequential, quantitative
 * @useWhen 단계별 전환/이탈을 축소형 구조로 표현할 때
 * @avoidWhen 층상 중요도 계층은 Pyramid(VT-701) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Funnel({
  data,
  formatValue = (n) => String(n),
  viewBox,
  children,
  title = 'Funnel',
  ...canvasProps
}: FunnelProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 420, 320]);

  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="funnel" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const stages = data.stages;
  const padX = 20;
  const padTop = 20;
  const padBottom = 20;
  const areaW = vbW - padX * 2;
  const areaH = vbH - padTop - padBottom;
  const traps = funnelTrapezoids(stages.map((s) => s.value), { width: areaW, height: areaH });

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="funnel" {...canvasProps}>
      {traps.map((t, i) => {
        const s = stages[i];
        const ox = vbX + padX;
        const oy = vbY + padTop;
        const points = `${ox + t.topL},${oy + t.top} ${ox + t.topR},${oy + t.top} ${ox + t.botR},${oy + t.bottom} ${ox + t.botL},${oy + t.bottom}`;
        const cyMid = oy + (t.top + t.bottom) / 2;
        return (
          <g key={s.id} data-bbangto-viz-funnel-stage data-bbangto-viz-funnel-stage-id={s.id}>
            <polygon
              data-viz-part="shape"
              points={points}
              style={{ fill: s.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]), stroke: vvar('canvas', 'bg'), strokeWidth: 1.5 }}
            />
            <text
              x={ox + areaW / 2}
              y={cyMid}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={13}
              fontWeight={700}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('shape', 'stroke') }}
            >
              {`${s.label} · ${formatValue(s.value)}`}
            </text>
          </g>
        );
      })}
    </Canvas>
  );
}

Funnel.displayName = 'Funnel';
