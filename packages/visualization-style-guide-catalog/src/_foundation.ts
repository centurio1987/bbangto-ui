import type {
  VisualizationFoundation,
  VizNodeSemanticKind,
} from '@centurio1987/bbangto-ui-tokens';

/**
 * 색 스킴 전용 변형 빌더 — base foundation의 비색상 토큰(typography/spacing/radius/
 * gridUnit/keylineWidth 등)은 구조적으로 복사하고 색만 갈아끼운다.
 * (카탈로그 불변식: colorway는 색 외 토큰이 base와 deep-equal이어야 한다.)
 */
export interface VizColorwayOverride {
  name: string;
  canvas?: { bg?: string; grid?: string };
  /** keyline/edge/marker/boundary stroke 일괄 잉크 색. */
  ink?: string;
  nodeFills?: Partial<Record<VizNodeSemanticKind, string>>;
  tagColor?: string;
  /** 잉크와 별도의 엣지(커넥터+마커) 색 — 듀오톤 계열용. 미지정 시 ink를 따른다. */
  edge?: { stroke?: string };
  palette?: Partial<VisualizationFoundation['palette']>;
  boundaryLabelColor?: string;
  c4LabelColor?: string;
  c4Tints?: [string, string, string];
  shape?: { fill?: string; stroke?: string };
}

export function makeVizColorway(
  base: VisualizationFoundation,
  o: VizColorwayOverride,
): VisualizationFoundation {
  const ink = o.ink;
  return {
    ...base,
    name: o.name,
    canvas: {
      ...base.canvas,
      ...(o.canvas?.bg ? { bg: o.canvas.bg } : {}),
      ...(o.canvas?.grid ? { grid: o.canvas.grid } : {}),
    },
    palette: { ...base.palette, ...o.palette },
    shape: {
      ...base.shape,
      ...(o.shape?.fill ? { fill: o.shape.fill } : {}),
      ...(o.shape?.stroke ?? ink ? { stroke: o.shape?.stroke ?? ink! } : {}),
    },
    node: Object.fromEntries(
      Object.entries(base.node).map(([kind, style]) => [
        kind,
        {
          ...style,
          ...(o.nodeFills?.[kind as VizNodeSemanticKind]
            ? { fill: o.nodeFills[kind as VizNodeSemanticKind]! }
            : {}),
          ...(ink ? { keyline: ink } : {}),
          ...(o.tagColor ? { tagColor: o.tagColor } : {}),
        },
      ]),
    ) as VisualizationFoundation['node'],
    edge: {
      ...base.edge,
      ...(o.edge?.stroke ?? ink ? { stroke: o.edge?.stroke ?? ink! } : {}),
      marker: {
        ...base.edge.marker,
        ...((): Partial<VisualizationFoundation['edge']['marker']> => {
          const m = o.edge?.stroke ?? ink;
          return m ? { arrow: m, diamond: m, circle: m, cross: m } : {};
        })(),
      },
    },
    c4: {
      l1: {
        ...base.c4.l1,
        ...(o.c4Tints ? { bgTint: o.c4Tints[0] } : {}),
        ...(o.c4LabelColor ?? ink ? { labelColor: o.c4LabelColor ?? ink! } : {}),
      },
      l2: {
        ...base.c4.l2,
        ...(o.c4Tints ? { bgTint: o.c4Tints[1] } : {}),
        ...(o.c4LabelColor ?? ink ? { labelColor: o.c4LabelColor ?? ink! } : {}),
      },
      l3: {
        ...base.c4.l3,
        ...(o.c4Tints ? { bgTint: o.c4Tints[2] } : {}),
        ...(o.c4LabelColor ?? ink ? { labelColor: o.c4LabelColor ?? ink! } : {}),
      },
    },
    boundary: {
      ...base.boundary,
      ...(ink ? { stroke: ink } : {}),
      ...(o.boundaryLabelColor ? { labelColor: o.boundaryLabelColor } : {}),
    },
  };
}
