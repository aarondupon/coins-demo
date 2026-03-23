import { expect } from '@jest/globals'; // stupid cypress type conflict :(
import { i18n, getLocale, setLocale } from '@/i18n';

describe('Localization / i18n', () => {
  const originalLocale = getLocale();

  afterEach(() => {
    setLocale(originalLocale);
  });

  describe('getLocale', () => {
    it('returns a supported locale from device (mocked as en in Jest)', () => {
      expect(getLocale()).toBe('en');
    });
  });

  describe('setLocale', () => {
    it('updates the active locale', () => {
      setLocale('nl');
      expect(getLocale()).toBe('nl');
    });

    it('affects translations returned by t()', () => {
      setLocale('nl');
      expect(i18n.t('tabs.coins')).toBe('Munten');

      setLocale('en');
      expect(i18n.t('tabs.coins')).toBe('Coins');
    });
  });

  describe('translations', () => {
    beforeEach(() => {
      setLocale('en');
    });

    it('returns English strings for default locale', () => {
      expect(i18n.t('tabs.coins')).toBe('Coins');
      expect(i18n.t('list.loadingMore')).toBe('Loading more...');
      expect(i18n.t('stale.usingCached')).toBe('Using cached data');
      expect(i18n.t('detail.currentPrice')).toBe('Current Price (USD)');
      expect(i18n.t('updated.justNow')).toBe('Just now');
    });

    it('interpolates placeholders correctly', () => {
      expect(i18n.t('updated.secondsAgo', { count: 30 })).toBe('30s ago');
      expect(i18n.t('updated.label', { time: '5 min ago' })).toBe('Updated 5 min ago');
    });

    it('returns Dutch strings when locale is nl', () => {
      setLocale('nl');

      expect(i18n.t('tabs.coins')).toBe('Munten');
      expect(i18n.t('list.loadingMore')).toBe('Meer laden...');
      expect(i18n.t('stale.usingCached')).toBe('Gebruikt gecachte data');
      expect(i18n.t('detail.currentPrice')).toBe('Huidige prijs (USD)');
      expect(i18n.t('updated.justNow')).toBe('Zojuist');
    });

    it('interpolates Dutch placeholders correctly', () => {
      setLocale('nl');

      expect(i18n.t('updated.secondsAgo', { count: 30 })).toBe('30s geleden');
      expect(i18n.t('updated.label', { time: '5 min geleden' })).toBe('Bijgewerkt 5 min geleden');
    });
  });
});
