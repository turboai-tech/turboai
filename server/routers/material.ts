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
import { PageInfo } from './pagement';

export const MaterialType = {
    MATERIAL_TYPE_TEXT: 1,
    MATERIAL_TYPE_IMAGE: 2,
    MATERIAL_TYPE_VIDEO: 3,
    MATERIAL_TYPE_AUDIO: 4,
} as const;

export type MaterialType = keyof typeof MaterialType;

export const MadeFrom = {
    MADE_FROM_USER: 1,
    MADE_FROM_GENERATED: 2,
} as const;

export type MadeFrom = keyof typeof MadeFrom;

export const ApprovalStatus = {
    APPROVAL_STATUS_PENDING: 1,
    APPROVAL_STATUS_APPROVED: 2,
    APPROVAL_STATUS_REJECTED: 3,
} as const;

export type ApprovalStatus = keyof typeof ApprovalStatus;

export type MaterialMetadata = {
    size?: number,
    width?: number,
    height?: number,
    duration?: number,
    fps?: number,
    bit_rate?: number,
    audio_bit_rate?: number,
    audio_channels?: number,
    audio_sample_rate?: number,
    audio_sample_format?: string,
}

export type Material = {
    id: number,
    user_id: number,
    hash_code: string,
    name: string,
    description: string,
    content: string,
    type: string,
    made_from: string,
    approval_status: string,
    approval_message: string,
    created_at: string,
    updated_at: string,
    deleted_at: number,
    approved_at: number,
    view_count: number,
    favorite_count: number,
    like_count: number,
    comment_count: number,
    share_count: number,
    download_count: number,
    is_shared: boolean,
    metadata: MaterialMetadata,
}

export type MaterialQueryResponse = {
  data: Material[],
  page_info: PageInfo,
}


export const materialRouter = router({
  list: publicProcedure
    .input(
      z.object({
        page_size: z.number().min(1).max(20).nullish().default(20),
        page: z.number().min(1).nullish().default(1),
        id: z.number().optional(),
        fuzzy_name: z.string().optional(),
        fuzzy_desc: z.string().optional(),
        fuzzy_content: z.string().optional(),
        ap: z.array(z.number()).optional(),
        mf: z.array(z.number()).optional(),
        tp: z.array(z.number()).optional(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.page_size ?? 20;
      const page = input.page ?? 1;
      let uri = `/api/ai/material/v1/query?page_size=${limit}&page=${page}`;
      if (input.id) {
        uri += `&id=${input.id}`;
      }
      if (input.fuzzy_name) {
        uri += `&fuzzy_name=${input.fuzzy_name}`;
      }
      if (input.fuzzy_desc) {
        uri += `&fuzzy_desc=${input.fuzzy_desc}`;
      }
      if (input.fuzzy_content) {
        uri += `&fuzzy_content=${input.fuzzy_content}`;
      }
      if (input.ap) {
        input.ap.forEach((ap) => {
          uri += `&ap=${ap}`;
        });
      }
      if (input.mf) {
        input.mf.forEach((mf) => {
          uri += `&mf=${mf}`;
        });
      }
      if (input.tp) {
        input.tp.forEach((tp) => {
          uri += `&tp=${tp}`;
        });
      }

      const response = await defaultBackendProxy.request<{ code: number, message: string, data: MaterialQueryResponse}>(uri, {
        method: 'GET'
      });
      console.debug('response', response);
      return response?.data;
    }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const uri = `/api/ai/material/v1/get/${id}`;
      const material_resp = await defaultBackendProxy.request<{data: Material}>(uri, {
        method: 'GET',
      });
      if (!material_resp.data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No material with id '${id}'`,
        });
      }
      return material_resp.data;
    }),

  create_material: publicProcedure
    .input(z.object({
      file_base64: z.string().min(1, 'File base64 is required'),
      file_name: z.string().min(1, 'File name is required'),
      file_type: z.string().min(1, 'File type is required'),
      file_size: z.number().min(1, 'File size is required').max(1024 * 1024 * 100, 'File size must be less than 100MB'),
    }))
    .mutation(async ({ input }) => {
      console.debug('input', input);
      const buffer = Buffer.from(input.file_base64, 'base64');
      const blob = new Blob([buffer], { type: input.file_type });
      const formData = new FormData();
      formData.append('file', blob, input.file_name);
      const uri = `/api/ai/material/v1/create/upload`;
      const material_resp = await defaultBackendProxy.request<{code: number, message: string, data: Material}>(uri, {
        method: 'POST',
        body: formData,
      });
      console.debug('material_resp', material_resp);
      if (!material_resp || (material_resp?.code && material_resp?.code !== 200)) {
        throw new Error(material_resp?.message || 'Proxy upload to backend service failed.');
      }
      return material_resp.data;
    }),
});
