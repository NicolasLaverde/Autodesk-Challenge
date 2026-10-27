import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LikedPlaces } from '../LikedPlaces'
import { SwipeApp } from '../../Pages/Swipe'
import {
    renderWithProviders,
    seedLikedPlaceIds,
    seedRawStorage,
    readStoredValue
} from '../../test/renderWithProviders'
import { AVAILABLE_PLACES } from '../../utils/MockData'
import { LIKED_PLACES_STORAGE_KEY } from '../../types/Persistence'

const FALLBACK = 'Pick some places first'
const forest = AVAILABLE_PLACES.find(place => place.id === 'p1')!
const sahara = AVAILABLE_PLACES.find(place => place.id === 'p2')!
const japanese = AVAILABLE_PLACES.find(place => place.id === 'p8')!
const northern = AVAILABLE_PLACES.find(place => place.id === 'p7')!

const renderApp = () =>
    renderWithProviders(
        <>
            <SwipeApp />
            <LikedPlaces fallbackText={FALLBACK} />
        </>
    )

const likedRemoveNames = () =>
    screen.queryAllByRole('button', { name: /^Remove / }).map(button => button.getAttribute('aria-label'))

const skipCards = async (count: number) => {
    const user = userEvent.setup()
    for (let index = 0; index < count; index++) {
        await user.click(screen.getByRole('button', { name: 'Skip this place' }))
    }
}

describe('PlaceProvider persistence', () => {
    it('P-1: a liked place is restored after reload and is not shown in the deck', async () => {
        seedLikedPlaceIds([northern.id])
        renderApp()

        expect(screen.getByRole('button', { name: `Remove ${northern.title}` })).toBeTruthy()

        // The deck's first card is p1 and the next six skips reach p8. A deck that still
        // contained p7 would show it in the seventh position instead.
        await skipCards(6)
        expect(await screen.findByRole('heading', { level: 3, name: japanese.title })).toBeTruthy()
    })

    it('P-2: storage holds only the schema version and the liked ids', async () => {
        const user = userEvent.setup()
        renderApp()

        await user.click(screen.getByRole('button', { name: 'Like this place' }))

        expect(window.localStorage.getItem(LIKED_PLACES_STORAGE_KEY)).toBe('{"version":1,"ids":["p1"]}')
    })

    it('P-3: the liked order is the same after reload as before', async () => {
        const user = userEvent.setup()
        const first = renderApp()

        await user.click(screen.getByRole('button', { name: 'Like this place' }))
        await user.click(screen.getByRole('button', { name: 'Like this place' }))
        expect(likedRemoveNames()).toEqual([`Remove ${sahara.title}`, `Remove ${forest.title}`])

        first.unmount()
        renderApp()

        expect(likedRemoveNames()).toEqual([`Remove ${sahara.title}`, `Remove ${forest.title}`])
    })

    it('P-4: invalid stored JSON shows an empty liked list without throwing', () => {
        seedRawStorage('{not json')

        expect(() => renderWithProviders(<LikedPlaces fallbackText={FALLBACK} />)).not.toThrow()
        expect(screen.getByText(FALLBACK)).toBeTruthy()
    })

    it('P-5: an id that no longer exists is ignored and the valid ids still load', () => {
        seedRawStorage(JSON.stringify({ version: 1, ids: ['missing-id', northern.id] }))
        renderWithProviders(<LikedPlaces fallbackText={FALLBACK} />)

        expect(likedRemoveNames()).toEqual([`Remove ${northern.title}`])
    })

    it('P-6: when storage cannot be written, likes still work in memory and a warning is logged', async () => {
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota') })
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const user = userEvent.setup()
        renderApp()

        await user.click(screen.getByRole('button', { name: 'Like this place' }))

        expect(screen.getByRole('button', { name: `Remove ${forest.title}` })).toBeTruthy()
        expect(warn).toHaveBeenCalled()
    })

    it('S-6: a place removed from the liked list returns to the front of the deck', async () => {
        seedLikedPlaceIds([northern.id])
        renderApp()
        const user = userEvent.setup()

        await user.click(screen.getByRole('button', { name: `Remove ${northern.title}` }))

        expect(await screen.findByRole('heading', { level: 3, name: northern.title })).toBeTruthy()
        expect(screen.queryByRole('button', { name: `Remove ${northern.title}` })).toBeNull()
        expect(readStoredValue()).toEqual({ version: 1, ids: [] })
    })

    it('S-6: after a reload, a removed place is back in the deck at its original position', async () => {
        seedLikedPlaceIds([northern.id])
        const first = renderApp()
        const user = userEvent.setup()

        await user.click(screen.getByRole('button', { name: `Remove ${northern.title}` }))
        first.unmount()
        renderApp()

        // After reload the deck starts from the first place again. Northern Lights is the seventh
        // card, so six skips must reach it.
        await skipCards(6)
        expect(await screen.findByRole('heading', { level: 3, name: northern.title })).toBeTruthy()
    })
})
