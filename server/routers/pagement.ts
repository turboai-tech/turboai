import { z } from 'zod';

export type PageInfo = z.infer<typeof PageInfo>;

export const PageInfo = z.object({
  page: z.number(),
  page_size: z.number(),
  total_page: z.number(),
  total_number: z.number(),
});
