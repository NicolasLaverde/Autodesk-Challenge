import { createContext, useEffect, useState } from "react"
import { PlaceCarrousel } from "../components/PlaceCarrousel"
import { Place } from "../utils/MockData"
import { usePlaceInfoContext } from "../Hooks/PlaceContext"
import { CurrentPlaceContext } from "../types/PlaceContext"

export const CurrentPlace = createContext<CurrentPlaceContext>({
    currentPlace: undefined
})

export const SwipeApp = () => {

    const {places} = usePlaceInfoContext()
    const [currentPlace, setCurrentPlace] = useState<Place | undefined>(undefined)
    
    useEffect(() => {
        if(places.length) {
            setCurrentPlace(places[0])
        }
    }, [places])

    const placesCtx = {
        currentPlace
    }

    return (
        <CurrentPlace.Provider value={placesCtx}>
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
        </CurrentPlace.Provider>
        
    )
}