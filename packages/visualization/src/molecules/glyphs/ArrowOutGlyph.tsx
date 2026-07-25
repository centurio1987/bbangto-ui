import { vvar } from '../../tokens/contract';

export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function ArrowOutGlyph({ fill = 'none', stroke = vvar('shape', 'stroke'), strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <line x1="5" y1="19" x2="17" y2="7" style={{ stroke, strokeWidth }} strokeLinecap="round" />
      <polyline
        points="10,7 17,7 17,14"
        style={{ fill, stroke, strokeWidth }}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

ArrowOutGlyph.displayName = 'ArrowOutGlyph';
