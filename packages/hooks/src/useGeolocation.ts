import { useEffect, useRef, useState } from 'react';

export interface GeolocationState {
  loading: boolean;
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

/**
 * Geolocation API를 통해 현재 위치를 구독하고 상태를 반환한다.
 *
 * SSR 환경 또는 navigator.geolocation 미지원 환경에서는
 * `{ loading: false, latitude: null, longitude: null, error: '...' }`를 반환한다.
 *
 * @param options `PositionOptions` — enableHighAccuracy, timeout, maximumAge
 * @returns `GeolocationState` 현재 위치 상태
 *
 * @example
 * const { loading, latitude, longitude, error } = useGeolocation();
 */
export function useGeolocation(options?: PositionOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    latitude: null,
    longitude: null,
    error: null,
  });

  // options를 ref로 캡처해 stale closure 방지
  const optionsRef = useRef<PositionOptions | undefined>(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState({
        loading: false,
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported',
      });
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const onError = (err: GeolocationPositionError) => {
      setState({
        loading: false,
        latitude: null,
        longitude: null,
        error: err.message,
      });
    };

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, optionsRef.current);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}
