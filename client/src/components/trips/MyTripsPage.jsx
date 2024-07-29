import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import MyTripsCard from './MyTripsCard'
import { TripContext } from '../../context/TripContext'

// MATERIAL UI
import { Container, Typography, Grid, Button } from '@mui/material'

function MyTripsPage() {

  const {trips} = useContext(TripContext)
  const {entries} = useContext(UserContext)
  const tripIDs = entries.map(entry => entry.trip_id) // gets tripIDs of all user entries
  const uniqueTripIDs = [...new Set(tripIDs)] // keeps only user's unique trip IDs
  const uniqueTrips = uniqueTripIDs.map(id => trips.find(trip => trip.id == id)) // gets corresponding trips

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', mb: 2}}>
      <Typography component="h1" variant='h3' sx={{mt: 3}}>My Trips</Typography>
      <Typography component="h2" variant="h5" sx={{fontStyle: 'italic', mt: 2, mb: 2}}>Here are your ongoing trips...keep up the great work!</Typography>
      <Grid container spacing={3}>
        {uniqueTrips.map(trip => <MyTripsCard key={trip.id} trip={trip}/>)}
      </Grid>
      <Button component={Link} to='/trip-menu' variant='contained'>Start New Trip</Button>
    </Container>
  )
}

export default MyTripsPage