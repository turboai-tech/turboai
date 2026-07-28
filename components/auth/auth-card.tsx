import { Separator } from '@heroui/react'
import type { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
  /** 第三方登录区，与表单之间自动插入分隔线 */
  oauth?: ReactNode
  oauthLabel?: string
  footer?: ReactNode
}

/**
 * 登录 / 注册 / 找回密码共用的卡片外壳。
 *
 * 抽出来是因为这几页的外观完全一致 —— 各写一份必然在后续迭代中走样。
 *
 * 样式用站点自己的语义 token（surface / muted / accent / default）而不是
 * HeroUI 的调色板类。HeroUI v3 已经不提供 bg-content1、shadow-small 这类
 * v2 时代的工具类，写了也不会生成任何样式。
 */
export default function AuthCard({
  title,
  description,
  children,
  oauth,
  oauthLabel,
  footer,
}: AuthCardProps) {
  return (
    <div className="w-full px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[420px]">
        <div className="border-default/40 bg-surface rounded-3xl border p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] sm:p-8">
          <div className="mb-6 flex flex-col gap-1.5">
            <h1 className="text-foreground text-xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="text-muted text-sm leading-relaxed">{description}</p>
          </div>

          {children}

          {oauth ? (
            <>
              <div className="my-6 flex items-center gap-3">
                <Separator className="bg-default/40 h-px flex-1" />
                <span className="text-muted text-xs font-medium tracking-wide uppercase">
                  {oauthLabel}
                </span>
                <Separator className="bg-default/40 h-px flex-1" />
              </div>
              {oauth}
            </>
          ) : null}
        </div>

        {footer ? (
          <p className="text-muted mt-6 text-center text-sm">{footer}</p>
        ) : null}
      </div>
    </div>
  )
}
