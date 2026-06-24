import { useEffect, useRef } from 'react';

/**
 * 직전 렌더에서의 값을 반환한다. 최초 렌더에서는 `undefined`.
 *
 * 값 변화 감지(이전/현재 비교)나 트랜지션 트리거에 쓴다.
 *
 * @param value 추적할 현재 값
 * @returns 직전 렌더의 값 (최초에는 `undefined`)
 *
 * @example
 * const prevCount = usePrevious(count);
 * if (prevCount !== undefined && prevCount < count) { ... }
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
