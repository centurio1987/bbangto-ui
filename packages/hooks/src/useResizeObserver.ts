import { useEffect, useState } from 'react';

export interface ElementSize {
  width: number;
  height: number;
}

/**
 * `ref` 로 연결된 DOM 요소의 크기를 `ResizeObserver` 로 구독한다.
 *
 * SSR / ResizeObserver 미지원 환경에서는 `{ width: 0, height: 0 }` 을
 * 반환한다. ref 가 null 이면 구독하지 않는다.
 *
 * @param ref 관찰할 요소의 React ref
 * @returns 요소의 현재 크기 `{ width, height }`
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { width, height } = useResizeObserver(ref);
 */
export function useResizeObserver<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ref.current) return;
    if (typeof ResizeObserver === 'undefined') return;

    const el = ref.current;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return size;
}
