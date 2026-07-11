import { vvar } from '../../tokens/contract';

export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function DiamondGlyph({ fill = 'none', stroke = vvar('shape', 'stroke'), strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <polygon
      points="12,3 21,12 12,21 3,12"
      style={{ fill, stroke, strokeWidth }}
      strokeLinejoin="round"
    />
  );
}

DiamondGlyph.displayName = 'DiamondGlyph';
