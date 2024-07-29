import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TripContext } from '../../../context/TripContext'
import { UserContext } from '../../../context/UserContext'
import EntryItem from './EntryItem'
import EntryForm from './EntryForm'
import ProgressBar from '../ProgressBar'

// MATERIAL UI
import { Container, Typography, Box } from '@mui/material'

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
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh'}}>
        <Typography component="h1" variant='h3' sx={{mt: 3}}>{trip.name}</Typography>
        <Typography component="p" variant='h4' sx={{mt: 2, mb: 2}}>Total Miles: {trip.total_miles}</Typography>
        <Box sx={{width: '90%', mt: 2}}>
          <ProgressBar progress={milesAchieved} total={trip.total_miles}/>
        </Box>
        {tripEntriesOverZero.map(entry => <EntryItem key={entry.id} entry={entry} trip={trip}/>)}
        <EntryForm trip={trip} editMode={false}/>
      </Container>
    </>
  )
}

export default EntriesPage