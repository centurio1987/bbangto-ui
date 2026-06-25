// @centurio1987/hooks — headless React hooks for bbangto-ui
//
// 21st.dev "Hooks (31)" 카테고리의 대응 계층. 각 훅은 JSX를 반환하지 않는
// 순수 로직이며 zero runtime dependency를 유지한다 (react peer만 허용).
//
// 신규 훅 추가 시: src/<useName>.ts 작성 → 아래에 re-export → vitest 단위 테스트.
// 오서링 템플릿: /_templates/hook.template.ts

export * from './useIsMounted';
export * from './useToggle';
export * from './usePrevious';
export * from './useDebounce';
// Wave 3a — viewport
export * from './useMediaQuery';
export * from './useWindowSize';
export * from './useResizeObserver';
export * from './useElementSize';
// Wave 3a — scroll
export * from './useInView';
export * from './useScrollProgress';
export * from './useScroll';
export * from './useMousePosition';
// Wave 3a — interaction
export * from './useHover';
export * from './useClickOutside';
export * from './useKeyPress';
export * from './useFocus';
// Wave 3a — utility
export * from './useLocalStorage';
export * from './useCopyToClipboard';
export * from './useThrottle';
export * from './useEventListener';
// Wave 3c — timer/storage
export * from './useSessionStorage';
export * from './useInterval';
export * from './useTimeout';
// Wave 3c — media/visibility
export * from './useDarkMode';
export * from './usePageVisibility';
export * from './useOrientation';
// Wave 3c — device/activity
export * from './useNetworkState';
export * from './useGeolocation';
export * from './useIdle';
export * from './useFullscreen';
