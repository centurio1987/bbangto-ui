import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollProgress } from './useScrollProgress';

describe('useScrollProgress', () => {
  beforeEach(() => {
    // jsdom defaults: scrollY=0, scrollHeight=768, clientHeight=768 → docHeight=0
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      writable: true,
      configurable: true,
      value: 500,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('초기값은 scrollY=0이면 0이다', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it('scroll 이벤트 발생 시 진행도가 갱신된다', () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 250 });
      window.dispatchEvent(new Event('scroll'));
    });

    // scrollY=250 / (scrollHeight=1000 - clientHeight=500) = 250/500 = 0.5
    expect(result.current).toBeCloseTo(0.5);
  });

  it('최하단에서는 1을 반환한다', () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 500 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(1);
  });
});
