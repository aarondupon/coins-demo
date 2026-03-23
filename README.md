# React Coins Demo

Monorepo with two Expo apps:

- **Coins App** — Cryptocurrency browsing (list + detail, real-time prices)
- **UI Demo Checkbox** — Storybook for UI component development

**[Architecture & decisions →](ARCHITECTURE.md)**

---

## Coins App

React 19, Expo 55, TypeScript, TanStack Query. iOS, Android, Web.

### Get started

```bash
cd coins-app && npm install
```

Create `coins-app/.env` with `EXPO_PUBLIC_API_URL`. Then:

```bash
cd coins-app
npm start        # or: npm run ios | android | web
```

### API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/coins?page[number]=1&page[size]=50` | Paginated list |
| GET | `/coins/:id` | Single coin |

### Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Expo dev server |
| `npm run web` | Web browser |
| `npm test` | Jest unit tests |
| `npm run e2e` | Cypress E2E (app must run at `localhost:8081`) |
| `npm run e2e:open` | Cypress UI |

### Testing

Unit: Jest + React Native Testing Library. E2E: Cypress on web build.

### CI

GitHub Actions on push/PR: `npm ci --legacy-peer-deps`, lint, unit tests. See [.github/workflows/ci.yml](.github/workflows/ci.yml).

---

## UI Demo Checkbox

Expo app for developing UI components with Storybook.

```bash
cd ui-demo-checkbox && npm install
npx expo start
```

### Storybook

```bash
npm run storybook
```

— `npm run storybook:ios` | `storybook:android` | `storybook:generate`
