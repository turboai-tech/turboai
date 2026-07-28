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
 * 登录 / 注册共用的卡片外壳。
 *
 * 抽出来是因为两页的外观完全一致 —— 各写一份必然在后续迭代中走样。
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
    <div className="flex w-full items-center justify-center px-4 py-16">
      <div className="rounded-large bg-content1 shadow-small flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">{title}</h1>
          <p className="text-small text-default-500">{description}</p>
        </div>

        {children}

        {oauth ? (
          <>
            <div className="flex items-center gap-4 py-2">
              <Separator className="flex-1" />
              <p className="text-tiny text-default-500 shrink-0">{oauthLabel}</p>
              <Separator className="flex-1" />
            </div>
            {oauth}
          </>
        ) : null}

        {footer ? <div className="text-small text-center">{footer}</div> : null}
      </div>
    </div>
  )
}
