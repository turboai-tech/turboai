-- 限流与审计（对应 docs/auth-design.md M3）
--
-- 关于登录限流的范围说明，先讲清楚，免得这套东西被误当成防线：
--
--   登录与密码重置是**浏览器直连 Supabase** 的（anon key 本就公开在前端包里）。
--   攻击者读出 URL 和 key 就能直接打 Supabase 的 auth 接口，根本不经过我们。
--   因此登录限流只能在 Supabase Dashboard 配置，应用层做了也是摆设。
--
--   这里的限流保护的是**我们自己拥有的公开写接口** —— 目前是留资提交和
--   微信回调。那两个没有任何上游保护，是真实的滥用目标。

-- ---------------------------------------------------------------- 限流
--
-- 固定窗口计数。选它而不是滑动窗口，是因为一次 upsert 就能完成判定，
-- 代价是窗口交界处最多可能放过 2 倍额度的突发 —— 对「防滥用」这个目标
-- 足够，对「精确配额」不够。需要精确时再换成滑动窗口。
create table if not exists public.rate_limit_hits (
  bucket       text        not null,
  window_start timestamptz not null,
  hits         integer     not null default 0,
  primary key (bucket, window_start)
);

comment on table public.rate_limit_hits is
  '固定窗口限流计数。bucket 形如 "lead_submit:ip:1.2.3.4"。需定期清理过期行。';

create index if not exists rate_limit_hits_window_idx
  on public.rate_limit_hits (window_start);

/**
 * 记一次命中并返回是否放行。
 *
 * 返回 true 表示允许，false 表示超限。
 *
 * 用 security definer：调用方（anon / authenticated）不应该能直接读写计数表，
 * 否则清空自己的计数即可绕过限流。
 */
create or replace function public.check_rate_limit(
  p_bucket text,
  p_limit  integer,
  p_window interval
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_window timestamptz;
  current_hits   integer;
begin
  -- 把当前时间对齐到窗口起点。to_timestamp(floor(epoch/秒数)*秒数) 在任意
  -- 窗口长度下都成立，不必为「整分钟/整小时」写特例。
  current_window := to_timestamp(
    floor(extract(epoch from now()) / extract(epoch from p_window))
    * extract(epoch from p_window)
  );

  insert into public.rate_limit_hits (bucket, window_start, hits)
  values (p_bucket, current_window, 1)
  on conflict (bucket, window_start)
    do update set hits = public.rate_limit_hits.hits + 1
  returning hits into current_hits;

  return current_hits <= p_limit;
end;
$$;

revoke all on function public.check_rate_limit(text, integer, interval) from public;

/** 清理过期计数。建议用 pg_cron 每小时跑一次。 */
create or replace function public.prune_rate_limit_hits(p_keep interval default '24 hours')
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  removed integer;
begin
  delete from public.rate_limit_hits
   where window_start < now() - p_keep;
  get diagnostics removed = row_count;
  return removed;
end;
$$;

-- 计数表不对普通角色开放：只能经 check_rate_limit 间接写入
alter table public.rate_limit_hits enable row level security;

-- ---------------------------------------------------------------- 审计
--
-- 只记录**服务端能观察到**的事件。登录/登出发生在浏览器与 Supabase 之间，
-- 我们看不到，那部分请查 Supabase Dashboard 自带的 Auth Logs —— 在这里
-- 补一份客户端自报的记录只会得到一份可以被伪造的日志，比没有更糟。
create table if not exists public.auth_events (
  id         bigserial   primary key,
  event      text        not null,
  user_id    uuid        references auth.users (id) on delete set null,
  email      text,
  ip         inet,
  user_agent text,
  success    boolean     not null default true,
  detail     jsonb       not null default '{}',
  created_at timestamptz not null default now()
);

comment on table public.auth_events is
  '服务端可观察事件的审计流水。登录/登出不在此列 —— 那是浏览器直连 Supabase 的。';

create index if not exists auth_events_user_idx on public.auth_events (user_id, created_at desc);
create index if not exists auth_events_event_idx on public.auth_events (event, created_at desc);
create index if not exists auth_events_created_idx on public.auth_events (created_at desc);

alter table public.auth_events enable row level security;

-- 只允许用户查自己的记录；写入一律走 service role。
-- 刻意不给 insert 策略：客户端可写的审计日志等于可伪造的审计日志。
drop policy if exists "auth_events_select_own" on public.auth_events;
create policy "auth_events_select_own" on public.auth_events
  for select
  to authenticated
  using (user_id = auth.uid());

grant select on public.auth_events to authenticated;
