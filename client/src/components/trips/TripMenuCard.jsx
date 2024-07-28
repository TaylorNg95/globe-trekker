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
  // Date is held as a dummy string, as no '0' mile entries will be shown. Adding a new trip means also
  // adding a '0' mile entry to ensure the trips is shown on the My-Trips page.

  function handleClick(){
    addEntry(newTripEntry)
    navigate('/my-trips')
  }

  return (
    <div>
        <h2>TripMenuCard</h2>
        <p>{trip.name}</p>
        <p>Total Miles: {trip.total_miles}</p>
        <button onClick={handleClick}>Add Trip</button>
    </div>
  )
}

export default TripMenuCard