import React from "react"
import { usePlaceInfoContext } from "./PlaceProvider"


interface PlacesProps {
    fallbackText: string
}
export const Places: React.FC<PlacesProps> = ({fallbackText}) => {

    const {likedPlaces} = usePlaceInfoContext()

    return (
        <section className="places-category">
            <h2>Places you Liked</h2>
            {likedPlaces.length === 0 && <p className='fallback-text'>{fallbackText}</p>}
            {likedPlaces.length > 0 && (
                <ul className="liked-places">
                {likedPlaces.map((place) => (
                    <li key={place.id} className="place-item">
                    <img src={place.image.src} alt={place.image.alt} />
                    <h3>{place.title}</h3>
                </li>
                ))}
            </ul>
            )}
        </section>
        )
}