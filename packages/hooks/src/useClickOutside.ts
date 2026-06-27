import { useEffect, useRef } from 'react';

/**
 * 지정된 엘리먼트 바깥을 클릭했을 때 `handler`를 호출한다.
 *
 * 반환된 `ref`를 대상 엘리먼트에 붙이면 해당 엘리먼트 밖의 `mousedown` 이벤트를
 * 감지해 핸들러를 실행한다. 드롭다운/모달의 외부 클릭 닫기에 쓴다.
 * SSR 환경에서는 이벤트를 등록하지 않는다.
 *
 * @param handler 바깥 클릭 시 실행할 콜백
 * @returns 대상 엘리먼트에 붙일 ref 객체
 *
 * @example
 * const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
 * return <div ref={ref}>...</div>;
 */
export function useClickOutside<T extends HTMLElement>(
  handler: (e: Event) => void,
): React.RefObject<T> {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const listener = (e: Event) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;
      handlerRef.current(e);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  return ref;
}
