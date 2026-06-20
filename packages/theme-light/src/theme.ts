import type { BbangtoTheme } from '@bbangto-ui/tokens';

/**
 * Light theme for Bbangto UI (Design Concept: "Serious Work, Joyful Wit")
 */
export const lightTheme: BbangtoTheme = {
  name: 'light',
  description: 'Serious Work, Joyful Wit (빵관 토니)',

  palette: {
    common: {
      white: '#ffffff',
      black: '#000000',
    },
    neutral: {
      0: '#000000',
      10: '#1C1B18', // ink
      20: '#6B665C', // ink-2
      30: '#8A857A', // ink-3
      80: '#D8D4C8', // border
      90: '#E2DED2', // subtle
      95: '#ECE9E1', // paper
      99: '#F7F5EF', // surface
      100: '#ffffff',
    },
    coolNeutral: {}, // Unused in new concept
    blue: {
      40: '#27406E', // signature-ink
      60: '#4E6CA8', // signature
    },
    red: {
      60: '#A84B4B', // category: 전략
    },
    green: {
      60: '#3E6B4F', // category: 기획
    },
    orange: {
      40: '#8A6313', // pop-ink
      50: '#B07A2E', // category: 리서치
      60: '#D8A33F', // pop
      90: '#F0DCA8', // pop-tint
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
    0: '0px',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    5: '5px',
    6: '6px',
    8: '8px',
    10: '10px',
    12: '12px',
    16: '16px',
    20: '20px',
    24: '24px',
    32: '32px',
    40: '40px',
    48: '48px',
    64: '64px',
  },

  radius: {
    none: '0px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(28, 27, 24, 0.05)',
    md: '0 4px 8px rgba(28, 27, 24, 0.08)',
    lg: '0 8px 16px rgba(28, 27, 24, 0.12)',
    xl: '0 16px 32px rgba(28, 27, 24, 0.16)',
  },

  motion: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out equivalent roughly
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    toast: 1500,
  },
};
