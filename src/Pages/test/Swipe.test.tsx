import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SwipeApp } from '../Swipe'
import { renderWithProviders, readStoredValue } from '../../test/renderWithProviders'
import { AVAILABLE_PLACES } from '../../utils/MockData'

const forest = AVAILABLE_PLACES[0]
const sahara = AVAILABLE_PLACES[1]

describe('Swipe page', () => {
    it('F-3: clicking the card image flips the card and does not like the place', async () => {
        const user = userEvent.setup()
        renderWithProviders(<SwipeApp />)

        await user.click(screen.getByRole('img', { name: forest.image.alt }))

        expect(screen.getByRole('button', { name: 'Show photo' }).getAttribute('aria-pressed')).toBe('true')
        expect(readStoredValue()).toEqual({ version: 1, ids: [] })
    })

    it('F-4: the next card starts on its front even when the previous card was flipped', async () => {
        const user = userEvent.setup()
        renderWithProviders(<SwipeApp />)

        await user.click(screen.getByRole('button', { name: 'Show details' }))
        await user.click(screen.getByRole('button', { name: 'Like this place' }))

        expect(await screen.findByRole('heading', { level: 3, name: sahara.title })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Show details' }).getAttribute('aria-pressed')).toBe('false')
    })

    it('liking a card moves it out of the deck and into storage', async () => {
        const user = userEvent.setup()
        renderWithProviders(<SwipeApp />)

        await user.click(screen.getByRole('button', { name: 'Like this place' }))

        expect(await screen.findByRole('heading', { level: 3, name: sahara.title })).toBeTruthy()
        expect(readStoredValue()).toEqual({ version: 1, ids: [forest.id] })
    })

    it('skipping a card removes it from the deck', async () => {
        const user = userEvent.setup()
        renderWithProviders(<SwipeApp />)

        await user.click(screen.getByRole('button', { name: 'Skip this place' }))

        expect(await screen.findByRole('heading', { level: 3, name: sahara.title })).toBeTruthy()
        expect(screen.queryByRole('heading', { level: 3, name: forest.title })).toBeNull()
    })
})
