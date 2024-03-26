import { Place } from "../utils/MockData"

export enum PlaceActions {
    ADD_PLACE = 'ADD_PLACE',
    REMOVE_PLACE = 'REMOVE_PLACE',
}

export interface PlaceContextType {
    places: Place[],
    likedPlaces: Place[]
}

export interface ActionPlaceContextType {
    removeAPlace: (idPlace: string) => void
    AddLikedPlace: (idPlace: string) => void
}


export interface PlaceAction {
    type: PlaceActions;
    payload: undefined | string;
}

export interface PlaceState {
    places: Place[]
    likedPlaces: Place[]
}

export interface CurrentPlaceContext {
    currentPlace: Place | undefined
}

export const ADD_PLACE = 'ADD_PLACE'
export const REMOVE_PLACE = 'REMOVE_PLACE'
