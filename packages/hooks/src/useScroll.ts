import { useEffect, useState } from 'react';

/**
 * window 스크롤 위치 `{ x, y }` 를 반환한다.
 *
 * SSR 환경에서는 `{ x: 0, y: 0 }` 을 반환한다.
 *
 * @returns 스크롤 위치 객체
 *
 * @example
 * const { x, y } = useScroll();
 * return <p>scrolled to {y}px vertically</p>;
 */
export function useScroll(): { x: number; y: number } {
  const [scroll, setScroll] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScroll({ x: window.scrollX, y: window.scrollY });
    };

    setScroll({ x: window.scrollX, y: window.scrollY });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scroll;
}
