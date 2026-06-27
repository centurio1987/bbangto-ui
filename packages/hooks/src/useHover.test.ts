import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useHover } from './useHover';

describe('useHover', () => {
  it('초기 상태는 false다', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());
    const [, isHovered] = result.current;
    expect(isHovered).toBe(false);
  });

  it('pointerenter 이벤트에서 true, pointerleave에서 false로 바뀐다', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());

    const el = document.createElement('div');
    document.body.appendChild(el);

    act(() => {
      const [refCallback] = result.current;
      refCallback(el);
    });

    act(() => {
      el.dispatchEvent(new Event('pointerenter', { bubbles: true }));
    });
    expect(result.current[1]).toBe(true);

    act(() => {
      el.dispatchEvent(new Event('pointerleave', { bubbles: true }));
    });
    expect(result.current[1]).toBe(false);

    document.body.removeChild(el);
  });

  it('ref에 null을 전달하면 상태가 false로 초기화된다', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());

    const el = document.createElement('div');
    document.body.appendChild(el);

    act(() => {
      const [refCallback] = result.current;
      refCallback(el);
    });

    act(() => {
      el.dispatchEvent(new Event('pointerenter', { bubbles: true }));
    });
    expect(result.current[1]).toBe(true);

    act(() => {
      const [refCallback] = result.current;
      refCallback(null);
    });
    expect(result.current[1]).toBe(false);

    document.body.removeChild(el);
  });
});
