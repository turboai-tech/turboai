import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'

import { routing } from '@/i18n/routing'
import { updateSession } from '@/lib/supabase/middleware'

const handleI18nRouting = createMiddleware(routing)

function shouldSkipI18n(pathname: string) {
  return (
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/opengraph-image') ||
    pathname.startsWith('/twitter-image') ||
    pathname === '/llms.txt' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  )
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Auth, API, SEO assets and OG images stay outside the locale tree.
  if (shouldSkipI18n(pathname)) {
    if (
      pathname.startsWith('/opengraph-image') ||
      pathname.startsWith('/twitter-image') ||
      pathname === '/llms.txt' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml'
    ) {
      return NextResponse.next()
    }
    return updateSession(request)
  }

  const i18nResponse = handleI18nRouting(request)

  // next-intl may redirect (locale negotiation). Honour that first.
  if (i18nResponse.headers.get('location')) {
    return i18nResponse
  }

  return updateSession(request, i18nResponse)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$).*)',
  ],
}
