import { dvar } from '../tokens/contract';

export interface GridLayerProps {
  x?: number;
  y?: number;
  width: number;
  height: number;
  gridUnit?: number;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}

export function GridLayer({
  x = 0,
  y = 0,
  width,
  height,
  gridUnit = 8,
  stroke,
  strokeWidth = 0.5,
  opacity = 1,
}: GridLayerProps) {
  const effectiveStroke = stroke ?? dvar('canvas', 'grid');
  const cols = Math.ceil(width / gridUnit);
  const rows = Math.ceil(height / gridUnit);

  return (
    <g data-bbangto-diagram-grid opacity={opacity} aria-hidden="true">
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={x + i * gridUnit}
          y1={y}
          x2={x + i * gridUnit}
          y2={y + height}
          style={{ stroke: effectiveStroke, strokeWidth }}
        />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line
          key={`h${i}`}
          x1={x}
          y1={y + i * gridUnit}
          x2={x + width}
          y2={y + i * gridUnit}
          style={{ stroke: effectiveStroke, strokeWidth }}
        />
      ))}
    </g>
  );
}

GridLayer.displayName = 'GridLayer';
