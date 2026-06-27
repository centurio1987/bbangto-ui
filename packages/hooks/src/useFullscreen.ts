import { useCallback, useEffect, useState } from 'react';
import type { RefObject } from 'react';

export interface FullscreenControls {
  isFullscreen: boolean;
  enter: () => void;
  exit: () => void;
  toggle: () => void;
}

/**
 * 주어진 요소에 대한 Fullscreen API 제어권을 반환한다.
 *
 * SSR 환경 또는 Fullscreen API 미지원 환경에서는
 * `isFullscreen: false`와 no-op 함수들을 반환한다.
 *
 * @param ref 풀스크린 대상 요소의 RefObject
 * @returns `{ isFullscreen, enter, exit, toggle }`
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { isFullscreen, enter, exit, toggle } = useFullscreen(ref);
 */
export function useFullscreen<T extends HTMLElement>(
  ref: RefObject<T | null>,
): FullscreenControls {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.fullscreenElement !== null;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
    };
  }, []);

  const enter = useCallback(() => {
    if (typeof document === 'undefined') return;
    const el = ref.current;
    if (!el || !el.requestFullscreen) return;
    void el.requestFullscreen();
  }, [ref]);

  const exit = useCallback(() => {
    if (typeof document === 'undefined') return;
    if (!document.exitFullscreen) return;
    void document.exitFullscreen();
  }, []);

  const toggle = useCallback(() => {
    if (document.fullscreenElement !== null) {
      exit();
    } else {
      enter();
    }
  }, [enter, exit]);

  return { isFullscreen, enter, exit, toggle };
}
