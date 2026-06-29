import type { BbangtoFoundation } from '@centurio1987/bbangto-ui-tokens';

export const lightFoundation: BbangtoFoundation = {
  name: 'light',
  description: 'Serious Work, Joyful Wit (빵관 토니)',

  palette: {
    common: {
      white: '#ffffff',
      black: '#000000',
    },
    neutral: {
      0: '#000000',
      10: '#1C1B18',
      20: '#6B665C',
      30: '#8A857A',
      80: '#D8D4C8',
      90: '#E2DED2',
      95: '#ECE9E1',
      99: '#F7F5EF',
      100: '#ffffff',
    },
    coolNeutral: {},
    blue: {
      40: '#27406E',
      60: '#4E6CA8',
    },
    red: {
      60: '#A84B4B',
    },
    green: {
      60: '#3E6B4F',
    },
    orange: {
      40: '#8A6313',
      50: '#B07A2E',
      60: '#D8A33F',
      90: '#F0DCA8',
    },
  },

  semantic: {
    background: {
      base: '#ECE9E1',
      elevated: '#F7F5EF',
      sunken: '#E2DED2',
      overlay: 'rgba(28, 27, 24, 0.5)',
    },
    foreground: {
      base: '#1C1B18',
      muted: '#6B665C',
      subtle: '#8A857A',
      inverse: '#F7F5EF',
    },
    border: {
      base: '#D8D4C8',
      muted: '#E2DED2',
      strong: '#8A857A',
      focus: '#4E6CA8',
    },
    primary: {
      base: '#4E6CA8',
      hover: '#3a5382',
      active: '#27406E',
      subtle: '#c3d1ec',
      foreground: '#ffffff',
    },
    error: {
      base: '#A84B4B',
      hover: '#8c3c3c',
      active: '#6e2b2b',
      subtle: '#f2d3d3',
      foreground: '#ffffff',
    },
    success: {
      base: '#3E6B4F',
      hover: '#2d523a',
      active: '#1f3b28',
      subtle: '#cce6d6',
      foreground: '#ffffff',
    },
    warning: {
      base: '#D8A33F',
      hover: '#b58630',
      active: '#8A6313',
      subtle: '#F0DCA8',
      foreground: '#1C1B18',
    },
    disabled: {
      background: '#E2DED2',
      foreground: '#8A857A',
      border: '#D8D4C8',
    },
    category: {
      planning: '#3E6B4F',
      architecture: '#4E6CA8',
      strategy: '#A84B4B',
      tech: '#3E6B6B',
      design: '#7A5C7E',
      research: '#B07A2E',
      quality: '#6B6B3E',
      leadership: '#B5602E',
    },
  },

  typography: {
    fontFamily: {
      sans: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
    },
    scale: {
      display: { fontSize: '44px', lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 800 },
      h1: { fontSize: '34px', lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: 700 },
      h2: { fontSize: '26px', lineHeight: '1.35', letterSpacing: '-0.015em', fontWeight: 700 },
      h3: { fontSize: '20px', lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: 700 },
      body: { fontSize: '18px', lineHeight: '1.75', letterSpacing: '0', fontWeight: 400 },
      meta: { fontSize: '13px', lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: 500 },
    },
  },

  spacing: {
    0: '0px', 1: '1px', 2: '2px', 3: '3px', 4: '4px', 5: '5px', 6: '6px',
    8: '8px', 10: '10px', 12: '12px', 16: '16px', 20: '20px', 24: '24px',
    32: '32px', 40: '40px', 48: '48px', 64: '64px',
  },

  radius: {
    none: '0px', sm: '8px', md: '12px', lg: '16px', xl: '24px', full: '9999px',
  },

  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(28, 27, 24, 0.05)',
    md: '0 4px 8px rgba(28, 27, 24, 0.08)',
    lg: '0 8px 16px rgba(28, 27, 24, 0.12)',
    xl: '0 16px 32px rgba(28, 27, 24, 0.16)',
  },

  motion: {
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
  },

  zIndex: {
    dropdown: 1000, sticky: 1100, overlay: 1200, modal: 1300, popover: 1400, toast: 1500,
  },
};
