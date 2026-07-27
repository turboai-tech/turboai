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
  const [ready, setReady] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined

    try {
      const supabase = createClient()

      supabase.auth.getUser().then(({ data }) => {
        setIsSignedIn(Boolean(data.user))
        setReady(true)
      })

      const result = supabase.auth.onAuthStateChange((_event, session) => {
        setIsSignedIn(Boolean(session?.user))
        setReady(true)
      })
      subscription = result.data.subscription
    } catch {
      setIsSignedIn(false)
      setReady(true)
    }

    return () => subscription?.unsubscribe()
  }, [])

  if (!ready) {
    return <div aria-hidden className="h-8 w-8" />
  }

  return <>{isSignedIn ? signedIn : signedOut}</>
}
