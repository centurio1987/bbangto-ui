import type React from 'react';
import { useState } from 'react';
import { composeHandlers } from './composeHandlers';
import { isFocusVisible } from './focusRing';

export interface FocusVisibleHandlers<E extends Element> {
  onFocus?: React.FocusEventHandler<E>;
  onBlur?: React.FocusEventHandler<E>;
}

/**
 * Tracks whether an element holds keyboard focus (`:focus-visible`), so the
 * component can paint `FOCUS_RING` on it — or on the box around it (KAN-059).
 *
 * Spread `focusProps` on the element that takes focus; read `focusVisible` where
 * the ring is drawn. Focus that bubbles up from a descendant does not count.
 * The consumer's own `onFocus`/`onBlur` run first (`composeHandlers`).
 *
 * The decision is made once, when focus arrives: focusing with the mouse and then
 * pressing a key does not bring the ring in.
 */
export function useFocusVisible<E extends Element = HTMLElement>(
  handlers: FocusVisibleHandlers<E> = {},
): { focusVisible: boolean; focusProps: Required<FocusVisibleHandlers<E>> } {
  const [focusVisible, setFocusVisible] = useState(false);
  return {
    focusVisible,
    focusProps: {
      onFocus: composeHandlers(handlers.onFocus, (e: React.FocusEvent<E>) =>
        setFocusVisible(e.target === e.currentTarget && isFocusVisible(e.currentTarget)),
      ),
      onBlur: composeHandlers(handlers.onBlur, () => setFocusVisible(false)),
    },
  };
}
