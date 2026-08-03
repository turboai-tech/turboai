'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const mapPins = [
  { left: '16.1111%', top: '29.4444%' },
  { left: '15.8333%', top: '27.2222%' },
  { left: '78.6111%', top: '57.2222%' },
  { left: '83.7777%', top: '41.2222%' },
  { left: '81.6666%', top: '46.7777%' },
  { left: '89.1667%', top: '37.7778%' },
  { left: '49.6669%', top: '25.4444%' },
] as const

const locations = [
  'pin_shanghai',
  'pin_tokyo',
  'pin_singapore',
  'pin_americas',
  'pin_europe',
] as const

function MapPin({ left, top }: { left: string; top: string }) {
  return (
    <div
      className="absolute z-10"
      style={{
        left,
        top,
        transform: 'translate(-1.79167px, -1.79167px)',
      }}>
      <div
        className="rounded-full bg-accent shadow-[0_0_12px_4px_color-mix(in_oklab,var(--accent)_45%,transparent)]"
        style={{ width: '3.58333px', height: '3.58333px' }}
      />
      <div
        className="absolute top-0 left-0 animate-ping-3 rounded-full bg-accent"
        style={{ width: '3.58333px', height: '3.58333px' }}
      />
    </div>
  )
}

export default function Sitemap() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const isDarkMode = resolvedTheme === 'dark'
  const t = useTranslations('sitemap')

  return (
    <div className="relative mx-auto flex w-full flex-col gap-4 px-4 py-8">
      <h2 className="px-2 text-center text-2xl leading-7">{t('sitemap_title')}</h2>
      <p className="mx-auto max-w-xl text-center text-sm text-muted">
        {t('sitemap_description')}
      </p>
      <ul className="mx-auto flex flex-wrap items-center justify-center gap-2">
        {locations.map((key) => (
          <li
            key={key}
            className="rounded-full border border-default/40 px-3 py-1 text-xs text-muted">
            {t(key)}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-[1440px]">
          <div className="relative aspect-[2/1] w-full">
            {mounted ? (
              <Image
                alt={t('sitemap_title')}
                className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
                draggable={false}
                height={720}
                src={isDarkMode ? '/dottedMap-dark.svg' : '/dottedMap.svg'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                width={1440}
              />
            ) : (
              <div className="h-full w-full" />
            )}
            {mapPins.map((pin) => (
              <MapPin
                key={`${pin.left}-${pin.top}`}
                left={pin.left}
                top={pin.top}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
