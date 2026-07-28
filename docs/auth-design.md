# 企业级认证体系设计（Supabase Auth + tRPC）

> 目标读者：turboai 工程团队
> 范围：SignIn / SignUp 页面的企业级改造，以及 Supabase Auth 与 tRPC 的集成边界
> 状态：待确认第 9 节的问题，确认后进入实现

---

## 1. 现状盘点

盘点结论先行：**Supabase Auth 的骨架已经落地，但 tRPC 侧完全没有接上认证**。这次不是从零搭建，是补齐与加固。

### 已有

| 位置 | 内容 |
|---|---|
| `lib/supabase/{client,server,middleware,env}.ts` | 浏览器端 / 服务端 / proxy 三套 client，cookie 读写已封装 |
| `components/auth/login-form.tsx` | 邮箱密码登录，直接调浏览器端 SDK |
| `components/auth/signup-form.tsx` | 注册 + 邮件确认跳转 |
| `components/auth/{auth-gate,user-menu}.tsx` | 页面级守卫与用户菜单 |
| `app/{login,signup}/page.tsx` | 两个入口页 |
| `app/auth/callback/route.ts` | OAuth / 邮件确认回调 |
| `app/auth/signout/route.ts` | 登出 |
| `messages/*.json` 的 `Auth` 命名空间 | 18 个键，三语齐全 |

### 缺失与问题

按严重程度排序：

**P0 — tRPC 的 context 是空壳，且接线是坏的。**

```ts
// app/api/trpc/[trpc]/route.ts
createContext: () => createContext({} as CreateNextContextOptions),
```

`req` 根本没有传进去，`createContextInner` 返回 `{}`。实测结果：

- `server/routers/` 下共 **10 个 procedure，全部是 `publicProcedure`**
- `server/trpc.ts` 中**没有** `protectedProcedure` 的定义
- 所有 procedure 都拿不到当前用户，`auto_tasks`、`material`、`pagement` 任何人可调

**即：登录页已经存在，但登录与否对接口没有任何影响。** 这是本设计要解决的核心问题，也是唯一一个不应该等 UI 改造的问题。

**P1 — 登录表单缺企业级必需项。** 无 OAuth 入口、无密码可见切换、无「记住我」、无忘记密码、无密码强度校验、错误信息直接透传 Supabase 英文原文（未走 i18n）。

**P2 — 无用户档案表。** `prisma/schema.prisma` 整个文件是注释掉的，Prisma 实际未启用。Supabase 的 `auth.users` 不应直接被业务表外键引用，需要一张 `profiles` 映射表承载角色、组织归属等应用侧字段。

**P3 — 无速率限制、无审计日志。** 登录接口可被撞库。

---

## 2. 核心架构决策：认证与授权分层

这是本文档最重要的一节。

需求提出的是「通过 tRPC 集成 Supabase 的 auth login 功能」。**我的建议是：不要把登录动作本身放进 tRPC**，而是让 tRPC 承担认证之后的授权层。理由是三条硬约束，不是风格偏好：

**其一，OAuth 在物理上就走不了 tRPC。** `signInWithOAuth` 是浏览器重定向流程（跳转到 Google → 回调到 `/auth/callback`），它不是一次 RPC 调用。企业版必须支持 Google / GitHub / 未来的 SAML SSO，这部分只能是 Route Handler。

**其二，会话是 cookie，不是返回值。** `@supabase/ssr` 通过 HTTP cookie 维持会话。走 tRPC 意味着要把 `resHeaders` 一路穿透进 context 再写回 Set-Cookie —— 技术上可行，但同时和两个框架的默认路径对着干。

**其三，走服务端登录会丢掉客户端 SDK 的能力。** 浏览器端 `createBrowserClient` 自带 token 自动续期和 `onAuthStateChange` 订阅。如果登录改由服务端代理，这两样都要自己重写。

### 因此，分层如下

```
┌─ 认证层（Authentication）── Supabase SDK + Route Handler ────────┐
│  谁在访问？                                                       │
│                                                                   │
│  邮箱密码登录/注册  → 浏览器端 supabase.auth.*                    │
│  OAuth / SSO       → signInWithOAuth → /auth/callback            │
│  登出              → /auth/signout                               │
│  会话续期          → lib/supabase/middleware.ts（proxy 中执行）   │
│                                                                   │
│  产出：一个写在 cookie 里的、可被服务端读取的 session             │
└───────────────────────────┬───────────────────────────────────────┘
                            │ cookie
┌───────────────────────────▼───────────────────────────────────────┐
│─ 授权层（Authorization）── tRPC ─────────────────────────────────│
│  你能做什么？                                                     │
│                                                                   │
│  createContext  → 读 cookie 还原 user，注入 ctx                   │
│  protectedProcedure → 无 user 则抛 UNAUTHORIZED                   │
│  adminProcedure     → 校验 profiles.role                          │
│                                                                   │
│  user.me / user.updateProfile / org.* 等业务接口                  │
└───────────────────────────────────────────────────────────────────┘
```

**一句话概括**：Supabase 负责「证明你是谁」，tRPC 负责「凭这个身份你能调什么」。tRPC 不做认证的搬运工，做授权的守门人。

如果后续确实需要在 tRPC 里做登录（例如接入自建 LDAP），再单独评估 —— 但那时也应该是新增一条 Route Handler，而不是把 cookie 写入塞进 RPC。

---

## 3. tRPC 集成方案

### 3.1 修复 context（P0）

```ts
// server/context.ts
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

export interface Context {
  user: User | null
  supabase: SupabaseClient
}

export async function createContext(): Promise<Context> {
  const supabase = await createClient()
  // 必须用 getUser() 而非 getSession()：前者会向 Supabase 校验 JWT 签名，
  // 后者只解析 cookie 内容，可被伪造。这是 Supabase 官方明确的安全要求。
  const { data } = await supabase.auth.getUser()
  return { user: data.user ?? null, supabase }
}
```

```ts
// app/api/trpc/[trpc]/route.ts
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext,   // 不再传假的 {}
  })
```

> **`getUser()` vs `getSession()` 是本方案的安全底线。** `getSession()` 直接返回 cookie 里解出来的内容，不做签名校验 —— 攻击者伪造 cookie 即可冒充任意用户。服务端一律用 `getUser()`。

### 3.2 分级 procedure

```ts
// server/trpc.ts
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next({ ctx: { ...ctx, user: ctx.user } })  // 收窄类型，下游无需再判空
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const role = await getRole(ctx.user.id)
  if (role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' })
  return next({ ctx: { ...ctx, role } })
})
```

**迁移要求**：现有 10 个 procedure 全是 `publicProcedure`，需逐个评估并改为 `protectedProcedure`。这件事必须和本次改造一起做 —— 否则加了登录页，接口却依然裸奔。

改造后建议把 `publicProcedure` 重命名为 `anonymousProcedure` 之类的显眼名字：默认导出的那个应该是安全的那个，需要公开访问才是需要特意声明的例外。

### 3.3 用户档案表（P2）

Supabase 的 `auth.users` 在独立 schema，不适合被业务表直接外键引用。标准做法是建 `public.profiles`：

```sql
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  avatar_url  text,
  role        text not null default 'member',   -- member | admin | owner
  org_id      uuid references public.orgs(id),
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "自己可读自己" on public.profiles
  for select using (auth.uid() = id);
create policy "自己可改自己" on public.profiles
  for update using (auth.uid() = id);
```

配一个 trigger，在 `auth.users` 插入时自动建档，避免应用层遗漏。

**RLS 必须开。** 这与 ignition 项目里的判断一致：租户/用户隔离不能只靠应用层记得写 `where`，数据库要有兜底。

---

## 4. 页面与组件设计

### 4.1 重要：参考代码是 HeroUI v2 的 API，本项目是 v3

需求里给的参考代码无法直接使用。本项目已升级到 `@heroui/react@3.2.2`，表单组件从「属性式」改成了「组合式」。对照表：

| 参考代码（v2） | 本项目（v3） |
|---|---|
| `<Input label="Email" variant="bordered" />` | `<TextField><Label>Email</Label><Input /></TextField>` |
| `<Button color="primary">` | `<Button variant="primary">` |
| `<Button variant="bordered">` | `<Button variant="outline">` |
| `<Divider />` | `<Separator />` |
| `<Form validationBehavior="native">` | `<Form>`（v3 默认原生校验） |

v3 可用的 `variant` 取值：`primary` / `secondary` / `tertiary` / `danger` / `ghost` / `outline` / `soft` / `surface`。

现有 `login-form.tsx` 已经是 v3 写法，改造时**保留其组合式结构**，只做功能增强。

### 4.2 目标结构

```
components/auth/
  auth-card.tsx        新增：登录/注册共用的卡片外壳（标题、副标题、分隔线、页脚）
  login-form.tsx       增强：OAuth、密码可见、记住我、忘记密码、i18n 错误
  signup-form.tsx      增强：密码强度、条款勾选、i18n 错误
  oauth-buttons.tsx    新增：Google / GitHub，供两个表单复用
  password-field.tsx   新增：带可见切换的密码输入，两处复用
app/
  login/page.tsx       调整为使用 auth-card
  signup/page.tsx      同上
  forgot-password/     新增
  reset-password/      新增
```

抽出 `auth-card` 和 `oauth-buttons` 的原因：登录与注册两个页面的外壳和第三方登录区完全一致，复制两份必然会在后续迭代中走样。

### 4.3 错误信息必须走 i18n

现状是 `setError(signInError.message)` —— 直接把 Supabase 的英文原文抛给用户，中文站上非常突兀。应改为错误码映射：

```ts
const ERROR_KEYS: Record<string, string> = {
  invalid_credentials: 'error_invalid_credentials',
  email_not_confirmed: 'error_email_not_confirmed',
  over_request_rate_limit: 'error_rate_limited',
  user_already_exists: 'error_user_exists',
  weak_password: 'error_weak_password',
}
// 未知错误回落到通用文案，同时把原始 code 记进日志便于排查
```

需要在三份 `messages/*.json` 的 `Auth` 命名空间补齐对应键。

---

## 5. 企业级要求

超出「能登录」之外、企业客户会实际问到的：

| 项 | 方案 | 优先级 |
|---|---|---|
| 密码策略 | Supabase Dashboard 配置最小长度与复杂度；前端同步显示强度条 | P1 |
| 邮箱验证 | 已有（`emailRedirectTo`）；需确认 Supabase 侧已开启强制验证 | P1 |
| 登录限流 | Supabase 内置有限；敏感路径额外加 IP 维度限流 | P1 |
| 忘记 / 重置密码 | `resetPasswordForEmail` + 独立页面 | P1 |
| 审计日志 | 登录成功/失败、密码变更写入 `auth_events` 表 | P2 |
| RBAC | `profiles.role` + `adminProcedure` | P2 |
| 多组织 | `orgs` + `org_members`，会话内切换当前组织 | P2 |
| SSO / SAML | Supabase Pro 支持；预留 `oauth-buttons` 的扩展位 | P3 |
| MFA | Supabase 支持 TOTP，企业客户常要求 | P3 |

**关于限流的说明**：登录失败必须是「慢失败」且错误信息不区分「用户不存在」和「密码错误」—— 否则接口就成了账号枚举器。这条在实现时容易被「体验优化」的诉求推翻，需要写进 review 清单。

---

## 6. 里程碑

**M1 — 堵住鉴权洞（最高优先级，独立于 UI）**
- 修复 `createContext` 接线，接入 `getUser()`
- 落地 `protectedProcedure`
- 审计现有三个路由并逐个上保护
- 建 `profiles` 表 + RLS + trigger

M1 与页面改造无依赖关系，**应该先做、先合并**。当前接口无鉴权的状态不应该等 UI 做完。

**M2 — 登录注册页企业化**
- `auth-card` / `oauth-buttons` / `password-field` 三个共用组件
- 登录页：OAuth、密码可见、记住我、忘记密码
- 注册页：密码强度、条款勾选
- 错误码 i18n 映射 + 三语文案补齐

**M3 — 密码找回与账号安全**
- 忘记密码 / 重置密码两个页面
- 审计日志表与写入
- 登录限流

**M4 — 组织与角色**
- `orgs` / `org_members`
- `adminProcedure` 实装
- 组织切换 UI

---

## 7. 验证方式

每个里程碑的验收不能只看「页面能打开」：

- **M1**：用未登录的 cookie 直接 curl 打 `/api/trpc/auto_tasks.*`，必须返回 `UNAUTHORIZED`；用 A 用户的 cookie 读 B 用户的 profile，必须返回空（验 RLS）
- **M2**：三种语言下走完登录/注册全流程，错误路径（密码错误、邮箱已注册、未验证邮箱）都要看到本地化文案
- **M3**：连续失败登录触发限流；重置链接单次有效且会过期
- **M4**：非 admin 调 `adminProcedure` 返回 `FORBIDDEN`

---

## 8. 与既有约定的关系

本方案沿用 ignition 项目已验证的两条判断：

1. **安全边界要有数据库层兜底**（RLS），不能只靠应用层记得加条件
2. **默认拒绝**：新增 procedure 默认应该是 `protectedProcedure`，公开接口是需要显式声明的例外

---

## 9. 待确认

1. **是否需要多组织（multi-tenant）？** 决定 `profiles` 是否要带 `org_id`，以及是否要做 `orgs` 表。现在定比之后加字段便宜得多。
2. **OAuth 先接哪几家？** Google / GitHub 是默认建议；如果目标客户是国内企业，可能需要企业微信 / 飞书，那是另一套接入成本。
3. **Prisma 要不要启用？** `schema.prisma` 目前全是注释。如果业务表都走 Supabase 客户端和 RLS，Prisma 可以不引入；如果要引入，需要决定它与 RLS 的关系 —— **Prisma 走 service role 连接会绕过 RLS**，那样第 3.3 节的数据库层兜底就失效了，等于把隔离责任又交回应用层。

（原第 4 条已自查：`proxy.ts` 已按 Next 16 规范改名完成，`updateSession` 会话续期逻辑在其中正常挂载，无需处理。）
