import { buttonVariants, cn } from '@heroui/react'
import type { ComponentProps, ReactNode } from 'react'

import { Link } from '@/i18n/navigation'

type ButtonVariant = NonNullable<
  Parameters<typeof buttonVariants>[0]
>['variant']
type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>['size']

type Props = {
  href: string
  children: ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  onClick?: () => void
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>

/** HeroUI v3 Button no longer accepts `href`; use this for navigation CTAs. */
export default function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  fullWidth,
  onClick,
  ...rest
}: Props) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size, fullWidth }),
        'inline-flex items-center justify-center gap-2 no-underline',
        className,
      )}
      href={href}
      onClick={onClick}
      {...rest}>
      {children}
    </Link>
  )
}
