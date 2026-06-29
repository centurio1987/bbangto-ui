import type { BbangtoFoundation } from '@centurio1987/bbangto-ui-tokens';
import { lightTheme } from './light';

export const highContrastTheme: BbangtoFoundation = {
  ...lightTheme,
  name: 'high-contrast',
  description: 'Serious Work, Joyful Wit - High Contrast',

  semantic: {
    background: {
      base: '#000000',
      elevated: '#000000',
      sunken: '#000000',
      overlay: 'rgba(0, 0, 0, 0.9)',
    },
    foreground: {
      base: '#ffffff',
      muted: '#ffffff',
      subtle: '#ffffff',
      inverse: '#000000',
    },
    border: {
      base: '#ffffff',
      muted: '#ffffff',
      strong: '#ffffff',
      focus: '#00ffff',
    },
    primary: {
      base: '#ffff00',
      hover: '#ffff00',
      active: '#ffff00',
      subtle: '#000000',
      foreground: '#000000',
    },
    error: {
      base: '#ff0000',
      hover: '#ff0000',
      active: '#ff0000',
      subtle: '#000000',
      foreground: '#ffffff',
    },
    success: {
      base: '#00ff00',
      hover: '#00ff00',
      active: '#00ff00',
      subtle: '#000000',
      foreground: '#000000',
    },
    warning: {
      base: '#ff8800',
      hover: '#ff8800',
      active: '#ff8800',
      subtle: '#000000',
      foreground: '#000000',
    },
    disabled: {
      background: '#000000',
      foreground: '#888888',
      border: '#888888',
    },
    category: {
      planning: '#00ff00',
      architecture: '#00ffff',
      strategy: '#ff0000',
      tech: '#00ffff',
      design: '#ff00ff',
      research: '#ff8800',
      quality: '#ffff00',
      leadership: '#ff0000',
    },
  },
};
