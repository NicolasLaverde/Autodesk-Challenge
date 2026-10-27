import { useEffect } from 'react'
import { Place } from '../utils/MockData'
import { getBrowserStorage, writeLikedPlaceIds } from '../utils/likedPlacesStorage'

export const usePersistLikedPlaces = (likedPlaces: readonly Place[]): void => {
    useEffect(() => {
        writeLikedPlaceIds(getBrowserStorage(), likedPlaces.map(place => place.id))
    }, [likedPlaces])
}
