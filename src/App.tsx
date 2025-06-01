import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { SwipeApp } from './Pages/Swipe'
import RootLayout from './Pages/RootLayout'
import { MatchPlaces } from './Pages/MatchPlaces'
import { PlaceProvider } from './components/PlaceProvider'
import './i18n';
import { LanguageSwitcher } from './components/LanguageSwitcher'

function App() {
  const router = createBrowserRouter([
    {
      path: '/autodesk-challenge',
      element: <RootLayout />,
      children: [
        {index: true, element: <SwipeApp />},
        {path: 'lovePlaces', element: <MatchPlaces />},
      ],
    }])

    return (
      <PlaceProvider>
        <RouterProvider router={router} />
        <LanguageSwitcher />
      </PlaceProvider>
    )
}

export default App


