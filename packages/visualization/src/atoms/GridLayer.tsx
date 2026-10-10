import { vvar } from '../tokens/contract';
import { useVizFoundation } from '../styleGuide/VisualizationStyleGuideProvider';

export interface GridLayerProps {
  x?: number;
  y?: number;
  width: number;
  height: number;
  /** 격자 한 칸. 적지 않으면 스타일 가이드의 `canvas.gridUnit`. */
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
  gridUnit,
  stroke,
  strokeWidth = 0.5,
  opacity = 1,
}: GridLayerProps) {
  const foundation = useVizFoundation();
  const unit = gridUnit ?? foundation.canvas.gridUnit;
  const effectiveStroke = stroke ?? vvar('canvas', 'grid');
  const cols = Math.ceil(width / unit);
  const rows = Math.ceil(height / unit);

  return (
    <g data-bbangto-viz-grid opacity={opacity} aria-hidden="true">
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={x + i * unit}
          y1={y}
          x2={x + i * unit}
          y2={y + height}
          style={{ stroke: effectiveStroke, strokeWidth }}
        />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line
          key={`h${i}`}
          x1={x}
          y1={y + i * unit}
          x2={x + width}
          y2={y + i * unit}
          style={{ stroke: effectiveStroke, strokeWidth }}
        />
      ))}
    </g>
  );
}

GridLayer.displayName = 'GridLayer';
