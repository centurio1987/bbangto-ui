import { useEffect, useState } from 'react';

/**
 * 시스템의 다크 모드 선호 여부를 구독한다.
 *
 * `prefers-color-scheme: dark` 미디어 쿼리를 구독하며,
 * SSR 환경에서는 `false`를 초기값으로 반환하고
 * 클라이언트 마운트 후 실제 값으로 동기화된다.
 *
 * @returns 다크 모드가 활성화된 경우 `true`
 *
 * @example
 * const isDark = useDarkMode();
 */
export function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, []);

  return isDark;
}
