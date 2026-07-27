'use client'

import { cn } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTheme } from 'next-themes'
import { ComponentProps, useEffect, useState } from 'react'
import { tv } from 'tailwind-variants'

const itemVariants = tv({
  base: 'flex size-7 items-center justify-center rounded-full p-1.5 text-muted',
  variants: {
    active: {
      false: 'text-muted',
      true: 'bg-accent text-accent-foreground',
    },
  },
})

const modes = [
  { key: 'light', icon: 'solar:sun-bold', label: 'Light' },
  { key: 'dark', icon: 'solar:moon-bold', label: 'Dark' },
  { key: 'system', icon: 'lucide:monitor', label: 'System' },
] as const

export type ThemeToggleProps = ComponentProps<'div'> & {
  mode?: 'light-dark' | 'light-dark-system'
}

/** HeroUI docs-style theme toggle (sun / moon / system). */
export default function ThemeToggle({
  className,
  mode = 'light-dark-system',
  ...props
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const container = cn(
    'inline-flex h-9 shrink-0 items-center rounded-full border border-default/40 p-1',
    className,
  )

  if (mode === 'light-dark') {
    const value = mounted ? resolvedTheme : null

    return (
      <button
        aria-label="Toggle theme"
        className={container}
        type="button"
        onClick={() => setTheme(value === 'light' ? 'dark' : 'light')}>
        {modes
          .filter((item) => item.key !== 'system')
          .map((item) => (
            <Icon
              key={item.key}
              className={cn(itemVariants({ active: value === item.key }))}
              icon={item.icon}
            />
          ))}
      </button>
    )
  }

  const value = mounted ? theme : null

  return (
    <div className={container} {...props}>
      {modes.map((item) => (
        <button
          key={item.key}
          aria-label={item.label}
          className={cn(itemVariants({ active: value === item.key }))}
          type="button"
          onClick={() => setTheme(item.key)}>
          <Icon className="size-full" icon={item.icon} />
        </button>
      ))}
    </div>
  )
}
