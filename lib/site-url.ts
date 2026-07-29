/**
 * Resolve the public site origin behind reverse proxies.
 *
 * On Aliyun ECS / Nginx, Next often sees `http://localhost:3000` as request.url.
 * Using that for post-auth redirects sends users to localhost after Google login.
 *
 * Prefer the live request host when it is a real public host (so www vs apex stays
 * consistent with the URL the user is on). Fall back to SITE_URL / NEXT_PUBLIC_SITE_URL.
 */
export function getRequestOrigin(request: Request): string {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = (forwardedHost ?? request.headers.get('host'))
    ?.split(',')[0]
    ?.trim()

  if (host && !isLocalHost(host)) {
    const proto = (
      request.headers.get('x-forwarded-proto') ??
      (isLocalHost(host) ? 'http' : 'https')
    )
      .split(',')[0]
      ?.trim()
    return `${proto}://${host}`
  }

  const configured = (
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL
  )
    ?.trim()
    .replace(/\/$/, '')

  if (configured && /^https?:\/\//i.test(configured)) {
    return configured
  }

  return new URL(request.url).origin
}

/** Browser-safe public origin for OAuth redirectTo. */
export function getPublicSiteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '')
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return 'http://localhost:3000'
}

function isLocalHost(host: string): boolean {
  return (
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.startsWith('[::1]')
  )
}
