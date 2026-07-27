'use client'

import { Label, Switch } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'

export interface ThemeSwitchProps {
  className?: string
  label?: string
  showLabel?: boolean
}

/** Compact switch kept for mobile menu / labelled contexts. */
export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  label = 'Toggle theme',
  showLabel = false,
}) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Switch
      aria-label={showLabel ? undefined : label}
      className={className}
      isSelected={isDark}
      size={showLabel ? 'md' : 'sm'}
      onChange={(isSelected) => setTheme(isSelected ? 'dark' : 'light')}>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb>
            <Switch.Icon>
              <Icon
                className="text-[10px]"
                icon={isDark ? 'solar:moon-bold' : 'solar:sun-bold'}
              />
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
        {showLabel ? <Label className="text-base text-muted">{label}</Label> : null}
      </Switch.Content>
    </Switch>
  )
}
