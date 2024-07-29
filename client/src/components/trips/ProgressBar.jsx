import React from 'react'

// MATERIAL UI
import { LinearProgress, Typography } from '@mui/material'

function ProgressBar({progress, total}) {
  const percentComplete = Math.round(progress / total * 100)
  /* let prog = progress
  if (prog > total){
    prog = total
  } */
  // Account for if user inputs and entry that puts them over 100%

  return (
    <>
      <LinearProgress variant="determinate" value={percentComplete} sx={{height: '4vh', borderRadius: '5px'}} />
      <Typography variant='h6' sx={{fontStyle: 'italic'}}>{percentComplete}% complete</Typography>
      {/* <div>Progress: {progress} miles || {total} total || {(progress / total * 100).toFixed(1)}% complete</div> */}
    </>
  )
}

export default ProgressBar