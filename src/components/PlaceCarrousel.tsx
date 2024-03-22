import { usePlaceContext } from "../Pages/Swipe";

export function PlaceCarrousel() {
    const {
        currentPlace,
        addPlaceToList,
        dislikePlace
    } = usePlaceContext()
    
    return (
        <>
            {currentPlace && (
                <section className="place-content"> 
                    <div className="place-image">
                        <button onClick={() => addPlaceToList(currentPlace.id)}>
                            <img src={currentPlace.image.src} alt={currentPlace.image.alt} />
                            <h3>{currentPlace.title}</h3>
                        </button>
                    </div>
                    <main className='place-main'>
                        <p>{currentPlace.description}</p>
                        <div className="place-buttons">
                            <button 
                                className="dislike-button"
                                onClick={dislikePlace}
                            />
                            <button
                                className="like-button"
                                onClick={() => addPlaceToList(currentPlace.id)}
                            />
                        </div>   
                    </main>
                </section>
            )}
        </>
    );
  }
  