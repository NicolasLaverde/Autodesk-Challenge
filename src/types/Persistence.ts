export const LIKED_PLACES_STORAGE_KEY = 'autodesk-challenge:liked-places'
export const LIKED_PLACES_SCHEMA_VERSION = 1

export interface StoredLikedPlaces {
    version: typeof LIKED_PLACES_SCHEMA_VERSION
    ids: readonly string[]
}
