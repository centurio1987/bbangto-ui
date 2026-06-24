import { useCallback, useRef, useState } from 'react';
import type { ElementSize } from './useResizeObserver';

/**
 * ref 콜백과 `ResizeObserver` 를 결합해 요소의 크기를 추적한다.
 *
 * 반환된 콜백을 요소의 `ref` prop 에 전달하면, 해당 요소가 마운트/언마운트될 때
 * 자동으로 관찰을 시작/중지한다.
 *
 * SSR / ResizeObserver 미지원 환경에서는 `{ width: 0, height: 0 }` 을 반환한다.
 *
 * @returns `[refCallback, { width, height }]` 튜플
 *
 * @example
 * const [ref, { width, height }] = useElementSize<HTMLDivElement>();
 * return <div ref={ref}>{width}×{height}</div>;
 */
export function useElementSize<T extends HTMLElement>(): [
  (node: T | null) => void,
  ElementSize,
] {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);

  const refCallback = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node) return;
    if (typeof window === 'undefined') return;
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  return [refCallback, size];
}
