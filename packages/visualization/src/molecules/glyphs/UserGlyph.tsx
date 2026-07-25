import { vvar } from '../../tokens/contract';

export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function UserGlyph({ fill = 'none', stroke = vvar('shape', 'stroke'), strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <circle cx="12" cy="7.5" r="4" style={{ fill, stroke, strokeWidth }} />
      <path
        d="M 4 21 C 4 15 20 15 20 21"
        style={{ fill, stroke, strokeWidth }}
        strokeLinecap="round"
      />
    </>
  );
}

UserGlyph.displayName = 'UserGlyph';
