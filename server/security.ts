import 'server-only';

import { TRPCError } from '@trpc/server';

import { createAdminClient } from '@/lib/supabase/admin';

/**
 * 限流与审计的服务端工具。
 *
 * **适用范围**：只保护我们自己拥有的公开接口（留资提交、微信回调）。
 * 登录与密码重置是浏览器直连 Supabase 的 —— anon key 本就公开在前端包里，
 * 攻击者绕过我们直接打 Supabase 即可，因此那两处的限流只能在 Supabase
 * Dashboard 配置。详见 docs/auth-design.md §5。
 */

export interface RateLimitRule {
  /** 分桶前缀，例如 'lead_submit' */
  name: string;
  limit: number;
  /** Postgres interval 字面量，例如 '1 hour' */
  window: string;
}

export const RATE_LIMITS = {
  /** 留资提交：单 IP 每小时 5 次。真人填一次表单不会碰到，脚本会。 */
  leadSubmit: { name: 'lead_submit', limit: 5, window: '1 hour' },
  /** 微信回调：单 IP 每小时 20 次，防止拿伪造 code 反复触发换取请求。 */
  wechatCallback: { name: 'wechat_callback', limit: 20, window: '1 hour' },
} satisfies Record<string, RateLimitRule>;

/**
 * 记一次命中并判断是否放行。
 *
 * **取不到 IP 时放行**（fail-open）。这是刻意的：限流的目的是防滥用，不是
 * 鉴权；若因为拿不到 IP 就拒绝，正常用户会在反代配置异常时被整片挡住，
 * 代价远大于放过一些请求。真正的安全边界在鉴权和 RLS，不在这里。
 */
export async function checkRateLimit(
  rule: RateLimitRule,
  identifier: string | null,
): Promise<boolean> {
  if (!identifier) return true;

  // 整段都要包起来，不能只判 rpc 返回的 error：createAdminClient() 在缺少
  // service role key 时是**同步抛错**的，漏掉它就会让一个配置问题把整个
  // 被保护的接口打挂 —— 限流反倒成了单点故障，与它的目的正好相反。
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.rpc('check_rate_limit', {
      p_bucket: `${rule.name}:${identifier}`,
      p_limit: rule.limit,
      p_window: rule.window,
    });

    if (error) {
      console.error('[rate-limit] check failed', { rule: rule.name, error });
      return true;
    }

    return data !== false;
  } catch (error) {
    console.error('[rate-limit] check threw', { rule: rule.name, error });
    return true;
  }
}

/** 超限时抛出 TOO_MANY_REQUESTS。 */
export async function enforceRateLimit(
  rule: RateLimitRule,
  identifier: string | null,
): Promise<void> {
  const allowed = await checkRateLimit(rule, identifier);
  if (!allowed) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests. Please try again later.',
    });
  }
}

export interface AuditEvent {
  event: string;
  userId?: string | null;
  email?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  success?: boolean;
  detail?: Record<string, unknown>;
}

/**
 * 写一条审计记录。
 *
 * **绝不抛错**：审计失败不应该让业务操作跟着失败 —— 那会把一个日志问题
 * 升级成一次用户可见的故障。写不进去就记到 stderr，由日志采集兜底。
 */
export async function recordAuthEvent(entry: AuditEvent): Promise<void> {
  try {
    const admin = createAdminClient();
    const { error } = await admin.from('auth_events').insert({
      event: entry.event,
      user_id: entry.userId ?? null,
      email: entry.email ?? null,
      ip: entry.ip ?? null,
      user_agent: entry.userAgent ?? null,
      success: entry.success ?? true,
      detail: entry.detail ?? {},
    });
    if (error) {
      console.error('[audit] insert failed', { event: entry.event, error });
    }
  } catch (error) {
    console.error('[audit] insert threw', { event: entry.event, error });
  }
}
