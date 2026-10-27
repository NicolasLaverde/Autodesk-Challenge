import { AVAILABLE_PLACES, Place } from './MockData'
import { PlaceState } from '../types/PlaceContext'

export function createInitialPlaceState(likedIds: readonly string[]): PlaceState {
    const likedPlaces = likedIds
        .map(id => AVAILABLE_PLACES.find(place => place.id === id))
        .filter((place): place is Place => place !== undefined)
    const likedIdSet = new Set(likedPlaces.map(place => place.id))

    return {
        places: AVAILABLE_PLACES.filter(place => !likedIdSet.has(place.id)),
        likedPlaces,
    }
}
