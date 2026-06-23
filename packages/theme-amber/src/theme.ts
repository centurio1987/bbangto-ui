import type { BbangtoTheme } from '@centurio87/tokens';

const baseAmberPalette = {
  common: {
    white: '#ffffff',
    black: '#000000',
  },
  neutral: {
    0: '#000000',
    10: '#0b0e11', // canvas-dark
    20: '#181a20', // ink
    30: '#1e2329', // surface-card-dark
    40: '#2b3139', // surface-elevated-dark / hairline-on-dark
    50: '#707a8a', // muted
    60: '#929aa5', // muted-strong
    70: '#cdd1d6', // border-strong
    80: '#eaecef', // hairline-on-light / body
    90: '#f5f5f5', // surface-strong-light
    95: '#fafafa', // surface-soft-light
    99: '#ffffff', // canvas-light
    100: '#ffffff',
  },
  coolNeutral: {}, // Unused
  blue: {
    60: '#3b82f6', // info
  },
  red: {
    60: '#f6465d', // trading-down
  },
  green: {
    60: '#0ecb81', // trading-up
  },
  orange: {
    40: '#3a3a1f', // primary-disabled
    50: '#f0b90b', // primary-active
    60: '#fcd535', // primary
  },
};

const baseTypography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'JetBrains Mono, Courier New, monospace',
  },
  scale: {
    display: { fontSize: '64px', lineHeight: '1.1', letterSpacing: '-1px', fontWeight: 700 }, // hero-display
    h1: { fontSize: '48px', lineHeight: '1.1', letterSpacing: '-0.5px', fontWeight: 700 }, // display-lg
    h2: { fontSize: '40px', lineHeight: '1.15', letterSpacing: '-0.3px', fontWeight: 600 }, // display-md
    h3: { fontSize: '32px', lineHeight: '1.2', letterSpacing: '0', fontWeight: 600 }, // display-sm
    body: { fontSize: '14px', lineHeight: '1.5', letterSpacing: '0', fontWeight: 400 }, // body-md
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0', fontWeight: 500 }, // caption
  },
};

const baseSpacing = {
  0: '0px',
  1: '1px',
  2: '2px',
  3: '3px',
  4: '4px', // xxs
  5: '5px',
  6: '6px',
  8: '8px', // xs
  10: '10px',
  12: '12px', // sm
  16: '16px', // md
  20: '20px',
  24: '24px', // lg
  32: '32px', // xl
  40: '40px',
  48: '48px', // xxl
  64: '64px',
  80: '80px', // section
};

const baseRadius = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px', // pill & full
};

const baseShadow = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 8px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.12)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.16)',
};

const baseMotion = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

const baseZIndex = {
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
};

/**
 * Amber Dark Theme (Marketing/Product default)
 */
export const amberDarkTheme: BbangtoTheme = {
  name: 'amber-dark',
  description: 'Amber Default Dark Theme',
  palette: baseAmberPalette,
  semantic: {
    background: {
      base: '#0b0e11', // canvas-dark
      elevated: '#1e2329', // surface-card-dark
      sunken: '#2b3139', // surface-elevated-dark
      overlay: 'rgba(11, 14, 17, 0.8)',
    },
    foreground: {
      base: '#ffffff', // on-dark
      muted: '#eaecef', // body
      subtle: '#707a8a', // muted
      inverse: '#181a20', // on-primary
    },
    border: {
      base: '#2b3139', // hairline-on-dark
      muted: '#2b3139',
      strong: '#cdd1d6', // border-strong
      focus: '#3b82f6', // info-ring
    },
    primary: {
      base: '#fcd535', // primary
      hover: '#f0b90b', // primary-active
      active: '#f0b90b',
      subtle: '#3a3a1f', // primary-disabled
      foreground: '#181a20', // on-primary
    },
    error: {
      base: '#f6465d', // trading-down
      hover: '#dc3545',
      active: '#c82333',
      subtle: '#4a2529',
      foreground: '#ffffff',
    },
    success: {
      base: '#0ecb81', // trading-up
      hover: '#0ca86a',
      active: '#0a8a56',
      subtle: '#18382d',
      foreground: '#ffffff',
    },
    warning: {
      base: '#fcd535', // reuse primary
      hover: '#f0b90b',
      active: '#f0b90b',
      subtle: '#3a3a1f',
      foreground: '#181a20',
    },
    disabled: {
      background: '#1e2329', // surface-card-dark
      foreground: '#707a8a', // muted
      border: '#cdd1d6', // border-strong
    },
    category: {
      planning: '#0ecb81',
      architecture: '#fcd535',
      strategy: '#f6465d',
      tech: '#2dbdb6', // accent-turquoise
      design: '#3b82f6',
      research: '#929aa5',
      quality: '#707a8a',
      leadership: '#ffffff',
    },
  },
  typography: baseTypography,
  spacing: baseSpacing as any, // type hack if not matching exactly
  radius: baseRadius,
  shadow: baseShadow,
  motion: baseMotion,
  zIndex: baseZIndex,
};

/**
 * Amber Light Theme (Transactional)
 */
export const amberLightTheme: BbangtoTheme = {
  name: 'amber-light',
  description: 'Amber Transactional Light Theme',
  palette: baseAmberPalette,
  semantic: {
    background: {
      base: '#ffffff', // canvas-light
      elevated: '#f5f5f5', // surface-strong-light
      sunken: '#fafafa', // surface-soft-light
      overlay: 'rgba(255, 255, 255, 0.8)',
    },
    foreground: {
      base: '#181a20', // ink
      muted: '#181a20', // body-on-light (same as ink)
      subtle: '#707a8a', // muted
      inverse: '#ffffff', // on-dark equivalent
    },
    border: {
      base: '#eaecef', // hairline-on-light
      muted: '#eaecef',
      strong: '#cdd1d6',
      focus: '#3b82f6',
    },
    primary: {
      base: '#fcd535',
      hover: '#f0b90b',
      active: '#f0b90b',
      subtle: '#fff8d6', // a light yellow
      foreground: '#181a20',
    },
    error: {
      base: '#f6465d',
      hover: '#dc3545',
      active: '#c82333',
      subtle: '#ffeef0',
      foreground: '#ffffff',
    },
    success: {
      base: '#0ecb81',
      hover: '#0ca86a',
      active: '#0a8a56',
      subtle: '#e6faf1',
      foreground: '#ffffff',
    },
    warning: {
      base: '#fcd535',
      hover: '#f0b90b',
      active: '#f0b90b',
      subtle: '#fff8d6',
      foreground: '#181a20',
    },
    disabled: {
      background: '#fafafa',
      foreground: '#929aa5',
      border: '#eaecef',
    },
    category: {
      planning: '#0ecb81',
      architecture: '#fcd535',
      strategy: '#f6465d',
      tech: '#2dbdb6',
      design: '#3b82f6',
      research: '#929aa5',
      quality: '#707a8a',
      leadership: '#181a20',
    },
  },
  typography: baseTypography,
  spacing: baseSpacing as any,
  radius: baseRadius,
  shadow: baseShadow,
  motion: baseMotion,
  zIndex: baseZIndex,
};
