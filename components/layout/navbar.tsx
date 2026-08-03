'use client'

import { Logo } from '@/components/icons'
import AuthGate from '@/components/auth/auth-gate'
import UserMenu from '@/components/auth/user-menu'
import ButtonLink from '@/components/button-link'
import { cn } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import { useEffect, useState } from 'react'
import LocaleSwitcher from '../locale-switch'
import DesignThemeSelector from './design-theme-selector'
import ThemeToggle from './theme-toggle'

const navItems = [
  { key: 'overview', href: '/' },
  { key: 'solutions', href: '/solutions' },
  { key: 'products', href: '/products' },
  { key: 'pricing', href: '/#pricing-container' },
  { key: 'about', href: '/about/story' },
] as const

export default function NavbarComponent({ className }: { className?: string }) {
  const t = useTranslations('Navbar')
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : href.startsWith('/about')
        ? pathname.startsWith('/about')
        : pathname.startsWith(href.split('#')[0])

  const closeMenu = () => setIsMenuOpen(false)

  // 路由变化时收起移动端菜单。用「渲染期比对上一次的值」而不是 effect ——
  // effect 里同步 setState 会多一轮提交后渲染，菜单会闪一下；在渲染期调整
  // 状态时 React 会直接丢弃这次输出并立即重渲，不会有中间帧。
  // https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [lastPathname, setLastPathname] = useState(pathname)
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-default/40 backdrop-blur-md',
        isMenuOpen ? 'bg-default/40' : 'bg-background/70',
        className,
      )}>
      <div className="mx-auto grid h-14 w-[min(90%,80rem)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-2 sm:gap-4">
        <Link className="flex h-9 shrink-0 items-center gap-1" href="/">
          <Icon className="text-2xl text-accent" icon="lucide:layers" />
          <Logo className="hidden h-8 sm:block" height={32} width={96} />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden h-9 min-w-0 items-center justify-self-center gap-3 overflow-x-auto rounded-full border border-default/20 bg-background/60 px-3 whitespace-nowrap shadow-md backdrop-blur-md backdrop-saturate-150 dark:bg-default/40 xl:flex">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'shrink-0 text-sm text-muted transition-colors hover:text-foreground',
                isActive(href) && 'text-foreground',
              )}
              href={href}>
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex h-9 shrink-0 flex-nowrap items-center justify-end gap-1.5">
          <div className="hidden h-9 flex-nowrap items-center gap-1.5 lg:flex">
            <DesignThemeSelector compact />
            <LocaleSwitcher />
            <ThemeToggle className="h-9 shrink-0" />
          </div>

          {!isMenuOpen ? (
            <AuthGate
              signedOut={
                <ButtonLink
                  className="hidden h-9 shrink-0 sm:inline-flex"
                  href="/login"
                  size="sm"
                  variant="ghost">
                  {t('signin')}
                </ButtonLink>
              }
              signedIn={<UserMenu />}
            />
          ) : null}

          {!isMenuOpen ? (
            <ButtonLink
              className="hidden h-9 shrink-0 rounded-full cta-gradient px-4 text-sm font-medium whitespace-nowrap md:inline-flex"
              href="/contact"
              size="sm">
              {t('cta')}
            </ButtonLink>
          ) : null}

          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-muted xl:hidden"
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}>
            <Icon
              className="text-xl"
              icon={isMenuOpen ? 'lucide:x' : 'lucide:menu'}
            />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="max-h-[70vh] overflow-y-auto border-t border-default/40 bg-default/40 px-[10%] py-6 shadow-md backdrop-blur-md backdrop-saturate-150 xl:hidden">
          <nav aria-label="Mobile" className="flex max-w-sm flex-col gap-3">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                className="text-base text-muted hover:text-foreground"
                href={href}
                onClick={closeMenu}>
                {t(key)}
              </Link>
            ))}

            <ButtonLink
              className="mt-2 rounded-full cta-gradient font-medium"
              fullWidth
              href="/contact"
              onClick={closeMenu}>
              {t('cta')}
            </ButtonLink>

            <AuthGate
              signedOut={
                <div className="flex flex-col gap-2">
                  <ButtonLink
                    fullWidth
                    href="/login"
                    variant="outline"
                    onClick={closeMenu}>
                    {t('signin')}
                  </ButtonLink>
                  <ButtonLink
                    fullWidth
                    href="/signup"
                    variant="outline"
                    onClick={closeMenu}>
                    {t('signup')}
                  </ButtonLink>
                </div>
              }
              signedIn={<UserMenu />}
            />

            <div className="flex flex-nowrap items-center gap-2 pt-2">
              <DesignThemeSelector compact />
              <LocaleSwitcher />
              <ThemeToggle className="h-9 shrink-0" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
