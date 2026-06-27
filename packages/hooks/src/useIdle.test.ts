import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIdle } from './useIdle';

describe('useIdle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('초기 상태: 활성 상태(false)를 반환한다', () => {
    const { result } = renderHook(() => useIdle(5000));
    expect(result.current).toBe(false);
  });

  it('timeoutMs 경과 전에는 false를 유지한다', () => {
    const { result } = renderHook(() => useIdle(5000));

    act(() => {
      vi.advanceTimersByTime(4999);
    });

    expect(result.current).toBe(false);
  });

  it('timeoutMs 경과 후 true(유휴)로 변경된다', () => {
    const { result } = renderHook(() => useIdle(5000));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current).toBe(true);
  });

  it('타이머 만료 전 mousemove 이벤트가 발생하면 타이머가 초기화된다', () => {
    const { result } = renderHook(() => useIdle(5000));

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    // 타이머 만료 전 활동 이벤트 발생
    act(() => {
      window.dispatchEvent(new Event('mousemove'));
    });
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    // 리셋 후 4000ms 경과이므로 아직 유휴 아님
    expect(result.current).toBe(false);
  });

  it('활동 이벤트 후 timeoutMs 경과하면 다시 true(유휴)가 된다', () => {
    const { result } = renderHook(() => useIdle(5000));

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    act(() => {
      window.dispatchEvent(new Event('keydown'));
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current).toBe(true);
  });

  it('언마운트 후 타이머 콜백이 실행되지 않는다', () => {
    const { result, unmount } = renderHook(() => useIdle(5000));

    unmount();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // 언마운트 후에는 상태 업데이트 없음 — 마지막 값 유지
    expect(result.current).toBe(false);
  });
});
