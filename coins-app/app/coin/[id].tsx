import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Pressable } from 'react-native';
import { useMemo } from 'react';
import { CoinIcon } from '@/components/coin-icon';
import { StaleBanner } from '@/components/stale-banner';
import { LastUpdatedText } from '@/components/last-updated-text';
import { useColors } from '@/hooks/use-colors';
import { useCoinDetail } from '@/hooks/use-coin-detail';
import { useTranslation } from '@/hooks/use-translation';
import { formatPrice, formatPercent, percentChangeColor } from '@/utils/format-coin';

export default function CoinDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const Colors = useColors();
  // id may be array or string, handle both
  const coinId = Array.isArray(id) ? id[0] : id;
  const { data: coin, isLoading, isFetching, isError, refetch, dataUpdatedAt } = useCoinDetail(coinId);
  const refreshControl = <RefreshControl refreshing={isFetching} onRefresh={refetch} tintColor={Colors.primary} colors={[Colors.primary]} progressBackgroundColor={Colors.background.card} />;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        scrollContent: { flexGrow: 1, paddingBottom: 32 },
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: Colors.background.card,
        },
        center: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        notFound: {
          fontSize: 20,
          color: Colors.text.muted,
          marginTop: 100,
        },
        retryButton: {
          backgroundColor: Colors.primary,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
          marginTop: 16,
        },
        retryButtonText: { color: Colors.text.inverted, fontSize: 16, fontWeight: '600' },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          paddingVertical: 24,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: Colors.border,
        },
        headerText: {
          flex: 1,
        },
        icon: {
          overflow: 'hidden',
        },
        title: {
          fontSize: 22,
          fontWeight: '700',
          color: Colors.text.primary,
        },
        symbol: {
          fontSize: 14,
          color: Colors.text.muted,
          marginTop: 2,
        },
        priceSection: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: 12,
          paddingVertical: 20,
        },
        price: {
          fontSize: 32,
          fontWeight: '800',
          color: Colors.text.primary,
        },
        card: {
          backgroundColor: Colors.background.section,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
        },
        cardLabel: {
          fontSize: 13,
          color: Colors.text.muted,
          marginBottom: 4,
        },
        cardValue: {
          fontSize: 18,
          fontWeight: '600',
          color: Colors.text.primary,
        },
        changeRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        changeItem: {
          flex: 1,
          alignItems: 'center',
        },
        changeLabel: {
          fontSize: 12,
          color: Colors.text.muted,
          marginBottom: 4,
        },
        changeValue: {
          fontSize: 15,
          fontWeight: '600',
        },
        lastUpdated: {
          fontSize: 13,
          color: Colors.text.muted,
          marginTop: 24,
          alignSelf: 'center',
        },
      }),
    [Colors]
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]} accessibilityLabel={t('a11y.loading')} accessibilityLiveRegion="polite">
        <ActivityIndicator size="large" />
      </View>
    );
  }


  if (!coin) {
    const errorContent = (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.notFound}>
          {isError ? t('detail.couldNotLoad') : t('detail.notFound')}
        </Text>
        {isError && (
          <Pressable
            testID="detail-retry-button"
            onPress={() => refetch()}
            style={styles.retryButton}
            accessibilityRole="button"
            accessibilityLabel={t('detail.retry')}
          >
            <Text style={styles.retryButtonText}>{t('detail.retry')}</Text>
          </Pressable>
        )}
      </View>
    );
    if (isError) {
      return (
        <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={refreshControl}>
          {errorContent}
        </ScrollView>
      );
    }
    return errorContent;
  }

  const { name, dirtyCode, priceInUSD, percentChange1h, percentChange24h, percentChange7d, marketCapInUSD } = coin;
  const formatMarketCap = (v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={refreshControl}>
      {isError && coin && <StaleBanner onRetry={refetch} colors={Colors} />}
      <View style={styles.container}>
        <Stack.Screen options={{ title: name }} />
        {/* Header */}
        <View style={styles.header}>
          
          <View style={styles.headerText}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.symbol}>{dirtyCode}</Text>
          </View>
          <View style={styles.icon}>
            <CoinIcon coinId={coin.id} dirtyCode={dirtyCode} size={56} colors={Colors} />
          </View>
        </View>
        {/* Hero price */}
        <View style={styles.priceSection}>
          <Text
            style={styles.price}
            testID="coin-detail-price"
            accessibilityLabel={`${t('detail.currentPrice')}: ${formatPrice(priceInUSD)}`}
          >
            {formatPrice(priceInUSD)}
          </Text>
        </View>
        {/* 1h / 24h / 7d changes */}
        <View style={styles.card}>
          <View style={styles.changeRow}>
            <View style={styles.changeItem}>
              <Text style={styles.changeLabel}>1h</Text>
              <Text style={[styles.changeValue, { color: percentChangeColor(percentChange1h, Colors) }]}>{formatPercent(percentChange1h)}</Text>
            </View>
            <View style={styles.changeItem}>
              <Text style={styles.changeLabel}>24h</Text>
              <Text style={[styles.changeValue, { color: percentChangeColor(percentChange24h, Colors) }]}>{formatPercent(percentChange24h)}</Text>
            </View>
            <View style={styles.changeItem}>
              <Text style={styles.changeLabel}>7d</Text>
              <Text style={[styles.changeValue, { color: percentChangeColor(percentChange7d, Colors) }]}>{formatPercent(percentChange7d)}</Text>
            </View>
          </View>
        </View>
        {/* Market cap */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t('detail.marketCap')}</Text>
          <Text style={styles.cardValue}>{formatMarketCap(marketCapInUSD)}</Text>
        </View>
        {dataUpdatedAt > 0 && (
          <LastUpdatedText timestamp={dataUpdatedAt} style={styles.lastUpdated} />
        )}
      </View>
    </ScrollView>
  );
}