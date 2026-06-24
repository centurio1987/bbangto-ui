import { useEffect, useState } from 'react';

/**
 * pointermove 이벤트를 구독해 마우스/포인터 위치 `{ x, y }` 를 반환한다.
 *
 * SSR 환경에서는 `{ x: 0, y: 0 }` 을 반환한다.
 *
 * @returns 포인터 위치 객체
 *
 * @example
 * const { x, y } = useMousePosition();
 * return <p>pointer at ({x}, {y})</p>;
 */
export function useMousePosition(): { x: number; y: number } {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return position;
}
