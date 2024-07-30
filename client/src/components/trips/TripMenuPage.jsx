import {useContext} from 'react'
import { TripContext } from '../../context/TripContext'
import TripMenuCard from './TripMenuCard'
import CustomTripForm from './CustomTripForm'
import { UserContext } from '../../context/UserContext'

// MATERIAL UI
import { Container, Typography, Grid, Box } from '@mui/material'

function TripMenuPage() {
  const {trips} = useContext(TripContext)
  const {entries} = useContext(UserContext)
  const tripIDs = entries.map(entry => entry.trip_id)
  const availableTrips = trips.filter(trip => trip.custom == 0 && !tripIDs.includes(trip.id))
  
  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh'}}>
      <Typography component="h1" variant="h3" sx={{mt: 3}}>Trip Menu</Typography>
      <Typography component="h2" variant="h5" sx={{fontStyle: 'italic', mt: 2, mb: 2}}>Select a New Trip, or Create a Custom Trip!</Typography>
      <Grid container spacing={3}>
        {availableTrips.map(trip => <TripMenuCard key={trip.id} trip={trip}/>)}
        <Grid item xs={12}>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CustomTripForm />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TripMenuPage