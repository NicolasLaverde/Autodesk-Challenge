---
name: react-qa
description: Write and review Vitest and React Testing Library tests for this React + TypeScript app. Use when adding or changing tests, reviewing test code, or deciding what to assert. Enforces tests that query by accessible role and check user-visible behavior only, and forbids testing private hook state or CSS classes.
---

# React QA: Vitest + React Testing Library

Tests in this repo describe what a user can see and do. They do not describe how the code is built. A good test still passes after a refactor that keeps the user experience the same.

## Scope

Use this skill when you:

- add or change a test file under `src/`
- review a test for quality
- decide what a component or hook test should assert

Project context: React 18, TypeScript `strict`, i18n via `react-i18next` (English in tests), state in `PlaceProvider` reducer, routes under `/autodesk-challenge`. Read `CLAUDE.md` for commands. Do not invent test scripts. Run `npm run test` only once Vitest is configured.

## Core rules

1. **Query by role first.** Use `getByRole` with an accessible `name` whenever the element has a role. This is the default and the first option you reach for.
2. **Fall back in this order only when no role applies:** `getByLabelText`, then `getByText`, then `getByPlaceholderText`. Use `getByAltText` for images.
3. **Never use** `getByTestId`, `querySelector`, `container.firstChild`, CSS class names, or inline style checks.
4. **Never test private state.** Do not read `useState` values, reducer internals, ref values, or the return object of a hook when the UI can show the same thing. Do not assert that a specific function was called when the outcome is visible in the DOM.
5. **Interact with `userEvent`**, not `fireEvent`. Always `await` its calls. Create the instance with `const user = userEvent.setup()`.
6. **Assert on outcomes the user sees:** text, roles, enabled or disabled state, list contents, presence or absence of an element, and `aria-*` state such as `aria-pressed` or `aria-expanded`.
7. **Async UI:** use `findBy*` or `waitFor`. Never use fixed `setTimeout` delays. The only exception is fake timers for a debounce test, and the test must restore real timers.
8. **Isolation:** each test renders its own tree and does not depend on another test. Clear `localStorage` before each test.
9. **Names:** test names describe behavior in user terms, for example `it('shows only matching liked places after typing a title')`.

## Choosing the query

| Element | Query |
|---|---|
| Button | `getByRole('button', { name: /.../ })` |
| Link | `getByRole('link', { name: ... })` |
| Text input | `getByRole('textbox', { name: ... })` |
| Search input | `getByRole('searchbox', { name: ... })` |
| Heading | `getByRole('heading', { name: ..., level: 2 })` |
| List and items | `getByRole('list')`, `getAllByRole('listitem')` |
| Image | `getByRole('img', { name: ... })` |
| Hidden content check | `queryByRole(...)` returns `null` (hidden from the accessibility tree is what matters) |

If an element has no accessible name, fix the component first. Add an `aria-label` or visible text, using i18n. Do not work around it with a test id. Known gap: the like and dislike buttons in `src/components/PlaceCarrousel.tsx` have no text and only a background image, so they currently have no accessible name. Add one before writing tests that click them.

## Example

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { LikedPlaces } from './index'

describe('LikedPlaces', () => {
  it('shows the fallback message when nothing is liked yet', () => {
    render(<LikedPlaces fallbackText="Pick some places first" />)

    expect(screen.getByText('Pick some places first')).toBeTruthy()
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('removes a place from the list when its remove button is pressed', async () => {
    const user = userEvent.setup()
    render(/* wrap with the providers the component needs, see below */)

    await user.click(screen.getByRole('button', { name: 'Remove Taj Mahal' }))

    expect(screen.queryByRole('heading', { name: 'Taj Mahal' })).toBeNull()
  })
})
```

The second test shows the intended shape. Its button name exists only after the remove feature in `SPEC.md` section 3 is built. Until then, skip that test or mark it `it.todo`.

## Providers and rendering

- Render the component inside the providers it reads from. Use a shared helper such as `renderWithProviders` in `src/test/` once it exists. Do not reimplement `PlaceProvider` logic in the test.
- Components that call `useTranslation` get English strings because the test setup pins `i18n` to `en`. Assert on the English text.
- For full-page routing, use `createMemoryRouter` with the same route shape as `src/App.tsx`. Do not rely on the browser URL.

## Hooks

Test a custom hook through a component that uses it. Use `renderHook` only when the hook has no UI surface, such as `useDebouncedValue`. Assert on the returned value's observable behavior: the value after waiting, not the internal `useState` or `useEffect` calls.

## Pure logic

Reducers and storage helpers are plain functions. Test them directly with inputs and outputs. This is not "testing private state." It is testing a public function.

## Review checklist

Before accepting a test, confirm:

- [ ] Every query uses a role or a text, label, or alt lookup. No test ids, class names, or DOM traversal.
- [ ] No assertion reads hook state, reducer internals, or a mock call where a visible outcome exists.
- [ ] Every interaction uses `userEvent` and is awaited.
- [ ] The test would still pass after a refactor that keeps the UI the same.
- [ ] Async assertions use `findBy*` or `waitFor`.
- [ ] No `any`. Types are explicit at helper boundaries.
- [ ] The test name describes what the user sees or does.

## Anti-patterns

```tsx
// Bad: class name couples the test to styling
container.querySelector('.like-button')

// Bad: tests internal state
expect(result.current.currentPlace).toBe(places[0])

// Bad: checks a mock call instead of the outcome
expect(removeAPlace).toHaveBeenCalledWith('p1')

// Bad: test id
screen.getByTestId('liked-list')

// Good: the section heading is the accessible entry point
expect(screen.getByRole('heading', { name: 'Places You Liked', level: 2 })).toBeTruthy()
```

Use `toBeTruthy` and `toBeNull` when `@testing-library/jest-dom` is not installed. Add jest-dom matchers only if the team decides to.
