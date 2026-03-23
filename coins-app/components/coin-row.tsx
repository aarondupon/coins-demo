import React, { useMemo } from 'react';
import { Link } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CoinIcon } from '@/components/coin-icon';
import type { ColorTheme } from '@/constants/theme';
import { formatPrice, formatPercent, percentChangeColor } from '@/utils/format-coin';
import type { Coin } from '@/types/coin.schema';

type CoinRowProps = { item: Coin; colors: ColorTheme; isInView?: boolean };

export function CoinRow({ item, colors, isInView = true }: CoinRowProps) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        item: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 4,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border,
          width: '100%',
        },
        itemPressed: { backgroundColor: colors.background.pressed },
        icon: { marginRight: 14 },
        itemContent: { flex: 1, minWidth: 0 },
        itemRightContent: { flex: 1, alignItems: 'flex-end' as const },
        itemName: { fontSize: 16, fontWeight: '600', color: colors.text.primary },
        itemSymbol: { fontSize: 13, color: colors.text.muted, marginTop: 2 },
        itemPrice: { fontSize: 15, fontWeight: '600', color: colors.text.primary, flexShrink: 0 },
      }),
    [colors]
  );

  const a11yLabel = `${item.name}, ${item.dirtyCode}, ${formatPrice(item.priceInUSD)}, ${formatPercent(item.percentChange1h)}`;
  return (
    <Link href={`/coin/${item.id}`} asChild>
      <Pressable
        testID={`coin-row-${item.id}`}
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
      >
        {({ pressed }) => (
          <View style={[styles.item, pressed && styles.itemPressed]}>
            <View style={styles.icon}>
              <CoinIcon coinId={item.id} dirtyCode={item.dirtyCode} size={44} colors={colors} isInView={isInView} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSymbol}>{item.dirtyCode}</Text>
            </View>
            <View style={styles.itemRightContent}>
              <Text style={styles.itemPrice}>{formatPrice(item.priceInUSD)}</Text>
              <Text style={{ color: percentChangeColor(item.percentChange1h, colors) }}>
                {formatPercent(item.percentChange1h)}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export const MemoCoinRow = React.memo(CoinRow);
