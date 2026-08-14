import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Axis, type AxisTick } from '../atoms/Axis';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { linearScale } from '../geometry/scale';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface PacketField {
  label: string;
  /** 비트 폭. */
  bits: number;
  color?: string;
}

export interface PacketDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { fields: PacketField[] };
  children?: ReactNode;
}

const PAD = { left: 24, right: 24, top: 44, bottom: 24 } as const;

/** Packet diagram (VT-128) — 비트 필드 배치 + 비트 눈금. headless: 필드 폭 = 비트 비례. */
/**
 * @vizType VT-128 Packet Diagram · A. 엔지니어링/소프트웨어 · dataShape: relationship · 구조: cross-axis, quantitative
 * @useWhen 프로토콜 패킷의 비트/바이트 필드 배치를 문서화할 때
 * @avoidWhen 연속 값 분포는 Histogram(VT-508) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function PacketDiagram({
  data,
  viewBox,
  children,
  title = 'Packet diagram',
  ...canvasProps
}: PacketDiagramProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 640, 180]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="packet" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const fields = data.fields;
  const totalBits = fields.reduce((s, f) => s + f.bits, 0) || 1;
  const plotLeft = vbX + PAD.left;
  const plotRight = vbX + vbW - PAD.right;
  const rowTop = vbY + PAD.top;
  const rowH = vbY + vbH - PAD.bottom - rowTop;

  const bitScale = linearScale([0, totalBits], [plotLeft, plotRight]);

  // 필드 누적 비트 오프셋 → x/width.
  let bitAcc = 0;
  const laid = fields.map((f, i) => {
    const startBit = bitAcc;
    bitAcc += f.bits;
    return { f, i, startBit, endBit: bitAcc, x: bitScale(startBit), w: bitScale(bitAcc) - bitScale(startBit) };
  });

  // 비트 눈금(필드 경계).
  const ticks: AxisTick[] = [{ pos: bitScale(0), label: '0' }, ...laid.map((l) => ({ pos: bitScale(l.endBit), label: String(l.endBit) }))];

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="packet" {...canvasProps}>
      <Axis orientation="x" x={plotLeft} y={rowTop - 6} length={plotRight - plotLeft} ticks={ticks} tickSize={4} labelFontSize={9} />
      {laid.map(({ f, i, x, w }) => (
        <g key={`${f.label}-${i}`} data-bbangto-viz-packet-field>
          <rect
            data-viz-part="shape"
            x={x}
            y={rowTop}
            width={w}
            height={rowH}
            style={{ fill: f.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]) }}
          />
          <text
            x={x + w / 2}
            y={rowTop + rowH / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight={600}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('canvas', 'bg') }}
          >
            {f.label}
          </text>
          <text
            x={x + w / 2}
            y={rowTop + rowH - 8}
            textAnchor="middle"
            fontSize={9}
            fontFamily={vvar('typography', 'monoFont')}
            style={{ fill: vvar('canvas', 'bg'), opacity: 0.85 }}
          >
            {f.bits}b
          </text>
        </g>
      ))}
    </Canvas>
  );
}

PacketDiagram.displayName = 'PacketDiagram';
