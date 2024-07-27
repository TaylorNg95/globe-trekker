import {useContext} from 'react'
import { TripContext } from '../../context/TripContext'
import TripMenuCard from './TripMenuCard'
import CustomTripForm from './CustomTripForm'
import { UserContext } from '../../context/UserContext'

function TripMenuPage() {
  const {trips} = useContext(TripContext)
  
  const availableTrips = trips.filter(trip => trip.custom == 0)
  // Exclude custom trips (because they either belong to another user or we've
  // created it and therefore it is ongoing).

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