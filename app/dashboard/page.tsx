'use client';

import { Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';

import { Logo } from '@/components/icons';
import ClaimLeads from '@/components/lead/claim-leads';
import LocaleSwitcher from '@/components/locale-switch';
import { ThemeSwitch } from '@/components/theme-switch';
import { sectionItemsWithTeams } from '@/components/sidebar/sidebar-items';

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full">
      {/* 登录后认领此前以同一邮箱留下的资料 */}
      <ClaimLeads />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-default/40 bg-background p-4 transition-transform lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center gap-2 px-2 py-3">
          <Icon className="text-2xl text-accent" icon="lucide:layers" />
          <Logo height={28} width={88} />
        </div>
        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto">
          {sectionItemsWithTeams.flatMap((section) =>
            (section.items ?? []).map((item) => (
              <Link
                key={item.key}
                className="rounded-md px-3 py-2 text-sm text-muted hover:bg-default/40 hover:text-foreground"
                href={item.href ?? '#'}>
                {item.title}
              </Link>
            )),
          )}
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t border-default/40 pt-4">
          <LocaleSwitcher />
          <ThemeSwitch />
        </div>
      </aside>

      {isOpen ? (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          type="button"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-default/40 px-4">
          <Button
            isIconOnly
            aria-label="Open sidebar"
            className="lg:hidden"
            size="sm"
            variant="ghost"
            onPress={() => setIsOpen(true)}>
            <Icon icon="lucide:menu" width={20} />
          </Button>
          <Input
            aria-label="Search"
            className="max-w-sm"
            placeholder="Search…"
          />
          <div className="ml-auto text-sm text-muted">Overview</div>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
          <h3 className="text-xl font-semibold">Welcome to the dashboard</h3>
          <p className="text-muted">
            This is where your main dashboard content will go.
          </p>
        </main>
      </div>
    </div>
  );
}
