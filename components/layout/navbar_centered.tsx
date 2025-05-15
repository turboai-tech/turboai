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
import React from 'react';
import { ThemeSwitch } from '../theme-switch';

const menuItems = ['Overview', 'Solutions', 'Products', 'Pricing', 'About'];

export default function NavbarComponent(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="w-full relative min-h-[200vh]">
      <Navbar
        {...props}
        classNames={{
          base: cn('border-default-100', {
            'fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur-lg backdrop-saturate-150 max-h-20':
              isMenuOpen,
          }),
          wrapper: 'w-full justify-center bg-transparent',
          item: 'hidden md:flex',
        }}
        disableScrollHandler
        isBlurred
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          className="text-default-400 md:hidden"
          aria-label="Toggle menu"
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarBrand className="max-w-[20%]">
          <div className="flex justify-between gap-1">
            <Icon
              icon="lucide:layers"
              className="text-primary text-2xl"
            />
            <Logo
              width={64}
              height={30}
              className="ml-1 hidden md:block"
            />
          </div>
          {/* <p className="font-bold text-inherit">AI 101</p> */}
        </NavbarBrand>
        <NavbarContent
          className="ml-4 hidden h-12 w-full max-w-fit gap-4 !rounded-full bg-content2 px-4 dark:bg-content1 sm:flex"
          justify="start">
          <NavbarItem>
            <Link
              className="flex gap-2 text-inherit"
              href="#">
              Overview
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              aria-current="page"
              className="flex gap-2 text-inherit"
              href="#">
              Solutions
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="flex gap-2 text-inherit"
              href="#">
              Products
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="flex gap-2 text-inherit"
              href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="flex gap-2 text-inherit"
              href="#">
              About
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent
          className="ml-auto flex h-12 max-w-fit items-center gap-0 rounded-full p-0 lg:bg-content2 lg:px-1 lg:dark:bg-content1"
          justify="end">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="ml-2 !flex gap-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {/* <Button
              className="hidden border-small border-secondary-500/20 bg-secondary-500/10 text-secondary-800 sm:flex"
              color="secondary"
              radius="full"
              style={{
                boxShadow: 'inset 0 0 4px #bf97ff70',
              }}
              variant="flat">
              Start Free Trial
            </Button> */}
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu
          className="top-[calc(var(--navbar-height)_-_1px)] max-h-[70vh] bg-default-200/50 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
          motionProps={{
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: {
              ease: 'easeInOut',
              duration: 0.2,
            },
          }}>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full text-default-500"
                href="#"
                size="md">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
