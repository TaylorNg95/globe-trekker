import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import MyTripsCard from './MyTripsCard'
import { TripContext } from '../../context/TripContext'

function MyTripsPage() {

  const {user} = useContext(UserContext)

  // Might need to check first if there is a user
  let uniqueTrips = []
  const {trips} = useContext(TripContext)
  const {entries} = useContext(UserContext)
  const tripIDs = entries.map(entry => entry.trip_id)
  const uniqueTripIDs = [...new Set(tripIDs)]
  uniqueTrips = uniqueTripIDs.map(id => trips.find(trip => trip.id == id))
  // extracts unique trip IDs based on user entries 

  return (
    <>
      <h1>User Trips Page</h1>
      <h2>Here are your ongoing trips!</h2>
      <div>
        {user.entries ? uniqueTrips.map(trip => <MyTripsCard key={trip.id} trip={trip}/>) : null}
      </div>
      <Link to='/trip-menu'>Start New Trip</Link>
    </>
  )
}

export default MyTripsPage