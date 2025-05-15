'use client';

import '@/app/globals.css';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import NextLink from 'next/link';
import { Logo } from '../icons';
import { ThemeSwitch } from '../theme-switch';

export default function NavbarComponent() {
  return (
    <Navbar
      isBlurred
      className="bg-background/70 backdrop-blur-lg backdrop-saturate-150 h-12">
      <NavbarBrand className="w-1/5 justify-start">
        <NextLink
          className="flex items-center gap-1"
          href="/">
          <Logo
            width={96}
            height={32}
            fontSize={24}
          />
          {/* <p className="font-bold text-lg text-inherit">Jujus</p> */}
        </NextLink>
      </NavbarBrand>
      <NavbarContent className="w-3/5 hidden sm:flex gap-6 justify-center">
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="font-medium text-sm">
            Solutions
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="font-medium text-sm">
            Examples
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            color="foreground"
            href="#"
            className="font-medium text-sm">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="font-medium text-sm">
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="w-1/5 hidden sm:flex justify-end gap-4">
        <NavbarItem className="hidden sm:flex gap-4">
          <ThemeSwitch />
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
