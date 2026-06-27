import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFocus } from './useFocus';

describe('useFocus', () => {
  it('초기 상태는 false다', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    const [, isFocused] = result.current;
    expect(isFocused).toBe(false);
  });

  it('focus 이벤트에서 true, blur 이벤트에서 false로 바뀐다', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());

    const el = document.createElement('input');
    document.body.appendChild(el);

    act(() => {
      const [refCallback] = result.current;
      refCallback(el);
    });

    act(() => {
      el.dispatchEvent(new Event('focus', { bubbles: false }));
    });
    expect(result.current[1]).toBe(true);

    act(() => {
      el.dispatchEvent(new Event('blur', { bubbles: false }));
    });
    expect(result.current[1]).toBe(false);

    document.body.removeChild(el);
  });

  it('ref에 null을 전달하면 상태가 false로 초기화된다', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());

    const el = document.createElement('input');
    document.body.appendChild(el);

    act(() => {
      const [refCallback] = result.current;
      refCallback(el);
    });

    act(() => {
      el.dispatchEvent(new Event('focus', { bubbles: false }));
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
