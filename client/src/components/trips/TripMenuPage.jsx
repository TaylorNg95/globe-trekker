import {useContext} from 'react'
import { TripContext } from '../../context/TripContext'
import TripInfo from './TripInfo'

function TripMenuPage() {
  const {trips} = useContext(TripContext)

  return (
    <>
      <h2>TripMenuPage</h2>
      <div>
        {trips.map(trip => <TripInfo key={trip.id} trip={trip}/>)}
      </div>
    </>
  )
}

export default TripMenuPage