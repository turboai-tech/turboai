'use client';

import { Button, type NavbarProps } from '@heroui/react';

import { Logo } from '@/components/icons';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import {
  cn,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import LocaleSwitcher from '../locale-switch';
import { ThemeSwitch } from '../theme-switch';

const items = ['overview', 'solutions', 'products', 'pricing', 'blog'];

export default function NavbarComponent(props: NavbarProps) {
  const t = useTranslations('Navbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      {...props}
      isBordered
      isBlurred
      classNames={{
        base: cn('mx-auto border-default-100', {
          'bg-default-200/50 dark:bg-default-100/50': isMenuOpen,
        }),
        wrapper: 'w-4/5 justify-center bg-transparent',
        item: 'hidden md:flex',
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarBrand>
        <Link className="w-full items-center" href="/">
          <div className="flex items-center justify-between gap-1">
            <Icon icon="lucide:layers" className="text-primary text-2xl h-8" />
            <Logo
              width={96}
              height={32}
              className="md:block items-center h-8"
            />
          </div>
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="hidden h-11 gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-4 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50 md:flex"
        justify="center"
      >
        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/">
            {t('overview')}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            aria-current="page"
            className="flex gap-2 text-inherit"
            href="/solutions"
          >
            {t('solutions')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/products">
            {t('products')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/#pricing-container">
            {t('pricing')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/blog">
            {t('blog')}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex" justify="end">
        <NavbarItem key="locale-switcher">
          <LocaleSwitcher />
        </NavbarItem>
        <NavbarItem key="theme-switch">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex">
          <SignedOut>
            <SignInButton>
              <Button variant="light" size="md">
                <span className="text-base">{t('signin')}</span>
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="light" size="md">
                <span className="text-base">{t('signup')}</span>
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu
        className="top-[calc(var(--navbar-height)_+_60px)] max-h-[70vh] bg-default-200/50 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: {
            ease: 'easeInOut',
            duration: 0.2,
          },
        }}
      >
        <NavbarMenuItem
          key="locale-switcher"
          className="text-left justify-start"
        >
          <LocaleSwitcher />
        </NavbarMenuItem>
        <NavbarMenuItem key="theme-switch" className="text-left justify-start">
          <ThemeSwitch />
        </NavbarMenuItem>
        {items.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-default-500"
              href={`/${item}`}
              size="md"
            >
              {t(item)}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
