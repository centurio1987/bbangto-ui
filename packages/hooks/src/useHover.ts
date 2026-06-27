import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 엘리먼트에 포인터가 올라와 있는지 여부를 반환한다.
 *
 * ref callback 방식을 사용해 엘리먼트가 교체될 때도 이벤트가 올바르게 재등록된다.
 * SSR 환경에서는 이벤트를 등록하지 않으며 초기 상태는 `false`.
 *
 * @returns `[refCallback, isHovered]` 튜플
 *
 * @example
 * const [ref, isHovered] = useHover<HTMLDivElement>();
 * return <div ref={ref}>{isHovered ? 'hovered' : 'idle'}</div>;
 */
export function useHover<T extends HTMLElement>(): [
  (node: T | null) => void,
  boolean,
] {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef<T | null>(null);

  const onEnter = useCallback(() => setIsHovered(true), []);
  const onLeave = useCallback(() => setIsHovered(false), []);

  const refCallback = useCallback(
    (node: T | null) => {
      if (typeof window === 'undefined') return;

      if (nodeRef.current) {
        nodeRef.current.removeEventListener('pointerenter', onEnter);
        nodeRef.current.removeEventListener('pointerleave', onLeave);
      }

      nodeRef.current = node;

      if (node) {
        node.addEventListener('pointerenter', onEnter);
        node.addEventListener('pointerleave', onLeave);
      } else {
        setIsHovered(false);
      }
    },
    [onEnter, onLeave],
  );

  useEffect(() => {
    return () => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener('pointerenter', onEnter);
        nodeRef.current.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [onEnter, onLeave]);

  return [refCallback, isHovered];
}
