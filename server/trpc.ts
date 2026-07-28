/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v11/router
 * @see https://trpc.io/docs/v11/procedures
 */

import { initTRPC, TRPCError } from '@trpc/server';
import { transformer } from '../utils/transformer';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v11/data-transformers
   */
  transformer,
  /**
   * @see https://trpc.io/docs/v11/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Create a router
 * @see https://trpc.io/docs/v11/router
 */
export const router = t.router;

/**
 * 匿名可访问的 procedure。
 *
 * 这是需要**特意声明**的例外，不是默认选项。新增接口时默认应当用
 * `protectedProcedure`；只有确实要对未登录用户开放的（健康检查、公开内容）
 * 才用这个，并在 review 时说明理由。
 *
 * @see https://trpc.io/docs/v11/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * 要求已登录的 procedure。
 *
 * 通过之后 `ctx.user` 的类型被收窄为非空，下游 resolver 无需再判空 ——
 * 这样「忘记判空」不会变成一个静默的越权漏洞，而是编译期就过不去。
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({ ctx: { ...ctx, user: ctx.user } });
});

/**
 * Merge multiple routers together
 * @see https://trpc.io/docs/v11/merging-routers
 */
export const mergeRouters = t.mergeRouters;

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/v11/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;
