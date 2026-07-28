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
  /** 客户端 IP，用于限流与审计；取不到时为 null */
  ip: string | null;
  userAgent: string | null;
}

/**
 * 不依赖请求的内部构造函数，便于测试直接注入用户，无需 mock Next.js 的请求。
 */
export function createContextInner(opts: Context): Context {
  return opts;
}

/**
 * 从请求头取客户端 IP。
 *
 * 生产环境应改为只信任已知反代注入的头 —— 否则客户端可以伪造 X-Forwarded-For
 * 来绕过基于 IP 的限流。部署到 Vercel 时优先用 x-vercel-forwarded-for，
 * 那个头由平台注入，客户端改不了。
 */
function clientIp(headers: Headers): string | null {
  const vercel = headers.get('x-vercel-forwarded-for');
  if (vercel) return vercel.split(',')[0]?.trim() || null;

  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || null;

  return headers.get('x-real-ip');
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
 */
export async function createContext(req?: Request): Promise<Context> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return createContextInner({
    user: user ?? null,
    supabase,
    ip: req ? clientIp(req.headers) : null,
    userAgent: req?.headers.get('user-agent') ?? null,
  });
}
