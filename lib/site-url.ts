/**
 * Resolve the public site origin behind reverse proxies.
 *
 * On Aliyun ECS / Nginx, Next often sees `http://localhost:3000` as request.url.
 * Using that for post-auth redirects sends users to localhost after Google login.
 */
export function getRequestOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '')
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured
  }

  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = (forwardedHost ?? request.headers.get('host'))
    ?.split(',')[0]
    ?.trim()

  if (host && !host.startsWith('localhost') && !host.startsWith('127.0.0.1')) {
    const proto = (
      request.headers.get('x-forwarded-proto') ??
      (host.includes('localhost') ? 'http' : 'https')
    )
      .split(',')[0]
      ?.trim()
    return `${proto}://${host}`
  }

  return new URL(request.url).origin
}
