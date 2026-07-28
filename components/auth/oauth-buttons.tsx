'use client'

import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { createClient } from '@/lib/supabase/client'

interface OAuthButtonsProps {
  /** 登录成功后的落地路径 */
  next?: string
  /** 微信未配置时隐藏对应按钮，避免点了才报错 */
  wechatEnabled?: boolean
}

export default function OAuthButtons({
  next = '/dashboard',
  wechatEnabled = true,
}: OAuthButtonsProps) {
  const t = useTranslations('Auth')
  const [pending, setPending] = useState<'google' | 'wechat' | null>(null)

  async function signInWithGoogle() {
    setPending('google')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })

    // 成功时浏览器已经在跳转，不会走到这里；失败才需要恢复按钮
    if (error) setPending(null)
  }

  function signInWithWechat() {
    setPending('wechat')
    // 微信不走 Supabase SDK：它不是内置 provider，也不签发 OIDC ID token。
    // 由服务端路由生成 state 并重定向到扫码页，详见 app/auth/wechat/start。
    window.location.href = `/auth/wechat/start?next=${encodeURIComponent(next)}`
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Button
        className="border-default/50 hover:bg-default/20 w-full justify-center gap-2.5 transition-colors"
        variant="outline"
        isDisabled={pending !== null}
        onPress={signInWithGoogle}
      >
        <Icon icon="flat-color-icons:google" width={18} />
        {t('continue_with_google')}
      </Button>

      {wechatEnabled ? (
        <Button
          className="border-default/50 hover:bg-default/20 w-full justify-center gap-2.5 transition-colors"
          variant="outline"
          isDisabled={pending !== null}
          onPress={signInWithWechat}
        >
          <Icon icon="ri:wechat-fill" width={18} className="text-[#07C160]" />
          {t('continue_with_wechat')}
        </Button>
      ) : null}
    </div>
  )
}
