export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function UserGlyph({ fill = 'none', stroke = '#111111', strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <circle cx="12" cy="7.5" r="4" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <path
        d="M 4 21 C 4 15 20 15 20 21"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </>
  );
}

UserGlyph.displayName = 'UserGlyph';
