import {useContext} from 'react'
import { UserContext } from '../../context/UserContext'

// MATERIAL UI
import { LinearProgress, Typography } from '@mui/material'

function ProgressBar({trip, total}) {
  const {entries} = useContext(UserContext)
  const tripEntries = entries.filter(entry => entry.trip_id == trip.id) // gets user entries of one trip
  const milesAchieved = tripEntries.reduce((accumulator, entry) => {
    return Math.round(accumulator + entry.miles)
  }, 0)

  let percentComplete = Math.round(milesAchieved / total * 100)
  if (percentComplete > 100){
    percentComplete = 100
  }
  // Account for if user inputs and entry that puts them over 100%

  return (
    <>
      <LinearProgress variant="determinate" value={percentComplete} sx={{height: '4vh', borderRadius: '5px'}} />
      <Typography variant='h6' sx={{fontStyle: 'italic'}}>{percentComplete}% complete</Typography>
    </>
  )
}

export default ProgressBar