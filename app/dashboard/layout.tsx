import { Metadata, Viewport } from 'next';

import '../globals.css';

import { siteConfig } from '@/config/site';
import App from './page';

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

export default async function DashboardLayout() {
  // const locale = await getUserLocale();

  return (
    <div className="dashboard-layout w-screen h-screen p-0 flex items-start justify-center">
      <App />
    </div>
  );
}
