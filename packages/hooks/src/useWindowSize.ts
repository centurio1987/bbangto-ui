import { useEffect, useState } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

/**
 * 브라우저 창 크기를 구독하고 `{ width, height }` 를 반환한다.
 *
 * SSR 환경(window 없음)에서는 `{ width: 0, height: 0 }` 을 초기값으로
 * 반환하며, 클라이언트 마운트 후 실제 값으로 동기화된다.
 *
 * @returns 현재 창 크기 `{ width, height }`
 *
 * @example
 * const { width, height } = useWindowSize();
 */
export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') return { width: 0, height: 0 };
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
