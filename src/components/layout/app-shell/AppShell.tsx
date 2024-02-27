'use client';

import {
  AppShell as AppShellMantine,
  Avatar,
  Burger,
  Divider,
  NavLink as NavLinkMantine,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { IoMdCloudOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';

import { ThemeToggle } from '@/components/miscellaneous/theme-toggle';
import { NavLink } from '@/components/navigation/nav-link';
import { LogoAndName } from '@/components/static/logo';

export const AppShell = ({ children }: PropsWithChildren) => {
  const theme = useMantineTheme();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShellMantine
      header={{ height: { base: 50, md: 70 } }}
      navbar={{
        width: { sm: 200, md: 250 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      h="100%"
    >
      <AppShellMantine.Header p="md">
        <div className="flex items-center h-full justify-between">
          <div className="flex items-center h-full">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              size="sm"
              color={theme.colors.gray[6]}
              mr="md"
              hiddenFrom="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              size="sm"
              color={theme.colors.gray[6]}
              mr="md"
              visibleFrom="sm"
            />

            <Link href="/" className="no-underline">
              <LogoAndName />
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
          </div>
        </div>
      </AppShellMantine.Header>

      <AppShellMantine.Navbar p="md">
        <AppShellMantine.Section grow>
          <NavLink />
          <Divider my="sm" />
          <NavLinkMantine href="#" label="Getting started" />
          <NavLinkMantine href="#" label="Documentation" />
          <NavLinkMantine href="#" label="Prompt gallery" />
          <NavLinkMantine href="#" label="Discord community" />
        </AppShellMantine.Section>
        <AppShellMantine.Section>
          <NavLinkMantine
            href="#"
            label="Build with Vertex AI on Google Cloud"
            leftSection={<IoMdCloudOutline size={20} />}
          />
        </AppShellMantine.Section>
        <Divider my="sm" />
        <AppShellMantine.Section>
          <NavLinkMantine
            href="#"
            label="Settings"
            leftSection={<IoSettingsOutline size={20} />}
          />
          <NavLinkMantine
            href="#"
            label="demo@aistudio.com"
            leftSection={<Avatar size="sm">AI</Avatar>}
          />
        </AppShellMantine.Section>
      </AppShellMantine.Navbar>

      <AppShellMantine.Main h="100%" className="dark:bg-stone-900 bg-stone-100">
        {children}
      </AppShellMantine.Main>
    </AppShellMantine>
  );
};
