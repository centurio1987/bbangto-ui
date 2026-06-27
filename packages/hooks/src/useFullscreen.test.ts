import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRef } from 'react';
import { useFullscreen } from './useFullscreen';

describe('useFullscreen', () => {
  let mockRequestFullscreen: ReturnType<typeof vi.fn>;
  let mockExitFullscreen: ReturnType<typeof vi.fn>;
  let fullscreenElement: Element | null = null;

  beforeEach(() => {
    fullscreenElement = null;
    mockRequestFullscreen = vi.fn().mockResolvedValue(undefined);
    mockExitFullscreen = vi.fn().mockImplementation(async () => {
      fullscreenElement = null;
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => fullscreenElement,
    });

    Object.defineProperty(document, 'exitFullscreen', {
      configurable: true,
      writable: true,
      value: mockExitFullscreen,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function renderWithRef() {
    return renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      // ref.current를 모킹된 요소로 설정
      (ref as React.MutableRefObject<HTMLDivElement | null>).current =
        Object.assign(document.createElement('div'), {
          requestFullscreen: mockRequestFullscreen,
        });
      return useFullscreen(ref);
    });
  }

  it('초기 상태: isFullscreen: false', () => {
    const { result } = renderWithRef();
    expect(result.current.isFullscreen).toBe(false);
  });

  it('enter() 호출 시 requestFullscreen을 호출한다', async () => {
    const { result } = renderWithRef();

    await act(async () => {
      result.current.enter();
    });

    expect(mockRequestFullscreen).toHaveBeenCalledTimes(1);
  });

  it('fullscreenchange 이벤트 수신 시 isFullscreen이 true로 변경된다', () => {
    const { result } = renderWithRef();

    act(() => {
      fullscreenElement = document.body;
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    expect(result.current.isFullscreen).toBe(true);
  });

  it('exit() 호출 시 exitFullscreen을 호출한다', async () => {
    const { result } = renderWithRef();

    // 먼저 풀스크린 상태로 진입
    act(() => {
      fullscreenElement = document.body;
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    expect(result.current.isFullscreen).toBe(true);

    await act(async () => {
      result.current.exit();
    });

    expect(mockExitFullscreen).toHaveBeenCalledTimes(1);
    expect(result.current.isFullscreen).toBe(false);
  });

  it('toggle(): 풀스크린 아닐 때 enter, 풀스크린일 때 exit을 호출한다', async () => {
    const { result } = renderWithRef();

    // 비풀스크린 → enter
    await act(async () => {
      result.current.toggle();
    });
    expect(mockRequestFullscreen).toHaveBeenCalledTimes(1);

    // 풀스크린 상태로 변경
    act(() => {
      fullscreenElement = document.body;
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    // 풀스크린 → exit
    await act(async () => {
      result.current.toggle();
    });
    expect(mockExitFullscreen).toHaveBeenCalledTimes(1);
  });

  it('언마운트 후 fullscreenchange 이벤트에 반응하지 않는다', () => {
    const { result, unmount } = renderWithRef();

    unmount();

    act(() => {
      fullscreenElement = document.body;
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    // 언마운트 후 상태 업데이트 없음
    expect(result.current.isFullscreen).toBe(false);
  });
});
