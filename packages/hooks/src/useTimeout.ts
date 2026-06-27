import { useEffect, useRef } from 'react';

/**
 * 지정한 시간 후 콜백을 한 번 호출하는 훅.
 *
 * - `delayMs`가 `null`이면 타임아웃이 비활성화된다.
 * - `callback`은 ref로 캡처되므로 stale closure 걱정 없이 최신 값을 항상 사용한다.
 * - 컴포넌트 언마운트 또는 `delayMs` 변경 시 자동으로 cleanup된다.
 *
 * @param callback 타임아웃 후 호출할 함수
 * @param delayMs 지연 시간(ms). `null`이면 비활성.
 *
 * @example
 * useTimeout(() => setVisible(false), isOpen ? 3000 : null);
 */
export function useTimeout(callback: () => void, delayMs: number | null): void {
  const callbackRef = useRef<() => void>(callback);

  // 매 렌더마다 최신 callback으로 갱신
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) return;

    const id = setTimeout(() => {
      callbackRef.current();
    }, delayMs);

    return () => {
      clearTimeout(id);
    };
  }, [delayMs]);
}
