import type { BbangtoFoundation } from '@centurio1987/bbangto-ui-tokens';

const baseAmberPalette = {
  common: { white: '#ffffff', black: '#000000' },
  neutral: {
    0: '#000000', 10: '#0b0e11', 20: '#181a20', 30: '#1e2329', 40: '#2b3139',
    50: '#707a8a', 60: '#929aa5', 70: '#cdd1d6', 80: '#eaecef',
    90: '#f5f5f5', 95: '#fafafa', 99: '#ffffff', 100: '#ffffff',
  },
  coolNeutral: {},
  blue: { 60: '#3b82f6' },
  red: { 60: '#f6465d' },
  green: { 60: '#0ecb81' },
  orange: { 40: '#3a3a1f', 50: '#f0b90b', 60: '#fcd535' },
};

const baseTypography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'JetBrains Mono, Courier New, monospace',
  },
  scale: {
    display: { fontSize: '64px', lineHeight: '1.1', letterSpacing: '-1px', fontWeight: 700 },
    h1: { fontSize: '48px', lineHeight: '1.1', letterSpacing: '-0.5px', fontWeight: 700 },
    h2: { fontSize: '40px', lineHeight: '1.15', letterSpacing: '-0.3px', fontWeight: 600 },
    h3: { fontSize: '32px', lineHeight: '1.2', letterSpacing: '0', fontWeight: 600 },
    body: { fontSize: '14px', lineHeight: '1.5', letterSpacing: '0', fontWeight: 400 },
    meta: { fontSize: '12px', lineHeight: '1.4', letterSpacing: '0', fontWeight: 500 },
  },
};

const baseSpacing = {
  0: '0px', 1: '1px', 2: '2px', 3: '3px', 4: '4px', 5: '5px', 6: '6px',
  8: '8px', 10: '10px', 12: '12px', 16: '16px', 20: '20px', 24: '24px',
  32: '32px', 40: '40px', 48: '48px', 64: '64px', 80: '80px',
};

const baseRadius = { none: '0px', sm: '4px', md: '6px', lg: '8px', xl: '12px', full: '9999px' };

const baseShadow = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 8px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.12)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.16)',
};

const baseMotion = {
  duration: { instant: '0ms', fast: '150ms', normal: '200ms', slow: '300ms' },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  distance: { sm: '4px', md: '8px', lg: '16px' },
  preset: {
    spin: 'bbangto-spin 1s linear infinite',
    pulse: 'bbangto-pulse 1.5s ease-in-out infinite',
    wave: 'bbangto-wave 1.2s ease-in-out infinite',
    bars: 'bbangto-bars 1s ease-in-out infinite',
    ring: 'bbangto-ring 1.4s ease-in-out infinite',
    shimmer: 'bbangto-shimmer 1.6s ease-in-out infinite',
    animatedGradient: 'bbangto-animated-gradient 8s ease-in-out infinite',
    gridDrift: 'bbangto-grid-drift 12s linear infinite',
    gradientText: 'bbangto-gradient-text 4s ease-in-out infinite',
    splitReveal: 'bbangto-split-reveal 300ms cubic-bezier(0, 0, 0.2, 1) both',
    marquee: 'bbangto-marquee 12s linear infinite',
    borderBeam: 'bbangto-border-beam 3s linear infinite',
    glow: 'bbangto-glow 2.4s ease-in-out infinite',
    attentionShake: 'bbangto-attention-shake 480ms cubic-bezier(0.4, 0, 0.2, 1) both',
    attentionBounce: 'bbangto-attention-bounce 620ms cubic-bezier(0.4, 0, 0.2, 1) both',
  },
};

const baseZIndex = { dropdown: 1000, sticky: 1100, overlay: 1200, modal: 1300, popover: 1400, toast: 1500 };

export const amberDarkTheme: BbangtoFoundation = {
  name: 'amber-dark',
  description: 'Amber Default Dark Theme',
  palette: baseAmberPalette,
  semantic: {
    background: {
      base: '#0b0e11', elevated: '#1e2329', sunken: '#2b3139', overlay: 'rgba(11, 14, 17, 0.8)',
    },
    foreground: {
      base: '#ffffff', muted: '#eaecef', subtle: '#707a8a', inverse: '#181a20',
    },
    border: {
      base: '#2b3139', muted: '#2b3139', strong: '#cdd1d6', focus: '#3b82f6',
    },
    primary: {
      base: '#fcd535', hover: '#f0b90b', active: '#f0b90b', subtle: '#3a3a1f', foreground: '#181a20',
    },
    error: {
      base: '#f6465d', hover: '#dc3545', active: '#c82333', subtle: '#4a2529', foreground: '#ffffff',
    },
    success: {
      base: '#0ecb81', hover: '#0ca86a', active: '#0a8a56', subtle: '#18382d', foreground: '#ffffff',
    },
    warning: {
      base: '#fcd535', hover: '#f0b90b', active: '#f0b90b', subtle: '#3a3a1f', foreground: '#181a20',
    },
    disabled: { background: '#1e2329', foreground: '#707a8a', border: '#cdd1d6' },
    category: {
      planning: '#0ecb81', architecture: '#fcd535', strategy: '#f6465d',
      tech: '#2dbdb6', design: '#3b82f6', research: '#929aa5', quality: '#707a8a', leadership: '#ffffff',
    },
  },
  typography: baseTypography,
  spacing: baseSpacing as any,
  radius: baseRadius,
  shadow: baseShadow,
  motion: baseMotion,
  zIndex: baseZIndex,
};

export const amberLightTheme: BbangtoFoundation = {
  name: 'amber-light',
  description: 'Amber Transactional Light Theme',
  palette: baseAmberPalette,
  semantic: {
    background: {
      base: '#ffffff', elevated: '#f5f5f5', sunken: '#fafafa', overlay: 'rgba(255, 255, 255, 0.8)',
    },
    foreground: {
      base: '#181a20', muted: '#181a20', subtle: '#707a8a', inverse: '#ffffff',
    },
    border: {
      base: '#eaecef', muted: '#eaecef', strong: '#cdd1d6', focus: '#3b82f6',
    },
    primary: {
      base: '#fcd535', hover: '#f0b90b', active: '#f0b90b', subtle: '#fff8d6', foreground: '#181a20',
    },
    error: {
      base: '#f6465d', hover: '#dc3545', active: '#c82333', subtle: '#ffeef0', foreground: '#ffffff',
    },
    success: {
      base: '#0ecb81', hover: '#0ca86a', active: '#0a8a56', subtle: '#e6faf1', foreground: '#ffffff',
    },
    warning: {
      base: '#fcd535', hover: '#f0b90b', active: '#f0b90b', subtle: '#fff8d6', foreground: '#181a20',
    },
    disabled: { background: '#fafafa', foreground: '#929aa5', border: '#eaecef' },
    category: {
      planning: '#0ecb81', architecture: '#fcd535', strategy: '#f6465d',
      tech: '#2dbdb6', design: '#3b82f6', research: '#929aa5', quality: '#707a8a', leadership: '#181a20',
    },
  },
  typography: baseTypography,
  spacing: baseSpacing as any,
  radius: baseRadius,
  shadow: baseShadow,
  motion: baseMotion,
  zIndex: baseZIndex,
};
