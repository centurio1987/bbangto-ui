export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function BarsGlyph({ fill = '#111111', stroke = '#111111', strokeWidth = 0.5 }: GlyphInternalProps) {
  return (
    <>
      <rect x="3" y="5" width="18" height="3.5" rx="1" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <rect x="3" y="10.5" width="18" height="3.5" rx="1" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <rect x="3" y="16" width="18" height="3.5" rx="1" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </>
  );
}

BarsGlyph.displayName = 'BarsGlyph';
