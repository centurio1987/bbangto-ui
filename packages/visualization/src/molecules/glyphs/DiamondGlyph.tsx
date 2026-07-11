export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function DiamondGlyph({ fill = 'none', stroke = '#111111', strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <polygon
      points="12,3 21,12 12,21 3,12"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  );
}

DiamondGlyph.displayName = 'DiamondGlyph';
