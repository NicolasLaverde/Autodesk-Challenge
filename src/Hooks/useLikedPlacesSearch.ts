import { useState } from 'react'
import { Place } from '../utils/MockData'
import { useDebouncedValue } from './useDebouncedValue'

export const SEARCH_DEBOUNCE_MS = 300

export interface LikedPlacesSearch {
    query: string
    setQuery: (value: string) => void
    results: readonly Place[]
    isEmpty: boolean
    hasNoMatches: boolean
}

export const useLikedPlacesSearch = (likedPlaces: readonly Place[]): LikedPlacesSearch => {
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS)

    const normalizedQuery = debouncedQuery.trim().toLowerCase()
    const results = normalizedQuery === ''
        ? likedPlaces
        : likedPlaces.filter(place => place.title.toLowerCase().includes(normalizedQuery))

    return {
        query,
        setQuery,
        results,
        isEmpty: likedPlaces.length === 0,
        hasNoMatches: likedPlaces.length > 0 && results.length === 0,
    }
}
