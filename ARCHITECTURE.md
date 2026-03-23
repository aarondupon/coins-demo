# Coins App — Architecture

High-level architecture of the cryptocurrency browsing app.

---

## Project Tree

```
coins-app/
├── app/
│   ├── _layout.tsx         # Root layout, QueryClient, ErrorBoundary
│   ├── (tabs)/
│   │   ├── _layout.tsx     # Tab layout (Coins, GitHub)
│   │   ├── index.tsx       # Coins list
│   │   └── github.tsx      # GitHub tab
│   └── coin/[id].tsx       # Coin detail
├── api/
│   ├── client.ts           # HTTP client (apiGet)
│   ├── coins.ts            # Coins API
│   └── index.ts
├── components/
├── constants/theme.ts      # Light/dark themes
├── hooks/
│   ├── use-colors.ts
│   ├── use-translation.ts
│   ├── use-infinite-coins.ts
│   └── use-coin-detail.ts
├── i18n/
├── locales/                # en, nl
├── types/coin.schema.ts    # Zod schemas
└── utils/format-coin.ts    # Price formatting
```

---

## Layers

| Layer | Responsibility | Key modules |
|-------|----------------|-------------|
| **UI** | Screens, components | `app/`, `components/` |
| **Hooks** | Data binding, theme, i18n | `hooks/` |
| **API** | HTTP client, requests | `api/` |
| **Types** | Schemas, validation | `types/` |
| **Infrastructure** | i18n, theming, utils | `i18n/`, `constants/`, `locales/`, `utils/` |

---

## Provider Tree (Root layout)

1. **Cache** — AsyncStorage persistence, max 24h
2. **Query errors** — Reset failed requests without reload
3. **ErrorBoundary** — "Try again" on crash
4. **Screens** — List, detail, tabs

---

## Routing

| Route | File | Description |
|-------|------|-------------|
| `/(tabs)` | `app/(tabs)/index.tsx` | Coins list |
| `/(tabs)/github` | `app/(tabs)/github.tsx` | GitHub link |
| `/coin/[id]` | `app/coin/[id].tsx` | Coin detail |

Stack for list/detail; bottom tabs (FloatingTabBar) for Coins + GitHub.

---

## Key Patterns

**Data fetching (TanStack Query)**  
Stale times: 5min list, 2min detail. Retry: 3 attempts, exponential backoff. `throwOnError: false` on list so UI can show retry instead of app-level error.

**Error handling**  
Render → ErrorBoundary. Network → per-query; toast for non-blocking, retry UI for critical. StaleBanner when showing cached data after error.

**Theming** — `getColors(colorScheme)` in `constants/theme.ts`; `useColors()` reads `useColorScheme()`.

**i18n** — `i18n/index.ts` + `expo-localization`; `useTranslation()`; locales in `locales/{en,nl}.ts`.

---


## Dependencies (Architecture)

| Package | Role |
|---------|------|
| Expo Router | File-based routing, layouts |
| TanStack Query | Server state, caching |
| @tanstack/query-async-storage-persister | AsyncStorage persistence |
| Zod | Response validation |
| i18n-js | Translations |
| react-native-reanimated | Animations |

---

## Storybook

Storybook lives in **ui-demo-checkbox** (separate Expo app). Use it to build and test UI components in isolation without running the full Coins app.

**Why:** Develop components faster, verify edge cases (empty states, long text, dark mode) without navigation or API calls, and keep a visual catalog for design consistency.

Run: `cd ui-demo-checkbox && npm run storybook`

---

**Tradeoffs:** `--legacy-peer-deps` (React 19 + testing libs). Icons from delta.app (would proxy in prod for caching).
