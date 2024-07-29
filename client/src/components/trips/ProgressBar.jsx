import React from 'react'

// MATERIAL UI
import { LinearProgress, Typography } from '@mui/material'

function ProgressBar({progress, total}) {
  let percentComplete = Math.round(progress / total * 100)
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