import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import ProgressBar from './ProgressBar'
import TripInfo from './TripInfo'

function TripCard({trip}) {

  const navigate = useNavigate()

  const {entries} = useContext(UserContext)
  const tripEntries = entries.filter(entry => entry.trip_id == trip.id)
  const milesAchieved = tripEntries.reduce((accumulator, entry) => {
    return Math.round(accumulator + entry.miles)
  }, 0)

  function handleClick(){
    navigate(`/my-trips/${trip.id}`)
  }

  return (
    <div onClick={handleClick}>
      <TripInfo trip={trip}/>
      <ProgressBar progress={milesAchieved} total={trip.total_miles}/>
    </div>
  )
}

export default TripCard