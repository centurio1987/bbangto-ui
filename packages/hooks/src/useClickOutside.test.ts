import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  it('ref 객체를 반환한다', () => {
    const handler = vi.fn();
    const { result } = renderHook(() =>
      useClickOutside<HTMLDivElement>(handler),
    );
    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe('object');
  });

  it('엘리먼트 바깥 mousedown 시 handler가 호출된다', () => {
    const handler = vi.fn();
    const { result } = renderHook(() =>
      useClickOutside<HTMLDivElement>(handler),
    );

    const inside = document.createElement('div');
    const outside = document.createElement('div');
    document.body.appendChild(inside);
    document.body.appendChild(outside);

    // ref에 inside 엘리먼트 연결
    Object.defineProperty(result.current, 'current', {
      value: inside,
      writable: true,
    });

    act(() => {
      const event = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(event, 'target', { value: outside });
      document.dispatchEvent(event);
    });

    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(inside);
    document.body.removeChild(outside);
  });

  it('엘리먼트 내부 mousedown 시 handler가 호출되지 않는다', () => {
    const handler = vi.fn();
    const { result } = renderHook(() =>
      useClickOutside<HTMLDivElement>(handler),
    );

    const container = document.createElement('div');
    const child = document.createElement('button');
    container.appendChild(child);
    document.body.appendChild(container);

    Object.defineProperty(result.current, 'current', {
      value: container,
      writable: true,
    });

    act(() => {
      const event = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(event, 'target', { value: child });
      document.dispatchEvent(event);
    });

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });
});
