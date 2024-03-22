import { createContext, useContext, useEffect, useState } from "react"
import { PlaceCarrousel } from "../components/PlaceCarrousel"
import { Place } from "../utils/MockData"
import { MainContext } from "../App";

type PlaceContext = {
    currentPlace: Place | undefined
    addPlaceToList: (idPlace: string) => void
    dislikePlace: () => void
}
const PlacesContext = createContext<PlaceContext>({
    currentPlace: undefined,
    addPlaceToList: () => {},
    dislikePlace: () => {}
})

export function usePlaceContext() {
    const ctx = useContext(PlacesContext)
    if(!ctx) {
        throw new Error('You must wrapped your component inside PlaceContext')
    }

    return ctx
}

export const SwipeApp = () => {

    const {places, removeAPlace, AddLikedPlace} = useContext(MainContext)

    const [currentPlace, setCurrentPlace] = useState<Place | undefined>(undefined)

    
    useEffect(() => {
        if(places.length) {
            setCurrentPlace(places[0])
        }
    }, [places])
    
    const addPlaceToList = (idPlace : string): void => {
        AddLikedPlace(idPlace)
        removeAPlace()
    }

    const dislikePlace = () => {
        removeAPlace()
    }
    const placesCtx: PlaceContext = {
        currentPlace,
        addPlaceToList,
        dislikePlace
    }

    return (
        <PlacesContext.Provider value={placesCtx}>
            <div className="main-content-app">
                <header>
                    <h1> Match your place </h1>
                </header>
                <main>
                    {places.length ?
                        <PlaceCarrousel /> : 
                        <p> There's no more places...</p>
                    }
                    
                </main>
            </div>
        </PlacesContext.Provider>
        
    )
}