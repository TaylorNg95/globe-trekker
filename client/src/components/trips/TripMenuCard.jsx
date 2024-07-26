import {useContext} from 'react'
import TripInfo from './TripInfo'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function TripMenuCard({trip}) {
  const {entries, setEntries, addEntry, user} = useContext(UserContext)

  const navigate = useNavigate()

  const newTripEntry = {
    date: '00-00-00',
    miles: 0, 
    user_id: user.id,
    trip_id: trip.id
  }
  // Date is held as a dummy string, as no '0' date entries will be shown

  function handleClick(){
    addEntry(newTripEntry)
    setEntries([...entries, newTripEntry])
    navigate('/my-trips')
  }

  return (
    <div onClick={handleClick}>
        <TripInfo trip={trip}/>
    </div>
  )
}

export default TripMenuCard