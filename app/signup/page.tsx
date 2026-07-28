import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import AuthCard from '@/components/auth/auth-card'
import OAuthButtons from '@/components/auth/oauth-buttons'
import SignupForm from '@/components/auth/signup-form'
import { getWechatConfigOrNull } from '@/lib/wechat/config'

export default async function SignupPage() {
  const t = await getTranslations('Auth')
  const wechatEnabled = getWechatConfigOrNull() !== null

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center">
      <AuthCard
        description={t('sign_up_description')}
        oauth={<OAuthButtons wechatEnabled={wechatEnabled} />}
        oauthLabel={t('or')}
        title={t('sign_up_title')}
        footer={
          <>
            {t('have_account')}&nbsp;
            <Link className="hover:underline" href="/login">
              {t('sign_in')}
            </Link>
          </>
        }
      >
        <SignupForm />
      </AuthCard>

      <Link className="text-small text-default-500 hover:underline" href="/">
        {t('back_home')}
      </Link>
    </div>
  )
}
