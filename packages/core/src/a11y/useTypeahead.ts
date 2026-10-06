import { useEffect, useRef } from 'react';

const RESET_MS = 500;

/**
 * Type-to-select (WAI-ARIA APG listbox typeahead).
 *
 * Characters typed in quick succession build one search string. Repeating a single
 * character cycles through the items that start with it. Returns a function that
 * takes the pressed key and the items, and returns the matching index or `null`.
 * Space is never treated as a search character here — the widget owns it.
 */
export function useTypeahead() {
  const bufferRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    key: string,
    labels: readonly string[],
    disabled: readonly boolean[],
    current: number,
  ): number | null => {
    if (key.length !== 1 || key === ' ') return null;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      bufferRef.current = '';
    }, RESET_MS);
    bufferRef.current += key.toLowerCase();

    const buffer = bufferRef.current;
    const repeated = buffer.split('').every((ch) => ch === buffer[0]);
    const search = repeated ? buffer[0] : buffer;
    // A fresh or repeated single character starts after the active item so it
    // cycles; a longer string re-checks the active item first.
    const start = search.length === 1 ? current + 1 : Math.max(current, 0);

    for (let k = 0; k < labels.length; k++) {
      const i = (start + k) % labels.length;
      if (!disabled[i] && labels[i].toLowerCase().startsWith(search)) return i;
    }
    return null;
  };
}
