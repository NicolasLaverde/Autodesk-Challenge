import { Place } from '../../utils/MockData'

export interface PlaceCardProps {
    place: Place
    isFlipped: boolean
    onToggleFlip: () => void
}
