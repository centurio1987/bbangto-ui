import type React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

/**
 * Keyboard focus indication for surfaces that switch off the browser outline
 * with inline styles (KAN-054). An inline `outline: 'none'` beats any stylesheet
 * `:focus-visible` rule, so the component asks on focus whether the browser
 * considers it keyboard focus and paints the ring itself.
 *
 * The ring matches the repo's existing `:focus-visible` precedent
 * (blocks/Gallery.tsx — 2px solid primary, 2px offset).
 */
export function isFocusVisible(element: Element): boolean {
  try {
    return element.matches(':focus-visible');
  } catch {
    // Engines without :focus-visible: treat every focus as visible.
    return true;
  }
}

export const FOCUS_RING: React.CSSProperties = {
  outline: `2px solid ${cssVar('semantic', 'primary', 'base')}`,
  outlineOffset: '2px',
};
