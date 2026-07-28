'use client'

import { Description, Label, ListBox, Popover, Switch, buttonVariants, cn } from '@heroui/react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useCallback, useEffect, useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'

import {
  DEFAULT_DESIGN_THEME,
  applyDesignTheme,
  applyVibrantPalette,
  getStoredDesignTheme,
  getStoredVibrant,
  isDesignThemeId,
  setStoredDesignTheme,
  setStoredVibrant,
  subscribeDesignTheme,
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

  // 主题存在 localStorage 里，是 React 之外的状态，因此订阅它而不是在 effect
  // 里读一次再 setState。第三个参数是服务端快照：SSR 与水合期间一律按默认主题
  // 渲染，水合完成后才切到真实值，从而不会出现服务端/客户端标记不一致。
  const active = useSyncExternalStore(
    subscribeDesignTheme,
    getStoredDesignTheme,
    () => DEFAULT_DESIGN_THEME,
  )
  const vibrant = useSyncExternalStore(
    subscribeDesignTheme,
    getStoredVibrant,
    () => false,
  )

  // 把当前值同步到 document 上。这个 effect 只做 DOM 副作用、不 setState，
  // 因此不会引发级联渲染。
  useEffect(() => {
    applyDesignTheme(active)
    applyVibrantPalette(vibrant)
  }, [active, vibrant])

  const handleSelect = useCallback((keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') return
    const selected = [...keys][0]
    if (typeof selected !== 'string' || !isDesignThemeId(selected)) return

    setStoredDesignTheme(selected)
  }, [])

  const handleVibrantToggle = useCallback((isSelected: boolean) => {
    setStoredVibrant(isSelected)
  }, [])

  const current = THEMES.find((theme) => theme.id === active)
  // 不再需要单独的 mounted 标志：useSyncExternalStore 在 SSR 与水合期间返回
  // 服务端快照（default），水合完成后才切到真实值，效果与原来的 mounted 一致。
  const showAvatar = active !== 'default' && current

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
