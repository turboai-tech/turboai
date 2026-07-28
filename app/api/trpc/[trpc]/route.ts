// app/api/trpc/[trpc]/route.ts
import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    // createContext 自己通过 next/headers 读 cookie 还原会话，因此不需要在这里
    // 转交 req。此前这里传的是 `{} as CreateNextContextOptions` —— 一个被强制
    // 转型的空对象，导致上下文始终为空、鉴权无从谈起。
    createContext,
  });

export { handler as GET, handler as POST };
