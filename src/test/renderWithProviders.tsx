import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { PlaceProvider } from '../components/PlaceProvider'
import { LIKED_PLACES_SCHEMA_VERSION, LIKED_PLACES_STORAGE_KEY } from '../types/Persistence'

export const renderWithProviders = (ui: ReactElement) =>
    render(<PlaceProvider>{ui}</PlaceProvider>)

export const seedRawStorage = (raw: string): void =>
    window.localStorage.setItem(LIKED_PLACES_STORAGE_KEY, raw)

export const seedLikedPlaceIds = (ids: readonly string[]): void =>
    seedRawStorage(JSON.stringify({ version: LIKED_PLACES_SCHEMA_VERSION, ids }))

export const readStoredValue = (): unknown =>
    JSON.parse(window.localStorage.getItem(LIKED_PLACES_STORAGE_KEY) ?? 'null')
