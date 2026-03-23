import React, { useState, useMemo } from 'react';
import { Image } from 'expo-image';
import { View, Text, StyleSheet } from 'react-native';
import type { ColorTheme } from '@/constants/theme';

const DELTA_ICON_BASE = 'https://delta.app/images';

function getDeltaIconUrl(coinId: string): string {
  return `${DELTA_ICON_BASE}/${coinId}/icon-64.png`;
}

type CoinIconProps = {
  coinId: string;
  dirtyCode: string;
  size?: number;
  colors: ColorTheme;
  /** When false, skips image load (e.g. row scrolled out of view). Default true. */
  isInView?: boolean;
};

export function CoinIcon({ coinId, dirtyCode, size = 44, colors, isInView = true }: CoinIconProps) {
  const [hasError, setHasError] = useState(false);
  const iconUrl = getDeltaIconUrl(coinId);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        fallback: {
          backgroundColor: colors.background.icon,
          justifyContent: 'center',
          alignItems: 'center',
        },
        fallbackText: {
          fontWeight: '600',
          color: colors.text.secondary,
        },
      }),
    [colors]
  );

  if (hasError) {
    return (
      <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={[styles.fallbackText, { fontSize: size * 0.25 }]}>{dirtyCode}</Text>
      </View>
    );
  }

  if (!isInView) {
    return (
      <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={[styles.fallbackText, { fontSize: size * 0.25 }]}>{dirtyCode}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: iconUrl }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      contentFit="cover"
      cachePolicy="memory-disk"
      onError={() => setHasError(true)}
    />
  );
}
