import {useContext} from 'react'
import { TripContext } from '../../context/TripContext'
import TripMenuCard from './TripMenuCard'
import CustomTripForm from './CustomTripForm'
import { UserContext } from '../../context/UserContext'

function TripMenuPage() {
  const {trips} = useContext(TripContext)
  const {entries} = useContext(UserContext)

  const entriesIDs = entries.map(entry => entry.trip_id)
  const availableTrips = trips.filter(trip => trip.custom == 0 && !entriesIDs.includes(trip.id))
  // Exclude custom trips (because they either belong to another user or we've
  // created it and therefore it is ongoing).

  console.log('Trip Menu components')
  return (
    <>
      <h2>TripMenuPage</h2>
      <div>
        {availableTrips.map(trip => <TripMenuCard key={trip.id} trip={trip}/>)}
        <CustomTripForm />
      </div>
    </>
  )
}

export default TripMenuPage