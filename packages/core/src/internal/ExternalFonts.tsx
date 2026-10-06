import { useInsertionEffect } from 'react';

/**
 * Whether a Provider loads its web fonts from external CDNs.
 * - `'external'` (default): inject Pretendard (jsDelivr) and JetBrains Mono (Google Fonts).
 * - `'none'`: this Provider injects nothing. The app is expected to load the fonts itself.
 *   Injection is shared by the whole document, so fonts another Provider already injected
 *   stay — external requests reach zero only when every Provider in the document uses `'none'`.
 */
export type ExternalFontsMode = 'external' | 'none';

/**
 * One `<style id>` per font, shared by every Provider in the document.
 *
 * The JetBrains Mono id/href MUST stay identical to
 * `packages/visualization/src/internal/ExternalFonts.tsx`. The two packages do not
 * depend on each other, so when a VisualizationStyleGuideProvider is nested inside a
 * core Provider the shared DOM id is the only thing that prevents a second request.
 */
const EXTERNAL_FONTS = [
  {
    id: 'bbangto-font-pretendard',
    href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css',
  },
  {
    id: 'bbangto-font-jetbrains-mono',
    href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
  },
] as const;

/**
 * Injects the external font stylesheets into `document.head` once per font,
 * the same way `useMotionKeyframes` injects the motion sheet.
 *
 * Runs on the client only (`useInsertionEffect` never runs during SSR), so
 * server-rendered HTML does not contain the `@import`; fonts start loading after
 * hydration. Nodes are not removed on unmount — other Providers may rely on them.
 */
export function useExternalFonts(mode: ExternalFontsMode): void {
  useInsertionEffect(() => {
    if (mode === 'none' || typeof document === 'undefined') return;
    for (const { id, href } of EXTERNAL_FONTS) {
      if (document.getElementById(id)) continue;
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `@import url('${href}');`;
      document.head.appendChild(style);
    }
  }, [mode]);
}
