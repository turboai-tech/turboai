function isHttpUrl(value: string) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim()

  if (!url || !key || !isHttpUrl(url)) {
    throw new Error(
      'Set NEXT_PUBLIC_SUPABASE_URL to https://<project-ref>.supabase.co and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to the publishable/anon key (not the secret key).',
    )
  }

  if (key.startsWith('sb_secret_') || key.includes('service_role')) {
    throw new Error(
      'Do not use the Supabase secret/service_role key in NEXT_PUBLIC_* variables. Use the publishable or anon key.',
    )
  }

  return { url, key }
}

export function getSupabaseEnvOrNull() {
  try {
    return getSupabaseEnv()
  } catch {
    return null
  }
}
