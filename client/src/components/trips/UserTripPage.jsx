import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TripContext } from '../../context/TripContext'
import { UserContext } from '../../context/UserContext'
import EntryCard from './entries/EntryCard'

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
      <div>
        {entries.map(entry => <EntryCard key={entry.id} entry={entry}/>)}
      </div>
    </>
  )
}

export default UserTripPage