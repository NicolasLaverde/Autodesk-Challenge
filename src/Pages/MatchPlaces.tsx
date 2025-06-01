import { useTranslation } from 'react-i18next';
import { LikedPlaces } from '../components/LikedPlaces';
import './MatchPlacess.css'

export const MatchPlaces = () => {
    const { t } = useTranslation();
    return (
        <>
         <header>
            <p>
               {t('yourPlaces.title')}
            </p>
        </header>
            <main>
                <LikedPlaces
                    fallbackText={t('yourPlaces.fallback')}
                />
            </main>
        </>
    );
  }
  