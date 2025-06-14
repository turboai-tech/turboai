/**
 * Integration test example for the `post` router
 */
import { expect, test } from '@playwright/test';
import type { inferProcedureInput } from '@trpc/server';
import { createContextInner } from '../context';
import type { AppRouter } from './_app';
import { createCaller } from './_app';

test('create and get auto task', async () => {
  const ctx = await createContextInner({});
  const caller = createCaller(ctx);

  const input: inferProcedureInput<AppRouter['autoTask']['create']> = {
    task_code: 'auto_video_mix_clip_task',
    job_metadata: {},
    payload: {units: [{input: {num_output: 3, video_urls: ["https://tec-creative-os.tec-develop.cn/upload/20250516/7582561618b58a67fcc8acde2ce7e6e1.mp4", "https://tec-creative-os.tec-develop.cn/upload/20250516/cf2238227a3e1f82380f22aa2491e55e.mp4", "https://tec-creative-os.tec-develop.cn/upload/20250516/18c8e7097c32bad0789eb1a03fa21388.mp4"], output_time: 30, product_name: "圣诞树", need_to_dubbing: false, background_volume: 0.07}, provider: "aimix"}]},
  };

  const task = await caller.autoTask.create(input);
  console.log('task', task);
  const task_id = task?.task_job_id;
  console.log('task_id', task_id);
  const byId = await caller.autoTask.byId({ id: Number(task_id) });

  expect(byId.id).toBe(Number(task_id));
});
