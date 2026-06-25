import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNetworkState } from './useNetworkState';

describe('useNetworkState', () => {
  beforeEach(() => {
    // navigator.onLine을 모킹 가능하게 설정
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      writable: true,
      value: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('초기값: navigator.onLine이 true이면 online: true를 반환한다', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    const { result } = renderHook(() => useNetworkState());
    expect(result.current.online).toBe(true);
  });

  it('offline 이벤트 발생 시 online: false로 변경된다', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    const { result } = renderHook(() => useNetworkState());

    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.online).toBe(false);
  });

  it('online 이벤트 발생 시 online: true로 복원된다', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    const { result } = renderHook(() => useNetworkState());

    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current.online).toBe(false);

    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current.online).toBe(true);
  });

  it('언마운트 후에는 이벤트에 반응하지 않는다', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    const { result, unmount } = renderHook(() => useNetworkState());

    unmount();

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    // 언마운트 후에는 상태 업데이트가 없으므로 마지막 값 유지
    expect(result.current.online).toBe(true);
  });
});
