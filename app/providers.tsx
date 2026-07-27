'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Toast } from '@heroui/react';
import { ThemeProvider, ThemeProviderProps } from 'next-themes';
import * as React from 'react';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...themeProps}>
        <Toast.Provider />
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
