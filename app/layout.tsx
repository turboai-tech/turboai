import clsx from 'clsx';
import { Metadata, Viewport } from 'next';

import { Providers } from '@/app/providers';
import './globals.css';

import Footer from '@/components/layout/footer';
// import NavbarComponent from '@/components/layout/navbar';
import NavbarComponent from '@/components/layout/navbar_centered';
import { fontPacifico, fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { ClerkProvider } from '@clerk/nextjs';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        suppressHydrationWarning
        lang="en">
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
            'min-h-screen bg-background font-sans antialiased dark:bg-neutral-900 dark:text-neutral-100',
            fontSans.variable,
            fontPacifico.variable
          )}>
          <Providers
            themeProps={{
              attribute: 'class',
              defaultTheme: 'dark',
              enableSystem: true,
              disableTransitionOnChange: true,
            }}>
            <div className="max-w-full relative flex flex-col h-screen gap-y-2">
              {/* <div className="w-4/5 mx-auto">
                {siteConfig.pinned && <Pinned />}
              </div> */}
              {/* <div className="w-full mx-auto">
                <Divider />
              </div> */}
              <div className="w-4/5 mx-auto">
                <NavbarComponent />
              </div>
              <main className="container w-4/5 mx-auto flex-grow mt-[60px]">
                {children}
              </main>
              <div className="w-4/5 mx-auto">
                <Footer />
              </div>
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
