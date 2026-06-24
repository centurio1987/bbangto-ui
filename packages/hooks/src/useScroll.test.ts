import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScroll } from './useScroll';

describe('useScroll', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollX', { writable: true, configurable: true, value: 0 });
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('초기값은 { x: 0, y: 0 } 이다', () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('scroll 이벤트 발생 시 x, y가 갱신된다', () => {
    const { result } = renderHook(() => useScroll());

    act(() => {
      Object.defineProperty(window, 'scrollX', { writable: true, configurable: true, value: 100 });
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 200 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 100, y: 200 });
  });
});
