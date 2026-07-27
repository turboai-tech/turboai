'use client'

import { Description, Label, ListBox, Popover, Switch, buttonVariants, cn } from '@heroui/react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import {
  DESIGN_THEME_STORAGE_KEY,
  VIBRANT_STORAGE_KEY,
  applyDesignTheme,
  getStoredDesignTheme,
  isDesignThemeId,
  type DesignThemeId,
} from '@/utils/design-theme'

type ThemeOption = {
  id: DesignThemeId
  label: string
  image: string
}

const THEMES: ThemeOption[] = [
  { id: 'default', image: '/themes/default.png', label: 'Default' },
  { id: 'sky', image: '/themes/sky.png', label: 'Sky' },
  { id: 'lavender', image: '/themes/lavender.png', label: 'Lavender' },
  { id: 'mint', image: '/themes/mint.png', label: 'Mint' },
  { id: 'netflix', image: '/themes/netflix.png', label: 'Netflix' },
  { id: 'uber', image: '/themes/black.png', label: 'Uber' },
  { id: 'spotify', image: '/themes/spotify.png', label: 'Spotify' },
  { id: 'coinbase', image: '/themes/coinbase.png', label: 'Coinbase' },
  { id: 'airbnb', image: '/themes/airbnb.png', label: 'Airbnb' },
  { id: 'discord', image: '/themes/discord.png', label: 'Discord' },
  { id: 'rabbit', image: '/themes/rabbit.png', label: 'Rabbit' },
]

export default function DesignThemeSelector({
  compact = false,
}: {
  compact?: boolean
}) {
  const t = useTranslations('ThemeSelector')
  const [active, setActive] = useState<DesignThemeId>('default')
  const [mounted, setMounted] = useState(false)
  const [vibrant, setVibrant] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    const stored = getStoredDesignTheme()
    if (stored !== 'default') {
      setActive(stored)
      applyDesignTheme(stored)
    }

    const storedVibrant = localStorage.getItem(VIBRANT_STORAGE_KEY)
    if (storedVibrant === 'true') {
      setVibrant(true)
      document.documentElement.setAttribute('data-vibrant-palette', 'true')
    }
  }, [])

  const handleSelect = useCallback((keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') return
    const selected = [...keys][0]
    if (typeof selected !== 'string' || !isDesignThemeId(selected)) return

    setActive(selected)
    localStorage.setItem(DESIGN_THEME_STORAGE_KEY, selected)
    applyDesignTheme(selected)
  }, [])

  const handleVibrantToggle = useCallback((isSelected: boolean) => {
    setVibrant(isSelected)
    localStorage.setItem(VIBRANT_STORAGE_KEY, String(isSelected))
    if (isSelected) {
      document.documentElement.setAttribute('data-vibrant-palette', 'true')
    } else {
      document.documentElement.removeAttribute('data-vibrant-palette')
    }
  }, [])

  const current = THEMES.find((theme) => theme.id === active)
  const showAvatar = mounted && active !== 'default' && current

  return (
    <Popover>
      <Popover.Trigger
        aria-label={
          showAvatar ? `${t('design_theme')}: ${current.label}` : t('design_theme')
        }
        className={cn(
          buttonVariants({ size: 'sm', variant: 'tertiary' }),
          'inline-flex h-9 shrink-0 flex-row flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap text-xs text-muted',
          compact ? 'w-9 min-w-9 px-0' : 'px-2.5',
        )}>
        {showAvatar ? (
          <Image
            alt=""
            className="size-3.5 shrink-0 rounded-full"
            height={14}
            src={current.image}
            width={14}
          />
        ) : (
          <Icon className="size-3.5 shrink-0 text-foreground" icon="lucide:paint-bucket" />
        )}
        {!compact ? (
          <span className="hidden truncate lg:inline">
            {showAvatar ? current.label : t('theme')}
          </span>
        ) : null}
      </Popover.Trigger>
      <Popover.Content className="w-[248px] rounded-3xl" placement="bottom">
        <Popover.Dialog className="p-4">
          <ListBox
            aria-label={t('design_theme')}
            className="grid grid-cols-4 gap-3"
            items={THEMES}
            layout="grid"
            selectedKeys={new Set([active])}
            selectionMode="single"
            onSelectionChange={handleSelect}>
            {(item) => (
              <ListBox.Item
                key={item.id}
                className={cn(
                  'group relative flex w-10 flex-col items-center justify-center gap-1.5 p-0',
                  'hover:bg-transparent data-[hovered=true]:bg-transparent',
                )}
                id={item.id}
                textValue={item.label}>
                <Image
                  alt={item.label}
                  className={cn(
                    'size-9 rounded-full bg-surface',
                    'group-data-[selected=true]:ring-2 group-data-[selected=true]:ring-accent group-data-[selected=true]:ring-offset-2 group-data-[selected=true]:ring-offset-surface',
                  )}
                  height={36}
                  src={item.image}
                  width={36}
                />
                <span className="text-[10px] font-medium capitalize text-muted group-data-[selected=true]:text-foreground">
                  {item.label}
                </span>
              </ListBox.Item>
            )}
          </ListBox>

          <div className="mt-4 border-t border-separator pt-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-col gap-0.5">
                <Label className="text-xs">{t('vibrant_palette')}</Label>
                <Description className="text-[10px]">
                  {t('vibrant_palette_description')}
                </Description>
              </div>
              <Switch isSelected={vibrant} onChange={handleVibrantToggle}>
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
