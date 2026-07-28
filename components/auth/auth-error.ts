/**
 * Supabase 的错误信息是英文原文，直接抛给用户在中文站上很突兀，且措辞会随
 * SDK 版本变动。这里统一映射到 i18n 键。
 *
 * 刻意不区分「用户不存在」与「密码错误」—— 两者都回落到同一条文案，
 * 否则登录接口就成了账号枚举器。这条在做「体验优化」时容易被推翻，
 * 改动前请先读 docs/auth-design.md §5。
 */
const ERROR_KEY_BY_CODE: Record<string, string> = {
  invalid_credentials: 'error_invalid_credentials',
  email_not_confirmed: 'error_email_not_confirmed',
  over_request_rate_limit: 'error_rate_limited',
  over_email_send_rate_limit: 'error_rate_limited',
  user_already_exists: 'error_user_exists',
  email_exists: 'error_user_exists',
  weak_password: 'error_weak_password',
  same_password: 'error_weak_password',
  validation_failed: 'error_validation_failed',
}

/** 回调路由通过 ?error= 传回的原因，与上面的错误码共用一套文案。 */
const ERROR_KEY_BY_REASON: Record<string, string> = {
  wechat_cancelled: 'error_wechat_cancelled',
  wechat_state_mismatch: 'error_callback',
  wechat_exchange_failed: 'error_wechat_failed',
  wechat_user_create_failed: 'error_wechat_failed',
  wechat_session_failed: 'error_wechat_failed',
  wechat_unconfigured: 'error_wechat_unconfigured',
}

export function authErrorKey(error: { code?: string; message?: string }): string {
  if (error.code && ERROR_KEY_BY_CODE[error.code]) {
    return ERROR_KEY_BY_CODE[error.code]
  }

  // 老版本 SDK 不带 code，只能从 message 兜底匹配
  const message = error.message?.toLowerCase() ?? ''
  if (message.includes('invalid login credentials')) {
    return 'error_invalid_credentials'
  }
  if (message.includes('email not confirmed')) {
    return 'error_email_not_confirmed'
  }
  if (message.includes('already registered')) {
    return 'error_user_exists'
  }

  return 'error_unknown'
}

export function callbackErrorKey(reason: string | null): string | null {
  if (!reason) return null
  return ERROR_KEY_BY_REASON[reason] ?? 'error_callback'
}
