import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import ProgressBar from './ProgressBar'

// MATERIAL UI
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'

function MyTripsCard({trip}) {

  const {entries} = useContext(UserContext)
  const tripEntries = entries.filter(entry => entry.trip_id == trip.id) // gets user entries of one trip
  const milesAchieved = tripEntries.reduce((accumulator, entry) => {
    return Math.round(accumulator + entry.miles)
  }, 0) // calculates total miles entered - to be used in progress bar

  return (
    <Grid item xs={6} md={4}>
      <Card>
          <CardMedia
            component="img"
            height="140"
            image={trip.image_path ? trip.image_path : '/images/default.jpg'}
            alt={trip.name}
            sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 2}}
          />
          <CardContent sx={{paddingBottom: 0}}>
            <Typography variant="h4" component="p">{trip.name}</Typography>
            <Typography variant="h6" component="p">Total Miles: {trip.total_miles}</Typography>
            <ProgressBar progress={milesAchieved} total={trip.total_miles}/>
          </CardContent>
        <CardActions sx={{paddingLeft: 2, paddingBottom: 2}}>
          <Button component={Link} to={`/my-trips/${trip.id}`} variant="contained">View Entries</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default MyTripsCard