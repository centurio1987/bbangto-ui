import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('localStorage에 값이 없으면 initialValue를 반환한다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 42));
    expect(result.current[0]).toBe(42);
  });

  it('setValue로 상태와 localStorage를 동시에 갱신한다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1](99);
    });

    expect(result.current[0]).toBe(99);
    expect(JSON.parse(window.localStorage.getItem('test-key')!)).toBe(99);
  });

  it('함수형 업데이터를 지원한다', () => {
    const { result } = renderHook(() => useLocalStorage('count', 1));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it('마운트 시 localStorage에 이미 값이 있으면 그 값으로 초기화한다', () => {
    window.localStorage.setItem('existing-key', JSON.stringify('hello'));

    const { result } = renderHook(() => useLocalStorage('existing-key', 'default'));

    // useEffect 실행 후 갱신됨
    expect(result.current[0]).toBe('hello');
  });
});
