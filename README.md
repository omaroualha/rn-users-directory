# Users Directory

A React Native app built with Expo that displays a paginated, searchable directory of users fetched from [DummyJSON](https://dummyjson.com/users).

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Expo SDK 55 / React Native 0.83.2 |
| Language | TypeScript (strict) |
| Navigation | React Navigation v7 (stack + bottom tabs) |
| Data fetching | TanStack React Query v5 |
| HTTP client | Axios |
| UI / Theming | Shopify Restyle |
| Animations | React Native Reanimated v4 |
| Unit tests | Jest + jest-expo + Testing Library |
| E2E tests | Detox |

---

## Prerequisites

- Node 20+
- Yarn
- Xcode 16+ (for iOS)
- iPhone 16 simulator installed (`Xcode → Settings → Platforms → iOS` — any iPhone 16 variant works)
- `detox-cli` globally installed for E2E: `yarn global add detox-cli`

---

## Setup

```bash
git clone https://github.com/omaroualha/rn-users-directory
cd UsersDirectory
yarn install
```

No `.env` file needed — the app fetches from the public DummyJSON API.

---

## Running the app

```bash
yarn ios       # iOS simulator (requires Xcode)
yarn android   # Android emulator (requires Android Studio)
yarn start     # Metro only — scan QR with Expo Go (animations may differ)
```

---

## Unit tests

```bash
yarn test          # run once
yarn test:watch    # watch mode
```

| Suite | What it covers |
|---|---|
| `UserListItem.test.tsx` | Renders name + department, fires `onPress` with correct userId |
| `useUserSearch.test.ts` | Disabled on empty input; fetches and maps on non-empty; surfaces `isError` on failure |

Mocks at the service boundary via `jest.spyOn(apiHub.users, 'searchUsers')`. Fixture data lives in `src/__fixtures__/users.ts`.

---

## E2E tests (Detox)

E2E tests drive a real iOS simulator — no mocks.

```bash
yarn test:e2e:build   # build native binary once (~5 min)
yarn test:e2e         # run the suite
```

The `.detoxrc.js` specifies `type: 'iPhone 16'`. If you don't have that exact model, run:

```bash
xcrun simctl list devicetypes | grep iPhone
```

and update the `device.type` field in `.detoxrc.js` to a model you have installed.

| Test | Flow |
|---|---|
| loads users on home screen | App boots → first user item is visible |
| search + detail + animation | Type to filter → tap user → detail screen → company section animates in |
| list ↔ grid toggle | Switch view mode → grid items visible |

---

## Search behaviour

The search is server-side — it hits `GET /users/search?q=<query>` on every debounced keystroke.

| Detail | Value |
|---|---|
| Debounce delay | 300 ms |
| Minimum query length | 1 character (whitespace-only is ignored) |
| Previous results while fetching | Kept visible (`keepPreviousData`) |
| Cache lifetime | 30 s (`staleTime`) — same query within 30 s is served from cache |
| Empty / whitespace input | Query is disabled — no API call fired |

Two separate state values drive the UX: `search` updates instantly (input feels responsive), `debouncedSearch` updates 300 ms later (drives the actual query). Typing "Omar" fires one request, not four.

When the search bar is cleared the paginated home list reappears — no remount, no flicker.

---

## Project structure

```
src/
├── api/
│   ├── AbstractService.ts       # Base axios class
│   ├── ApiHub.ts                # Singleton: apiHub.users.*
│   └── services/users/          # UsersService, types, mappers
├── features/feed/
│   ├── components/              # UserList, UserGrid
│   ├── hooks/                   # useUserList, useUserSearch, useUserById
│   ├── screens/                 # FeedHome, UserDetailScreen
│   └── types.ts                 # Domain types (UserSummary, UserDetail)
├── hooks/useDebounce.ts
├── navigation/                  # RootNavigator, MainTabStack
└── ui/
    ├── atoms/                   # Box, Text, Avatar, Input, IconButton
    ├── molecules/               # SearchBar, UserListItem, UserGridItem, InfoRow, …
    └── theme/                   # Restyle theme, tokens, palette
e2e/
├── feed.test.ts                 # Detox E2E suite
└── jest.config.js               # Separate Jest config for E2E
```

## Key decisions & tradeoffs

- **Feature-based folders** — screens, hooks, components, and types per feature in one place
- **`AbstractService → UsersService → ApiHub`** — shared axios config, single mock target in tests (`jest.spyOn(apiHub.users, …)`)
- **Domain mappers** (`toUserSummary`, `toUserDetail`) — strip API fields at the boundary so components only receive what they render
- **`useInfiniteQuery`** for the list — pagination, caching, and race-condition prevention out of the box
- **Debounce 300 ms** — two state values: `search` drives the input, `debouncedSearch` drives the query; avoids a fetch on every keystroke
- **`UserDetail` on `RootStack`** — sits above the tab navigator so the tab bar is hidden on the detail screen

---

## Error handling strategy

- **Network layer** — `AbstractService` catches axios errors and re-throws plain `Error` objects
- **Query layer** — React Query owns async error state; no try/catch in hooks
- **UI layer** — three states per screen: loading spinner (first load only) → error + retry button → content
- **Search** — `enabled: query.trim().length > 0` prevents the query from firing on empty input

---


## Commit conventions

Commit messages follow [gitmoji](https://gitmoji.dev/) because plain text commits are boring.
