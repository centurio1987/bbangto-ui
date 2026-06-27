import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 엘리먼트가 포커스를 갖고 있는지 여부를 반환한다.
 *
 * ref callback 방식을 사용해 엘리먼트가 교체될 때도 이벤트가 올바르게 재등록된다.
 * SSR 환경에서는 이벤트를 등록하지 않으며 초기 상태는 `false`.
 *
 * @returns `[refCallback, isFocused]` 튜플
 *
 * @example
 * const [ref, isFocused] = useFocus<HTMLInputElement>();
 * return <input ref={ref} style={{ outline: isFocused ? '2px solid blue' : 'none' }} />;
 */
export function useFocus<T extends HTMLElement>(): [
  (node: T | null) => void,
  boolean,
] {
  const [isFocused, setIsFocused] = useState(false);
  const nodeRef = useRef<T | null>(null);

  const onFocus = useCallback(() => setIsFocused(true), []);
  const onBlur = useCallback(() => setIsFocused(false), []);

  const refCallback = useCallback(
    (node: T | null) => {
      if (typeof window === 'undefined') return;

      if (nodeRef.current) {
        nodeRef.current.removeEventListener('focus', onFocus);
        nodeRef.current.removeEventListener('blur', onBlur);
      }

      nodeRef.current = node;

      if (node) {
        node.addEventListener('focus', onFocus);
        node.addEventListener('blur', onBlur);
      } else {
        setIsFocused(false);
      }
    },
    [onFocus, onBlur],
  );

  useEffect(() => {
    return () => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener('focus', onFocus);
        nodeRef.current.removeEventListener('blur', onBlur);
      }
    };
  }, [onFocus, onBlur]);

  return [refCallback, isFocused];
}
