import clsx from 'clsx';
import { Metadata, Viewport } from 'next';

import { Providers } from '@/app/providers';
import './globals.css';

import Cookies from '@/components/layout/cookies';
import { fontPacifico, fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { getUserLocale } from '@/services/locale';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import RootLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}: ${siteConfig.description}`,
    template: `%s - ${siteConfig.name}: ${siteConfig.description}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getUserLocale();

  return (
    <ClerkProvider>
      <html
        suppressHydrationWarning
        lang={locale}>
        <head>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes"
          />
        </head>
        <body
          className={clsx(
            'min-h-screen bg-background font-sans antialiased overflow-y-auto',
            fontSans.variable,
            fontPacifico.variable
          )}>
          <NextIntlClientProvider locale={locale}>
            <Providers
              themeProps={{
                attribute: 'class',
                defaultTheme: 'dark',
                enableSystem: true,
                disableTransitionOnChange: true,
              }}>
              <RootLayoutClient locale={locale}>{children}</RootLayoutClient>
              <Cookies />
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
