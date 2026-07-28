'use client'

import { Toast } from '@heroui/react'
import { ThemeProvider, ThemeProviderProps } from 'next-themes'
import * as React from 'react'

import { TRPCProvider } from '@/utils/trpc-client'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...themeProps}>
      <Toast.Provider />
      <TRPCProvider>{children}</TRPCProvider>
    </ThemeProvider>
  )
}
