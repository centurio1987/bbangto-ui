import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGeolocation } from './useGeolocation';

describe('useGeolocation', () => {
  let successCallback: ((position: GeolocationPosition) => void) | null = null;
  let errorCallback: ((err: GeolocationPositionError) => void) | null = null;
  let watchId = 1;

  const mockWatchPosition = vi.fn(
    (
      success: (position: GeolocationPosition) => void,
      error: (err: GeolocationPositionError) => void,
    ) => {
      successCallback = success;
      errorCallback = error;
      return watchId;
    },
  );
  const mockClearWatch = vi.fn();

  beforeEach(() => {
    successCallback = null;
    errorCallback = null;
    mockWatchPosition.mockClear();
    mockClearWatch.mockClear();

    vi.stubGlobal('navigator', {
      geolocation: {
        watchPosition: mockWatchPosition,
        clearWatch: mockClearWatch,
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('초기 상태: loading: true, 위치값 null', () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.loading).toBe(true);
    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('위치 취득 성공 시 latitude/longitude를 업데이트하고 loading: false', () => {
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      successCallback!({
        coords: {
          latitude: 37.5665,
          longitude: 126.978,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      } as GeolocationPosition);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.latitude).toBe(37.5665);
    expect(result.current.longitude).toBe(126.978);
    expect(result.current.error).toBeNull();
  });

  it('위치 취득 실패 시 error 메시지를 반환하고 loading: false', () => {
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      errorCallback!({
        code: 1,
        message: 'User denied Geolocation',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.error).toBe('User denied Geolocation');
  });

  it('언마운트 시 clearWatch를 호출한다', () => {
    const { unmount } = renderHook(() => useGeolocation());
    unmount();
    expect(mockClearWatch).toHaveBeenCalledWith(watchId);
  });

  it('geolocation 미지원 환경에서 error 상태를 반환한다', () => {
    vi.stubGlobal('navigator', {});
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Geolocation is not supported');
  });
});
