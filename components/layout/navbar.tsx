'use client';

import type { NavbarProps } from '@heroui/react';

import { Logo } from '@/components/icons';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import LocaleSwitcher from '../locale-switch';
import { ThemeSwitch } from '../theme-switch';

const items = ['overview', 'solutions', 'products', 'pricing', 'blog'];

export default function NavbarComponent(props: NavbarProps) {
  const t = useTranslations('Navbar');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const firstNavbarRef = useRef<HTMLDivElement>(null);
  const [secondNavbarTop, setSecondNavbarTop] = useState(40);

  useEffect(() => {
    const updateSecondNavbarPosition = () => {
      if (firstNavbarRef.current) {
        const firstNavbarHeight = firstNavbarRef.current.offsetHeight;
        setSecondNavbarTop(firstNavbarHeight);
      }
    };

    // 初始更新
    updateSecondNavbarPosition();

    // 监听窗口大小变化
    window.addEventListener('resize', updateSecondNavbarPosition);

    // 创建 ResizeObserver 监听第一个导航栏的大小变化
    const resizeObserver = new ResizeObserver(updateSecondNavbarPosition);
    if (firstNavbarRef.current) {
      resizeObserver.observe(firstNavbarRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateSecondNavbarPosition);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <Navbar
        ref={firstNavbarRef}
        maxWidth="xl"
        isBlurred
        className="fixed top-0 left-0 right-0 z-40 bg-background backdrop-blur-lg h-auto min-h-[40px] flex items-center backdrop-saturate-250 text-sm">
        <NavbarContent className="w-full flex flex-col sm:flex-row gap-2 justify-center">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Link
              href="/"
              className="flex items-center justify-center">
              <span
                aria-label="rocket"
                className="hidden md:block"
                role="img">
                🚀
              </span>
              <span
                className="inline-flex md:ml-1 animate-text-gradient font-medium bg-clip-text text-transparent bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)] text-xs sm:text-sm md:text-base whitespace-normal text-center"
                style={{
                  backgroundSize: '200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}>
                {t('promo')}
              </span>
            </Link>
            <a
              className="flex group min-w-[100px] sm:min-w-[120px] items-center font-semibold text-foreground shadow-sm gap-1.5 relative overflow-hidden rounded-full p-[1px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              href="https://jujus.ai/pricing"
              rel="noopener noreferrer">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F54180_0%,#338EF7_50%,#F54180_100%)]"></span>
              <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/70 transition-background px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-foreground backdrop-blur-3xl">
                Turbo Pro
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2px] w-3 h-3 sm:w-4 sm:h-4"
                  viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 12h16m0 0l-6-6m6 6l-6 6"></path>
                </svg>
              </div>
            </a>
          </div>
        </NavbarContent>
      </Navbar>
      <Navbar
        {...props}
        style={{ top: `${secondNavbarTop}px` }}
        classNames={{
          base: 'fixed top-[5vh] min-h-[40px] left-0 right-0 z-40 bg-background/70 backdrop-blur-lg  h-[5vh] flex items-center w-4/5 mx-auto',
          wrapper: 'w-full justify-center bg-transparent',
          item: 'hidden md:flex',
        }}
        disableAnimation={false}
        shouldHideOnScroll={false}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={(open) => {
          if (open === false) return;
          setIsMenuOpen(open);
        }}>
        <NavbarBrand className="lg:w-[20%] md:w-[30%] sm:w-auto flex h-12 gap-0 rounded-full p-0 justify-start">
          <Link href="/">
            <div className="flex justify-between gap-1">
              <Icon
                icon="lucide:layers"
                className="text-primary text-2xl"
              />
              <Logo
                width={96}
                height={32}
                className="md:block"
              />
            </div>
          </Link>
        </NavbarBrand>
        <NavbarContent
          className="ml-4 min-w-[45%] hidden md:flex h-12 w-full max-w-fit gap-4 !rounded-full bg-content2 px-4 dark:bg-content1"
          justify="start">
          <NavbarItem>
            <Link
              className="flex gap-2 text-inherit"
              href="/overview">
              {t('overview')}
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              aria-current="page"
              className="flex gap-2 text-inherit"
              href="/solutions">
              {t('solutions')}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="flex gap-2 text-inherit"
              href="/products">
              {t('products')}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="flex gap-2 text-inherit"
              href="/pricing">
              {t('pricing')}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="flex gap-2 text-inherit"
              href="/blog">
              {t('blog')}
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent
          className="auto-max hidden md:flex h-12 auto-max gap-0 rounded-full p-0 lg:bg-content2 lg:px-1 lg:dark:bg-content1"
          justify="end">
          <NavbarItem key="locale-switcher">
            <LocaleSwitcher />
          </NavbarItem>
          <NavbarItem key="theme-switch">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent
          className="auto-max flex h-12 auto-max gap-0 rounded-full p-0"
          justify="end">
          <NavbarItem className="flex">
            <SignedOut>
              <SignInButton>
                <Button
                  variant="light"
                  size="sm">
                  {t('signin')}
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant="light"
                  size="sm">
                  {t('signup')}
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </NavbarItem>
          <Button
            className="text-default-500 md:hidden p-2 min-w-0 ml-2"
            variant="light"
            isIconOnly
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}>
            <Icon
              icon={isMenuOpen ? 'lucide:x' : 'lucide:menu'}
              className="text-primary text-xl"
            />
          </Button>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu
          className="top-[calc(var(--navbar-height)_-_1px)] max-h-[70vh] bg-default-200/50 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50 text-left justify-start"
          motionProps={{
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: {
              ease: 'easeInOut',
              duration: 0.2,
            },
          }}>
          <NavbarMenuItem
            key="locale-switcher"
            className="text-left justify-start">
            <LocaleSwitcher />
          </NavbarMenuItem>
          <NavbarMenuItem
            key="theme-switch"
            className="text-left justify-start">
            <ThemeSwitch />
          </NavbarMenuItem>
          {items.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full text-default-500 text-left"
                href={`/${item}`}
                size="md">
                {t(item)}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
