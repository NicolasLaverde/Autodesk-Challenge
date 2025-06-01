import { PlaceCarrousel } from "../components/PlaceCarrousel"
import { usePlaceInfoContext } from "../Hooks/PlaceContext"
import { CurrentPlace } from "../components/CurrentPlaceProvider"
import { useCurrentPlaceManager } from "../Hooks/useCurrentPlaceManager"
import { useTranslation } from 'react-i18next';

export const SwipeApp = () => {

    const {places} = usePlaceInfoContext()
    const {currentPlace} = useCurrentPlaceManager(places)
    const { t } = useTranslation();

    return (
        <CurrentPlace.Provider value={{ currentPlace }}>
            <div className="main-content-app">
                <header>
                    <h1> {t("title")} </h1>
                </header>
                <main>
                    {places.length ?
                        <PlaceCarrousel /> : 
                        <p>{t("no_places")}</p>
                    }
                    
                </main>
            </div>
        </CurrentPlace.Provider>
        
    )
}