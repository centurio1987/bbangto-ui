import { useInsertionEffect } from 'react';

/**
 * Provider가 외부 CDN 글꼴을 불러올지.
 * - `'external'`(기본): JetBrains Mono(Google Fonts)를 주입한다.
 * - `'none'`: 외부 요청을 하지 않는다. 글꼴은 앱이 직접 불러온다.
 */
export type ExternalFontsMode = 'external' | 'none';

/**
 * 글꼴마다 `<style id>` 하나를 문서 전체가 나눠 쓴다.
 *
 * id·href 는 `packages/core/src/internal/ExternalFonts.tsx` 와 **반드시 같아야 한다.**
 * 두 패키지는 서로 의존하지 않으므로, core Provider 안에 이 Provider 를 겹쳤을 때
 * 두 번째 요청을 막는 것은 같은 DOM id 뿐이다.
 */
const JETBRAINS_MONO = {
  id: 'bbangto-font-jetbrains-mono',
  href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
} as const;

/**
 * 외부 글꼴 스타일시트를 `document.head` 에 글꼴마다 한 번만 넣는다(useVizContractCss 와 같은 방식).
 *
 * `useInsertionEffect` 는 SSR 에서 돌지 않으므로 서버 HTML 에는 `@import` 가 없고,
 * 화면이 켜진 뒤 글꼴을 불러온다. 다른 Provider 가 쓰고 있을 수 있어 언마운트해도 지우지 않는다.
 */
export function useExternalFonts(mode: ExternalFontsMode): void {
  useInsertionEffect(() => {
    if (mode === 'none' || typeof document === 'undefined') return;
    if (document.getElementById(JETBRAINS_MONO.id)) return;
    const style = document.createElement('style');
    style.id = JETBRAINS_MONO.id;
    style.textContent = `@import url('${JETBRAINS_MONO.href}');`;
    document.head.appendChild(style);
  }, [mode]);
}
