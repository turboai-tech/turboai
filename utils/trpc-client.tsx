'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchStreamLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState, type ReactNode } from 'react'

import type { AppRouter } from '@/server/routers/_app'

import { transformer } from './transformer'

/**
 * App Router 用的 tRPC 客户端。
 *
 * `utils/trpc.ts` 里的 `createTRPCNext` 是 **Pages Router** 的 API —— 它依赖
 * `withTRPC` 去包 `_app`，App Router 里没有 `_app`，因此在客户端组件里调用
 * 它的 hook 会抛 "Unable to find tRPC Context"。这个文件是 App Router 的对应物。
 */
export const trpc = createTRPCReact<AppRouter>()

function getBaseUrl() {
  // 浏览器端用相对路径即可，避免把域名写死
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://127.0.0.1:${process.env.PORT ?? 3000}`
}

export function TRPCProvider({ children }: { children: ReactNode }) {
  // 用 useState 而非模块级单例：模块级的 QueryClient 会在服务端被所有请求共享，
  // 造成用户之间的缓存串数据。
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // SSR 时立刻重取没有意义，反而会在水合后打一次多余的请求
            staleTime: 30_000,
            retry: 1,
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchStreamLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
