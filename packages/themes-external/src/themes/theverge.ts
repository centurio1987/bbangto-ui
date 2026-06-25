import type { BbangtoTheme } from '@centurio1987/tokens'

export const thevergeTheme: BbangtoTheme = {
  name: 'theverge',
  description: 'The Verge brand theme — stub (auto-generated)',

  palette: {
    common: { white: '#ffffff', black: '#000000' },
    neutral: {
      0: '#000000',
      10: '#111111',
      20: '#222222',
      30: '#333333',
      40: '#444444',
      50: '#555555',
      60: '#666666',
      70: '#777777',
      80: '#888888',
      90: '#EEEEEE',
      95: '#F5F5F5',
      99: '#FAFAFA',
      100: '#ffffff',
    },
    coolNeutral: {},
    blue: {},
    red: {},
    green: {},
    orange: {},
  },

  semantic: {
    background: {
      base: '#ffffff',
      elevated: '#FAFAFA',
      sunken: '#F5F5F5',
      overlay: 'rgba(0,0,0,0.5)',
    },
    foreground: {
      base: '#111111',
      muted: '#555555',
      subtle: '#888888',
      inverse: '#ffffff',
    },
    border: {
      base: '#DDDDDD',
      muted: '#EEEEEE',
      strong: '#888888',
      focus: '#FA2C2C',
    },
    primary: {
      base: '#FA2C2C',
      hover: '#FA2C2C',
      active: '#FA2C2C',
      subtle: '#FA2C2C22',
      foreground: '#ffffff',
    },
    error: {
      base: '#DC2626',
      hover: '#B91C1C',
      active: '#991B1B',
      subtle: '#FEE2E2',
      foreground: '#ffffff',
    },
    success: {
      base: '#16A34A',
      hover: '#15803D',
      active: '#166534',
      subtle: '#DCFCE7',
      foreground: '#ffffff',
    },
    warning: {
      base: '#D97706',
      hover: '#B45309',
      active: '#92400E',
      subtle: '#FEF3C7',
      foreground: '#111111',
    },
    disabled: {
      background: '#F5F5F5',
      foreground: '#AAAAAA',
      border: '#DDDDDD',
    },
    category: {
      planning: '#16A34A',
      architecture: '#FA2C2C',
      strategy: '#DC2626',
      tech: '#0891B2',
      design: '#7C3AED',
      research: '#D97706',
      quality: '#4D7C0F',
      leadership: '#C2410C',
    },
  },

  typography: {
    fontFamily: {
      sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
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
    0: '0px', 1: '1px', 2: '2px', 3: '3px', 4: '4px',
    5: '5px', 6: '6px', 8: '8px', 10: '10px', 12: '12px',
    16: '16px', 20: '20px', 24: '24px', 32: '32px', 40: '40px',
    48: '48px', 64: '64px',
  },

  radius: {
    none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px',
  },

  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 8px rgba(0,0,0,0.08)',
    lg: '0 8px 16px rgba(0,0,0,0.12)',
    xl: '0 16px 32px rgba(0,0,0,0.16)',
  },

  motion: {
    duration: {
      instant: '0ms', fast: '150ms', normal: '200ms', slow: '300ms',
    },
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
    dropdown: 1000, sticky: 1100, overlay: 1200,
    modal: 1300, popover: 1400, toast: 1500,
  },
}
