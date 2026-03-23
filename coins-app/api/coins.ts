import { apiGet } from '@/api/client';
import {
  coinDetailResponseSchema,
  listResponseCoinSchema,
} from '@/types/coin.schema';

export const coinsApi = {
  list: async (page: number, size: number) => {
    const params = new URLSearchParams({
      'page[number]': String(page),
      'page[size]': String(size),
    });
    const data = await apiGet<unknown>(`/coins?${params}`);
    return listResponseCoinSchema.parse(data);
  },

  detail: async (id: string) => {
    const data = await apiGet<unknown>(`/coins/${id}`);
    return coinDetailResponseSchema.parse(data).data;
  },
};
