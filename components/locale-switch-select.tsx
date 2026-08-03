'use client'

import { Button, Dropdown, Label } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import React, { useEffect, useTransition } from 'react'

import { usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/config'

type Props = {
  defaultValue: string
  items: Array<{ value: string; label: string }>
  label: string
}

/**
 * HeroUI docs pattern: pass a Button as the Dropdown child (MenuTrigger),
 * never nest Button inside Dropdown.Trigger.
 */
export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [selected, setSelected] = React.useState(
    items.find((item) => item.value === defaultValue) || items[0],
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(items.find((item) => item.value === locale) || items[0])
  }, [locale, items])

  const iconMap: Record<string, string> = {
    en: 'twemoji:flag-united-states',
    'zh-CN': 'twemoji:flag-china',
    ja: 'twemoji:flag-japan',
  }

  function onChange(value: string) {
    const next = items.find((item) => item.value === value)
    if (!next) return
    setSelected(next)
    startTransition(() => {
      router.replace(pathname, { locale: value as Locale })
    })
  }

  return (
    <Dropdown>
      <Button
        isIconOnly
        aria-label={label}
        className="h-9 w-9 shrink-0"
        size="sm"
        variant="tertiary">
        <Icon className="size-4 text-muted" icon="lucide:languages" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          selectedKeys={new Set([selected.value])}
          selectionMode="single"
          onSelectionChange={(keys) => {
            if (keys === 'all') return
            const next = keys.values().next().value
            if (typeof next === 'string' && next !== selected.value) {
              onChange(next)
            }
          }}>
          <Dropdown.Section>
            {items.map((item) => (
              <Dropdown.Item
                key={item.value}
                className="gap-2"
                id={item.value}
                textValue={item.label}>
                <Dropdown.ItemIndicator />
                <Icon
                  className="size-4 shrink-0"
                  icon={iconMap[item.value] || 'mdi:translate'}
                />
                <Label>{item.label}</Label>
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
