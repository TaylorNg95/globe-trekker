import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TripContext } from '../../../context/TripContext'
import { UserContext } from '../../../context/UserContext'
import EntryItem from './EntryItem'
import EntryForm from './EntryForm'
import ProgressBar from '../ProgressBar'

function EntriesPage() {
  const {trips} = useContext(TripContext)
  const {id} = useParams()
  const trip = trips.find(trip => trip.id == id)
  
  const {entries} = useContext(UserContext)
  const tripEntries = entries.filter(entry => entry.trip_id == trip.id & entry.miles != 0)
  const milesAchieved = tripEntries.reduce((accumulator, entry) => {
    return Math.round(accumulator + entry.miles)
  }, 0)

  return (
    <>
      <h1>{trip.name}</h1>
      <h2>{trip.total_miles}</h2>
      <ProgressBar progress={milesAchieved} total={trip.total_miles}/>
      <div>
        {tripEntries.map(entry => <EntryItem key={entry.id} entry={entry} trip={trip}/>)}
        <EntryForm trip={trip} editMode={false}/>
      </div>
    </>
  )
}

export default EntriesPage