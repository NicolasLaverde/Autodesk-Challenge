import {
    LIKED_PLACES_SCHEMA_VERSION,
    LIKED_PLACES_STORAGE_KEY,
    StoredLikedPlaces
} from '../types/Persistence'

export function getBrowserStorage(): Storage | null {
    try {
        return window.localStorage
    } catch {
        // Accessing localStorage can throw when storage is disabled by the browser.
        return null
    }
}

function isStoredLikedPlaces(value: unknown): value is StoredLikedPlaces {
    if (typeof value !== 'object' || value === null || !('version' in value) || !('ids' in value)) {
        return false
    }

    return value.version === LIKED_PLACES_SCHEMA_VERSION
        && Array.isArray(value.ids)
        && value.ids.every(id => typeof id === 'string')
}

export function readLikedPlaceIds(storage: Storage | null): readonly string[] {
    if (!storage) {
        return []
    }

    let raw: string | null
    try {
        raw = storage.getItem(LIKED_PLACES_STORAGE_KEY)
    } catch {
        return []
    }
    if (raw === null) {
        return []
    }

    let parsed: unknown
    try {
        parsed = JSON.parse(raw)
    } catch {
        return []
    }
    if (!isStoredLikedPlaces(parsed)) {
        return []
    }

    return Array.from(new Set(parsed.ids))
}

export function writeLikedPlaceIds(storage: Storage | null, ids: readonly string[]): void {
    if (!storage) {
        return
    }

    const payload: StoredLikedPlaces = { version: LIKED_PLACES_SCHEMA_VERSION, ids }
    try {
        storage.setItem(LIKED_PLACES_STORAGE_KEY, JSON.stringify(payload))
    } catch (error) {
        console.warn('Could not persist liked places', error)
    }
}
