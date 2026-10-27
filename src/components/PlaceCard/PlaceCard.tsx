import { useTranslation } from 'react-i18next'
import { PlaceCardProps } from './types'

// React 18 typings do not declare `inert`, so it is passed through a spread.
const INERT_ATTRIBUTES = { inert: '' }

export const PlaceCard = ({ place, isFlipped, onToggleFlip }: PlaceCardProps) => {
    const { t } = useTranslation()

    return (
        <div className="place-card-container">
            {/* Pointer users flip by clicking the card. Keyboard users use the button below. */}
            <div className="place-card" onClick={onToggleFlip}>
                <div className={isFlipped ? 'place-card-inner is-flipped' : 'place-card-inner'}>
                    <div
                        className="place-card-face place-card-front"
                        aria-hidden={isFlipped}
                        {...(isFlipped ? INERT_ATTRIBUTES : {})}
                    >
                        <img src={place.image.src} alt={place.image.alt} />
                        <h3>{place.title}</h3>
                    </div>
                    <div
                        className="place-card-face place-card-back"
                        aria-hidden={!isFlipped}
                        {...(isFlipped ? {} : INERT_ATTRIBUTES)}
                    >
                        <p>{place.description}</p>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="place-card-flip"
                aria-pressed={isFlipped}
                onClick={onToggleFlip}
            >
                {isFlipped ? t('card.showPhoto') : t('card.showDetails')}
            </button>
        </div>
    )
}
