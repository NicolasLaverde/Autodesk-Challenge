import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { SwipeApp } from './Pages/Swipe'
import RootLayout from './Pages/RootLayout'
import { MatchPlaces } from './Pages/MatchPlaces'
import { createContext, useState } from 'react'
import { AVAILABLE_PLACES, Place } from './utils/MockData'

type MainContextType = {
  places: Place[],
  removeAPlace: () => void
  likedPlaces: Place[]
  AddLikedPlace:(idPlace: string) => void
}


function App() {
  const [places, setPlaces] = useState<Place[]>(AVAILABLE_PLACES)
  const [likedPlaces, setLikedPlaces] = useState<Place[]>([])

  const removeAPlace = ():void => {
    setPlaces(prevPlaces => [...prevPlaces].slice(1))
  }

  const AddLikedPlace = (idPlace : string): void => {
    setLikedPlaces(prevPlaces => {
        if(prevPlaces.some(place => place.id === idPlace)){
            return prevPlaces
        }
        const place = AVAILABLE_PLACES.find(place => place.id === idPlace)
        if(place) {
            return [place, ...prevPlaces]
        }
        return prevPlaces
    })
    removeAPlace()
}

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {index: true, element: <SwipeApp />},
        {path: 'lovePlaces', element: <MatchPlaces />},
      ],
    }])

    const valueCtx = {
      places,
      removeAPlace,
      likedPlaces,
      AddLikedPlace
    }


  return (
    <MainContext.Provider value={valueCtx}>
      <RouterProvider router={router} />
    </MainContext.Provider>
  )
}

export default App

export const MainContext = createContext<MainContextType>({
  places: [],
  removeAPlace: () => { },
  likedPlaces: [],
  AddLikedPlace: () => {}
})
