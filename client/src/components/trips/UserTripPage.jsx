import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TripContext } from '../../context/TripContext'
import { EntryContext } from '../../context/EntryContext'
import EntryCard from './entries/EntryCard'
import NewEntryForm from './entries/NewEntryForm'

function UserTripPage() {
  const {trips} = useContext(TripContext)
  const {id} = useParams()
  const trip = trips.find(trip => trip.id == id)
  
  const {entries, setEntries} = useContext(EntryContext)
  const tripEntries = entries.filter(entry => entry.trip_id == trip.id)

  return (
    <>
      <h1>{trip.name}</h1>
      <h2>{trip.total_miles}</h2>
      <div>
        {tripEntries.map(entry => <EntryCard key={entry.id} entry={entry}/>)}
        <NewEntryForm trip={trip}/>
      </div>
    </>
  )
}

export default UserTripPage