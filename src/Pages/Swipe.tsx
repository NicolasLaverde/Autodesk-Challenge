import { createContext, useContext, useEffect, useState } from "react"
import { PlaceCarrousel } from "../components/PlaceCarrousel"
import { Place } from "../utils/MockData"
import { usePlaceInfoContext } from "../components/PlaceProvider"

type PlaceContext = {
    currentPlace: Place | undefined
}
const PlacesContext = createContext<PlaceContext>({
    currentPlace: undefined
})

export function useCurrentPlaceCtx() {
    const ctx = useContext(PlacesContext)
    console.log(ctx)
    if(!ctx) {
        throw new Error('You must wrapped your component inside PlaceContext')
    }

    return ctx
}

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