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
  // This page shows all available trips to the user. We must therefore exclude custom trips (because they
  // either belong to another user or the user has started a custom trip. We must also exclude any trips
  // where we have entries already, since it means we started those trips. This will overlap with the
  // custom trips but will also include any non-custom trips that the user has started.

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh'}}>
      <Typography component="h1" variant="h3" sx={{mt: 3}}>Trip Menu</Typography>
      <Typography component="h2" variant="h5" sx={{fontStyle: 'italic', mt: 2, mb: 2}}>Select a New Trip to Start, or Create Your Own!</Typography>
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