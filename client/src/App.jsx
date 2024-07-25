import NavBar from './components/navigation/NavBar'
import Home from './components/static/Home'
import Login from './components/sessions/Login'
import Signup from './components/sessions/Signup'
import UserTripList from './components/trips/TripList'
import TripMenu from './components/trips/TripMenuPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/my-trips' element={<UserTripList />}/>
        <Route path='/my-trips/:id' element={<UserTripList />}/>
        <Route path='/trip-menu' element={<TripMenu />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
