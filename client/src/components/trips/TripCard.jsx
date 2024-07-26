import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { EntryContext } from '../../context/EntryContext'
import ProgressBar from './ProgressBar'

function TripCard({trip}) {

  const navigate = useNavigate()

  const {entries} = useContext(EntryContext)
  const tripEntries = entries.filter(entry => entry.trip_id == trip.id)
  const milesAchieved = tripEntries.reduce((accumulator, entry) => {
    return accumulator + entry.miles
  }, 0)

  function handleClick(){
    navigate(`/my-trips/${trip.id}`)
  }

  return (
    <div onClick={handleClick}>
      <h2>TripCard</h2>
      <p>{trip.name}</p>
      <p>Total Miles: {trip.total_miles}</p>
      <ProgressBar progress={milesAchieved} total={trip.total_miles}/>
    </div>
  )
}

export default TripCard