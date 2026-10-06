import type React from 'react';

/**
 * Returns an `onKeyDown` handler that calls `onEscape` when Escape is pressed.
 *
 * It is a handler, not a document listener, on purpose: Escape only dismisses the
 * surface when focus is inside it, and a nested widget (an open Select inside a
 * dialog) can stop propagation to keep its parent open.
 */
export function useEscapeKey(onEscape: () => void, enabled = true) {
  return (e: React.KeyboardEvent) => {
    if (!enabled || e.key !== 'Escape') return;
    e.stopPropagation();
    onEscape();
  };
}
