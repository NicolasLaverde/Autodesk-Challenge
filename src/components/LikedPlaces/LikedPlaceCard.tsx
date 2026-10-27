import { usePlaceCardFlip } from '../../Hooks/usePlaceCardFlip'
import { PlaceCard } from '../PlaceCard/PlaceCard'
import { LikedPlaceCardProps } from './types'

// Each liked card calls the hook itself, so flip state is independent per card.
export const LikedPlaceCard = ({ place }: LikedPlaceCardProps) => {
    const { isFlipped, toggleFlip } = usePlaceCardFlip(place.id)

    return (
        <PlaceCard
            place={place}
            isFlipped={isFlipped}
            onToggleFlip={toggleFlip}
        />
    )
}
