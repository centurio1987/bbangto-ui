import { useEffect, useState } from 'react';

/**
 * 입력 값을 `delayMs` 만큼 지연시켜 반환한다.
 *
 * 값이 바뀌면 타이머를 재설정하므로, 마지막 변경 후 `delayMs` 가 지나야
 * 반영된다. 검색어 입력 등 빈번한 변경을 디바운스할 때 쓴다.
 *
 * @param value 디바운스할 값
 * @param delayMs 지연 시간(ms)
 * @returns 지연 반영된 값
 *
 * @example
 * const debounced = useDebounce(query, 300);
 * useEffect(() => { search(debounced); }, [debounced]);
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, delayMs);

    return () => {
      clearTimeout(id);
    };
  }, [value, delayMs]);

  return debounced;
}
