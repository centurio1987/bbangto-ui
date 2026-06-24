export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function ArrowOutGlyph({ fill = 'none', stroke = '#111111', strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <line x1="5" y1="19" x2="17" y2="7" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <polyline
        points="10,7 17,7 17,14"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

ArrowOutGlyph.displayName = 'ArrowOutGlyph';
