import { useContext } from "react"
import { ActionsPlaceContext, PlaceContext } from "../components/PlaceProvider"
import { CurrentPlace } from "../components/CurrentPlaceProvider"

export function usePlaceInfoContext() {
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

export function useCurrentPlaceCtx() {
    const ctx = useContext(CurrentPlace)
    if(!ctx) {
        throw new Error('You must wrapped your component inside PlaceContext')
    }

    return ctx
}