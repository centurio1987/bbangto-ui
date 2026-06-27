import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '@centurio1987/core';
import { lightTheme } from '@centurio1987/theme-light';
import { darkTheme } from '@centurio1987/theme-dark';
import { highContrastTheme } from '@centurio1987/theme-high-contrast';
import { amberDarkTheme, amberLightTheme } from '@centurio1987/theme-amber';
import { DiagramProvider, blueprintTheme } from '@centurio1987/diagram';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      // 디자인 시스템 계층 순서대로 사이드바 정렬 (DESIGN_SYSTEM_GUIDE.md)
      storySort: {
        order: [
          'Overview',
          'Foundations',
          'Atoms',
          'Molecules',
          'Organisms',
          'Blocks',
          'Patterns',
          'Motion',
          'Hooks',
          '*',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'high-contrast', 'amber-dark', 'amber-light'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeName = context.globals.theme;
      let theme = lightTheme;
      if (themeName === 'dark') {
        theme = darkTheme;
      } else if (themeName === 'high-contrast') {
        theme = highContrastTheme;
      } else if (themeName === 'amber-dark') {
        theme = amberDarkTheme;
      } else if (themeName === 'amber-light') {
        theme = amberLightTheme;
      }

      const bgColor = theme.semantic.background.base;

      return (
        <ThemeProvider theme={theme} style={{ padding: '2rem', minHeight: '100vh', backgroundColor: bgColor, transition: 'background-color 0.3s ease' }}>
          <DiagramProvider theme={blueprintTheme}>
            <Story />
          </DiagramProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;