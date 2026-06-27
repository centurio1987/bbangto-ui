import { useEffect, useRef } from 'react';

/**
 * 지정한 간격으로 콜백을 반복 호출하는 훅.
 *
 * - `delayMs`가 `null`이면 인터벌이 일시정지된다.
 * - `callback`은 ref로 캡처되므로 stale closure 걱정 없이 최신 값을 항상 사용한다.
 * - 컴포넌트 언마운트 또는 `delayMs` 변경 시 자동으로 cleanup된다.
 *
 * @param callback 반복 호출할 함수
 * @param delayMs 인터벌 간격(ms). `null`이면 일시정지.
 *
 * @example
 * useInterval(() => setCount((c) => c + 1), isRunning ? 1000 : null);
 */
export function useInterval(callback: () => void, delayMs: number | null): void {
  const callbackRef = useRef<() => void>(callback);

  // 매 렌더마다 최신 callback으로 갱신
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) return;

    const id = setInterval(() => {
      callbackRef.current();
    }, delayMs);

    return () => {
      clearInterval(id);
    };
  }, [delayMs]);
}
