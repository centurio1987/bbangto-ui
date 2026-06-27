import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useCopyToClipboard } from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('초기 copied 상태는 false다', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current[0]).toBe(false);
  });

  it('copy 호출 후 copied가 true가 된다', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current[1]('hello');
      expect(success).toBe(true);
    });

    expect(result.current[0]).toBe(true);
  });

  it('resetMs 경과 후 copied가 false로 돌아온다', async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));

    await act(async () => {
      await result.current[1]('hello');
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(false);
  });

  it('navigator.clipboard가 없으면 false를 반환한다', async () => {
    vi.unstubAllGlobals();
    vi.stubGlobal('navigator', {});

    const { result } = renderHook(() => useCopyToClipboard());

    let success: boolean = true;
    await act(async () => {
      success = await result.current[1]('hello');
    });

    expect(success).toBe(false);
    expect(result.current[0]).toBe(false);
  });
});
