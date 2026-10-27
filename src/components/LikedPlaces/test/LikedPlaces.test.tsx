import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LikedPlaces } from '../index'
import { renderWithProviders, seedLikedPlaceIds, readStoredValue } from '../../../test/renderWithProviders'
import { AVAILABLE_PLACES } from '../../../utils/MockData'

const FALLBACK = 'Pick some places first'
const taj = AVAILABLE_PLACES.find(place => place.id === 'p9')!
const forest = AVAILABLE_PLACES.find(place => place.id === 'p1')!
const northern = AVAILABLE_PLACES.find(place => place.id === 'p7')!
const SEEDED_IDS = [taj.id, forest.id, northern.id]

const renderLiked = () => renderWithProviders(<LikedPlaces fallbackText={FALLBACK} />)

const removeButtons = () => screen.queryAllByRole('button', { name: /^Remove / })

afterEach(() => {
    vi.useRealTimers()
})

describe('LikedPlaces search', () => {
    it('S-8: the search field is a labelled searchbox and each place has a named remove button', () => {
        seedLikedPlaceIds(SEEDED_IDS)
        renderLiked()

        expect(screen.getByRole('searchbox', { name: 'Search your places' })).toBeTruthy()
        expect(screen.getByRole('button', { name: `Remove ${taj.title}` })).toBeTruthy()
    })

    it('S-1: the list does not filter while typing and filters once typing pauses', async () => {
        // Fake timers stall Testing Library's own waits, so this uses real time. The exact
        // 300 ms boundary is checked with fake timers in useDebouncedValue.test.ts.
        seedLikedPlaceIds(SEEDED_IDS)
        renderLiked()
        const user = userEvent.setup()

        await user.type(screen.getByRole('searchbox'), 'taj')
        expect(removeButtons()).toHaveLength(3)

        await waitFor(() => expect(removeButtons()).toHaveLength(1))
        expect(screen.getByRole('button', { name: `Remove ${taj.title}` })).toBeTruthy()
    })

    it('S-2: matches titles regardless of letter case', async () => {
        seedLikedPlaceIds(SEEDED_IDS)
        renderLiked()
        const user = userEvent.setup()

        await user.type(screen.getByRole('searchbox'), 'TAJ')

        await waitFor(() => expect(removeButtons()).toHaveLength(1))
        expect(screen.getByRole('button', { name: `Remove ${taj.title}` })).toBeTruthy()
    })

    it('S-3: whitespace-only input shows every liked place', async () => {
        seedLikedPlaceIds(SEEDED_IDS)
        renderLiked()
        const user = userEvent.setup()

        await user.type(screen.getByRole('searchbox'), '   ')

        await waitFor(() => expect(removeButtons()).toHaveLength(3))
    })

    it('S-4: a query with no matches shows the no-matches message and no list', async () => {
        seedLikedPlaceIds(SEEDED_IDS)
        renderLiked()
        const user = userEvent.setup()

        await user.type(screen.getByRole('searchbox'), 'zzz')

        expect(await screen.findByRole('status')).toBeTruthy()
        expect(screen.getByText('No places match your search')).toBeTruthy()
        expect(screen.queryByRole('list')).toBeNull()
    })
})

describe('LikedPlaces removal', () => {
    it('S-5: removing a place drops it from the list and from storage', async () => {
        seedLikedPlaceIds(SEEDED_IDS)
        renderLiked()
        const user = userEvent.setup()

        await user.click(screen.getByRole('button', { name: `Remove ${taj.title}` }))

        expect(screen.queryByRole('button', { name: `Remove ${taj.title}` })).toBeNull()
        expect(readStoredValue()).toEqual({ version: 1, ids: [forest.id, northern.id] })
    })

    it('S-7: removing the last place shows the fallback text', async () => {
        seedLikedPlaceIds([taj.id])
        renderLiked()
        const user = userEvent.setup()

        await user.click(screen.getByRole('button', { name: `Remove ${taj.title}` }))

        expect(screen.getByText(FALLBACK)).toBeTruthy()
        expect(screen.queryByRole('searchbox')).toBeNull()
    })
})

describe('LikedPlaces cards', () => {
    it('each liked card flips on its own', async () => {
        seedLikedPlaceIds([taj.id, forest.id])
        renderLiked()
        const user = userEvent.setup()

        await user.click(screen.getByRole('img', { name: taj.image.alt }))

        const pressed = screen.getAllByRole('button', { pressed: true })
        expect(pressed).toHaveLength(1)
        expect(screen.getByRole('button', { name: 'Show details' })).toBeTruthy()
    })
})
