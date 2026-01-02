import { NavLink as NavLinkMantine } from '@mantine/core';
import Link from 'next/link';
import { FiPlusCircle } from 'react-icons/fi';
import { LuLibrary } from 'react-icons/lu';
import { MdAddToDrive, MdOutlineKey } from 'react-icons/md';

type NavLinkChildrenItem = {
  icon: any;
  label: string;
  href: string;
};

type NavLinkItem = {
  icon: any;
  label: string;
  children?: NavLinkChildrenItem[];
  href?: string;
};

const data: NavLinkItem[] = [
  {
    icon: MdOutlineKey,
    label: 'Get API Key',
    href: '#',
  },
  {
    icon: FiPlusCircle,
    label: 'Create new',
    href: '#',
  },
  {
    icon: LuLibrary,
    label: 'My library',
    children: [
      {
        icon: MdAddToDrive,
        label: 'Allow Drive access',
        href: '#',
      },
    ],
  },
];

function renderNavLink(item: NavLinkItem, key: number) {
  const { icon: Icon, label, children, href } = item;

  if (children) {
    return (
      <NavLinkMantine
        key={key}
        label={label}
        leftSection={<Icon size={18} />}
        childrenOffset={28}
        component="div"
      >
        {children.map((child, childKey) => {
          const { icon: IconChild } = child;
          return (
            <NavLinkMantine
              key={childKey.toString()}
              label={child.label}
              leftSection={<IconChild size={18} />}
              href={child.href}
              component={Link}
            />
          );
        })}
      </NavLinkMantine>
    );
  }

  if (href) {
    return (
      <NavLinkMantine
        key={key}
        label={label}
        leftSection={<Icon size={18} />}
        href={href || '#'}
        component={Link}
      />
    );
  }

  return (
    <NavLinkMantine
      key={key}
      label={label}
      leftSection={<Icon size={18} />}
      href={href || '#'}
    />
  );
}

export const NavLink = () => {
  return data.map((item, key) => renderNavLink(item, key));
};
