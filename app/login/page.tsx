import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Suspense } from 'react'

import AuthCard from '@/components/auth/auth-card'
import LoginForm from '@/components/auth/login-form'
import OAuthButtons from '@/components/auth/oauth-buttons'
import { getWechatConfigOrNull } from '@/lib/wechat/config'

export default async function LoginPage() {
  const t = await getTranslations('Auth')
  // 未配置微信环境变量时不渲染该按钮，避免用户点了才发现不可用
  const wechatEnabled = getWechatConfigOrNull() !== null

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center py-4">
      <Suspense
        fallback={
          <div className="bg-default/30 h-[480px] w-full max-w-[420px] animate-pulse rounded-3xl" />
        }
      >
        <AuthCard
          description={t('sign_in_description')}
          oauth={<OAuthButtons wechatEnabled={wechatEnabled} />}
          oauthLabel={t('or')}
          title={t('sign_in_title')}
          footer={
            <>
              {t('no_account')}&nbsp;
              <Link className="text-accent font-medium hover:underline" href="/signup">
                {t('sign_up')}
              </Link>
            </>
          }
        >
          <LoginForm />
        </AuthCard>
      </Suspense>

      <Link className="text-muted hover:text-accent mt-2 text-sm transition-colors" href="/">
        {t('back_home')}
      </Link>
    </div>
  )
}
