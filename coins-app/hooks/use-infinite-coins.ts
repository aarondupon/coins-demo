import { useInfiniteQuery } from '@tanstack/react-query';
import type { ListResponseCoin } from '@/types/coin.schema';
import { coinsApi } from '@/api/coins';

export const useInfiniteCoins = (pageSize: number = 50) => {
  return useInfiniteQuery({
    queryKey: ['coins', 'infinite', { pageSize }],
    queryFn: ({ pageParam = 1 }) => coinsApi.list(pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ListResponseCoin, _allPages, lastPageParam) => {
      const totalCount = lastPage.meta?.totalCoinCount ?? 0;
      const totalPages = Math.ceil(totalCount / pageSize);
      return lastPageParam < totalPages ? lastPageParam + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    throwOnError: false, // Let component handle error UI (list-retry-button) instead of ErrorBoundary
    refetchOnReconnect: true,
  });
};
