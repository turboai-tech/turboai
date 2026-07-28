import 'server-only'

/**
 * 微信开放平台「网站应用」配置（扫码登录）。
 *
 * 注意这与公众号网页授权、企业微信是三套不同的产品，appid 不通用：
 * - 网站应用（本文件）：PC 浏览器弹二维码，scope=snsapi_login
 * - 公众号网页授权：仅在微信内置浏览器可用，scope=snsapi_userinfo
 * - 企业微信：面向内部员工，另有一套 API
 */
export interface WechatConfig {
  appId: string
  appSecret: string
  /** 必须与开放平台后台「授权回调域」配置一致，否则微信侧直接报 redirect_uri 错误 */
  redirectUri: string
}

export function getWechatConfig(): WechatConfig {
  const appId = process.env.WECHAT_WEB_APP_ID?.trim()
  const appSecret = process.env.WECHAT_WEB_APP_SECRET?.trim()
  const redirectUri = process.env.WECHAT_WEB_REDIRECT_URI?.trim()

  if (!appId || !appSecret || !redirectUri) {
    throw new Error(
      'WeChat login requires WECHAT_WEB_APP_ID, WECHAT_WEB_APP_SECRET and WECHAT_WEB_REDIRECT_URI. Set them in the server environment only.',
    )
  }

  return { appId, appSecret, redirectUri }
}

export function getWechatConfigOrNull(): WechatConfig | null {
  try {
    return getWechatConfig()
  } catch {
    return null
  }
}
