import { useCallback, useEffect, useRef, useState } from 'react';

const ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
  'wheel',
] as const;

/**
 * 일정 시간 동안 사용자 활동이 없으면 `true`를 반환한다.
 *
 * SSR 환경에서는 항상 `false`를 반환하며,
 * 클라이언트 마운트 후 이벤트 감지를 시작한다.
 *
 * @param timeoutMs 유휴 판정까지의 대기 시간 (밀리초)
 * @returns `true`이면 유휴 상태, `false`이면 활성 상태
 *
 * @example
 * const isIdle = useIdle(60_000); // 1분 무활동 시 true
 */
export function useIdle(timeoutMs: number): boolean {
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutMsRef = useRef<number>(timeoutMs);

  // 최신 timeoutMs를 ref에 동기화
  useEffect(() => {
    timeoutMsRef.current = timeoutMs;
  });

  const resetTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    setIsIdle(false);
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeoutMsRef.current);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 마운트 시 타이머 시작
    resetTimer();

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, resetTimer, { passive: true });
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, resetTimer);
      }
    };
  }, [resetTimer]);

  return isIdle;
}
