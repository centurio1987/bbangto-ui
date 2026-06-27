import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMousePosition } from './useMousePosition';

describe('useMousePosition', () => {
  it('초기값은 { x: 0, y: 0 } 이다', () => {
    const { result } = renderHook(() => useMousePosition());
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('pointermove 이벤트 발생 시 위치가 갱신된다', () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      const event = new MouseEvent('pointermove', {
        clientX: 150,
        clientY: 300,
        bubbles: true,
      });
      window.dispatchEvent(event);
    });

    expect(result.current).toEqual({ x: 150, y: 300 });
  });

  it('여러 번 이동 시 마지막 위치를 반영한다', () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      window.dispatchEvent(new MouseEvent('pointermove', { clientX: 10, clientY: 20 }));
      window.dispatchEvent(new MouseEvent('pointermove', { clientX: 50, clientY: 80 }));
    });

    expect(result.current).toEqual({ x: 50, y: 80 });
  });
});
