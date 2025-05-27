'use client';

import BannerComponent from '@/components/layout/banner';
import FooterComponent from '@/components/layout/footer';
import NavbarComponent from '@/components/layout/navbar';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div
      lang={locale}
      className="items-center justify-center">
      <BannerComponent />
      {!isDashboard && <NavbarComponent />}
      <main className="mx-auto w-4/5">{children}</main>
      {!isDashboard && <FooterComponent />}
    </div>
  );
}
