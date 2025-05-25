'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function Sitemap() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const t = useTranslations('sitemap');

  return (
    <div className="w-full relative mx-auto px-4 py-8 flex flex-col gap-4">
      <span className="text-2xl font-bold text-center items-center justify-center text-brand mb-8">
        {t('sitemap_title')}
      </span>
      <Image
        src={isDarkMode ? 'dottedMap-dark.svg' : 'dottedMap.svg'}
        alt="dottedMap"
        width={100}
        height={100}
        className="w-full"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        className="absolute z-10"
        aria-expanded="false"
        aria-haspopup="dialog"
        style={{
          left: '16.1111%',
          top: '29.4444%',
          transform: 'translate(-3.42708px, -3.42708px)',
        }}>
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: 'var(--icon-brand)',
          }}></div>
        <div
          className="rounded-full absolute top-0 left-0 animate-ping-3"
          style={{
            backgroundColor: 'var(--icon-brand)',
            opacity: 0.5,
            animationDuration: '2.5s',
            width: '6.85417px',
            height: '6.85417px',
          }}></div>
      </div>
      <div
        className="rounded-full absolute top-0 left-0 animate-ping-3"
        style={{
          backgroundColor: 'var(--icon-brand)',
          opacity: 0.5,
          animationDuration: '2.5s',
          width: '6.85417px',
          height: '6.85417px',
        }}></div>
    </div>
  );
}
