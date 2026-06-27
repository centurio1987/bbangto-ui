import { useEffect, useState } from 'react';

/**
 * 현재 페이지의 가시성 상태를 구독한다.
 *
 * `document.visibilityState`를 기반으로 `visibilitychange` 이벤트를 구독하며,
 * SSR 환경에서는 `true`를 초기값으로 반환하고
 * 클라이언트 마운트 후 실제 값으로 동기화된다.
 *
 * @returns 페이지가 사용자에게 보이면 `true`, 숨겨지면 `false`
 *
 * @example
 * const isVisible = usePageVisibility();
 */
export function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return document.visibilityState === 'visible';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    setIsVisible(document.visibilityState === 'visible');

    const handler = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handler);
    return () => {
      document.removeEventListener('visibilitychange', handler);
    };
  }, []);

  return isVisible;
}
