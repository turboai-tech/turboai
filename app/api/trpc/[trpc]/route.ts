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
    // 会话由 createContext 自己从 cookie 还原；传 req 是为了取 IP 与 UA，
    // 限流分桶和审计都需要。
    //
    // 此前这里传的是 `{} as CreateNextContextOptions` —— 一个被强制转型的空
    // 对象，导致上下文始终为空、鉴权无从谈起。
    createContext: () => createContext(req),
  });

export { handler as GET, handler as POST };
