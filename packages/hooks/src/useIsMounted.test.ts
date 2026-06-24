import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useIsMounted } from './useIsMounted';

describe('useIsMounted', () => {
  it('마운트 직후 true를 반환한다', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current()).toBe(true);
  });

  it('언마운트 후에는 false를 반환한다', () => {
    const { result, unmount } = renderHook(() => useIsMounted());
    const isMounted = result.current; // 언마운트 전에 getter 캡처
    unmount();
    expect(isMounted()).toBe(false);
  });

  it('getter 참조는 리렌더 간 안정적이다', () => {
    const { result, rerender } = renderHook(() => useIsMounted());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
