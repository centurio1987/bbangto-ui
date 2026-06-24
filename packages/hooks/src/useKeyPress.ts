import { useEffect, useState } from 'react';

/**
 * 지정한 키가 현재 눌려 있는지 여부를 반환한다.
 *
 * `keydown`에서 `true`, `keyup`에서 `false`로 갱신된다.
 * SSR 환경에서는 이벤트를 등록하지 않으며 초기 상태는 `false`.
 *
 * @param targetKey `KeyboardEvent.key` 값 (예: `'Enter'`, `'Escape'`, `'a'`)
 * @returns 해당 키가 눌린 상태면 `true`
 *
 * @example
 * const isEnterPressed = useKeyPress('Enter');
 */
export function useKeyPress(targetKey: string): boolean {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === targetKey) setIsPressed(true);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === targetKey) setIsPressed(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [targetKey]);

  return isPressed;
}
