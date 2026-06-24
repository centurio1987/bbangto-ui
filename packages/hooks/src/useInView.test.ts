import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useInView } from './useInView';

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

let capturedCallback: IntersectionCallback | null = null;

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
  constructor(callback: IntersectionCallback) {
    capturedCallback = callback;
  }
  observe = mockObserve;
  disconnect = mockDisconnect;
  unobserve = vi.fn();
}

beforeEach(() => {
  capturedCallback = null;
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useInView', () => {
  it('초기값은 false다', () => {
    const { result } = renderHook(() => useInView<HTMLDivElement>());
    const [, inView] = result.current;
    expect(inView).toBe(false);
  });

  it('요소를 ref에 연결하면 observer가 등록되고, 콜백 호출 시 inView가 갱신된다', () => {
    const { result } = renderHook(() => useInView<HTMLDivElement>());
    const [ref] = result.current;

    const fakeNode = document.createElement('div') as HTMLDivElement;

    act(() => {
      ref(fakeNode);
    });

    expect(mockObserve).toHaveBeenCalledWith(fakeNode);

    act(() => {
      capturedCallback!([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    const [, inView] = result.current;
    expect(inView).toBe(true);
  });

  it('ref에 null을 전달하면 observer가 disconnect된다', () => {
    const { result } = renderHook(() => useInView<HTMLDivElement>());
    const [ref] = result.current;

    const fakeNode = document.createElement('div') as HTMLDivElement;

    act(() => {
      ref(fakeNode);
    });

    act(() => {
      ref(null);
    });

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
