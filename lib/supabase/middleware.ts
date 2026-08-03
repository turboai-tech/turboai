import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import { stripLocalePrefix } from '@/lib/locale-path'

import { getSupabaseEnvOrNull } from './env'

export async function updateSession(
  request: NextRequest,
  response: NextResponse = NextResponse.next({ request }),
) {
  let supabaseResponse = response

  const env = getSupabaseEnvOrNull()
  if (!env) {
    return supabaseResponse
  }

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        )
        // Preserve the upstream (e.g. next-intl) response while refreshing cookies.
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
        Object.entries(headers).forEach(([headerKey, value]) =>
          supabaseResponse.headers.set(headerKey, value),
        )
      },
    },
  })

  // Do not run code between createServerClient and auth.getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = stripLocalePrefix(request.nextUrl.pathname)
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/auth')

  if (!user && pathname.startsWith('/dashboard')) {
    const urlRedirect = request.nextUrl.clone()
    // Keep the active locale prefix when sending users to login.
    const localeMatch = request.nextUrl.pathname.match(/^\/(zh-CN|ja)(?=\/|$)/)
    urlRedirect.pathname = localeMatch ? `/${localeMatch[1]}/login` : '/login'
    urlRedirect.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(urlRedirect)
  }

  if (user && isAuthRoute && !pathname.startsWith('/auth/callback')) {
    const urlRedirect = request.nextUrl.clone()
    const localeMatch = request.nextUrl.pathname.match(/^\/(zh-CN|ja)(?=\/|$)/)
    urlRedirect.pathname = localeMatch
      ? `/${localeMatch[1]}/dashboard`
      : '/dashboard'
    return NextResponse.redirect(urlRedirect)
  }

  return supabaseResponse
}
