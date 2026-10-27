import { useTranslation } from "react-i18next";
import { useActionPlaceContext, useCurrentPlaceCtx } from "../Hooks/PlaceContext";
import { usePlaceCardFlip } from "../Hooks/usePlaceCardFlip";
import { PlaceCard } from "./PlaceCard/PlaceCard";

export function PlaceCarrousel() {
    const {currentPlace} = useCurrentPlaceCtx()

    const {removeAPlace, AddLikedPlace} = useActionPlaceContext()
    const {isFlipped, toggleFlip} = usePlaceCardFlip(currentPlace?.id)
    const { t } = useTranslation()

    return (
        <>
            {currentPlace && (
                <section className="place-content">
                    <PlaceCard
                        key={currentPlace.id}
                        place={currentPlace}
                        isFlipped={isFlipped}
                        onToggleFlip={toggleFlip}
                    />
                    <main className='place-main'>
                        <div className="place-buttons">
                            <button
                                className="dislike-button"
                                aria-label={t('swipe.dislike')}
                                onClick={() => removeAPlace(currentPlace.id)}
                            />
                            <button
                                className="like-button"
                                aria-label={t('swipe.like')}
                                onClick={() => AddLikedPlace(currentPlace.id)}
                            />
                        </div>
                    </main>
                </section>
            )}
        </>
    );
  }
