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
  const tripEntries = entries.filter(entry => entry.trip_id == trip.id)
  // Checks of there are any trip entries for the route (since user can theoretically navigate to a
  // 'my-trips/:id' route without it being theirs); if none, nothing will be rendered
  const tripEntriesOverZero = tripEntries.filter(entry => entry.miles != 0)
  // We don't want to show trip entries where miles = 0; these can arise in the particular case when a
  // user has created a custom trip but not added any new entries
  const milesAchieved = tripEntries.reduce((accumulator, entry) => {
    return Math.round(accumulator + entry.miles) // TBD - not DRY with MyTripsCard
  }, 0)

  if (tripEntries.length == 0) {
    return null
  } else return (
    <>
      <h1>{trip.name}</h1>
      <h2>{trip.total_miles}</h2>
      <ProgressBar progress={milesAchieved} total={trip.total_miles}/>
      <div>
        {tripEntriesOverZero.map(entry => <EntryItem key={entry.id} entry={entry} trip={trip}/>)}
        <EntryForm trip={trip} editMode={false}/>
      </div>
    </>
  )
}

export default EntriesPage