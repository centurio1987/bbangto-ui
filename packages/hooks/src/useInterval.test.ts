import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useInterval } from './useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('지정한 delay마다 callback을 호출한다', () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, 500));

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('delay가 null이면 callback을 호출하지 않는다', () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, null));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('delay가 null로 변경되면 인터벌이 정지된다', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ delay }: { delay: number | null }) => useInterval(callback, delay),
      { initialProps: { delay: 500 as number | null } },
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    rerender({ delay: null });

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // null로 전환 후 추가 호출 없음
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('callback이 최신 클로저 값을 사용한다 (stale closure 방지)', () => {
    let counter = 0;
    const getCallback = () => () => {
      counter += 1;
    };

    const { rerender } = renderHook(
      ({ cb }: { cb: () => void }) => useInterval(cb, 300),
      { initialProps: { cb: getCallback() } },
    );

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(counter).toBe(1);

    // callback 교체
    rerender({ cb: () => { counter += 10; } });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    // 새 callback이 실행되어야 한다
    expect(counter).toBe(11);
  });

  it('언마운트 시 인터벌이 정리된다', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useInterval(callback, 500));

    unmount();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
