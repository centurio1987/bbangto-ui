import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '@centurio87/core';
import { lightTheme } from '@centurio87/theme-light';
import { darkTheme } from '@centurio87/theme-dark';
import { highContrastTheme } from '@centurio87/theme-high-contrast';
import { amberDarkTheme, amberLightTheme } from '@centurio87/theme-amber';
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