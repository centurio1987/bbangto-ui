import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { usePageVisibility } from './usePageVisibility';

describe('usePageVisibility', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    // 테스트 후 visibilityState를 기본값으로 복원
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
  });

  function setVisibilityState(state: DocumentVisibilityState) {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => state,
    });
  }

  it('페이지가 visible 상태이면 true를 반환한다', () => {
    setVisibilityState('visible');
    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);
  });

  it('페이지가 hidden 상태이면 false를 반환한다', () => {
    setVisibilityState('hidden');
    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(false);
  });

  it('visibilitychange 이벤트 발생 시 상태가 갱신된다', () => {
    setVisibilityState('visible');
    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);

    act(() => {
      setVisibilityState('hidden');
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe(false);
  });

  it('언마운트 시 리스너가 제거된다', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    setVisibilityState('visible');
    const { unmount } = renderHook(() => usePageVisibility());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });
});
