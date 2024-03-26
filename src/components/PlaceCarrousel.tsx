import { useActionPlaceContext, useCurrentPlaceCtx } from "../Hooks/PlaceContext";

export function PlaceCarrousel() {
    const {currentPlace} = useCurrentPlaceCtx()

    const {removeAPlace, AddLikedPlace} = useActionPlaceContext()
    
    return (
        <>
            {currentPlace && (
                <section className="place-content"> 
                    <div className="place-image">
                        <button onClick={() => AddLikedPlace(currentPlace.id)}>
                            <img src={currentPlace.image.src} alt={currentPlace.image.alt} />
                            <h3>{currentPlace.title}</h3>
                        </button>
                    </div>
                    <main className='place-main'>
                        <p>{currentPlace.description}</p>
                        <div className="place-buttons">
                            <button 
                                className="dislike-button"
                                onClick={() => removeAPlace(currentPlace.id)}
                            />
                            <button
                                className="like-button"
                                onClick={() => AddLikedPlace(currentPlace.id)}
                            />
                        </div>   
                    </main>
                </section>
            )}
        </>
    );
  }
  