'use client';

import { cn } from '@heroui/react';
import type { ReactNode } from 'react';

type SidebarDrawerProps = {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sidebarWidth?: number;
};

/** Lightweight drawer shell used by the dashboard. */
export default function SidebarDrawer({
  children,
  className,
  isOpen = false,
  onOpenChange,
}: SidebarDrawerProps) {
  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-72 border-r border-default/40 bg-background transition-transform lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className,
        )}>
        {children}
      </aside>
      {isOpen ? (
        <button
          aria-label="Close drawer"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          type="button"
          onClick={() => onOpenChange?.(false)}
        />
      ) : null}
    </>
  );
}
