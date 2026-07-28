-- 微信身份映射（对应 docs/auth-design.md 的 OAuth 章节）
--
-- 微信登录时会以合成邮箱在 auth.users 建号，真正稳定的身份是 unionid。
-- 把它落到 profiles 上，便于按微信身份查人，也便于后续做账号绑定/解绑。

alter table public.profiles
  add column if not exists wechat_openid  text,
  add column if not exists wechat_unionid text;

comment on column public.profiles.wechat_unionid is
  '微信开放平台 unionid，同一开放平台账号下跨应用唯一。未绑定开放平台时为空。';

-- unionid 必须唯一：两个 profile 指向同一个微信身份意味着账号被劫持或数据错乱。
-- 用部分索引，避免大量 NULL 相互冲突。
create unique index if not exists profiles_wechat_unionid_key
  on public.profiles (wechat_unionid)
  where wechat_unionid is not null;

create unique index if not exists profiles_wechat_openid_key
  on public.profiles (wechat_openid)
  where wechat_openid is not null;

-- 建档 trigger 需要同步把微信字段从 user_metadata 落进来。
-- 覆盖 0001 中的版本。
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
  return new;
end;
$$;
