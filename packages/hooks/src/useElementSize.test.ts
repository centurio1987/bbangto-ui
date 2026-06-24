import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useElementSize } from './useElementSize';

type ResizeCallback = (entries: ResizeObserverEntry[]) => void;

function makeResizeObserverMock() {
  let capturedCallback: ResizeCallback | null = null;
  let capturedObserver: {
    observe: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  } | null = null;

  const MockResizeObserver = vi.fn(function (callback: ResizeCallback) {
    capturedCallback = callback;
    const instance = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
    capturedObserver = instance;
    return instance;
  });

  function triggerResize(el: Element, width: number, height: number) {
    if (capturedCallback) {
      capturedCallback([
        {
          target: el,
          contentRect: {
            width,
            height,
            top: 0,
            left: 0,
            bottom: height,
            right: width,
            x: 0,
            y: 0,
            toJSON: () => ({}),
          },
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        } as unknown as ResizeObserverEntry,
      ]);
    }
  }

  return { MockResizeObserver, triggerResize, getCapturedObserver: () => capturedObserver };
}

describe('useElementSize', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('초기값은 { width: 0, height: 0 } 이다', () => {
    const { MockResizeObserver } = makeResizeObserverMock();
    vi.stubGlobal('ResizeObserver', MockResizeObserver);

    const { result } = renderHook(() => useElementSize<HTMLDivElement>());
    const [, size] = result.current;

    expect(size).toEqual({ width: 0, height: 0 });
  });

  it('ref 콜백에 노드를 전달하면 ResizeObserver 가 등록되고 크기가 갱신된다', () => {
    const { MockResizeObserver, triggerResize } = makeResizeObserverMock();
    vi.stubGlobal('ResizeObserver', MockResizeObserver);

    const { result } = renderHook(() => useElementSize<HTMLDivElement>());

    const div = document.createElement('div');

    act(() => {
      result.current[0](div);
    });

    expect(MockResizeObserver).toHaveBeenCalledTimes(1);

    act(() => {
      triggerResize(div, 300, 150);
    });

    expect(result.current[1].width).toBe(300);
    expect(result.current[1].height).toBe(150);
  });

  it('null 을 전달하면 observer 가 disconnect 된다', () => {
    const { MockResizeObserver, getCapturedObserver } = makeResizeObserverMock();
    vi.stubGlobal('ResizeObserver', MockResizeObserver);

    const { result } = renderHook(() => useElementSize<HTMLDivElement>());
    const div = document.createElement('div');

    act(() => {
      result.current[0](div);
    });

    const observer = getCapturedObserver();
    expect(observer).not.toBeNull();

    act(() => {
      result.current[0](null);
    });

    expect(observer!.disconnect).toHaveBeenCalledTimes(1);
  });
});
