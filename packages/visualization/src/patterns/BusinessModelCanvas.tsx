import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';

export interface BusinessModelCanvasBlocks {
  keyPartners?: string[];
  keyActivities?: string[];
  keyResources?: string[];
  valuePropositions?: string[];
  customerRelationships?: string[];
  channels?: string[];
  customerSegments?: string[];
  costStructure?: string[];
  revenueStreams?: string[];
}

export interface BusinessModelCanvasProps extends Omit<CanvasProps, 'data'> {
  data?: { blocks: BusinessModelCanvasBlocks };
  children?: ReactNode;
}

type BlockKey = keyof BusinessModelCanvasBlocks;

const BLOCK_META: Array<{ key: BlockKey; title: string; palette: string }> = [
  { key: 'keyPartners', title: 'Key Partners', palette: 'p2' },
  { key: 'keyActivities', title: 'Key Activities', palette: 'p1' },
  { key: 'keyResources', title: 'Key Resources', palette: 'p1' },
  { key: 'valuePropositions', title: 'Value Propositions', palette: 'p3' },
  { key: 'customerRelationships', title: 'Customer Relationships', palette: 'p4' },
  { key: 'channels', title: 'Channels', palette: 'p4' },
  { key: 'customerSegments', title: 'Customer Segments', palette: 'p6' },
  { key: 'costStructure', title: 'Cost Structure', palette: 'p5' },
  { key: 'revenueStreams', title: 'Revenue Streams', palette: 'p8' },
];

/**
 * BMC 표준 비대칭 배치(0~1 정규 좌표) — 상단 5열(일부 세로/반칸 span) + 하단 2개 가로 span.
 */
function blockRects(): Record<BlockKey, { x: number; y: number; w: number; h: number }> {
  const col = 1 / 5;
  const topH = 0.68;
  const halfTop = topH / 2;
  const bottomY = topH;
  const bottomH = 1 - topH;
  return {
    keyPartners: { x: 0, y: 0, w: col, h: topH },
    keyActivities: { x: col, y: 0, w: col, h: halfTop },
    keyResources: { x: col, y: halfTop, w: col, h: halfTop },
    valuePropositions: { x: 2 * col, y: 0, w: col, h: topH },
    customerRelationships: { x: 3 * col, y: 0, w: col, h: halfTop },
    channels: { x: 3 * col, y: halfTop, w: col, h: halfTop },
    customerSegments: { x: 4 * col, y: 0, w: col, h: topH },
    costStructure: { x: 0, y: bottomY, w: 0.5, h: bottomH },
    revenueStreams: { x: 0.5, y: bottomY, w: 0.5, h: bottomH },
  };
}

/** Business Model Canvas (VT-707) — 표준 9블록 비대칭 캔버스. headless. */
export function BusinessModelCanvas({
  data,
  viewBox,
  children,
  title = 'Business model canvas',
  ...canvasProps
}: BusinessModelCanvasProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 640, 380]);

  if (children != null || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="bmc" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const rects = blockRects();
  const stroke = vvar('shape', 'stroke');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="bmc" {...canvasProps}>
      {BLOCK_META.map((meta) => {
        const r = rects[meta.key];
        const x = vbX + r.x * vbW;
        const y = vbY + r.y * vbH;
        const w = r.w * vbW;
        const h = r.h * vbH;
        const items = data.blocks[meta.key] ?? [];
        return (
          <g key={meta.key} data-bbangto-viz-bmc-block data-bbangto-viz-bmc-block-key={meta.key}>
            <rect data-viz-part="shape" x={x} y={y} width={w} height={h} style={{ fill: vvar('palette', meta.palette), fillOpacity: 0.18, stroke, strokeWidth: 1.25 }} />
            <text x={x + 8} y={y + 16} fontSize={11} fontWeight={800} fontFamily={vvar('typography', 'titleFont')} style={{ fill: stroke }}>
              {meta.title}
            </text>
            {items.map((item, ii) => (
              <text
                key={ii}
                data-bbangto-viz-bmc-item
                x={x + 8}
                y={y + 34 + ii * 15}
                fontSize={10}
                fontFamily={vvar('typography', 'monoFont')}
                style={{ fill: vvar('boundary', 'labelColor') }}
              >
                {`• ${item}`}
              </text>
            ))}
          </g>
        );
      })}
    </Canvas>
  );
}

BusinessModelCanvas.displayName = 'BusinessModelCanvas';
