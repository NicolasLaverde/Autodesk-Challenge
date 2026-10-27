# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server. The app only renders at `/autodesk-challenge` (see routing below), so open `http://localhost:5173/autodesk-challenge`, not the root.
- `npm run build` — runs `tsc` then `vite build`. Type checking is only done here (`tsconfig` has `noUnusedLocals`/`noUnusedParameters`, so unused code fails the build).
- `npm run lint` — ESLint over `.ts`/`.tsx` with `--max-warnings 0`. Passes on the current tree.
- `npm run preview` — serves the production build.
- `npm run deploy` — runs `predeploy` (build) and publishes `dist/` to GitHub Pages via `gh-pages`.
- `npx tsc --noEmit` — typecheck only, without the Vite build. This is the same check `npm run build` runs first.
- `npm run test` — Vitest (`vitest run`), jsdom environment, React Testing Library. Setup lives in `src/test/setup.ts` (clears `localStorage`, pins i18n to `en`, cleans up renders). Shared helpers are in `src/test/renderWithProviders.tsx`. Each test file lives in a `test/` folder beside the code it covers, for example `src/Hooks/test/useDebouncedValue.test.ts` for `src/Hooks/useDebouncedValue.ts`.
- `npm run test:watch` — same suite in watch mode.

## Quality gates

A change is done only when all of these pass:

1. `npx tsc --noEmit` — zero type errors.
2. `npm run lint` — zero warnings. Do not add new lint errors, and do not suppress rules to get around them.
3. `npm run test` — all tests pass. Do not report tests as passing without running this command.

## Architecture

This is a small React 18 + TypeScript SPA (Vite) where the user "swipes" through a fixed list of travel destinations and collects the ones they like.

**Routing (`src/App.tsx`)**: `createBrowserRouter` with one parent route `/autodesk-challenge` rendering `RootLayout` (navigation + `<Outlet />`). Children: index → `SwipeApp` (`src/Pages/Swipe.tsx`), `lovePlaces` → `MatchPlaces`. There is no `basename`; the path is hard-coded in the route. `vite.config.ts` sets `base` to the full GitHub Pages URL.

**State (`src/components/PlaceProvider.tsx`, `src/types/PlaceContext.ts`)**: a single `useReducer` holds `{ places, likedPlaces }`, seeded from `AVAILABLE_PLACES` in `src/utils/MockData.ts`. It is exposed through two contexts, `PlaceContext` (state) and `ActionsPlaceContext` (`AddLikedPlace`, `removeAPlace`). Read through the hooks in `src/Hooks/PlaceContext.tsx` (`usePlaceInfoContext`, `useActionPlaceContext`). Those hooks' null checks never fire because both contexts have non-null defaults, so using them outside the provider silently gets the empty defaults.

- `ADD_PLACE` moves a place from `places` to the front of `likedPlaces`; `REMOVE_PLACE` (dislike) just drops it from `places`. Both are keyed by place `id`. `REMOVE_LIKED_PLACE` takes a place out of `likedPlaces` and puts it back at the front of `places`. Otherwise the deck only shrinks as the user swipes.

**Swipe card flow**: `SwipeApp` calls `useCurrentPlaceManager(places)`, which copies `places[0]` into local state via `useEffect`. That value is provided through `CurrentPlace` (`src/components/CurrentPlaceProvider/index.ts`) to `PlaceCarrousel`, which renders the top card and the like/dislike buttons. Because the current card is set in an effect, it lags one render behind `places` changes. Note that `CurrentPlace` is a separate context from `PlaceContext`; it is only created inside `SwipeApp`.

**i18n (`src/i18n.ts`)**: i18next with browser language detection, `en` fallback, and resources inlined from `src/i18n/{en,es}/translation.json`. Components use `useTranslation()`. `LanguageSwitcher` is rendered once in `App.tsx`, outside the router, and calls `i18n.changeLanguage` directly. Nav link titles in `src/types/hamburgerMenu.ts` are translation keys passed through `t()` in `MenuList`.

**Assets**: place images are imported directly in `MockData.ts` (Vite bundles and hashes them), so adding a destination means adding an image in `src/assets/` and an entry in `AVAILABLE_PLACES`, plus the ids must stay unique.

## Engineering guardrails

### React components

- Functional components and hooks only. No class components.
- Business logic lives in custom hooks in `src/Hooks/`: state transitions, derived data, side effects, and data access. Components take data and callbacks and focus on rendering and event wiring.
- Components do not dispatch reducer actions or build new collections inline. They call a hook method such as `addLikedPlace(id)`.

### State and immutability

- Separate two kinds of state:
  - **Transient UI state** (menu open, input text, hover or animation flags) stays local with `useState`, in the component or hook closest to where it is used.
  - **Persistent collection data** (`places`, `likedPlaces`) lives only in the `PlaceProvider` reducer.
- Do not copy collection data into local state. Derive values during render, such as `places[0]`, instead of syncing them with `useEffect`. The existing `useCurrentPlaceManager` copy is a known lag source; do not extend that pattern.
- Update state immutably with spread, `map`, `filter`, and `slice`. Never `push`, `splice`, `sort` in place, or mutate reducer arguments.
- Address items by `id`, not by array index.

### TypeScript

- Keep `strict` mode and the `noUnusedLocals`/`noUnusedParameters` flags on.
- Zero `any`. Do not write `any`, `as any`, or `@ts-ignore`. Type values at boundaries (i18n, JSON, event payloads) as `unknown` and narrow them with type guards.
- Use `readonly` for state shapes and props that are not mutated.
- Shared types stay in `src/types/`, per the gotcha below.
- Enforcing `@typescript-eslint/no-explicit-any` in the ESLint config is the intended automated check. Until it is enabled, reject `any` in review.

### Testing

- Test user-visible behavior, not implementation details.
- Query by accessible role first: `getByRole`, then `getByLabelText` and `getByText`. Avoid `getByTestId`, `container.querySelector`, CSS classes, and internal hook return values.
- Interact through `userEvent`, not `fireEvent`, and assert on what the user sees: visible text, roles, and enabled or disabled state.
- Use `findBy*` or `waitFor` for async UI. Do not use fixed timeouts.
- Test the reducer as a pure function (state in, new state out). Test custom hooks with `renderHook` only when the logic has no UI surface. Otherwise test them through the component.
- Render components inside the providers they need. Pin i18n to `en` in the test setup so assertions on strings are stable regardless of the browser language.

## Gotchas

- Shared types are split: `src/types/` holds most of them, but the `Place` and image interfaces live in `src/utils/MockData.ts`.
- Folder casing is mixed (`Hooks/`, `Pages/` capitalized; `components/` lowercase). Match the neighbouring files rather than renaming.
