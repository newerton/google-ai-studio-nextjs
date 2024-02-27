import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { BiSun } from 'react-icons/bi';
import { BsMoonStars } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';

export const ThemeToggle = () => {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="outline"
      radius="lg"
      size="lg"
      className={twMerge(
        'text-blue-600 dark:text-yellow-400',
        'border-blue-600 dark:border-yellow-400',
        'hover:bg-blue-600 dark:hover:bg-yellow-400 hover:text-white dark:hover:text-black',
        'transition-colors duration-300 ease-in-out',
      )}
    >
      <BiSun className="hidden dark:block" size="1rem" />
      <BsMoonStars className="block dark:hidden" size="1rem" />
    </ActionIcon>
  );
};
