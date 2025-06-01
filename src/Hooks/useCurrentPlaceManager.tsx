import { useEffect, useState } from "react"
import { Place } from "../utils/MockData"

export const useCurrentPlaceManager = (places: Place[]) => {
    const [currentPlace, setCurrentPlace] = useState<Place | undefined>(undefined)
    
    useEffect(() => {
        if(places.length) {
            setCurrentPlace(places[0])
        }
    }, [places])

    return {currentPlace}
}