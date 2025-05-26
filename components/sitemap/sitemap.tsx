'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Sitemap() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === 'dark';

  const t = useTranslations('sitemap');

  return (
    <div className="w-full relative mx-auto px-4 py-8 flex flex-col gap-4">
      <span className="text-2xl font-bold text-center items-center justify-center text-brand">
        {t('sitemap_title')}
      </span>
      <div className="w-full flex justify-center flex-col items-center mt-[40px]">
        <div className="flex w-full max-w-[1440px]">
          <div className="w-full aspect-[2/1] relative">
            {mounted ? (
              <Image
                src={isDarkMode ? 'dottedMap-dark.svg' : 'dottedMap.svg'}
                width={100}
                height={100}
                alt="dottedMap"
                className="w-full h-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
            <div
              className="absolute z-10"
              aria-expanded="false"
              aria-haspopup="dialog"
              style={{
                left: '16.1111%',
                top: '29.4444%',
                transform: 'translate(-1.79167px, -1.79167px)',
              }}>
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
              <div
                className="rounded-full absolute top-0 left-0 animate-ping-3"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
            </div>
            <div
              className="absolute z-10"
              aria-expanded="false"
              aria-haspopup="dialog"
              style={{
                left: '15.8333%',
                top: '27.2222%',
                transform: 'translate(-1.79167px, -1.79167px)',
              }}>
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
              <div
                className="rounded-full absolute top-0 left-0 animate-ping-3"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
            </div>
            <div
              className="absolute z-10"
              aria-expanded="true"
              aria-haspopup="dialog"
              style={{
                left: '78.6111%',
                top: '57.2222%',
                transform: 'translate(-1.79167px, -1.79167px)',
              }}
              aria-controls=":rv:">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
              <div
                className="rounded-full absolute top-0 left-0 animate-ping-3"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
            </div>
            <div
              className="absolute z-10"
              aria-expanded="true"
              aria-haspopup="dialog"
              style={{
                left: '83.7777%',
                top: '41.2222%',
                transform: 'translate(-1.79167px, -1.79167px)',
              }}
              aria-controls=":rv:">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
              <div
                className="rounded-full absolute top-0 left-0 animate-ping-3"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
            </div>
            <div
              className="absolute z-10"
              aria-expanded="true"
              aria-haspopup="dialog"
              style={{
                left: '81.6666%',
                top: '46.7777%',
                transform: 'translate(-1.79167px, -1.79167px)',
              }}
              aria-controls=":rv:">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
              <div
                className="rounded-full absolute top-0 left-0 animate-ping-3"
                style={{
                  backgroundColor: 'var(--icon-brand)',
                  width: '3.58333px',
                  height: '3.58333px',
                }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
