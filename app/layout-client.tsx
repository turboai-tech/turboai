'use client';

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
    <div className={`container ${isDashboard ? 'w-full' : 'mx-auto w-4/5'}`}>
      {!isDashboard && <NavbarComponent />}
      <main className="mx-auto w-full">{children}</main>
      {!isDashboard && <FooterComponent />}
    </div>
  );
}
