import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

import en from '@/locales/en';
import nl from '@/locales/nl';

const translations = { en, nl };

export const i18n = new I18n(translations);

// Use device locale from expo-localization
const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'en';
const supportedLocales = Object.keys(translations);
const lang = deviceLocale.split('-')[0];
const resolvedLocale =
  supportedLocales.includes(deviceLocale) ? deviceLocale
  : lang && supportedLocales.includes(lang) ? lang
  : 'en';

i18n.locale = resolvedLocale;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export function setLocale(locale: string) {
  i18n.locale = locale;
}

export function getLocale(): string {
  return i18n.locale;
}
