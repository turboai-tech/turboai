import 'server-only'

import { z } from 'zod'

import { getWechatConfig } from './config'

const AUTHORIZE_ENDPOINT = 'https://open.weixin.qq.com/connect/qrconnect'
const TOKEN_ENDPOINT = 'https://api.weixin.qq.com/sns/oauth2/access_token'
const USERINFO_ENDPOINT = 'https://api.weixin.qq.com/sns/userinfo'

/**
 * 微信的接口即使出错也返回 HTTP 200，错误体现在 body 的 errcode 字段。
 * 因此每次调用都必须显式检查 errcode，不能只看 response.ok。
 */
const WechatError = z.object({
  errcode: z.number(),
  errmsg: z.string().optional(),
})

const TokenResponse = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string().optional(),
  openid: z.string(),
  scope: z.string().optional(),
  /** 同一开放平台账号下跨应用唯一；只有开放平台绑定后才会返回 */
  unionid: z.string().optional(),
})

const UserInfoResponse = z.object({
  openid: z.string(),
  nickname: z.string().optional(),
  headimgurl: z.string().optional(),
  unionid: z.string().optional(),
})

export type WechatUser = {
  /** 稳定身份标识：优先 unionid，回落 openid。见下方 resolveIdentity 的说明。 */
  identity: string
  openid: string
  unionid?: string
  nickname?: string
  avatarUrl?: string
}

export class WechatApiError extends Error {
  constructor(
    readonly errcode: number,
    errmsg: string,
  ) {
    super(`WeChat API error ${errcode}: ${errmsg}`)
    this.name = 'WechatApiError'
  }
}

/**
 * 构造扫码登录页地址。
 *
 * `state` 由调用方生成并同时写入 httpOnly cookie，回调时比对 —— 这是这条链路
 * 唯一的 CSRF 防护（微信网站应用不支持 PKCE）。
 */
export function buildAuthorizeUrl(state: string): string {
  const { appId, redirectUri } = getWechatConfig()

  const params = new URLSearchParams({
    appid: appId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'snsapi_login',
    state,
  })

  // 微信要求 URL 以 #wechat_redirect 结尾，缺了会被拒绝
  return `${AUTHORIZE_ENDPOINT}?${params.toString()}#wechat_redirect`
}

async function callWechat<T extends z.ZodTypeAny>(
  url: string,
  schema: T,
): Promise<z.infer<T>> {
  const response = await fetch(url, { cache: 'no-store' })
  const body: unknown = await response.json()

  const asError = WechatError.safeParse(body)
  if (asError.success && asError.data.errcode !== 0) {
    throw new WechatApiError(asError.data.errcode, asError.data.errmsg ?? '')
  }

  return schema.parse(body)
}

/** 用授权码换取 access_token 与 openid/unionid。 */
export async function exchangeCodeForToken(code: string) {
  const { appId, appSecret } = getWechatConfig()

  const params = new URLSearchParams({
    appid: appId,
    secret: appSecret,
    code,
    grant_type: 'authorization_code',
  })

  return callWechat(`${TOKEN_ENDPOINT}?${params.toString()}`, TokenResponse)
}

/** 拉取用户昵称与头像。失败不应阻断登录 —— 调用方需自行兜底。 */
export async function fetchUserInfo(accessToken: string, openid: string) {
  const params = new URLSearchParams({
    access_token: accessToken,
    openid,
    lang: 'zh_CN',
  })

  return callWechat(`${USERINFO_ENDPOINT}?${params.toString()}`, UserInfoResponse)
}

/**
 * 走完整个授权码换取流程，返回归一化后的用户。
 *
 * 身份标识优先取 unionid：同一开放平台账号下，用户在网站应用、公众号、小程序
 * 里的 openid 各不相同，只有 unionid 稳定。若未绑定开放平台拿不到 unionid，
 * 则回落到 openid —— 但那样此人日后从其他入口登录会被当成新用户，
 * 属于已知限制，应在开放平台完成绑定来消除。
 */
export async function authenticateWithCode(code: string): Promise<WechatUser> {
  const token = await exchangeCodeForToken(code)

  let profile: z.infer<typeof UserInfoResponse> | null = null
  try {
    profile = await fetchUserInfo(token.access_token, token.openid)
  } catch {
    // 拿不到昵称头像不影响登录本身，留空即可
  }

  const unionid = token.unionid ?? profile?.unionid

  return {
    identity: unionid ?? token.openid,
    openid: token.openid,
    unionid,
    nickname: profile?.nickname,
    avatarUrl: profile?.headimgurl,
  }
}
