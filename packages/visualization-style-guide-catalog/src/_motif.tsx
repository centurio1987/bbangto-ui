import { useInsertionEffect } from 'react';
import type { StaticStyle, VisualizationStyleGuide } from '@centurio1987/bbangto-ui-visualization';

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

/*
 * 가이드 → 그 가이드의 래퍼가 `useVizMotifStyle` 로 넣는 모티프 시트. preset 파일이 가이드를 만든 직후
 * `registerVizMotif` 로 같은 MOTIF_ID · MOTIF_CSS 를 등록하므로 런타임 주입과 갈라지지 않는다. (KAN-081)
 */
const motifSheets = new WeakMap<VisualizationStyleGuide, StaticStyle>();

/** preset 파일 전용 — 가이드에 모티프 시트를 묶는다. 런타임 훅에 넘기는 것과 같은 상수를 넘긴다. */
export function registerVizMotif(guide: VisualizationStyleGuide, id: string, css: string): void {
  motifSheets.set(guide, { id, css });
}

/**
 * 이 viz 스타일 가이드의 래퍼가 런타임에 `document.head` 에 넣는 모티프 시트 — `{ id, css }` 목록.
 * 서버 렌더(`renderToStaticMarkup`)는 insertion effect 를 안 돌리므로 소비자가 이것을 직접 깐다.
 * 모티프가 없는 가이드는 빈 목록이다. (KAN-081)
 */
export function vizMotifStylesOf(guide: VisualizationStyleGuide | undefined): StaticStyle[] {
  const sheet = guide ? motifSheets.get(guide) : undefined;
  return sheet ? [{ ...sheet }] : [];
}
