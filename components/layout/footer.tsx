'use client';

import { Logo } from '@/components/icons';
import { Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import NextLink from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-4/5 mx-auto py-8">
      <div className="max-w-xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left Side: Logo and Copyright */}
          <div className="flex flex-col items-center sm:items-start">
            <NextLink
              href="/"
              passHref>
              <Link className="flex items-center gap-1 mb-2">
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
                {/* <span className="font-bold text-sm text-inherit">AI · 101</span> */}
              </Link>
            </NextLink>
            <span className="text-foreground-500 text-sm">
              © {currentYear} IP AI 101. All Rights Reserved.
            </span>
          </div>

          {/* Right Side: Links */}
          <div className="flex gap-4">
            <Link
              href="#"
              color="foreground"
              size="sm"
              className="text-foreground-600 hover:text-foreground-900">
              Terms
            </Link>
            <Link
              href="#"
              color="foreground"
              size="sm"
              className="text-foreground-600 hover:text-foreground-900">
              Privacy
            </Link>
            <Link
              href="#"
              color="foreground"
              size="sm"
              className="text-foreground-600 hover:text-foreground-900">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
