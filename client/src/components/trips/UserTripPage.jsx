import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { TripContext } from '../../context/TripContext'
import { EntryContext } from '../../context/EntryContext'
import EntryCard from './entries/EntryCard'
import NewEntryForm from './entries/NewEntryForm'

function UserTripPage() {
  const {user} = useContext(UserContext)
  const {trips} = useContext(TripContext)
  const {entries, setEntries} = useContext(EntryContext)
  const {id} = useParams()
  const trip = trips.find(trip => trip.id == id)

  const starting_entries = user.entries.filter(entry => entry.trip_id == id)
  setEntries(starting_entries)

  return (
    <>
      <h1>{trip.name}</h1>
      <h2>{trip.total_miles}</h2>
      <div>
        {entries.map(entry => <EntryCard key={entry.id} entry={entry} entries={entries} setEntries={setEntries}/>)}
        <NewEntryForm trip={trip} entries={entries} setEntries={setEntries}/>
      </div>
    </>
  )
}

export default UserTripPage