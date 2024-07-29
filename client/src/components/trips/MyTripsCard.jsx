import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import ProgressBar from './ProgressBar'
import { Grid } from '@mui/material'

function MyTripsCard({trip}) {

  const {entries} = useContext(UserContext)
  const tripEntries = entries.filter(entry => entry.trip_id == trip.id) // gets user entries of one trip
  const milesAchieved = tripEntries.reduce((accumulator, entry) => {
    return Math.round(accumulator + entry.miles)
  }, 0) // calculates total miles entered - to be used in progress bar

  return (
    <Grid item xs={6} md={4}>
      <h2>User Trip Card</h2>
      <p>{trip.name}</p>
      <p>Total Miles: {trip.total_miles}</p>
      <ProgressBar progress={milesAchieved} total={trip.total_miles}/>
      <Link to={`/my-trips/${trip.id}`}>View Entries</Link>
    </Grid>
  )
}

export default MyTripsCard