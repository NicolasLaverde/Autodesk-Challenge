import { describe, it, expect, vi } from 'vitest'
import {
    getBrowserStorage,
    readLikedPlaceIds,
    writeLikedPlaceIds
} from '../likedPlacesStorage'
import { LIKED_PLACES_STORAGE_KEY } from '../../types/Persistence'

const memoryStorage = (): Storage => {
    const data = new Map<string, string>()
    return {
        get length() { return data.size },
        clear: () => data.clear(),
        getItem: (key: string) => data.get(key) ?? null,
        key: (index: number) => Array.from(data.keys())[index] ?? null,
        removeItem: (key: string) => { data.delete(key) },
        setItem: (key: string, value: string) => { data.set(key, value) },
    }
}

const storedWith = (raw: string): Storage => {
    const storage = memoryStorage()
    storage.setItem(LIKED_PLACES_STORAGE_KEY, raw)
    return storage
}

describe('readLikedPlaceIds (P-7)', () => {
    it('returns an empty list when storage is unavailable', () => {
        expect(readLikedPlaceIds(null)).toEqual([])
    })

    it('returns an empty list when nothing is stored', () => {
        expect(readLikedPlaceIds(memoryStorage())).toEqual([])
    })

    it('returns an empty list for invalid JSON', () => {
        expect(readLikedPlaceIds(storedWith('{not json'))).toEqual([])
    })

    it('returns an empty list for an unknown schema version', () => {
        expect(readLikedPlaceIds(storedWith(JSON.stringify({ version: 2, ids: ['p1'] })))).toEqual([])
    })

    it('rejects the whole payload when any id is not a string', () => {
        expect(readLikedPlaceIds(storedWith(JSON.stringify({ version: 1, ids: ['p1', 3] })))).toEqual([])
    })

    it('removes duplicate ids and keeps the stored order', () => {
        const storage = storedWith(JSON.stringify({ version: 1, ids: ['p7', 'p2', 'p7'] }))
        expect(readLikedPlaceIds(storage)).toEqual(['p7', 'p2'])
    })

    it('returns an empty list when reading the storage throws', () => {
        const storage = memoryStorage()
        vi.spyOn(storage, 'getItem').mockImplementation(() => { throw new Error('denied') })
        expect(readLikedPlaceIds(storage)).toEqual([])
    })
})

describe('writeLikedPlaceIds (P-2, P-7)', () => {
    it('writes the versioned payload with ids only', () => {
        const storage = memoryStorage()
        writeLikedPlaceIds(storage, ['p7', 'p2'])
        expect(storage.getItem(LIKED_PLACES_STORAGE_KEY)).toBe('{"version":1,"ids":["p7","p2"]}')
    })

    it('does nothing when storage is unavailable', () => {
        expect(() => writeLikedPlaceIds(null, ['p1'])).not.toThrow()
    })

    it('warns and does not throw when the write fails', () => {
        const storage = memoryStorage()
        vi.spyOn(storage, 'setItem').mockImplementation(() => { throw new Error('quota') })
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

        expect(() => writeLikedPlaceIds(storage, ['p1'])).not.toThrow()
        expect(warn).toHaveBeenCalledOnce()
    })
})

describe('getBrowserStorage (P-7)', () => {
    it('returns the browser localStorage when it is accessible', () => {
        expect(getBrowserStorage()).toBe(window.localStorage)
    })
})
