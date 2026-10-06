import type React from 'react';

export type RovingOrientation = 'horizontal' | 'vertical';

export interface RovingOptions {
  /** Which arrow pair moves. @default 'horizontal' */
  orientation?: RovingOrientation;
  /** Wrap from the last item to the first and back. @default true */
  loop?: boolean;
}

const PREV: Record<RovingOrientation, string> = { horizontal: 'ArrowLeft', vertical: 'ArrowUp' };
const NEXT: Record<RovingOrientation, string> = { horizontal: 'ArrowRight', vertical: 'ArrowDown' };

/**
 * Index the arrow / Home / End key moves to, skipping disabled items.
 * Returns `null` when the key is not a navigation key or nothing is enabled.
 * `current` may be -1 (nothing active yet): next lands on the first enabled item,
 * previous on the last.
 */
export function getRovingIndex(
  key: string,
  current: number,
  disabled: readonly boolean[],
  { orientation = 'horizontal', loop = true }: RovingOptions = {},
): number | null {
  const enabled = disabled.map((d, i) => (d ? -1 : i)).filter((i) => i >= 0);
  if (enabled.length === 0) return null;
  const firstEnabled = enabled[0];
  const lastEnabled = enabled[enabled.length - 1];

  if (key === 'Home') return firstEnabled;
  if (key === 'End') return lastEnabled;

  const step = key === NEXT[orientation] ? 1 : key === PREV[orientation] ? -1 : 0;
  if (step === 0) return null;
  if (current < 0) return step === 1 ? firstEnabled : lastEnabled;

  const after = enabled.filter((i) => (step === 1 ? i > current : i < current));
  if (after.length > 0) return step === 1 ? after[0] : after[after.length - 1];
  if (!loop) return disabled[current] ? (step === 1 ? lastEnabled : firstEnabled) : current;
  return step === 1 ? firstEnabled : lastEnabled;
}

/**
 * Keyboard movement inside a composite widget (tabs, listbox options).
 *
 * Returns a function for the widget's `onKeyDown`: given the active index and the
 * disabled flags, it returns the index to move to (and prevents the browser's
 * default scroll), or `null` when the key is not for navigation. The widget decides
 * what "move" means — DOM focus for tabs, `aria-activedescendant` for a listbox.
 */
export function useRovingFocus(options: RovingOptions = {}) {
  return (e: React.KeyboardEvent, current: number, disabled: readonly boolean[]): number | null => {
    if (e.altKey || e.ctrlKey || e.metaKey) return null;
    const next = getRovingIndex(e.key, current, disabled, options);
    if (next === null) return null;
    e.preventDefault();
    return next;
  };
}
