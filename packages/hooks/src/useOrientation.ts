import { useEffect, useState } from 'react';

/** 화면 방향 타입 */
export type OrientationType = 'portrait' | 'landscape';

/**
 * 현재 화면 방향(세로/가로)을 구독한다.
 *
 * `(orientation: portrait)` 미디어 쿼리를 구독하며,
 * SSR 환경에서는 `'portrait'`을 초기값으로 반환하고
 * 클라이언트 마운트 후 실제 값으로 동기화된다.
 *
 * @returns `'portrait'` (세로) 또는 `'landscape'` (가로)
 *
 * @example
 * const orientation = useOrientation();
 */
export function useOrientation(): OrientationType {
  const [orientation, setOrientation] = useState<OrientationType>(() => {
    if (typeof window === 'undefined') return 'portrait';
    return window.matchMedia('(orientation: portrait)').matches
      ? 'portrait'
      : 'landscape';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(orientation: portrait)');
    setOrientation(mql.matches ? 'portrait' : 'landscape');

    const handler = (e: MediaQueryListEvent) => {
      setOrientation(e.matches ? 'portrait' : 'landscape');
    };

    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, []);

  return orientation;
}
