/* eslint-disable react-refresh/only-export-components */

import React, { ReactNode, createContext, useContext, useReducer } from 'react'
import { AVAILABLE_PLACES } from '../utils/MockData'
import {
    ADD_PLACE,
    ActionPlaceContextType,
    PlaceAction,
    PlaceActions,
    PlaceContextType,
    PlaceState,
    REMOVE_PLACE
} from '../types/PlaceContext'

const PlaceContext = createContext<PlaceContextType>({
    places: [],
    likedPlaces: [],
})

const ActionsPlaceContext = createContext<ActionPlaceContextType>({
    removeAPlace: () => {},
    AddLikedPlace: () => {}
})

export const usePlaceInfoContext = () => {
    const ctx = useContext(PlaceContext)
    if (!ctx) {
        throw new Error('You must wrapped your component inside PlaceContext')
    }

    return ctx
}

export const useActionPlaceContext = () => {
    const ctx = useContext(ActionsPlaceContext)
    if (!ctx) {
        throw new Error('You must wrapped your component inside ActionsPlaceContext')
    }

    return ctx
}

const defaultState: PlaceState = {
    places: AVAILABLE_PLACES,
    likedPlaces: []
}


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
        default: {
            return state
        }
    }
}

export const PlaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(PlacesCartReducer, defaultState)

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


    const placeCtxvalue: PlaceContextType = {
        places: state.places,
        likedPlaces: state.likedPlaces,
    }

    const actionCtxValue: ActionPlaceContextType = {
        AddLikedPlace,
        removeAPlace
    }

    return (
        <PlaceContext.Provider value={placeCtxvalue}>
            <ActionsPlaceContext.Provider value={actionCtxValue} >
                {children}
            </ActionsPlaceContext.Provider>
        </PlaceContext.Provider>
    )
}
