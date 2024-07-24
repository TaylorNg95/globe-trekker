import NavBar from './components/navigation/NavBar'
import Home from './components/static/Home'
import TripMenu from './components/trips/TripMenu'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/menu' element={<TripMenu/>} />
      </Routes>
    </Router>
  )
}

export default App
