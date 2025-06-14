// app/api/trpc/[trpc]/route.ts
import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { NextRequest } from 'next/server';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: () => createContext({} as CreateNextContextOptions),
  });

export { handler as GET, handler as POST };
