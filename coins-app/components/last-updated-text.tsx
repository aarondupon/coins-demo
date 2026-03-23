import { Text, StyleProp, TextStyle } from 'react-native';
import { useEffect, useState } from 'react';

import { useTranslation } from '@/hooks/use-translation';

export type RelativeTimeParams = { key: string; count?: number } | null;

/**
 * Returns translation key and optional count for relative time display.
 * Use with i18n: t(params.key, params?.count ? { count: params.count } : {})
 */
export function getRelativeTimeParams(timestamp: number): RelativeTimeParams {
  if (!timestamp) return null;
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 5) return { key: 'updated.justNow' };
  if (seconds < 60) return { key: 'updated.secondsAgo', count: seconds };
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return { key: 'updated.minutesAgo', count: minutes };
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return { key: 'updated.hoursAgo', count: hours };
  const days = Math.floor(hours / 24);
  return { key: 'updated.daysAgo', count: days };
}

function buildRelativeTimeString(
  params: RelativeTimeParams,
  t: (key: string, options?: Record<string, unknown>) => string
): string {
  if (!params) return '';
  const timeStr = params.count !== undefined ? t(params.key, { count: params.count }) : t(params.key);
  return t('updated.label', { time: timeStr });
}

interface LastUpdatedTextProps {
  timestamp: number;
  style?: StyleProp<TextStyle>;
}

export function LastUpdatedText({ timestamp, style }: LastUpdatedTextProps) {
  const { t } = useTranslation();
  const [text, setText] = useState(() => buildRelativeTimeString(getRelativeTimeParams(timestamp), t));

  useEffect(() => {
    const update = () => setText(buildRelativeTimeString(getRelativeTimeParams(timestamp), t));
    update();
    const intervalId = setInterval(update, 15000);
    return () => clearInterval(intervalId);
  }, [timestamp, t]);

  return <Text style={style}>{text}</Text>;
}
