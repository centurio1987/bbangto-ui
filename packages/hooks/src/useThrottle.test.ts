import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useThrottle } from './useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('초기 값을 즉시 반환한다', () => {
    const { result } = renderHook(() => useThrottle('a', 200));
    expect(result.current).toBe('a');
  });

  it('인터벌 내 변경은 즉시 반영되지 않는다', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 200),
      { initialProps: { value: 'a' } },
    );

    // 첫 번째 값은 즉시 반영됨 (lastUpdatedAt = 0, elapsed >= intervalMs)
    expect(result.current).toBe('a');

    // 인터벌 경과 전에 값 변경 (lastUpdatedAt이 이제 현재 시각)
    act(() => {
      vi.advanceTimersByTime(50);
    });
    rerender({ value: 'b' });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 아직 인터벌(200ms) 미만 경과
    expect(result.current).toBe('a');
  });

  it('인터벌 경과 후 최신 값을 반영한다', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 200),
      { initialProps: { value: 'a' } },
    );

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(50);
    });
    rerender({ value: 'b' });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('b');
  });

  it('인터벌 내 여러 번 변경 시 마지막 값이 반영된다', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 200),
      { initialProps: { value: 'a' } },
    );

    act(() => {
      vi.advanceTimersByTime(50);
    });
    rerender({ value: 'b' });

    act(() => {
      vi.advanceTimersByTime(50);
    });
    rerender({ value: 'c' });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('c');
  });
});
