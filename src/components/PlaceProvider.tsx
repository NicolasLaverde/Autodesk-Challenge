import React, { ReactNode, createContext, useReducer } from 'react'
import { AVAILABLE_PLACES } from '../utils/MockData'
import {
    ADD_PLACE,
    ActionPlaceContextType,
    PlaceAction,
    PlaceActions,
    PlaceContextType,
    PlaceState,
    REMOVE_LIKED_PLACE,
    REMOVE_PLACE
} from '../types/PlaceContext'
import { createInitialPlaceState } from '../utils/placeState'
import { getBrowserStorage, readLikedPlaceIds } from '../utils/likedPlacesStorage'
import { usePersistLikedPlaces } from '../Hooks/usePersistLikedPlaces'

export const PlaceContext = createContext<PlaceContextType>({
    places: [],
    likedPlaces: [],
})

export const ActionsPlaceContext = createContext<ActionPlaceContextType>({
    removeAPlace: () => {},
    AddLikedPlace: () => {},
    RemoveLikedPlace: () => {},
})

function PlacesCartReducer(state: PlaceState, action: PlaceAction): PlaceState {
    switch (action.type) {
        case ADD_PLACE: {
            const idPlace = action.payload
            const place = AVAILABLE_PLACES.find(place => place.id === idPlace)
            if (place) {
                return {
                    ...state,
                    likedPlaces: [place, ...state.likedPlaces],
                    places: state.places.filter(place => place.id !== idPlace)
                }
            }
            return { ...state }
        }
        case REMOVE_PLACE: {
            const idPlace = action.payload
            return {
                ...state,
                places: state.places.filter(place => place.id !== idPlace)
            }
        }
        case REMOVE_LIKED_PLACE: {
            const idPlace = action.payload
            const removedPlace = state.likedPlaces.find(place => place.id === idPlace)
            if (!removedPlace) {
                return state
            }
            // The removed place goes back to the front of the deck so it is the next card shown.
            return {
                ...state,
                likedPlaces: state.likedPlaces.filter(place => place.id !== idPlace),
                places: [removedPlace, ...state.places.filter(place => place.id !== idPlace)]
            }
        }
        default: {
            return state
        }
    }
}

export const PlaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(PlacesCartReducer, undefined, () =>
        createInitialPlaceState(readLikedPlaceIds(getBrowserStorage()))
    )

    usePersistLikedPlaces(state.likedPlaces)

    const removeAPlace = (idPlace: string): void => {
        dispatch({
            type: PlaceActions.REMOVE_PLACE,
            payload: idPlace
        })
    }

    const AddLikedPlace = (idPlace: string): void => {
        dispatch({
            type: PlaceActions.ADD_PLACE,
            payload: idPlace
        })
    }

    const RemoveLikedPlace = (idPlace: string): void => {
        dispatch({
            type: PlaceActions.REMOVE_LIKED_PLACE,
            payload: idPlace
        })
    }


    const placeCtxvalue: PlaceContextType = {
        places: state.places,
        likedPlaces: state.likedPlaces,
    }

    const actionCtxValue: ActionPlaceContextType = {
        AddLikedPlace,
        removeAPlace,
        RemoveLikedPlace,
    }

    return (
        <PlaceContext.Provider value={placeCtxvalue}>
            <ActionsPlaceContext.Provider value={actionCtxValue} >
                {children}
            </ActionsPlaceContext.Provider>
        </PlaceContext.Provider>
    )
}
