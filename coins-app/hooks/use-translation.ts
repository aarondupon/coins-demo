import { useCallback } from 'react';
import { i18n } from '@/i18n';

export function useTranslation() {
  const t = useCallback(
    (key: string, options?: Record<string, unknown>) => i18n.t(key, options),
    []
  );
  return { t };
}
