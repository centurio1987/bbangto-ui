import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { IsoPrism } from '../atoms/IsoPrism';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';
import {
  type Box3,
  type IsoProjection,
  isoPrismFaces,
  isoConnectorPath,
  floorShadowPolygon,
  isoFloorGrid,
  fitIsoProjection,
  depthSortBoxes,
} from '../geometry/isometric';

export interface IsoCellSpec {
  id: string;
  /** ground 격자 위치(world XY). */
  x: number;
  y: number;
  /** 바닥 높이(기본 0). z>0이면 떠 있는 셀. */
  z?: number;
  /** x/y/z 크기(기본 1). */
  w?: number;
  d?: number;
  h?: number;
  label?: string;
  kind?: string;
}

export interface IsoLinkSpec {
  from: string;
  to: string;
  order?: 'xy' | 'yx';
}

export interface IsometricSceneProps extends Omit<CanvasProps, 'data'> {
  data: { cells: IsoCellSpec[]; links?: IsoLinkSpec[] };
  /** 명시 투영(미지정 시 viewBox+cells로 auto-fit). */
  projection?: IsoProjection;
  angleDeg?: number;
  showFloorGrid?: boolean;
  gridStep?: number;
  /** cast shadow world 변위(기본 0.22). */
  shadowOffset?: number;
  labelFontSize?: number;
}

function cellBox(c: IsoCellSpec): Box3 {
  return { x: c.x, y: c.y, z: c.z ?? 0, w: c.w ?? 1, d: c.d ?? 1, h: c.h ?? 1 };
}

function centroid(pts: { x: number; y: number }[]): { x: number; y: number } {
  const n = pts.length || 1;
  return {
    x: pts.reduce((s, p) => s + p.x, 0) / n,
    y: pts.reduce((s, p) => s + p.y, 0) / n,
  };
}

function polyPath(pts: { x: number; y: number }[]): string {
  return pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z';
}

/**
 * True isometric 씬(VT geometry 트랙) — headless. 진짜 30° 투영 위에 프리즘을 depth-sort로
 * 쌓고, 바닥 축을 따라 커넥터를 라우팅하며, floor cast shadow를 얹는다. 페인트는 계약 시트가
 * 공급하므로 임의 스타일 가이드와 합성된다(paint/geometry 직교).
 *
 * 렌더 순서(far→near, 전부 좌표 baking — SVG transform 미사용):
 * grid → shadows → connectors(프리즘 뒤) → depth-sorted prisms → 평면 라벨 오버레이(최상단).
 * 라벨은 씬이 전담하며(IsoPrism엔 미전달) skew 없이 top-면 위에 얹혀 접근성을 지킨다.
 */
export function IsometricScene({
  data,
  viewBox,
  projection,
  angleDeg = 30,
  showFloorGrid = true,
  gridStep = 1,
  shadowOffset = 0.22,
  labelFontSize = 11,
  title = 'Isometric scene',
  ...canvasProps
}: IsometricSceneProps) {
  const vb = parseViewBox(viewBox, [0, 0, 480, 360]);
  const cells = data.cells;
  const boxes = cells.map(cellBox);
  const proj = projection ?? fitIsoProjection(boxes, vb, { angleDeg });

  const items = cells.map((c, i) => ({ id: c.id, cell: c, box: boxes[i] }));
  const byId = new Map(items.map((it) => [it.id, it]));
  const sorted = depthSortBoxes(items);

  // 그리드 extent = 셀 XY 바운드.
  const grid =
    showFloorGrid && cells.length > 0
      ? isoFloorGrid(
          {
            minX: Math.min(...boxes.map((b) => b.x)),
            maxX: Math.max(...boxes.map((b) => b.x + b.w)),
            minY: Math.min(...boxes.map((b) => b.y)),
            maxY: Math.max(...boxes.map((b) => b.y + b.d)),
          },
          gridStep,
          proj,
        )
      : [];

  const gridStroke = vvar('canvas', 'grid');

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="isometric-scene" {...canvasProps}>
      {/* 1. 바닥 그리드(장식) */}
      {grid.map((l, i) => (
        <line
          key={`g${i}`}
          data-bbangto-viz-decoration
          aria-hidden="true"
          pointerEvents="none"
          x1={l.a.x}
          y1={l.a.y}
          x2={l.b.x}
          y2={l.b.y}
          style={{ stroke: gridStroke, strokeWidth: 1, opacity: 0.5 }}
        />
      ))}

      {/* 2. floor cast shadows(장식) */}
      {items.map((it) => (
        <path
          key={`s${it.id}`}
          data-bbangto-viz-iso-shadow
          data-bbangto-viz-cell-id={it.id}
          data-bbangto-viz-decoration
          aria-hidden="true"
          pointerEvents="none"
          d={polyPath(
            floorShadowPolygon(it.box, proj, {
              floorZ: 0,
              offset: { dx: shadowOffset, dy: shadowOffset },
            }),
          )}
          style={{ fill: '#000000', fillOpacity: 0.08, stroke: 'none' }}
        />
      ))}

      {/* 3. iso 커넥터 — 바닥(z=0) 라우팅, 프리즘보다 먼저(뒤에 깔림) */}
      {(data.links ?? []).map((link, i) => {
        const from = byId.get(link.from);
        const to = byId.get(link.to);
        if (!from || !to) return null;
        const fromC = {
          x: from.box.x + from.box.w / 2,
          y: from.box.y + from.box.d / 2,
          z: 0,
        };
        const toC = { x: to.box.x + to.box.w / 2, y: to.box.y + to.box.d / 2, z: 0 };
        const conn = isoConnectorPath(fromC, toC, proj, { order: link.order, z: 0 });
        return (
          <path
            key={`l${i}`}
            data-bbangto-viz-edge
            data-bbangto-viz-edge-id={`${link.from}-${link.to}`}
            d={conn.d}
            style={{ fill: 'none' }}
          />
        );
      })}

      {/* 4. depth-sorted 프리즘(라벨 미전달) */}
      {sorted.map((it) => (
        <IsoPrism key={`p${it.id}`} box={it.box} projection={proj} data-bbangto-viz-cell-id={it.id} />
      ))}

      {/* 5. 평면 라벨 오버레이(최상단, skew 없음) */}
      {items.map((it) => {
        if (it.cell.label == null || it.cell.label === '') return null;
        const c = centroid(isoPrismFaces(it.box, proj).top);
        return (
          <text
            key={`t${it.id}`}
            data-bbangto-viz-iso-label
            data-bbangto-viz-cell-id={it.id}
            x={c.x}
            y={c.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={labelFontSize}
            fontFamily={vvar('typography', 'titleFont')}
            style={{ fill: vvar('shape', 'stroke') }}
          >
            {it.cell.label}
          </text>
        );
      })}
    </Canvas>
  );
}

IsometricScene.displayName = 'IsometricScene';
