export default {
  // Accessibility
  a11y: {
    loading: 'Loading',
    back: 'Back',
  },
  // Tab
  tabs: {
    coins: 'Coins',
    github: 'GitHub',
  },
  // List
  list: {
    title: 'Coins',
    loadingMore: 'Loading more...',
    emptyError: 'Could not load coins. Check your connection.',
    retry: 'Retry',
  },
  // Stale banner
  stale: {
    usingCached: 'Using cached data',
    retry: 'Retry',
  },
  // Coin detail
  detail: {
    currentPrice: 'Current Price (USD)',
    change24h: '24h Change',
    marketCap: 'Market Cap',
    couldNotLoad: 'Could not load. Check your connection.',
    notFound: 'Coin not found.',
    retry: 'Retry',
  },
  // Last updated
  updated: {
    justNow: 'Just now',
    secondsAgo: '{{count}}s ago',
    minutesAgo: '{{count}} min ago',
    hoursAgo: '{{count}}h ago',
    daysAgo: '{{count}}d ago',
    label: 'Updated {{time}}',
  },
} as const;
