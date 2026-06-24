export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function StackedRectGlyph({ fill = 'none', stroke = '#111111', strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <rect x="7" y="4" width="13" height="10" rx="1" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <rect x="4" y="10" width="13" height="10" rx="1" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </>
  );
}

StackedRectGlyph.displayName = 'StackedRectGlyph';
