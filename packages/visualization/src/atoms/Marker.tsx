import { vvar } from '../tokens/contract';

export type MarkerVariant =
  | 'arrow'
  | 'arrowOpen'
  | 'diamond'
  | 'diamondOpen'
  | 'circle'
  | 'cross'
  | 'triangleOpen'
  | 'erOne'
  | 'erMany'
  | 'erZeroOrOne'
  | 'erOneOrMany'
  | 'erZeroOrMany'
  | 'none';

export interface MarkersProps {
  uid: string;
  stroke?: string;
  fill?: string;
  size?: number;
}

// headless: paint 기본값은 vvar() 참조 — Provider의 CSS 변수 스코프에서 해석된다.
// SVG presentation attribute는 var()를 지원하지 않으므로 반드시 style로 적용한다.

function mkId(uid: string, variant: string): string {
  return `${uid}-${variant}`;
}

export function Markers({
  uid,
  stroke,
  fill,
  size = 8,
}: MarkersProps) {
  const lineStroke = stroke ?? vvar('edge', 'stroke');
  const arrowFill = fill ?? vvar('edge', 'marker', 'arrow');
  const diamondFill = fill ?? vvar('edge', 'marker', 'diamond');
  const circleFill = fill ?? vvar('edge', 'marker', 'circle');
  const crossStroke = stroke ?? vvar('edge', 'marker', 'cross');
  const hw = size / 2;
  const erW = 14;
  const erH = 10;
  const erHw = 5;

  return (
    <>
      {/* Filled arrow (default) */}
      <marker
        id={mkId(uid, 'arrow')}
        markerWidth={size}
        markerHeight={size}
        refX={size - 1}
        refY={hw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 0 L ${size} ${hw} L 0 ${size} Z`}
          style={{ fill: arrowFill, stroke: 'none' }}
        />
      </marker>

      {/* Open arrow */}
      <marker
        id={mkId(uid, 'arrow-open')}
        markerWidth={size}
        markerHeight={size}
        refX={size - 1}
        refY={hw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 1 L ${size - 1} ${hw} L 0 ${size - 1}`}
          style={{ fill: 'none', stroke: lineStroke, strokeWidth: 1.5 }}
        />
      </marker>

      {/* Filled diamond */}
      <marker
        id={mkId(uid, 'diamond')}
        markerWidth={size}
        markerHeight={size}
        refX={size}
        refY={hw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 ${hw} L ${hw} 0 L ${size} ${hw} L ${hw} ${size} Z`}
          style={{ fill: diamondFill, stroke: 'none' }}
        />
      </marker>

      {/* Open diamond */}
      <marker
        id={mkId(uid, 'diamond-open')}
        markerWidth={size}
        markerHeight={size}
        refX={size}
        refY={hw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 ${hw} L ${hw} 0 L ${size} ${hw} L ${hw} ${size} Z`}
          style={{ fill: 'none', stroke: lineStroke, strokeWidth: 1.5 }}
        />
      </marker>

      {/* Circle */}
      <marker
        id={mkId(uid, 'circle')}
        markerWidth={size}
        markerHeight={size}
        refX={hw}
        refY={hw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <circle cx={hw} cy={hw} r={hw - 1} style={{ fill: circleFill, stroke: 'none' }} />
      </marker>

      {/* Cross (×) */}
      <marker
        id={mkId(uid, 'cross')}
        markerWidth={size}
        markerHeight={size}
        refX={hw}
        refY={hw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 1 1 L ${size - 1} ${size - 1} M 1 ${size - 1} L ${size - 1} 1`}
          style={{ fill: 'none', stroke: crossStroke, strokeWidth: 1.5 }}
        />
      </marker>

      {/* Open triangle (UML inheritance) */}
      <marker
        id={mkId(uid, 'triangle-open')}
        markerWidth={size}
        markerHeight={size}
        refX={size - 1}
        refY={hw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M 0 0 L ${size} ${hw} L 0 ${size} Z`}
          style={{ fill: 'none', stroke: lineStroke, strokeWidth: 1.5 }}
        />
      </marker>

      {/* ER: exactly one (double bar) */}
      <marker
        id={mkId(uid, 'er-one')}
        markerWidth={erW}
        markerHeight={erH}
        refX={erW}
        refY={erHw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <line x1={6} y1={0} x2={6} y2={erH} style={{ stroke: lineStroke, strokeWidth: 1.5 }} />
        <line x1={10} y1={0} x2={10} y2={erH} style={{ stroke: lineStroke, strokeWidth: 1.5 }} />
      </marker>

      {/* ER: many (crow's-foot) */}
      <marker
        id={mkId(uid, 'er-many')}
        markerWidth={erW}
        markerHeight={erH}
        refX={erW}
        refY={erHw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M ${erW} ${erHw} L 0 0 M ${erW} ${erHw} L 0 ${erHw} M ${erW} ${erHw} L 0 ${erH}`}
          style={{ fill: 'none', stroke: lineStroke, strokeWidth: 1.5 }}
        />
      </marker>

      {/* ER: zero or one (circle + bar) */}
      <marker
        id={mkId(uid, 'er-zero-or-one')}
        markerWidth={erW}
        markerHeight={erH}
        refX={erW}
        refY={erHw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <circle cx={3} cy={erHw} r={3} fill="none" style={{ stroke: lineStroke, strokeWidth: 1.5 }} />
        <line x1={9} y1={0} x2={9} y2={erH} style={{ stroke: lineStroke, strokeWidth: 1.5 }} />
      </marker>

      {/* ER: one or many (crow's-foot + bar) */}
      <marker
        id={mkId(uid, 'er-one-or-many')}
        markerWidth={erW}
        markerHeight={erH}
        refX={erW}
        refY={erHw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <line x1={4} y1={0} x2={4} y2={erH} style={{ stroke: lineStroke, strokeWidth: 1.5 }} />
        <path
          d={`M ${erW} ${erHw} L 4 0 M ${erW} ${erHw} L 4 ${erHw} M ${erW} ${erHw} L 4 ${erH}`}
          style={{ fill: 'none', stroke: lineStroke, strokeWidth: 1.5 }}
        />
      </marker>

      {/* ER: zero or many (circle + crow's-foot) */}
      <marker
        id={mkId(uid, 'er-zero-or-many')}
        markerWidth={erW}
        markerHeight={erH}
        refX={erW}
        refY={erHw}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <circle cx={3} cy={erHw} r={3} fill="none" style={{ stroke: lineStroke, strokeWidth: 1.5 }} />
        <path
          d={`M ${erW} ${erHw} L 6 0 M ${erW} ${erHw} L 6 ${erHw} M ${erW} ${erHw} L 6 ${erH}`}
          style={{ fill: 'none', stroke: lineStroke, strokeWidth: 1.5 }}
        />
      </marker>
    </>
  );
}

Markers.displayName = 'Markers';

export function markerRef(uid: string, variant: MarkerVariant): string {
  if (variant === 'none') return 'none';
  const map: Record<MarkerVariant, string> = {
    arrow: 'arrow',
    arrowOpen: 'arrow-open',
    diamond: 'diamond',
    diamondOpen: 'diamond-open',
    circle: 'circle',
    cross: 'cross',
    triangleOpen: 'triangle-open',
    erOne: 'er-one',
    erMany: 'er-many',
    erZeroOrOne: 'er-zero-or-one',
    erOneOrMany: 'er-one-or-many',
    erZeroOrMany: 'er-zero-or-many',
    none: '',
  };
  return `url(#${mkId(uid, map[variant])})`;
}
