import { useCallback, useEffect, useState } from 'react';

/**
 * localStorage와 동기화되는 상태를 반환한다.
 *
 * SSR 환경에서는 `initialValue`를 기본값으로 쓰고, 클라이언트 마운트 후
 * localStorage에서 값을 읽어 상태를 갱신한다.
 *
 * @param key localStorage 키
 * @param initialValue SSR 및 키 부재 시 초기값
 * @returns `[storedValue, setValue]` 튜플
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (v: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 클라이언트 마운트 후 localStorage에서 읽기
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch {
      // 읽기 실패 시 initialValue 유지
    }
  }, [key]);

  const setValue = useCallback(
    (v: T | ((prev: T) => T)) => {
      if (typeof window === 'undefined') return;
      try {
        setStoredValue((prev) => {
          const nextValue = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
          window.localStorage.setItem(key, JSON.stringify(nextValue));
          return nextValue;
        });
      } catch {
        // 쓰기 실패 시 무시
      }
    },
    [key],
  );

  return [storedValue, setValue];
}
