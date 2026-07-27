import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import { getSupabaseEnvOrNull } from './env'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

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
        supabaseResponse = NextResponse.next({
          request,
        })
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

  const pathname = request.nextUrl.pathname
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/auth')

  if (!user && pathname.startsWith('/dashboard')) {
    const urlRedirect = request.nextUrl.clone()
    urlRedirect.pathname = '/login'
    urlRedirect.searchParams.set('next', pathname)
    return NextResponse.redirect(urlRedirect)
  }

  if (user && isAuthRoute && !pathname.startsWith('/auth/callback')) {
    const urlRedirect = request.nextUrl.clone()
    urlRedirect.pathname = '/dashboard'
    return NextResponse.redirect(urlRedirect)
  }

  return supabaseResponse
}
