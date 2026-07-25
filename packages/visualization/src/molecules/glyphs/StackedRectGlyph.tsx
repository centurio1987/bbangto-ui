import { vvar } from '../../tokens/contract';

export interface GlyphInternalProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function StackedRectGlyph({ fill = 'none', stroke = vvar('shape', 'stroke'), strokeWidth = 1.5 }: GlyphInternalProps) {
  return (
    <>
      <rect x="7" y="4" width="13" height="10" rx="1" style={{ fill, stroke, strokeWidth }} />
      <rect x="4" y="10" width="13" height="10" rx="1" style={{ fill, stroke, strokeWidth }} />
    </>
  );
}

StackedRectGlyph.displayName = 'StackedRectGlyph';
