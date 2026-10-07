import type React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

/**
 * Keyboard focus indication for surfaces that switch off the browser outline
 * with inline styles (KAN-054, unified across core in KAN-059). An inline
 * `outline: 'none'` beats any stylesheet `:focus-visible` rule, so the component
 * asks on focus whether the browser considers it keyboard focus and paints the
 * ring itself — see `useFocusVisible`.
 *
 * One ring for every surface: 2px solid `semantic.border.focus`, 2px offset.
 * `border.focus` is the token foundations author for focus (Input, Link, Slider
 * already used it), so fixing its contrast never touches the brand primary.
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
  outline: `2px solid ${cssVar('semantic', 'border', 'focus')}`,
  outlineOffset: '2px',
};

/** Same ring drawn inside the edge, for items whose container would clip the outer one. */
export const FOCUS_RING_INSET: React.CSSProperties = {
  ...FOCUS_RING,
  outlineOffset: '-2px',
};
