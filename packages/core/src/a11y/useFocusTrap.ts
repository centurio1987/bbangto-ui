import type React from 'react';
import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MAX_FOCUS_FRAMES = 10;

/**
 * Dialog focus contract (WAI-ARIA APG Dialog pattern).
 *
 * - When `active` turns on, remembers the focused element and moves focus to the
 *   container (which must have `tabIndex={-1}`).
 * - When `active` turns off, returns focus to the remembered element. This runs on
 *   the flag, not on unmount, so it already happens while an exit animation plays.
 * - Returns an `onKeyDown` handler that keeps Tab / Shift+Tab inside the container.
 */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  active: boolean,
) {
  const lastFocusedRef = useRef<Element | null>(null);

  useEffect(() => {
    if (active) {
      lastFocusedRef.current = document.activeElement;
      // The container may not exist yet: surfaces that animate their mount
      // (useAnimatedMount) render it one update after `active` turns on, and with
      // real input that update can land after the next frame. Retry for a few
      // frames instead of trying once. Leave focus alone if something inside
      // already took it (autoFocus).
      let id = 0;
      let frames = 0;
      const moveFocus = () => {
        const container = containerRef.current;
        if (container) {
          if (!container.contains(document.activeElement)) container.focus();
          return;
        }
        if (frames++ < MAX_FOCUS_FRAMES) id = requestAnimationFrame(moveFocus);
      };
      id = requestAnimationFrame(moveFocus);
      return () => cancelAnimationFrame(id);
    }
    if (lastFocusedRef.current instanceof HTMLElement) {
      lastFocusedRef.current.focus();
    }
    return undefined;
  }, [active]);

  return (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const container = containerRef.current;
    const focusables = container?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!focusables || focusables.length === 0) {
      e.preventDefault();
      container?.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const activeElement = document.activeElement;
    if (e.shiftKey && activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
}
