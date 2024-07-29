import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import ProgressBar from './ProgressBar'

// Material UI
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
        <CardActionArea sx={{padding: 2}}>
          <CardMedia
            component="img"
            height="140"
            image="https://www.muchbetteradventures.com/magazine/content/images/2021/06/Rock-steps-along-the-Appalachian-Trail-in-Stokes-State-Forest-New-Jersey---stock-photo-2.jpg"
            alt={trip.name}
          />
          <CardContent>
            <Typography variant="h4" component="p">{trip.name}</Typography>
            <Typography variant="h6" component="p">Total Miles: {trip.total_miles}</Typography>
            <ProgressBar progress={milesAchieved} total={trip.total_miles}/>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{padding: 2}}>
          <Button component={Link} to={`/my-trips/${trip.id}`} variant="contained">View Entries</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default MyTripsCard