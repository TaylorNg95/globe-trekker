import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TripList from './TripList'

function UserTripsPage() {

  const {user} = useContext(UserContext)

  return (
    <>
      <h1>User Trips Page</h1>
      <h2>Here are your ongoing trips!</h2>
      <TripList trips={user.trips}/>
      <Link to='/trip-menu'>Start New Trip</Link>
    </>
  )
}

export default UserTripsPage