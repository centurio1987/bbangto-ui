import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { VsDivider } from '../atoms/VsDivider';
import { ProportionBlock } from '../atoms/ProportionBlock';
import { StatNumber } from '../atoms/StatNumber';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';

export interface ComparisonPaneSpec {
  label: string;
  items?: readonly string[];
  value?: number;
}

export type ComparisonMode = 'split' | 'magnitude';

export interface ComparisonProps extends Omit<CanvasProps, 'data'> {
  data?: { left: ComparisonPaneSpec; right: ComparisonPaneSpec };
  mode?: ComparisonMode;
  children?: ReactNode;
}

/**
 * Comparison 패턴 — vs 대비 레이아웃(headless).
 * 레퍼런스: infographic colorful_06(before/after 스플릿), colorful_03(크기 비교).
 *
 * @vizType VT-602 Comparison · F. 인포그래픽/에디토리얼 · dataShape: comparison · 구조: paired · mode="split"(기본), mode="magnitude"
 * @useWhen 두 대상을 패널로 나란히 대비할 때
 * @useWhen before-after/pros-cons를 표현할 때
 * @avoidWhen 전략 4분면은 SWOT(VT-703) 사용
 * @avoidWhen 정량 2축 배치는 Quadrant(VT-702) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function Comparison({
  data,
  mode = 'split',
  children,
  viewBox,
  ...canvasProps
}: ComparisonProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 640, 320]);

  return (
    <Canvas viewBox={viewBox} data-bbangto-viz-pattern="comparison" {...canvasProps}>
      {data
        ? mode === 'magnitude'
          ? renderMagnitude(data, vbX, vbY, vbW, vbH)
          : renderSplit(data, vbX, vbY, vbW, vbH)
        : children}
    </Canvas>
  );
}

function Pane({
  pane,
  x,
  y,
  width,
  height,
  side,
}: {
  pane: ComparisonPaneSpec;
  x: number;
  y: number;
  width: number;
  height: number;
  side: 'left' | 'right';
}) {
  const cx = x + width / 2;
  return (
    <g data-viz-pane={side}>
      <rect data-viz-part="shape" x={x} y={y} width={width} height={height} rx={12} />
      <text
        x={cx}
        y={y + 34}
        textAnchor="middle"
        fontSize={17}
        fontWeight={700}
        fontFamily={vvar('typography', 'titleFont')}
        style={{ fill: vvar('shape', 'stroke') }}
      >
        {pane.label}
      </text>
      {(pane.items ?? []).map((item, i) => (
        <g key={i} data-viz-compare-item>
          <circle cx={x + 22} cy={y + 64 + i * 28} r={4} style={{ fill: vvar('palette', side === 'left' ? 'p2' : 'p6') }} />
          <text
            x={x + 36}
            y={y + 64 + i * 28}
            dominantBaseline="central"
            fontSize={13}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {item}
          </text>
        </g>
      ))}
    </g>
  );
}

function renderSplit(
  data: { left: ComparisonPaneSpec; right: ComparisonPaneSpec },
  vbX: number,
  vbY: number,
  vbW: number,
  vbH: number,
): ReactNode {
  const gap = 48;
  const paneW = (vbW - gap) / 2 - 12;
  const paneH = vbH - 24;
  const centerX = vbX + vbW / 2;

  return (
    <>
      <Pane pane={data.left} x={vbX + 12} y={vbY + 12} width={paneW} height={paneH} side="left" />
      <Pane pane={data.right} x={centerX + gap / 2} y={vbY + 12} width={paneW} height={paneH} side="right" />
      <VsDivider x={centerX} y1={vbY + 12} y2={vbY + vbH - 12} />
    </>
  );
}

function renderMagnitude(
  data: { left: ComparisonPaneSpec; right: ComparisonPaneSpec },
  vbX: number,
  vbY: number,
  vbW: number,
  vbH: number,
): ReactNode {
  const panes = [
    { ...data.left, cx: vbX + vbW * 0.28 },
    { ...data.right, cx: vbX + vbW * 0.72 },
  ];
  const maxValue = Math.max(...panes.map((p) => p.value ?? 0), 1);
  const maxSide = vbH * 0.5;
  const baseY = vbY + vbH * 0.72;

  return (
    <>
      {panes.map((p, i) => {
        // 면적 ∝ 값: 한 변 = sqrt(값 비율) × 최대변
        const side = Math.sqrt((p.value ?? 0) / maxValue) * maxSide;
        return (
          <g key={i}>
            <ProportionBlock x={p.cx - side / 2} y={baseY - side} width={side} height={side} />
            <StatNumber x={p.cx} y={baseY + 34} value={p.value ?? 0} fontSize={26} />
            <text
              x={p.cx}
              y={baseY + 58}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('boundary', 'labelColor') }}
            >
              {p.label}
            </text>
          </g>
        );
      })}
      <VsDivider x={vbX + vbW / 2} y1={vbY + 16} y2={vbY + vbH - 16} />
    </>
  );
}
