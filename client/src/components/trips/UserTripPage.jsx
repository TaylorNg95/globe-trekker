import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TripContext } from '../../context/TripContext'
import { UserContext } from '../../context/UserContext'
import EntryCard from './entries/EntryCard'
import NewEntryForm from './entries/NewEntryForm'

function UserTripPage() {
  const {trips} = useContext(TripContext)
  const {user} = useContext(UserContext)
  const {id} = useParams()
  const trip = trips.find(trip => trip.id == id)

  const starting_entries = user.entries.filter(entry => entry.trip_id == id)
  const [entries, setEntries] = useState(starting_entries)

  const newEntry = {
    "date": '',
    "miles": ''
  }

  return (
    <>
      <h1>{trip.name}</h1>
      <h2>{trip.total_miles}</h2>
      <div>
        {entries.map(entry => <EntryCard key={entry.id} entry={entry}/>)}
        <NewEntryForm trip={trip} entries={entries} setEntries={setEntries}/>
      </div>
    </>
  )
}

export default UserTripPage