import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createAdminClient } from '@/lib/supabase/admin';

import { protectedProcedure, publicProcedure, router } from '../trpc';

/** 与 messages 里的产品清单对应，收窄取值避免脏数据进库 */
export const PRODUCT_INTERESTS = [
  'ignition',
  'chat',
  'label',
  'voice',
  'reel',
  'other',
] as const;

const LeadInput = z.object({
  email: z.string().trim().toLowerCase().email().max(320),
  fullName: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  country: z.string().trim().max(80).optional(),
  industry: z.string().trim().max(80).optional(),
  jobTitle: z.string().trim().max(120).optional(),
  productInterest: z.array(z.enum(PRODUCT_INTERESTS)).max(6).default([]),
  message: z.string().trim().max(2000).optional(),
  source: z.string().trim().max(200).optional(),
  locale: z.string().trim().max(16).optional(),
});

/** 空字符串按未填写处理，避免把 '' 写进库再污染后续的 coalesce 合并 */
function nullIfBlank(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const leadRouter = router({
  /**
   * 提交留资。未登录可用 —— 这是整个功能的前提。
   *
   * 走 service role 而不是用户上下文：leads 表刻意没有给 anon 建 select 策略
   * （线索库可读即等于销售管线泄露），插入虽然 anon 也能做，但统一从服务端
   * 写入可以让 source/locale 这类归因字段不被客户端伪造。
   */
  submit: publicProcedure
    .input(LeadInput)
    .mutation(async ({ input }) => {
      const admin = createAdminClient();

      const { error } = await admin.from('leads').insert({
        email: input.email,
        full_name: nullIfBlank(input.fullName),
        phone: nullIfBlank(input.phone),
        country: nullIfBlank(input.country),
        industry: nullIfBlank(input.industry),
        job_title: nullIfBlank(input.jobTitle),
        product_interest: input.productInterest,
        message: nullIfBlank(input.message),
        source: nullIfBlank(input.source),
        locale: nullIfBlank(input.locale),
      });

      if (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to record the lead',
          cause: error,
        });
      }

      // 不回传任何已存在的记录 —— 否则这个公开接口就成了「某邮箱是否留过资」
      // 的探测器。
      return { ok: true };
    }),

  /**
   * 把当前用户邮箱下未认领的留资并入 profile。
   *
   * 注册路径由数据库 trigger 自动完成；这里覆盖的是「先有账号、后留资、
   * 再登录」的情况。幂等：认领过的行不会被重复处理。
   */
  claim: protectedProcedure.mutation(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.rpc('claim_leads_for_user', {
      target_user: ctx.user.id,
    });

    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to claim leads',
        cause: error,
      });
    }

    return { claimed: (data as number | null) ?? 0 };
  }),
});
