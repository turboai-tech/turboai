'use client';

import { Logo } from '@/components/icons';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import ButtonLink from '@/components/button-link';
import { Button, cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LocaleSwitcher from '../locale-switch';
import { ThemeSwitch } from '../theme-switch';

const navItems = [
  { key: 'overview', href: '/' },
  { key: 'solutions', href: '/solutions' },
  { key: 'products', href: '/products' },
  { key: 'pricing', href: '/#pricing-container' },
  { key: 'blog', href: '/about/news' },
] as const;

export default function NavbarComponent({ className }: { className?: string }) {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-default/40 backdrop-blur-md',
        isMenuOpen ? 'bg-default/40' : 'bg-background/70',
        className,
      )}>
      <div className="mx-auto flex h-[60px] w-4/5 items-center gap-6">
        <Link className="flex shrink-0 items-center gap-1" href="/">
          <Icon className="h-8 text-2xl text-accent" icon="lucide:layers" />
          <Logo className="h-8 items-center" height={32} width={96} />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden h-11 shrink-0 items-center gap-4 rounded-full border border-default/20 bg-background/60 px-4 shadow-md backdrop-blur-md backdrop-saturate-150 dark:bg-default/40 xl:flex">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'text-sm text-muted transition-colors hover:text-foreground',
                isActive(href) && 'text-foreground',
              )}
              href={href}>
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <div className="hidden sm:block">
            <ThemeSwitch label={t('theme')} />
          </div>

          <SignedOut>
            <SignInButton>
              <Button className="hidden sm:inline-flex" size="sm" variant="ghost">
                {t('signin')}
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                className="hidden 2xl:inline-flex"
                size="sm"
                variant="ghost">
                {t('signup')}
              </Button>
            </SignUpButton>
          </SignedOut>

          <ButtonLink
            className="hidden h-9 rounded-full bg-gradient-to-tr from-[#fd7bf8] to-[#b249f8] px-4 text-sm font-medium text-foreground sm:inline-flex"
            href="/#pricing-container"
            size="sm">
            {t('cta')}
          </ButtonLink>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-6 w-6 items-center justify-center text-muted xl:hidden"
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}>
            <Icon
              className="text-xl"
              icon={isMenuOpen ? 'lucide:x' : 'lucide:menu'}
            />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="max-h-[70vh] overflow-y-auto border-t border-default/40 bg-default/40 px-[10%] py-6 shadow-md backdrop-blur-md backdrop-saturate-150 xl:hidden">
          <nav aria-label="Mobile" className="flex max-w-sm flex-col gap-3">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                className="text-base text-muted hover:text-foreground"
                href={href}
                onClick={closeMenu}>
                {t(key)}
              </Link>
            ))}

            <ButtonLink
              className="mt-2 rounded-full bg-gradient-to-tr from-[#fd7bf8] to-[#b249f8] font-medium text-foreground"
              fullWidth
              href="/#pricing-container"
              onClick={closeMenu}>
              {t('cta')}
            </ButtonLink>

            <SignedOut>
              <div className="flex gap-2">
                <SignInButton>
                  <Button fullWidth variant="outline">
                    {t('signin')}
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button fullWidth variant="outline">
                    {t('signup')}
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <div className="pt-2">
              <LocaleSwitcher />
            </div>
            <ThemeSwitch showLabel label={t('theme')} />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
