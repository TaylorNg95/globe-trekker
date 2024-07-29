import {useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

// MATERIAL UI
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material'

function TripMenuCard({trip}) {
  const {addEntry, user} = useContext(UserContext)

  const navigate = useNavigate()

  const newTripEntry = {
    date: '00-00-00',
    miles: 0, 
    user_id: user.id,
    trip_id: trip.id
  }
  // Date is held as a dummy string, as no '0' mile entries will be shown. Adding a new trip means also
  // adding a '0' mile entry to ensure the trips is shown on the My-Trips page.

  function handleClick(){
    addEntry(newTripEntry)
    navigate('/my-trips')
  }

  return (
    <Grid item xs={6} md={4}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={trip.image_path ? trip.image_path : 'public/images/default.jpg'}
            alt={trip.name}
            sx={{paddingLeft: 2, paddingRight: 2, paddingTop: 2}}
          />
          <CardContent sx={{paddingBottom: 0}}>
            <Typography variant="h4" component="p">{trip.name}</Typography>
            <Typography variant="h6" component="p">Total Miles: {trip.total_miles}</Typography>
          </CardContent>
          <CardActions sx={{paddingLeft: 2, paddingBottom: 2}}>
            <Button onClick={handleClick} variant="contained">Add Trip</Button>
          </CardActions>
        </Card>
    </Grid>
  )
}

export default TripMenuCard