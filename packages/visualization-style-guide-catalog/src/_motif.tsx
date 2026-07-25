import { useInsertionEffect } from 'react';

const injected = new Set<string>();

/**
 * 모티프 전용 CSS를 문서에 1회 주입한다(SSR-safe, id 단위 dedupe).
 * 규칙은 반드시 `[data-bbangto-viz-style-guide="<name>"]` 스코프로 작성해
 * 다른 스타일 가이드를 오염시키지 않아야 한다.
 */
export function useVizMotifStyle(id: string, css: string): void {
  useInsertionEffect(() => {
    if (typeof document === 'undefined') return;
    if (injected.has(id) || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
    injected.add(id);
  }, [id, css]);
}
