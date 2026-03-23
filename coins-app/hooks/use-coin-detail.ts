import { useQuery } from '@tanstack/react-query';
import type { Coin } from '@/types/coin.schema';
import { coinsApi } from '@/api/coins';

export function useCoinDetail(id?: string) {
  return useQuery<Coin>({
    queryKey: ['coins', 'detail', id],
    queryFn: ({ signal }) => coinsApi.detail(id!, { signal }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    throwOnError: (_error, query) => {
      const hasCachedData = query.state.data !== undefined;
      return !hasCachedData;
    },
  });
}
