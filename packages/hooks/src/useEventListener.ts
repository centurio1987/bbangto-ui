import { useEffect, useRef } from 'react';

/**
 * DOM 요소 또는 window에 이벤트 리스너를 붙이고 언마운트 시 자동 해제한다.
 *
 * `handler`는 ref로 래핑되므로 매 렌더마다 핸들러가 바뀌어도
 * 이벤트 리스너를 재등록하지 않는다.
 *
 * @param eventName 이벤트 이름 (예: 'click', 'keydown')
 * @param handler 이벤트 핸들러
 * @param element 대상 요소 (기본값: window). null이면 등록하지 않는다.
 *
 * @example
 * useEventListener('keydown', (e) => {
 *   if ((e as KeyboardEvent).key === 'Escape') close();
 * });
 */
export function useEventListener(
  eventName: string,
  handler: (e: Event) => void,
  element?: HTMLElement | Window | null,
): void {
  const handlerRef = useRef<(e: Event) => void>(handler);

  // 최신 핸들러를 ref에 동기화
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // element가 명시적으로 null이면 등록하지 않음
    if (element === null) return;

    const target: HTMLElement | Window = element ?? window;

    const listener = (e: Event) => {
      handlerRef.current(e);
    };

    target.addEventListener(eventName, listener);

    return () => {
      target.removeEventListener(eventName, listener);
    };
  }, [eventName, element]);
}
