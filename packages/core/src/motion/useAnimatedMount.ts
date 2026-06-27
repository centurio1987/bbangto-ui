import { useState, useEffect } from 'react';

/**
 * Delays React unmount so an exit CSS animation can finish playing.
 *
 * Usage:
 *   const { shouldRender, mountState } = useAnimatedMount(isOpen);
 *   if (!shouldRender) return null;
 *   // Apply different animationName based on mountState === 'open' | 'closed'
 *
 * `durationMs` must match the CSS exit animation duration (defaults to 200ms,
 * matching the `motion.duration.normal` token). The hook uses setTimeout rather
 * than animationend to avoid needing a ref; it is intentionally simple.
 */
export function useAnimatedMount(
  isOpen: boolean,
  durationMs = 200,
): { shouldRender: boolean; mountState: 'open' | 'closed' } {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const t = setTimeout(() => setShouldRender(false), durationMs);
      return () => clearTimeout(t);
    }
  }, [isOpen, durationMs]);

  return { shouldRender, mountState: isOpen ? 'open' : 'closed' };
}
