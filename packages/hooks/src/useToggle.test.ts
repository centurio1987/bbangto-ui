import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('초기값은 기본 false다', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('명시적 초기값을 사용한다', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('toggle 호출 시 값이 반전된다', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('set으로 값을 직접 지정한다', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2](true);
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[2](false);
    });
    expect(result.current[0]).toBe(false);
  });
});
