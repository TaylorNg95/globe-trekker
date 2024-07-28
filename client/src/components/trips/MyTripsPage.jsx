import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import MyTripsCard from './MyTripsCard'
import { TripContext } from '../../context/TripContext'

function MyTripsPage() {

  const {trips} = useContext(TripContext)
  const {entries} = useContext(UserContext)
  const tripIDs = entries.map(entry => entry.trip_id) // gets tripIDs of all user entries
  const uniqueTripIDs = [...new Set(tripIDs)] // keeps only user's unique trip IDs
  const uniqueTrips = uniqueTripIDs.map(id => trips.find(trip => trip.id == id)) // gets corresponding trips

  return (
    <>
      <h1>User Trips Page</h1>
      <h2>Here are your ongoing trips!</h2>
      <div>
        {uniqueTrips.map(trip => <MyTripsCard key={trip.id} trip={trip}/>)}
      </div>
      <Link to='/trip-menu'>Start New Trip</Link>
    </>
  )
}

export default MyTripsPage