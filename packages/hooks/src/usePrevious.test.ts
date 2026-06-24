import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('최초 렌더에서는 undefined를 반환한다', () => {
    const { result } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });
    expect(result.current).toBeUndefined();
  });

  it('rerender 후 직전 렌더의 값을 반환한다', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 1 } },
    );

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
});
