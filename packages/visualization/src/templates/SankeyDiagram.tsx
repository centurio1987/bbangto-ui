import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { BandEdge } from '../atoms/BandEdge';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import { sankeyLayout, type SankeyNodeInput, type SankeyLinkInput } from '../geometry/sankey';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

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
            fillOpacity={0.42}
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
              y={n.y + Math.max(2, n.height) / 2}
              dominantBaseline="central"
              fontSize={11}
              fontWeight={600}
              fontFamily={vvar('typography', 'titleFont')}
              style={{ fill: vvar('shape', 'stroke') }}
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
