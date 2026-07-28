'use client'

import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

export default function AuthGate({
  signedIn,
  signedOut,
}: {
  signedIn: React.ReactNode
  signedOut: React.ReactNode
}) {
  // 在渲染期就确定客户端能否创建：这样「Supabase 未配置」这个事实不需要靠
  // effect 里的同步 setState 来传达，ready 的初值直接就是正确的。
  const [supabase] = useState(() => {
    try {
      return createClient()
    } catch {
      return null
    }
  })

  const [ready, setReady] = useState(supabase === null)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getUser().then(({ data }) => {
      setIsSignedIn(Boolean(data.user))
      setReady(true)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session?.user))
      setReady(true)
    })

    return () => data.subscription.unsubscribe()
  }, [supabase])

  if (!ready) {
    return <div aria-hidden className="h-8 w-8" />
  }

  return <>{isSignedIn ? signedIn : signedOut}</>
}
