import { useState } from 'react'

export interface PlaceCardFlip {
    isFlipped: boolean
    toggleFlip: () => void
}

export const usePlaceCardFlip = (placeId: string | undefined): PlaceCardFlip => {
    // Stores the id of the flipped card. When the current card changes, its id no longer
    // matches, so the new card starts on the front without an effect.
    const [flippedPlaceId, setFlippedPlaceId] = useState<string | null>(null)

    const toggleFlip = (): void => {
        if (placeId === undefined) {
            return
        }
        setFlippedPlaceId(current => (current === placeId ? null : placeId))
    }

    return {
        isFlipped: placeId !== undefined && flippedPlaceId === placeId,
        toggleFlip,
    }
}
