import type { SupabaseClient, User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';

/**
 * 每个请求的 tRPC 上下文。
 *
 * `user` 为 null 表示匿名请求 —— 这种状态下只有 `publicProcedure` 能执行，
 * `protectedProcedure` 会直接抛 UNAUTHORIZED。
 */
export interface Context {
  user: User | null;
  supabase: SupabaseClient;
}

/**
 * 不依赖请求的内部构造函数，便于测试直接注入用户，无需 mock Next.js 的请求。
 */
export function createContextInner(opts: Context): Context {
  return opts;
}

/**
 * 为一次进入的请求创建上下文。
 *
 * 会话由 `lib/supabase/server.ts` 从 cookie 还原（cookie 本身由 proxy.ts 中的
 * `updateSession` 负责续期）。
 *
 * 这里必须用 `getUser()` 而非 `getSession()`：后者只解析 cookie 内容、不校验
 * JWT 签名，伪造 cookie 即可冒充任意用户；`getUser()` 会向 Supabase 校验签名。
 * 服务端一律用前者 —— 这是本项目的安全底线，改动前请先读 docs/auth-design.md。
 *
 * @see https://trpc.io/docs/v11/context
 */
export async function createContext(): Promise<Context> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return createContextInner({ user: user ?? null, supabase });
}
