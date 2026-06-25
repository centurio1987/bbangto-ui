import { useEffect, useState } from 'react';

/**
 * 현재 네트워크 온라인/오프라인 상태를 반환한다.
 *
 * SSR 환경에서는 `{ online: true }`를 기본값으로 반환하며,
 * 클라이언트 마운트 후 `navigator.onLine` 실제 값으로 동기화된다.
 *
 * @returns `{ online: boolean }` 현재 네트워크 상태
 *
 * @example
 * const { online } = useNetworkState();
 * if (!online) return <OfflineBanner />;
 */
export function useNetworkState(): { online: boolean } {
  const [online, setOnline] = useState<boolean>(() => {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    // 마운트 시 현재 상태로 동기화
    setOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { online };
}
