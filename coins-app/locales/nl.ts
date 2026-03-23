export default {
  // Accessibility
  a11y: {
    loading: 'Laden',
    back: 'Terug',
  },
  // Tab
  tabs: {
    coins: 'Munten',
    github: 'GitHub',
  },
  // List
  list: {
    title: 'Munten',
    loadingMore: 'Meer laden...',
    emptyError: 'Kon munten niet laden. Controleer je verbinding.',
    retry: 'Opnieuw',
  },
  // Stale banner
  stale: {
    usingCached: 'Gebruikt gecachte data',
    retry: 'Opnieuw',
  },
  // Coin detail
  detail: {
    currentPrice: 'Huidige prijs (USD)',
    change24h: '24u verandering',
    marketCap: 'Marktkapitalisatie',
    couldNotLoad: 'Kon niet laden. Controleer je verbinding.',
    notFound: 'Munt niet gevonden.',
    retry: 'Opnieuw',
  },
  // Last updated
  updated: {
    justNow: 'Zojuist',
    secondsAgo: '{{count}}s geleden',
    minutesAgo: '{{count}} min geleden',
    hoursAgo: '{{count}}u geleden',
    daysAgo: '{{count}}d geleden',
    label: 'Bijgewerkt {{time}}',
  },
} as const;
