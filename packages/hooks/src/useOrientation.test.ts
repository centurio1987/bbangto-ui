import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useOrientation } from './useOrientation';

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

describe('useOrientation', () => {
  let mockMql: ReturnType<typeof makeMockMql>;

  beforeEach(() => {
    // 기본은 portrait (matches = true)
    mockMql = makeMockMql(true);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMql));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('portrait 상태이면 "portrait"를 반환한다', () => {
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe('portrait');
  });

  it('landscape 상태이면 "landscape"를 반환한다', () => {
    mockMql = makeMockMql(false);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMql));

    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe('landscape');
  });

  it('change 이벤트 발생 시 portrait → landscape로 갱신된다', () => {
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe('portrait');

    act(() => {
      mockMql.dispatchChange(false);
    });

    expect(result.current).toBe('landscape');
  });

  it('change 이벤트 발생 시 landscape → portrait로 갱신된다', () => {
    mockMql = makeMockMql(false);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMql));

    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe('landscape');

    act(() => {
      mockMql.dispatchChange(true);
    });

    expect(result.current).toBe('portrait');
  });

  it('언마운트 시 리스너가 제거된다', () => {
    const { unmount } = renderHook(() => useOrientation());
    unmount();
    expect(mockMql.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
