/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { autoTaskRouter } from './auto_tasks';
import { leadRouter } from './lead';
import { materialRouter } from './material';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  autoTask: autoTaskRouter,
  lead: leadRouter,
  material: materialRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;