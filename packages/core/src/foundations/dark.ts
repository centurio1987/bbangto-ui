import type { BbangtoFoundation } from '@centurio1987/bbangto-ui-tokens';
import { lightFoundation } from './light';

export const darkFoundation: BbangtoFoundation = {
  ...lightFoundation,
  name: 'dark',
  description: 'Serious Work, Joyful Wit - Dark Mode',

  semantic: {
    background: {
      base: '#1C1B18',
      elevated: '#2a2824',
      sunken: '#000000',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    foreground: {
      base: '#ECE9E1',
      muted: '#D8D4C8',
      subtle: '#8A857A',
      inverse: '#1C1B18',
    },
    border: {
      base: '#6B665C',
      muted: '#8A857A',
      strong: '#D8D4C8',
      focus: '#68a4ff',
    },
    primary: {
      base: '#68a4ff',
      hover: '#9ec4ff',
      active: '#3384ff',
      subtle: '#27406E',
      foreground: '#1C1B18',
    },
    error: {
      base: '#ff8c8c',
      hover: '#ffb5b5',
      active: '#ff6363',
      subtle: '#A84B4B',
      foreground: '#1C1B18',
    },
    success: {
      base: '#49e57d',
      hover: '#7df5a5',
      active: '#1dd35a',
      subtle: '#3E6B4F',
      foreground: '#1C1B18',
    },
    warning: {
      base: '#ffc06d',
      hover: '#ffd39b',
      active: '#ffa838',
      subtle: '#8A6313',
      foreground: '#1C1B18',
    },
    disabled: {
      background: '#2a2824',
      foreground: '#6B665C',
      border: '#6B665C',
    },
    category: {
      planning: '#7df5a5',
      architecture: '#68a4ff',
      strategy: '#ff8c8c',
      tech: '#acfcc7',
      design: '#e9f1fe',
      research: '#ffc06d',
      quality: '#fee5c6',
      leadership: '#ffb5b5',
    },
  },
};
