import { Edge } from '../atoms/Edge';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { RELATION_KIND_NAMES, RELATION_LINE_STYLES, type RelationKind } from '../atoms/relationKind';

export interface LegendBlockProps {
  /** 범례 상자 왼쪽 위 */
  x: number;
  y: number;
  /** 줄로 세울 관계 종류 — 넘긴 순서대로 */
  kinds: readonly RelationKind[];
  /** 종류 이름 바꾸기. 비우면 `RELATION_KIND_NAMES` */
  names?: Partial<Record<RelationKind, string>>;
  /** 머리 글. 기본 「범례」 */
  title?: string;
  fontSize?: number;
}

const PAD = 8;
const SWATCH = 36;
const GAP = 8;

/** 글자 폭 근사 — 한글 · 한자 · 가나는 1em, 그 밖은 0.6em(범례 상자가 글자를 자르지 않게 넉넉히 잡는다). */
function textWidth(s: string, fontSize: number): number {
  let w = 0;
  for (const ch of s) w += (ch.codePointAt(0) ?? 0) >= 0x1100 ? fontSize : fontSize * 0.6;
  return w;
}

/** 범례 상자 크기 — 템플릿이 범례를 놓고 viewBox 를 넓힐 때 같은 값을 쓴다. */
export function legendBlockSize({
  kinds,
  names,
  title = '범례',
  fontSize = 10,
}: Pick<LegendBlockProps, 'kinds' | 'names' | 'title' | 'fontSize'>): { width: number; height: number } {
  const rowH = fontSize + 8;
  const labels = kinds.map((k) => names?.[k] ?? RELATION_KIND_NAMES[k]);
  const body = SWATCH + GAP + Math.max(0, ...labels.map((l) => textWidth(l, fontSize)));
  return {
    width: Math.ceil(PAD * 2 + Math.max(textWidth(title, fontSize), body)),
    height: PAD * 2 + rowH * (kinds.length + 1),
  };
}

/**
 * 관계선 범례 — 종류마다 견본 선 한 줄과 이름. 견본 선은 `Edge` 로 그려 템플릿 선과 같은 마커 · 대시 · 가이드 칠을
 * 받는다(같은 `RELATION_LINE_STYLES` 를 읽는다). 원문 규칙 「화살표 의미를 섞어야 한다면 범례로 구분한다」(KAN-082).
 *
 * Canvas 안에 둔다 — 견본 선의 화살촉 마커가 그 Canvas 의 defs 에 있다.
 */
export function LegendBlock({ x, y, kinds, names, title = '범례', fontSize = 10 }: LegendBlockProps) {
  const { width, height } = legendBlockSize({ kinds, names, title, fontSize });
  const rowH = fontSize + 8;
  const ink = vvar('on', 'canvas', 'bg');
  return (
    <g data-bbangto-viz-legend="">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={2}
        style={{ fill: vvar('canvas', 'bg'), stroke: vvar('boundary', 'stroke'), strokeWidth: 1 }}
      />
      <text
        x={x + PAD}
        y={y + PAD + rowH / 2}
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight={700}
        fontFamily={resolveLabelFont(title)}
        style={{ fill: ink }}
      >
        {title}
      </text>
      {kinds.map((k, i) => {
        const cy = y + PAD + rowH * (i + 1) + rowH / 2;
        const label = names?.[k] ?? RELATION_KIND_NAMES[k];
        return (
          <g key={k} data-bbangto-viz-legend-item={k}>
            <Edge
              from={{ x: x + PAD, y: cy }}
              to={{ x: x + PAD + SWATCH, y: cy }}
              routing="straight"
              {...RELATION_LINE_STYLES[k]}
            />
            <text
              x={x + PAD + SWATCH + GAP}
              y={cy}
              dominantBaseline="central"
              fontSize={fontSize}
              fontFamily={resolveLabelFont(label)}
              style={{ fill: ink }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

LegendBlock.displayName = 'LegendBlock';

// ──────────────────────────────────────────────
// 템플릿이 범례를 놓는 규칙 — 관계 종류를 받는 템플릿 아홉이 함께 쓴다
// ──────────────────────────────────────────────

/** 템플릿 데이터의 `legend` 칸. `false` 면 종류가 둘 이상이어도 범례를 그리지 않는다. */
export interface RelationLegendOption {
  /** 범례 왼쪽 위. 비우면 노드 아래 왼쪽 */
  x?: number;
  y?: number;
  title?: string;
  names?: Partial<Record<RelationKind, string>>;
}

/**
 * 범례를 그릴지와 그 위치 · 크기. 쓰인 종류가 둘 이상일 때만 그린다 — 종류가 하나뿐이면 선이 모두 같아 범례가 할 일이
 * 없다. 위치를 안 적으면 노드 아래 16 만큼 띄운 왼쪽이다.
 */
export function relationLegendBox(
  nodes: readonly { x: number; y: number; width: number; height: number }[],
  kinds: readonly RelationKind[],
  option: RelationLegendOption | false | undefined,
): (LegendBlockProps & { width: number; height: number }) | null {
  if (option === false || kinds.length < 2) return null;
  const minX = nodes.length ? Math.min(...nodes.map((n) => n.x)) : 20;
  const maxY = nodes.length ? Math.max(...nodes.map((n) => n.y + n.height)) : 20;
  const size = legendBlockSize({ kinds, names: option?.names, title: option?.title });
  return {
    x: option?.x ?? minX,
    y: option?.y ?? maxY + 16,
    kinds,
    names: option?.names,
    title: option?.title,
    ...size,
  };
}
