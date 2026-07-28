-- 用户档案表（对应 docs/auth-design.md §3.3）
--
-- Supabase 的 auth.users 位于独立 schema，不适合被业务表直接外键引用，
-- 也不该承载应用侧字段。这张表是 auth.users 与业务数据之间的映射层。
--
-- 关于多组织：本次刻意不加 org_id。多组织的语义（一个用户属于多个组织、
-- 当前组织如何切换、资源归属谁）尚未确定，见 docs/auth-design.md §9 问题 1。
-- 待确定后以 M4 的独立迁移补上 —— 加一个可空外键是廉价操作，先猜错语义不是。

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text,
  avatar_url  text,
  -- member | admin | owner。用 text + check 而非 enum：增删角色不必改类型。
  role        text not null default 'member'
                check (role in ('member', 'admin', 'owner')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is
  '应用侧用户档案，与 auth.users 一一对应。角色与业务字段放这里，不动 auth schema。';

-- ---------------------------------------------------------------- RLS
-- 必须开：租户/用户隔离不能只靠应用层记得写 where 条件，数据库要有兜底。
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select
  using (auth.uid() = id);

-- 只允许改自己的行。注意 role 字段的提权风险：这条策略允许用户 update 自己
-- 这一行的任意列，包括把自己的 role 改成 owner。下面的 trigger 负责堵住。
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------- 防提权
-- 普通用户不得改自己的 role。角色变更只能由 service role（后台/管理接口）执行。
create or replace function public.prevent_role_self_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role
     and auth.uid() is not null
     and auth.role() <> 'service_role' then
    raise exception '不允许修改自己的角色';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_block_role_escalation on public.profiles;
create trigger profiles_block_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_role_self_escalation();

-- ---------------------------------------------------------------- 自动建档
-- 在应用层建档必然会漏（OAuth 注册、邀请注册、后台创建各有各的路径），
-- 所以放在数据库 trigger 里，保证 auth.users 有一行就一定有对应 profile。
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- updated_at
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------- 回填
-- 迁移前已存在的用户不会触发 on_auth_user_created，需要补建档。
insert into public.profiles (id, email, full_name, avatar_url)
select
  u.id,
  u.email,
  u.raw_user_meta_data ->> 'full_name',
  u.raw_user_meta_data ->> 'avatar_url'
from auth.users u
on conflict (id) do nothing;
