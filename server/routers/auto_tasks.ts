/**
 * This is an example router, you can delete this file and then update
 * `../pages/api/trpc/[trpc].tsx`
 * 
 * @see https://trpc.io/docs/v11/router
 * @see https://trpc.io/docs/v11/procedures
 * @see https://trpc.io/docs/v11/procedures#public-procedures
 * @see https://trpc.io/docs/v11/procedures#private-procedures
 * @see https://trpc.io/docs/v11/procedures#protected-procedures
 */
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { defaultBackendProxy } from '../backend_proxy';
import { publicProcedure, router } from '../trpc';

const TaskStatus = z.enum([
  'JOB_STATUS_UNSPECIFIED',
  'JOB_STATUS_PENDING',
  'JOB_STATUS_RUNNING',
  'JOB_STATUS_SUCCESS',
  'JOB_STATUS_FAILED_RETRY',
  'JOB_STATUS_FAILED',
  'JOB_STATUS_CANCELED',
  'JOB_STATUS_EXPIRED',
  'JOB_STATUS_SUCCESS_PARTIAL',
]);

type AutoTask = {  
  id: number,
  created_by: string | null,
  updated_by: string | null,
  created_at: Date,
  updated_at: Date,
  task_code: string,
  generated_name: string,
  job_metadata: object | null,
  payload: object | null,
  result: object | null,
  status: z.infer<typeof TaskStatus>,
  status_message: string | null,
  attempt: number,
  scheduled_at: Date,
  expired_at: Date,
  next_scheduled_at: Date,
  finished_at: Date,
  user_id: number | null,
};

export const autoTaskRouter = router({
  list: publicProcedure
    .input(
      z.object({
        page_size: z.number().min(1).max(100).nullish(),
        page: z.number().min(1).nullish().default(10),
        status: TaskStatus.optional(),
        task_code: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.page_size ?? 20;
      const page = input.page ?? 1;
      let uri = `/api/ai/distributed-task/v1/jobs/query?page_size=${limit}&page=${page}`;
      if (input.status) {
        uri += `&status=${input.status}`;
      }
      if (input.task_code) {
        uri += `&task_code=${input.task_code}`;
      }

      const items = await defaultBackendProxy.request<{data: AutoTask[]} | null>(uri, {
        method: 'GET'
      });

      return items?.data;
    }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const uri = `/api/ai/distributed-task/v1/tasks/job-result/${id}`;
      const task = await defaultBackendProxy.request<{data: AutoTask} | null>(uri, {
        method: 'POST',
        body: JSON.stringify({id}),
      });
      if (!task) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No task with id '${id}'`,
        });
      }
      return task.data;
    }),

  create: publicProcedure
    .input(
      z.object({
        task_code: z.string(),
        job_metadata: z.object({}).optional(),
        payload: z.object({}).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const uri = `/api/ai/distributed-task/v1/tasks/submit-job`;
      const task = await defaultBackendProxy.request<{data: AutoTask} | null>(uri, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      return task?.data;
    }),
});