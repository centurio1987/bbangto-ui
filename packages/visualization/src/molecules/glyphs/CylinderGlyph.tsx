export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function CylinderGlyph({ fill = 'none', stroke = '#111111', strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <ellipse cx="12" cy="7" rx="7" ry="3" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="5" y1="7" x2="5" y2="17" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="19" y1="7" x2="19" y2="17" stroke={stroke} strokeWidth={strokeWidth} />
      <path
        d="M 5 17 Q 12 21 19 17"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </>
  );
}

CylinderGlyph.displayName = 'CylinderGlyph';
