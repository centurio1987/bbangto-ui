export type NodeSemanticKind =
  | 'person'
  | 'external'
  | 'container'
  | 'database'
  | 'queue'
  | 'decision'
  | 'process';

export interface NodeSemanticStyle {
  fill: string;
  keyline: string;
  keylineWidth: number;
  tagColor: string;
  dashed?: boolean;
  glyph: string;
}

export interface DiagramTheme {
  readonly name: string;

  readonly canvas: {
    readonly bg: string;
    readonly grid: string;
    readonly gridUnit: number;
  };

  readonly palette: {
    readonly p1: string;
    readonly p2: string;
    readonly p3: string;
    readonly p4: string;
    readonly p5: string;
    readonly p6: string;
    readonly p7: string;
    readonly p8: string;
  };

  readonly node: Record<NodeSemanticKind, NodeSemanticStyle>;

  readonly edge: {
    readonly stroke: string;
    readonly width: number;
    readonly dashPattern: string;
    readonly cornerRadius: number;
    readonly marker: {
      readonly size: number;
      readonly arrow: string;
      readonly diamond: string;
      readonly circle: string;
      readonly cross: string;
    };
  };

  readonly c4: {
    readonly l1: { readonly borderWidth: number; readonly bgTint: string; readonly labelColor: string };
    readonly l2: { readonly borderWidth: number; readonly bgTint: string; readonly labelColor: string };
    readonly l3: { readonly borderWidth: number; readonly bgTint: string; readonly labelColor: string };
  };

  readonly boundary: {
    readonly stroke: string;
    readonly width: number;
    readonly dashPattern: string;
    readonly radius: number;
    readonly labelColor: string;
  };

  readonly typography: {
    readonly titleFont: string;
    readonly monoFont: string;
    readonly titleWeight: number;
    readonly sizes: {
      readonly title: string;
      readonly label: string;
      readonly tag: string;
      readonly mono: string;
    };
  };

  readonly iconStyle: 'fill' | 'line';

  readonly spacing: {
    readonly nodePad: number;
    readonly laneGap: number;
  };

  readonly motion: {
    readonly duration: string;
    readonly easing: string;
  };
}
