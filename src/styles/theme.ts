'use client';

import { type MantineColorScheme, createTheme } from '@mantine/core';

export const colorScheme: MantineColorScheme = 'auto';

export const theme = createTheme({
  colors: {
    white: [
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#E6E6E6',
      '#CFCFCF',
      '#B8B8B8',
    ],
  },
  fontFamily: `var(--font-open-sans),-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Segoe UI,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji`,
});
