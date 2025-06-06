'use client';

import {
  Avatar,
  Button,
  Input,
  Link,
  ScrollShadow,
  Spacer,
  useDisclosure,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import SidebarDrawer from '@/components/sidebar/sidebar-drawer';
import { sectionItemsWithTeams } from '@/components/sidebar/sidebar-items';

import { Logo } from '@/components/icons';
import LocaleSwitcher from '@/components/locale-switch';
import Sidebar from '@/components/sidebar/sidebar';
import { ThemeSwitch } from '@/components/theme-switch';

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function DashboardPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const title = 'Overview';
  const pageSpecificHeader: React.ReactNode = null; // Placeholder for header content
  const pageSpecificChildren: React.ReactNode = // Placeholder for main page content
    (
      <div className="text-center">
        <h3 className="text-xl font-semibold">Welcome to the Dashboard</h3>
        <p className="text-default-500">
          This is where your main dashboard content will go.
        </p>
        <p className="text-default-500">
          You can customize this area by editing the `pageSpecificChildren`
          variable in `app/dashboard/page.tsx`.
        </p>
      </div>
    );

  const content = (
    <div className="relative flex h-full w-72 flex-1 flex-col bg-gradient-to-b from-default-50 via-danger-80 to-primary-50 p-6">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-fit items-center justify-center rounded-full border-small border-foreground/20">
          <Link
            className="w-full items-center text-foreground"
            href="/">
            <div className="flex items-center justify-between gap-1">
              <Icon
                icon="lucide:layers"
                className="text-primary text-2xl h-8"
              />
              <Logo
                width={96}
                height={32}
                className="md:block items-center h-8"
              />
            </div>
          </Link>
        </div>
      </div>

      <Spacer y={8} />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29028708c"
          />
          <div className="flex flex-col">
            <p className="text-small text-foreground">Jane Doe</p>
            <p className="text-tiny text-default-500">Product Designer</p>
          </div>
        </div>
        <Input
          fullWidth
          aria-label="search"
          classNames={{
            base: 'px-1',
            inputWrapper:
              'bg-default-400/20 data-[hover=true]:bg-default-500/30 group-data-[focus=true]:bg-default-500/20',
            input:
              'placeholder:text-default-600 group-data-[has-value=true]:text-foreground',
          }}
          labelPlacement="outside"
          placeholder="Search..."
          startContent={
            <Icon
              className="text-default-600 [&>g]:stroke-[2px]"
              icon="solar:magnifer-linear"
              width={18}
            />
          }
        />
      </div>

      <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
        <Sidebar
          defaultSelectedKey="home"
          iconClassName="text-default-600 group-data-[selected=true]:text-foreground"
          itemClasses={{
            base: 'data-[selected=true]:bg-default-400/20 data-[hover=true]:bg-default-400/10',
            title:
              'text-default-600 group-data-[selected=true]:text-foreground',
          }}
          items={sectionItemsWithTeams}
          sectionClasses={{
            heading: 'text-default-600 font-medium',
          }}
          variant="flat"
        />
      </ScrollShadow>

      <Spacer y={8} />

      <div className="mt-auto flex flex-col">
        <div className="flex items-start justify-start gap-2 px-3">
          <LocaleSwitcher />
        </div>
        <Button
          fullWidth
          className="justify-start text-default-600 data-[hover=true]:text-black"
          startContent={
            <Icon
              className="text-default-600"
              icon="solar:info-circle-line-duotone"
              width={24}
            />
          }
          variant="light">
          Help & Information
        </Button>
        <Button
          className="justify-start text-default-600 data-[hover=true]:text-black"
          startContent={
            <Icon
              className="rotate-180 text-default-600"
              icon="solar:minus-circle-line-duotone"
              width={24}
            />
          }
          variant="light">
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full">
      <SidebarDrawer
        className="flex-none"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        {content}
      </SidebarDrawer>
      <div className="flex w-full flex-col gap-y-4 p-4 sm:max-w-[calc(100%_-_288px)]">
        <header className="flex h-16 min-h-16 items-center justify-between gap-2 overflow-x-scroll rounded-medium border-small border-divider px-4 py-2">
          <div className="flex max-w-full items-center gap-2">
            <Button
              isIconOnly
              className="flex sm:hidden"
              size="sm"
              variant="light"
              onPress={onOpen}>
              <Icon
                className="text-default-500"
                height={24}
                icon="solar:hamburger-menu-outline"
                width={24}
              />
            </Button>
            <ThemeSwitch />
            <h2 className="truncate text-medium font-medium text-default-700">
              {title}
            </h2>
          </div>
          {pageSpecificHeader}
        </header>
        <main className="flex h-full">
          <div className="flex h-full w-full flex-col gap-4 rounded-medium border-small border-divider p-6">
            {pageSpecificChildren}
          </div>
        </main>
      </div>
    </div>
  );
}
