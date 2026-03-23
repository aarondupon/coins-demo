# Architecture

High-level architecture of the cryptocurrency browsing app.

---

## Monorepo overview

The repository is a simple monorepo with two independent Expo apps:

| App | Purpose |
|-----|---------|
| **coins-app** | Main product — cryptocurrency browsing (list, detail, real-time prices). React 19, Expo 55, TanStack Query. |
| **ui-demo-checkbox** | Component development sandbox — Storybook for building and testing UI components (e.g. Checkbox, Checklist) in isolation. Expo 54. |

**CI:** GitHub Actions runs on push/PR for both apps. See [.github/workflows/ci.yml](.github/workflows/ci.yml).

Each app has its own `package.json`, dependencies, and scripts. Apps do not share code; components built in ui-demo-checkbox are meant to be copied or extracted into coins-app (or another consumer) when ready.

In production, I would typically use **Turborepo** for caching, parallel tasks, and shared dependency management across packages.

---

# Coins App

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
Stale times: 5min list and detail. Retry: 3 attempts, exponential backoff. `throwOnError: false` on list so UI can show retry instead of app-level error.

**Error handling**  
Render → ErrorBoundary. Network → per-query; toast for non-blocking, retry UI for critical. StaleBanner when showing cached data after error.

**Theming** — `getColors(colorScheme)` in `constants/theme.ts`; `useColors()` reads `useColorScheme()`.

**i18n** — `i18n/index.ts` + `expo-localization`; `useTranslation()`; locales in `locales/{en,nl}.ts`.

**Client state** — No **Zustand** (or similar). No shared UI state, settings, configs, or dark-mode toggle. theme follows `useColorScheme()`, so a global store is unnecessary. Add only when really needed.

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

**Tradeoffs:** React version (19.1.0) pinned by Expo SDK template; `@testing-library/react-native` expects React ^19.2.4 (newer peer). Installed with `--legacy-peer-deps` — safe for dev dependencies. This is a common ecosystem timing issue, not a code problem. Icons from delta.app (would proxy in prod for caching).

---

## Design notes

- **API:** `/coins/:id` uses `id`; `dirtyCode` is the display ticker;
`EXPO_PUBLIC_API_URL` required; trailing slash stripped.
- **Pagination:** 1-based (`page[number]=1`).
- **Price format:** Locale from device; thresholds: ≥$1 → 2 decimals, ≥$0.0001 → 4, else 6.
- **i18n:** Locales en, nl; device locale via expo-localization; fallback to en.
- **Icons:** Public URLs; no auth; prod would proxy/cache.
- **Component sharing:** Turborepo for sharing in real world version.
- **Cache:** Fixed 24h for AsyncStorage persistence.
- **Persistence:** safeAsyncStorage no-ops on failure so app works without persistence (e.g. if native module unavailable).
---

## Checkbox component (ui-demo-checkbox)

How the Checkbox/Checklist scales:

- **renderItem** — Custom item renderer; override default row layout per item. Use for sectioned UIs, custom variants (rounded, add), or integrating with app-specific styling.
- **Virtualization** — `virtualized={true}` switches to FlatList for long lists. Don’t nest in ScrollView; let FlatList handle scrolling.
- **Theme** — Optional `theme="light" | "dark"`; integrates with `CHECKLIST_THEME`. Pass via `renderItem` or at Checklist level for consistent styling. Can later adapt to more common theming (context, design tokens).
- **Icon system** — Simple SVG icons (check, plus, indeterminate dash); easy to swap or extend. Override with `iconStyle` or custom `renderItem`.
- **Opt in error message** - If requiered an error message can be added on error
- **React Hook Form** controlled UI components that match pattern (value / onChange), and they support hasError / errorMessage

## Storybook

Storybook lives in **ui-demo-checkbox** (separate Expo app). Use it to build and test UI components in isolation without running the full Coins app.

**Why:** Develop components faster, verify edge cases (empty states, long text, dark mode) without navigation or API calls, and keep a visual catalog for design consistency.

Run: `cd ui-demo-checkbox && npm run storybook`

---

## Final note

**Tailwind** is not used here — it adds complexity for running on device and is out of scope. In large apps with Figma, Tailwind can be extracted or generated automatically, if initial update effort in legacy codebase is low. I would likly use it. ([nativewind.dev](https://www.nativewind.dev/)).

For production, I would add **Sentry** (`@sentry/react-native`) for error monitoring (wrap root in `app/_layout.tsx`) and **Chromatic** with Storybook for regression, visual, and accessibility testing ([chromatic.com](https://www.chromatic.com/)).

Data fetching, offline behavior, and error recovery are handled with TanStack Query and a clear caching strategy. The Checkbox stays scalable via `renderItem`, optional theme, and documented assumptions so variants and states can grow with minimal churn.


### ISSUE:
 - some api calls returns mixed types, string for volume24hInUSD

