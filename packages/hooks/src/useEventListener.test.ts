import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useEventListener } from './useEventListener';

describe('useEventListener', () => {
  it('window에 이벤트 리스너를 등록하고 이벤트를 수신한다', () => {
    const handler = vi.fn();
    renderHook(() => useEventListener('click', handler));

    const event = new MouseEvent('click');
    window.dispatchEvent(event);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(event);
  });

  it('특정 HTMLElement에 이벤트 리스너를 등록한다', () => {
    const handler = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    renderHook(() => useEventListener('click', handler, div));

    const event = new MouseEvent('click', { bubbles: true });
    div.dispatchEvent(event);

    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(div);
  });

  it('언마운트 시 이벤트 리스너를 해제한다', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useEventListener('click', handler));

    unmount();

    window.dispatchEvent(new MouseEvent('click'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('element가 null이면 리스너를 등록하지 않는다', () => {
    const handler = vi.fn();
    renderHook(() => useEventListener('click', handler, null));

    window.dispatchEvent(new MouseEvent('click'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('핸들러가 바뀌어도 이벤트 리스너를 재등록하지 않고 최신 핸들러를 호출한다', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const { rerender } = renderHook(
      ({ h }) => useEventListener('click', h),
      { initialProps: { h: handler1 } },
    );

    rerender({ h: handler2 });

    window.dispatchEvent(new MouseEvent('click'));

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
