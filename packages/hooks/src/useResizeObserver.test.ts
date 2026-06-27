import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRef } from 'react';
import { useResizeObserver } from './useResizeObserver';

type ResizeCallback = (entries: ResizeObserverEntry[]) => void;

function makeResizeObserverMock() {
  let capturedCallback: ResizeCallback | null = null;
  let observedElement: Element | null = null;

  const MockResizeObserver = vi.fn(function (callback: ResizeCallback) {
    capturedCallback = callback;
    return {
      observe: vi.fn((el: Element) => {
        observedElement = el;
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
  });

  function triggerResize(width: number, height: number) {
    if (capturedCallback && observedElement) {
      capturedCallback([
        {
          target: observedElement,
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

  return { MockResizeObserver, triggerResize };
}

describe('useResizeObserver', () => {
  beforeEach(() => {
    const { MockResizeObserver } = makeResizeObserverMock();
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('초기값은 { width: 0, height: 0 } 이다', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useResizeObserver(ref);
    });

    expect(result.current).toEqual({ width: 0, height: 0 });
  });

  it('ResizeObserver 콜백이 호출되면 크기가 갱신된다', () => {
    let triggerFn: ((w: number, h: number) => void) | null = null;

    const { MockResizeObserver, triggerResize } = makeResizeObserverMock();
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
    triggerFn = triggerResize;

    const div = document.createElement('div');

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div as HTMLDivElement);
      return useResizeObserver(ref);
    });

    act(() => {
      triggerFn!(200, 100);
    });

    expect(result.current.width).toBe(200);
    expect(result.current.height).toBe(100);
  });
});
