import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '@bbangto-ui/core';
import { lightTheme } from '@bbangto-ui/theme-light';
import { darkTheme } from '@bbangto-ui/theme-dark';
import { highContrastTheme } from '@bbangto-ui/theme-high-contrast';

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
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'high-contrast'],
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
      }
      
      // We set background color of the canvas explicitly to match the theme's base background
      const bgColor = theme.semantic.background.base;
      
      return (
        <ThemeProvider theme={theme} style={{ padding: '2rem', minHeight: '100vh', backgroundColor: bgColor, transition: 'background-color 0.3s ease' }}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;