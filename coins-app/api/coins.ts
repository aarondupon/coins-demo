import { apiGet } from '@/api/client';
import {
  coinDetailResponseSchema,
  listResponseCoinSchema,
} from '@/types/coin.schema';

export const coinsApi = {
  list: async (page: number, size: number, options?: { signal?: AbortSignal }) => {
    const params = new URLSearchParams({
      'page[number]': String(page),
      'page[size]': String(size),
    });
    const data = await apiGet<unknown>(`/coins?${params}`, { signal: options?.signal });
    const result = listResponseCoinSchema.safeParse(data);
    if (!result.success) {
      console.error('[coins.list] parse error:', result.error.format());
      throw result.error;
    }
    return result.data;
  },

  detail: async (id: string, options?: { signal?: AbortSignal }) => {
    const data = await apiGet<unknown>(`/coins/${id}`, { signal: options?.signal });
    const result = coinDetailResponseSchema.safeParse(data);
    if (!result.success) {
      console.error('[coins.detail] parse error:', result.error.format());
      throw result.error;
    }
    return result.data.data;
  },
};
