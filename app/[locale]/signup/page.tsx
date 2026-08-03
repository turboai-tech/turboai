import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

import AuthCard from '@/components/auth/auth-card'
import OAuthButtons from '@/components/auth/oauth-buttons'
import SignupForm from '@/components/auth/signup-form'
import { getWechatConfigOrNull } from '@/lib/wechat/config'

export default async function SignupPage() {
  const t = await getTranslations('Auth')
  const wechatEnabled = getWechatConfigOrNull() !== null

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center py-4">
      <AuthCard
        description={t('sign_up_description')}
        oauth={<OAuthButtons wechatEnabled={wechatEnabled} />}
        oauthLabel={t('or')}
        title={t('sign_up_title')}
        footer={
          <>
            {t('have_account')}&nbsp;
            <Link className="text-accent font-medium hover:underline" href="/login">
              {t('sign_in')}
            </Link>
          </>
        }
      >
        <SignupForm />
      </AuthCard>

      <Link className="text-muted hover:text-accent mt-2 text-sm transition-colors" href="/">
        {t('back_home')}
      </Link>
    </div>
  )
}
