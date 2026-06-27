import { useEffect, useState } from 'react';

/**
 * 페이지 세로 스크롤 진행도를 0..1 범위로 반환한다.
 *
 * 페이지 최상단이면 0, 최하단이면 1이다.
 * SSR 환경에서는 0을 반환한다.
 *
 * @returns 스크롤 진행도 (0..1)
 *
 * @example
 * const progress = useScrollProgress();
 * return <ProgressBar value={progress} />;
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const calculate = (): number => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (docHeight <= 0) return 0;
      return Math.min(1, Math.max(0, scrollTop / docHeight));
    };

    const handleScroll = () => {
      setProgress(calculate());
    };

    setProgress(calculate());
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
}
