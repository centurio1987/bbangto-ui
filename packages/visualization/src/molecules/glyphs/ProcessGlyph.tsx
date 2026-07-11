export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function ProcessGlyph({ fill = 'none', stroke = '#111111', strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <rect x="2" y="9" width="4" height="6" rx="1" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <rect x="18" y="9" width="4" height="6" rx="1" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </>
  );
}

ProcessGlyph.displayName = 'ProcessGlyph';
