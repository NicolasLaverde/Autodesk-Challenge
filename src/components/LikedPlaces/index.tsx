import React from "react"
import { useTranslation } from "react-i18next"
import { usePlaceInfoContext } from "../../Hooks/PlaceContext"
import { PlacesProps } from "./types"


export const LikedPlaces: React.FC<PlacesProps> = ({fallbackText}) => {

    const {likedPlaces} = usePlaceInfoContext()
    const { t } = useTranslation()

    return (
        <section className="places-category">
            <h2>{t("header.placesLiked")}</h2>
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