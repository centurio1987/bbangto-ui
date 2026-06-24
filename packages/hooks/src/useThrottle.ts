import { useEffect, useRef, useState } from 'react';

/**
 * 입력 값을 `intervalMs` 간격으로 쓰로틀해 반환한다.
 *
 * 첫 번째 값은 즉시 반영되며, 이후 `intervalMs` 동안 변경된 값 중
 * 마지막 값이 다음 틱에 반영된다.
 *
 * @param value 쓰로틀할 값
 * @param intervalMs 최소 업데이트 간격(ms)
 * @returns 쓰로틀된 값
 *
 * @example
 * const throttledScroll = useThrottle(scrollY, 100);
 */
export function useThrottle<T>(value: T, intervalMs: number): T {
  const [throttled, setThrottled] = useState<T>(value);
  const lastUpdatedAt = useRef<number>(0);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingValueRef = useRef<T>(value);

  useEffect(() => {
    pendingValueRef.current = value;
    const now = Date.now();
    const elapsed = now - lastUpdatedAt.current;

    if (elapsed >= intervalMs) {
      // 충분한 시간이 지났으면 즉시 반영
      if (pendingTimerRef.current !== null) {
        clearTimeout(pendingTimerRef.current);
        pendingTimerRef.current = null;
      }
      lastUpdatedAt.current = now;
      setThrottled(value);
    } else {
      // 아직 인터벌 내라면 나머지 시간 후 반영 예약
      if (pendingTimerRef.current === null) {
        const remaining = intervalMs - elapsed;
        pendingTimerRef.current = setTimeout(() => {
          lastUpdatedAt.current = Date.now();
          setThrottled(pendingValueRef.current);
          pendingTimerRef.current = null;
        }, remaining);
      }
    }

    return () => {
      // effect 재실행 시 예약된 타이머를 정리하지 않는다.
      // 언마운트 시에만 정리한다.
    };
  }, [value, intervalMs]);

  // 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      if (pendingTimerRef.current !== null) {
        clearTimeout(pendingTimerRef.current);
      }
    };
  }, []);

  return throttled;
}
