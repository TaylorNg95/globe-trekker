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
  /* Check if user trip entries exist for the route (since user could manually navigate to a 'my-trips/:id'
  route without it being theirs); if none, return null */

  const tripEntriesOverZero = tripEntries.filter(entry => entry.miles != 0)
  /* Exclude trip entries where miles = 0; this occurs when user creates a custom trip but does not add
  any new entries */

  if (tripEntries.length == 0) {
    return null
  } else return (
    <>
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh'}}>
        <Typography component="h1" variant='h3' sx={{mt: 3}}>{trip.name}</Typography>
        <Typography component="p" variant='h4' sx={{mt: 2, mb: 2}}>Distance Goal: {trip.total_miles} miles</Typography>
        <Box sx={{width: '90%', mt: 2}}>
          <ProgressBar trip={trip} total={trip.total_miles}/>
        </Box>
        <Typography component="p" variant='h4' sx={{mb: 2}}>My Entries:</Typography>
        {tripEntriesOverZero.map(entry => <EntryItem key={entry.id} entry={entry} trip={trip}/>)}
        <EntryForm trip={trip} editMode={false}/>
      </Container>
    </>
  )
}

export default EntriesPage