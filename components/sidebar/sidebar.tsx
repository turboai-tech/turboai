'use client';

import { cn } from '@heroui/react';
import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';

export enum SidebarItemType {
  Nest = 'nest',
}

export type SidebarItem = {
  key: string;
  title: string;
  href?: string;
  icon?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  items?: SidebarItem[];
  type?: SidebarItemType;
  className?: string;
};

type SidebarProps = {
  items?: SidebarItem[];
  defaultSelectedKey?: string;
  selectedKeys?: string[];
  className?: string;
  isCompact?: boolean;
};

export default function Sidebar({
  items = [],
  className,
}: SidebarProps) {
  return (
    <nav className={cn('flex flex-col gap-1', className)}>
      {items.map((item) => (
        <Link
          key={item.key}
          className={cn(
            'rounded-md px-3 py-2 text-sm text-muted hover:bg-default/40 hover:text-foreground',
            item.className,
          )}
          href={item.href ?? '#'}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
