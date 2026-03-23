// app/(tabs)/index.tsx
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable, RefreshControl, ViewToken } from 'react-native';
import Toast from 'react-native-toast-message';
import { MemoCoinRow } from '@/components/coin-row';
import { StaleBanner } from '@/components/stale-banner';
import { useColors } from '@/hooks/use-colors';
import { useInfiniteCoins } from '@/hooks/use-infinite-coins';
import { useTranslation } from '@/hooks/use-translation';
import type { ListResponseCoin } from '@/types/coin.schema';


export default function CoinsListScreen() {
  const { t } = useTranslation();
  const Colors = useColors();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch, isRefetching } = useInfiniteCoins(50);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: Colors.background.list },
        header: {
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 16,
        },
        title: { fontSize: 28, fontWeight: '700', color: Colors.text.primary },
        countBadge: {
          backgroundColor: Colors.background.section,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
        },
        count: {
          fontSize: 13,
          fontWeight: '600',
          color: Colors.text.secondary,
          letterSpacing: 0.2,
        },
        list: { paddingHorizontal: 16, paddingBottom: 120 },
        center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
        footer: { padding: 16, alignItems: 'center' },
        listEmpty: { flexGrow: 1 },
        emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48, gap: 16 },
        emptyText: { fontSize: 15, color: Colors.text.muted, textAlign: 'center' },
        retryButton: {
          backgroundColor: Colors.primary,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        },
        retryButtonText: { color: Colors.background.card, fontSize: 16, fontWeight: '600' },
      }),
    [Colors]
  );

  useEffect(() => {
    if (isFetchingNextPage) {
      Toast.show({ type: 'info', text1: t('list.loadingMore'), autoHide: true, visibilityTime: 1000 });
    }
  }, [isFetchingNextPage, t]);

  const coins = data?.pages.flatMap((page: ListResponseCoin) => page.data) ?? [];
  const totalCount = data?.pages[0]?.meta?.totalCoinCount ?? coins.length;
  const [viewableIndices, setViewableIndices] = useState<Set<number>>(() => new Set());
  const fetchingNextRef = useRef(false);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const idx = viewableItems.map((v) => v.index).filter((i): i is number => i != null);
    setViewableIndices(new Set(idx));
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const label = coins.length
    ? viewableIndices.size > 0
      ? `${Math.min(...viewableIndices) + 1}–${Math.max(...viewableIndices) + 1}`
      : `1–${coins.length}`
    : `${totalCount}`;
  const showStaleBanner = isError && coins.length > 0;

  if (isLoading) {
    return (
      <View style={styles.center} accessibilityLabel={t('a11y.loading')} accessibilityLiveRegion="polite">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} testID="coins-title">{t('list.title')}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.count} testID="coins-count">{label}</Text>
        </View>
      </View>
      {showStaleBanner && <StaleBanner onRetry={() => refetch()} colors={Colors} />}
        <FlatList
          data={coins}
          
          accessibilityLabel={t('list.title')}
          onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={[styles.list, coins.length === 0 && styles.listEmpty]}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            progressBackgroundColor={Colors.background.card}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {isError && (
              <>
                <Text style={styles.emptyText} testID="list-empty-error">{t('list.emptyError')}</Text>
                <Pressable
                  testID="list-retry-button"
                  onPress={() => refetch()}
                  style={styles.retryButton}
                  accessibilityRole="button"
                  accessibilityLabel={t('list.retry')}
                >
                  <Text style={styles.retryButtonText}>{t('list.retry')}</Text>
                </Pressable>
              </>
            )}
          </View>
        }
        renderItem={({ item, index }) => (
          <MemoCoinRow
            item={item}
            colors={Colors}
            isInView={viewableIndices.size === 0 || viewableIndices.has(index)}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (!hasNextPage || isFetchingNextPage || fetchingNextRef.current) return;
          fetchingNextRef.current = true;
          fetchNextPage().finally(() => { fetchingNextRef.current = false; });
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <View style={styles.footer}><ActivityIndicator size="small" /></View> : null}
        />
      </View>
  );
}