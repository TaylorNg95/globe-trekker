import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TripContext } from '../../context/TripContext'
import { UserContext } from '../../context/UserContext'
import EntryList from './entries/EntryList'

function UserTripPage() {
  const {trips} = useContext(TripContext)
  const {user} = useContext(UserContext)
  const {id} = useParams()
  const trip = trips.find(trip => trip.id == id)
  const entries = user.entries.filter(entry => entry.trip_id == id)

  return (
    <>
      <h1>{trip.name}</h1>
      <h2>{trip.total_miles}</h2>
      <EntryList entries={entries}/>
    </>
  )
}

export default UserTripPage