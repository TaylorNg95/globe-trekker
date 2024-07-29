import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import MyTripsCard from './MyTripsCard'
import { TripContext } from '../../context/TripContext'

// MATERIAL UI
import { Container, Typography, Grid } from '@mui/material'

function MyTripsPage() {

  const {trips} = useContext(TripContext)
  const {entries} = useContext(UserContext)
  const tripIDs = entries.map(entry => entry.trip_id) // gets tripIDs of all user entries
  const uniqueTripIDs = [...new Set(tripIDs)] // keeps only user's unique trip IDs
  const uniqueTrips = uniqueTripIDs.map(id => trips.find(trip => trip.id == id)) // gets corresponding trips

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh'}}>
      <Typography component="h1" variant='h3' sx={{mt: 3}}>My Trips</Typography>
      <h2>Here are your ongoing trips!</h2>
      <Grid container spacing={2}>
        {uniqueTrips.map(trip => <MyTripsCard key={trip.id} trip={trip}/>)}
      </Grid>
      <Link to='/trip-menu'>Start New Trip</Link>
    </Container>
  )
}

export default MyTripsPage