import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useKeyPress } from './useKeyPress';

describe('useKeyPress', () => {
  it('초기 상태는 false다', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));
    expect(result.current).toBe(false);
  });

  it('keydown 이벤트에서 true, keyup 이벤트에서 false로 바뀐다', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    });
    expect(result.current).toBe(false);
  });

  it('다른 키 이벤트는 상태를 바꾸지 않는다', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current).toBe(false);
  });

  it('targetKey가 변경되면 새 키를 감시한다', () => {
    const { result, rerender } = renderHook(
      ({ key }) => useKeyPress(key),
      { initialProps: { key: 'Enter' } },
    );

    rerender({ key: 'Escape' });

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    });
    expect(result.current).toBe(false);
  });
});
