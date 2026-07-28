import type { SupabaseClient, User } from '@supabase/supabase-js';

import { createContextInner, type Context } from './context';

/**
 * 构造一个「已登录」的 tRPC 上下文，供测试直接调用 `protectedProcedure`。
 *
 * 走 `createContextInner` 而非 `createContext`，避免测试依赖真实的 cookie 与
 * Supabase 网络请求。
 */
export function createAuthedContext(overrides: Partial<Context> = {}): Context {
  const user = {
    id: '00000000-0000-4000-8000-000000000001',
    email: 'test@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date(0).toISOString(),
  } as User;

  return createContextInner({
    user,
    // 测试不触达 Supabase，故留空桩；一旦某个 procedure 真的用到 ctx.supabase，
    // 会在测试中显式报错，而不是静默连上真实数据库。
    supabase: null as unknown as SupabaseClient,
    ...overrides,
  });
}

/**
 * 构造一个匿名上下文，用于验证 `protectedProcedure` 确实会拒绝未登录请求。
 */
export function createAnonymousContext(): Context {
  return createContextInner({
    user: null,
    supabase: null as unknown as SupabaseClient,
  });
}
