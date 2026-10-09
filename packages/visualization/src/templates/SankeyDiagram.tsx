import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { BandEdge } from '../atoms/BandEdge';
import { vvar } from '../tokens/contract';
import { pickOnInk, surfacesFor } from '../tokens/onInk';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';
import { parseViewBox } from '../geometry/layout';
import { sankeyLayout, type SankeyNodeInput, type SankeyLinkInput } from '../geometry/sankey';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;
/** 링크 리본의 면 투명도. */
const RIBBON_OPACITY = 0.42;

export interface SankeyNodeSpec extends SankeyNodeInput {
  label: string;
  color?: string;
}

export interface SankeyDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { nodes: SankeyNodeSpec[]; links: SankeyLinkInput[] };
  /** value→픽셀 폭 scale. */
  scale?: number;
  nodeWidth?: number;
  children?: ReactNode;
}

/**
 * Sankey (VT-515) — 흐름 폭으로 이동량. acyclic·좌→우·수동 노드 좌표(공개 계약).
 * BandEdge 리본 + 노드 막대. headless: 노드 값은 라벨로 노출.
 *
 * @vizType VT-515 Sankey · E. 데이터 차트 · dataShape: flow · 구조: sequential, quantitative
 * @useWhen 노드 간 이동량을 흐름 폭으로 표현할 때
 * @useWhen 단계 간 배분을 볼 때
 * @avoidWhen 원 둘레 간 상호 흐름은 Chord(VT-516) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function SankeyDiagram({
  data,
  scale = 1,
  nodeWidth = 16,
  viewBox,
  children,
  title = 'Sankey',
  ...canvasProps
}: SankeyDiagramProps) {
  parseViewBox(viewBox, [0, 0, 520, 260]);
  const foundation = useVizFoundation();

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="sankey" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const specById = new Map(data.nodes.map((n) => [n.id, n]));
  const layout = sankeyLayout(data.nodes, data.links, { scale, nodeWidth });
  const colorIndex = new Map(data.nodes.map((n, i) => [n.id, i]));
  // 노드 이름은 막대 오른쪽, 노드 높이 가운데에 놓인다. 나가는 리본은 노드 위쪽부터 쌓이므로(geometry/sankey.ts)
  // 이름 가운데를 덮는 리본이 있으면 그 리본이, 없으면 canvas 가 실제 바탕이다. 그 면을 첫 면으로 두고, 이름 끝이
  // 걸칠 수 있는 canvas 와 다른 리본에서도 읽히면 그 색을 쓴다. 다 못 맞추면 실제 바탕이 이긴다(KAN-061).
  const labelY = (n: { y: number; height: number }) => n.y + Math.max(2, n.height) / 2;
  const otherFaces = [
    ...surfacesFor(foundation, foundation.canvas.bg),
    ...PALETTE_KEYS.flatMap((k) => surfacesFor(foundation, foundation.palette[k], RIBBON_OPACITY)),
  ];
  const labelInkFor = (n: { id: string; y: number; height: number }) => {
    const y = labelY(n);
    const under = layout.links.find((l) => l.source === n.id && Math.abs(l.sy - y) <= l.width / 2);
    const key = PALETTE_KEYS[(colorIndex.get(n.id) ?? 0) % PALETTE_KEYS.length];
    const own = under ? surfacesFor(foundation, foundation.palette[key], RIBBON_OPACITY) : [];
    return pickOnInk(foundation, [...own, ...otherFaces]);
  };

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="sankey" {...canvasProps}>
      {/* 링크 리본 — source 색 상속 */}
      {layout.links.map((l, i) => {
        const ci = colorIndex.get(l.source) ?? i;
        return (
          <BandEdge
            key={`${l.source}-${l.target}-${i}`}
            sx={l.sx}
            sy={l.sy}
            tx={l.tx}
            ty={l.ty}
            width={l.width}
            fill={vvar('palette', PALETTE_KEYS[ci % PALETTE_KEYS.length])}
            fillOpacity={RIBBON_OPACITY}
          />
        );
      })}
      {/* 노드 막대 + 라벨 */}
      {layout.nodes.map((n, i) => {
        const spec = specById.get(n.id)!;
        return (
          <g key={n.id} data-bbangto-viz-sankey-node data-bbangto-viz-sankey-node-id={n.id}>
            <rect
              data-viz-part="shape"
              x={n.x}
              y={n.y}
              width={nodeWidth}
              height={Math.max(2, n.height)}
              style={{ fill: spec.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length]) }}
            />
            <text
              x={n.x + nodeWidth + 4}
              y={labelY(n)}
              dominantBaseline="central"
              fontSize={11}
              fontWeight={600}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: labelInkFor(n) }}
            >
              {spec.label}
            </text>
          </g>
        );
      })}
    </Canvas>
  );
}

SankeyDiagram.displayName = 'SankeyDiagram';
