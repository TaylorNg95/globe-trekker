import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TripList from './TripList'

function UserTripsPage() {

  const {user} = useContext(UserContext)
  let uniqueUserTrips = {}
  user.trips.forEach(trip => { // MY PROBLEM IS HERE
    uniqueUserTrips[trip.id] = trip
  });
  uniqueUserTrips = Object.values(uniqueUserTrips)
  // extracts unique trips that the user has taken, based on all user trips

  if (user){
    return (
      <>
        <h1>User Trips Page</h1>
        <h2>Here are your ongoing trips!</h2>
        <TripList trips={uniqueUserTrips}/>
        <Link to='/trip-menu'>Start New Trip</Link>
      </>
    )
  }
}

export default UserTripsPage