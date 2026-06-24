import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver를 사용해 요소가 뷰포트에 보이는지 추적한다.
 *
 * @param options IntersectionObserver 옵션
 * @returns `[ref callback, inView]` 튜플
 *
 * @example
 * const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });
 * return <div ref={ref}>{inView ? '보임' : '안보임'}</div>;
 */
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [(node: T | null) => void, boolean] {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (node === null) return;

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        return;
      }

      observerRef.current = new IntersectionObserver(([entry]) => {
        setInView(entry.isIntersecting);
      }, options);

      observerRef.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options?.root, options?.rootMargin, options?.threshold],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return [ref, inView];
}
