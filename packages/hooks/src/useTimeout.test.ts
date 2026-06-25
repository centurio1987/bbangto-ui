import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useTimeout } from './useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delay 경과 후 callback을 정확히 한 번 호출한다', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 1000));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('delay가 null이면 callback을 호출하지 않는다', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, null));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('delay 경과 전에는 callback이 호출되지 않는다', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 1000));

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('delay가 null로 변경되면 타임아웃이 취소된다', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ delay }: { delay: number | null }) => useTimeout(callback, delay),
      { initialProps: { delay: 1000 as number | null } },
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    rerender({ delay: null });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('callback이 최신 클로저 값을 사용한다 (stale closure 방지)', () => {
    let result = '';
    const { rerender } = renderHook(
      ({ cb }: { cb: () => void }) => useTimeout(cb, 500),
      { initialProps: { cb: () => { result = 'first'; } } },
    );

    // callback 교체 (타임아웃 발동 전)
    rerender({ cb: () => { result = 'second'; } });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // delay가 변경되지 않았으므로 타임아웃은 재설정되지 않고
    // 기존 타임아웃이 발동할 때 최신 callback 실행
    expect(result).toBe('second');
  });

  it('언마운트 시 타임아웃이 정리된다', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 500));

    unmount();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
