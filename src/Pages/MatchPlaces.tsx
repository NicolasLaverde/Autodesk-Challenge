import { Places } from '../components/Places';
import './MatchPlacess.css'

export const MatchPlaces = () => {
    return (
        <>
         <header>
            <p>
                Create your personal collection of places you would like to visit or
                you have visited. Here you can see all the places you already match as liked
            </p>
        </header>
            <main>
                <Places
                    fallbackText={'Select the places you would like to visit in Home Page...'}
                />
            </main>
        </>
    );
  }
  