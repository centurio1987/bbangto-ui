import { useCallback, useEffect, useRef } from 'react';

/**
 * Returns a stable getter reporting whether the component is still mounted.
 *
 * 비동기 작업 완료 후 상태 갱신 전에 마운트 여부를 확인해 메모리 누수/경고를
 * 방지하는 데 쓴다. `@centurio1987/hooks`의 오서링 레퍼런스 훅이다.
 *
 * @example
 * const isMounted = useIsMounted();
 * fetchData().then((d) => { if (isMounted()) setData(d); });
 */
export function useIsMounted(): () => boolean {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}
