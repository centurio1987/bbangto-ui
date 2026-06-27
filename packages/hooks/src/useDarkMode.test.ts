import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDarkMode } from './useDarkMode';

type ChangeHandler = (e: MediaQueryListEvent) => void;

function makeMockMql(initialMatches: boolean) {
  const listeners: ChangeHandler[] = [];
  const mql = {
    matches: initialMatches,
    addEventListener: vi.fn((_type: string, handler: ChangeHandler) => {
      listeners.push(handler);
    }),
    removeEventListener: vi.fn((_type: string, handler: ChangeHandler) => {
      const idx = listeners.indexOf(handler);
      if (idx !== -1) listeners.splice(idx, 1);
    }),
    dispatchChange(matches: boolean) {
      mql.matches = matches;
      listeners.forEach((fn) => fn({ matches } as MediaQueryListEvent));
    },
  };
  return mql;
}

describe('useDarkMode', () => {
  let mockMql: ReturnType<typeof makeMockMql>;

  beforeEach(() => {
    mockMql = makeMockMql(false);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMql));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('시스템이 라이트 모드이면 false를 반환한다', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(false);
  });

  it('시스템이 다크 모드이면 true를 반환한다', () => {
    mockMql = makeMockMql(true);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMql));

    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(true);
  });

  it('change 이벤트 발생 시 상태가 갱신된다', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current).toBe(false);

    act(() => {
      mockMql.dispatchChange(true);
    });

    expect(result.current).toBe(true);
  });

  it('언마운트 시 리스너가 제거된다', () => {
    const { unmount } = renderHook(() => useDarkMode());
    unmount();
    expect(mockMql.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
