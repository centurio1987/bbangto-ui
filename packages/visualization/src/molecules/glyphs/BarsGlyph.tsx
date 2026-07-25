import { vvar } from '../../tokens/contract';

export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function BarsGlyph({ fill = vvar('shape', 'stroke'), stroke = vvar('shape', 'stroke'), strokeWidth = 0.5 }: GlyphInternalProps) {
  return (
    <>
      <rect x="3" y="5" width="18" height="3.5" rx="1" style={{ fill, stroke, strokeWidth }} />
      <rect x="3" y="10.5" width="18" height="3.5" rx="1" style={{ fill, stroke, strokeWidth }} />
      <rect x="3" y="16" width="18" height="3.5" rx="1" style={{ fill, stroke, strokeWidth }} />
    </>
  );
}

BarsGlyph.displayName = 'BarsGlyph';
