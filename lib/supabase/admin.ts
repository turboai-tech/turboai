// 这个 import 让任何来自客户端组件的引用在构建期直接失败 —— service role key
// 一旦进入浏览器包，就等于把整个数据库的读写权限公开出去。
import 'server-only'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

import { getSupabaseEnv } from './env'

/**
 * service role 客户端：**绕过 RLS**，拥有完全权限。
 *
 * 只在确实需要越过用户身份的场景使用（当前只有一处：微信登录回调里按 unionid
 * 建号并签发会话 —— 那时用户还没有会话，无法用普通客户端完成）。
 *
 * 使用规则：
 * - 绝不接受来自请求的参数直接作为查询条件，除非已在上游校验过
 * - 绝不在客户端组件、也不在任何会被客户端 import 的模块中引用
 * - 用完即弃，不要挂到模块级单例上跨请求复用
 */
export function createAdminClient() {
  const { url } = getSupabaseEnv()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is required for admin operations. Set it in the server environment only — never in a NEXT_PUBLIC_* variable.',
    )
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      // 服务端不需要持久化会话，也不该自动续期 —— 这个客户端不代表任何用户。
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
