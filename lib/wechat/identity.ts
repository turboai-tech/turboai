/**
 * 微信登录用户的合成邮箱域名。
 *
 * 微信不提供邮箱，而 Supabase 以邮箱作为用户的主要标识，因此需要合成一个。
 * 选用 `.invalid` 是 RFC 2606 保留的顶级域，**保证不可解析、不可路由**，
 * 任何人都无法收取该域名下的邮件。
 *
 * 注册表单必须拒绝这个域名 —— 否则有人抢注 `wx_<unionid>@…` 就等于劫持了
 * 对应的微信账号。见 `isReservedAuthEmail`。
 *
 * 这个模块刻意不加 `server-only`：注册表单（客户端组件）需要用它做校验。
 * 这里只有常量与纯函数，不含任何密钥。
 */
export const WECHAT_EMAIL_DOMAIN = 'wechat.invalid'

/** 保留给内部身份映射、不允许用户自行注册的邮箱域名。 */
const RESERVED_DOMAINS = [WECHAT_EMAIL_DOMAIN]

export function isReservedAuthEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split('@').at(-1)
  return domain ? RESERVED_DOMAINS.includes(domain) : false
}
