import NavBar from './components/navigation/NavBar'
import Home from './components/static/Home'
import Login from './components/sessions/Login'
import Signup from './components/sessions/Signup'
import TripMenuPage from './components/trips/TripMenuPage'
import MyTripsPage from './components/trips/MyTripsPage'
import EntriesPage from './components/trips/entries/EntriesPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { TripProvider } from './context/TripContext'
import Stripe from './components/payment/Stripe'

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <TripProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/my-trips' element={<MyTripsPage />}/>
            <Route path='/my-trips/:id' element={<EntriesPage />}/>
            <Route path='/trip-menu' element={<TripMenuPage />}/>
            <Route path='/premium' element={<Stripe />}/>
          </Routes>
        </TripProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
