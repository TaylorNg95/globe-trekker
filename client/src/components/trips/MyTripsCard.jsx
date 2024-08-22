import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'

// MATERIAL UI
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';

function MyTripsCard({trip}) {

  return (
    <Grid item xs={12} sm={6} md={4}>
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
            <Typography variant="h6" component="p">Location: {trip.location}</Typography>
            <Typography variant="h6" component="p">Distance Goal: {trip.total_miles} miles</Typography>
            <ProgressBar trip={trip} total={trip.total_miles}/>
          </CardContent>
        <CardActions sx={{paddingLeft: 2, paddingBottom: 2, justifyContent: 'space-between'}}>
          <Button component={Link} to={`/my-trips/${trip.id}`} variant="contained">View Entries</Button>
          {trip.premium ? <StarIcon color='warning'/> : null}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default MyTripsCard