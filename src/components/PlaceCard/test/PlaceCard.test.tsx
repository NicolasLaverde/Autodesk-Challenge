import { describe, it, expect } from 'vitest'
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlaceCard } from '../PlaceCard'
import { AVAILABLE_PLACES, Place } from '../../../utils/MockData'

const place: Place = AVAILABLE_PLACES[0]

// Holds the flip state the same way the real pages do, so clicks change what is rendered.
const ControlledCard = ({ card }: { card: Place }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <PlaceCard
            place={card}
            isFlipped={isFlipped}
            onToggleFlip={() => setIsFlipped(current => !current)}
        />
    )
}

describe('PlaceCard flip', () => {
    it('F-1: shows the title and image on the front and the full description on the back', () => {
        render(<ControlledCard card={place} />)

        expect(screen.getByRole('heading', { level: 3, name: place.title })).toBeTruthy()
        expect(screen.getByRole('img', { name: place.image.alt })).toBeTruthy()
        expect(screen.getByText(/Hidden in dense forest/)).toBeTruthy()
    })

    it('F-2: the flip button switches between the two faces each time it is pressed', async () => {
        const user = userEvent.setup()
        render(<ControlledCard card={place} />)

        const flipButton = screen.getByRole('button', { name: 'Show details' })
        expect(flipButton.getAttribute('aria-pressed')).toBe('false')

        await user.click(flipButton)
        expect(screen.getByRole('button', { name: 'Show photo' }).getAttribute('aria-pressed')).toBe('true')

        await user.click(screen.getByRole('button', { name: 'Show photo' }))
        expect(screen.getByRole('button', { name: 'Show details' }).getAttribute('aria-pressed')).toBe('false')
    })

    it('F-2: clicking the card itself flips it', async () => {
        const user = userEvent.setup()
        render(<ControlledCard card={place} />)

        await user.click(screen.getByRole('img', { name: place.image.alt }))

        expect(screen.getByRole('button', { name: 'Show photo' })).toBeTruthy()
    })

    it('F-5: the face that is not showing is removed from the accessibility tree', async () => {
        const user = userEvent.setup()
        render(<ControlledCard card={place} />)

        expect(screen.getByRole('img', { name: place.image.alt })).toBeTruthy()

        await user.click(screen.getByRole('button', { name: 'Show details' }))

        expect(screen.queryByRole('img', { name: place.image.alt })).toBeNull()
    })

    it('F-7: the flip button can be reached with Tab and toggled with Enter and Space', async () => {
        const user = userEvent.setup()
        render(<ControlledCard card={place} />)

        await user.tab()
        const flipButton = screen.getByRole('button', { name: 'Show details' })
        expect(document.activeElement).toBe(flipButton)

        await user.keyboard('{Enter}')
        expect(screen.getByRole('button', { name: 'Show photo' })).toBeTruthy()

        await user.keyboard(' ')
        expect(screen.getByRole('button', { name: 'Show details' })).toBeTruthy()
    })
})
