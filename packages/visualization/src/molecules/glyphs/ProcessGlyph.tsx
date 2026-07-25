import { vvar } from '../../tokens/contract';

export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function ProcessGlyph({ fill = 'none', stroke = vvar('shape', 'stroke'), strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" style={{ fill, stroke, strokeWidth }} />
      <rect x="2" y="9" width="4" height="6" rx="1" style={{ fill, stroke, strokeWidth }} />
      <rect x="18" y="9" width="4" height="6" rx="1" style={{ fill, stroke, strokeWidth }} />
    </>
  );
}

ProcessGlyph.displayName = 'ProcessGlyph';
