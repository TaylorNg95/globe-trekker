import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TripCard from './TripCard'

function UserTripsPage() {

  const {user} = useContext(UserContext)
  let uniqueUserTrips = {}
  if (user.trips) {
    user.trips.forEach(trip => {
      uniqueUserTrips[trip.id] = trip
    });
    uniqueUserTrips = Object.values(uniqueUserTrips)
  }
  // extracts unique trips that the user has taken, based on all user trips. protected if user has no trips 

  if (user){
    return (
      <>
        <h1>User Trips Page</h1>
        <h2>Here are your ongoing trips!</h2>
        <div>
          {user.trips ? uniqueUserTrips.map(trip => <TripCard key={trip.id} trip={trip}/>) : null}
        </div>
        <Link to='/trip-menu'>Start New Trip</Link>
      </>
    )
  }
}

export default UserTripsPage