import '@mantine/core/styles.css';
import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppShell } from '@/components/layout/app-shell';
import Providers from '@/contexts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Google AI Studio',
    default: 'Google AI Studio',
  },
  description: 'Google AI Studio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
