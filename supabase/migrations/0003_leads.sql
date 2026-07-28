-- 客户留资（lead capture）
--
-- 未登录访客提交关键信息；当同一邮箱的用户日后登录时，把这些信息补充到
-- 他的 profile 上。
--
-- 两个贯穿本文件的安全前提：
--
--  1. 留资里的邮箱**未经验证** —— 任何人都能用别人的邮箱提交。因此认领时
--     只填 profile 上的空字段，绝不覆盖已有值（见 claim_leads_for_user）。
--     否则攻击者可以往受害者的资料里注入内容。
--  2. 匿名角色只能 INSERT，**不能 SELECT** —— 留资表就是销售线索库，
--     可读即等于整个销售管线泄露。

-- ---------------------------------------------------------------- profiles 扩展
alter table public.profiles
  add column if not exists country          text,
  add column if not exists industry         text,
  add column if not exists job_title        text,
  add column if not exists phone            text,
  add column if not exists product_interest text[];

comment on column public.profiles.product_interest is
  '感兴趣的产品代号，取值来自应用层的产品清单（ignition / chat / label / voice / reel）。';

-- ---------------------------------------------------------------- leads
create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),

  -- 认领的依据。存小写以便大小写不敏感匹配 —— 用户注册时用 Foo@x.com、
  -- 留资时用 foo@x.com 是很常见的，不归一化就永远认领不上。
  email            text not null,
  phone            text,
  full_name        text,
  country          text,
  industry         text,
  job_title        text,
  product_interest text[] not null default '{}',
  message          text,

  -- 归因：从哪个页面来的，便于判断哪些内容真的带来了线索
  source           text,
  locale           text,

  claimed_by       uuid references auth.users (id) on delete set null,
  claimed_at       timestamptz,

  created_at       timestamptz not null default now()
);

create index if not exists leads_email_idx on public.leads (lower(email));
create index if not exists leads_unclaimed_idx
  on public.leads (lower(email)) where claimed_by is null;
create index if not exists leads_created_at_idx on public.leads (created_at desc);

comment on table public.leads is
  '未登录访客提交的留资。邮箱未经验证，认领时只能填补 profile 的空字段。';

-- ---------------------------------------------------------------- RLS
alter table public.leads enable row level security;

-- 匿名与已登录用户都可以提交。
-- 刻意**不建 select 策略**：没有 select 策略意味着这两个角色一行都读不到。
-- 读取线索只能通过 service role（后台/销售系统），普通用户拿不到。
drop policy if exists "leads_insert_anyone" on public.leads;
create policy "leads_insert_anyone" on public.leads
  for insert
  to anon, authenticated
  with check (
    -- 只允许插入未认领的行：否则提交时带上 claimed_by 就能伪造归属
    claimed_by is null
    and claimed_at is null
  );

-- 已登录用户可以看到「已经认领到自己名下」的留资，用于在资料页展示来源。
drop policy if exists "leads_select_own_claimed" on public.leads;
create policy "leads_select_own_claimed" on public.leads
  for select
  to authenticated
  using (claimed_by = auth.uid());

grant insert on public.leads to anon, authenticated;
grant select on public.leads to authenticated;

-- ---------------------------------------------------------------- 认领
--
-- 把某个用户名下所有未认领、且邮箱匹配的留资合并进他的 profile。
--
-- 合并规则：**只填空字段**。留资邮箱未经验证，若允许覆盖，任何人都能通过
-- 提交留资来改写他人资料。product_interest 做并集而非替换，因为多次留资
-- 表达的是累加的兴趣。
create or replace function public.claim_leads_for_user(target_user uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  target_email text;
  claimed_count integer;
begin
  select email into target_email from auth.users where id = target_user;
  if target_email is null then
    return 0;
  end if;

  with matched as (
    update public.leads
       set claimed_by = target_user,
           claimed_at = now()
     where claimed_by is null
       and lower(email) = lower(target_email)
    returning *
  ),
  -- 同一邮箱可能留资多次，按时间取每个字段最近一次的非空值
  merged as (
    select
      (array_remove(array_agg(phone     order by created_at desc), null))[1] as phone,
      (array_remove(array_agg(full_name order by created_at desc), null))[1] as full_name,
      (array_remove(array_agg(country   order by created_at desc), null))[1] as country,
      (array_remove(array_agg(industry  order by created_at desc), null))[1] as industry,
      (array_remove(array_agg(job_title order by created_at desc), null))[1] as job_title,
      (select array_agg(distinct interest)
         from matched m2, unnest(m2.product_interest) as interest) as interests,
      count(*)::integer as n
    from matched
  )
  update public.profiles p
     set phone      = coalesce(p.phone, merged.phone),
         full_name  = coalesce(p.full_name, merged.full_name),
         country    = coalesce(p.country, merged.country),
         industry   = coalesce(p.industry, merged.industry),
         job_title  = coalesce(p.job_title, merged.job_title),
         -- 兴趣做并集：多次留资表达的是累加的意向，不是替换
         product_interest = (
           select array_agg(distinct x)
             from unnest(
               coalesce(p.product_interest, '{}') || coalesce(merged.interests, '{}')
             ) as x
         )
    from merged
   where p.id = target_user
     and merged.n > 0
  returning merged.n into claimed_count;

  return coalesce(claimed_count, 0);
end;
$$;

comment on function public.claim_leads_for_user is
  '把邮箱匹配的未认领留资并入用户 profile。只填空字段 —— 留资邮箱未经验证。';

grant execute on function public.claim_leads_for_user(uuid) to authenticated;

-- ---------------------------------------------------------------- 注册即认领
--
-- 新用户建档后立刻认领。覆盖 0002 中的版本。
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, email, full_name, avatar_url, wechat_openid, wechat_unionid
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    new.raw_user_meta_data ->> 'wechat_openid',
    new.raw_user_meta_data ->> 'wechat_unionid'
  )
  on conflict (id) do nothing;

  -- 注册前留过资的，在这里补上。已有账号的用户走应用层的 lead.claim。
  perform public.claim_leads_for_user(new.id);

  return new;
end;
$$;
