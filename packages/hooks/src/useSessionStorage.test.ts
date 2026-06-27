import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useSessionStorage } from './useSessionStorage';

describe('useSessionStorage', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('sessionStorage에 값이 없으면 initialValue를 반환한다', () => {
    const { result } = renderHook(() => useSessionStorage('test-key', 42));
    expect(result.current[0]).toBe(42);
  });

  it('setValue로 상태와 sessionStorage를 동시에 갱신한다', () => {
    const { result } = renderHook(() => useSessionStorage('test-key', 0));

    act(() => {
      result.current[1](99);
    });

    expect(result.current[0]).toBe(99);
    expect(JSON.parse(window.sessionStorage.getItem('test-key')!)).toBe(99);
  });

  it('함수형 업데이터를 지원한다', () => {
    const { result } = renderHook(() => useSessionStorage('count', 1));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it('마운트 시 sessionStorage에 이미 값이 있으면 그 값으로 초기화한다', () => {
    window.sessionStorage.setItem('existing-key', JSON.stringify('hello'));

    const { result } = renderHook(() => useSessionStorage('existing-key', 'default'));

    expect(result.current[0]).toBe('hello');
  });

  it('객체 타입 값을 올바르게 직렬화/역직렬화한다', () => {
    const { result } = renderHook(() =>
      useSessionStorage<{ name: string; age: number }>('user', { name: '', age: 0 }),
    );

    act(() => {
      result.current[1]({ name: 'Alice', age: 30 });
    });

    expect(result.current[0]).toEqual({ name: 'Alice', age: 30 });
    expect(JSON.parse(window.sessionStorage.getItem('user')!)).toEqual({
      name: 'Alice',
      age: 30,
    });
  });
});
