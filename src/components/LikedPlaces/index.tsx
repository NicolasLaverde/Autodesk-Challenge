import React, { useId } from "react"
import { useTranslation } from "react-i18next"
import { useActionPlaceContext, usePlaceInfoContext } from "../../Hooks/PlaceContext"
import { useLikedPlacesSearch } from "../../Hooks/useLikedPlacesSearch"
import { LikedPlaceCard } from "./LikedPlaceCard"
import { PlacesProps } from "./types"


export const LikedPlaces: React.FC<PlacesProps> = ({fallbackText}) => {

    const {likedPlaces} = usePlaceInfoContext()
    const {RemoveLikedPlace} = useActionPlaceContext()
    const {query, setQuery, results, isEmpty, hasNoMatches} = useLikedPlacesSearch(likedPlaces)
    const { t } = useTranslation()
    const searchId = useId()

    return (
        <section className="places-category">
            <h2>{t("header.placesLiked")}</h2>
            {isEmpty && <p className='fallback-text'>{fallbackText}</p>}
            {!isEmpty && (
                <>
                    <label htmlFor={searchId} className="visually-hidden">{t('search.label')}</label>
                    <input
                        id={searchId}
                        type="search"
                        className="liked-search"
                        placeholder={t('search.placeholder')}
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                    />
                    {hasNoMatches && <p className='fallback-text' role="status">{t('search.noMatches')}</p>}
                    {results.length > 0 && (
                        <ul className="liked-places">
                            {results.map((place) => (
                                <li key={place.id} className="place-item">
                                    <LikedPlaceCard place={place} />
                                    <button
                                        type="button"
                                        className="remove-liked-button"
                                        aria-label={t('liked.removeNamed', { title: place.title })}
                                        onClick={() => RemoveLikedPlace(place.id)}
                                    >
                                        {t('liked.remove')}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </section>
    )
}
