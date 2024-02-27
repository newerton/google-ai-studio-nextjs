import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import { theme } from '@/styles/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorSchemeScript
        nonce="8IBTHwOdqNKAWeKl7plt8g=="
        defaultColorScheme="auto"
        localStorageKey="@googleai/theme"
      />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </>
  );
}
