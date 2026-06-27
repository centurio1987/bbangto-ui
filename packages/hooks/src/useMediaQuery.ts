import { useEffect, useState } from 'react';

/**
 * CSS 미디어 쿼리 문자열을 구독하고 일치 여부를 반환한다.
 *
 * SSR 환경(window 없음)에서는 `false`를 초기값으로 반환하며,
 * 클라이언트 마운트 후 실제 값으로 동기화된다.
 *
 * @param query CSS 미디어 쿼리 문자열 (예: `"(max-width: 768px)"`)
 * @returns 현재 쿼리 일치 여부
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}
