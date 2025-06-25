'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import { ThemeProvider, ThemeProviderProps } from 'next-themes';
import { useRouter } from 'next/navigation';
import * as React from 'react';


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...themeProps}>
        <HeroUIProvider navigate={router.push}>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
