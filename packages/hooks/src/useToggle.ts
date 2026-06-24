import { useCallback, useState } from 'react';

/**
 * Boolean 상태와 토글/명시적 set 헬퍼를 반환한다.
 *
 * 패널 열림/닫힘, on/off 스위치 등 단순 불리언 상태를 다룰 때 쓴다.
 *
 * @param initial 초기값 (기본 false)
 * @returns `[value, toggle, set]` 튜플
 *
 * @example
 * const [open, toggle, setOpen] = useToggle();
 * toggle();        // 반전
 * setOpen(true);   // 명시적 지정
 */
export function useToggle(
  initial = false,
): [boolean, () => void, (v: boolean) => void] {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const set = useCallback((v: boolean) => {
    setValue(v);
  }, []);

  return [value, toggle, set];
}
