/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { autoTaskRouter } from './auto_tasks';
import { materialRouter } from './material';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  autoTask: autoTaskRouter,
  material: materialRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;