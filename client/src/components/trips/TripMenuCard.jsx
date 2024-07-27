import {useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function TripMenuCard({trip}) {
  const {addEntry, user} = useContext(UserContext)

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
    navigate('/my-trips') // *** TBD: needs to update with the user entries
  }

  return (
    <div onClick={handleClick}>
        <h2>TripMenuCard</h2>
        <p>{trip.name}</p>
        <p>Total Miles: {trip.total_miles}</p>
    </div>
  )
}

export default TripMenuCard