import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMemo } from 'react';

import type { ColorTheme } from '@/constants/theme';
import { useTranslation } from '@/hooks/use-translation';

type Props = {
  onRetry: () => void;
  message?: string;
  colors: ColorTheme;
};

export function StaleBanner({ onRetry, message, colors }: Props) {
  const { t } = useTranslation();
  const displayMessage = message ?? t('stale.usingCached');

  const styles = useMemo(
    () =>
      StyleSheet.create({
        banner: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: colors.background.section,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border,
        },
        text: { fontSize: 13, color: colors.text.secondary },
        retryBtn: { paddingVertical: 4, paddingHorizontal: 12 },
        retryText: { fontSize: 14, fontWeight: '600', color: colors.text.primary },
      }),
    [colors]
  );

  return (
    <View style={styles.banner} testID="stale-banner">
      <Text style={styles.text}>{displayMessage}</Text>
      <TouchableOpacity
        testID="stale-banner-retry"
        onPress={onRetry}
        style={styles.retryBtn}
        accessibilityRole="button"
        accessibilityLabel={t('stale.retry')}
      >
        <Text style={styles.retryText}>{t('stale.retry')}</Text>
      </TouchableOpacity>
    </View>
  );
}
